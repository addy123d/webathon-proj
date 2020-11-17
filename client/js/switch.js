const loginPage = document.querySelector(".loginPage");
const registerPage = document.querySelector(".registerPage");
const switch_to_login = document.querySelector("#switchBtn");
const switch_to_register = document.querySelector("#switchBtn_register");

switch_to_login.addEventListener("click", () => {
    loginPage.classList.toggle("active");
    registerPage.classList.toggle("active");
});

switch_to_register.addEventListener("click", () => {
    loginPage.classList.toggle("active");
    registerPage.classList.toggle("active");
});
