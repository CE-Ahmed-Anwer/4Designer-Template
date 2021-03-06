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
        handleActive(e);
    });
});

// Switch Random Background Option
const randomBackgroundsElement = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackgroundsElement.forEach(span => {
    //Click On Every Span
    span.addEventListener("click", (e) => {
        handleActive(e);
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

// Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function() {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// Create Popup With The Image
let OurGallery = document.querySelectorAll(".gallery img");
OurGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add Class To Overlay
        overlay.className = "popup-overlay";
        // Append Overlay To The Body
        document.body.appendChild(overlay);
        // Create The Popup
        let popupBox = document.createElement("div");
        // Add Class To The Popup Box
        popupBox.className = "popup-box";
        if (img.alt != null) {
            // Create Heading
            let imageHeading = document.createElement("h3");
            // Create Text For Heading
            let imageText = document.createTextNode(img.alt);
            // Append The Text To The Heading
            imageHeading.appendChild(imageText);
            // Append The Heading To The Popup Box
            popupBox.appendChild(imageHeading);
        }
        // Create The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;
        // Add Image To Popup Box
        popupBox.appendChild(popupImage);
        // Append The Popup Box To Body
        document.body.appendChild(popupBox);
        // Create The Close Span
        let closeButton = document.createElement("span");
        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");
        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);
        // Add Class To Close Button
        closeButton.className = "close-button";
        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    });
});
// Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {
        // Remove The Current Popup
        e.target.parentNode.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

function scrollToSection(elements){
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSection(allBullets);

// Select All Links
const allLinks = document.querySelectorAll(".links a");
scrollToSection(allLinks);

// Hadle Active State
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove('active');
    });
    // Add Active Class On self
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else{
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        }
        else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(e);
    });
});

// Reset Button
document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option"); 
    // Reload Window
    window.location.reload();
};

// Toggle Menu
let toggleButton = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleButton.onclick = function(e){
    // Stop Propagation
    e.stopPropagation();
    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");
    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");
};
// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    if (e.target !== toggleButton && e.target !== tLinks) {
        // Check If Menu Is Open
        if(tLinks.classList.contains("open")){
            // Toggle Class "menu-active" On Button
            toggleButton.classList.toggle("menu-active");
            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");
        }
    }
});
// Stop Propagation On Menu
tLinks.onclick = function(e){
    e.stopPropagation();
};