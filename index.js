document.addEventListener("DOMContentLoaded", function () {
    const submenuIcon = document.querySelector(".submenu-icon");
    const menuItem = submenuIcon.closest(".pages__item");

    submenuIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Щоб уникнути небажаного поширення
      menuItem.classList.toggle("open");

      // зміна іконки при відкритті/закритті submenu

      if (menuItem.classList.contains("open")) {
        submenuIcon.textContent = "keyboard_arrow_up";
      } else {
        submenuIcon.textContent = "keyboard_arrow_down";
      }
    });
});
  
  
document.addEventListener("DOMContentLoaded", () => {
    // Вибираємо всі li у sidebar, які можуть бути активними
    const menuItems = document.querySelectorAll(
      ".pages__item, .ui-components__item, .home-item"
    );
  
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Зняти active з усіх
        menuItems.forEach((i) => i.classList.remove("active"));
        // Додати active на клікнутий
        item.classList.add("active");
      });
    });
});
  

document.addEventListener("DOMContentLoaded", () => {
  const toggleIcon = document.querySelector(".menu__icon");
  toggleIcon.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-hidden");
  });
});