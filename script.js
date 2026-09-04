/* =====================================================
MOBILE NAVIGATION
===================================================== */

const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.onclick = () => {
        navLinks.classList.toggle('active');
    };
}


/* =====================================================
EMAILJS CONTACT FORM
===================================================== */

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = "0UVVdtW50MBrPF0yG";
const EMAILJS_SERVICE_ID = "service_0c5f4d8";
const EMAILJS_TEMPLATE_ID = "template_ujmma27";

// Initialize EmailJS
emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
    blockHeadless: true
});


// Contact form elements
const contactForm = document.querySelector('#portfolio-contact-form');
const submitButton = document.querySelector('#contact-submit-btn');
const contactStatus = document.querySelector('#contact-status');


// Display form status
function showContactStatus(message, type = '') {
    contactStatus.textContent = message;
    contactStatus.className = `contact-status ${type}`;
}


// Handle form submission
if (contactForm) {

    contactForm.addEventListener('submit', async (e) => {

        // Prevent page reload
        e.preventDefault();


        // Clear previous status
        contactStatus.textContent = '';
        contactStatus.className = 'contact-status';


        // Client-side validation
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            showContactStatus(
                'Please complete all required fields correctly.',
                'error'
            );

            return;
        }


        // Honeypot spam protection
        const honeypot = contactForm.elements['website'];

        if (honeypot && honeypot.value.trim() !== '') {

            console.warn('Potential spam submission detected.');

            showContactStatus(
                'Your message could not be submitted.',
                'error'
            );

            return;
        }


        // Capture form values
        const formData = {
            name: contactForm.elements['name'].value.trim(),
            email: contactForm.elements['email'].value.trim(),
            subject: contactForm.elements['subject'].value.trim(),
            message: contactForm.elements['message'].value.trim()
        };


        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';


        // Show loading state
        showContactStatus(
            'Sending your message...',
            'loading'
        );


        try {

            // Send email through EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formData
            );

            console.log('EmailJS success:', response.status, response.text);


            // Success
            showContactStatus(
                'Message sent successfully! Thank you for contacting me.',
                'success'
            );


            // Clear form
            contactForm.reset();


        } catch (error) {

            console.error('EmailJS Error:', error);

            showContactStatus(
                'Sorry, your message could not be sent. Please try again later.',
                'error'
            );


        } finally {

            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';

        }

    });

}