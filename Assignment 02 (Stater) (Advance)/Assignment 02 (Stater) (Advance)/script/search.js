"use strict";
const btnFind = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

//Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});

//Lấy dữ liệu pet từ Storage
const KEY_Pet = "petArray";
let petArr = JSON.parse(getFromStorage(KEY_Pet)) ?? [];
renderTableData(petArr);

//lấy dữ liệu Breed từ Storage
const KEY_Breed = "breedArray";
let breedArr = JSON.parse(getFromStorage(KEY_Breed)) ?? [];

//Hiển thị Breed theo type
typeInput.addEventListener("change", function () {
  function clearBreed() {
    breedInput.innerHTML = "";
    breedInput.innerHTML += "<option>Select Breed</option>";
  }
  switch (typeInput.value) {
    case typeInput.options[0].value:
      clearBreed();
      break;
    case "Dog":
      clearBreed();
      breedArr.forEach((element) => {
        if (element.type == "Dog") {
          let option = document.createElement("option");
          option.value = element.nameBreed;
          option.innerHTML = element.nameBreed;
          breedInput.appendChild(option);
        }
      });
      break;
    case "Cat":
      clearBreed();
      breedArr.forEach((element) => {
        if (element.type == "Cat") {
          let option = document.createElement("option");
          option.value = element.nameBreed;
          option.innerHTML = element.nameBreed;
          breedInput.appendChild(option);
        }
      });
  }
});
//event Find button
btnFind.addEventListener("click", function (e) {
  const findPet = petArr.filter((pet) => {
    if (idInput.value.trim() !== "" && !pet.id.includes(idInput.value.trim()))
      return false;
    if (
      nameInput.value.trim() !== "" &&
      !pet.name.includes(nameInput.value.trim())
    )
      return false;
    if (
      typeInput.options[0].value !== typeInput.value &&
      pet.type !== typeInput.value
    )
      return false;
    if (
      breedInput.options[0].value !== breedInput.value &&
      pet.breed !== breedInput.value
    )
      return false;
    if (vaccinatedInput.checked === true && pet.vaccinated === false)
      return false;
    if (dewormedInput.checked === true && pet.dewormed === false) return false;
    if (sterilizedInput.checked === true && pet.sterilized === false)
      return false;

    return true;
  });
  renderTableData(findPet);
});

// Hiển thị danh sách thú cưng
function renderTableData(petArr) {
  let tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";

  petArr.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${element.id}</th>
      <td>${element.name}</td>
      <td>${element.age}</td>
      <td>${element.type}</td>
      <td>${element.weight} kg</td>
      <td>${element.lengthIn} cm</td>
      <td>${element.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${element.color}"></i>
      </td>
      <td><i class="bi ${
        element.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        element.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        element.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td>${new Date(element.date).toLocaleDateString("en-US")}</td>
      `;

    tableBodyEl.appendChild(row);
  });
}
