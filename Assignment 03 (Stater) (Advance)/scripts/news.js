"use strict";

const newsContainer = document.getElementById("news-container");
const btnPre = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

//key API
const keyAPI = "b1e2529cb05c417c9282d62dbb8d7f55";

const pageSize = JSON.parse(getFromStorage("page-size")) || "5";
const category = getFromStorage("category") || "business";

let totalResults = 0;

//Lấy dữ liệu news
const getdataNews = async function (country, page) {
  try {
    //gọi API
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${keyAPI}`
    );
    console.log(res);

    const data = await res.json();
    console.log(data);
    if (data.status !== "error") {
      totalResults = data.totalResults;
      renderNewDisplay(data.articles);
    }
  } catch (err) {
    alert("Error:" + err.message);
  }
};

//Hiển thị ra màn hình
const renderNewDisplay = function (data) {
  btnPreCheck();
  btnNextCheck();
  let html = "";
  newsContainer.innerHTML = "";
  for (let i = 0; i < pageSize; i++) {
    html += `
          <div class="card flex-row flex-wrap>
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
          </div>
          `;
  }
  newsContainer.innerHTML = html;
};
getdataNews("us", 1);
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
  getdataNews("us", --pageNum.textContent);
});
btnNext.addEventListener("click", function () {
  getdataNews("us", ++pageNum.textContent);
});
