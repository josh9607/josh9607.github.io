// Dark/light theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('theme-dark');
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('theme-dark');
    themeToggleBtn.textContent = '☀️';
  }
});

// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      target.focus({ preventScroll: true });
    }
  });
});

// Back to top button logic
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Enhanced form validation with inline error messages for contact form
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const contactFields = ['name', 'email', 'message'];

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  // Clear previous errors
  contactFields.forEach(field => {
    const errorEl = document.getElementById(`${field}-error`);
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  });
  formStatus.textContent = '';

  // Validate fields
  if (contactForm.name.value.trim().length < 2) {
    showError('name', 'Name must be at least 2 characters.');
    valid = false;
  }

  if (!validateEmail(contactForm.email.value)) {
    showError('email', 'Please enter a valid email.');
    valid = false;
  }

  if (contactForm.message.value.trim().length < 10) {
    showError('message', 'Message must be at least 10 characters.');
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = 'Please fix the errors above.';
    formStatus.style.color = 'var(--color-error)';
    return;
  }

  formStatus.textContent = 'Sending...';
  formStatus.style.color = 'var(--color-accent)';

  // Simulate sending message
  setTimeout(() => {
    formStatus.textContent = 'Thank you! Your message has been sent.';
    contactForm.reset();
  }, 1500);
});

function showError(field, message) {
  const errorEl = document.getElementById(`${field}-error`);
  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

// Booking form logic
const bookingForm = document.getElementById('booking-form');
const bookingStatus = document.getElementById('booking-status');
const dateInput = document.getElementById('date-book');

// Set min date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

bookingForm.addEventListener('submit', e => {
  e.preventDefault();

  bookingStatus.textContent = '';
  bookingStatus.style.color = '';

  const name = bookingForm.name.value.trim();
  const email = bookingForm.email.value.trim();
  const date = bookingForm.date.value;
  const time = bookingForm.time.value;

  if (name.length < 2 || !validateEmail(email) || !date || !time) {
    bookingStatus.textContent = 'Please fill in all fields correctly.';
    bookingStatus.style.color = 'var(--color-error)';
    return;
  }

  if (date < today) {
    bookingStatus.textContent = 'Please select a valid date.';
    bookingStatus.style.color = 'var(--color-error)';
    return;
  }

  bookingStatus.textContent = 'Booking your call...';
  bookingStatus.style.color = 'var(--color-accent)';

  setTimeout(() => {
    bookingStatus.textContent = `Thanks, ${name}! Your call is booked for ${date} at ${bookingForm.time.options[bookingForm.time.selectedIndex].text}.`;
    bookingStatus.style.color = 'var(--color-accent)';
    bookingForm.reset();
  }, 1500);
});

// Email validator
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}