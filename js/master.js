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

// Random Background Option
let backgroundOption = false;

// Variable to control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    }
    else{
        backgroundOption = false;
    }
    // Remove Active Class From All Spans
    document.querySelectorAll(".random-backgrounds span").forEach((element) => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }
    else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
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

// Switch Random Background Option
const randomBackgroundsElement = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackgroundsElement.forEach(span => {
    //Click On Every Span
    span.addEventListener("click", (e) => {
        // Remove Active Class From All Childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove('active');
        });
        // Add Active Class On self
        e.target.classList.add("active");
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImages();
            localStorage.setItem("background_option", true);
        }
        else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function to Randomize Images
function randomizeImages(){
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            // Change Background Image URL
            landingPage.style.backgroundImage = 'url("img/' + imgArray[randomNumber] + '")';
        
        }, 5000);
    }
}
randomizeImages();