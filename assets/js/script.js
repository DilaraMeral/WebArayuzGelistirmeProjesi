'use strict';

document.addEventListener("DOMContentLoaded", () => {

  const backTopBtn = document.querySelector("[data-back-top-btn]");  // ✅ Bunu ekle

  const addEventOnElements = (elements, eventType, callback) => {
    elements.forEach(el => el.addEventListener(eventType, callback));
  };

  const navbar = document.querySelector("[data-navbar]");
  const navbarTogglers = document.querySelectorAll("[data-nav-toggler]");
  const navbarLinks = document.querySelectorAll("[data-nav-link]");
  const overlay = document.querySelector("[data-overlay]");
  const header = document.querySelector("[data-header]");
  

  const toggleNav = () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  const closeNav = () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  };

  addEventOnElements(navbarTogglers, "click", toggleNav);
  addEventOnElements(navbarLinks, "click", closeNav);

  window.addEventListener("scroll", () => {
    const isActive = window.scrollY > 50;
    header.classList.toggle("active", isActive);
    backTopBtn.classList.toggle("active", isActive);
  }); 

  // ✅ Telefon numarası sadece rakam kontrolü
  const phoneInput = document.getElementById("phone");

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      const value = e.target.value;

      if (/[^0-9]/.test(value)) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Character!',
          text: 'Please enter numbers only.',
          confirmButtonColor: '#ff6600'
        });

        e.target.value = value.replace(/[^0-9]/g, '');
      }
    });
  }

  // ✅ Form kontrolü (boş alan varsa uyarı, doluysa başarı mesajı)
  window.validateReservation = function () {
  const name = $("#name").val().trim();
  const phone = $("#phone").val().trim();
  const date = $("#date").val().trim();
  const time = $("#time").val().trim();

  if (!name || !phone || !date || !time) {
    Swal.fire({
      icon: 'error',
      title: 'Incomplete Information!',
      text: 'Please fill in all the fields.',
      confirmButtonColor: '#ff6600'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Successful!',
    text: 'Your reservation has been made.',
    confirmButtonColor: '#ff6600'
  }).then(() => {
    $("#name, #phone, #date, #time").val('');
  });
};


}); // 🔚 DOMContentLoaded kapanışı burada

window.onbeforeunload = function () {
  window.scrollTo(0, 0);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

};

// modal.js

const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const productList = document.getElementById("productList");
const modalTitle = document.getElementById("modalTitle");

const productsByCategory = {
  pizza: ["Margherita", "Pepperoni", "Veggie"],
  hamburger: ["Classic Burger", "Cheeseburger", "BBQ Burger"],
  chicken: ["Fried Chicken", "Grilled Chicken", "Spicy Wings"]
};

const products = {
  pizza: [
    {
      name: "Forest Flame Pizza",
      price: "400 TL",
      description: "Sausage, Red pepper, Cheese, Mushroom",
      image: "./assets/images/menu-2.png"
    },
    {
      name: "Margherita",
      price: "300 TL",
      description: "Tomato sauce, Mozzarella, Basil",
      image: "./assets/images/margarita.jpg"
    },
    {
      name: "Pepperoni Pizza",
      price: "350 TL",
      description: "Pepperoni, Mozzarella, Tomato sauce",
      image: "./assets/images/peperoni1.jpg"
    },
    {
      name: "Four Cheese Pizza",
      price: "390 TL",
      description: "Mozzarella, Gorgonzola, Parmesan, Goat cheese",
      image: "./assets/images/fourcheese.jpg"
    },
    {
      name: "Vegetarian Pizza",
      price: "370 TL",
      description: "Mushroom, Bell peppers, Onion, Olive",
      image: "./assets/images/veji.png"
    }
  ],
  hamburger: [
    {
      name: "Smoky Inferno",
      price: "350 TL",
      description: "Beef special spicy meatballs, Lettuce, Tomato, Cheddar cheese, Beef bacon",
      image: "./assets/images/menu-1.png"
    },
    {
      name: "Classic Burger",
      price: "300 TL",
      description: "Beef patty, Lettuce, Tomato, Onion, Pickles",
      image: "./assets/images/classic.jpeg"
    },
    {
      name: "Cheeseburger",
      price: "320 TL",
      description: "Beef patty, Cheese, Lettuce, Tomato",
      image: "./assets/images/cheeseburger1.png"
    },
    {
      name: "BBQ Burger",
      price: "360 TL",
      description: "Beef patty, BBQ sauce, Onion rings, Cheddar",
      image: "./assets/images/bbq1.jpeg"
    },
    {
      name: "Double Beef Burger",
      price: "400 TL",
      description: "Double beef, Cheese, Bacon, Pickles, Sauce",
      image: "./assets/images/double.png"
    }
  ],
  chicken: [
    {
      name: "Baked Chicken Wings",
      price: "325 TL",
      description: "Chicken wings, Special crispy chicken sauce",
      image: "./assets/images/menu-3.png"
    },
    {
      name: "Fried Chicken",
      price: "310 TL",
      description: "Crispy fried chicken with herbs and spices",
      image: "./assets/images/a.png"
    },
    {
      name: "Grilled Chicken",
      price: "330 TL",
      description: "Grilled chicken breast, Herbs, Olive oil",
      image: "./assets/images/grilled1.png"
    },
    {
      name: "Chicken Nuggets",
      price: "290 TL",
      description: "Bite-sized crispy chicken nuggets",
      image: "./assets/images/nugget.png"
    },
    {
      name: "Spicy Chicken Tenders",
      price: "340 TL",
      description: "Spicy crispy chicken strips with dip",
      image: "./assets/images/tenders.png"
    }
  ]
};



function openModalWithCategory(category) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const productList = document.getElementById("productList");

  // İçeriği temizle
  productList.innerHTML = "";

  // Ürünleri ekle
  if (products[category]) {
    products[category].forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="menu-item">
          <figure class="item-banner">
            <img src="${item.image}" width="100" height="100" loading="lazy" alt="${item.name}">
          </figure>
          <div class="item-content">
            <div class="title-wrapper">
              <span class="item-name">${item.name}</span>
              <span class="price">${item.price}</span>
            </div>
            <p class="menu-text">${item.description}</p>
            <div class="rating-wrapper">
            
            </div>
          </div>
        </div>
      `;
      productList.appendChild(li);
    });
  }

  // Modalı göster
  modal.style.display = "block";
}

// Modalı kapatma işlemi
document.getElementById("closeModalBtn").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

// Kullanıcı modal dışına tıklarsa kapansın
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});


