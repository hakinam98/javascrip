"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const btnLogout = document.getElementById("btn-logout");
const welcomeMes = document.getElementById("welcome-message");

//Lấy dữ liệu
const Key_cur = "currentUserArray";
const currentUserArr = JSON.parse(getFromStorage(Key_cur)) ?? [];
const Key_Reg = "userArray";
const userArr = JSON.parse(getFromStorage(Key_Reg)) ?? [];

//Hiển thị đăng nhập
const display = function () {
  //Chưa đăng nhập
  if (!currentUserArr.username) {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
    //Đã đăng nhập
  } else {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMes.innerHTML = `welcome ${currentUserArr.username}`;
  }
};
display();

//Chức năng Logout
btnLogout.addEventListener("click", function () {
  alert("Are you sure!");
  localStorage.removeItem("currentUserArray");
  display();

  //Chuyển trang
  window.location.reload(true);
  window.location.href = "pages/login.html";
});
