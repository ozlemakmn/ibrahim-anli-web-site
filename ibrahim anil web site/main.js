const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

/* ============================
   LIGHTBOX GALERİ
============================ */

const images = document.querySelectorAll(".galeri-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

function showImage(index) {
  lightboxImg.src = images[index].src;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    lightbox.style.display = "flex";
    showImage(currentIndex);
  });
});

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    showImage(currentIndex);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
    showImage(currentIndex);
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (lightbox && lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});

/* ============================
   MENÜ
============================ */

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

/* ============================
   BMI HESAPLAMA
============================ */

function calculateBMI() {
  let heightInput = document.getElementById("height").value.trim();
  let weightInput = document.getElementById("weight").value.trim();

  document.getElementById("result").innerHTML = "";

  heightInput = heightInput.replace(",", ".");
  weightInput = weightInput.replace(",", ".");

  let height = parseFloat(heightInput);
  let weight = parseFloat(weightInput);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    document.getElementById("result").innerHTML =
      "Lütfen geçerli değer girin!";
    return;
  }

  if (height > 3) {
    height = height / 100;
  }

  let bmi = (weight / (height * height)).toFixed(1);

  let status = "";

  if (bmi < 18.5) status = "Zayıf";
  else if (bmi < 25) status = "Normal";
  else if (bmi < 30) status = "Fazla Kilolu";
  else status = "Obez";

  document.getElementById("result").innerHTML =
    "BMI: " + bmi + " (" + status + ")";
}

function clearBMI() {
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("result").innerHTML = "";
}

/* ============================
   SCROLL REVEAL
============================ */

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
