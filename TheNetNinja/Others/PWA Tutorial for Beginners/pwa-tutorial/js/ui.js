document.addEventListener("DOMContentLoaded", () => {
  // Nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, {edge: "right"});

  // Add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, {edge: "left"});
})