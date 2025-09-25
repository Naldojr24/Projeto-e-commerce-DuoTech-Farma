export default class ProductCatalog {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Dipirona 500mg",
        price: 8.5,
        category: "analgesicos",
        image: "assets/diporona.jpg",
        description: "Analgésico e antitérmico para dores e febre.",
        features: [
          "Alívio rápido da dor",
          "Reduz a febre eficazmente",
          "Fórmula de ação prolongada",
          "Indicado para adultos e crianças",
        ],
        usage: "Tomar 1 comprimido a cada 6 horas, ou conforme orientação médica. Não exceder 4 comprimidos por dia.",
      },
      {
        id: 2,
        name: "Paracetamol 750mg",
        price: 12.3,
        category: "analgesicos",
        image: "assets/paracetamol.jpg",
        description: "Analgésico e antitérmico de ação rápida.",
        features: [
          "Ação analgésica potente",
          "Antitérmico eficaz",
          "Bem tolerado pelo organismo",
          "Início de ação em 30 minutos",
        ],
        usage:
          "Tomar 1 comprimido a cada 8 horas. Máximo de 3 comprimidos por dia. Não usar por mais de 5 dias consecutivos.",
      },
      {
        id: 3,
        name: "Ibuprofeno 600mg",
        price: 15.8,
        category: "anti-inflamatorios",
        image: "assets/ibuprofeno.jpg",
        description: "Anti-inflamatório para dores e inflamações.",
        features: [
          "Ação anti-inflamatória",
          "Alívio da dor muscular",
          "Reduz inchaço e vermelhidão",
          "Eficaz contra dores articulares",
        ],
        usage:
          "Tomar 1 comprimido a cada 8 horas, preferencialmente após as refeições. Consulte um médico antes do uso prolongado.",
      },
      {
        id: 4,
        name: "Vitamina C 1g",
        price: 25.9,
        category: "vitaminas",
        image: "assets/vitamina C.jpg",
        description: "Suplemento vitamínico para imunidade.",
        features: [
          "Fortalece o sistema imunológico",
          "Antioxidante natural",
          "Melhora a absorção de ferro",
          "Contribui para a saúde da pele",
        ],
        usage: "Tomar 1 comprimido por dia, preferencialmente pela manhã. Pode ser tomado com ou sem alimentos.",
      },
      {
        id: 5,
        name: "Vitamina D3 2000UI",
        price: 32.5,
        category: "vitaminas",
        image: "assets/vitamina D3.jpg",
        description: "Essencial para ossos e sistema imunológico.",
        features: [
          "Fortalece ossos e dentes",
          "Melhora a absorção de cálcio",
          "Suporte ao sistema imunológico",
          "Contribui para o bem-estar geral",
        ],
        usage: "Tomar 1 cápsula por dia, preferencialmente com uma refeição que contenha gordura para melhor absorção.",
      },
      {
        id: 6,
        name: "Omeprazol 20mg",
        price: 18.7,
        category: "digestivos",
        image: "assets/omeprazol.jpg",
        description: "Protetor gástrico para azia e refluxo.",
        features: [
          "Reduz a produção de ácido gástrico",
          "Alívio da azia e queimação",
          "Proteção da mucosa gástrica",
          "Tratamento do refluxo gastroesofágico",
        ],
        usage: "Tomar 1 cápsula por dia, em jejum, 30 minutos antes do café da manhã. Engolir inteiro, sem mastigar.",
      },
      {
        id: 7,
        name: "Simeticona 40mg",
        price: 14.2,
        category: "digestivos",
        image: "assets/simeticona.jpg",
        description: "Alívio para gases e desconforto abdominal.",
        features: [
          "Elimina gases intestinais",
          "Reduz distensão abdominal",
          "Alívio rápido do desconforto",
          "Não é absorvido pelo organismo",
        ],
        usage:
          "Tomar 1 a 2 comprimidos após as principais refeições e ao deitar. Pode ser mastigado ou engolido inteiro.",
      },
      {
        id: 8,
        name: "Loratadina 10mg",
        price: 11.9,
        category: "antialergicos",
        image: "assets/Loratadina.jpg",
        description: "Antialérgico para rinite e urticária.",
        features: [
          "Alívio de sintomas alérgicos",
          "Não causa sonolência",
          "Ação prolongada de 24 horas",
          "Eficaz contra rinite e urticária",
        ],
        usage: "Tomar 1 comprimido por dia, preferencialmente no mesmo horário. Pode ser tomado com ou sem alimentos.",
      },
    ]

    this.offers = [
      {
        id: 1,
        title: "Combo Analgésicos",
        description: "Dipirona + Paracetamol com 20% de desconto. Ideal para ter sempre em casa.",
        badge: "20% OFF",
        originalPrice: 20.8,
        discountPrice: 16.64,
        products: [1, 2],
      },
      {
        id: 2,
        title: "Kit Vitaminas",
        description: "Vitamina C + Vitamina D3 para fortalecer sua imunidade. Oferta especial!",
        badge: "OFERTA",
        originalPrice: 58.4,
        discountPrice: 45.9,
        products: [4, 5],
      },
      {
        id: 3,
        title: "Digestivos em Promoção",
        description: "Omeprazol + Simeticona para cuidar do seu sistema digestivo.",
        badge: "COMBO",
        originalPrice: 32.9,
        discountPrice: 28.5,
        products: [6, 7],
      },
    ]

    this.filteredProducts = [...this.products]
    this.currentCategory = "todos"
    this.currentSort = "nome"
    this.searchTerm = ""

    this.init()
  }

  init() {
    this.renderProducts()
    this.renderOffers() 
    this.setupEventListeners()
  }

  setupEventListeners() {
    document.querySelectorAll(".category-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.currentCategory = e.target.dataset.category
        this.updateActiveCategory(e.target)
        this.filterProducts()

        
        const categoryMenu = document.getElementById("categoryMenu")
        const categoryBtn = document.getElementById("categoryBtn")
        if (categoryMenu && categoryBtn) {
          categoryMenu.classList.remove("active")
          categoryBtn.classList.remove("active")
        }
      })
    })

    
    document.getElementById("sortSelect").addEventListener("change", (e) => {
      this.currentSort = e.target.value
      this.sortProducts()
    })

    
    const searchInputs = document.querySelectorAll("#searchInput, #mobileSearchInput")
    searchInputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this.searchTerm = e.target.value.toLowerCase()
        searchInputs.forEach((otherInput) => {
          if (otherInput !== e.target) {
            otherInput.value = e.target.value
          }
        })
        this.filterProducts()
      })
    })
  }

  updateActiveCategory(activeBtn) {
    document.querySelectorAll(".category-item").forEach((btn) => btn.classList.remove("active"))
    activeBtn.classList.add("active")
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.currentCategory === "todos" || product.category === this.currentCategory
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm)
      return matchesCategory && matchesSearch
    })

    this.sortProducts()
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) => {
      switch (this.currentSort) {
        case "menor-preco":
          return a.price - b.price
        case "maior-preco":
          return b.price - a.price
        case "nome":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    this.renderProducts()
  }

  renderProducts() {
    const container = document.getElementById("productsContainer")

    if (this.filteredProducts.length === 0) {
      container.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>'
      return
    }

    container.innerHTML = this.filteredProducts
      .map(
        (product) => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="btn-details" onclick="productCatalog.showProductDetails(${product.id})">
                            Ver Detalhes
                        </button>
                        <button class="btn-add-cart" onclick="window.shoppingCart.addToCart(${product.id})">
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  showProductDetails(productId) {
    const product = this.products.find((p) => p.id === productId)
    if (!product) return

    document.getElementById("modalProductName").textContent = product.name
    document.getElementById("modalProductImage").src = product.image
    document.getElementById("modalProductPrice").textContent = `R$ ${product.price.toFixed(2)}`
    document.getElementById("modalProductDescription").textContent = product.description

    const categoryNames = {
      analgesicos: "Analgésicos",
      "anti-inflamatorios": "Anti-inflamatórios",
      vitaminas: "Vitaminas",
      digestivos: "Digestivos",
      antialergicos: "Antialérgicos",
    }
    document.getElementById("modalProductCategory").textContent = categoryNames[product.category] || product.category

    const featuresList = document.getElementById("modalProductFeatures")
    featuresList.innerHTML = product.features.map((feature) => `<li>${feature}</li>`).join("")

    document.getElementById("modalProductUsage").textContent = product.usage

    document.getElementById("modalAddToCart").onclick = () => {
      window.shoppingCart.addToCart(productId)
      window.uiManager.closeModal("productModal")
    }

    window.uiManager.openModal("productModal")
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id)
  }

  renderOffers() {
    const container = document.getElementById("offersContainer")
    if (!container) return

    container.innerHTML = this.offers
      .map(
        (offer) => `
          <div class="offer-card">
            <div class="offer-badge">${offer.badge}</div>
            <h3 class="offer-title">${offer.title}</h3>
            <p class="offer-description">${offer.description}</p>
            <div class="offer-price">
              <span class="offer-original-price">De R$ ${offer.originalPrice.toFixed(2)}</span>
              <span class="offer-discount-price">Por R$ ${offer.discountPrice.toFixed(2)}</span>
            </div>
            <button class="offer-cta" onclick="productCatalog.addOfferToCart(${offer.id})">
              Aproveitar Oferta
            </button>
          </div>
        `,
      )
      .join("")
  }

  addOfferToCart(offerId) {
    const offer = this.offers.find((o) => o.id === offerId)
    if (!offer || !window.shoppingCart) return

    offer.products.forEach((productId) => {
      window.shoppingCart.addToCart(productId)
    })

    this.showOfferMessage(`${offer.title} adicionado ao carrinho!`)
  }

  showOfferMessage(message) {
    const existingMessage = document.querySelector(".offer-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    const messageEl = document.createElement("div")
    messageEl.className = "cart-message offer-message show"
    messageEl.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    `

    document.body.appendChild(messageEl)

    setTimeout(() => {
      messageEl.classList.remove("show")
      setTimeout(() => messageEl.remove(), 300)
    }, 3000)
  }
}
