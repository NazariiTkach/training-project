document.addEventListener("DOMContentLoaded", function () {
    const submenuIcon = document.querySelector(".submenu-icon");
    const menuItem = submenuIcon.closest(".pages__item");

    submenuIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Щоб уникнути небажаного поширення
      menuItem.classList.toggle("open");
    });
  });