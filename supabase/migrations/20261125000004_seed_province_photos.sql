-- Curated modern color scenic gallery photos for all 38 provinces

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'aceh', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Meuseujid_Raya_Baiturrahman_.jpg/960px-Meuseujid_Raya_Baiturrahman_.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Baiturrahman Grand Mosque, Banda Aceh', 0
where not exists (
  select 1 from public.province_photos where province_id = 'aceh' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Meuseujid_Raya_Baiturrahman_.jpg/960px-Meuseujid_Raya_Baiturrahman_.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'aceh', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Aceh_Tsunami_Museum_site_visit%3B_February_2020_%2853%29.jpg/960px-Aceh_Tsunami_Museum_site_visit%3B_February_2020_%2853%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Aceh Tsunami Museum, Banda Aceh', 1
where not exists (
  select 1 from public.province_photos where province_id = 'aceh' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Aceh_Tsunami_Museum_site_visit%3B_February_2020_%2853%29.jpg/960px-Aceh_Tsunami_Museum_site_visit%3B_February_2020_%2853%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'aceh', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Danau_Laut_Tawar.jpg/960px-Danau_Laut_Tawar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lake Laut Tawar, Takengon Highlands', 2
where not exists (
  select 1 from public.province_photos where province_id = 'aceh' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Danau_Laut_Tawar.jpg/960px-Danau_Laut_Tawar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'aceh', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Taman_Nasional_Gunung_Leuser.jpg/960px-Taman_Nasional_Gunung_Leuser.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Gunung Leuser National Park', 3
where not exists (
  select 1 from public.province_photos where province_id = 'aceh' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Taman_Nasional_Gunung_Leuser.jpg/960px-Taman_Nasional_Gunung_Leuser.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Lake_Toba_and_the_surrounding_hills.jpg/960px-Lake_Toba_and_the_surrounding_hills.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lake Toba Volcanic Caldera', 0
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Lake_Toba_and_the_surrounding_hills.jpg/960px-Lake_Toba_and_the_surrounding_hills.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Istana_Maimoon.jpg/960px-Istana_Maimoon.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Maimun Palace, Medan', 1
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Istana_Maimoon.jpg/960px-Istana_Maimoon.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-utara', 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Orang_utan_and_man.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Bukit Lawang Rainforest Reserve', 2
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Orang_utan_and_man.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kecamatan_Berastagi%2C_Karo_02.jpg/960px-Kecamatan_Berastagi%2C_Karo_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Berastagi Volcanic Highlands', 3
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kecamatan_Berastagi%2C_Karo_02.jpg/960px-Kecamatan_Berastagi%2C_Karo_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Bukittinggi_Ca%C3%B1%C3%B3n_del_Sianok.JPG/960px-Bukittinggi_Ca%C3%B1%C3%B3n_del_Sianok.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Sianok Canyon (Ngarai Sianok)', 0
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Bukittinggi_Ca%C3%B1%C3%B3n_del_Sianok.JPG/960px-Bukittinggi_Ca%C3%B1%C3%B3n_del_Sianok.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Rumah_Gadang.jpg/960px-Rumah_Gadang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Traditional Minangkabau Rumah Gadang', 1
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Rumah_Gadang.jpg/960px-Rumah_Gadang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-barat', 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Maninjau.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Lake Maninjau Crater Lake', 2
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Maninjau.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Istano_Pagaruyuang.jpg/960px-Istano_Pagaruyuang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Istano Basa Pagaruyung Palace', 3
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Istano_Pagaruyuang.jpg/960px-Istano_Pagaruyuang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-barat', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lembah_harau_50_kota.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Harau Valley Cliffs, Payakumbuh', 4
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lembah_harau_50_kota.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'riau', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Istana_Kerajaan_Siak_%282%29.jpg/960px-Istana_Kerajaan_Siak_%282%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Siak Sri Indrapura Palace', 0
where not exists (
  select 1 from public.province_photos where province_id = 'riau' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Istana_Kerajaan_Siak_%282%29.jpg/960px-Istana_Kerajaan_Siak_%282%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'riau', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/003_Site_from_South-West_%2838244920665%29.jpg/960px-003_Site_from_South-West_%2838244920665%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Muara Takus Ancient Temple', 1
where not exists (
  select 1 from public.province_photos where province_id = 'riau' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/003_Site_from_South-West_%2838244920665%29.jpg/960px-003_Site_from_South-West_%2838244920665%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'riau', 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Pantai_Ketapang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Pekanbaru & Riau Riverine Vista', 2
where not exists (
  select 1 from public.province_photos where province_id = 'riau' and url = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Pantai_Ketapang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kepulauan-riau', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jembatan_Tengku_Fisabilillah_%28jembatan_I%29.jpg/960px-Jembatan_Tengku_Fisabilillah_%28jembatan_I%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Barelang Bridge, Batam', 0
where not exists (
  select 1 from public.province_photos where province_id = 'kepulauan-riau' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jembatan_Tengku_Fisabilillah_%28jembatan_I%29.jpg/960px-Jembatan_Tengku_Fisabilillah_%28jembatan_I%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kepulauan-riau', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sumpat%2C_Bintan.JPG/960px-Sumpat%2C_Bintan.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Bintan Island Tropical Coast', 1
where not exists (
  select 1 from public.province_photos where province_id = 'kepulauan-riau' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sumpat%2C_Bintan.JPG/960px-Sumpat%2C_Bintan.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kepulauan-riau', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Pulau_Penyengat.jpg/960px-Pulau_Penyengat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Sultan Riau Grand Mosque, Penyengat Island', 2
where not exists (
  select 1 from public.province_photos where province_id = 'kepulauan-riau' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Pulau_Penyengat.jpg/960px-Pulau_Penyengat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kepulauan-riau', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Anambas_Islands%2C_Riau_Islands_Province.jpg/960px-Anambas_Islands%2C_Riau_Islands_Province.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Anambas Islands Turquoise Lagoon', 3
where not exists (
  select 1 from public.province_photos where province_id = 'kepulauan-riau' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Anambas_Islands%2C_Riau_Islands_Province.jpg/960px-Anambas_Islands%2C_Riau_Islands_Province.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kepulauan-riau', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Natuna_Sea.jpg/960px-Natuna_Sea.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Natuna Granite Shoreline', 4
where not exists (
  select 1 from public.province_photos where province_id = 'kepulauan-riau' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Natuna_Sea.jpg/960px-Natuna_Sea.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jambi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Uprising-mount_kerinci.jpg/960px-Uprising-mount_kerinci.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mount Kerinci Summit, Jambi', 0
where not exists (
  select 1 from public.province_photos where province_id = 'jambi' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Uprising-mount_kerinci.jpg/960px-Uprising-mount_kerinci.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jambi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Candi_Muaro_Jambi_di_siang_hari.jpg/960px-Candi_Muaro_Jambi_di_siang_hari.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Muaro Jambi Buddhist Temple Complex', 1
where not exists (
  select 1 from public.province_photos where province_id = 'jambi' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Candi_Muaro_Jambi_di_siang_hari.jpg/960px-Candi_Muaro_Jambi_di_siang_hari.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jambi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Danau_Gunung_Tujuh.jpg/960px-Danau_Gunung_Tujuh.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lake Gunung Tujuh Crater', 2
where not exists (
  select 1 from public.province_photos where province_id = 'jambi' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Danau_Gunung_Tujuh.jpg/960px-Danau_Gunung_Tujuh.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jambi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Hipwee-tanggo.jpg/960px-Hipwee-tanggo.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Gentala Arasy Pedestrian Bridge, Jambi', 3
where not exists (
  select 1 from public.province_photos where province_id = 'jambi' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Hipwee-tanggo.jpg/960px-Hipwee-tanggo.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jambi', 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Mount_Kerinci_from_Kayuaro.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Kerinci Seblat Highlands & Tea Estates', 4
where not exists (
  select 1 from public.province_photos where province_id = 'jambi' and url = 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Mount_Kerinci_from_Kayuaro.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Jembatan_Ampera_at_night.JPG/960px-Jembatan_Ampera_at_night.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Ampera Bridge over the Musi River', 0
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Jembatan_Ampera_at_night.JPG/960px-Jembatan_Ampera_at_night.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Masjid_Agung_Palembang.jpg/960px-Masjid_Agung_Palembang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Sultan Mahmud Badaruddin II Great Mosque', 1
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Masjid_Agung_Palembang.jpg/960px-Masjid_Agung_Palembang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sumatera-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gunung_dempo_%28cropped%29.jpg/960px-Gunung_dempo_%28cropped%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mount Dempo & Pagar Alam Highlands', 2
where not exists (
  select 1 from public.province_photos where province_id = 'sumatera-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gunung_dempo_%28cropped%29.jpg/960px-Gunung_dempo_%28cropped%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kepulauan-bangka-belitung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lengkuas_Island.JPG/960px-Lengkuas_Island.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lengkuas Island Lighthouse, Belitung', 0
where not exists (
  select 1 from public.province_photos where province_id = 'kepulauan-bangka-belitung' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lengkuas_Island.JPG/960px-Lengkuas_Island.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kepulauan-bangka-belitung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pantai_Parai_Tenggiri_Bangka.jpg/960px-Pantai_Parai_Tenggiri_Bangka.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Granite Coastline of Bangka', 1
where not exists (
  select 1 from public.province_photos where province_id = 'kepulauan-bangka-belitung' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pantai_Parai_Tenggiri_Bangka.jpg/960px-Pantai_Parai_Tenggiri_Bangka.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kepulauan-bangka-belitung', 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Pasir-padi.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Pasir Padi Shore, Pangkal Pinang', 2
where not exists (
  select 1 from public.province_photos where province_id = 'kepulauan-bangka-belitung' and url = 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Pasir-padi.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'bengkulu', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Front_gate_of_Fort_Marlborough%2C_Bengkulu_2015-04-19_02.jpg/960px-Front_gate_of_Fort_Marlborough%2C_Bengkulu_2015-04-19_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Fort Marlborough Heritage Bastion, Bengkulu', 0
where not exists (
  select 1 from public.province_photos where province_id = 'bengkulu' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Front_gate_of_Fort_Marlborough%2C_Bengkulu_2015-04-19_02.jpg/960px-Front_gate_of_Fort_Marlborough%2C_Bengkulu_2015-04-19_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'bengkulu', 'https://upload.wikimedia.org/wikipedia/id/thumb/2/2b/Pantaipanjang_afifah.jpg/960px-Pantaipanjang_afifah.jpg?utm_source=id.wikipedia.org&utm_campaign=api&utm_content=thumbnail', null, 'Panjang Beach Indian Ocean Coast', 1
where not exists (
  select 1 from public.province_photos where province_id = 'bengkulu' and url = 'https://upload.wikimedia.org/wikipedia/id/thumb/2/2b/Pantaipanjang_afifah.jpg/960px-Pantaipanjang_afifah.jpg?utm_source=id.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'bengkulu', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Rafflesia_arnoldii%2C_Sumatra.jpg/960px-Rafflesia_arnoldii%2C_Sumatra.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Giant Rafflesia arnoldii Bloom', 2
where not exists (
  select 1 from public.province_photos where province_id = 'bengkulu' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Rafflesia_arnoldii%2C_Sumatra.jpg/960px-Rafflesia_arnoldii%2C_Sumatra.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'bengkulu', 'https://upload.wikimedia.org/wikipedia/commons/9/94/Masjid_Jamik_Bengkulu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Sukarno Exile Residence & Heritage, Bengkulu', 3
where not exists (
  select 1 from public.province_photos where province_id = 'bengkulu' and url = 'https://upload.wikimedia.org/wikipedia/commons/9/94/Masjid_Jamik_Bengkulu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'lampung', 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Sumatran_Rhinoceros_Way_Kambas_2008.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Way Kambas Elephant Sanctuary', 0
where not exists (
  select 1 from public.province_photos where province_id = 'lampung' and url = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Sumatran_Rhinoceros_Way_Kambas_2008.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'lampung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Anak_krakatau_sebelum_tsunami.jpg/960px-Anak_krakatau_sebelum_tsunami.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Anak Krakatau Volcano, Sunda Strait', 1
where not exists (
  select 1 from public.province_photos where province_id = 'lampung' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Anak_krakatau_sebelum_tsunami.jpg/960px-Anak_krakatau_sebelum_tsunami.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'lampung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pahawang_Island%2C_Indonesia_%28Unsplash%29.jpg/960px-Pahawang_Island%2C_Indonesia_%28Unsplash%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Pahawang Island Coral Shoals', 2
where not exists (
  select 1 from public.province_photos where province_id = 'lampung' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pahawang_Island%2C_Indonesia_%28Unsplash%29.jpg/960px-Pahawang_Island%2C_Indonesia_%28Unsplash%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'lampung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Landscape_of_coconut_island_in_Kiluan_Bay.jpg/960px-Landscape_of_coconut_island_in_Kiluan_Bay.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Kiluan Bay Lagoon & Cliffs', 3
where not exists (
  select 1 from public.province_photos where province_id = 'lampung' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Landscape_of_coconut_island_in_Kiluan_Bay.jpg/960px-Landscape_of_coconut_island_in_Kiluan_Bay.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'lampung', 'https://upload.wikimedia.org/wikipedia/commons/8/83/Bakauheni_Port_and_Siger_Tower.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Menara Siger Landmark, Bakauheni', 4
where not exists (
  select 1 from public.province_photos where province_id = 'lampung' and url = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Bakauheni_Port_and_Siger_Tower.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'dki-jakarta', 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Masjid_Istiqlal_-_Panoramio.jpg/960px-Masjid_Istiqlal_-_Panoramio.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', null, 'Istiqlal Mosque, Jakarta', 0
where not exists (
  select 1 from public.province_photos where province_id = 'dki-jakarta' and url = 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Masjid_Istiqlal_-_Panoramio.jpg/960px-Masjid_Istiqlal_-_Panoramio.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'dki-jakarta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Batavia_City_Hall_%28Jakarta_History_Museum%29_Fatahillah_Square_%282025%29_-_img_01.jpg/960px-Batavia_City_Hall_%28Jakarta_History_Museum%29_Fatahillah_Square_%282025%29_-_img_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Fatahillah Square, Kota Tua Jakarta', 1
where not exists (
  select 1 from public.province_photos where province_id = 'dki-jakarta' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Batavia_City_Hall_%28Jakarta_History_Museum%29_Fatahillah_Square_%282025%29_-_img_01.jpg/960px-Batavia_City_Hall_%28Jakarta_History_Museum%29_Fatahillah_Square_%282025%29_-_img_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'dki-jakarta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Pinisi_Sunda_Kelapa.jpg/960px-Pinisi_Sunda_Kelapa.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Sunda Kelapa Historic Harbor', 2
where not exists (
  select 1 from public.province_photos where province_id = 'dki-jakarta' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Pinisi_Sunda_Kelapa.jpg/960px-Pinisi_Sunda_Kelapa.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'dki-jakarta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Jakartacityofindonesia_%28cropped%29.jpg/960px-Jakartacityofindonesia_%28cropped%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Jakarta Skyline & Senayan District', 3
where not exists (
  select 1 from public.province_photos where province_id = 'dki-jakarta' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Jakartacityofindonesia_%28cropped%29.jpg/960px-Jakartacityofindonesia_%28cropped%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg/960px-Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Kawah Putih Crater Lake, Ciwidey', 0
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg/960px-Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Tangkuban_Prahu.jpg/960px-Tangkuban_Prahu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Tangkuban Perahu Volcanic Crater', 1
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Tangkuban_Prahu.jpg/960px-Tangkuban_Prahu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Gedung_Sate_Oktober_2024_-_Rahmatdenas.jpg/960px-Gedung_Sate_Oktober_2024_-_Rahmatdenas.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Gedung Sate Heritage Landmark, Bandung', 2
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Gedung_Sate_Oktober_2024_-_Rahmatdenas.jpg/960px-Gedung_Sate_Oktober_2024_-_Rahmatdenas.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Kebun_Raya_Bogor_19.jpg/960px-Kebun_Raya_Bogor_19.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Bogor Botanical Gardens', 3
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Kebun_Raya_Bogor_19.jpg/960px-Kebun_Raya_Bogor_19.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Pantai_Pangandaran.jpg/960px-Pantai_Pangandaran.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Pangandaran Coast & Green Canyon', 4
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Pantai_Pangandaran.jpg/960px-Pantai_Pangandaran.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'banten', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ujung_Kulon_National_Park%2C_2014.jpg/960px-Ujung_Kulon_National_Park%2C_2014.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Ujung Kulon National Park Coast', 0
where not exists (
  select 1 from public.province_photos where province_id = 'banten' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ujung_Kulon_National_Park%2C_2014.jpg/960px-Ujung_Kulon_National_Park%2C_2014.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'banten', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Masjid_agung_banten_lama.jpg/960px-Masjid_agung_banten_lama.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Great Mosque of Old Banten', 1
where not exists (
  select 1 from public.province_photos where province_id = 'banten' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Masjid_agung_banten_lama.jpg/960px-Masjid_agung_banten_lama.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'banten', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Tanjung_Lesung_in_the_Morning.jpg/960px-Tanjung_Lesung_in_the_Morning.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Carita & Tanjung Lesung Shore', 2
where not exists (
  select 1 from public.province_photos where province_id = 'banten' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Tanjung_Lesung_in_the_Morning.jpg/960px-Tanjung_Lesung_in_the_Morning.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pradaksina.jpg/960px-Pradaksina.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Borobudur Temple Monument, Magelang', 0
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pradaksina.jpg/960px-Pradaksina.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Lawang_sewu_semarang.jpg/960px-Lawang_sewu_semarang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lawang Sewu Historic Building, Semarang', 1
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Lawang_sewu_semarang.jpg/960px-Lawang_sewu_semarang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Arjuna_Temple_Complex_in_the_Dieng_Plateau.jpg/960px-Arjuna_Temple_Complex_in_the_Dieng_Plateau.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Arjuna Temple Complex, Dieng Plateau', 2
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Arjuna_Temple_Complex_in_the_Dieng_Plateau.jpg/960px-Arjuna_Temple_Complex_in_the_Dieng_Plateau.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/FishingKarimun.jpg/960px-FishingKarimun.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Karimunjawa Marine Archipelago', 3
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/FishingKarimun.jpg/960px-FishingKarimun.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gedong_Songo_III%2C_1211.jpg/960px-Gedong_Songo_III%2C_1211.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Gedong Songo Highland Temples', 4
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gedong_Songo_III%2C_1211.jpg/960px-Gedong_Songo_III%2C_1211.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'di-yogyakarta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Yogyakarta_Indonesia_Prambanan-temple-complex-02.jpg/960px-Yogyakarta_Indonesia_Prambanan-temple-complex-02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Prambanan Hindu Temple Compound', 0
where not exists (
  select 1 from public.province_photos where province_id = 'di-yogyakarta' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Yogyakarta_Indonesia_Prambanan-temple-complex-02.jpg/960px-Yogyakarta_Indonesia_Prambanan-temple-complex-02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'di-yogyakarta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_%282025%29_-_img_02.jpg/960px-Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_%282025%29_-_img_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Kraton Royal Palace, Yogyakarta', 1
where not exists (
  select 1 from public.province_photos where province_id = 'di-yogyakarta' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_%282025%29_-_img_02.jpg/960px-Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_%282025%29_-_img_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'di-yogyakarta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Jogja_-_Tugu_Monument_%282025%29_-_img_06.jpg/960px-Jogja_-_Tugu_Monument_%282025%29_-_img_06.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Tugu Yogyakarta Monument', 2
where not exists (
  select 1 from public.province_photos where province_id = 'di-yogyakarta' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Jogja_-_Tugu_Monument_%282025%29_-_img_06.jpg/960px-Jogja_-_Tugu_Monument_%282025%29_-_img_06.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'di-yogyakarta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tower_in_Taman_Sari%2C_2014-05-19.jpg/960px-Tower_in_Taman_Sari%2C_2014-05-19.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Taman Sari Royal Water Castle', 3
where not exists (
  select 1 from public.province_photos where province_id = 'di-yogyakarta' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tower_in_Taman_Sari%2C_2014-05-19.jpg/960px-Tower_in_Taman_Sari%2C_2014-05-19.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'di-yogyakarta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Parangtritis_Beach_2011_4.JPG/960px-Parangtritis_Beach_2011_4.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mount Merapi & Yogyakarta Landscape', 4
where not exists (
  select 1 from public.province_photos where province_id = 'di-yogyakarta' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Parangtritis_Beach_2011_4.JPG/960px-Parangtritis_Beach_2011_4.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bromo-Semeru-Batok-Widodaren.jpg/960px-Bromo-Semeru-Batok-Widodaren.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mount Bromo & Tengger Caldera', 0
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bromo-Semeru-Batok-Widodaren.jpg/960px-Bromo-Semeru-Batok-Widodaren.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Kawah_Ijen_-East_Java_-Indonesia-31July2009.jpg/960px-Kawah_Ijen_-East_Java_-Indonesia-31July2009.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Ijen Crater Lake, Banyuwangi', 1
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Kawah_Ijen_-East_Java_-Indonesia-31July2009.jpg/960px-Kawah_Ijen_-East_Java_-Indonesia-31July2009.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tumpak_sewu_waterfall.jpg/960px-Tumpak_sewu_waterfall.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Tumpak Sewu Waterfall, Lumajang', 2
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tumpak_sewu_waterfall.jpg/960px-Tumpak_sewu_waterfall.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Suramadu_Bridge_5.JPG/960px-Suramadu_Bridge_5.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Suramadu Bridge, Surabaya–Madura', 3
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Suramadu_Bridge_5.JPG/960px-Suramadu_Bridge_5.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'jawa-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Golden_hour_at_bekol_savannah.jpg/960px-Golden_hour_at_bekol_savannah.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Baluran Savanna, Situbondo', 4
where not exists (
  select 1 from public.province_photos where province_id = 'jawa-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Golden_hour_at_bekol_savannah.jpg/960px-Golden_hour_at_bekol_savannah.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'bali', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Pura_Ulun_Danu_Bratan%2C_2022.jpg/960px-Pura_Ulun_Danu_Bratan%2C_2022.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Pura Ulun Danu Bratan, Bedugul', 0
where not exists (
  select 1 from public.province_photos where province_id = 'bali' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Pura_Ulun_Danu_Bratan%2C_2022.jpg/960px-Pura_Ulun_Danu_Bratan%2C_2022.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'bali', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TanahLot_2014.JPG/960px-TanahLot_2014.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Tanah Lot Sea Temple, Tabanan', 1
where not exists (
  select 1 from public.province_photos where province_id = 'bali' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TanahLot_2014.JPG/960px-TanahLot_2014.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'bali', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg/960px-Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Uluwatu Cliffside Temple', 2
where not exists (
  select 1 from public.province_photos where province_id = 'bali' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg/960px-Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'bali', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Broken_Bay%2C_Nusa_Penida.jpg/960px-Broken_Bay%2C_Nusa_Penida.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Nusa Penida Limestone Cliffs', 3
where not exists (
  select 1 from public.province_photos where province_id = 'bali' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Broken_Bay%2C_Nusa_Penida.jpg/960px-Broken_Bay%2C_Nusa_Penida.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'nusa-tenggara-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/KAGAGAHAN_RIJANI.jpg/960px-KAGAGAHAN_RIJANI.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mount Rinjani & Lake Segara Anak', 0
where not exists (
  select 1 from public.province_photos where province_id = 'nusa-tenggara-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/KAGAGAHAN_RIJANI.jpg/960px-KAGAGAHAN_RIJANI.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'nusa-tenggara-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Segara_Anak.jpg/960px-Segara_Anak.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mount Rinjani & Lake Segara Anak', 1
where not exists (
  select 1 from public.province_photos where province_id = 'nusa-tenggara-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Segara_Anak.jpg/960px-Segara_Anak.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'nusa-tenggara-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/GiliMenoRichtungBali.jpg/960px-GiliMenoRichtungBali.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Gili Islands Coral Coast, Lombok', 2
where not exists (
  select 1 from public.province_photos where province_id = 'nusa-tenggara-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/GiliMenoRichtungBali.jpg/960px-GiliMenoRichtungBali.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'nusa-tenggara-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kelimutu_Crater_Lake.jpg/960px-Kelimutu_Crater_Lake.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Tri-Colored Kelimutu Crater Lakes, Flores', 0
where not exists (
  select 1 from public.province_photos where province_id = 'nusa-tenggara-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kelimutu_Crater_Lake.jpg/960px-Kelimutu_Crater_Lake.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'nusa-tenggara-timur', 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Komodo_dragon_at_Komodo_National_Park.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Komodo National Park, Flores', 1
where not exists (
  select 1 from public.province_photos where province_id = 'nusa-tenggara-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Komodo_dragon_at_Komodo_National_Park.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'nusa-tenggara-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Pulau_Padar_1.jpg/960px-Pulau_Padar_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Padar Island Bays, Labuan Bajo', 2
where not exists (
  select 1 from public.province_photos where province_id = 'nusa-tenggara-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Pulau_Padar_1.jpg/960px-Pulau_Padar_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'nusa-tenggara-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Labuan_Bajo%2C_a_port_in_West_Flores%2C_Nusa_Tenggara%2C_Indonesia%3B_January_2020.jpg/960px-Labuan_Bajo%2C_a_port_in_West_Flores%2C_Nusa_Tenggara%2C_Indonesia%3B_January_2020.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Labuan Bajo Harbor, Western Flores', 3
where not exists (
  select 1 from public.province_photos where province_id = 'nusa-tenggara-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Labuan_Bajo%2C_a_port_in_West_Flores%2C_Nusa_Tenggara%2C_Indonesia%3B_January_2020.jpg/960px-Labuan_Bajo%2C_a_port_in_West_Flores%2C_Nusa_Tenggara%2C_Indonesia%3B_January_2020.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Eksterior_Tugu_Khatulistiwa_Pontianak_%282026%29.jpg/960px-Eksterior_Tugu_Khatulistiwa_Pontianak_%282026%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Equator Monument (Tugu Khatulistiwa), Pontianak', 0
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Eksterior_Tugu_Khatulistiwa_Pontianak_%282026%29.jpg/960px-Eksterior_Tugu_Khatulistiwa_Pontianak_%282026%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Aerial_view_of_Kapuas_River.jpg/960px-Aerial_view_of_Kapuas_River.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Kapuas Riverfront, Pontianak', 1
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Aerial_view_of_Kapuas_River.jpg/960px-Aerial_view_of_Kapuas_River.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Lahan_basah_Taman_Nasional_Danau_Sentarum%2C_Kalimantan_Barat.jpg/960px-Lahan_basah_Taman_Nasional_Danau_Sentarum%2C_Kalimantan_Barat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Danau Sentarum Wetlands', 2
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Lahan_basah_Taman_Nasional_Danau_Sentarum%2C_Kalimantan_Barat.jpg/960px-Lahan_basah_Taman_Nasional_Danau_Sentarum%2C_Kalimantan_Barat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tugu_Naga_Singkawang.jpg/960px-Tugu_Naga_Singkawang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Singkawang Heritage & Coast', 3
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tugu_Naga_Singkawang.jpg/960px-Tugu_Naga_Singkawang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Keraton_Kadariah_01.jpg/960px-Keraton_Kadariah_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Kadriah Sultanate Heritage, Pontianak', 4
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Keraton_Kadariah_01.jpg/960px-Keraton_Kadariah_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Tanjung-Puting90153.jpg/960px-Tanjung-Puting90153.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Sekonyer River, Tanjung Puting National Park', 0
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Tanjung-Puting90153.jpg/960px-Tanjung-Puting90153.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Jembatan_Kahayan_Palangkaraya.jpg/960px-Jembatan_Kahayan_Palangkaraya.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Kahayan Bridge, Palangka Raya', 1
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Jembatan_Kahayan_Palangkaraya.jpg/960px-Jembatan_Kahayan_Palangkaraya.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Pos_Joran.jpg/960px-Pos_Joran.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Sebangau Peat-Swamp Forest', 2
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Pos_Joran.jpg/960px-Pos_Joran.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bundaran_Besar_Palangka_Raya_%28baru%29.jpg/960px-Bundaran_Besar_Palangka_Raya_%28baru%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Palangka Raya Landmark', 3
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bundaran_Besar_Palangka_Raya_%28baru%29.jpg/960px-Bundaran_Besar_Palangka_Raya_%28baru%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Floating_Market_Lok_Baintan%2C_Lok_Baintan_Port.JPG/960px-Floating_Market_Lok_Baintan%2C_Lok_Baintan_Port.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lok Baintan Floating Market', 0
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Floating_Market_Lok_Baintan%2C_Lok_Baintan_Port.JPG/960px-Floating_Market_Lok_Baintan%2C_Lok_Baintan_Port.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Masjid_Raya_Sabilal_Muhtadi_depan.jpg/960px-Masjid_Raya_Sabilal_Muhtadi_depan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Sabilal Muhtadin Grand Mosque, Banjarmasin', 1
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Masjid_Raya_Sabilal_Muhtadi_depan.jpg/960px-Masjid_Raya_Sabilal_Muhtadi_depan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Banks_of_Martapura_River%2C_South_Kalimantan%2C_2018-07-28_01.jpg/960px-Banks_of_Martapura_River%2C_South_Kalimantan%2C_2018-07-28_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Martapura Riverfront, Banjarmasin', 2
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Banks_of_Martapura_River%2C_South_Kalimantan%2C_2018-07-28_01.jpg/960px-Banks_of_Martapura_River%2C_South_Kalimantan%2C_2018-07-28_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Bundaran_Simpang_Empat_Banjarbaru_001.jpg/960px-Bundaran_Simpang_Empat_Banjarbaru_001.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Banjarbaru Provincial Civic Center', 3
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Bundaran_Simpang_Empat_Banjarbaru_001.jpg/960px-Bundaran_Simpang_Empat_Banjarbaru_001.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Derawan_Island_East_Kalimantan.jpg/960px-Derawan_Island_East_Kalimantan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Derawan Archipelago Overwater Villas', 0
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Derawan_Island_East_Kalimantan.jpg/960px-Derawan_Island_East_Kalimantan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Side_view_of_Maratua_Island.jpg/960px-Side_view_of_Maratua_Island.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Maratua Coral Atoll, Berau', 1
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Side_view_of_Maratua_Island.jpg/960px-Side_view_of_Maratua_Island.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kapal_Tongkang_Batubara_melintas_Sungai_Mahakam.jpg/960px-Kapal_Tongkang_Batubara_melintas_Sungai_Mahakam.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Samarinda & Mahakam River Vista', 2
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kapal_Tongkang_Batubara_melintas_Sungai_Mahakam.jpg/960px-Kapal_Tongkang_Batubara_melintas_Sungai_Mahakam.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-timur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Islamic_Centre_Samarinda_by_bloesafir_-_panoramio.jpg/960px-Islamic_Centre_Samarinda_by_bloesafir_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Samarinda Islamic Center Mosque', 3
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-timur' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Islamic_Centre_Samarinda_by_bloesafir_-_panoramio.jpg/960px-Islamic_Centre_Samarinda_by_bloesafir_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Islamic_Center_Tarakan.jpg/960px-Islamic_Center_Tarakan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Tarakan Coastal Gateway', 0
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Islamic_Center_Tarakan.jpg/960px-Islamic_Center_Tarakan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Upstream_of_Mentarang_River_in_Kayan_Mentarang_National_Park_01.jpg/960px-Upstream_of_Mentarang_River_in_Kayan_Mentarang_National_Park_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Kayan Mentarang Highlands & River', 1
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Upstream_of_Mentarang_River_in_Kayan_Mentarang_National_Park_01.jpg/960px-Upstream_of_Mentarang_River_in_Kayan_Mentarang_National_Park_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Patok_1_Perbatasan_Indonesia-Malaysia_di_Sebatik_%282%29.JPG/960px-Patok_1_Perbatasan_Indonesia-Malaysia_di_Sebatik_%282%29.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Nunukan & Sebatik Archipelago', 2
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Patok_1_Perbatasan_Indonesia-Malaysia_di_Sebatik_%282%29.JPG/960px-Patok_1_Perbatasan_Indonesia-Malaysia_di_Sebatik_%282%29.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-utara', 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Masjid_Agung_Tanjung_Selor.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Tanjung Selor & Kayan River, Bulungan', 3
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Masjid_Agung_Tanjung_Selor.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'kalimantan-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lamin_adat_Adjang_Lidem_Malinau.jpg/960px-Lamin_adat_Adjang_Lidem_Malinau.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Malinau Tropical Rainforest', 4
where not exists (
  select 1 from public.province_photos where province_id = 'kalimantan-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lamin_adat_Adjang_Lidem_Malinau.jpg/960px-Lamin_adat_Adjang_Lidem_Malinau.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bunaken.jpg/960px-Bunaken.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Bunaken National Marine Park', 0
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bunaken.jpg/960px-Bunaken.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lake_Tondano_drone_view.jpg/960px-Lake_Tondano_drone_view.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lake Tondano Highlands, Minahasa', 1
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lake_Tondano_drone_view.jpg/960px-Lake_Tondano_drone_view.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lokon.JPG/960px-Lokon.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mount Lokon Volcano, Tomohon', 2
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lokon.JPG/960px-Lokon.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-utara', 'https://upload.wikimedia.org/wikipedia/commons/3/38/Habitat_Tangkoko_Sulawesi_2006.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Tangkoko Nature Reserve Wildlife', 3
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Habitat_Tangkoko_Sulawesi_2006.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'gorontalo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Otanaha_Fortress.JPG/960px-Otanaha_Fortress.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Historic Otanaha Fortress, Gorontalo', 0
where not exists (
  select 1 from public.province_photos where province_id = 'gorontalo' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Otanaha_Fortress.JPG/960px-Otanaha_Fortress.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'gorontalo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Danau_Limboto.JPG/960px-Danau_Limboto.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lake Limboto Basin, Gorontalo', 1
where not exists (
  select 1 from public.province_photos where province_id = 'gorontalo' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Danau_Limboto.JPG/960px-Danau_Limboto.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'gorontalo', 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Masjid_Agung_Gorontalo.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Gorontalo Coastal & Island Vista', 2
where not exists (
  select 1 from public.province_photos where province_id = 'gorontalo' and url = 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Masjid_Agung_Gorontalo.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'gorontalo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Hutan_Hungayono.jpg/960px-Hutan_Hungayono.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Saronde & Olele Waters, Gorontalo', 3
where not exists (
  select 1 from public.province_photos where province_id = 'gorontalo' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Hutan_Hungayono.jpg/960px-Hutan_Hungayono.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'gorontalo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Similan_Dive_Center_-_great_whale_shark.jpg/960px-Similan_Dive_Center_-_great_whale_shark.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Coastal Waters of Tomini Bay, Gorontalo', 4
where not exists (
  select 1 from public.province_photos where province_id = 'gorontalo' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Similan_Dive_Center_-_great_whale_shark.jpg/960px-Similan_Dive_Center_-_great_whale_shark.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Kabalutan_Bajau_village.jpg/960px-Kabalutan_Bajau_village.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Togian Islands Coral Lagoons', 0
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Kabalutan_Bajau_village.jpg/960px-Kabalutan_Bajau_village.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Danau_Lindu_w_bird_2007.jpg/960px-Danau_Lindu_w_bird_2007.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Bada Valley Megaliths, Lore Lindu', 1
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Danau_Lindu_w_bird_2007.jpg/960px-Danau_Lindu_w_bird_2007.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Poso_Lake_from_Padamarari.jpg/960px-Poso_Lake_from_Padamarari.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lake Poso & Siuri Shoreline', 2
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Poso_Lake_from_Padamarari.jpg/960px-Poso_Lake_from_Padamarari.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Kilo_5_Luwuk.jpg/960px-Kilo_5_Luwuk.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Banggai Islands Turquoise Cove', 3
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Kilo_5_Luwuk.jpg/960px-Kilo_5_Luwuk.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Teluk_Palu%2C_Sulawesi_Tengah.jpg/960px-Teluk_Palu%2C_Sulawesi_Tengah.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Palu Bay & Donggala Peninsula', 4
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Teluk_Palu%2C_Sulawesi_Tengah.jpg/960px-Teluk_Palu%2C_Sulawesi_Tengah.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Rumah_Adat_Mamuju.jpg/960px-Rumah_Adat_Mamuju.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Manakarra Waterfront, Mamuju', 0
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Rumah_Adat_Mamuju.jpg/960px-Rumah_Adat_Mamuju.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Rumah_Adat_Mamasa_%28Banua_Sura%29.jpg/960px-Rumah_Adat_Mamasa_%28Banua_Sura%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mamasa Mountain Terraces & Villages', 1
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Rumah_Adat_Mamasa_%28Banua_Sura%29.jpg/960px-Rumah_Adat_Mamasa_%28Banua_Sura%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Unnamed_Road%2C_Laliko%2C_Campalagian%2C_Kabupaten_Polewali_Mandar%2C_Sulawesi_Barat%2C_Indonesia_-_panoramio.jpg/960px-Unnamed_Road%2C_Laliko%2C_Campalagian%2C_Kabupaten_Polewali_Mandar%2C_Sulawesi_Barat%2C_Indonesia_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'West Sulawesi Strait Coastline', 2
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Unnamed_Road%2C_Laliko%2C_Campalagian%2C_Kabupaten_Polewali_Mandar%2C_Sulawesi_Barat%2C_Indonesia_-_panoramio.jpg/960px-Unnamed_Road%2C_Laliko%2C_Campalagian%2C_Kabupaten_Polewali_Mandar%2C_Sulawesi_Barat%2C_Indonesia_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/The_City_of_Majene_from_Above.JPG/960px-The_City_of_Majene_from_Above.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Dato Beach Cliffs, Majene', 3
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/The_City_of_Majene_from_Above.JPG/960px-The_City_of_Majene_from_Above.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Ke%27te%27_Kesu%27_1.jpg/960px-Ke%27te%27_Kesu%27_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Tongkonan Heritage Houses, Tana Toraja', 0
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Ke%27te%27_Kesu%27_1.jpg/960px-Ke%27te%27_Kesu%27_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Fort_Rotterdam%2C_Makassar%2C_Indonesia_-_20100227-02.jpg/960px-Fort_Rotterdam%2C_Makassar%2C_Indonesia_-_20100227-02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Fort Rotterdam Bastion, Makassar', 1
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Fort_Rotterdam%2C_Makassar%2C_Indonesia_-_20100227-02.jpg/960px-Fort_Rotterdam%2C_Makassar%2C_Indonesia_-_20100227-02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Area_sawah_tadah_hujan_dengan_bukit_karst_di_rammang-rammang.jpg/960px-Area_sawah_tadah_hujan_dengan_bukit_karst_di_rammang-rammang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Rammang-Rammang Karst Towers, Maros', 2
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Area_sawah_tadah_hujan_dengan_bukit_karst_di_rammang-rammang.jpg/960px-Area_sawah_tadah_hujan_dengan_bukit_karst_di_rammang-rammang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tenggara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Wakatobi_beach_2006.jpg/960px-Wakatobi_beach_2006.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Wakatobi Marine National Park', 0
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tenggara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Wakatobi_beach_2006.jpg/960px-Wakatobi_beach_2006.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tenggara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Kendari_Bay_at_night.jpg/960px-Kendari_Bay_at_night.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Kendari Bay & Al-Alam Floating Mosque', 1
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tenggara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Kendari_Bay_at_night.jpg/960px-Kendari_Bay_at_night.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tenggara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Masjid_Muna.jpg/960px-Masjid_Muna.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Labengki Karst Lagoon', 2
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tenggara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Masjid_Muna.jpg/960px-Masjid_Muna.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'sulawesi-tenggara', 'https://upload.wikimedia.org/wikipedia/id/thumb/5/5d/Moramo_Waterfall.jpg/960px-Moramo_Waterfall.jpg?utm_source=id.wikipedia.org&utm_campaign=api&utm_content=thumbnail', null, 'Moramo Travertine Waterfall', 3
where not exists (
  select 1 from public.province_photos where province_id = 'sulawesi-tenggara' and url = 'https://upload.wikimedia.org/wikipedia/id/thumb/5/5d/Moramo_Waterfall.jpg/960px-Moramo_Waterfall.jpg?utm_source=id.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'maluku', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/BandaBesarIslandSeenFromFortBelgica.JPG/960px-BandaBesarIslandSeenFromFortBelgica.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Banda Neira & Mount Api, Banda Islands', 0
where not exists (
  select 1 from public.province_photos where province_id = 'maluku' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/BandaBesarIslandSeenFromFortBelgica.JPG/960px-BandaBesarIslandSeenFromFortBelgica.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'maluku', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fort_Belgica_%2848250814991%29.jpg/960px-Fort_Belgica_%2848250814991%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Fort Belgica, Banda Neira', 1
where not exists (
  select 1 from public.province_photos where province_id = 'maluku' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fort_Belgica_%2848250814991%29.jpg/960px-Fort_Belgica_%2848250814991%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'maluku', 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Run_and_Nailaka_%28Banda_Islands%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Run and Nailaka Islands, Banda Archipelago', 2
where not exists (
  select 1 from public.province_photos where province_id = 'maluku' and url = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Run_and_Nailaka_%28Banda_Islands%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'maluku-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pulau_Ternate_and_Gamalama_Volcano_from_the_North-west_Coast_of_Pulau_Tidore_%28Tidore_Island%29%2C_The_Moluccas_%28Maluku%29_%2815199602802%29.jpg/960px-Pulau_Ternate_and_Gamalama_Volcano_from_the_North-west_Coast_of_Pulau_Tidore_%28Tidore_Island%29%2C_The_Moluccas_%28Maluku%29_%2815199602802%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mount Gamalama & Lake Tolire, Ternate', 0
where not exists (
  select 1 from public.province_photos where province_id = 'maluku-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pulau_Ternate_and_Gamalama_Volcano_from_the_North-west_Coast_of_Pulau_Tidore_%28Tidore_Island%29%2C_The_Moluccas_%28Maluku%29_%2815199602802%29.jpg/960px-Pulau_Ternate_and_Gamalama_Volcano_from_the_North-west_Coast_of_Pulau_Tidore_%28Tidore_Island%29%2C_The_Moluccas_%28Maluku%29_%2815199602802%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'maluku-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ternate_in_sight.jpg/960px-Ternate_in_sight.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Ternate, Tidore & Maitara Channel', 1
where not exists (
  select 1 from public.province_photos where province_id = 'maluku-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ternate_in_sight.jpg/960px-Ternate_in_sight.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'maluku-utara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Tidore_Island_Indonesia_Daytime.jpg/960px-Tidore_Island_Indonesia_Daytime.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Tidore Island Volcanic Cone', 2
where not exists (
  select 1 from public.province_photos where province_id = 'maluku-utara' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Tidore_Island_Indonesia_Daytime.jpg/960px-Tidore_Island_Indonesia_Daytime.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sentani_Lake.jpg/960px-Sentani_Lake.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lake Sentani Hills, Jayapura', 0
where not exists (
  select 1 from public.province_photos where province_id = 'papua' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sentani_Lake.jpg/960px-Sentani_Lake.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua', 'https://upload.wikimedia.org/wikipedia/commons/6/69/Youtefa_Bridge.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Youtefa Red Arch Bridge, Jayapura', 1
where not exists (
  select 1 from public.province_photos where province_id = 'papua' and url = 'https://upload.wikimedia.org/wikipedia/commons/6/69/Youtefa_Bridge.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Kota_Jayapura%2C_Papua.jpg/960px-Kota_Jayapura%2C_Papua.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Yos Sudarso Bay Coast, Jayapura', 2
where not exists (
  select 1 from public.province_photos where province_id = 'papua' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Kota_Jayapura%2C_Papua.jpg/960px-Kota_Jayapura%2C_Papua.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua', 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Fishing_boats_on_Biak.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Biak & Padaido Island Shores', 3
where not exists (
  select 1 from public.province_photos where province_id = 'papua' and url = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Fishing_boats_on_Biak.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cagar_Alam_Cyclops_dengan_sebuah_telaga_kecil.jpeg/960px-Cagar_Alam_Cyclops_dengan_sebuah_telaga_kecil.jpeg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Cyclops Foothills & Jayapura Bay', 4
where not exists (
  select 1 from public.province_photos where province_id = 'papua' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cagar_Alam_Cyclops_dengan_sebuah_telaga_kecil.jpeg/960px-Cagar_Alam_Cyclops_dengan_sebuah_telaga_kecil.jpeg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Aku_dan_Alamku.jpg/960px-Aku_dan_Alamku.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Cenderawasih Bay Marine Park', 0
where not exists (
  select 1 from public.province_photos where province_id = 'papua-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Aku_dan_Alamku.jpg/960px-Aku_dan_Alamku.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/City_of_Manokwari.jpg/960px-City_of_Manokwari.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Manokwari & Mansinam Bay', 1
where not exists (
  select 1 from public.province_photos where province_id = 'papua-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/City_of_Manokwari.jpg/960px-City_of_Manokwari.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-barat', 'https://upload.wikimedia.org/wikipedia/commons/0/01/Arfak_Mountains.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Anggi Lakes, Arfak Mountains', 2
where not exists (
  select 1 from public.province_photos where province_id = 'papua-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/0/01/Arfak_Mountains.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-barat', 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Monumen_Satu_Tungku_Tiga_Batu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled', null, 'Triton Bay & West Bomberai Coast', 3
where not exists (
  select 1 from public.province_photos where province_id = 'papua-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Monumen_Satu_Tungku_Tiga_Batu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-barat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Wilson%27s_Bird-of-Paradise_0A2A1913.jpg/960px-Wilson%27s_Bird-of-Paradise_0A2A1913.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Endemic Bird-of-Paradise Habitat', 4
where not exists (
  select 1 from public.province_photos where province_id = 'papua-barat' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Wilson%27s_Bird-of-Paradise_0A2A1913.jpg/960px-Wilson%27s_Bird-of-Paradise_0A2A1913.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Taman_0_Kilometer_Merauke_-_Sabang.jpg/960px-Taman_0_Kilometer_Merauke_-_Sabang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Merauke Coastal Frontier', 0
where not exists (
  select 1 from public.province_photos where province_id = 'papua-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Taman_0_Kilometer_Merauke_-_Sabang.jpg/960px-Taman_0_Kilometer_Merauke_-_Sabang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Rumah_Semut.jpg/960px-Rumah_Semut.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Wasur National Park Wetlands & Savanna', 1
where not exists (
  select 1 from public.province_photos where province_id = 'papua-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Rumah_Semut.jpg/960px-Rumah_Semut.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-selatan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Taman_Nasional_Lorentz_merupakan_perwakilan_dari_ekosistem_terlengkap_untuk_keanekaragaman_hayati_di_Asia_Pasifik.jpg/960px-Taman_Nasional_Lorentz_merupakan_perwakilan_dari_ekosistem_terlengkap_untuk_keanekaragaman_hayati_di_Asia_Pasifik.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lorentz & Wasur Biodiversity Reserve', 2
where not exists (
  select 1 from public.province_photos where province_id = 'papua-selatan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Taman_Nasional_Lorentz_merupakan_perwakilan_dari_ekosistem_terlengkap_untuk_keanekaragaman_hayati_di_Asia_Pasifik.jpg/960px-Taman_Nasional_Lorentz_merupakan_perwakilan_dari_ekosistem_terlengkap_untuk_keanekaragaman_hayati_di_Asia_Pasifik.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Pantai_Nabire%2C_Maf.jpg/960px-Pantai_Nabire%2C_Maf.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Nabire Coast & Whale Shark Waters', 0
where not exists (
  select 1 from public.province_photos where province_id = 'papua-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Pantai_Nabire%2C_Maf.jpg/960px-Pantai_Nabire%2C_Maf.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Kota_Timika.jpg/960px-Kota_Timika.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Mimika Coastal Delta, Papua Tengah', 1
where not exists (
  select 1 from public.province_photos where province_id = 'papua-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Kota_Timika.jpg/960px-Kota_Timika.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Carstensz_Pyramid.jpg/960px-Carstensz_Pyramid.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Puncak Jaya (Carstensz Pyramid)', 2
where not exists (
  select 1 from public.province_photos where province_id = 'papua-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Carstensz_Pyramid.jpg/960px-Carstensz_Pyramid.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-tengah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Puyuh_salju.jpg/960px-Puyuh_salju.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lorentz National Park Highlands', 3
where not exists (
  select 1 from public.province_photos where province_id = 'papua-tengah' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Puyuh_salju.jpg/960px-Puyuh_salju.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-pegunungan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/20170903_Papouasie_Baliem_valley_15.jpg/960px-20170903_Papouasie_Baliem_valley_15.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Baliem Valley Highlands, Wamena', 0
where not exists (
  select 1 from public.province_photos where province_id = 'papua-pegunungan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/20170903_Papouasie_Baliem_valley_15.jpg/960px-20170903_Papouasie_Baliem_valley_15.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-pegunungan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Wamena%2C_Papua%2C_Indonesia_2019_09.jpg/960px-Wamena%2C_Papua%2C_Indonesia_2019_09.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Wamena & Baliem Valley Panorama', 1
where not exists (
  select 1 from public.province_photos where province_id = 'papua-pegunungan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Wamena%2C_Papua%2C_Indonesia_2019_09.jpg/960px-Wamena%2C_Papua%2C_Indonesia_2019_09.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-pegunungan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Puncak_Trikora_from_north._main_summit_%28center_left%29_and_west_ridge_by_Christian_Stangl_flickr.jpg/960px-Puncak_Trikora_from_north._main_summit_%28center_left%29_and_west_ridge_by_Christian_Stangl_flickr.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Lake Habema & Jayawijaya Peaks', 2
where not exists (
  select 1 from public.province_photos where province_id = 'papua-pegunungan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Puncak_Trikora_from_north._main_summit_%28center_left%29_and_west_ridge_by_Christian_Stangl_flickr.jpg/960px-Puncak_Trikora_from_north._main_summit_%28center_left%29_and_west_ridge_by_Christian_Stangl_flickr.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-pegunungan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Honai_House_Papua.jpg/960px-Honai_House_Papua.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Traditional Honai Compound, Baliem Valley', 3
where not exists (
  select 1 from public.province_photos where province_id = 'papua-pegunungan' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Honai_House_Papua.jpg/960px-Honai_House_Papua.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-barat-daya', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Waigeo_view-1.jpg/960px-Waigeo_view-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Piaynemo Archipelago Overlook, Raja Ampat', 0
where not exists (
  select 1 from public.province_photos where province_id = 'papua-barat-daya' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Waigeo_view-1.jpg/960px-Waigeo_view-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-barat-daya', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Raja_Ampat%2C_West_Papua%2C_Indonesia.jpg/960px-Raja_Ampat%2C_West_Papua%2C_Indonesia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Raja Ampat Coral Reef Sanctuary', 1
where not exists (
  select 1 from public.province_photos where province_id = 'papua-barat-daya' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Raja_Ampat%2C_West_Papua%2C_Indonesia.jpg/960px-Raja_Ampat%2C_West_Papua%2C_Indonesia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);

insert into public.province_photos (province_id, url, storage_path, caption, sort_order)
select 'papua-barat-daya', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sorong_view-1.jpg/960px-Sorong_view-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', null, 'Raja Ampat Jetty & Sorong Gateway', 2
where not exists (
  select 1 from public.province_photos where province_id = 'papua-barat-daya' and url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sorong_view-1.jpg/960px-Sorong_view-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail'
);
