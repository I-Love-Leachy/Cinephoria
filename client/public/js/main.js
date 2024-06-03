const initApp = () => {
  const hamburgerBtn = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");

  const quickaccess1Btn = document.getElementById("quickaccess-1");
  const quickaccess2Btn = document.getElementById("quickaccess-2");

  const franceCinemaMenu = document.getElementById("france-cinema-list");
  const belgiumCinemaMenu = document.getElementById("belgium-cinema-list");

  const openTheaterMenueBtn = document.querySelectorAll('.theater-filter');
  const theaterMenu = document.getElementById("theater-menu");
  const closeTheaterMenuBtn = document.getElementById("close-search-theater-menu");

  const toggleHamburgerMenu = () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
    hamburgerBtn.classList.toggle("toggle-btn");
  };

  const toggleFranceCinemaMenu = () => {
    franceCinemaMenu.classList.toggle("hidden");
    franceCinemaMenu.classList.toggle("flex");
  };

  const toggleBelgiumCinemaMenu = () => {
    belgiumCinemaMenu.classList.toggle("hidden");
    belgiumCinemaMenu.classList.toggle("flex");
  };

  const closeTheaterMenu = () => {
    theaterMenu.classList.add("hidden");
    theaterMenu.classList.remove("flex");
  };

  const openTheaterMenue = () => {
    theaterMenu.classList.add("flex");
    theaterMenu.classList.remove("hidden");
  };

  hamburgerBtn.addEventListener("click", toggleHamburgerMenu);
  if (quickaccess1Btn) quickaccess1Btn.addEventListener("click", toggleFranceCinemaMenu);
  if (quickaccess2Btn) quickaccess2Btn.addEventListener("click", toggleBelgiumCinemaMenu);
  if (closeTheaterMenuBtn) closeTheaterMenuBtn.addEventListener("click", closeTheaterMenu);

  if (openTheaterMenueBtn) {
    openTheaterMenueBtn.forEach(btn => {
      btn.addEventListener('click', openTheaterMenue);
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        hamburgerBtn.classList.remove('toggle-btn');
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", initApp);
