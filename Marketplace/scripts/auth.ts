interface UserData {
  isLoggedIn: boolean
  email: string
  name?: string
}

document.addEventListener("DOMContentLoaded", (): void => {
  // Login form submission
  const loginForm: HTMLFormElement | null = document.getElementById("login-form") as HTMLFormElement | null

  if (loginForm) {
    loginForm.addEventListener("submit", (e: Event): void => {
      e.preventDefault()

      // Get form values
      const emailInput: HTMLInputElement | null = document.getElementById("email") as HTMLInputElement | null
      const passwordInput: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement | null

      if (!emailInput || !passwordInput) {
        console.error("Form elements not found")
        return
      }

      const email: string = emailInput.value
      const password: string = passwordInput.value

      // Simple validation
      if (!email || !password) {
        alert("Пожалуйста, заполните все поля")
        return
      }

      // Simulate login
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)

      // Redirect to account page or homepage
      window.location.href = "index.html"
    })
  }

  // Register form submission
  const registerForm: HTMLFormElement | null = document.getElementById("register-form") as HTMLFormElement | null

  if (registerForm) {
    registerForm.addEventListener("submit", (e: Event): void => {
      e.preventDefault()

      // Get form values
      const firstNameInput: HTMLInputElement | null = document.getElementById("first-name") as HTMLInputElement | null
      const lastNameInput: HTMLInputElement | null = document.getElementById("last-name") as HTMLInputElement | null
      const emailInput: HTMLInputElement | null = document.getElementById("email") as HTMLInputElement | null
      const phoneInput: HTMLInputElement | null = document.getElementById("phone") as HTMLInputElement | null
      const passwordInput: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement | null
      const confirmPasswordInput: HTMLInputElement | null = document.getElementById(
        "confirm-password",
      ) as HTMLInputElement | null

      if (!firstNameInput || !lastNameInput || !emailInput || !phoneInput || !passwordInput || !confirmPasswordInput) {
        console.error("Form elements not found")
        return
      }

      const firstName: string = firstNameInput.value
      const lastName: string = lastNameInput.value
      const email: string = emailInput.value
      const phone: string = phoneInput.value
      const password: string = passwordInput.value
      const confirmPassword: string = confirmPasswordInput.value

      // Simple validation
      if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        alert("Пожалуйста, заполните все обязательные поля")
        return
      }

      if (password !== confirmPassword) {
        alert("Пароли не совпадают")
        return
      }

      // Simulate registration
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", `${firstName} ${lastName}`)

      // Redirect to account page or homepage
      window.location.href = "index.html"
    })
  }

  // Check if user is logged in
  const isLoggedIn: boolean = localStorage.getItem("isLoggedIn") === "true"
  const userEmail: string | null = localStorage.getItem("userEmail")

  // Update header login link if user is logged in
  if (isLoggedIn && userEmail) {
    const loginLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a[href='login.html']")

    loginLinks.forEach((link: HTMLAnchorElement): void => {
      link.textContent = userEmail
      link.href = "account.html"
    })
  }
})
