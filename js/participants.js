const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');


burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
});


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
  });
});


document.addEventListener('click', (e) => {
  const isClickInsideNav = nav.contains(e.target);
  const isClickOnBurger = burger.contains(e.target);
  
  if (!isClickInsideNav && !isClickOnBurger && nav.classList.contains('active')) {
    burger.classList.remove('active');
    nav.classList.remove('active');
  }
});


navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
   
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});


const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.animationDelay = `${index * 0.1}s`;
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);


const cards = document.querySelectorAll('.participant-card');
cards.forEach(card => {
  observer.observe(card);
});