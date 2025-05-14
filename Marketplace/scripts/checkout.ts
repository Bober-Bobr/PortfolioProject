interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

document.addEventListener("DOMContentLoaded", (): void => {
  // Get cart from localStorage
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")

  // Elements
  const checkoutItemsContainer: HTMLElement | null = document.getElementById("checkout-items")
  const subtotalElement: HTMLElement | null = document.getElementById("subtotal")
  const shippingCostElement: HTMLElement | null = document.getElementById("shipping-cost")
  const totalCostElement: HTMLElement | null = document.getElementById("total-cost")
  const placeOrderButton: HTMLElement | null = document.getElementById("place-order")
  const orderConfirmationModal: HTMLElement | null = document.getElementById("order-confirmation-modal")
  const orderNumberElement: HTMLElement | null = document.getElementById("order-number")

  // Shipping options
  const shippingOptions: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="shipping"]')

  // Payment options
  const paymentOptions: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="payment"]')
  const cardPaymentForm: HTMLElement | null = document.getElementById("card-payment-form")

  // Initialize checkout page
  if (checkoutItemsContainer) {
    renderCheckoutItems()
    updateOrderSummary()
    setupEventListeners()
  }

  function renderCheckoutItems(): void {
    if (!checkoutItemsContainer) return

    // Clear previous items
    checkoutItemsContainer.innerHTML = ""

    if (cart.length === 0) {
      checkoutItemsContainer.innerHTML = `
        <div class="text-center text-gray-500 py-8">
          <p>Корзина пуста</p>
        </div>
      `
      return
    }

    // Add cart items
    cart.forEach((item: CartItem): void => {
      const itemTotal: number = item.price * item.quantity

      const checkoutItem: HTMLDivElement = document.createElement("div")
      checkoutItem.className = "flex items-center py-4"
      checkoutItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
        <div class="ml-4 flex-grow">
          <h3 class="font-medium">${item.name}</h3>
          <p class="text-gray-500">Количество: ${item.quantity}</p>
        </div>
        <div class="text-right">
          <p class="font-medium">${formatPrice(itemTotal)}</p>
        </div>
      `

      checkoutItemsContainer.appendChild(checkoutItem)
    })
  }

  function updateOrderSummary(): void {
    if (!subtotalElement || !shippingCostElement || !totalCostElement) return

    // Calculate subtotal
    const subtotal: number = cart.reduce(
      (total: number, item: CartItem): number => total + item.price * item.quantity,
      0,
    )

    // Get shipping cost
    let shippingCost = 300 // Default to standard shipping

    document.querySelectorAll('input[name="shipping"]:checked').forEach((option: Element): void => {
      const value: string | null = (option as HTMLInputElement).value

      switch (value) {
        case "express":
          shippingCost = 600
          break
        case "pickup":
          shippingCost = 0
          break
        default:
          shippingCost = 300
      }
    })

    // Calculate total
    const total: number = subtotal + shippingCost

    // Update elements
    subtotalElement.textContent = formatPrice(subtotal)
    shippingCostElement.textContent = formatPrice(shippingCost)
    totalCostElement.textContent = formatPrice(total)
  }

  function setupEventListeners(): void {
    // Shipping options
    shippingOptions.forEach((option: HTMLInputElement): void => {
      option.addEventListener("change", updateOrderSummary)
    })

    // Payment options
    paymentOptions.forEach((option: HTMLInputElement): void => {
      option.addEventListener("change", function (this: HTMLInputElement): void {
        if (this.value === "card" && cardPaymentForm) {
          cardPaymentForm.classList.remove("hidden")
        } else if (cardPaymentForm) {
          cardPaymentForm.classList.add("hidden")
        }
      })
    })

    // Place order button
    if (placeOrderButton) {
      placeOrderButton.addEventListener("click", (e: Event): void => {
        e.preventDefault()

        // Simple form validation
        const firstNameInput: HTMLInputElement | null = document.getElementById("first-name") as HTMLInputElement | null
        const lastNameInput: HTMLInputElement | null = document.getElementById("last-name") as HTMLInputElement | null
        const emailInput: HTMLInputElement | null = document.getElementById("email") as HTMLInputElement | null
        const phoneInput: HTMLInputElement | null = document.getElementById("phone") as HTMLInputElement | null
        const addressInput: HTMLInputElement | null = document.getElementById("address") as HTMLInputElement | null
        const cityInput: HTMLInputElement | null = document.getElementById("city") as HTMLInputElement | null

        if (!firstNameInput || !lastNameInput || !emailInput || !phoneInput || !addressInput || !cityInput) {
          console.error("Form elements not found")
          return
        }

        const firstName: string = firstNameInput.value
        const lastName: string = lastNameInput.value
        const email: string = emailInput.value
        const phone: string = phoneInput.value
        const address: string = addressInput.value
        const city: string = cityInput.value

        if (!firstName || !lastName || !email || !phone || !address || !city) {
          alert("Пожалуйста, заполните все обязательные поля")
          return
        }

        // Check if cart is empty
        if (cart.length === 0) {
          alert("Ваша корзина пуста")
          return
        }

        // Process order
        processOrder()
      })
    }
  }

  function processOrder(): void {
    // Generate random order number
    const orderNumber: number = Math.floor(100000 + Math.random() * 900000)

    // Clear cart
    localStorage.setItem("cart", JSON.stringify([]))

    // Show confirmation modal
    if (orderConfirmationModal && orderNumberElement) {
      orderNumberElement.textContent = orderNumber.toString()
      orderConfirmationModal.classList.remove("hidden")

      // Close modal when clicking outside
      orderConfirmationModal.addEventListener("click", (e: Event): void => {
        if (e.target === orderConfirmationModal) {
          orderConfirmationModal.classList.add("hidden")
        }
      })
    }
  }

  // Helper function to format price
  function formatPrice(price: number): string {
    return price.toLocaleString("ru-RU") + " ₽"
  }
})
