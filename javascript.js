// Data untuk slider menu unggulan.
const menuItems = [
  {
    name: "Strawberry Cream Cake",
    title: "Strawberry<br>Cream Cake",
    description:
      "Kue lembut dengan perpaduan sponge cake, krim vanilla yang creamy, dan potongan stroberi segar yang memberikan rasa manis dan sedikit asam di setiap gigitan.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    alt: "Strawberry cream cake",
  },
  {
    name: "Chocolate Cookies",
    title: "Chocolate<br>Cookies",
    description:
      "Cookies renyah dengan potongan cokelat yang melimpah. Cocok untuk menemani waktu santai dan secangkir minuman favorit.",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
    alt: "Chocolate cookies",
  },
  {
    name: "Butter Croissant",
    title: "Butter<br>Croissant",
    description:
      "Pastry berlapis dengan tekstur renyah di luar dan lembut di dalam, dibuat untuk menghadirkan rasa buttery di setiap gigitan.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85",
    alt: "Butter croissant",
  },
  {
    name: "Tiramisu",
    title: "Classic<br>Tiramisu",
    description:
      "Perpaduan lembut krim, sponge cake, dan sentuhan kopi yang seimbang untuk pilihan dessert yang nikmat.",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85",
    alt: "Tiramisu dessert",
  },
  {
    name: "Cup Cake",
    title: "Sweet<br>Cup Cake",
    description:
      "Cup cake lembut dengan topping krim yang cantik. Pilihan manis untuk hadiah kecil dan momen spesial.",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85",
    alt: "Cup cake",
  },
];

const featuredTitle = document.getElementById("featuredTitle");
const featuredDescription = document.getElementById("featuredDescription");
const featuredImage = document.getElementById("featuredImage");
const menuDots = document.getElementById("menuDots");
const menuSearch = document.getElementById("menuSearch");
const searchMessage = document.getElementById("searchMessage");

let currentMenu = 0;

// Membuat titik navigasi slider menu.
function renderMenuDots() {
  menuDots.innerHTML = "";

  menuItems.forEach((item, index) => {
    const dot = document.createElement("button");

    dot.className = `slider-dot ${index === currentMenu ? "active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Tampilkan ${item.name}`);

    dot.addEventListener("click", () => showMenu(index));

    menuDots.appendChild(dot);
  });
}

// Mengubah menu unggulan.
function showMenu(index) {
  currentMenu = (index + menuItems.length) % menuItems.length;

  const item = menuItems[currentMenu];

  featuredTitle.innerHTML = item.title;
  featuredDescription.textContent = item.description;
  featuredImage.src = item.image;
  featuredImage.alt = item.alt;

  document
    .getElementById("favoriteButton")
    .setAttribute("aria-pressed", "false");
  document.getElementById("favoriteButton").textContent = "♡";

  renderMenuDots();
}

// Tombol slider sebelumnya dan berikutnya.
document.getElementById("menuPrev").addEventListener("click", () => {
  showMenu(currentMenu - 1);
});

document.getElementById("menuNext").addEventListener("click", () => {
  showMenu(currentMenu + 1);
});

renderMenuDots();

// Fitur pencarian menu.
function searchMenu(query) {
  const keyword = query.trim().toLowerCase();

  const cards = [...document.querySelectorAll(".product-card")];

  let visibleCards = 0;

  cards.forEach((card) => {
    const matches =
      !keyword || card.dataset.name.toLowerCase().includes(keyword);

    card.hidden = !matches;

    if (matches) visibleCards++;
  });

  document.getElementById("noProducts").hidden = visibleCards !== 0;

  const matchIndex = menuItems.findIndex((item) =>
    item.name.toLowerCase().includes(keyword),
  );

  if (keyword && matchIndex >= 0) {
    showMenu(matchIndex);

    searchMessage.textContent = `Menampilkan ${menuItems[matchIndex].name}.`;
  } else if (keyword) {
    searchMessage.textContent = "Menu unggulan yang cocok belum ditemukan.";
  } else {
    searchMessage.textContent = "";
  }
}

// Menjalankan pencarian ketika form dikirim.
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();

  searchMenu(menuSearch.value);

  document.getElementById("menu").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});

// Mengembalikan produk ketika kolom pencarian dikosongkan.
menuSearch.addEventListener("input", () => {
  if (menuSearch.value.trim() === "") {
    searchMenu("");
  }
});

// Tombol favorit.
document.getElementById("favoriteButton").addEventListener("click", (event) => {
  const button = event.currentTarget;

  const saved = button.getAttribute("aria-pressed") === "true";

  button.setAttribute("aria-pressed", String(!saved));

  button.textContent = saved ? "♡" : "♥";
});

// Slider kupon.
// Slider kupon, menampilkan 2 kupon sekaligus
const couponSlides = [...document.querySelectorAll(".coupon-slide")];
const couponDots = document.getElementById("couponDots");
const couponSlider = document.getElementById("couponSlider");

let currentCoupon = 0;
const couponsPerPage = 2;
const totalCouponPages = Math.ceil(couponSlides.length / couponsPerPage);

function showCoupon(page, direction = "up") {
  currentCoupon = (page + totalCouponPages) % totalCouponPages;

  couponSlider.classList.remove("slide-up", "slide-down");
  void couponSlider.offsetWidth;
  couponSlider.classList.add(direction === "down" ? "slide-down" : "slide-up");

  couponSlides.forEach((slide, index) => {
    const start = currentCoupon * couponsPerPage;
    const end = start + couponsPerPage;

    slide.classList.toggle("active", index >= start && index < end);
  });

  couponDots.querySelectorAll("button").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentCoupon);
  });
}

// Buat titik navigasi sesuai jumlah pasangan kupon
for (let i = 0; i < totalCouponPages; i++) {
  const dot = document.createElement("button");

  dot.type = "button";
  dot.className = `coupon-dot ${i === 0 ? "active" : ""}`;
  dot.setAttribute("aria-label", `Tampilkan pasangan kupon ${i + 1}`);

  dot.addEventListener("click", () => {
    const direction = i > currentCoupon ? "up" : "down";
    showCoupon(i, direction);
  });

  couponDots.appendChild(dot);
}

// Swipe atas dan bawah pada layar sentuh
let touchStartY = 0;

couponSlider.addEventListener(
  "touchstart",
  (event) => {
    touchStartY = event.changedTouches[0].screenY;
  },
  { passive: true },
);

couponSlider.addEventListener(
  "touchend",
  (event) => {
    const deltaY = event.changedTouches[0].screenY - touchStartY;

    if (Math.abs(deltaY) > 40) {
      showCoupon(
        currentCoupon + (deltaY < 0 ? 1 : -1),
        deltaY < 0 ? "up" : "down",
      );
    }
  },
  { passive: true },
);

// Tampilkan pasangan kupon pertama
showCoupon(0);

// Navigasi mobile.
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Menutup navigasi setelah pengguna memilih menu.
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";
  });
});
