const homeBtnEl = document.getElementById("home-btn");

homeBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (location.pathname === "/") {
    return;
  } else {
    document.location.replace("/");
  }
});
