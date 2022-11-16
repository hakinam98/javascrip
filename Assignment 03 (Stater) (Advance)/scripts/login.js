"use strict";
const btnLogin = document.getElementById("btn-submit");
const inputUsername = document.getElementById("input-username");
const inputPass = document.getElementById("input-password");

//lấy dữ liệu user từ storage
const KEY_login = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY_login)) || [];
//Dữ liệu người dùng đăng nhập
const Key_cur = "currentUserArray";
const currentUserArr = JSON.parse(getFromStorage(Key_cur)) ?? [];
//Khai báo user
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

btnLogin.addEventListener("click", function () {
  const currentUserArr = {
    username: inputUsername.value,
    password: inputPass.value,
  };

  //Hàm validate
  const validateCur = function () {
    //Không nhập username
    if (currentUserArr.username === "") alert("Please input Username!");
    //Không nhập password
    else if (currentUserArr.password === "") alert("Please input password!");
    //User không tồn tại
    else if (!userArr.find((user) => user.username === currentUserArr.username))
      alert("This username not exist!");
    //Password không đúng
    else if (
      !userArr.find(
        (user) =>
          user.username === currentUserArr.username &&
          user.password === currentUserArr.password
      )
    )
      alert("Wrong password!");
    else return true;
  };

  const validate = validateCur(currentUserArr);

  if (validate) {
    //Đăng nhập thành công
    alert("loggin in successfully");
    saveToStorage(Key_cur, JSON.stringify(currentUserArr));
    window.location.href = "../index.html";
  }
});
