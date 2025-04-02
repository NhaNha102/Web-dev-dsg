// Js/ContactUs.js

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('ContactUs.html')) {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                console.log("Contact Form Submission:", { name, email, message });
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        }
    }
});
