document.addEventListener("DOMContentLoaded", function () {
    const submenuIcon = document.querySelector(".submenu-icon");
    const menuItem = submenuIcon.closest(".pages__item");

    submenuIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Щоб уникнути небажаного поширення
      menuItem.classList.toggle("open");
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