"use strict";

const btnRegister = document.getElementById("btn-submit");
const inputFistname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPass = document.getElementById("input-password");
const inputPassConfirm = document.getElementById("input-password-confirm");

//Tạo Class User
class User {
  constructor(firstname, lastname, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
  }
}
//Lấy dữ liệu từ storage
const KEY_Reg = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY_Reg)) || [];

btnRegister.addEventListener("click", function () {
  const data = {
    firstname: inputFistname.value.trim(),
    lastname: inputLastname.value.trim(),
    username: inputUsername.value.trim(),
    password: inputPass.value.trim(),
    passConfirm: inputPassConfirm.value.trim(),
  };

  //lấy dữ liệu từ form
  const valiedateData = function () {
    //Username đã tồn tại
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].username === data.username) {
        alert("Username existed!");
        return false;
      }
    }
    //không nhập Firstname
    if (data.firstname === "") alert("Please input Firstname!");
    //không nhập Lastname
    else if (data.lastname === "") alert("Please input Lastname!");
    //Không nhập Username
    else if (data.username === "") alert("Please input Username!");
    //Không nhập Password
    else if (data.password === "") alert("Please input Password!");
    //Không nhập Password Confirm
    else if (data.passConfirm === "") alert("Please input Confirm Password!");
    //Password và Password Confirm không giống nhau
    else if (data.password !== data.passConfirm)
      alert("Password and Comfirm Password not match!");
    //Password ít hơn 8 ký tự
    else if (data.password.length < 8)
      alert("password must be at least 8 characters!");
    else return true;
  };
  const clearform = function () {
    inputFistname.value = "";
    inputLastname.value = "";
    inputUsername.value = "";
    inputPass.value = "";
    inputPassConfirm.value = "";
  };
  const validate = valiedateData(data);
  if (validate) {
    const dataUser = new User(
      inputFistname.value,
      inputLastname.value,
      inputUsername.value,
      inputPass.value
    );
    console.log(dataUser);
    userArr.push(dataUser);
    saveToStorage(KEY_Reg, JSON.stringify(userArr));
    clearform(data);
    alert("Register succesfully!");
    window.location.href = "../pages/login.html";
  }
});
