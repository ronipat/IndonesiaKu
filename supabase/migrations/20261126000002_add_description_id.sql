-- Add Bahasa Indonesia descriptions for all 38 provinces of Indonesia

alter table public.provinces
  add column if not exists description_id text;

update public.provinces
set description_id = 'Berada di ujung utara Pulau Sumatra, Aceh dikenal sebagai Serambi Mekkah karena warisan Islam dan sejarah ketangguhannya yang mendalam. Ibu kotanya, Banda Aceh, memayungi pesisir indah dengan ikon Masjid Raya Baiturrahman, Museum Tsunami, serta terumbu karang Sabang di Pulau Weh. Di pedalaman, Ekosistem Leuser melindungi orangutan dan harimau sumatra, sementara Dataran Tinggi Gayo menghasilkan kopi arabika kelas dunia bersama kuliner khas seperti Mie Aceh dan Ayam Tangkap.'
where id = 'aceh';

update public.provinces
set description_id = 'Sumatera Utara membentang dari Selat Malaka melintasi pegunungan vulkanik Bukit Barisan hingga Samudra Hindia, dengan pusat kota metropolitan Medan. Provinsi ini menjadi rumah bagi Danau Toba sebagai danau kaldera vulkanik terbesar di dunia, serta Pulau Samosir yang menjadi jantung budaya Batak, tenun ulos, dan kampung adat bersejarah. Pengunjung juga dapat menjelajahi hutan hujan Taman Nasional Gunung Leuser, Air Terjun Sipiso-piso, serta ragam kuliner Medan seperti Bika Ambon dan Soto Medan.'
where id = 'sumatera-utara';

update public.provinces
set description_id = 'Terletak di sepanjang pesisir barat Sumatra dan lembah dataran tinggi yang dramatis, Sumatera Barat merupakan tanah kelahiran masyarakat matrilineal Minangkabau dengan ibu kota Padang. Atap gonjong Rumah Gadang yang ikonik menghiasi Bukittinggi, Ngarai Sianok, serta danau vulkanik Maninjau dan Singkarak, sementara Kepulauan Mentawai terkenal di kalangan peselancar dunia. Mendunia berkat masakan Padang seperti Rendang, Sate Padang, dan Dendeng Balado, provinsi ini memadukan kekayaan kuliner rempah dengan adat istiadat yang lestari.'
where id = 'sumatera-barat';

update public.provinces
set description_id = 'Terbentang di dataran rendah timur Sumatra bagian tengah serta dialiri sungai besar seperti Sungai Siak dan Sungai Kampar, Riau menjadi pusat energi, perkebunan, dan budaya Melayu dengan ibu kota Pekanbaru. Situs bersejarah meliputi kompleks Candi Muara Takus, Istana Siak Sri Indrapura, serta tradisi sastra pantun dan tari zapin Melayu. Di Sungai Kampar, fenomena gelombang pasang Bono menghadirkan ombak sungai unik yang panjang, sementara muara pesisir dan hutan rawa gambut menjaga keanekaragaman hayati sungai.'
where id = 'riau';

update public.provinces
set description_id = 'Mencakup lebih dari 2.400 pulau di perairan Laut Natuna dan gerbang Selat Malaka, Kepulauan Riau beribu kota di Tanjung Pinang di Pulau Bintan. Kepulauan ini memadukan jalur perdagangan maritim serta kawasan industri Batam dengan pantai berpasir putih, peninggalan Kesultanan Melayu di Pulau Penyengat, dan panorama batu granit di Natuna serta Anambas. Hidangan laut segar seperti Gonggong dan Mie Lendir mencerminkan budaya bahari yang menghubungkan Sumatra, Singapura, dan Kalimantan.'
where id = 'kepulauan-riau';

update public.provinces
set description_id = 'Dibelah oleh sungai terpanjang di Sumatra, yaitu Sungai Batanghari, Jambi membentang dari pesisir timur hingga puncak vulkanik Taman Nasional Kerinci Seblat dengan ibu kota Kota Jambi. Provinsi ini menjaga kawasan percandian Muaro Jambi sebagai salah satu situs bata Buddha terluas di Asia Tenggara, serta Gunung Kerinci sebagai gunung berapi aktif tertinggi di Indonesia. Kebun teh yang sejuk, Danau Gunung Tujuh, dan sajian khas Tempoyak melengkapi perpaduan alam pegunungan dan warisan sungai.'
where id = 'jambi';

update public.provinces
set description_id = 'Berpusat di Palembang di tepian Sungai Musi yang lebar, Sumatera Selatan mewarisi kejayaan maritim Kerajaan Sriwijaya dengan ikon Jembatan Ampera dan Pulau Kemaro. Selain pasar apung dan perdagangan delta Sungai Musi, provinsi ini memiliki kawasan perkebunan kopi dataran tinggi yang subur di Pagar Alam dan lereng Gunung Dempo. Nama Palembang harum dengan kuliner Pempek berkuah cuko yang gurih pedas, kain tenun songket benang emas, serta tradisi festival sungai.'
where id = 'sumatera-selatan';

update public.provinces
set description_id = 'Berada di sebelah tenggara Sumatra melintasi Selat Karimata, Kepulauan Bangka Belitung terdiri atas dua pulau utama dan ratusan pulau kecil dengan ibu kota Pangkal Pinang. Pantai Tanjung Tinggi di Belitung terkenal akan susunan batu granit raksasa yang mengapit teluk biru jernih, sedangkan pesisir Bangka menawarkan pulau mercusuar dan kota bersejarah penghasil timah. Dikenal dengan perkebunan lada putih serta sajian laut seperti Mie Bangka dan Lempah Kuning, provinsi ini memadukan lanskap geologi memukau dengan suasana pulau yang tenang.'
where id = 'kepulauan-bangka-belitung';

update public.provinces
set description_id = 'Menghadap langsung ke Samudra Hindia di pesisir barat daya Sumatra, Bengkulu memadukan hutan hujan Bukit Barisan dengan peninggalan sejarah kolonial yang berpusat di Kota Bengkulu. Provinsi ini melestarikan Benteng Marlborough dari abad kedelapan belas, rumah pengasingan bersejarah Bung Karno, serta habitat alami bunga raksasa Rafflesia arnoldii. Pantai Panjang yang membentang luas, perbukitan teh di Kepahiang, dan upacara budaya Tabot menjadi ciri khas kehidupan masyarakatnya.'
where id = 'bengkulu';

update public.provinces
set description_id = 'Menempati ujung selatan Pulau Sumatra yang menghadap Selat Sunda, Lampung menjadi penghubung utama Sumatra dan Jawa melalui pelabuhan penyeberangan dengan pusat pemerintahan di Bandar Lampung. Taman Nasional Way Kambas melindungi gajah dan badak sumatra liar, sementara Teluk Kiluan terkenal dengan lumba-lumba serta kawasan Gunung Anak Krakatau yang menjulang di selat. Terkenal dengan kain Tapis bersulam benang emas, kopi robusta unggulan, dan hidangan ikan Seruit, Lampung kaya akan panorama pantai dan pertanian.'
where id = 'lampung';

update public.provinces
set description_id = 'Sebagai ibu kota bersejarah dan pusat bisnis utama di pesisir barat laut Pulau Jawa, DKI Jakarta memadukan warisan budaya Betawi, sejarah kolonial, dan kehidupan metropolitan modern. Ikon kota mencakup Monumen Nasional, Masjid Istiqlal, kawasan bersejarah Kota Tua, Pelabuhan Sunda Kelapa, hingga gugusan pulau karang di Kepulauan Seribu. Kawasan seni kreatif, pusat perbelanjaan modern, serta kuliner legendaris seperti Kerak Telor dan Soto Betawi menggambarkan denyut kota yang dinamis.'
where id = 'dki-jakarta';

update public.provinces
set description_id = 'Dikelilingi dataran tinggi vulkanik yang sejuk dan hamparan kebun teh, Jawa Barat merupakan provinsi berpenduduk terbanyak di Indonesia sekaligus tanah budaya Sunda dengan ibu kota Bandung. Wilayah ini menawarkan kawah Tangkuban Perahu, danau belerang Kawah Putih, cagar alam pesisir Pangandaran, serta Kebun Raya Bogor yang bersejarah. Dikenal luas lewat musik bambu angklung, industri kreatif yang maju, dan kuliner seperti Nasi Timbel, Batagor, serta Peuyeum, Jawa Barat memadukan pesona alam dan inovasi kota.'
where id = 'jawa-barat';

update public.provinces
set description_id = 'Menempati semenanjung paling barat Pulau Jawa di tepi Selat Sunda, Banten memadukan kawasan industri modern di sekitar Serang dan Tangerang dengan pesisir alami serta masyarakat adat yang lestari. Taman Nasional Ujung Kulon sebagai situs Warisan Dunia UNESCO melindungi populasi badak jawa liar terakhir, sementara Masjid Agung Banten Lama dan reruntuhan keraton mengingatkan kejayaan kesultanan Islam abad keenam belas. Pengunjung juga mengenal pantai selancar Sawarna, Tanjung Lesung, serta masyarakat adat Baduy di pedalaman.'
where id = 'banten';

update public.provinces
set description_id = 'Terletak di jantung budaya Pulau Jawa dengan ibu kota pesisir Semarang, Jawa Tengah melestarikan arsitektur candi megah, seni keraton Jawa, dan lanskap gunung berapi yang menawan. Provinsi ini menyimpan Candi Borobudur sebagai monumen Buddha terbesar di dunia, kompleks Candi Dieng di dataran tinggi, kepulauan bahari Karimunjawa, serta kawasan bersejarah Kota Lama Semarang. Berakar kuat pada seni batik, wayang kulit, dan gamelan, sajian terkenalnya meliputi Lumpia Semarang dan Soto Kudus.'
where id = 'jawa-tengah';

update public.provinces
set description_id = 'Sebagai daerah istimewa yang dipimpin langsung oleh Sultan di Yogyakarta, DI Yogyakarta menjadi pusat utama kebudayaan keraton, pendidikan, dan seni rupa di Pulau Jawa. Kekayaan budayanya tampak pada Keraton Yogyakarta, kemegahan Candi Prambanan, kawasan belanja seni Malioboro, dan kegagahan Gunung Merapi di sebelah utara. Dari batik tulis dan kerajinan perak Kotagede hingga pantai selatan dan kuliner legendaris Gudeg, provinsi ini memancarkan keanggunan tradisi Jawa yang hidup.'
where id = 'di-yogyakarta';

update public.provinces
set description_id = 'Membentang di ujung timur Pulau Jawa dan Pulau Madura dengan kota pelabuhan utama Surabaya, Jawa Timur memiliki panorama vulkanik paling dramatis sekaligus jejak sejarah Kerajaan Majapahit. Pemandangan matahari terbit di lautan pasir Gunung Bromo, api biru belerang Kawah Ijen, dan kemegahan Air Terjun Tumpak Sewu menjadi daya tarik utama wisatawan. Dikenal dengan sejarah kepahlawanan Surabaya, tradisi karapan sapi Madura, serta kuliner khas seperti Rawon dan Rujak Cingur, provinsi ini memadukan alam liar dan kekuatan ekonomi.'
where id = 'jawa-timur';

update public.provinces
set description_id = 'Dijuluki sebagai Pulau Dewata, Bali memadukan spiritualitas Hindu-Bali yang kental dengan lanskap terasering sawah hijau dan tebing pantai indah di sekitar ibu kota Denpasar. Sistem irigasi Subak yang diakui UNESCO di Jatiluwih, Pura Uluwatu di tepi tebing, Pura Ulun Danu Beratan, serta sanggar seni dan tari Ubud menghidupkan tradisi setiap hari. Dari ombak selancar kelas dunia dan keindahan Nusa Penida hingga kuliner khas seperti Ayam Betutu dan Lawar, Bali menyuguhkan pesona budaya dan alam yang tak tertandingi.'
where id = 'bali';

update public.provinces
set description_id = 'Membentang di Pulau Lombok dan Pulau Sumbawa di sebelah timur Bali, Nusa Tenggara Barat memadukan tradisi masyarakat Sasak dan Samawa dengan ibu kota Mataram. Gunung Rinjani yang menjulang melindungi Danau Segara Anak yang indah, sementara tiga Pulau Gili bebas kendaraan, Teluk Mandalika, dan Pulau Moyo di Sumbawa menghadirkan terumbu karang jernih dan ombak berselancar. Kain songket tenun tangan, kuliner pedas Ayam Taliwang dan Plecing Kangkung, serta padang sabana Sumbawa memberi karakter petualangan yang khas.'
where id = 'nusa-tenggara-barat';

update public.provinces
set description_id = 'Melingkupi lebih dari lima ratus pulau eksotis di kawasan timur Indonesia, termasuk Flores, Sumba, dan Timor Barat, Nusa Tenggara Timur dipimpin dari kota pantai Kupang. Provinsi ini menjadi habitat komodo purba di Taman Nasional Komodo, danau kawah tiga warna Kelimutu, perbukitan Pulau Padar, serta kampung adat megalitik di Sumba. Terkenal akan tenun ikat yang kaya makna, sabana berpohon lontar, serta taman laut kelas dunia di Alor dan Labuan Bajo, NTT menyajikan keindahan alam yang memukau.'
where id = 'nusa-tenggara-timur';

update public.provinces
set description_id = 'Membentang tepat di garis khatulistiwa di pesisir barat Pulau Kalimantan dengan ibu kota Pontianak, Kalimantan Barat dibentuk oleh Sungai Kapuas sebagai sungai terpanjang di Indonesia dan hutan hujan tropis yang luas. Tugu Khatulistiwa di Pontianak menandai lintang nol derajat, sementara Taman Nasional Danau Sentarum dan Betung Kerihun melindungi habitat orangutan serta rumah betang Dayak. Keberagaman tradisi Melayu, Dayak, dan Tionghoa tampak meriah dalam perayaan Cap Go Meh di Singkawang serta kuliner khas tepian sungai.'
where id = 'kalimantan-barat';

update public.provinces
set description_id = 'Menutupi hamparan hutan rawa gambut yang luas dan sungai-sungai berair gelap di bagian selatan Kalimantan, Kalimantan Tengah berpusat di kota Palangka Raya yang tertata asri. Taman Nasional Tanjung Puting terkenal di mancanegara dengan wisata susur sungai menggunakan perahu klotok untuk melihat orangutan, bekantan, dan burung enggang liar, bersanding dengan Taman Nasional Sebangau. Berakar kuat pada falsafah Dayak Ngaju, monumen suci Sandung, dan kehidupan sungai, provinsi ini menjaga paru-paru hijau Kalimantan.'
where id = 'kalimantan-tengah';

update public.provinces
set description_id = 'Terletak di sudut tenggara Pulau Kalimantan dengan pusat pemerintahan di Banjarbaru yang berdampingan dengan kota pelabuhan bersejarah Banjarmasin, Kalimantan Selatan dikenal sebagai Bumi Seribu Sungai. Pasar Terapung Lok Baintan tetap hidup saat fajar dengan perahu pedagang tradisional, sementara Pegunungan Meratus menawarkan arung jeram bambu dan perkampungan adat Dayak Meratus. Dikenal lewat pusat pengasahan intan Martapura, kain Sasirangan, dan hidangan hangat Soto Banjar, provinsi ini menyatukan perdagangan sungai dan pesona pegunungan.'
where id = 'kalimantan-selatan';

update public.provinces
set description_id = 'Membentang di pesisir timur Kalimantan melalui Samarinda dan Balikpapan, Kalimantan Timur memadukan kekayaan sumber daya energi dengan kawasan konservasi hutan dan laut sekaligus menjadi lokasi ibu kota masa depan Indonesia, Nusantara. Di lepas pantai, Kepulauan Derawan dan Pulau Maratua menjadi surga penyu hijau, ubur-ubur tak menyengat di Danau Kakaban, dan terumbu karang, sementara Sungai Mahakam melindungi pesut mahakam yang langka. Ukiran kayu Dayak Kenyah dan kuliner sungai memperkaya pesona wilayah ini.'
where id = 'kalimantan-timur';

update public.provinces
set description_id = 'Sebagai provinsi termuda di Pulau Kalimantan, Kalimantan Utara berbatasan langsung dengan Sabah dan Sarawak di sepanjang dataran tinggi berhutan lebat dan delta sungai, dengan Tanjung Selor sebagai ibu kota. Taman Nasional Kayan Mentarang melestarikan salah satu hutan hujan tropis utuh terbesar di Asia Tenggara bersama warisan budaya Dayak, sedangkan Pulau Tarakan menjadi gerbang pesisir dengan kawasan konservasi mangrove dan bekantan. Gua walet, jeram sungai pegunungan, dan perdagangan lintas batas membentuk pesona wilayah perbatasan utara ini.'
where id = 'kalimantan-utara';

update public.provinces
set description_id = 'Menghiasi semenanjung utara Pulau Sulawesi di sekitar kota pesisir Manado, Sulawesi Utara terkenal akan jajaran gunung berapi, dinding karang laut dalam, dan keramahan masyarakat Minahasa. Taman Laut Nasional Bunaken mendunia berkat keindahan penyelaman tebing terumbu karang, sementara Dataran Tinggi Minahasa memayungi Danau Tondano, Gunung Lokon, dan pasar tradisional Tomohon. Terkenal dengan kuliner pedas seperti Tinutuan dan Rica-Rica, musik kolintang, serta tarsius endemik di Cagar Alam Tangkoko, provinsi ini kaya pesona darat dan laut.'
where id = 'sulawesi-utara';

update public.provinces
set description_id = 'Berada di lengan utara Sulawesi di antara Teluk Tomini dan Laut Sulawesi, Gorontalo menawarkan perairan pesisir yang tenang, perbukitan hijau, dan jejak kesultanan Islam di sekitar Kota Gorontalo. Benteng bersejarah Otanaha berdiri anggun menghadap Danau Limboto, sementara perairan Botubarani kerap disinggahi hiu paus dekat pantai dan Taman Laut Olele menampilkan karang unik. Dikenal lewat sup jagung Binthe Biluhuta dan kain sulam tangan Karawo, Gorontalo menyajikan suasana utara yang ramah dan damai.'
where id = 'gorontalo';

update public.provinces
set description_id = 'Menjadi pusat wilayah tengah Sulawesi yang bergunung-gunung dengan ibu kota Palu di tepi teluk yang dalam, Sulawesi Tengah merangkum lembah pegunungan, kepulauan karang alami, dan peninggalan prasejarah. Taman Nasional Lore Lindu menyimpan patung batu megalitik raksasa di Lembah Bada bersama satwa endemik langka, sementara Kepulauan Togean di Teluk Tomini memikat penyelam dan perkampungan Suku Bajo. Terkenal dengan teluk kapur Banggai, Danau Poso, dan hidangan khas Kaledo, provinsi ini kaya akan keragaman alam.'
where id = 'sulawesi-tengah';

update public.provinces
set description_id = 'Menghadap Selat Makassar di sepanjang pesisir barat Pulau Sulawesi, Sulawesi Barat dipimpin dari kota pesisir Mamuju dan bangga akan tradisi pelaut Mandar. Perahu tradisional bercadik ganda bernama Sandeq yang terkenal sangat cepat masih dilombakan di perairan pesisir, sementara dataran tinggi Mamasa yang berkabut menjaga rumah adat berukir dan sawah terasering. Kaya akan perkebunan kakao, tenun sutra Mandar, dan ikan bakar segar bersama roti singkong Jepa, provinsi ini memancarkan kehangatan pesisir.'
where id = 'sulawesi-barat';

update public.provinces
set description_id = 'Berpusat di kota pelabuhan bersejarah Makassar, Sulawesi Selatan memadukan budaya Bugis, Makassar, dan Toraja di atas dataran subur, lembah karst kapur, dan pegunungan sejuk. Di Tana Toraja, atap rumah adat Tongkonan berbentuk perahu dan tebing pemakaman menarik perhatian dunia, sementara gugusan karst Rammang-Rammang, Benteng Rotterdam, dan Pantai Bira menonjolkan keunikan alam dan sejarah. Kapal layar Phinisi yang mendunia, Coto Makassar, dan Pisang Epe menjadi kebanggaan masyarakatnya.'
where id = 'sulawesi-selatan';

update public.provinces
set description_id = 'Melingkari semenanjung tenggara Pulau Sulawesi beserta pulau-pulau di sekitarnya dari ibu kota Kendari, Sulawesi Tenggara merupakan surga bahari dan pertemuan beragam budaya maritim. Taman Nasional Wakatobi yang tersohor di kalangan penyelam dunia melindungi keanekaragaman terumbu karang dan kampung laut Suku Bajo, sementara Benteng Keraton Buton dan laguna Labengki menjadi ikon wisata. Diberkahi air terjun alami, perbukitan mineral, dan hidangan sagu atau singkong Sinonggi, provinsi ini menawarkan pesona bawah laut unggulan.'
where id = 'sulawesi-tenggara';

update public.provinces
set description_id = 'Berpusat di Kota Ambon di gugusan Kepulauan Rempah bagian timur Indonesia, Maluku memegang tempat penting dalam sejarah pelayaran dunia sebagai tanah asal pala dan cengkih. Kini, teluk biru Kepulauan Banda, tebing laut Pantai Ora di Pulau Seram, dan pasir putih sehalus tepung di Kepulauan Kei berdampingan dengan benteng bersejarah seperti Belgica dan Nieuw Victoria. Dikenal sebagai Kota Musik, Ambon melahirkan harmoni paduan suara yang merdu, tarian Cakalele, serta kuliner Papeda kuah kuning yang segar.'
where id = 'maluku';

update public.provinces
set description_id = 'Terdiri atas gugusan pulau rempah vulkanik seperti Halmahera, Ternate, dan Tidore dengan pusat pemerintahan di Sofifi di pesisir Halmahera, Maluku Utara memadukan puncak gunung pulau dengan sejarah kesultanan agung. Gunung Gamalama di Ternate dan Benteng Tolukko menghadap puncak kembar Pulau Tidore melintasi selat biru, sementara Pulau Morotai menyimpan sejarah Perang Dunia Kedua dan laguna jernih. Kaya akan kebun cengkih dan pala, burung bidadari halmahera, serta olahan hasil laut berbumbu rempah, provinsi ini penuh daya pikat.'
where id = 'maluku-utara';

update public.provinces
set description_id = 'Berada di pesisir utara Pulau Papua di sekitar Kota Jayapura dan Teluk Humboldt, Papua memadukan kota teluk yang indah, hutan pegunungan Cyclops, dan kekayaan budaya Melanesia. Danau Sentani dengan kampung-kampung di atas air, lukisan kulit kayu, dan festival tahunannya terletak tidak jauh dari pantai wisata Jayapura dan jembatan megah Teluk Yotefa. Menjadi rumah bagi burung cenderawasih, tas rajut tradisional noken, serta kuliner Papeda dan ikan bakar, Papua menawarkan gerbang indah menuju timur Nusantara.'
where id = 'papua';

update public.provinces
set description_id = 'Menempati kawasan Semenanjung Kepala Burung dan Bomberai di sekitar ibu kota pesisir Manokwari, Papua Barat memadukan cagar pengamatan burung Pegunungan Arfak dengan taman laut yang luas. Taman Nasional Teluk Cenderawasih terkenal di dunia akan kemunculan hiu paus jinak sepanjang tahun di sekitar Kwatisore, sedangkan Pulau Mansinam menjadi situs penting sejarah spiritual Papua. Hutan bakau lebat, teluk batu kapur Triton di Kaimana, dan keramahan masyarakatnya menonjolkan kekayaan alam daerah ini.'
where id = 'papua-barat';

update public.provinces
set description_id = 'Membentang melintasi lahan basah yang luas, padang sabana, dan sungai berkelok di perbatasan timur Indonesia, Papua Selatan berpusat di kota perbatasan bersejarah Merauke. Taman Nasional Wasur yang dijuluki Serengeti Papua melindungi rawa alami, sarang semut raksasa musamus, walabi, dan ribuan burung migran, sementara masyarakat Asmat di pesisir mendunia lewat seni ukir kayu. Dikenal lewat Tugu Titik Nol Kilometer paling timur Indonesia di Sota, provinsi ini menyuguhkan alam liar yang megah.'
where id = 'papua-selatan';

update public.provinces
set description_id = 'Membentang dari pantai berkarang Teluk Cenderawasih di dekat ibu kota Nabire hingga puncak bersalju abadi Pegunungan Sudirman, Papua Tengah menampilkan kontras ketinggian alam yang luar biasa. Perairan Nabire yang jernih menjadi rumah hiu paus dan terumbu karang indah, sedangkan kawasan pegunungannya menjulang Puncak Jaya sebagai puncak tertinggi di Indonesia dan Oseania di dalam Taman Nasional Lorentz. Tradisi bercocok tanam pegunungan, hidangan sagu pesisir, dan budaya suku yang beragam memperkaya wilayah ini.'
where id = 'papua-tengah';

update public.provinces
set description_id = 'Sebagai satu-satunya provinsi di Indonesia yang tidak berbatasan langsung dengan laut, Papua Pegunungan berdiri megah di gugusan gunung tengah Papua dengan pusat kota Wamena di Lembah Baliem yang subur. Dikelilingi puncak hijau, kabut sejuk pegunungan, dan sungai berarus deras, Lembah Baliem menjaga tradisi ladang ubi masyarakat Dani, jembatan gantung tradisional, dan Festival Budaya Lembah Baliem yang mendunia. Terkenal dengan pesta adat Bakar Batu dan kerajinan tas noken warna-warni, wilayah ini menyimpan budaya pegunungan yang unik.'
where id = 'papua-pegunungan';

update public.provinces
set description_id = 'Menempati ujung barat laut Pulau Papua di sekitar kota pelabuhan maritim Sorong, Papua Barat Daya merupakan gerbang utama menuju kepulauan Raja Ampat yang tersohor di dunia. Sebanyak seribu lima ratus lebih pulau karst kapur, laguna biru kehijauan Wayag dan Piaynemo, serta keanekaragaman hayati terumbu karang tertinggi di bumi menjadikannya keajaiban bahari kelas dunia. Selain pesona lautnya, hutan Kepala Burung melindungi burung cenderawasih serta sajian hasil laut segar khas Sorong.'
where id = 'papua-barat-daya';
