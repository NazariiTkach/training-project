document.addEventListener("DOMContentLoaded", () => {
  // Handle submenu toggle (Auth)
  const authItem = document.querySelector(".pages__item.auth-item");
  if (authItem) {
    const submenuIcon = authItem.querySelector(".submenu-icon");
    const row = authItem.querySelector(".pages__row");

    row.addEventListener("click", (event) => {
      event.stopPropagation();
      authItem.classList.toggle("open");
      submenuIcon.textContent = authItem.classList.contains("open")
        ? "keyboard_arrow_up"
        : "keyboard_arrow_down";
    });
  }

  // Handle active state for menu items
  const menuItems = document.querySelectorAll(
    ".pages__item, .ui-components__item, .home-item"
  );
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Handle sidebar toggle
  const toggleIcon = document.querySelector(".menu__icon");
  if (toggleIcon) {
    toggleIcon.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-hidden");
    });
  }
});
