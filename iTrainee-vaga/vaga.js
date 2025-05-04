AOS.init({
    once: true,
    offset: 120,
    delay: 100,
  });

  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('navbar-shrink', window.scrollY > 100);
  });

  document.querySelector('.submit-btn').addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 1000);
  });

  function apply() {
    alert("Candidatura enviada com sucesso!");
  }

  document.getElementById('current-year').textContent = new Date().getFullYear();