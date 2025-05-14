document.addEventListener("DOMContentLoaded", (): void => {
  // Check if user is logged in
  const isLoggedIn: boolean = localStorage.getItem("isLoggedIn") === "true"

  // Redirect to login page if not logged in
  if (!isLoggedIn) {
    window.location.href = "login.html?redirect=orders.html"
  }

  // Helper function to find closest parent with a class
  const findClosestParent = (element: HTMLElement, selector: string): HTMLElement | null => {
    let currentElement: HTMLElement | null = element

    while (currentElement && !currentElement.matches(selector)) {
      currentElement = currentElement.parentElement
    }

    return currentElement
  }

  // Order tracking functionality
  const trackOrderButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a[href='#']")

  trackOrderButtons.forEach((button: HTMLAnchorElement): void => {
    if (button.textContent?.includes("Отследить заказ")) {
      button.addEventListener("click", function (e: Event): void {
        e.preventDefault()

        // Get order number from the closest order container
        const orderContainer: HTMLElement | null = findClosestParent(this, ".bg-white")

        if (!orderContainer) {
          console.error("Order container not found")
          return
        }

        const orderNumberElement: HTMLHeadingElement | null = orderContainer.querySelector("h2")

        if (!orderNumberElement) {
          console.error("Order number element not found")
          return
        }

        const orderNumber: string = orderNumberElement.textContent?.replace("Заказ #", "") || ""

        // Simulate order tracking
        alert(`Отслеживание заказа #${orderNumber}. Ваш заказ находится в пути и будет доставлен в ближайшее время.`)
      })
    }
  })

  // Repeat order functionality
  const repeatOrderButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a[href='#']")

  repeatOrderButtons.forEach((button: HTMLAnchorElement): void => {
    if (button.textContent?.includes("Повторить заказ")) {
      button.addEventListener("click", function (e: Event): void {
        e.preventDefault()

        // Get order number from the closest order container
        const orderContainer: HTMLElement | null = findClosestParent(this, ".bg-white")

        if (!orderContainer) {
          console.error("Order container not found")
          return
        }

        const orderNumberElement: HTMLHeadingElement | null = orderContainer.querySelector("h2")

        if (!orderNumberElement) {
          console.error("Order number element not found")
          return
        }

        const orderNumber: string = orderNumberElement.textContent?.replace("Заказ #", "") || ""

        // Simulate adding items to cart
        alert(`Товары из заказа #${orderNumber} добавлены в корзину`)

        // Update cart count
        const cartCountElements: NodeListOf<HTMLElement> = document.querySelectorAll(".cart-count")

        cartCountElements.forEach((element: HTMLElement): void => {
          element.textContent = "2"
        })
      })
    }
  })

  // Leave review functionality
  const reviewButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a[href='#']")

  reviewButtons.forEach((button: HTMLAnchorElement): void => {
    if (button.textContent?.includes("Оставить отзыв")) {
      button.addEventListener("click", function (e: Event): void {
        e.preventDefault()

        // Get order number from the closest order container
        const orderContainer: HTMLElement | null = findClosestParent(this, ".bg-white")

        if (!orderContainer) {
          console.error("Order container not found")
          return
        }

        const orderNumberElement: HTMLHeadingElement | null = orderContainer.querySelector("h2")

        if (!orderNumberElement) {
          console.error("Order number element not found")
          return
        }

        const orderNumber: string = orderNumberElement.textContent?.replace("Заказ #", "") || ""

        // Simulate review form
        alert(`Форма отзыва для заказа #${orderNumber}. Эта функция находится в разработке.`)
      })
    }
  })
})
