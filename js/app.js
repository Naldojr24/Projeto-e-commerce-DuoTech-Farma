import ProductCatalog from "./ProductCatalog.js"
import ShoppingCart from "./ShoppingCart.js"
import CheckoutManager from "./CheckoutManager.js"
import UIManager from "./UIManager.js"

let productCatalog
let shoppingCart
let checkoutManager
let uiManager

document.addEventListener("DOMContentLoaded", () => {
  uiManager = new UIManager()
  productCatalog = new ProductCatalog()
  shoppingCart = new ShoppingCart(productCatalog)
  checkoutManager = new CheckoutManager(shoppingCart, uiManager)

  window.uiManager = uiManager
  window.productCatalog = productCatalog
  window.shoppingCart = shoppingCart
  window.checkoutManager = checkoutManager

  uiManager.renderOffers()

  console.log("DuoTech Farma inicializada com sucesso!")
})

window.formatPrice = (price) => {
  return `R$ ${price.toFixed(2).replace(".", ",")}`
}

window.formatCep = (cep) => {
  return cep.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2")
}
