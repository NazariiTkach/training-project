document.addEventListener("DOMContentLoaded", () => {
  setupAuthSubmenuToggle();
  setupMenuActiveState();
  setupSidebarToggle();
  setupModalControls();
  setupProductForm();
});

function setupAuthSubmenuToggle() {
  const authItem = document.querySelector(".pages__item.auth-item");
  if (!authItem) return;

  const submenuIcon = authItem.querySelector(".submenu-icon");
  const row = authItem.querySelector(".pages__row");

  row.addEventListener("click", (e) => {
    e.stopPropagation();
    authItem.classList.toggle("open");
    submenuIcon.textContent = authItem.classList.contains("open")
      ? "keyboard_arrow_up"
      : "keyboard_arrow_down";
  });
}

function setupMenuActiveState() {
  const menuItems = document.querySelectorAll(
    ".pages__item, .ui-components__item, .home-item"
  );

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

function setupSidebarToggle() {
  const toggleIcon = document.querySelector(".menu__icon");
  if (!toggleIcon) return;

  toggleIcon.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-hidden");
  });
}

function setupModalControls() {
  const openBtn = document.querySelector(".add-products");
  const closeBtn = document.getElementById("close-modal");
  const modal = document.getElementById("product-modal");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }
}

function setupProductForm() {
  const form = document.getElementById("product-form");
  const modal = document.getElementById("product-modal");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newProduct = {
      name: form.name.value.trim(),
      price: form.price.value.trim(),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to add product");

      form.reset();
      modal.classList.add("hidden");
      await loadProducts();
    } catch (err) {
      console.error("Create product error:", err);
    }
  });
}



