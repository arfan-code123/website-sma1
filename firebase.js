import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQEc-Id9673vKbOpo9WtYLXbjde21fCkE",
  authDomain: "sma-1-contoh.firebaseapp.com",
  databaseURL: "https://sma-1-contoh-default-rtdb.firebaseio.com/",
  projectId: "sma-1-contoh",
  storageBucket: "sma-1-contoh.appspot.com",
  messagingSenderId: "343871913363",
  appId: "1:343871913363:web:6249de249ab753b8b0fc66",
  measurementId: "G-X6ZL5ETZ4N"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===== Album otomatis =====
let albumSlideIndex = 1;
const albumContainer = document.querySelector('.album-slideshow-container');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

const albumRef = ref(db, 'album');
onValue(albumRef, (snapshot) => {
  const data = snapshot.val();
  const slidesOld = albumContainer.querySelectorAll('.album-slide');
  slidesOld.forEach(slide => slide.remove());

  if(data){
    Object.keys(data).forEach(key => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'album-slide fade';
      slideDiv.innerHTML = `<img src="${data[key].url}" alt="${data[key].judul}">`;
      const nextBtn = albumContainer.querySelector('.next-album');
      albumContainer.insertBefore(slideDiv, nextBtn);
    });

    albumSlideIndex = 1;
    showAlbumSlides(albumSlideIndex);

    const albumImages = document.querySelectorAll('.album-slide img');
    albumImages.forEach(img => {
      img.addEventListener('click', function() {
        lightbox.style.display = 'block';
        lightboxImg.src = this.src;
      });
    });
  }
});

function showAlbumSlides(n) {
  const slides = document.querySelectorAll('.album-slide');
  if(slides.length === 0) return;

  if(n > slides.length) albumSlideIndex = 1;
  if(n < 1) albumSlideIndex = slides.length;

  slides.forEach(slide => slide.style.display = 'none');
  slides[albumSlideIndex - 1].style.display = 'block';
}

function plusAlbumSlides(n) {
  showAlbumSlides(albumSlideIndex += n);
}
window.plusAlbumSlides = plusAlbumSlides;

setInterval(() => { plusAlbumSlides(1); }, 4000);

document.getElementById('close-lightbox').onclick = () => {
  lightbox.style.display = 'none';
};

// ====== Berita otomatis ======
const beritaList = document.getElementById("berita-list");
const beritaLainnya = document.getElementById("berita-lainnya");
const beritaRef = ref(db, 'berita');

onValue(beritaRef, (snapshot) => {
  beritaList.innerHTML = "";
  beritaLainnya.innerHTML = "";

  const data = snapshot.val();
  if (data) {
    const items = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    items.sort((a, b) => {
      const timeA = isNaN(a.waktu) ? new Date(a.waktu).getTime() : Number(a.waktu);
      const timeB = isNaN(b.waktu) ? new Date(b.waktu).getTime() : Number(b.waktu);
      return timeB - timeA;
    });

    // Berita utama (5 terbaru)
    items.slice(0, 5).forEach((item) => {
      beritaList.innerHTML += `
        <article>
          <h3>${item.judul}</h3>
          ${item.gambar ? `<img src="${item.gambar}" alt="${item.judul}" style="max-width:100%;height:auto;">` : ""}
          <p id="isi-${item.id}" data-expanded="false">
            ${item.isi.length > 150 ? item.isi.substring(0,150) + "..." : item.isi}
          </p>
          ${item.isi.length > 150 ? 
            `<a href="javascript:void(0)" onclick="toggleBerita('${item.id}', \`${item.isi}\`)">Baca selengkapnya</a>` 
            : ""
          }
          <p><small>${new Date(
            isNaN(item.waktu) ? item.waktu : Number(item.waktu)
          ).toLocaleString()}</small></p>
        </article>
      `;
    });

    // 🔥 Berita lainnya (bisa diklik)
    items.slice(5, 15).forEach((item) => {
      beritaLainnya.innerHTML += `
        <p>
          • <a href="javascript:void(0)" 
                onclick="tampilkanBerita(
                  '${item.id}',
                  \`${item.judul}\`,
                  \`${item.isi}\`,
                  \`${item.gambar || ""}\`,
                  '${item.waktu}'
                )">
            ${item.judul}
          </a>
        </p>
      `;
    });
  }
});

// ====== Fungsi tampilkan detail berita ======
window.tampilkanBerita = function(id, judul, isi, gambar, waktu) {
  const beritaList = document.getElementById("berita-list");
  beritaList.innerHTML = `
    <article>
      <h2>${judul}</h2>
      ${gambar ? `<img src="${gambar}" alt="${judul}" style="max-width:100%;height:auto;">` : ""}
      <p>${isi}</p>
      <p><small>${new Date(
        isNaN(waktu) ? waktu : Number(waktu)
      ).toLocaleString()}</small></p>
      <button onclick="location.reload()">⬅ Kembali</button>
    </article>
  `;
};