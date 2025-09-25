export default class UIManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
  }

  setupEventListeners() {
    const hamburger = document.getElementById("hamburgerBtn")
    const mobileMenu = document.getElementById("mobileMenuOverlay")

    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        hamburger.classList.toggle("active")
      })

      
      mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) {
          mobileMenu.classList.remove("active")
          hamburger.classList.remove("active")
        }
      })

      
      document.querySelectorAll(".mobile-menu-item").forEach((item) => {
        item.addEventListener("click", () => {
          mobileMenu.classList.remove("active")
          hamburger.classList.remove("active")
        })
      })
    }

    const categoryBtn = document.getElementById("categoryBtn")
    const categoryMenu = document.getElementById("categoryMenu")

    if (categoryBtn && categoryMenu) {
      categoryBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        categoryMenu.classList.toggle("active")
        categoryBtn.classList.toggle("active")
      })

      
      document.addEventListener("click", () => {
        categoryMenu.classList.remove("active")
        categoryBtn.classList.remove("active")
      })

      
      categoryMenu.addEventListener("click", (e) => {
        e.stopPropagation()
      })
    }

    
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModal(e.target.id)
      }
    })

    
    document.querySelectorAll(".close-modal").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal")
        if (modal) {
          this.closeModal(modal.id)
        }
      })
    })

    
    document.getElementById("cartBtn")?.addEventListener("click", () => {
      this.openModal("cartModal")
    })

    document.getElementById("checkoutBtn")?.addEventListener("click", () => {
      this.openModal("checkoutModal")
      this.closeModal("cartModal")
    })
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.style.display = "flex"
      document.body.style.overflow = "hidden"

      
      const focusableElement = modal.querySelector("input, button, textarea, select")
      if (focusableElement) {
        setTimeout(() => focusableElement.focus(), 100)
      }
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  }

  showLoading(show = true) {
    const loader = document.getElementById("loader")
    if (loader) {
      loader.style.display = show ? "flex" : "none"
    }
  }

  renderOffers() {
    const offers = [
      {
        id: 1,
        title: "Frete Grátis",
        description: "Em compras acima de R$ 50,00 para todo o Brasil",
        badge: "Promoção",
      },
      {
        id: 2,
        title: "Desconto de 15%",
        description: "Na primeira compra para novos clientes",
        badge: "Novo Cliente",
      },
      {
        id: 3,
        title: "Entrega Expressa",
        description: "Receba em até 24h nas principais capitais",
        badge: "Rapidez",
      },
    ]

    const container = document.getElementById("offersContainer")
    if (container) {
      container.innerHTML = offers
        .map(
          (offer) => `
        <div class="offer-card">
          <div class="offer-badge">${offer.badge}</div>
          <h3 class="offer-title">${offer.title}</h3>
          <p class="offer-description">${offer.description}</p>
          <button class="offer-cta" onclick="document.getElementById('products').scrollIntoView({behavior: 'smooth'})">
            Aproveitar
          </button>
        </div>
      `,
        )
        .join("")
    }
  }
}
