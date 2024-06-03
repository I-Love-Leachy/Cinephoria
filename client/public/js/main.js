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

  const openFilterBtn = document.querySelectorAll('.movies-filter');
  const filterMenu = document.getElementById('filter-menu');
  const closeFilterBtn = document.getElementById('close-filter-menu');

  const openSearchMoviesMenuBtn = document.querySelectorAll(".open-search-movies");
  const searchMoviesMenu = document.getElementById("search-movie");
  const closeSearchMoviesMenuBtn = document.getElementById("close-search-movie");

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

  const openFilterMenue = () => {
    filterMenu.classList.toggle("hidden");
    filterMenu.classList.toggle("flex");
  };

  const closeFilterMenue = () => {
    filterMenu.classList.toggle("hidden");
    filterMenu.classList.toggle("flex");
  };

  const openSearchMoviesMenu = () => {
    searchMoviesMenu.classList.toggle("hidden");
    searchMoviesMenu.classList.toggle("flex");
  };

  const closeSearchMoviesMenu = () => {
    searchMoviesMenu.classList.toggle("hidden");
    searchMoviesMenu.classList.toggle("flex");
  };

  
  // Hamburger menu responsive
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

  // Filter items
  closeFilterBtn.addEventListener("click", closeFilterMenue);
  closeSearchMoviesMenuBtn.addEventListener("click", closeSearchMoviesMenu);
  

  openTheaterMenueBtn.forEach(btn => {
    btn.addEventListener('click', openTheaterMenue)
  });

  
  openFilterBtn.forEach(btn => {
    btn.addEventListener('click', openFilterMenue)
  });
  
  openSearchMoviesMenuBtn.forEach(btn => {
    btn.addEventListener('click', openSearchMoviesMenu)
  });
};


document.addEventListener("DOMContentLoaded", initApp);
