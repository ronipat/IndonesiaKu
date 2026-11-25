import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/HYPE-R/.gemini/antigravity/scratch/IndonesiaKu';
const JSON_PATH = path.join(ROOT, 'frontend/src/data/defaultProvinces.json');
const SQL_PATH = path.join(ROOT, 'supabase/migrations/20261125000004_seed_province_photos.sql');

const USER_AGENT = 'IndonesiaKuGalleryCurator/2.0 (https://github.com/indonesiaku)';
const FETCH_TIMEOUT_MS = 7000;

const BLOCKLIST_PATTERNS = [
  /tropenmuseum/i,
  /collectie/i,
  /kitlv/i,
  /bundesarchiv/i,
  /almanak/i,
  /editor/i,
  /anggota/i,
  /sekretaris/i,
  /gubernur/i,
  /bupati/i,
  /walikota/i,
  /wali[\s_-]?kota/i,
  /\buang\b/i,
  /banknote/i,
  /\bcoin\b/i,
  /\bflag/i,
  /coat[\s_-]?of[\s_-]?arms/i,
  /emblem/i,
  /\blogo\b/i,
  /locator/i,
  /map[\s_-]?of/i,
  /blank[\s_-]?map/i,
  /\bpeta[\s_-]?/i,
  /lambang/i,
  /bendera/i,
  /montage/i,
  /collage/i,
  /\bstamp\b/i,
  /\bseal\b/i,
  /diagram/i,
  /\bchart\b/i,
  /portrait/i,
  /tmnr/i,
  /circa/i,
  /black[\s_-]?and[\s_-]?white/i,
  /monochrome/i,
  /sepia/i,
  /barracks/i,
  /uss[\s_-]/i,
  /locket/i,
  /pembelajaran/i,
  /kantor/i,
  /universitas/i,
  /ibadah/i,
  /salat[\s_-]?id/i,
  /penentuan[\s_-]?arah/i,
  /tabakskoker/i,
  /republik[\s_-]?indonesia[,\s_-]+propinsi/i,
  /satellite/i,
  /sentinel-2/i,
  /landsat/i,
  /\b188\d\b/,
  /\b189\d\b/,
  /\b19[0-8]\d\b/,
  /[_\s]p\d{2,4}\b/i,
  /location[\s_-]?map/i,
  /topographic/i,
  /administrative/i,
];

const PROVINCE_LANDMARKS = {
  aceh: [
    { enTitle: 'Baiturrahman Grand Mosque', idTitle: 'Masjid Raya Baiturrahman', search: 'Baiturrahman Grand Mosque Banda Aceh', caption: 'Baiturrahman Grand Mosque, Banda Aceh' },
    { enTitle: 'Weh Island', idTitle: 'Pulau Weh', search: 'Pulau Weh Sabang beach', caption: 'Sabang Coastal Waters, Weh Island' },
    { enTitle: 'Aceh Tsunami Museum', idTitle: 'Museum Tsunami Aceh', search: 'Aceh Tsunami Museum Banda Aceh', caption: 'Aceh Tsunami Museum, Banda Aceh' },
    { enTitle: 'Lake Laut Tawar', idTitle: 'Danau Laut Tawar', search: 'Danau Laut Tawar Takengon Aceh', caption: 'Lake Laut Tawar, Takengon Highlands' },
    { enTitle: 'Gunung Leuser National Park', idTitle: 'Taman Nasional Gunung Leuser', search: 'Gunung Leuser National Park rainforest', caption: 'Gunung Leuser National Park' },
    { enTitle: 'Rubiah Island', idTitle: 'Pulau Rubiah', search: 'Iboih Beach Sabang Aceh', caption: 'Iboih & Rubiah Waters, Sabang' },
  ],
  'sumatera-utara': [
    { enTitle: 'Lake Toba', idTitle: 'Danau Toba', search: 'Lake Toba Sumatera Utara landscape', caption: 'Lake Toba Volcanic Caldera' },
    { enTitle: 'Samosir', idTitle: 'Pulau Samosir', search: 'Samosir Island Lake Toba', caption: 'Samosir Island, Lake Toba' },
    { enTitle: 'Sipiso-piso', idTitle: 'Air Terjun Sipiso-piso', search: 'Sipiso-piso waterfall', caption: 'Sipiso-piso Waterfall, Karo Highlands' },
    { enTitle: 'Maimun Palace', idTitle: 'Istana Maimun', search: 'Istana Maimun Medan', caption: 'Maimun Palace, Medan' },
    { enTitle: 'Bukit Lawang', idTitle: 'Bukit Lawang', search: 'Bukit Lawang orangutan river', caption: 'Bukit Lawang Rainforest Reserve' },
    { enTitle: 'Berastagi', idTitle: 'Berastagi', search: 'Mount Sinabung Berastagi', caption: 'Berastagi Volcanic Highlands' },
  ],
  'sumatera-barat': [
    { enTitle: 'Jam Gadang', idTitle: 'Jam Gadang', search: 'Jam Gadang Bukittinggi', caption: 'Jam Gadang Clock Tower, Bukittinggi' },
    { enTitle: 'Ngarai Sianok', idTitle: 'Ngarai Sianok', search: 'Ngarai Sianok Canyon Bukittinggi', caption: 'Sianok Canyon (Ngarai Sianok)' },
    { enTitle: 'Rumah Gadang', idTitle: 'Rumah Gadang', search: 'Pagaruyung Palace Rumah Gadang', caption: 'Traditional Minangkabau Rumah Gadang' },
    { enTitle: 'Lake Maninjau', idTitle: 'Danau Maninjau', search: 'Danau Maninjau Sumatera Barat', caption: 'Lake Maninjau Crater Lake' },
    { enTitle: 'Pagaruyung Palace', idTitle: 'Istano Basa Pagaruyung', search: 'Istano Basa Pagaruyung', caption: 'Istano Basa Pagaruyung Palace' },
    { enTitle: 'Harau Valley', idTitle: 'Lembah Harau', search: 'Lembah Harau Payakumbuh', caption: 'Harau Valley Cliffs, Payakumbuh' },
  ],
  riau: [
    { enTitle: 'Siak Sri Indrapura Palace', idTitle: 'Istana Siak Sri Indrapura', search: 'Istana Siak Sri Indrapura Riau', caption: 'Siak Sri Indrapura Palace' },
    { enTitle: 'Muara Takus', idTitle: 'Candi Muara Takus', search: 'Candi Muara Takus Riau', caption: 'Muara Takus Ancient Temple' },
    { enTitle: 'An-Nur Great Mosque Pekanbaru', idTitle: 'Masjid Agung An-Nur Pekanbaru', search: 'Masjid Agung An-Nur Pekanbaru', caption: 'An-Nur Great Mosque, Pekanbaru' },
    { enTitle: 'Kampar River', idTitle: 'Sungai Kampar', search: 'Sungai Siak Pekanbaru bridge', caption: 'Siak Riverfront, Pekanbaru' },
    { enTitle: 'Rupat Island', idTitle: 'Pulau Rupat', search: 'Pekanbaru Riau cityscape', caption: 'Pekanbaru & Riau Riverine Vista' },
  ],
  'kepulauan-riau': [
    { enTitle: 'Barelang Bridge', idTitle: 'Jembatan Barelang', search: 'Barelang Bridge Batam', caption: 'Barelang Bridge, Batam' },
    { enTitle: 'Bintan Island', idTitle: 'Pulau Bintan', search: 'Bintan beach resort island', caption: 'Bintan Island Tropical Coast' },
    { enTitle: 'Penyengat Island', idTitle: 'Pulau Penyengat', search: 'Masjid Raya Sultan Riau Pulau Penyengat', caption: 'Sultan Riau Grand Mosque, Penyengat Island' },
    { enTitle: 'Anambas Islands', idTitle: 'Kepulauan Anambas', search: 'Anambas Islands Indonesia lagoon', caption: 'Anambas Islands Turquoise Lagoon' },
    { enTitle: 'Natuna Regency', idTitle: 'Kabupaten Natuna', search: 'Natuna Batu Sindu beach rocks', caption: 'Natuna Granite Shoreline' },
  ],
  jambi: [
    { enTitle: 'Mount Kerinci', idTitle: 'Gunung Kerinci', search: 'Gunung Kerinci Jambi volcano', caption: 'Mount Kerinci Summit, Jambi' },
    { enTitle: 'Muaro Jambi Temple Compounds', idTitle: 'Candi Muaro Jambi', search: 'Candi Muaro Jambi temple', caption: 'Muaro Jambi Buddhist Temple Complex' },
    { enTitle: 'Lake Gunung Tujuh', idTitle: 'Danau Gunung Tujuh', search: 'Danau Gunung Tujuh Kerinci', caption: 'Lake Gunung Tujuh Crater' },
    { enTitle: 'Gentala Arasy', idTitle: 'Jembatan Gentala Arasy', search: 'Gentala Arasy Bridge Jambi', caption: 'Gentala Arasy Pedestrian Bridge, Jambi' },
    { enTitle: 'Kerinci Seblat National Park', idTitle: 'Taman Nasional Kerinci Seblat', search: 'Kayu Aro tea plantation Kerinci', caption: 'Kerinci Seblat Highlands & Tea Estates' },
  ],
  'sumatera-selatan': [
    { enTitle: 'Ampera Bridge', idTitle: 'Jembatan Ampera', search: 'Ampera Bridge Palembang Musi', caption: 'Ampera Bridge over the Musi River' },
    { enTitle: 'Great Mosque of Palembang', idTitle: 'Masjid Agung Palembang', search: 'Masjid Agung Palembang', caption: 'Sultan Mahmud Badaruddin II Great Mosque' },
    { enTitle: 'Kemaro Island', idTitle: 'Pulau Kemaro', search: 'Pulau Kemaro Palembang pagoda', caption: 'Kemaro Island Pagoda, Musi River' },
    { enTitle: 'Mount Dempo', idTitle: 'Gunung Dempo', search: 'Gunung Dempo Pagar Alam tea', caption: 'Mount Dempo & Pagar Alam Highlands' },
    { enTitle: 'Jakabaring Sport City', idTitle: 'Gelora Sriwijaya', search: 'Gelora Sriwijaya Jakabaring Palembang', caption: 'Jakabaring & Sriwijaya Complex, Palembang' },
  ],
  'kepulauan-bangka-belitung': [
    { enTitle: 'Belitung', idTitle: 'Tanjung Tinggi', search: 'Tanjung Tinggi Beach Belitung granite', caption: 'Tanjung Tinggi Granite Boulders, Belitung' },
    { enTitle: 'Lengkuas Island', idTitle: 'Pulau Lengkuas', search: 'Pulau Lengkuas lighthouse Belitung', caption: 'Lengkuas Island Lighthouse, Belitung' },
    { enTitle: 'Bangka Island', idTitle: 'Pantai Parai Tenggiri', search: 'Bangka beach boulders Indonesia', caption: 'Granite Coastline of Bangka' },
    { enTitle: 'Kaolin Lake', idTitle: 'Danau Kaolin Belitung', search: 'Danau Kaolin Belitung blue lake', caption: 'Kaolin Lake Turquoise Basin, Belitung' },
    { enTitle: 'Pasir Padi Beach', idTitle: 'Pantai Pasir Padi', search: 'Pasir Padi Pangkal Pinang Bangka', caption: 'Pasir Padi Shore, Pangkal Pinang' },
  ],
  bengkulu: [
    { enTitle: 'Fort Marlborough', idTitle: 'Benteng Marlborough', search: 'Fort Marlborough Bengkulu', caption: 'Fort Marlborough Heritage Bastion, Bengkulu' },
    { enTitle: 'Panjang Beach', idTitle: 'Pantai Panjang', search: 'Pantai Panjang Bengkulu sunset', caption: 'Panjang Beach Indian Ocean Coast' },
    { enTitle: 'Rafflesia arnoldii', idTitle: 'Rafflesia arnoldii', search: 'Rafflesia arnoldii flower Bengkulu', caption: 'Giant Rafflesia arnoldii Bloom' },
    { enTitle: 'Bukit Kaba', idTitle: 'Gunung Kaba', search: 'Gunung Kaba Bengkulu crater', caption: 'Mount Kaba Volcanic Crater, Rejang Lebong' },
    { enTitle: 'Masjid Jamik Bengkulu', idTitle: 'Masjid Jamik Bengkulu', search: 'Bengkulu Rumah Pengasingan Bung Karno', caption: 'Sukarno Exile Residence & Heritage, Bengkulu' },
  ],
  lampung: [
    { enTitle: 'Way Kambas National Park', idTitle: 'Taman Nasional Way Kambas', search: 'Way Kambas Sumatran elephant', caption: 'Way Kambas Elephant Sanctuary' },
    { enTitle: 'Krakatoa', idTitle: 'Anak Krakatau', search: 'Anak Krakatau volcano Sunda Strait', caption: 'Anak Krakatau Volcano, Sunda Strait' },
    { enTitle: 'Pahawang Island', idTitle: 'Pulau Pahawang', search: 'Pahawang Island Lampung beach', caption: 'Pahawang Island Coral Shoals' },
    { enTitle: 'Kiluan Bay', idTitle: 'Teluk Kiluan', search: 'Kiluan Bay Lampung beach', caption: 'Kiluan Bay Lagoon & Cliffs' },
    { enTitle: 'Siger Tower', idTitle: 'Menara Siger', search: 'Menara Siger Bakauheni Lampung', caption: 'Menara Siger Landmark, Bakauheni' },
  ],
  'dki-jakarta': [
    { enTitle: 'National Monument (Indonesia)', idTitle: 'Monumen Nasional', search: 'Monas National Monument Jakarta', caption: 'Monas (National Monument), Central Jakarta' },
    { enTitle: 'Istiqlal Mosque, Jakarta', idTitle: 'Masjid Istiqlal', search: 'Istiqlal Mosque Jakarta', caption: 'Istiqlal Mosque, Jakarta' },
    { enTitle: 'Kota Tua Jakarta', idTitle: 'Kota Tua Jakarta', search: 'Fatahillah Square Kota Tua Jakarta', caption: 'Fatahillah Square, Kota Tua Jakarta' },
    { enTitle: 'Jakarta Cathedral', idTitle: 'Gereja Katedral Jakarta', search: 'Jakarta Cathedral neo-gothic', caption: 'Jakarta Cathedral, Central Jakarta' },
    { enTitle: 'Sunda Kelapa', idTitle: 'Sunda Kelapa', search: 'Sunda Kelapa harbour Phinisi Jakarta', caption: 'Sunda Kelapa Historic Harbor' },
    { enTitle: 'Gelora Bung Karno Stadium', idTitle: 'Stadion Utama Gelora Bung Karno', search: 'Jakarta Sudirman skyline sunset', caption: 'Jakarta Skyline & Senayan District' },
  ],
  'jawa-barat': [
    { enTitle: 'Kawah Putih', idTitle: 'Kawah Putih', search: 'Kawah Putih Ciwidey crater lake', caption: 'Kawah Putih Crater Lake, Ciwidey' },
    { enTitle: 'Tangkuban Perahu', idTitle: 'Gunung Tangkuban Parahu', search: 'Tangkuban Perahu crater Bandung', caption: 'Tangkuban Perahu Volcanic Crater' },
    { enTitle: 'Gedung Sate', idTitle: 'Gedung Sate', search: 'Gedung Sate Bandung', caption: 'Gedung Sate Heritage Landmark, Bandung' },
    { enTitle: 'Bogor Botanical Gardens', idTitle: 'Kebun Raya Bogor', search: 'Kebun Raya Bogor Botanical Gardens', caption: 'Bogor Botanical Gardens' },
    { enTitle: 'Pangandaran Beach', idTitle: 'Pantai Pangandaran', search: 'Green Canyon Pangandaran Jawa Barat', caption: 'Pangandaran Coast & Green Canyon' },
  ],
  banten: [
    { enTitle: 'Ujung Kulon National Park', idTitle: 'Taman Nasional Ujung Kulon', search: 'Ujung Kulon Peucang Island Banten', caption: 'Ujung Kulon National Park Coast' },
    { enTitle: 'Great Mosque of Banten', idTitle: 'Masjid Agung Banten', search: 'Masjid Agung Banten Lama minaret', caption: 'Great Mosque of Old Banten' },
    { enTitle: 'Sawarna', idTitle: 'Pantai Sawarna', search: 'Sawarna Beach Tanjung Layar Banten', caption: 'Tanjung Layar & Sawarna Beach' },
    { enTitle: 'Anyer', idTitle: 'Pantai Anyer', search: 'Anyer lighthouse Cikoneng Banten', caption: 'Anyer Coastline & Cikoneng Lighthouse' },
    { enTitle: 'Tanjung Lesung', idTitle: 'Tanjung Lesung', search: 'Krakatau view Carita Banten', caption: 'Carita & Tanjung Lesung Shore' },
  ],
  'jawa-tengah': [
    { enTitle: 'Borobudur', idTitle: 'Candi Borobudur', search: 'Borobudur Temple Magelang', caption: 'Borobudur Temple Monument, Magelang' },
    { enTitle: 'Lawang Sewu', idTitle: 'Lawang Sewu', search: 'Lawang Sewu Semarang', caption: 'Lawang Sewu Historic Building, Semarang' },
    { enTitle: 'Dieng Plateau', idTitle: 'Dataran Tinggi Dieng', search: 'Dieng Plateau Arjuna Temple', caption: 'Arjuna Temple Complex, Dieng Plateau' },
    { enTitle: 'Karimunjawa', idTitle: 'Kepulauan Karimunjawa', search: 'Karimunjawa islands beach', caption: 'Karimunjawa Marine Archipelago' },
    { enTitle: 'Gedong Songo', idTitle: 'Candi Gedong Songo', search: 'Candi Gedong Songo Semarang', caption: 'Gedong Songo Highland Temples' },
  ],
  'di-yogyakarta': [
    { enTitle: 'Prambanan', idTitle: 'Candi Prambanan', search: 'Prambanan Temple Yogyakarta', caption: 'Prambanan Hindu Temple Compound' },
    { enTitle: 'Kraton Ngayogyakarta Hadiningrat', idTitle: 'Keraton Ngayogyakarta Hadiningrat', search: 'Kraton Yogyakarta palace courtyard', caption: 'Kraton Royal Palace, Yogyakarta' },
    { enTitle: 'Tugu Yogyakarta', idTitle: 'Tugu Yogyakarta', search: 'Tugu Pal Putih Yogyakarta', caption: 'Tugu Yogyakarta Monument' },
    { enTitle: 'Taman Sari (Yogyakarta)', idTitle: 'Taman Sari Yogyakarta', search: 'Taman Sari Water Castle Yogyakarta', caption: 'Taman Sari Royal Water Castle' },
    { enTitle: 'Parangtritis', idTitle: 'Pantai Parangtritis', search: 'Mount Merapi Yogyakarta landscape', caption: 'Mount Merapi & Yogyakarta Landscape' },
  ],
  'jawa-timur': [
    { enTitle: 'Mount Bromo', idTitle: 'Gunung Bromo', search: 'Mount Bromo Tengger Semeru sunrise', caption: 'Mount Bromo & Tengger Caldera' },
    { enTitle: 'Ijen', idTitle: 'Kawah Ijen', search: 'Kawah Ijen crater turquoise lake', caption: 'Ijen Crater Lake, Banyuwangi' },
    { enTitle: 'Tumpak Sewu Waterfall', idTitle: 'Air Terjun Tumpak Sewu', search: 'Tumpak Sewu waterfall Lumajang', caption: 'Tumpak Sewu Waterfall, Lumajang' },
    { enTitle: 'Suramadu Bridge', idTitle: 'Jembatan Suramadu', search: 'Suramadu Bridge Surabaya Madura', caption: 'Suramadu Bridge, Surabaya–Madura' },
    { enTitle: 'Baluran National Park', idTitle: 'Taman Nasional Baluran', search: 'Baluran Bekol savanna Jawa Timur', caption: 'Baluran Savanna, Situbondo' },
  ],
  bali: [
    { enTitle: 'Pura Ulun Danu Bratan', idTitle: 'Pura Ulun Danu Bratan', search: 'Pura Ulun Danu Bratan Bali', caption: 'Pura Ulun Danu Bratan, Bedugul' },
    { enTitle: 'Tanah Lot', idTitle: 'Tanah Lot', search: 'Tanah Lot Temple Bali sunset', caption: 'Tanah Lot Sea Temple, Tabanan' },
    { enTitle: 'Uluwatu Temple', idTitle: 'Pura Luhur Uluwatu', search: 'Uluwatu Temple cliffs Bali', caption: 'Uluwatu Cliffside Temple' },
    { enTitle: 'Tegallalang', idTitle: 'Jatiluwih', search: 'Jatiluwih rice terraces Bali', caption: 'Subak Rice Terraces, Bali' },
    { enTitle: 'Nusa Penida', idTitle: 'Nusa Penida', search: 'Kelingking Beach Nusa Penida Bali', caption: 'Nusa Penida Limestone Cliffs' },
  ],
  'nusa-tenggara-barat': [
    { enTitle: 'Mount Rinjani', idTitle: 'Gunung Rinjani', search: 'Mount Rinjani Segara Anak Lombok', caption: 'Mount Rinjani & Lake Segara Anak' },
    { enTitle: 'Gili Islands', idTitle: 'Kepulauan Gili', search: 'Gili Trawangan Gili Meno beach Lombok', caption: 'Gili Islands Coral Coast, Lombok' },
    { enTitle: 'Mandalika', idTitle: 'Kuta Mandalika', search: 'Tanjung Aan Mandalika Lombok', caption: 'Mandalika & Tanjung Aan Bay, Lombok' },
    { enTitle: 'Sade Village', idTitle: 'Desa Sade', search: 'Sade traditional Sasak village Lombok', caption: 'Traditional Sasak Lumbung Village, Lombok' },
    { enTitle: 'Moyo Island', idTitle: 'Pulau Moyo', search: 'Sumbawa Kenawa Island NTB', caption: 'Sumbawa & Moyo Coastal Vista' },
  ],
  'nusa-tenggara-timur': [
    { enTitle: 'Kelimutu', idTitle: 'Danau Kelimutu', search: 'Kelimutu crater lakes Flores', caption: 'Tri-Colored Kelimutu Crater Lakes, Flores' },
    { enTitle: 'Komodo National Park', idTitle: 'Taman Nasional Komodo', search: 'Komodo dragon Padar Island NTT', caption: 'Komodo National Park, Flores' },
    { enTitle: 'Padar Island', idTitle: 'Pulau Padar', search: 'Padar Island viewpoint Komodo', caption: 'Padar Island Bays, Labuan Bajo' },
    { enTitle: 'Labuan Bajo', idTitle: 'Labuan Bajo', search: 'Labuan Bajo harbour Flores boats', caption: 'Labuan Bajo Harbor, Western Flores' },
    { enTitle: 'Sumba', idTitle: 'Pulau Sumba', search: 'Waikelo Sawah Walakiri Sumba', caption: 'Savanna & Coastline of Sumba' },
  ],
  'kalimantan-barat': [
    { enTitle: 'Equator Monument', idTitle: 'Tugu Khatulistiwa', search: 'Tugu Khatulistiwa Pontianak', caption: 'Equator Monument (Tugu Khatulistiwa), Pontianak' },
    { enTitle: 'Kapuas River', idTitle: 'Sungai Kapuas', search: 'Kapuas River Pontianak bridge', caption: 'Kapuas Riverfront, Pontianak' },
    { enTitle: 'Danau Sentarum National Park', idTitle: 'Taman Nasional Danau Sentarum', search: 'Danau Sentarum Kapuas Hulu Kalimantan', caption: 'Danau Sentarum Wetlands' },
    { enTitle: 'Singkawang', idTitle: 'Kota Singkawang', search: 'Singkawang temple Kalimantan Barat', caption: 'Singkawang Heritage & Coast' },
    { enTitle: 'Kadriah Palace', idTitle: 'Istana Kadriah', search: 'Masjid Jami Pontianak Kadriah', caption: 'Kadriah Sultanate Heritage, Pontianak' },
  ],
  'kalimantan-tengah': [
    { enTitle: 'Tanjung Puting', idTitle: 'Taman Nasional Tanjung Puting', search: 'Tanjung Puting Sekonyer river klotok', caption: 'Sekonyer River, Tanjung Puting National Park' },
    { enTitle: 'Bornean orangutan', idTitle: 'Orangutan Kalimantan', search: 'Tanjung Puting orangutan Kalimantan', caption: 'Wild Orangutan Habitat, Kalimantan Tengah' },
    { enTitle: 'Kahayan Bridge', idTitle: 'Jembatan Kahayan', search: 'Jembatan Kahayan Palangka Raya', caption: 'Kahayan Bridge, Palangka Raya' },
    { enTitle: 'Sebangau National Park', idTitle: 'Taman Nasional Sebangau', search: 'Sebangau Palangka Raya river forest', caption: 'Sebangau Peat-Swamp Forest' },
    { enTitle: 'Palangka Raya', idTitle: 'Bundaran Besar Palangka Raya', search: 'Palangka Raya Monument city', caption: 'Palangka Raya Landmark' },
  ],
  'kalimantan-selatan': [
    { enTitle: 'Lok Baintan Floating Market', idTitle: 'Pasar Terapung Lok Baintan', search: 'Pasar Terapung Lok Baintan Banjarmasin', caption: 'Lok Baintan Floating Market' },
    { enTitle: 'Sabilal Muhtadin Grand Mosque', idTitle: 'Masjid Raya Sabilal Muhtadin', search: 'Masjid Raya Sabilal Muhtadin Banjarmasin', caption: 'Sabilal Muhtadin Grand Mosque, Banjarmasin' },
    { enTitle: 'Loksado', idTitle: 'Loksado', search: 'Loksado bamboo rafting Meratus', caption: 'Meratus Bamboo Rafting, Loksado' },
    { enTitle: 'Martapura River', idTitle: 'Sungai Martapura', search: 'Banjarmasin Menara Pandang Martapura River', caption: 'Martapura Riverfront, Banjarmasin' },
    { enTitle: 'Banjarbaru', idTitle: 'Banjarbaru', search: 'Banjarbaru Murdjani Kalimantan Selatan', caption: 'Banjarbaru Provincial Civic Center' },
  ],
  'kalimantan-timur': [
    { enTitle: 'Derawan Islands', idTitle: 'Kepulauan Derawan', search: 'Derawan Island Kalimantan Timur jetty', caption: 'Derawan Archipelago Overwater Villas' },
    { enTitle: 'Kakaban', idTitle: 'Pulau Kakaban', search: 'Kakaban Island jellyfish lake Derawan', caption: 'Kakaban Stingless Jellyfish Lagoon' },
    { enTitle: 'Maratua Island', idTitle: 'Pulau Maratua', search: 'Maratua Island Berau lagoon', caption: 'Maratua Coral Atoll, Berau' },
    { enTitle: 'Mahakam River', idTitle: 'Sungai Mahakam', search: 'Samarinda Islamic Center Mahakam', caption: 'Samarinda & Mahakam River Vista' },
    { enTitle: 'Samarinda Islamic Center', idTitle: 'Masjid Islamic Center Samarinda', search: 'Masjid Baitul Muttaqien Samarinda', caption: 'Samarinda Islamic Center Mosque' },
  ],
  'kalimantan-utara': [
    { enTitle: 'Tarakan', idTitle: 'Kota Tarakan', search: 'Tarakan mangrove coast Kalimantan Utara', caption: 'Tarakan Coastal Gateway' },
    { enTitle: 'Kayan Mentarang National Park', idTitle: 'Taman Nasional Kayan Mentarang', search: 'Kayan River Long Bawang Kalimantan Utara', caption: 'Kayan Mentarang Highlands & River' },
    { enTitle: 'Nunukan', idTitle: 'Pulau Sebatik', search: 'Sebatik Nunukan Kalimantan Utara', caption: 'Nunukan & Sebatik Archipelago' },
    { enTitle: 'Tanjung Selor', idTitle: 'Tanjung Selor', search: 'Tanjung Selor Kayan River Bulungan', caption: 'Tanjung Selor & Kayan River, Bulungan' },
    { enTitle: 'Malinau Regency', idTitle: 'Kabupaten Malinau', search: 'Malinau Setulang forest Kalimantan Utara', caption: 'Malinau Tropical Rainforest' },
  ],
  'sulawesi-utara': [
    { enTitle: 'Bunaken', idTitle: 'Taman Nasional Bunaken', search: 'Bunaken Manado coral reef diving', caption: 'Bunaken National Marine Park' },
    { enTitle: 'Lake Tondano', idTitle: 'Danau Tondano', search: 'Lake Tondano Minahasa Sulawesi Utara', caption: 'Lake Tondano Highlands, Minahasa' },
    { enTitle: 'Mount Lokon', idTitle: 'Gunung Lokon', search: 'Mount Lokon Tomohon', caption: 'Mount Lokon Volcano, Tomohon' },
    { enTitle: 'Tangkoko Batuangus Nature Reserve', idTitle: 'Cagar Alam Tangkoko Batuangus', search: 'Tangkoko Bitung black macaque tarsier', caption: 'Tangkoko Nature Reserve Wildlife' },
    { enTitle: 'Soekarno Bridge', idTitle: 'Jembatan Soekarno Manado', search: 'Manado Bay Soekarno Bridge', caption: 'Manado Bay & Soekarno Bridge' },
  ],
  gorontalo: [
    { enTitle: 'Otanaha Fortress', idTitle: 'Benteng Otanaha', search: 'Benteng Otanaha Gorontalo', caption: 'Historic Otanaha Fortress, Gorontalo' },
    { enTitle: 'Lake Limboto', idTitle: 'Danau Limboto', search: 'Danau Limboto Gorontalo landscape', caption: 'Lake Limboto Basin, Gorontalo' },
    { enTitle: 'Gorontalo (city)', idTitle: 'Masjid Agung Baiturrahim Gorontalo', search: 'Gorontalo city Pulo Cinta', caption: 'Gorontalo Coastal & Island Vista' },
    { enTitle: 'Bogani Nani Wartabone National Park', idTitle: 'Taman Nasional Bogani Nani Wartabone', search: 'Olele Gorontalo diving Saronde Island', caption: 'Saronde & Olele Waters, Gorontalo' },
    { enTitle: 'Whale shark', idTitle: 'Hiu paus', search: 'Botubarani whale shark Gorontalo beach', caption: 'Coastal Waters of Tomini Bay, Gorontalo' },
  ],
  'sulawesi-tengah': [
    { enTitle: 'Togian Islands', idTitle: 'Kepulauan Togean', search: 'Togean Islands Sulawesi Tengah beach', caption: 'Togian Islands Coral Lagoons' },
    { enTitle: 'Lore Lindu National Park', idTitle: 'Taman Nasional Lore Lindu', search: 'Bada Valley megalith Lore Lindu', caption: 'Bada Valley Megaliths, Lore Lindu' },
    { enTitle: 'Lake Poso', idTitle: 'Danau Poso', search: 'Danau Poso Tentena Sulawesi Tengah', caption: 'Lake Poso & Siuri Shoreline' },
    { enTitle: 'Luwuk', idTitle: 'Kabupaten Banggai Kepulauan', search: 'Paisupok Banggai Kepulauan lake', caption: 'Banggai Islands Turquoise Cove' },
    { enTitle: 'Palu', idTitle: 'Teluk Palu', search: 'Palu Bay Donggala coast', caption: 'Palu Bay & Donggala Peninsula' },
  ],
  'sulawesi-barat': [
    { enTitle: 'Sandeq', idTitle: 'Sandeq', search: 'Perahu Sandeq Mandar Sulawesi Barat', caption: 'Traditional Mandar Sandeq Outrigger' },
    { enTitle: 'Mamuju Regency', idTitle: 'Kota Mamuju', search: 'Mamuju beach Manakarra Sulawesi Barat', caption: 'Manakarra Waterfront, Mamuju' },
    { enTitle: 'Mamasa Regency', idTitle: 'Kabupaten Mamasa', search: 'Mamasa highlands rice terrace Sulawesi Barat', caption: 'Mamasa Mountain Terraces & Villages' },
    { enTitle: 'Polewali Mandar Regency', idTitle: 'Kabupaten Polewali Mandar', search: 'Karampuang Island Mamuju Majene coast', caption: 'West Sulawesi Strait Coastline' },
    { enTitle: 'Majene Regency', idTitle: 'Kabupaten Majene', search: 'Pantai Dato Majene Sulawesi Barat', caption: 'Dato Beach Cliffs, Majene' },
  ],
  'sulawesi-selatan': [
    { enTitle: 'Tana Toraja', idTitle: 'Tana Toraja', search: 'Tongkonan Kete Kesu Tana Toraja', caption: 'Tongkonan Heritage Houses, Tana Toraja' },
    { enTitle: 'Fort Rotterdam', idTitle: 'Benteng Rotterdam', search: 'Fort Rotterdam Makassar', caption: 'Fort Rotterdam Bastion, Makassar' },
    { enTitle: 'Rammang-Rammang', idTitle: 'Rammang-Rammang', search: 'Rammang-Rammang Maros karst', caption: 'Rammang-Rammang Karst Towers, Maros' },
    { enTitle: 'Bira, Bulukumba', idTitle: 'Pantai Tanjung Bira', search: 'Tanjung Bira beach Bulukumba', caption: 'Tanjung Bira White-Sand Bay' },
    { enTitle: 'Losari Beach', idTitle: 'Pantai Losari', search: 'Masjid 99 Kubah Losari Makassar', caption: 'Losari Waterfront, Makassar' },
  ],
  'sulawesi-tenggara': [
    { enTitle: 'Wakatobi National Park', idTitle: 'Taman Nasional Wakatobi', search: 'Wakatobi Hoga Island coral reef', caption: 'Wakatobi Marine National Park' },
    { enTitle: 'Buton', idTitle: 'Benteng Keraton Buton', search: 'Benteng Keraton Buton Baubau', caption: 'Wolio Royal Fortress, Buton' },
    { enTitle: 'Kendari', idTitle: 'Teluk Kendari', search: 'Jembatan Teluk Kendari Masjid Al Alam', caption: 'Kendari Bay & Al-Alam Floating Mosque' },
    { enTitle: 'Muna Island', idTitle: 'Kabupaten Muna', search: 'Labengki Sombori Sulawesi Tenggara', caption: 'Labengki Karst Lagoon' },
    { enTitle: 'Moramo Waterfall', idTitle: 'Air Terjun Moramo', search: 'Air Terjun Moramo Konawe Selatan', caption: 'Moramo Travertine Waterfall' },
  ],
  maluku: [
    { enTitle: 'Banda Islands', idTitle: 'Kepulauan Banda', search: 'Banda Neira Banda Api volcano Maluku', caption: 'Banda Neira & Mount Api, Banda Islands' },
    { enTitle: 'Fort Belgica', idTitle: 'Benteng Belgica', search: 'Fort Belgica Banda Neira', caption: 'Fort Belgica, Banda Neira' },
    { enTitle: 'Seram Island', idTitle: 'Pantai Ora', search: 'Ora Beach Seram Island Maluku', caption: 'Ora Beach Limestone Cliffs, Seram' },
    { enTitle: 'Kei Islands', idTitle: 'Kepulauan Kei', search: 'Ngurbloat Pasir Panjang Kei Islands', caption: 'Ngurbloat White Sand Beach, Kei Islands' },
    { enTitle: 'Ambon Island', idTitle: 'Jembatan Merah Putih Ambon', search: 'Jembatan Merah Putih Teluk Ambon', caption: 'Merah Putih Bridge, Ambon Bay' },
  ],
  'maluku-utara': [
    { enTitle: 'Mount Gamalama', idTitle: 'Gunung Gamalama', search: 'Gamalama volcano Ternate lake Tolire', caption: 'Mount Gamalama & Lake Tolire, Ternate' },
    { enTitle: 'Ternate', idTitle: 'Pulau Maitara', search: 'Ternate Tidore Maitara view', caption: 'Ternate, Tidore & Maitara Channel' },
    { enTitle: 'Tidore', idTitle: 'Pulau Tidore', search: 'Mount Kie Matubu Tidore island', caption: 'Tidore Island Volcanic Cone' },
    { enTitle: 'Fort Tolukko', idTitle: 'Benteng Tolukko', search: 'Fort Tolukko Kalamata Ternate', caption: 'Fort Tolukko Historic Bastion, Ternate' },
    { enTitle: 'Morotai', idTitle: 'Pulau Dodola', search: 'Pulau Dodola Morotai sandbar', caption: 'Dodola Sandbar, Morotai' },
  ],
  papua: [
    { enTitle: 'Lake Sentani', idTitle: 'Danau Sentani', search: 'Lake Sentani Jayapura Papua', caption: 'Lake Sentani Hills, Jayapura' },
    { enTitle: 'Youtefa Bridge', idTitle: 'Jembatan Youtefa', search: 'Jembatan Youtefa Jayapura', caption: 'Youtefa Red Arch Bridge, Jayapura' },
    { enTitle: 'Jayapura', idTitle: 'Pantai Base-G', search: 'Base-G Beach Pantai Hamadi Jayapura', caption: 'Yos Sudarso Bay Coast, Jayapura' },
    { enTitle: 'Biak Island', idTitle: 'Pulau Biak', search: 'Biak Padaido islands Papua', caption: 'Biak & Padaido Island Shores' },
    { enTitle: 'Cyclops Mountains', idTitle: 'Pegunungan Cyclops', search: 'Jayapura city hills bay Papua', caption: 'Cyclops Foothills & Jayapura Bay' },
  ],
  'papua-barat': [
    { enTitle: 'Cenderawasih Bay National Park', idTitle: 'Taman Nasional Teluk Cenderawasih', search: 'Teluk Cenderawasih Kwatisore whale shark', caption: 'Cenderawasih Bay Marine Park' },
    { enTitle: 'Manokwari', idTitle: 'Kota Manokwari', search: 'Manokwari Bay Pulau Mansinam Papua Barat', caption: 'Manokwari & Mansinam Bay' },
    { enTitle: 'Arfak Mountains', idTitle: 'Pegunungan Arfak', search: 'Danau Anggi Pegunungan Arfak', caption: 'Anggi Lakes, Arfak Mountains' },
    { enTitle: 'Fakfak Regency', idTitle: 'Kabupaten Fakfak', search: 'Kaimana Triton Bay Fakfak beach', caption: 'Triton Bay & West Bomberai Coast' },
    { enTitle: 'Wilson\'s bird-of-paradise', idTitle: 'Cenderawasih', search: 'Bird of paradise Papua forest', caption: 'Endemic Bird-of-Paradise Habitat' },
  ],
  'papua-selatan': [
    { enTitle: 'Wasur National Park', idTitle: 'Taman Nasional Wasur', search: 'Wasur National Park Merauke musamus', caption: 'Wasur National Park Wetlands & Savanna' },
    { enTitle: 'Merauke Regency', idTitle: 'Kota Merauke', search: 'Tugu Nol Kilometer Merauke Lampu Satu', caption: 'Merauke Coastal Frontier' },
    { enTitle: 'Asmat people', idTitle: 'Suku Asmat', search: 'Asmat traditional wood carving canoe', caption: 'Asmat Heritage Art & River Culture' },
    { enTitle: 'Bian River', idTitle: 'Taman Nasional Wasur', search: 'Wasur Merauke wallaby wetland', caption: 'Wasur Floodplains, Papua Selatan' },
    { enTitle: 'Lorentz\'s bird-of-paradise', idTitle: 'Kabupaten Merauke', search: 'Merauke sunset beach Papua', caption: 'Arafura Sunset Shore, Merauke' },
  ],
  'papua-tengah': [
    { enTitle: 'Puncak Jaya', idTitle: 'Puncak Jaya', search: 'Puncak Jaya Carstensz Pyramid summit', caption: 'Puncak Jaya (Carstensz Pyramid)' },
    { enTitle: 'Lorentz National Park', idTitle: 'Taman Nasional Lorentz', search: 'Lorentz National Park alpine Papua', caption: 'Lorentz National Park Highlands' },
    { enTitle: 'Nabire', idTitle: 'Kabupaten Nabire', search: 'Nabire Cenderawasih whale shark Kwatisore', caption: 'Nabire Coast & Whale Shark Waters' },
    { enTitle: 'Sudirman Range', idTitle: 'Pegunungan Sudirman', search: 'Grasberg Sudirman mountains Papua', caption: 'Sudirman Mountain Range' },
    { enTitle: 'Timika', idTitle: 'Timika', search: 'Mimika Timika mangrove river Papua', caption: 'Mimika Coastal Delta, Papua Tengah' },
  ],
  'papua-pegunungan': [
    { enTitle: 'Baliem Valley', idTitle: 'Lembah Baliem', search: 'Baliem Valley Wamena mountains', caption: 'Baliem Valley Highlands, Wamena' },
    { enTitle: 'Wamena', idTitle: 'Wamena', search: 'Baliem River bridge Wamena Papua', caption: 'Wamena & Baliem Valley Panorama' },
    { enTitle: 'Dani people', idTitle: 'Suku Dani', search: 'Dani Baliem Valley Cultural Festival', caption: 'Baliem Valley Cultural Tradition' },
    { enTitle: 'Puncak Trikora', idTitle: 'Puncak Trikora', search: 'Lake Habema Jayawijaya Papua', caption: 'Lake Habema & Jayawijaya Peaks' },
    { enTitle: 'Honai', idTitle: 'Honai', search: 'Honai traditional village Wamena', caption: 'Traditional Honai Compound, Baliem Valley' },
  ],
  'papua-barat-daya': [
    { enTitle: 'Raja Ampat Islands', idTitle: 'Kepulauan Raja Ampat', search: 'Wayag Raja Ampat islands lagoon', caption: 'Wayag Limestone Karst, Raja Ampat' },
    { enTitle: 'Misool', idTitle: 'Pulau Misool', search: 'Misool Raja Ampat lagoon islands', caption: 'Misool Turquoise Lagoons, Raja Ampat' },
    { enTitle: 'Waigeo', idTitle: 'Pulau Waigeo', search: 'Piaynemo Raja Ampat viewpoint', caption: 'Piaynemo Archipelago Overlook, Raja Ampat' },
    { enTitle: 'Raja Ampat Regency', idTitle: 'Kabupaten Raja Ampat', search: 'Raja Ampat coral reef diver seascape', caption: 'Raja Ampat Coral Reef Sanctuary' },
    { enTitle: 'Sorong', idTitle: 'Kota Sorong', search: 'Arborek Friwen Raja Ampat beach jetty', caption: 'Raja Ampat Jetty & Sorong Gateway' },
  ],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => "'" + String(s).replace(/'/g, "''") + "'";

function stripHtml(html) {
  return String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function isBlockedText(text) {
  const s = String(text || '');
  return BLOCKLIST_PATTERNS.some((re) => re.test(s));
}

function isOldCaptureYear(dateStr) {
  const s = String(dateStr || '').trim();
  const match = s.match(/^\s*(\d{4})\b/);
  if (!match) return false;
  return Number(match[1]) < 2000;
}

function cleanCaptionFromTitle(fileTitle) {
  let s = String(fileTitle || '').replace(/^file:/i, '');
  const dot = s.lastIndexOf('.');
  if (dot > 0) s = s.slice(0, dot);
  s = s
    .replace(/\s*-?\s*panoramio.*$/i, '')
    .replace(/\(\d+\)\s*$/g, '')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return s || 'Scenic View';
}

async function fetchJson(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (res.status === 429 && attempt <= 1) {
      await sleep(1200);
      return fetchJson(url, attempt + 1);
    }
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    if (attempt <= 1 && /timeout|abort|429|5\d\d/i.test(String(err.message || err.name))) {
      await sleep(1200);
      return fetchJson(url, attempt + 1);
    }
    throw err;
  }
}

function normalizeWikimediaUrl(rawUrl) {
  return String(rawUrl || '').replace(
    /^https:\/\/thumb\.wikimedia\.org\//i,
    'https://upload.wikimedia.org/'
  );
}

function validateCommonsImageInfo(title, info, minAspectRatio = 0.95) {
  if (!info) return { ok: false, reason: 'missing info' };
  if (info.mime !== 'image/jpeg') return { ok: false, reason: `mime=${info.mime}` };

  const url = normalizeWikimediaUrl(info.thumburl || info.url || '');
  if (!url.startsWith('https://upload.wikimedia.org/')) {
    return { ok: false, reason: 'invalid host' };
  }

  const width = Number(info.thumbwidth || info.width || 0);
  const height = Number(info.thumbheight || info.height || 0);
  if (width < 500 || height < 320) {
    return { ok: false, reason: `too small ${width}x${height}` };
  }
  if (width < height * minAspectRatio) {
    return { ok: false, reason: `portrait/tall ratio ${width}x${height}` };
  }

  const meta = info.extmetadata || {};
  const imgDesc = stripHtml(meta.ImageDescription?.value);
  const categories = stripHtml(meta.Categories?.value);
  const dateOriginal = stripHtml(meta.DateTimeOriginal?.value);

  if (isOldCaptureYear(dateOriginal)) {
    return { ok: false, reason: `old capture year ${dateOriginal}` };
  }
  if (
    isBlockedText(title) ||
    isBlockedText(url) ||
    isBlockedText(imgDesc) ||
    isBlockedText(categories)
  ) {
    return { ok: false, reason: 'blocklist match' };
  }

  return { ok: true, url };
}

function getValidWikiThumbFallback(hit, rejectedTitles) {
  if (!hit?.thumb?.source) return null;
  const fileTitle = String(hit.fileTitle || '');
  if (rejectedTitles.has(fileTitle)) return null;
  const url = normalizeWikimediaUrl(hit.thumb.source);
  const width = Number(hit.thumb.width || 0);
  const height = Number(hit.thumb.height || 0);
  if (!url.startsWith('https://upload.wikimedia.org/')) {
    return null;
  }
  if (!/\.jpe?g(\?|$)/i.test(url)) return null;
  if (width < 500 || height <= 0 || width < height * 0.95) return null;
  if (isBlockedText(fileTitle) || isBlockedText(url)) return null;
  return { url, fileTitle };
}

async function fetchWikiPageImages(lang, titles) {
  const resultMap = new Map();
  const unique = [...new Set(titles.filter(Boolean))];
  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    const url =
      `https://${lang}.wikipedia.org/w/api.php` +
      `?action=query&titles=${encodeURIComponent(batch.join('|'))}` +
      '&prop=pageimages&piprop=thumbnail|name&pithumbsize=960&redirects=1&format=json';
    try {
      const data = await fetchJson(url);
      const redirects = new Map(
        (data?.query?.redirects || []).map((r) => [r.from, r.to])
      );
      const normalized = new Map(
        (data?.query?.normalized || []).map((n) => [n.from, n.to])
      );
      const pagesByTitle = new Map();
      for (const page of Object.values(data?.query?.pages || {})) {
        if (page?.title && page?.thumbnail?.source && page?.pageimage) {
          pagesByTitle.set(page.title, {
            fileTitle: `File:${page.pageimage}`,
            thumb: page.thumbnail,
          });
        }
      }
      for (const orig of batch) {
        let cur = normalized.get(orig) || orig;
        if (redirects.has(cur)) cur = redirects.get(cur);
        if (pagesByTitle.has(cur)) {
          resultMap.set(orig, pagesByTitle.get(cur));
        }
      }
    } catch (err) {
      console.warn(`Wikipedia (${lang}) batch warning: ${err.message}`);
    }
    await sleep(150);
  }
  return resultMap;
}

async function verifyCommonsFiles(fileTitles) {
  const verified = new Map();
  const rejectedTitles = new Set();
  const unique = [...new Set(fileTitles.filter(Boolean))];
  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    const url =
      'https://commons.wikimedia.org/w/api.php' +
      `?action=query&titles=${encodeURIComponent(batch.join('|'))}` +
      '&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=960&format=json';
    try {
      const data = await fetchJson(url);
      const normalized = new Map(
        (data?.query?.normalized || []).map((n) => [n.from, n.to])
      );
      const byTitle = new Map();
      const rejectedNorm = new Set();
      for (const page of Object.values(data?.query?.pages || {})) {
        if (page.missing !== undefined) continue;
        const info = page?.imageinfo?.[0];
        const check = validateCommonsImageInfo(page.title, info, 0.95);
        if (check.ok) {
          byTitle.set(page.title, {
            url: check.url,
            fileTitle: page.title,
          });
        } else {
          rejectedNorm.add(page.title);
        }
      }
      for (const orig of batch) {
        const norm = normalized.get(orig) || orig;
        if (byTitle.has(norm)) {
          verified.set(orig, byTitle.get(norm));
        } else if (rejectedNorm.has(norm)) {
          rejectedTitles.add(orig);
        }
      }
    } catch (err) {
      console.warn(`Commons batch verify warning: ${err.message}`);
    }
    await sleep(150);
  }
  return { verified, rejectedTitles };
}

async function searchCommonsScenic(searchTerm) {
  const url =
    'https://commons.wikimedia.org/w/api.php' +
    `?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}` +
    '&gsrnamespace=6&gsrlimit=14&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=960&format=json';
  const data = await fetchJson(url);
  const pages = Object.values(data?.query?.pages || {});
  const results = [];
  for (const page of pages) {
    const info = page?.imageinfo?.[0];
    const check = validateCommonsImageInfo(page.title, info, 1.05);
    if (!check.ok) continue;
    results.push({
      url: check.url,
      fileTitle: page.title,
    });
  }
  return results;
}

async function main() {
  const provinces = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const missingProvinceIds = provinces
    .map((p) => p.id)
    .filter((id) => !PROVINCE_LANDMARKS[id]);
  if (missingProvinceIds.length > 0) {
    throw new Error(`Missing PROVINCE_LANDMARKS entries for: ${missingProvinceIds.join(', ')}`);
  }

  console.log('Tier 1a: Fetching English Wikipedia landmark pageimages...');
  const allEnTitles = Object.values(PROVINCE_LANDMARKS).flatMap((items) =>
    items.map((item) => item.enTitle)
  );
  const enPageImages = await fetchWikiPageImages('en', allEnTitles);

  console.log('Tier 1b: Fetching Indonesian Wikipedia landmark pageimages...');
  const allIdTitles = Object.values(PROVINCE_LANDMARKS).flatMap((items) =>
    items.map((item) => item.idTitle)
  );
  const idPageImages = await fetchWikiPageImages('id', allIdTitles);

  const candidateFiles = [];
  for (const item of enPageImages.values()) candidateFiles.push(item.fileTitle);
  for (const item of idPageImages.values()) candidateFiles.push(item.fileTitle);

  console.log(`Verifying ${new Set(candidateFiles).size} Tier 1 Commons files for modern color landscape JPEGs...`);
  const { verified: verifiedCommons, rejectedTitles } = await verifyCommonsFiles(candidateFiles);

  const byProv = new Map();
  for (const prov of provinces) {
    const list = [];
    const seenUrls = new Set();
    const landmarks = PROVINCE_LANDMARKS[prov.id] || [];

    for (const lm of landmarks) {
      if (list.length >= 5) break;
      const enHit = lm.enTitle ? enPageImages.get(lm.enTitle) : null;
      const idHit = lm.idTitle ? idPageImages.get(lm.idTitle) : null;

      let chosen = null;
      if (enHit && verifiedCommons.has(enHit.fileTitle)) {
        chosen = verifiedCommons.get(enHit.fileTitle);
      } else if (idHit && verifiedCommons.has(idHit.fileTitle)) {
        chosen = verifiedCommons.get(idHit.fileTitle);
      } else {
        chosen =
          getValidWikiThumbFallback(enHit, rejectedTitles) ||
          getValidWikiThumbFallback(idHit, rejectedTitles);
      }

      if (chosen && !seenUrls.has(chosen.url)) {
        seenUrls.add(chosen.url);
        list.push({
          url: chosen.url,
          caption: lm.caption,
        });
      }
    }
    byProv.set(prov.id, list);
  }

  const needTopUp = provinces.filter((p) => (byProv.get(p.id) || []).length < 3);
  console.log(
    `Tier 2: Topping up ${needTopUp.length} provinces with < 3 curated photos (concurrency 4)...`
  );

  async function topUpProvince(prov) {
    const list = byProv.get(prov.id);
    const seenUrls = new Set(list.map((p) => p.url));
    const landmarks = PROVINCE_LANDMARKS[prov.id] || [];
    let searchesDone = 0;

    for (const lm of landmarks) {
      if (list.length >= 4) break;
      if (searchesDone >= 3 && list.length >= 3) break;
      searchesDone += 1;
      try {
        const hits = await searchCommonsScenic(lm.search);
        for (const hit of hits) {
          if (list.length >= 4) break;
          if (!seenUrls.has(hit.url)) {
            seenUrls.add(hit.url);
            list.push({
              url: hit.url,
              caption: lm.caption || cleanCaptionFromTitle(hit.fileTitle),
            });
            break;
          }
        }
      } catch (err) {
        console.warn(`Tier 2 warning [${prov.id}] "${lm.search}": ${err.message}`);
      }
      await sleep(250);
    }

    if (list.length < 3) {
      const extraQueries = [
        `${prov.name} Indonesia landscape`,
        `${prov.capital} Indonesia tourism`,
      ];
      for (const q of extraQueries) {
        if (list.length >= 4) break;
        if (list.length >= 3) break;
        try {
          const hits = await searchCommonsScenic(q);
          for (const hit of hits) {
            if (list.length >= 4) break;
            if (!seenUrls.has(hit.url)) {
              seenUrls.add(hit.url);
              list.push({
                url: hit.url,
                caption: cleanCaptionFromTitle(hit.fileTitle),
              });
            }
          }
        } catch (err) {
          console.warn(`Tier 2 fallback warning [${prov.id}] "${q}": ${err.message}`);
        }
        await sleep(250);
      }
    }

    console.log(`  Top-up finished [${prov.id}] -> ${list.length} photos`);
  }

  const queue = [...needTopUp];
  const workers = Array.from({ length: Math.min(4, queue.length) }, async () => {
    while (queue.length > 0) {
      const prov = queue.shift();
      if (prov) {
        await topUpProvince(prov);
      }
    }
  });
  await Promise.all(workers);

  const statements = [];
  const flatCurated = [];
  let minCount = Infinity;
  let totalCount = 0;
  const low = [];

  for (const prov of provinces) {
    const list = (byProv.get(prov.id) || []).slice(0, 5);
    if (list.length < minCount) minCount = list.length;
    totalCount += list.length;
    if (list.length < 3) low.push({ id: prov.id, count: list.length });
    console.log(`[${prov.id}] -> ${list.length} photos | ${list.map((p) => p.caption).join(' ; ')}`);

    list.forEach((photo, idx) => {
      flatCurated.push({
        province_id: prov.id,
        url: photo.url,
        caption: photo.caption,
        sort_order: idx,
      });
      statements.push(
        `insert into public.province_photos (province_id, url, storage_path, caption, sort_order)\n` +
          `select ${esc(prov.id)}, ${esc(photo.url)}, null, ${esc(photo.caption)}, ${idx}\n` +
          `where not exists (\n` +
          `  select 1 from public.province_photos where province_id = ${esc(prov.id)} and url = ${esc(photo.url)}\n` +
          `);`
      );
    });
  }

  const sql =
    `-- Curated modern color scenic gallery photos for all ${provinces.length} provinces\n\n` +
    statements.join('\n\n') +
    '\n';

  fs.writeFileSync(SQL_PATH, sql, 'utf8');
  fs.writeFileSync(
    'C:/Users/HYPE-R/.gemini/antigravity/brain/c16895a6-ed33-411a-a2ca-88df3c58e60f/scratch/curated-photos.json',
    JSON.stringify(flatCurated, null, 2),
    'utf8'
  );
  console.log(`\nTotal curated photos: ${totalCount} across ${provinces.length} provinces (min per province: ${minCount})`);
  if (low.length > 0) {
    console.log('Low count (<3) provinces:', low);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
