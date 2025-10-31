document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const products = document.querySelectorAll(".product");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();

      products.forEach((product) => {
        const title = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = title.includes(value) ? "block" : "none";
      });
    });
  }

  // Обработка кнопок "Детальніше"
  const detailButtons = document.querySelectorAll(".product button");
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.closest(".product");
      const productId = product.dataset.id;
      window.location.href = `product-details.html?id=${productId}`;
    });
  });

  // Загрузка деталей товара
  if (window.location.pathname.includes("product-details.html")) {
    loadProductDetails();
  }
});

// База данных товаров
const productsDatabase = {
  // Гитары
  guitar1: {
    id: "guitar1",
    category: "guitars",
    name: "Акустична Гітара",
    price: "$299",
    image: "acoustic-guitar.png",
    description:
      "Якісна акустична гітара з масивом ялини та палісандровою нижньою декою. Ідеальна для початківців та професіоналів.",
    specs:
      "Тип: акустична, Матеріал корпусу: ялина, Гриф: махагон, Струни: сталь",
  },
  guitar2: {
    id: "guitar2",
    category: "guitars",
    name: "Електрогітара",
    price: "$399",
    image: "electric-guitar.png",
    description:
      "Потужна електрогітара з хамбакерами для різких звуків. Ідеальна для рок та метал музики.",
    specs:
      "Тип: електрогітара, Матеріал корпусу: липа, Гриф: клен, Звукознімачі: хамбакери",
  },
  guitar3: {
    id: "guitar3",
    category: "guitars",
    name: "Бас-гітара",
    price: "$349",
    image: "bass-guitar.png",
    description:
      "Якісна бас-гітара з потужним звуком. Ідеальна для створення ритмічної основи.",
    specs:
      "Тип: бас-гітара, Матеріал корпусу: липа, Гриф: клен, Кількість струн: 4",
  },

  // Клавишные
  keyboard1: {
    id: "keyboard1",
    category: "keyboards",
    name: "Цифрове піаніно Roland FP-30X White",
    price: "$899",
    image: "fp30x.png",
    description:
      "Компактне цифрове піаніно з натуральною клавіатурою та Bluetooth.",
    specs:
      "88 клавіш, Вага: 14.7 кг, Підключення: Bluetooth, USB, Вихід на навушники",
    video: "https://www.youtube.com/embed/ldK9A4P4EJ4",
  },
  keyboard2: {
    id: "keyboard2",
    category: "keyboards",
    name: "Цифрове фортепіано ROLAND LX-15",
    price: "$3799",
    image: "lx15.png",
    description:
      "Рояльний дизайн та звук концертного рояля у цифровому форматі.",
    specs:
      "88 клавіш, Вага: 114 кг, Підключення: Bluetooth, USB, Вихід на навушники",
    video: "https://www.youtube.com/embed/050x9mUdtME",
  },
  keyboard3: {
    id: "keyboard3",
    category: "keyboards",
    name: "Концертний рояль Steinway & Sons",
    price: "$1 370 178",
    image: "steinway.png",
    description: "Легендарний концертний рояль з неперевершеним звуком.",
    specs:
      "88 клавіш, Довжина: 274 см, Вага: 480 кг, Матеріал: масив ялини та червоного дерева",
    video: "https://www.youtube.com/embed/SkqKSagbdLM",
  },
  keyboard4: {
    id: "keyboard4",
    category: "keyboards",
    name: "Синтезатор YAMAHA DGX-670",
    price: "$1299",
    image: "dgx670.png",
    description:
      "Потужний синтезатор з широким вибором тембрів та стилів акомпанементу.",
    specs: "88 клавіш, Вага: 22 кг, 622 тембри, 237 стилів акомпанементу",
    video: "https://www.youtube.com/embed/D6a0POAD2KqpDA4p",
  },
  keyboard5: {
    id: "keyboard5",
    category: "keyboards",
    name: "Цифрове піаніно Yamaha P-45",
    price: "$459",
    image: "p45.png",
    description: "Компактне та доступне цифрове піаніно для початківців.",
    specs: "88 клавіш, Вага: 11.5 кг, 10 тембрів, Вихід на навушники",
    video: "https://www.youtube.com/embed/gnLhuCiJQLI",
  },

  // Ударные
  drum1: {
    id: "drum1",
    category: "drums",
    name: "Електронна Ударна Установка",
    price: "$360",
    image: "electric-drums.png",
    description:
      "Електронна ударна установка MPS-150 E-Drum Set для домашніх занять.",
    specs: "8 пэдов, 225 вбудованих звуків, Вага: 12 кг, USB/MIDI вихід",
  },
  drum2: {
    id: "drum2",
    category: "drums",
    name: "Акустичні Барабани",
    price: "$999",
    image: "acoustic-drums.png",
    description:
      "Повноцінна акустична ударна установка для концертних виступів.",
    specs:
      "5-частинна установка, Матеріал: клен, В комплекті: тарілки та підставки",
  },
  drum3: {
    id: "drum3",
    category: "drums",
    name: "Кахон",
    price: "$300",
    image: "kahon.png",
    description: "Деревяний кахон для фламенко та сучасної музики.",
    specs: "Матеріал: береза, Висота: 48 см, Ширина: 30 см, Глибина: 30 см",
  },

  // Духовые
  wind1: {
    id: "wind1",
    category: "wind",
    name: "Альт-саксофон YAMAHA YAS-26",
    price: "$1399",
    image: "saxophone.png",
    description: "Професійний альт-саксофон для студентів та аматорів.",
    specs: "Ключ: Eb, Матеріал: жовта латунь, Покриття: лак",
  },
  wind2: {
    id: "wind2",
    category: "wind",
    name: "Флейта YAMAHA YFL-272",
    price: "$999",
    image: "flute.png",
    description: "Концертна флейта з срібним покриттям.",
    specs: "Матеріал: нікелеве срібло, Механізм: закрита клавіатура",
  },
  wind3: {
    id: "wind3",
    category: "wind",
    name: "Кларнет HENRI SELMER PARIS PRIVILEGE EVOLUTION",
    price: "$5999",
    image: "clarinet.png",
    description: "Професійний кларнет французького виробництва.",
    specs: "Ключ: Bb, Матеріал: чорне дерево, Система: Boehm",
  },

  // Аксессуары
  accessory1: {
    id: "accessory1",
    category: "accessories",
    name: "Тюнер-метроном для гітари",
    price: "$25",
    image: "tuner.png",
    description:
      "Компактний тюнер з метрономом для точного налаштування інструментів.",
    specs: "Діапазон: A0 (27.5Hz) - C8 (4186Hz), Точність: ±1 цент",
  },
  accessory2: {
    id: "accessory2",
    category: "accessories",
    name: "Клавішна стійка Alta Nota JX52",
    price: "$55",
    image: "stand.png",
    description: "Міцна стійка для нот з регульованою висотою.",
    specs: "Матеріал: метал, Максимальна висота: 120 см, Вага: 1.2 кг",
  },
  accessory3: {
    id: "accessory3",
    category: "accessories",
    name: "Пюпітр концертний Kaspar P-06",
    price: "$15",
    image: "pupitr.png",
    description: "Легкий та міцний пюпітр для нот.",
    specs: "Матеріал: пластик, Розмір: 40×30 см, Вага: 0.5 кг",
  },
};

function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = productsDatabase[productId];

  if (product) {
    document.title = product.name + " | Деталі товару";

    const videoEmbed = product.video
      ? `<div class="product-video">
           <h3>Відеоогляд:</h3>
           <iframe width="560" height="315" src="${product.video}" 
                   frameborder="0" allowfullscreen></iframe>
         </div>`
      : "";

    const container = document.querySelector(".container");
    container.innerHTML = `
      <h1>${product.name}</h1>
      <div class="search-bar">
        <a href="${product.category}.html" class="back-link">← Назад до категорії</a>
        <a href="index.html" class="back-link">← На головну</a>
      </div>
      
      <div class="product-details">
        <div class="product-image">
          <img src="images/${product.category}/${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h2>${product.name}</h2>
          <p class="price">${product.price}</p>
          <p class="description">${product.description}</p>
          <h3>Характеристики:</h3>
          <p class="specs">${product.specs}</p>
          ${videoEmbed}
          <button class="buy-button" disabled>Купити</button>
        </div>
      </div>
      
      <footer>
        <p>Авторське право © Kavarnaly Daniil. Усі права захищено.</p>
      </footer>
    `;
  } else {
    document.querySelector(".container").innerHTML = `
      <h1>Товар не знайдено</h1>
      <p>Вибачте, але запрошений товар не існує або був видалений.</p>
      <a href="index.html" class="back-link">← На головну</a>
    `;
  }
}
