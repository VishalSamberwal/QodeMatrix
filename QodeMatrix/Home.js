

  $('#homeCarousel').carousel({
    interval: 1300,
    pause: 'hover'
  });

  $(document).ready(function () {
    $("#getStarted").click(function (e) {
      e.preventDefault();
      $("#loader").fadeIn(200);

      // Simulate loading before scroll
      setTimeout(function () {
        $("html, body").animate({
          scrollTop: $("#about").offset().top
        }, 800, function () {
          $("#loader").fadeOut(300);
        });
      }, 300); // Optional loading delay
    });
  });
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('mobileSidebar');
  const closeBtn = document.getElementById('closeSidebar');

  hamburger.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  document.querySelectorAll('.mobile-sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  });

const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    
    setTimeout(() => {
      form.reset(); 
    }, 1000); 
  });
