interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  description?: string
}

document.addEventListener("DOMContentLoaded", (): void => {
  // Initialize cart from localStorage
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
  updateCartCount()

  // Cart icon click event
  const cartIcon: HTMLElement | null = document.querySelector(".cart-icon")
  const cartOverlay: HTMLElement | null = document.getElementById("cart-overlay")
  const cartSidebar: HTMLElement | null = document.getElementById("cart-sidebar")
  const closeCart: HTMLElement | null = document.getElementById("close-cart")

  if (cartIcon && cartOverlay && cartSidebar) {
    cartIcon.addEventListener("click", (): void => {
      cartOverlay.classList.remove("hidden")
      setTimeout((): void => {
        if (cartSidebar) {
          cartSidebar.classList.remove("translate-x-full")
        }
      }, 10)
      renderCartItems()
    })
  }

  if (closeCart && cartSidebar && cartOverlay) {
    closeCart.addEventListener("click", (): void => {
      cartSidebar.classList.add("translate-x-full")
      setTimeout((): void => {
        if (cartOverlay) {
          cartOverlay.classList.add("hidden")
        }
      }, 300)
    })
  }

  if (cartOverlay && cartSidebar) {
    cartOverlay.addEventListener("click", (e: Event): void => {
      if (e.target === cartOverlay) {
        cartSidebar.classList.add("translate-x-full")
        setTimeout((): void => {
          if (cartOverlay) {
            cartOverlay.classList.add("hidden")
          }
        }, 300)
      }
    })
  }

  // Newsletter form submission
  const newsletterForm: HTMLFormElement | null = document.getElementById("newsletter-form") as HTMLFormElement | null
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e: Event): void {
      e.preventDefault()
      const emailInput: HTMLInputElement | null = this.querySelector('input[type="email"]') as HTMLInputElement | null

      if (emailInput) {
        const email: string = emailInput.value
        alert(`Спасибо за подписку! Мы отправили подтверждение на ${email}`)
        this.reset()
      }
    })
  }

  // Load featured products on homepage
  const featuredProductsContainer: HTMLElement | null = document.getElementById("featured-products")
  if (featuredProductsContainer) {
    loadFeaturedProducts()
  }

  // Function to update cart count
  function updateCartCount(): void {
    const cartCountElements: NodeListOf<HTMLElement> = document.querySelectorAll(".cart-count")
    const count: number = cart.reduce((total: number, item: CartItem): number => total + item.quantity, 0)

    cartCountElements.forEach((element: HTMLElement): void => {
      element.textContent = count.toString()
    })
  }

  // Function to render cart items
  function renderCartItems(): void {
    const cartItemsContainer: HTMLElement | null = document.getElementById("cart-items")
    const emptyCartMessage: HTMLElement | null = document.getElementById("empty-cart-message")
    const cartTotalElement: HTMLElement | null = document.getElementById("cart-total")

    if (!cartItemsContainer || !emptyCartMessage || !cartTotalElement) return

    // Clear previous items
    while (cartItemsContainer.firstChild && cartItemsContainer.firstChild !== emptyCartMessage) {
      cartItemsContainer.removeChild(cartItemsContainer.firstChild)
    }

    if (cart.length === 0) {
      emptyCartMessage.classList.remove("hidden")
      cartTotalElement.textContent = "0 ₽"
      return
    }

    emptyCartMessage.classList.add("hidden")

    let total = 0

    // Add cart items
    cart.forEach((item: CartItem, index: number): void => {
      const itemTotal: number = item.price * item.quantity
      total += itemTotal

      const cartItem: HTMLDivElement = document.createElement("div")
      cartItem.className = "flex items-center py-4 border-b"
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
        <div class="ml-4 flex-grow">
          <h3 class="font-medium">${item.name}</h3>
          <div class="flex items-center mt-1">
            <button class="decrease-quantity text-gray-500 hover:text-gray-700" data-index="${index}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="mx-2">${item.quantity}</span>
            <button class="increase-quantity text-gray-500 hover:text-gray-700" data-index="${index}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        <div class="text-right">
          <p class="font-medium">${formatPrice(itemTotal)}</p>
          <button class="remove-item text-red-500 hover:text-red-700 text-sm mt-1" data-index="${index}">Удалить</button>
        </div>
      `

      cartItemsContainer.insertBefore(cartItem, emptyCartMessage)
    })

    cartTotalElement.textContent = formatPrice(total)

    // Add event listeners for cart item buttons
    document.querySelectorAll(".decrease-quantity").forEach((button: Element): void => {
      button.addEventListener("click", function (this: Element): void {
        const index: number = Number.parseInt(this.getAttribute("data-index") || "0", 10)
        if (cart[index].quantity > 1) {
          cart[index].quantity--
          localStorage.setItem("cart", JSON.stringify(cart))
          updateCartCount()
          renderCartItems()
        }
      })
    })

    document.querySelectorAll(".increase-quantity").forEach((button: Element): void => {
      button.addEventListener("click", function (this: Element): void {
        const index: number = Number.parseInt(this.getAttribute("data-index") || "0", 10)
        cart[index].quantity++
        localStorage.setItem("cart", JSON.stringify(cart))
        updateCartCount()
        renderCartItems()
      })
    })

    document.querySelectorAll(".remove-item").forEach((button: Element): void => {
      button.addEventListener("click", function (this: Element): void {
        const index: number = Number.parseInt(this.getAttribute("data-index") || "0", 10)
        cart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(cart))
        updateCartCount()
        renderCartItems()
      })
    })
  }

  // Function to load featured products
  function loadFeaturedProducts(): void {
    // Simulated product data
    const products: Product[] = [
      {
        id: 1,
        name: "Смартфон XYZ Pro",
        price: 49999,
        image: "/placeholder.svg?height=300&width=300",
        category: "electronics",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Беспроводные наушники",
        price: 12999,
        image: "/placeholder.svg?height=300&width=300",
        category: "electronics",
        rating: 4.5,
      },
      {
        id: 3,
        name: "Мужская куртка",
        price: 8999,
        image: "/placeholder.svg?height=300&width=300",
        category: "clothing",
        rating: 4.2,
      },
      {
        id: 4,
        name: "Кофемашина",
        price: 24999,
        image: "/placeholder.svg?height=300&width=300",
        category: "home",
        rating: 4.7,
      },
    ]

    const featuredProductsContainer: HTMLElement | null = document.getElementById("featured-products")
    if (!featuredProductsContainer) return

    products.forEach((product: Product): void => {
      const productCard: HTMLDivElement = document.createElement("div")
      productCard.className = "bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition duration-300"
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
          <div class="flex items-center mb-2">
            ${generateStarRating(product.rating)}
            <span class="text-gray-600 text-sm ml-1">(${Math.floor(product.rating * 10)})</span>
          </div>
          <div class="flex justify-between items-center mt-4">
            <span class="font-bold text-xl">${formatPrice(product.price)}</span>
            <button class="add-to-cart bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300" data-product='${JSON.stringify(product)}'>
              В корзину
            </button>
          </div>
        </div>
      `

      featuredProductsContainer.appendChild(productCard)
    })

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button: Element): void => {
      button.addEventListener("click", function (this: Element): void {
        const productData: string | null = this.getAttribute("data-product")
        if (productData) {
          const product: Product = JSON.parse(productData)
          addToCart(product)
        }
      })
    })
  }

  // Function to add product to cart
  const addToCart = (product: Product): void => {
    const existingItem: CartItem | undefined = cart.find((item: CartItem): boolean => item.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()

    // Show cart sidebar
    if (cartOverlay && cartSidebar) {
      cartOverlay.classList.remove("hidden")
      setTimeout((): void => {
        if (cartSidebar) {
          cartSidebar.classList.remove("translate-x-full")
        }
      }, 10)
      renderCartItems()
    }
  }

  // Make addToCart available globally
  ;(window as any).addToCart = addToCart

  // Helper function to format price
  function formatPrice(price: number): string {
    return price.toLocaleString("ru-RU") + " ₽"
  }

  // Helper function to generate star rating
  function generateStarRating(rating: number): string {
    let stars = ""
    const fullStars: number = Math.floor(rating)
    const hasHalfStar: boolean = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        `
      } else if (i === fullStars && hasHalfStar) {
        stars += `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        `
      } else {
        stars += `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        `
      }
    }

    return stars
  }
})
