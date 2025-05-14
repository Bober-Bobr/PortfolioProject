// Функция для переключения мобильного меню
function setupMobileMenu(): void {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (!mobileMenuButton || !mobileMenu) return

  mobileMenuButton.addEventListener("click", () => {
    // Переключаем класс hidden для показа/скрытия меню
    mobileMenu.classList.toggle("hidden")
  })
}

// Функция для плавной прокрутки к якорям
function setupSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (!targetId) return

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      window.scrollTo({
        top: targetElement.offsetTop - 80, // Отступ для учета фиксированной навигации
        behavior: "smooth",
      })

      // Закрываем мобильное меню при клике на ссылку
      const mobileMenu = document.getElementById("mobile-menu")
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden")
      }
    })
  })
}

// Функция для валидации формы
function setupFormValidation(): void {
  const contactForm = document.querySelector("form")
  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const nameInput = document.getElementById("name") as HTMLInputElement
    const emailInput = document.getElementById("email") as HTMLInputElement
    const messageInput = document.getElementById("message") as HTMLTextAreaElement

    let isValid = true

    // Простая валидация
    if (!nameInput.value.trim()) {
      highlightInvalidField(nameInput)
      isValid = false
    } else {
      resetField(nameInput)
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      highlightInvalidField(emailInput)
      isValid = false
    } else {
      resetField(emailInput)
    }

    if (!messageInput.value.trim()) {
      highlightInvalidField(messageInput)
      isValid = false
    } else {
      resetField(messageInput)
    }

    if (isValid) {
      // Здесь можно добавить отправку формы на сервер
      alert("Сообщение отправлено!")
      contactForm.reset()
    }
  })
}

// Вспомогательная функция для проверки email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Функция для подсветки невалидного поля
function highlightInvalidField(field: HTMLElement): void {
  field.classList.add("border-red-500", "ring-red-500")
  field.classList.remove("border-gray-300")
}

// Функция для сброса стилей поля
function resetField(field: HTMLElement): void {
  field.classList.remove("border-red-500", "ring-red-500")
  field.classList.add("border-gray-300")
}

// Инициализация всех функций при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu()
  setupSmoothScroll()
  setupFormValidation()
})
