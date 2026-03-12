// ---------- CALCUL DES FRAIS D'INSCRIPTION ----------
// Fonction qui calcule les frais d'inscription en fonction du nombre de participants
function calculFraisInscription(nbParticipants) {
    const tarif = 7.99; // Tarif par participant
    return nbParticipants * tarif;
  }
  
  const calculButton = document.getElementById('calculer');
  if (calculButton) {
    calculButton.addEventListener('click', function() {
      const nb = parseInt(document.getElementById('nombre').value, 10);
      const total = calculFraisInscription(nb);
      document.getElementById('resultat').textContent = `Le coût total est de ${total} €`;
    });
  }




  
  // ---------- ANIMATION D'UN OBJET ----------
  const objet = document.getElementById('objetAnim');
  if (objet) {     // Animation uniquement si l'élément existe
    let posX = window.innerWidth / 2;
    let direction = 2;
    const vitesse = 2;
  
    function animerObjet() {
      posX += direction * vitesse;
      if (posX > window.innerWidth - 150 || posX < 50) {
        direction *= -1;
      }
      objet.style.left = posX + "px";
      requestAnimationFrame(animerObjet);
    }
    document.addEventListener("DOMContentLoaded", () => {
      animerObjet();
    });
  }





  
  // ---------- ALBUM pricipale index ----------
  function initAlbumSlideshow() {
    const albumContainer = document.querySelector('.album-slideshow');
    if (!albumContainer) return;
  
    let albumSlideIndex = 0;
    const albumSlides = albumContainer.querySelectorAll(".album-slide");
    const totalAlbumSlides = albumSlides.length;
  
    function showAlbumSlide() {
      albumSlides.forEach((slide, index) => {
        slide.style.opacity = index === albumSlideIndex ? "1" : "0";
      });
    }
  
    function nextAlbumSlide() {
      albumSlideIndex = (albumSlideIndex + 1) % totalAlbumSlides;
      showAlbumSlide();
    }
  
    function prevAlbumSlide() {
      albumSlideIndex = (albumSlideIndex - 1 + totalAlbumSlides) % totalAlbumSlides;
      showAlbumSlide();
    }
  
    // Event listeners pour les controls de l'album
    const nextBtn = document.getElementById("album-next");
    const prevBtn = document.getElementById("album-prev");
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", nextAlbumSlide);
      prevBtn.addEventListener("click", prevAlbumSlide);
    }
  
    // Initialisation
    showAlbumSlide();
  }
  






  // ---------- CAROUSEL (Nettoyage de Plage Page) ----------
  function initCarousel() {
    const carouselContainer = document.querySelector('.slideshow-container.carousel');
    if (!carouselContainer) return;

    let carouselSlideIndex = 0;
    const slides = carouselContainer.querySelectorAll(".mySlides");

    function showSlide(index) {
        if (index >= slides.length) {
            carouselSlideIndex = 0;
        } else if (index < 0) {
            carouselSlideIndex = slides.length - 1;
        } else {
            carouselSlideIndex = index;
        }
        slides.forEach(slide => slide.style.display = "none");
        slides[carouselSlideIndex].style.display = "block";
    }

    // Boutons de navigation
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            showSlide(carouselSlideIndex + 1);
            resetAutoSlide();
        });
        prevBtn.addEventListener("click", () => {
            showSlide(carouselSlideIndex - 1);
            resetAutoSlide();
        });
    }

    // Défilement automatique toutes les 2 secondes
    let autoSlide = setInterval(() => {
        showSlide(carouselSlideIndex + 1);
    }, 2000);

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            showSlide(carouselSlideIndex + 1);
        }, 2000);
    }

    // Initialisation du diaporama
    showSlide(carouselSlideIndex);
}

document.addEventListener("DOMContentLoaded", initCarousel);

  






  // ---------- Inscription/Contact----------
  function initFormHandling() {
    const form = document.getElementById("inscriptionForm");
    if (!form) return;
  
    const confirmation = document.getElementById("confirmation");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const nom = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
      const message = document.getElementById("message").value.trim();
  
      if (nom === "" || email === "" || (form.querySelector("#phone") && phone === "")) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
      }
  
      alert("Nom : " + nom + "\nEmail : " + email);
  
      if (confirmation) {
        const confirmName = document.getElementById("confirm-name");
        const confirmEmail = document.getElementById("confirm-email");
        const confirmPhone = document.getElementById("confirm-phone");
        const confirmMessage = document.getElementById("confirm-message");
  
        if (confirmName) confirmName.textContent = nom;
        if (confirmEmail) confirmEmail.textContent = email;
        if (confirmPhone) confirmPhone.textContent = phone;
        if (confirmMessage) confirmMessage.textContent = message || "Aucun message.";
  
        confirmation.style.display = "block";
      }
      form.reset();
    });
  }
  
  // ---------- INITIALIZATION ----------
    document.addEventListener("DOMContentLoaded", function () {
      initAlbumSlideshow();
      initCarousel();
      initFormHandling();
  });
  






  
  // ------- XML-------
    function loadStudents() {
        const table = document.getElementById('studentTable');
        if (!table) return;
    
        fetch("../data/groupe.xml")
          .then(response => response.text())
          .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
          .then(data => {
            const students = data.getElementsByTagName("student");
            Array.from(students).forEach(student => {
              const name = student.getElementsByTagName("name")[0].textContent;
              const address = student.getElementsByTagName("address")[0].textContent;
              const email = student.getElementsByTagName("email")[0].textContent;
            
              const row = table.insertRow();
              row.innerHTML = `<td>${name}</td><td>${address}</td><td>${email}</td>`;
            });
          })
          .catch(err => console.error("Erreur XML :", err));
      }

      // appel pour DOM une fois que c'est pres
      document.addEventListener("DOMContentLoaded", () => {
        loadStudents();
      });
  