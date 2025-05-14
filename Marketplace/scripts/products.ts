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
  // Products data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Смартфон XYZ Pro",
      price: 49999,
      image: "/placeholder.svg?height=300&width=300",
      category: "electronics",
      rating: 4.8,
      description: 'Мощный смартфон с 6.7" AMOLED дисплеем, 8 ГБ оперативной памяти и 256 ГБ встроенной памяти.',
    },
    {
      id: 2,
      name: "Беспроводные наушники",
      price: 12999,
      image: "/placeholder.svg?height=300&width=300",
      category: "electronics",
      rating: 4.5,
      description: "Беспроводные наушники с активным шумоподавлением и 24 часами автономной работы.",
    },
    {
      id: 3,
      name: "Мужская куртка",
      price: 8999,
      image: "/placeholder.svg?height=300&width=300",
      category: "clothing",
      rating: 4.2,
      description: "Стильная мужская куртка из водонепроницаемого материала с утеплителем.",
    },
    {
      id: 4,
      name: "Кофемашина",
      price: 24999,
      image: "/placeholder.svg?height=300&width=300",
      category: "home",
      rating: 4.7,
      description: "Автоматическая кофемашина с возможностью приготовления различных видов кофе.",
    },
    {
      id: 5,
      name: "Ноутбук UltraBook",
      price: 89999,
      image: "/placeholder.svg?height=300&width=300",
      category: "electronics",
      rating: 4.9,
      description: "Тонкий и легкий ноутбук с процессором последнего поколения и 16 ГБ оперативной памяти.",
    },
    {
      id: 6,
      name: "Женское платье",
      price: 5999,
      image: "/placeholder.svg?height=300&width=300",
      category: "clothing",
      rating: 4.4,
      description: "Элегантное женское платье из натуральных материалов.",
    },
    {
      id: 7,
      name: "Умная колонка",
      price: 7999,
      image: "/placeholder.svg?height=300&width=300",
      category: "electronics",
      rating: 4.3,
      description: "Умная колонка с голосовым помощником и качественным звуком.",
    },
    {
      id: 8,
      name: "Набор посуды",
      price: 15999,
      image: "/placeholder.svg?height=300&width=300",
      category: "home",
      rating: 4.6,
      description: "Набор из 12 предметов посуды из нержавеющей стали.",
    },
    {
      id: 9,
      name: "Детская игрушка",
      price: 2999,
      image: "/placeholder.svg?height=300&width=300",
      category: "toys",
      rating: 4.5,
      description: "Развивающая игрушка для детей от 3 лет.",
    },
    {
      id: 10,
      name: "Планшет TabPro",
      price: 34999,
      image: "/placeholder.svg?height=300&width=300",
      category: "electronics",
      rating: 4.7,
      description: '10.5" планшет с высоким разрешением экрана и мощным процессором.',
    },
    {
      id: 11,
      name: "Мужские джинсы",
      price: 4999,
      image: "/placeholder.svg?height=300&width=300",
      category: "clothing",
      rating: 4.1,
      description: "Классические мужские джинсы прямого кроя.",
    },
    {
      id: 12,
      name: "Настольная лампа",
      price: 3499,
      image: "/placeholder.svg?height=300&width=300",
      category: "home",
      rating: 4.4,
      description: "Современная настольная лампа с регулировкой яркости.",
    },
  ]

  const productsGrid: HTMLElement | null = document.getElementById("products-grid")
  const productsCount: HTMLElement | null = document.getElementById("products-count")
  const loadMoreButton: HTMLElement | null = document.getElementById("load-more")
  const applyFiltersButton: HTMLElement | null = document.getElementById("apply-filters")
  const sortSelect: HTMLSelectElement | null = document.getElementById("sort") as HTMLSelectElement | null
  const quickViewModal: HTMLElement | null = document.getElementById("quick-view-modal")
  const quickViewContent: HTMLElement | null = document.getElementById("quick-view-content")

  let currentProducts: Product[] = [...allProducts]
  let displayedProducts = 6

  // Initialize products page
  if (productsGrid) {
    renderProducts()
    setupEventListeners()
  }

  function renderProducts(): void {
    if (!productsGrid) return

    // Clear loading message
    productsGrid.innerHTML = ""

    // Update products count
    if (productsCount) {
      productsCount.textContent = currentProducts.length.toString()
    }

    // Display products
    const productsToShow: Product[] = currentProducts.slice(0, displayedProducts)

    productsToShow.forEach((product: Product): void => {
      const productCard: HTMLDivElement = document.createElement("div")
      productCard.className = "bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition duration-300"
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover cursor-pointer product-image" data-id="${product.id}">
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2 cursor-pointer product-name" data-id="${product.id}">${product.name}</h3>
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

      productsGrid.appendChild(productCard)
    })

    // Show/hide load more button
    if (loadMoreButton) {
      if (displayedProducts >= currentProducts.length) {
        loadMoreButton.classList.add("hidden")
      } else {
        loadMoreButton.classList.remove("hidden")
      }
    }

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button: Element): void => {
      button.addEventListener("click", function (this: Element): void {
        const productData: string | null = this.getAttribute("data-product")
        if (productData) {
          const product: Product = JSON.parse(productData)
          ;(window as any).addToCart(product)
        }
      })
    })

    // Add event listeners for product quick view
    document.querySelectorAll(".product-image, .product-name").forEach((element: Element): void => {
      element.addEventListener("click", function (this: Element): void {
        const productId: string | null = this.getAttribute("data-id")
        if (productId) {
          openQuickView(Number.parseInt(productId, 10))
        }
      })
    })
  }

  function setupEventListeners(): void {
    // Load more button
    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", (): void => {
        displayedProducts += 6
        renderProducts()
      })
    }

    // Apply filters button
    if (applyFiltersButton) {
      applyFiltersButton.addEventListener("click", (): void => {
        applyFilters()
      })
    }

    // Sort select
    if (sortSelect) {
      sortSelect.addEventListener("change", function (this: HTMLSelectElement): void {
        sortProducts(this.value)
      })
    }

    // Close quick view modal
    if (quickViewModal) {
      quickViewModal.addEventListener("click", (e: Event): void => {
        if (e.target === quickViewModal) {
          quickViewModal.classList.add("hidden")
        }
      })
    }
  }

  function applyFilters(): void {
    // Get selected categories
    const selectedCategories: string[] = []
    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox: Element): void => {
      const value: string | null = (checkbox as HTMLInputElement).value
      if (value && value !== "all") {
        selectedCategories.push(value)
      }
    })

    // Get price range
    const minPriceInput: HTMLInputElement | null = document.getElementById("price-min") as HTMLInputElement | null
    const maxPriceInput: HTMLInputElement | null = document.getElementById("price-max") as HTMLInputElement | null

    const minPrice: number = minPriceInput ? Number.parseInt(minPriceInput.value, 10) || 0 : 0
    const maxPrice: number = maxPriceInput
      ? Number.parseInt(maxPriceInput.value, 10) || Number.POSITIVE_INFINITY
      : Number.POSITIVE_INFINITY

    // Get minimum rating
    let minRating = 0
    document
      .querySelectorAll('input[value="4"]:checked, input[value="3"]:checked')
      .forEach((checkbox: Element): void => {
        const value: string | null = (checkbox as HTMLInputElement).value
        if (value) {
          minRating = Math.max(minRating, Number.parseInt(value, 10))
        }
      })

    // Filter products
    currentProducts = allProducts.filter((product: Product): boolean => {
      // Filter by category
      const categoryMatch: boolean = selectedCategories.length === 0 || selectedCategories.includes(product.category)

      // Filter by price
      const priceMatch: boolean = product.price >= minPrice && product.price <= maxPrice

      // Filter by rating
      const ratingMatch: boolean = product.rating >= minRating

      return categoryMatch && priceMatch && ratingMatch
    })

    // Reset displayed products count
    displayedProducts = 6

    // Apply current sort
    if (sortSelect) {
      sortProducts(sortSelect.value)
    } else {
      renderProducts()
    }
  }

  function sortProducts(sortBy: string): void {
    switch (sortBy) {
      case "price-asc":
        currentProducts.sort((a: Product, b: Product): number => a.price - b.price)
        break
      case "price-desc":
        currentProducts.sort((a: Product, b: Product): number => b.price - a.price)
        break
      case "rating":
        currentProducts.sort((a: Product, b: Product): number => b.rating - a.rating)
        break
      default: // popular
        // No sorting, keep original order
        break
    }

    renderProducts()
  }

  function openQuickView(productId: number): void {
    const product: Product | undefined = allProducts.find((p: Product): boolean => p.id === productId)

    if (!product || !quickViewModal || !quickViewContent) return

    quickViewContent.innerHTML = `
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/2">
          <img src="${product.image}" alt="${product.name}" class="w-full h-auto rounded-lg">
        </div>
        <div class="md:w-1/2">
          <button id="close-quick-view" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 class="text-2xl font-bold mb-4">${product.name}</h2>
          <div class="flex items-center mb-4">
            ${generateStarRating(product.rating)}
            <span class="text-gray-600 text-sm ml-1">(${Math.floor(product.rating * 10)} отзывов)</span>
          </div>
          <p class="text-gray-600 mb-6">${product.description}</p>
          <div class="text-3xl font-bold mb-6">${formatPrice(product.price)}</div>
          <div class="flex items-center mb-6">
            <div class="mr-4">
              <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Количество</label>
              <div class="flex items-center">
                <button class="decrease-quantity text-gray-500 hover:text-gray-700 border rounded-l px-3 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <input type="number" id="quantity" class="w-12 text-center border-t border-b py-1" value="1" min="1">
                <button class="increase-quantity text-gray-500 hover:text-gray-700 border rounded-r px-3 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="flex space-x-4">
            <button class="quick-view-add-to-cart bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex-grow" data-product='${JSON.stringify(product)}'>
              Добавить в корзину
            </button>
            <button class="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `

    quickViewModal.classList.remove("hidden")

    // Close button event
    const closeButton: HTMLElement | null = document.getElementById("close-quick-view")
    if (closeButton) {
      closeButton.addEventListener("click", (): void => {
        if (quickViewModal) {
          quickViewModal.classList.add("hidden")
        }
      })
    }

    // Quantity buttons
    const quantityInput: HTMLInputElement | null = document.getElementById("quantity") as HTMLInputElement | null
    const decreaseButton: HTMLElement | null = document.querySelector(".decrease-quantity")
    const increaseButton: HTMLElement | null = document.querySelector(".increase-quantity")

    if (decreaseButton && quantityInput) {
      decreaseButton.addEventListener("click", (): void => {
        if (Number.parseInt(quantityInput.value, 10) > 1) {
          quantityInput.value = (Number.parseInt(quantityInput.value, 10) - 1).toString()
        }
      })
    }

    if (increaseButton && quantityInput) {
      increaseButton.addEventListener("click", (): void => {
        quantityInput.value = (Number.parseInt(quantityInput.value, 10) + 1).toString()
      })
    }

    // Add to cart button
    const addToCartButton: HTMLElement | null = document.querySelector(".quick-view-add-to-cart")
    if (addToCartButton && quantityInput) {
      addToCartButton.addEventListener("click", function (this: HTMLElement): void {
        const productData: string | null = this.getAttribute("data-product")
        if (productData) {
          const product: Product = JSON.parse(productData)
          const quantity: number = Number.parseInt(quantityInput.value, 10)

          // Add to cart multiple times based on quantity
          for (let i = 0; i < quantity; i++) {
            ;(window as any).addToCart(product)
          }

          // Close modal
          if (quickViewModal) {
            quickViewModal.classList.add("hidden")
          }
        }
      })
    }
  }

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
