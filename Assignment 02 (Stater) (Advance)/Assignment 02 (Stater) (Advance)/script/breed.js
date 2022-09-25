"use strict";
const submitBreed = document.getElementById("submit-btn");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");

const tableBodyElBreed = document.getElementById("tbody");
const btnSideBar = document.getElementById("sidebar");

//Bổ sung Animation cho Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});

//Lấy dữ liệu breed từ Storage
const KEY_Breed = "breedArray";
let breedArr = JSON.parse(getFromStorage(KEY_Breed)) ?? [];
renderTableDataBreed(breedArr);

//Nhấn submit
submitBreed.addEventListener("click", function () {
  //Tạo Object chứa dữ liệu lấy từ các input
  const dataBreed = {
    nameBreed: inputBreed.value,
    type: inputType.value,
  };

  //Validate
  const validateDataBreed = function () {
    //không nhập Breed
    if (dataBreed.nameBreed === "") {
      alert("Please input Breed!");
      return false;
    }
    //không nhập type
    else if (dataBreed.type === "Select Type") {
      alert("please input Type!");
      return false;
    } else {
      return true;
    }
  };
  console.log(validateDataBreed(dataBreed));
  const validateBreed = validateDataBreed(dataBreed);
  if (validateBreed) {
    breedArr.push(dataBreed);
    clearInputBreed();
    renderTableDataBreed(breedArr);

    //Cập nhật mảng breed vào localStorage
    saveToStorage(KEY_Breed, JSON.stringify(breedArr));
  }
});

//Xóa dữ liệu Breed
const clearInputBreed = function () {
  inputBreed.value = "";
  inputType.value = "Select Type";
};

//hiển thị danh sách breed
function renderTableDataBreed(breedArr) {
  tableBodyElBreed.innerHTML = "";
  breedArr.forEach((e, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<tr>
        <th scope ="row">${i + 1}</th>
        <td>${e.nameBreed}</td>
        <td>${e.type}</td>
        <td><button type="button" class="btn btn-danger">Delete</button></td>
        </tr>`;
    tableBodyElBreed.appendChild(row);
  });

  //Xóa 1 Breed
  document.querySelectorAll(".btn-danger").forEach((del) =>
    del.addEventListener("click", function () {
      if (confirm("Are you sure?")) {
        let id = parseInt(
          this.parentNode.parentNode.getElementsByTagName("th")[0].textContent
        );
        breedArr.splice(id - 1, 1);
        saveToStorage(KEY_Breed, JSON.stringify(breedArr));
        renderTableDataBreed(breedArr);
      }
    })
  );
}
