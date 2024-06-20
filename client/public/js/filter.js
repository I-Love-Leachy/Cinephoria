const filterApp = () => {
  const currentPage = window.location.pathname

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

  const openSearchStatusMenuBtn = document.querySelectorAll(".open-search-status");
  const searchStatusMenu = document.getElementById("search-status");
  const closeSearchStatusMenuBtn = document.getElementById("close-search-status");
  
  const toggleFranceCinemaMenu = () => {
    franceCinemaMenu.classList.toggle("hidden");
    franceCinemaMenu.classList.toggle("flex");
  };

  const toggleBelgiumCinemaMenu = () => {
    belgiumCinemaMenu.classList.toggle("hidden");
    belgiumCinemaMenu.classList.toggle("flex");
  };

  const closeTheaterMenu = () => {
    theaterMenu.classList.toggle("hidden");
    theaterMenu.classList.toggle("flex");
  };

  const openTheaterMenue = () => {
    theaterMenu.classList.toggle("hidden");
    theaterMenu.classList.toggle("flex");
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

  const openSearchStatusMenu = () => {
    searchStatusMenu.classList.toggle("hidden");
    searchStatusMenu.classList.toggle("flex");
  };

  const closeSearchStatusMenu = () => {
    searchStatusMenu.classList.toggle("hidden");
    searchStatusMenu.classList.toggle("flex");
  };

  quickaccess1Btn.addEventListener("click", toggleFranceCinemaMenu);
  quickaccess2Btn.addEventListener("click", toggleBelgiumCinemaMenu);
  closeTheaterMenuBtn.addEventListener("click", closeTheaterMenu);
  closeFilterBtn.addEventListener("click", closeFilterMenue);
  closeSearchMoviesMenuBtn.addEventListener("click", closeSearchMoviesMenu);
  closeSearchStatusMenuBtn.addEventListener("click", closeSearchStatusMenu);
  

  openTheaterMenueBtn.forEach(btn => {
    btn.addEventListener('click', openTheaterMenue)
  });

  
  openFilterBtn.forEach(btn => {
    btn.addEventListener('click', openFilterMenue)
  });
  
  openSearchMoviesMenuBtn.forEach(btn => {
    btn.addEventListener('click', openSearchMoviesMenu)
  });

  openSearchStatusMenuBtn.forEach(btn => {
    btn.addEventListener('click', openSearchStatusMenu)
  });

};

document.addEventListener("DOMContentLoaded", filterApp);