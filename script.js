// Toggle menu
const toggleBtn = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

toggleBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.has-sub > a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.has-sub').forEach(item => {
      if (item !== this.parentElement) item.classList.remove('open');
    });
    this.parentElement.classList.toggle('open');
  });
});

// Toggle isi berita
window.toggleBerita = function(id, fullText) {
  const p = document.getElementById("isi-" + id);
  const link = p.nextElementSibling;
  const currentTop = p.getBoundingClientRect().top + window.scrollY;

  if (p.dataset.expanded === "true") {
    p.innerText = fullText.substring(0,150) + "...";
    link.innerText = "Baca selengkapnya";
    p.dataset.expanded = "false";
  } else {
    p.innerText = fullText;
    link.innerText = "Tutup";
    p.dataset.expanded = "true";
  }

  window.scrollTo({ top: currentTop - 50, behavior: "smooth" });
};