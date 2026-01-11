// Hamburger
const hamburger = document.querySelector(".hamburger-icon");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("showmenu");
});

// Accordion
const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector(".icon");

    // close others
    document.querySelectorAll(".accordion-content").forEach((c) => {
      if (c !== content) c.style.maxHeight = null;
    });
    document.querySelectorAll(".icon").forEach((i) => {
      if (i !== icon) i.textContent = "+";
    });

    // toggle current
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.textContent = "+";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.textContent = "−";
    }
  });
});

const firstContent = document.querySelector(".accordion-content");
const firstIcon = document.querySelector(".accordion-header .icon");

if (firstContent && firstIcon) {
  firstContent.style.maxHeight = firstContent.scrollHeight + "px";
  firstIcon.textContent = "−";
}

// Counter
const nums = document.querySelectorAll(".counter");
const container = document.querySelector(".counter-section");

let hasCounted = false; // 🔹 flag

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;

        nums.forEach((e) => startCount(e));

        // 🔹 stop observing after first trigger
        observer.unobserve(container);
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(container);

function startCount(el) {
  let start = 0;
  let end = Number(el.dataset.target);

  el.textContent = "0%";

  const interval = setInterval(() => {
    start++;
    el.textContent = `${start}%`;

    if (start >= end) {
      clearInterval(interval);
      el.textContent = `${end}%`; // stay at end
    }
  }, 2000 / end);
}

// Product
const images = [
  "assets/product1.webp",
  "assets/product2.webp",
  "assets/product1.webp",
  "assets/product2.webp",
  "assets/product1.webp",
  "assets/product2.webp",
  "assets/product1.webp",
  "assets/product2.webp",
];

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnails img");
const dotsContainer = document.querySelector(".dots");

// CREATE DOTS BASED ON IMAGE COUNT
images.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.dataset.index = index;

  if (index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => updateGallery(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateGallery(index) {
  currentIndex = index;
  mainImage.src = images[index];

  thumbnails.forEach((img) => img.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  thumbnails[index].classList.add("active");
  dots[index].classList.add("active");
}

// ARROWS
document.querySelector(".arrow.left").onclick = () => {
  updateGallery((currentIndex - 1 + images.length) % images.length);
};

document.querySelector(".arrow.right").onclick = () => {
  updateGallery((currentIndex + 1) % images.length);
};

// THUMBNAILS
thumbnails.forEach((img) => {
  img.addEventListener("click", () => {
    updateGallery(Number(img.dataset.index));
  });
});

const addToCart = document.getElementById("addToCart");

function updateUI() {
  const purchase = document.querySelector(
    'input[name="purchase"]:checked'
  ).value;
  singleBox.classList.toggle("active", purchase === "single");
  doubleBox.classList.toggle("active", purchase === "double");
  updateCart();
}

function updateCart() {
  const purchase = document.querySelector(
    'input[name="purchase"]:checked'
  ).value;
  let url = "https://dummycart.com/add?";

  if (purchase === "single") {
    const f = document.querySelector(
      'input[name="singleFragrance"]:checked'
    ).value;
    url += `type=single&fragrance=${f}`;
  } else {
    const f1 = document.querySelector(
      'input[name="doubleFragrance1"]:checked'
    ).value;
    const f2 = document.querySelector(
      'input[name="doubleFragrance2"]:checked'
    ).value;
    url += `type=double&f1=${f1}&f2=${f2}`;
  }
  addToCart.href = url;
}

document.querySelectorAll("input[type=radio]").forEach((r) =>
  r.addEventListener("change", () => {
    updateUI();
    updateCart();
  })
);

updateUI();
updateCart();
