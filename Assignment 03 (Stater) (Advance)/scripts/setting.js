"use strict";

const btnSave = document.getElementById("btn-submit");
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");

btnSave.addEventListener("click", function (e) {
  e.preventDefault();
  if (!inputPageSize.value) {
    alert("Please input New per page!");
  } else {
    saveToStorage("page-size", inputPageSize.value);
    saveToStorage("category", inputCategory.value);
    alert("Save succesful!");
    window.location.href = "../pages/news.html";
  }
});
