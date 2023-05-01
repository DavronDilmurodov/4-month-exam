const BASE_URL = "http://localhost:3000/jobs";

let elTemplate = selectElement(".card__template").content;
let elList = selectElement(".jobs__list");
let elAddModalForm = selectElement(".add__modal");
let addBtn = selectElement(".btn__add");
let elSearchForm = selectElement(".search-form");
let elSearchFormInput = selectElement(".search-form__input");

// Modal
let elModalJobTitle = selectElement("#jobTitle");
let elModalCompanyName = selectElement("#companyName");
let elModalSalary = selectElement("#salary");
let elModalLocation = selectElement("#location");
let elModalExpect = selectElement("#expect");
let elModalOffer = selectElement("#offer");
let elModalSkills = selectElement("#skills");

// ModalInfo
let elJobTitleInfo = selectElement(".card-title__info");
let elSalaryInfo = selectElement(".card-subtitle__info");
let elCompanyNameInfo = selectElement(".card-company__info");
let elLocationInfo = selectElement(".card-location__info");
let elExpectInfo = selectElement(".expect");
let elOfferInfo = selectElement(".offer");
let elSkillsInfo = selectElement(".skills");

let request = async (url, options) => {
  let res = await fetch(url, options);
  let data = await res.json();
  return data;
};

let getCards = async () => {
  let cards = await request(BASE_URL, {
    method: "GET",
  });

  onRender(cards);
  secondRender(cards);
};

let onRender = (arr) => {
  elList.innerHTML = null;

  arr.forEach((element) => {
    let card = elTemplate.cloneNode(true);

    let elJobTitle = card.querySelector(".card-title");
    let elSalary = card.querySelector(".card-subtitle");
    let elCompanyName = card.querySelector(".card-company__name");
    let elLocation = card.querySelector(".card-location");
    let elLI = card.querySelector("li");

    elJobTitle.textContent = element.job_title;
    elSalary.textContent = element.salary;
    elCompanyName.textContent = element.company;
    elLocation.textContent = element.location;

    elLI.dataset.id = element.id;

    elList.append(card);
  });
};

let secondRender = (arr) => {
  arr.forEach((element) => {
    elJobTitleInfo.textContent = element.job_title;
    elSalaryInfo.textContent = element.salary;
    elCompanyNameInfo.textContent = element.company;
    elLocationInfo.textContent = element.location;
    elExpectInfo.textContent = element.what_we_expect;
    elOfferInfo.textContent = element.what_we_offer;

    let spans = "";
    let splitArr = element.skills.split(" ");

    for (let i = 0; i < splitArr.length; i++) {
      spans += `<span class="badge border text-black">${splitArr[i]}</span> `;
    }
    elSkillsInfo.innerHTML = spans;
  });
};

getCards();

let onClickModal = async (event) => {
  event.preventDefault();

  let jobTitle = elModalJobTitle.value.trim();
  let company = elModalCompanyName.value.trim();
  let salary = elModalSalary.value.trim();
  let location = elModalLocation.value.trim();
  let expect = elModalExpect.value.trim();
  let offer = elModalOffer.value.trim();
  let skills = elModalSkills.value.trim();

  if (jobTitle && company && salary && location && expect && offer && skills) {
    let card = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_title: jobTitle,
        salary: salary,
        company: company,
        location: location,
        what_we_expect: expect,
        what_we_offer: offer,
        skills: skills,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  } else {
    alert("Add a values!");
  }

  getCards();
};

let onDelete = async (id) => {
  let deletedCard = await request(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  getCards();
};

let onMore = async (id) => {
  let moreInfo = await request(`${BASE_URL}/${id}`, {
    method: "GET",
  });

  elJobTitleInfo.textContent = moreInfo.job_title;
  elSalaryInfo.textContent = moreInfo.salary;
  elCompanyNameInfo.textContent = moreInfo.company;
  elLocationInfo.textContent = moreInfo.location;
  elExpectInfo.textContent = moreInfo.what_we_expect;
  elOfferInfo.textContent = moreInfo.what_we_offer;

  let spans = "";
  let splitArr = moreInfo.skills.split(" ");

  for (let i = 0; i < splitArr.length; i++) {
    spans += `<span class="badge border text-black">${splitArr[i]}</span> `;
  }

  elSkillsInfo.innerHTML = spans;
};

let eventDelegation = (event) => {
  event.preventDefault();
  if (event.target.matches(".btn__delete")) {
    return onDelete(event.target.closest("li").dataset.id);
  }

  if (event.target.matches(".btn-more")) {
    return onMore(event.target.closest("li").dataset.id);
  }
};

let onSearch = async (event) => {
  event.preventDefault();
  let inputValue = elSearchFormInput.value.trim();

  let search = await request(`${BASE_URL}?q=${inputValue}`, {
    method: "GET",
  });

  onRender(search);
};

addBtn.addEventListener("click", onClickModal);
elList.addEventListener("click", eventDelegation);
elSearchForm.addEventListener("submit", onSearch);
