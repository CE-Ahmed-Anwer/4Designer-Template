// Toggle Spin Class On Icon
document.querySelector(".toggle-settings i").onclick = function(){
    // Toggle Class Fa-spin For Rotaion On Self
    this.classList.toggle("fa-spin");
    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

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