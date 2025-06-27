// Load navbar from external file
fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;

    // ✅ Everything below runs AFTER the navbar is loaded

    // 1. Highlight current page
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(link => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});


    // 2. Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // 3. Close menu on link click (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  })
  .catch(error => {
    console.error('Failed to load navbar:', error);
  });





   document.addEventListener('DOMContentLoaded', () => {
    // Wait for Leaflet JS to load
    const initMap = () => {
      if (!window.L) {
        setTimeout(initMap, 100);
        return;
      }

      // Coordinates for your office (Princeton, NJ)
      const lat = 40.3573;
      const lng = -74.6672;

      // Initialize map
      const map = L.map('map').setView([lat, lng], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add marker
      L.marker([lat, lng]).addTo(map)
        .bindPopup('NestHaul Office')
        .openPopup();
    };

    initMap();
  });


  //contact form workings

   const form = document.getElementById('contactForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();  // prevent default form submission

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('https://nesthaul-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Message sent successfully! We will get back to you soon.');
        form.reset();
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  });





