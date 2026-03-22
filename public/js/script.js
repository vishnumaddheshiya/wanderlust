// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Dark/Light Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  // Check for saved theme preference or default to light theme
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on page load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    document.body.classList.remove('dark-theme');
    themeIcon.classList.add('fa-sun');
    themeIcon.classList.remove('fa-moon');
  }

  // Theme toggle click handler
  themeToggle.addEventListener('click', function() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    if (isDarkTheme) {
      // Switch to light theme
      document.body.classList.remove('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to dark theme
      document.body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
});