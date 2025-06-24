document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const message = document.getElementById('loginMessage');
  const togglePassword = document.getElementById('togglePassword');

  // 👁️ Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const isPasswordVisible = passwordInput.type === 'text';
      passwordInput.type = isPasswordVisible ? 'password' : 'text';
      togglePassword.src = isPasswordVisible 
        ? 'imagesicons/eye.svg' 
        : 'imagesicons/eye-off.svg';
    });
  }

  // 🔐 Login form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    message.textContent = '';
    message.style.color = 'red';

    if (!email || !password) {
      message.textContent = 'Please fill in both email and password.';
      return;
    }

    if (!validateEmail(email)) {
      message.textContent = 'Invalid email format.';
      return;
    }

    if (password.length < 6) {
      message.textContent = 'Password must be at least 6 characters.';
      return;
    }

    try {
      const response = await fetch("https://nesthaul-backend.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));

        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";

        setTimeout(() => {
          window.location.href = "profile.html";
        }, 1000);
      } else {
        message.style.color = "red";
        message.textContent = data.error || "Invalid login credentials.";
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.style.color = "red";
      message.textContent = "Something went wrong. Please try again later.";
    }
  });

  function validateEmail(email) {
    const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return pattern.test(email);
  }
});
