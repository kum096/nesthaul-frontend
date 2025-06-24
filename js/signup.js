document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const fullName = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const phone = document.getElementById('phone');
  const userType = document.getElementById('user-type');
  const message = document.getElementById('signupMessage');
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirm = document.getElementById('toggleConfirm');

  // Password toggles
  togglePassword.addEventListener('click', () => {
    const isVisible = password.type === 'text';
    password.type = isVisible ? 'password' : 'text';
    togglePassword.src = isVisible ? 'imagesicons/eye.svg' : 'imagesicons/eye-off.svg';
  });

  toggleConfirm.addEventListener('click', () => {
    const isVisible = confirmPassword.type === 'text';
    confirmPassword.type = isVisible ? 'password' : 'text';
    toggleConfirm.src = isVisible ? 'imagesicons/eye.svg' : 'imagesicons/eye-off.svg';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.style.color = 'red';
    message.textContent = '';

    if (!fullName.value || !email.value || !password.value || !confirmPassword.value || !phone.value || !userType.value) {
      message.textContent = 'Please fill in all fields.';
      return;
    }

    if (!validateEmail(email.value)) {
      message.textContent = 'Invalid email format.';
      return;
    }

    if (password.value.length < 6) {
      message.textContent = 'Password must be at least 6 characters.';
      return;
    }

    if (password.value !== confirmPassword.value) {
      message.textContent = 'Passwords do not match.';
      return;
    }

    try {
      const response = await fetch("https://nesthaul-backend.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: fullName.value,
          email: email.value,
          password: password.value,
          phone: phone.value,
          userType: userType.value
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.style.color = "green";
        message.textContent = "Account created successfully! Please check your email to verify.";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        message.style.color = "red";
        message.textContent = data.error || "Signup failed. Try again.";
      }
    } catch (err) {
      console.error("Signup error:", err);
      message.style.color = "red";
      message.textContent = "Something went wrong. Please try again later.";
    }
  });

  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
});
