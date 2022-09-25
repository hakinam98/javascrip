"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const btnDelete = document.getElementById("btn-danger");
const btnHealthy = document.getElementById("healthy-btn");
const petManagement = document.querySelector(".navbar-brand");
//const caculateBMI = document.getElementById("BMI-btn");

//Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});
//Lấy dữ liệu pet từ Storage
const KEY_Pet = "petArray";
let petArr = JSON.parse(getFromStorage(KEY_Pet)) ?? [];
renderTableData(petArr);

////////////////

//lấy dữ liệu Breed từ Storage
const KEY_Breed = "breedArray";
let breedArr = JSON.parse(getFromStorage(KEY_Breed)) ?? [];

//Hiển thị Breed theo type trong màn hình quản lý thú cưng
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
////////////////////////////////////////////////////////////
let healthyPetArr = [];
let healthyCheck = false;

//Submit event
submitBtn.addEventListener("click", function () {
  //tao data input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    date: new Date(),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthIn: parseInt(lengthInput.value),
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  console.log(data);
  //id trung nhau
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === data.id) {
      alert("ID must unique!");
      return false;
    }
  }
  //ham validate
  const validateData = function () {
    //nhap sai id
    if (data.id === "") alert("please input ID!");
    //nhap sai name
    else if (data.name === "") alert("please input Name!");
    //nhap sai age
    else if (!data.age) alert("please input Age!");
    else if (data.age < 1 || data.age > 15)
      alert("Age must be between 1 and 15!");
    //nhap sai weight
    else if (!data.weight) alert("please input Weight!");
    else if (data.weight < 1 || data.weight > 15)
      alert("Weight must be between 1 and 15!");
    //nhap sai length
    else if (!data.lengthIn) alert("please input Length!");
    else if (data.lengthIn < 1 || data.lengthIn > 100)
      alert("Length must be between 1 and 100!");
    //nhap sai type
    else if (data.type === "Select Type") alert("Please select Type!");
    //nhap sai breed
    else if (data.breed === "Select Breed") alert("Please select Breed!");
    else return true;
  };
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);

    //Cập nhật mảng pet vào localStorage
    saveToStorage(KEY_Pet, JSON.stringify(petArr));
  }
});
//hien thi danh sach thu cung
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let vaccinatedText = petArr[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let dewormedText = petArr[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let sterilizedText = petArr[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const row = document.createElement("tr");
    row.innerHTML = `<tr>
    <th scope = "row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].lengthIn} cm</td>
    <td>${petArr[i].breed}</td>
    <td><i class = "bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
    <td><i class="${vaccinatedText}"></i></td>
    <td><i class="${dewormedText}"></i></td>
    <td><i class="${sterilizedText}"></i></td>
    <td>${petArr[i].date}</td>
    <td><button type="button" class="btn btn-danger" >Delete</button></td>
    </tr>`;
    tableBodyEl.appendChild(row);
    //xoa mot pet
    document.querySelectorAll(".btn-danger").forEach((del) =>
      del.addEventListener("click", function () {
        if (confirm("Are you sure?")) {
          let idCheck =
            this.parentNode.parentNode.getElementsByTagName("th")[0]
              .textContent;
          for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].id === idCheck) {
              petArr.splice(i, 1);
            }
          }

          if (!healthyCheck) renderTableData(petArr);
          else renderTableData(healthyCheck);
          saveToStorage(KEY_Pet, JSON.stringify(petArr));
        }
      })
    );
  }
}
//xoa du lieu tren form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = null;
  typeInput.value = "Select Type";
  weightInput.value = null;
  lengthInput.value = null;
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//Hien thi cac thu cung khoe manh
const healthyPet = function () {
  healthyPetArr = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
  console.log(healthyPetArr);
};

btnHealthy.addEventListener("click", function () {
  if (!healthyCheck) {
    healthyCheck = true;
    btnHealthy.textContent = "Show All Pet";
    healthyPet();
    renderTableData(healthyPetArr);
  } else {
    healthyCheck = false;
    btnHealthy.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
});
/*
//tinh BMI
const btnCaculate = function (p) {
  p.forEach((pet) => {
    if (pet.Type === "Dog")
      pet.BMI = ((pet.weight * 703) / pet.lengthIn ** 2).toFixed(2);
    else pet.BMI = ((pet.weight * 886) / pet.lengthIn ** 2).toFixed(2);
  });
  renderTableData(p);
};
caculateBMI.addEventListener("click", () => btnCaculate(petArr));
*/
