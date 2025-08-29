document.getElementById("header").innerHTML = `
  <header>
    <img src="sma.png" alt="Logo SMA Negeri 1 Contoh" style="max-width: 150px;">
    <h1>SMA NEGERI 1 CONTOH</h1>
    <button class="menu-toggle">☰</button>
    <nav>
      <ul class="main-menu">
        <li><a href="index.html">BERANDA</a></li>
        <li class="has-sub">
          <a href="#">PROFIL</a>
          <ul class="submenu">
            <li><a href="sejarah.html">Sejarah</a></li>
            <li><a href="visi.html">Visi & Misi</a></li>
          </ul>
        </li>
        <li class="has-sub">
          <a href="#">AKADEMIK</a>
          <ul class="submenu">
            <li><a href="kelas.html">Kelas</a></li>
            <li><a href="silabus.html">Silabus</a></li>
            <li><a href="mapel.html">Mapel</a></li>
          </ul>
        </li>
        <li class="has-sub">
          <a href="#">MEDIA</a>
          <ul class="submenu">
            <li><a href="album.html">Album Foto</a></li>
            <li><a href="mading.html">Mading</a></li>
          </ul>
        </li>
        <li class="has-sub">
          <a href="#">DATA</a>
          <ul class="submenu">
            <li><a href="guru.html">Data Guru</a></li>
            <li><a href="tata.html">Tata Usaha</a></li>
            <li><a href="siswa.html">Data Siswa</a></li>
          </ul>
        </li>
        <li><a href="kontak.html">KONTAK</a></li>
      </ul>
    </nav>
  </header>
`;