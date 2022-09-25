"use strict";
const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const inputFile = document.getElementById("input-file");

//Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});

//Lấy dữ liệu pet từ Storage
const KEY_Pet = "petArray";
let petArr = JSON.parse(getFromStorage(KEY_Pet)) ?? [];

//a. Export data
btnExport.addEventListener("click", function () {
  var blob = new Blob([JSON.stringify(petArr)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "Pet.json");
});

//b. Import
let petArrFile;
async function readText(event) {
  const file = event.target.files.item(0);
  petArrFile = await file.text();
  console.log(petArrFile);
  petArr = JSON.parse(petArrFile);
  console.log(petArr);
}
inputFile.addEventListener("change", readText);

btnImport.addEventListener("click", function () {
  saveToStorage(KEY_Pet, JSON.stringify(petArr));
  alert("you have imported successfully!");
});
