export default class CheckoutManager {
  constructor(shoppingCart, uiManager) {
    this.shoppingCart = shoppingCart
    this.uiManager = uiManager
    this.init()
  }

  init() {
    this.setupEventListeners()
  }

  setupEventListeners() {
    const cepInput = document.getElementById("cep")
    if (cepInput) {
      cepInput.addEventListener("blur", () => this.fetchAddressByCep())
      cepInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length > 5) {
          value = value.replace(/^(\d{5})(\d)/, "$1-$2")
        }
        e.target.value = value
      })
    }

    const checkoutForm = document.getElementById("checkoutForm")
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => this.handleCheckoutSubmit(e))
    }
  }

  async fetchAddressByCep() {
    const cepInput = document.getElementById("cep")
    const cep = cepInput.value.replace(/\D/g, "")
    const messageDiv = document.getElementById("cepMessage")

    if (cep.length !== 8) {
      this.showCepMessage("CEP deve ter 8 dígitos", "error")
      return
    }

    try {
      this.showCepMessage("Buscando endereço...", "loading")

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (data.erro) {
        this.showCepMessage("CEP não encontrado", "error")
        this.clearAddressFields()
        return
      }

      this.fillAddressFields(data)
      this.showCepMessage("Endereço encontrado!", "success")

      const numeroInput = document.getElementById("numero")
      if (numeroInput) {
        setTimeout(() => numeroInput.focus(), 100)
      }
    } catch (error) {
      this.showCepMessage("Erro ao buscar CEP. Tente novamente.", "error")
      this.clearAddressFields()
    }
  }

  fillAddressFields(addressData) {
    const fields = {
      endereco: addressData.logradouro || "",
      bairro: addressData.bairro || "",
      cidade: addressData.localidade || "",
      uf: addressData.uf || "",
    }

    Object.entries(fields).forEach(([fieldId, value]) => {
      const field = document.getElementById(fieldId)
      if (field) {
        field.value = value
      }
    })
  }

  clearAddressFields() {
    ;["endereco", "bairro", "cidade", "uf"].forEach((fieldId) => {
      const field = document.getElementById(fieldId)
      if (field) {
        field.value = ""
      }
    })
  }

  showCepMessage(message, type) {
    const messageDiv = document.getElementById("cepMessage")
    if (!messageDiv) return

    messageDiv.textContent = message
    messageDiv.className = `cep-message ${type}`
    messageDiv.setAttribute("aria-live", "polite")

    if (type === "success") {
      setTimeout(() => {
        messageDiv.textContent = ""
        messageDiv.className = "cep-message"
      }, 3000)
    }
  }

  handleCheckoutSubmit(e) {
    e.preventDefault()

    const cartData = this.shoppingCart.getCartData()

    if (cartData.items.length === 0) {
      this.showCheckoutError("Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.")
      this.uiManager.closeModal("checkoutModal")
      this.uiManager.openModal("cartModal")
      return
    }

    const requiredFields = ["nome", "email", "telefone", "cep", "endereco", "numero", "bairro", "cidade", "uf"]
    const missingFields = requiredFields.filter((fieldId) => {
      const field = document.getElementById(fieldId)
      return !field || !field.value.trim()
    })

    if (missingFields.length > 0) {
      this.showCheckoutError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked')
    if (!paymentMethod) {
      this.showCheckoutError("Por favor, selecione uma forma de pagamento.")
      return
    }

    this.processOrder(cartData, paymentMethod.value)
  }

  showCheckoutError(message) {
    const existingError = document.querySelector(".checkout-error")
    if (existingError) {
      existingError.remove()
    }

    const errorEl = document.createElement("div")
    errorEl.className = "checkout-error show"
    errorEl.innerHTML = `
      <i class="fas fa-exclamation-triangle"></i>
      <span>${message}</span>
    `

    document.body.appendChild(errorEl)

    setTimeout(() => {
      errorEl.classList.remove("show")
      setTimeout(() => errorEl.remove(), 300)
    }, 4000)
  }

  processOrder(cartData, paymentMethod) {
    const orderNumber = Math.floor(Math.random() * 1000000)

    const paymentNames = {
      pix: "PIX",
      cartao: "Cartão de Crédito",
      boleto: "Boleto Bancário",
    }

    const paymentInstructions = {
      pix: "Você receberá o código PIX por email em instantes.",
      cartao: "Seu cartão será debitado em até 2 dias úteis.",
      boleto: "O boleto será enviado por email. Vencimento em 3 dias úteis.",
    }

    alert(
      `Pedido realizado com sucesso!\n\n📋 Número do pedido: ${orderNumber}\n💰 Total: R$ ${cartData.total.toFixed(2)}\n💳 Forma de pagamento: ${paymentNames[paymentMethod]}\n\n${paymentInstructions[paymentMethod]}\n\nVocê receberá um email de confirmação em breve.`,
    )

    this.shoppingCart.clearCart()
    this.uiManager.closeModal("checkoutModal")

    document.getElementById("checkoutForm").reset()
    document.getElementById("cepMessage").textContent = ""
  }
}
