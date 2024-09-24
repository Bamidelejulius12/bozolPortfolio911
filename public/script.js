// Define variables
const contactForm = document.getElementById('contact-form')

// scrolling functions for the see more button
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    const offset = 100; 
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}


contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form); // Collect the form data
    const data = {
        name: `${formData.get('name')}`,
        email: `${formData.get('email')}`,
        message: `${formData.get('message')}`,
    }

    console.log(data)
    try {

       
        const response = await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if(response.status == 200 && response.ok){
           const result = await response.json()
            document.getElementById('form-status').innerHTML = '<p style="color: green;">' + result.message + '</p>';
        }else{
            document.getElementById('form-status').innerHTML = '<p style="color: red;">' + result.message + '</p>';
        }

        

        // if (response.ok) {
        //     
        // } else {
        //     
        // }

    } catch (error) {
        // document.getElementById('form-status').innerHTML = '<p style="color: red;">An error occurred while sending the email.</p>';
    }
});

// Function to handle scroll events
function handleScroll() {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.6; // Adjust the trigger point

        if (sectionTop < triggerPoint) {
            section.classList.add('visible');
        }
    });
}
// Add event listener for scroll event
window.addEventListener('scroll', handleScroll);
// Trigger the function on page load
window.addEventListener('load', handleScroll);


// service scroll for the full services description pages 

function ServicesScroll() {
    const sections = document.querySelectorAll('#full_services_section_box');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.6; // Adjust the trigger point

        if (sectionTop < triggerPoint) {
            section.classList.add('visible');
        }
    });
}
// Add event listener for scroll event
window.addEventListener('scroll', ServicesScroll);
// Trigger the function on page load
window.addEventListener('load', ServicesScroll);


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


// when we click on hamburger icon its close 

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

