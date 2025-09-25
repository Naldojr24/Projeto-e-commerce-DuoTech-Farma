export default class ShoppingCart {
  constructor(productCatalog) {
    this.items = []
    this.productCatalog = productCatalog
    this.init()
  }

  init() {
    this.updateCartDisplay()
  }

  addToCart(productId) {
    const product = this.productCatalog.getProductById(productId)
    if (!product) return

    const existingItem = this.items.find((item) => item.id === productId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }

    this.updateCartDisplay()
    this.showAddedToCartMessage(product.name)
  }

  removeFromCart(productId) {
    this.items = this.items.filter((item) => item.id !== productId)
    this.updateCartDisplay()
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeFromCart(productId)
      return
    }

    const item = this.items.find((item) => item.id === productId)
    if (item) {
      item.quantity = newQuantity
      this.updateCartDisplay()
    }
  }

  updateCartDisplay() {
    this.updateCartCounter()
    this.updateCartItems()
    this.updateCartTotal()
  }

  updateCartCounter() {
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0)
    const counter = document.getElementById("cartCounter")

    if (totalItems > 0) {
      counter.textContent = totalItems
      counter.style.display = "block"
    } else {
      counter.style.display = "none"
    }
  }

  updateCartItems() {
    const container = document.getElementById("cartItems")

    if (this.items.length === 0) {
      container.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>'
      return
    }

    container.innerHTML = this.items
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="shoppingCart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="shoppingCart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="shoppingCart.removeFromCart(${item.id})">×</button>
            </div>
        `,
      )
      .join("")
  }

  updateCartTotal() {
    const total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalElement = document.getElementById("cartTotal")
    if (totalElement) {
      totalElement.textContent = `R$ ${total.toFixed(2)}`
    }
  }

  showAddedToCartMessage(productName) {
    const message = document.createElement("div")
    message.className = "cart-message"
    message.textContent = `${productName} adicionado ao carrinho!`
    document.body.appendChild(message)

    setTimeout(() => {
      message.classList.add("show")
    }, 100)

    setTimeout(() => {
      message.classList.remove("show")
      setTimeout(() => message.remove(), 300)
    }, 2000)
  }

  getCartData() {
    return {
      items: this.items,
      total: this.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }
  }

  clearCart() {
    this.items = []
    this.updateCartDisplay()
  }
}
