import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../lib/i18n.js';
import {
  addProvincePhotoByUrl,
  deleteProvincePhoto,
  importWikimediaPhotos,
  reorderProvincePhotos,
  updateProvincePhoto,
  uploadProvincePhoto,
} from '../../services/adminService.js';

function PhotoCard({ photo, index, total, busy, onSaveCaption, onMove, onDelete, t }) {
  const [caption, setCaption] = useState(photo.caption || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCaption(photo.caption || '');
  }, [photo.caption]);

  const dirty = caption !== (photo.caption || '');

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSaveCaption(photo.id, caption);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="admin-photo-card">
      <div className="admin-photo-thumb-wrap">
        <img src={photo.url} alt={photo.caption || 'Province photo'} className="admin-photo-thumb" />
        <span className="admin-photo-badge">
          {photo.storage_path ? 'Storage' : photo.url?.startsWith('data:') ? 'Local Upload' : 'URL'}
        </span>
        <span className="admin-photo-order">#{index + 1}</span>
      </div>

      <div className="admin-photo-body">
        <div className="admin-photo-caption-row">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={t('gm.photoCaption')}
            aria-label={`Caption for photo ${index + 1}`}
          />
          {dirty && (
            <button
              type="button"
              className="admin-btn admin-btn-primary admin-btn-sm"
              onClick={handleSave}
              disabled={saving || busy}
            >
              {saving ? '...' : t('gm.saveBtn')}
            </button>
          )}
        </div>

        <div className="admin-photo-actions">
          <div className="admin-photo-move">
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={() => onMove(index, -1)}
              disabled={index === 0 || busy}
              title="Move left"
              aria-label="Move photo left"
            >
              ←
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={() => onMove(index, 1)}
              disabled={index === total - 1 || busy}
              title="Move right"
              aria-label="Move photo right"
            >
              →
            </button>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-danger admin-btn-sm"
            onClick={() => onDelete(photo)}
            disabled={busy}
          >
            {t('gm.deleteBtn')}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function GalleryManager({
  province,
  photos,
  loading,
  onPhotosChanged,
  notify,
}) {
  const { t } = useLanguage();
  const [uploadCaption, setUploadCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [urlCaption, setUrlCaption] = useState('');
  const [busyAction, setBusyAction] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelectedFile(null);
    setUploadCaption('');
    setUrlInput('');
    setUrlCaption('');
  }, [province?.id]);

  const handleFilePick = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      notify('error', 'Please select a valid image file (JPEG, PNG, WebP, GIF).');
      return;
    }
    setSelectedFile(file);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      notify('error', 'Choose an image file first.');
      return;
    }
    setBusyAction('upload');
    try {
      const created = await uploadProvincePhoto(province.id, selectedFile, uploadCaption);
      onPhotosChanged([...photos, created]);
      setSelectedFile(null);
      setUploadCaption('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      notify('success', `Uploaded photo to ${province.name} gallery.`);
    } catch (err) {
      notify('error', err.message || 'Upload failed.');
    } finally {
      setBusyAction('');
    }
  };

  const handleAddUrl = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setBusyAction('url');
    try {
      const created = await addProvincePhotoByUrl(province.id, {
        url: urlInput.trim(),
        caption: urlCaption.trim(),
      });
      onPhotosChanged([...photos, created]);
      setUrlInput('');
      setUrlCaption('');
      notify('success', `Added gallery image to ${province.name}.`);
    } catch (err) {
      notify('error', err.message || 'Failed to add photo URL.');
    } finally {
      setBusyAction('');
    }
  };

  const handleImportWikimedia = async () => {
    setBusyAction('wikimedia');
    try {
      const res = await importWikimediaPhotos(province);
      const added = Array.isArray(res?.added) ? res.added : [];
      if (added.length === 0) {
        notify('info', `No new Wikimedia photos found for ${province.name}.`);
      } else {
        onPhotosChanged([...photos, ...added]);
        notify('success', `Imported ${added.length} Wikimedia photos into ${province.name}.`);
      }
    } catch (err) {
      notify('error', err.message || 'Wikimedia import failed.');
    } finally {
      setBusyAction('');
    }
  };

  const handleSaveCaption = async (photoId, caption) => {
    try {
      const updated = await updateProvincePhoto(photoId, { caption });
      onPhotosChanged(photos.map((p) => (p.id === photoId ? updated : p)));
      notify('success', 'Photo caption updated.');
    } catch (err) {
      notify('error', err.message || 'Failed to update caption.');
    }
  };

  const handleMove = async (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= photos.length) return;
    const reordered = [...photos];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved);
    setBusyAction('reorder');
    try {
      const saved = await reorderProvincePhotos(
        province.id,
        reordered.map((p) => p.id)
      );
      onPhotosChanged(saved);
      notify('success', 'Gallery order updated.');
    } catch (err) {
      notify('error', err.message || 'Failed to reorder photos.');
    } finally {
      setBusyAction('');
    }
  };

  const handleDelete = async (photo) => {
    setBusyAction('delete');
    try {
      await deleteProvincePhoto(photo);
      onPhotosChanged(photos.filter((p) => p.id !== photo.id));
      notify('success', 'Photo deleted from gallery.');
    } catch (err) {
      notify('error', err.message || 'Failed to delete photo.');
    } finally {
      setBusyAction('');
    }
  };

  const isBusy = Boolean(busyAction);

  return (
    <div className="admin-gallery-manager">
      <div className="admin-gallery-toolbar">
        <div>
          <h3>{t('gm.title', { count: photos.length })}</h3>
          <p className="admin-muted">{t('gm.subtitle')}</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={handleImportWikimedia}
          disabled={isBusy}
        >
          {busyAction === 'wikimedia' ? t('gm.importing') : t('gm.importWikimedia')}
        </button>
      </div>

      <div className="admin-gallery-inputs">
        <form onSubmit={handleUploadSubmit} className="admin-panel-box">
          <h4>{t('gm.uploadTitle')}</h4>
          <div
            className={`admin-dropzone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFilePick(e.dataTransfer.files?.[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="admin-file-hidden"
              onChange={(e) => handleFilePick(e.target.files?.[0])}
            />
            {selectedFile ? (
              <span>
                {t('gm.selectedFile')} <strong>{selectedFile.name}</strong> (
                {(selectedFile.size / 1024).toFixed(0)} KB)
              </span>
            ) : (
              <span>{t('gm.dropzonePrompt')}</span>
            )}
          </div>
          <div className="admin-inline-form">
            <input
              type="text"
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              placeholder={t('gm.captionOptional')}
              aria-label="Upload photo caption"
            />
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={!selectedFile || isBusy}
            >
              {busyAction === 'upload' ? t('gm.uploading') : t('gm.uploadBtn')}
            </button>
          </div>
        </form>

        <form onSubmit={handleAddUrl} className="admin-panel-box">
          <h4>{t('gm.addUrlTitle')}</h4>
          <div className="admin-url-stack">
            <input
              type="url"
              required
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              aria-label="External photo URL"
            />
            <div className="admin-inline-form">
              <input
                type="text"
                value={urlCaption}
                onChange={(e) => setUrlCaption(e.target.value)}
                placeholder={t('gm.photoCaption')}
                aria-label="External photo caption"
              />
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={!urlInput.trim() || isBusy}
              >
                {busyAction === 'url' ? t('gm.adding') : t('gm.addUrlBtn')}
              </button>
            </div>
          </div>
          {urlInput.trim() && (
            <div className="admin-url-preview">
              <img src={urlInput.trim()} alt="URL preview" />
            </div>
          )}
        </form>
      </div>

      {loading ? (
        <div className="admin-empty-box">{t('gm.loadingPhotos')}</div>
      ) : photos.length === 0 ? (
        <div className="admin-empty-box">
          {t('gm.noPhotosPrefix', { name: province.name })}{' '}
          <strong>{t('gm.importWikimedia')}</strong> {t('gm.noPhotosSuffix')}
        </div>
      ) : (
        <div className="admin-photo-grid">
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              total={photos.length}
              busy={isBusy}
              onSaveCaption={handleSaveCaption}
              onMove={handleMove}
              onDelete={handleDelete}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}
