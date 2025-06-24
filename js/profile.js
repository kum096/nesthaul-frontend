// Logout logic
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  alert("Logged out.");
  window.location.href = "login.html";
});

// Load profile data
window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must log in first!");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("https://nesthaul-backend.onrender.com", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok && data.user) {
      // Update UI with user data
      const user = data.user;
      document.getElementById("username").textContent = user.name;

      // Optional: Update other profile info if elements exist
      if (document.getElementById("userEmail")) {
        document.getElementById("userEmail").textContent = user.email;
      }
      if (document.getElementById("userPhone")) {
        document.getElementById("userPhone").textContent = user.phone;
      }
    } else {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
  } catch (err) {
    console.error("Profile load error:", err);
    alert("Error loading profile.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
});
