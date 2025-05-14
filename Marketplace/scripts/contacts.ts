document.addEventListener("DOMContentLoaded", (): void => {
  // Contact form submission
  const contactForm: HTMLFormElement | null = document.getElementById("contact-form") as HTMLFormElement | null

  if (contactForm) {
    contactForm.addEventListener("submit", function (e: Event): void {
      e.preventDefault()

      // Get form values
      const nameInput: HTMLInputElement | null = document.getElementById("name") as HTMLInputElement | null
      const emailInput: HTMLInputElement | null = document.getElementById("email") as HTMLInputElement | null
      const subjectSelect: HTMLSelectElement | null = document.getElementById("subject") as HTMLSelectElement | null
      const messageTextarea: HTMLTextAreaElement | null = document.getElementById(
        "message",
      ) as HTMLTextAreaElement | null

      if (!nameInput || !emailInput || !subjectSelect || !messageTextarea) {
        console.error("Form elements not found")
        return
      }

      const name: string = nameInput.value
      const email: string = emailInput.value
      const subject: string = subjectSelect.value
      const message: string = messageTextarea.value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Пожалуйста, заполните все поля формы")
        return
      }

      // Simulate form submission
      alert(`Спасибо за ваше сообщение, ${name}! Мы ответим вам в ближайшее время.`)
      this.reset()
    })
  }

  // FAQ accordion functionality
  const faqQuestions: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".faq-question")

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question: HTMLButtonElement): void => {
      question.addEventListener("click", function (): void {
        const targetId: string | null = this.getAttribute("data-target")

        if (!targetId) {
          console.error("Target ID not found")
          return
        }

        const answer: HTMLElement | null = document.getElementById(targetId)
        const arrow: SVGElement | null = this.querySelector("svg")

        if (!answer || !arrow) {
          console.error("Answer or arrow element not found")
          return
        }

        // Toggle answer visibility
        if (answer.classList.contains("hidden")) {
          answer.classList.remove("hidden")
          arrow.classList.add("rotate-180")
        } else {
          answer.classList.add("hidden")
          arrow.classList.remove("rotate-180")
        }
      })
    })
  }
})
