"use strict";

const btnSearch = document.getElementById("btn-submit");
const inputSearch = document.getElementById("input-query");
const btnPre = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");
const pageNum = document.getElementById("page-num");

const keyAPI = "b1e2529cb05c417c9282d62dbb8d7f55";

const pageSize = JSON.parse(getFromStorage("page-size")) || "5";

let totalResults = 0;

////Lấy dữ liệu từ API
const getDataNews = async function (dataSearch, page) {
  try {
    let res = await fetch(
      `https://newsapi.org/v2/everything?q=${dataSearch}&pageSize=${pageSize}&page=${page}&apiKey=${keyAPI}`
    );
    console.log(res);

    const data = await res.json();
    console.log(data);
    if (data.status !== "error") {
      console.log(data.totalResults);
      totalResults = data.totalResults;
      renderNews(data.articles);
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};
//Ấn Search
btnSearch.addEventListener("click", function (page) {
  if (inputSearch.value === "") {
    alert("Please fill information to search!");
  } else {
    getDataNews(inputSearch.value, 1);
  }
});

//Hiển thị News

const renderNews = function (data) {
  btnPreCheck();
  btnNextCheck();
  newsContainer.innerHTML = "";
  let html = "";
  for (let i = 0; i < pageSize; i++) {
    html += `<div class="card flex-row flex-wrap">
                   <div class="card mb-3" style="">
                       <div class="row no-gutters">
                           <div class="col-md-4">
                               <img src="${data[i].urlToImage}" class="card-img">
                           </div>
                           <div class="col-md-8">
                               <div class="card-body">
                                   <h5 class="card-title">${data[i].title}</h5>
                                   <p class="card-text">${data[i].description}</p>
                                   <a href="${data[i].url}"
                                       class="btn btn-primary">View</a>
                               </div>
                           </div>
                       </div>
                   </div>
               </div> `;
    newsContainer.innerHTML = html;
  }
};

//Nút Pre và Next
const btnPreCheck = function (e) {
  if (pageNum.textContent == 1) {
    btnPre.style.display = "none";
  } else {
    btnPre.style.display = "block";
  }
};
const btnNextCheck = function (e) {
  if (pageNum.textContent == Math.ceil(totalResults / pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
};
btnPre.addEventListener("click", function () {
  getDataNews(inputSearch.value, --pageNum.textContent);
});
btnNext.addEventListener("click", function () {
  getDataNews(inputSearch.value, ++pageNum.textContent);
});
