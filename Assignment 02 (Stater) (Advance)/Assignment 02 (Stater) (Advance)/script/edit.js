"use strict";
const tableBodyEl = document.getElementById("tbody");
const btnEdit = document.querySelector(".btn-danger");
const containerForm = document.getElementById("container-form");
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

//Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});

//lấy dữ liệu pet
const KEY_Pet = "petArray";
let petArr = JSON.parse(getFromStorage(KEY_Pet)) ?? [];
renderTableData(petArr);
// lấy dữ liệu breed
const KEY_Breed = "breedArray";
let breedArr = JSON.parse(getFromStorage(KEY_Breed)) ?? [];
console.log(breedArr);
const renderBreed = function () {
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = breedArr[i].nameBreed;
    breedInput.appendChild(option);
  }
};
renderBreed(breedArr);
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
//hiển thị danh sách pet đã lưu
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
      <td><button type="button" class="btn btn-danger" >Edit</button></td>
      </tr>`;
    tableBodyEl.appendChild(row);
    //Click edit
    document.querySelectorAll(".btn-danger").forEach((edit) =>
      edit.addEventListener("click", function (petId) {
        petId =
          this.parentNode.parentNode.getElementsByTagName("th")[0].textContent;
        for (let i = 0; i < petArr.length; i++) {
          if (petArr[i].id === petId) {
            containerForm.classList.remove("hide");
            dataInput(petArr, i);
          }
        }
      })
    );
  }
}

//Dữ liệu hiển thị
const dataInput = (arr, i) => {
  idInput.value = petArr[i].id;
  nameInput.value = petArr[i].name;
  ageInput.value = petArr[i].age;
  colorInput.value = petArr[i].color;
  breedInput.value = petArr[i].breed;
  typeInput.value = petArr[i].type;
  weightInput.value = petArr[i].weight;
  lengthInput.value = petArr[i].lengthIn;
  vaccinatedInput.checked = petArr[i].vaccinated;
  dewormedInput.checked = petArr[i].dewormed;
  sterilizedInput.checked = petArr[i].sterilized;
};

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
  //ham validate
  const validateData = function () {
    //nhap sai name
    if (data.name === "") alert("please input Name!");
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
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === data.id) {
        console.log(petArr[i].id);
        console.log(data.id);
        petArr.splice(i, 1, data);
        containerForm.classList.add("hide");
        renderTableData(petArr);
        console.log(petArr);
      }
    }
    //Cập nhật mảng pet vào localStorage
    saveToStorage(KEY_Pet, JSON.stringify(petArr));
  }
});
