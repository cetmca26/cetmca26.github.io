function darkmode(){
    var element = document.body;
    element.classList.toggle("darkmode")
    var isdarkmode = document.body.classList.toggle('dark-mode')
var darkmodebutton=document.getElementById('modes');

if (isdarkmode){
    darkmodebutton.textContent = 'brightness_5' ;

} else{
    darkmodebutton.textContent = 'dark_mode';
}   
}

// Text Changing
// Array of phrases to display
const phrases = [
    "Learn collaboration with GitHub",
    "Contribute to open-source projects",
    "Showcase your skills to the world",
    "Join our GitHub community",
    "Start contributing today"
];

let phraseIndex = 0;  // Index of the current phrase
let charIndex = 0;    // Index for typing the current phrase

// Function to type the text
function typeText() {
    const changingTextElement = document.getElementById('changingtext');
    
    // Get the current phrase to type
    const currentPhrase = phrases[phraseIndex];

    // Add one character at a time
    changingTextElement.textContent = currentPhrase.slice(0, charIndex + 1);

    // Increase the character index to simulate typing
    charIndex++;

    // Once the current phrase is typed, move to the next phrase
    if (charIndex === currentPhrase.length) {
        setTimeout(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to first phrase after last one
            charIndex = 0; // Reset character index
            changingTextElement.textContent = ""; // Clear text before typing the next one
            typeText(); // Start typing the next phrase
        }, 2000); // Pause for 1 second after completing the phrase
    } else {
        setTimeout(typeText, 140); // Wait for 100ms before typing the next character
    }
}

// Start typing the first phrase
typeText();




// Array of texts to display
const aboutTexts = [
    "Welcome to the CET MCA 26 Community! We are a vibrant group of tech enthusiasts, innovators, and learners united by our journey in the MCA program at CET. Our mission is to foster collaboration, share knowledge, and build a strong foundation in the world of technology.",
    "Join us as we explore the world of technology and learn together. Collaboration, innovation, and growth are at the heart of our community.",
    "Contribute to open-source projects, learn new technologies, and showcase your skills as part of the CET MCA 26 community.",
    "Our mission is to empower students with the resources they need to succeed and create a supportive space for innovation and growth."
];

let currentIndex = 0;

// Function to change the text content every 15 seconds
function changeText() {
    const aboutUsElement = document.getElementById('aboutus');

    // Change the text content to the current text in the array
    aboutUsElement.textContent = aboutTexts[currentIndex];

    // Update the current index to cycle through the texts
    currentIndex = (currentIndex + 1) % aboutTexts.length;  // Loop back to the first text when the last one is reached
}