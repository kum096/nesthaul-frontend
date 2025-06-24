document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const priceFilter = document.getElementById("priceFilter");
  const bedroomFilter = document.getElementById("bedroomFilter");
  const listings = document.querySelectorAll(".listing-card");

  function applyFilters() {
    const searchText = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedPrice = priceFilter.value;
    const selectedBedrooms = parseInt(bedroomFilter.value) || 0;

    listings.forEach(card => {
      const location = card.dataset.location.toLowerCase();
      const type = card.dataset.type;
      const price = parseInt(card.dataset.price);
      const bedrooms = parseInt(card.dataset.bedrooms);

      let matchesSearch = location.includes(searchText);
      let matchesType = !selectedType || type === selectedType;
      let matchesBedrooms = bedrooms >= selectedBedrooms;

      let matchesPrice = true;
      if (selectedPrice === "under-50k") {
        matchesPrice = price < 50000;
      } else if (selectedPrice === "50k-100k") {
        matchesPrice = price >= 50000 && price <= 100000;
      } else if (selectedPrice === "100k+") {
        matchesPrice = price > 100000;
      }

      const isVisible = matchesSearch && matchesType && matchesPrice && matchesBedrooms;
      card.style.display = isVisible ? "block" : "none";
    });
  }

  // Attach filter listeners
  searchInput.addEventListener("input", applyFilters);
  typeFilter.addEventListener("change", applyFilters);
  priceFilter.addEventListener("change", applyFilters);
  bedroomFilter.addEventListener("change", applyFilters);

  // Reset Filters
  document.getElementById("resetFilters").addEventListener("click", () => {
    document.querySelectorAll(".filter-bar input, .filter-bar select").forEach(el => {
      el.value = "";
    });
    document.querySelectorAll(".listing-card").forEach(card => {
      card.style.display = "block";
    });
  });

  // View Details Modal
  document.querySelectorAll(".btn-view").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const card = button.closest(".listing-card");
      const title = card.querySelector("h3").innerText;
      const location = card.querySelector("p").innerText;
      const price = card.querySelector(".price").innerText;
      const image = card.querySelector("img").src;

      document.getElementById("modalBody").innerHTML = `
        <img src="${image}" style="width:100%; max-height:300px; object-fit:cover;" />
        <h2>${title}</h2>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Price:</strong> ${price}</p>
        <a href="contact.html" id="contactBtn">Contact Seller</a>
      `;

      document.getElementById("detailsModal").style.display = "flex";

      const contactBtn = document.getElementById("contactBtn");
      contactBtn.style.marginTop = "1rem";
      contactBtn.style.display = "inline-block";
      contactBtn.style.backgroundColor = "#2196f3";
      contactBtn.style.color = "white";
      contactBtn.style.padding = "0.5rem 1.2rem";
      contactBtn.style.border = "none";
      contactBtn.style.borderRadius = "4px";
      contactBtn.style.textDecoration = "none";
      contactBtn.style.fontWeight = "bold";
    });
  });

  // Close Modal
  const closeModal = document.getElementById("closeModal");
  const modal = document.getElementById("detailsModal");

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});
