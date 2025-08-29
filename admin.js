// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ==== KONFIGURASI FIREBASE ====
const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "PROJECT.firebaseapp.com",
  projectId: "PROJECT",
  storageBucket: "PROJECT.appspot.com",
  messagingSenderId: "ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==== KONFIGURASI CLOUDINARY ====
const CLOUD_NAME = "doxlp6bbz";
const UPLOAD_PRESET = "my_prest"; // <-- ini yang kamu buat

// ==== FORM POST BERITA ====
document.getElementById("formBerita").addEventListener("submit", async (e) => {
  e.preventDefault();

  const judul = document.getElementById("judul").value.trim();
  const isi = document.getElementById("isi").value.trim();
  const file = document.getElementById("gambar").files[0];

  let mediaUrl = "";

  try {
    // ==== UPLOAD GAMBAR KE CLOUDINARY ====
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.secure_url) {
        mediaUrl = data.secure_url;
        console.log("✅ Upload berhasil:", mediaUrl);
      } else {
        throw new Error("Upload gagal, cek preset di Cloudinary.");
      }
    }

    // ==== SIMPAN BERITA KE FIRESTORE ====
    await addDoc(collection(db, "berita"), {
      judul,
      isi,
      media: mediaUrl,
      tanggal: new Date().toISOString()
    });

    alert("✅ Berita berhasil diposting!");
    document.getElementById("formBerita").reset();
  } catch (err) {
    console.error("❌ Error:", err);
    alert("Gagal posting berita: " + err.message);
  }
});