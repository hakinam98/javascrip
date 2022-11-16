"use strict";
//Lưu dữ liệu dưới LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
//Lấy dữ liệu
function getFromStorage(key) {
  return localStorage.getItem(key);
}
