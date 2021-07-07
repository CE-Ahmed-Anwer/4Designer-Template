// Check If There's Local Storage Color Option
let mainColor = localStorage.getItem("color_option");
if (mainColor) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    // Remove Active Class From All Colors List Items
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove('active');
        if (element.dataset.color === mainColor) {
            // Add Active Class On Element With Data-Color == Local Storage Item
            element.classList.add("active");
        }
    });
}
// Toggle Spin Class On Icon
document.querySelector(".toggle-settings i").onclick = function(){
    // Toggle Class Fa-spin For Rotaion On Self
    this.classList.toggle("fa-spin");
    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach(li => {
    //Click On Every List Items
    li.addEventListener("click", (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);
        // Remove Active Class From All Childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove('active');
        });
        // Add Active Class On self
        e.target.classList.add("active");
    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

setInterval(() => {
    // Get Random Number
    let randomNumber = Math.floor(Math.random() * imgArray.length);
    // Change Background Image URL
    landingPage.style.backgroundImage = 'url("img/' + imgArray[randomNumber] + '")';

}, 10000);