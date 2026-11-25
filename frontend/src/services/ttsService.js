const HD_VOICE_KEYWORDS = [
  'natural',
  'neural',
  'online',
  'wavenet',
  'studio',
  'premium',
  'enhanced',
  'multilingual',
  'siri',
  'hd',
];

const PREFERRED_FEMALE_VOICES = [
  'ava',
  'emma',
  'aria',
  'jenny',
  'sonia',
  'libby',
  'natasha',
  'serena',
  'samantha',
  'victoria',
  'karen',
  'moira',
  'tessa',
  'fiona',
  'allison',
  'google uk english female',
  'google us english',
];

const LEGACY_ROBOTIC_OR_MALE_VOICES = [
  'zira',
  'david',
  'mark',
  'george',
  'richard',
  'rishi',
  'heera',
  'ravi',
  'daniel',
  'alex',
  'espeak',
  'compact',
];

let activeSessionId = 0;
let pauseTimer = null;

export function isTtsSupported() {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined'
  );
}

export function waitForVoices(timeoutMs = 1200) {
  if (!isTtsSupported()) {
    return Promise.resolve([]);
  }
  const existing = window.speechSynthesis.getVoices();
  if (existing && existing.length > 0) {
    return Promise.resolve(existing);
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener?.('voiceschanged', handleChange);
      clearTimeout(timer);
      resolve(window.speechSynthesis.getVoices() || []);
    };
    const handleChange = () => {
      const list = window.speechSynthesis.getVoices();
      if (list && list.length > 0) {
        finish();
      }
    };
    const timer = setTimeout(finish, timeoutMs);
    window.speechSynthesis.addEventListener?.('voiceschanged', handleChange);
  });
}

function scoreVoice(voice) {
  const name = String(voice?.name || '').toLowerCase();
  const lang = String(voice?.lang || '').toLowerCase();
  let score = 0;

  if (HD_VOICE_KEYWORDS.some((kw) => name.includes(kw))) {
    score += 120;
  }
  if (!voice?.localService) {
    score += 65;
  }
  if (PREFERRED_FEMALE_VOICES.some((hint) => name.includes(hint))) {
    score += 35;
  }
  if (lang.startsWith('en-us') || lang.startsWith('en-gb') || lang.startsWith('en-au')) {
    score += 15;
  }
  if (LEGACY_ROBOTIC_OR_MALE_VOICES.some((bad) => new RegExp(`\\b${bad}\\b`, 'i').test(name))) {
    score -= 60;
  }
  return score;
}

export function pickBestHdVoice(voices) {
  if (!Array.isArray(voices) || voices.length === 0) return null;
  const enVoices = voices.filter((v) => String(v?.lang || '').toLowerCase().startsWith('en'));
  const pool = enVoices.length > 0 ? enVoices : voices;

  let best = pool[0];
  let bestScore = -Infinity;
  for (const voice of pool) {
    const s = scoreVoice(voice);
    if (s > bestScore) {
      bestScore = s;
      best = voice;
    }
  }
  return best || null;
}

export function stopSpeech() {
  activeSessionId += 1;
  if (pauseTimer) {
    clearTimeout(pauseTimer);
    pauseTimer = null;
  }
  if (isTtsSupported()) {
    window.speechSynthesis.cancel();
  }
}

export async function speakTextHd(text, callbacks = {}) {
  const { onStart, onEnd, onError, onVoiceSelected } = callbacks;
  if (!isTtsSupported()) {
    onVoiceSelected?.('');
    onError?.(new Error('Speech synthesis is unavailable'));
    return;
  }

  stopSpeech();
  const sessionId = activeSessionId;

  const cleanText = String(text || '').replace(/\s+/g, ' ').trim();
  if (!cleanText) {
    onVoiceSelected?.('');
    onEnd?.();
    return;
  }

  const voices = await waitForVoices(1200);
  if (sessionId !== activeSessionId) {
    return;
  }

  const chosenVoice = pickBestHdVoice(voices);
  onVoiceSelected?.(chosenVoice?.name || '');

  const rawSentences = cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  const sentences = (rawSentences || [cleanText]).map((s) => s.trim()).filter(Boolean);
  if (sentences.length === 0) {
    onEnd?.();
    return;
  }

  let hasStarted = false;

  const speakSentence = (index) => {
    if (sessionId !== activeSessionId) {
      return;
    }
    if (index >= sentences.length) {
      onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(sentences[index]);
    utterance.lang = chosenVoice?.lang || 'en-US';
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }
    utterance.pitch = 1.0;
    utterance.rate = 0.95;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      if (sessionId !== activeSessionId) return;
      if (!hasStarted) {
        hasStarted = true;
        onStart?.();
      }
    };

    utterance.onend = () => {
      if (sessionId !== activeSessionId) return;
      if (index + 1 >= sentences.length) {
        onEnd?.();
        return;
      }
      pauseTimer = setTimeout(() => {
        pauseTimer = null;
        speakSentence(index + 1);
      }, 160);
    };

    utterance.onerror = (evt) => {
      if (sessionId !== activeSessionId) return;
      onError?.(evt);
    };

    window.speechSynthesis.speak(utterance);
  };

  speakSentence(0);
}
