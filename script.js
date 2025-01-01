document.addEventListener("DOMContentLoaded", () => {
    const cartDot = document.querySelector('.cart-dot');
    function updateCartDot() {
      const hasItems = Array.from(document.querySelectorAll('.quantity')).some((quantityDisplay) => {
        return parseInt(quantityDisplay.textContent) > 0;
    });


    if (hasItems) {
        cartDot.style.display = 'block';
    } else {
        cartDot.style.display = 'none'; 
    }
}

document.querySelectorAll('.card').forEach((card) => {

    const increaseBtn = card.querySelector('.increase-btn');
    const decreaseBtn = card.querySelector('.decrease-btn');
    const quantityDisplay = card.querySelector('.quantity');
  
    if (!increaseBtn || !decreaseBtn || !quantityDisplay) {
        console.error("Missing elements in card:", card);
        return; 
    }
  
    let quantity = 0;
    increaseBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        quantityDisplay.style.display = 'inline-block';
        decreaseBtn.style.display = 'inline-block';
  
        updateCartDot();
    });
    decreaseBtn.addEventListener('click', () => {
        if (quantity > 0) {
          quantity--;
          quantityDisplay.textContent = quantity;
        }
  
        if (quantity === 0) {
            
          quantityDisplay.style.display = 'none';
          decreaseBtn.style.display = 'none';
        }
  
        updateCartDot();
        });
    });
});

const nextBtn = document.querySelector('.next-btn');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
  
let currentIndex = 0; 
const visibleCards = 3;
const totalCards = carousel.children.length;
const cardWidth = carousel.children[0].clientWidth + 15;
  
const firstCards = Array.from(carousel.children).slice(0, visibleCards);
const lastCards = Array.from(carousel.children).slice(-visibleCards);
  
firstCards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
});
  
lastCards.reverse().forEach(card => {
    const clone = card.cloneNode(true);
    carousel.insertBefore(clone, carousel.firstChild);
});
  
const allCards = carousel.children;
const adjustedTotalCards = allCards.length;
  
carousel.style.transform = `translateX(${-visibleCards * cardWidth}px)`;
currentIndex = visibleCards;
  
  
function updateCarousel() {
    const offset = -currentIndex * cardWidth;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(${offset}px)`;
    
    
    carousel.addEventListener('transitionend', () => {
      if (currentIndex === 0) {
        carousel.style.transition = 'none';
        currentIndex = totalCards;
        carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
      }
      if (currentIndex === adjustedTotalCards - visibleCards) {
        carousel.style.transition = 'none';
        currentIndex = visibleCards;
        carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
      }
    });
}
  
function goToNext() {
    currentIndex++;
    updateCarousel();
}
  
function goToPrev() {
    currentIndex--;
    updateCarousel();
}
  
nextBtn.addEventListener('click', goToNext);
prevBtn.addEventListener('click', goToPrev);
updateCarousel();
  
function openForm() {
    document.getElementById("requestForm").style.display = "flex";
    document.body.classList.add("no-scroll");
}
  
function closeForm() {
    document.getElementById("requestForm").style.display = "none";
    document.body.classList.remove("no-scroll");
}
  
const bagIcon = document.getElementById("bag-icon");
const cartPopup = document.getElementById("cartPopup");
const closePopup = document.getElementById("closePopup");
  
if (bagIcon && cartPopup && closePopup) {
    bagIcon.addEventListener("click", () => {
      cartPopup.style.display = "flex";
      document.body.classList.add("no-scroll");
    });
  
    closePopup.addEventListener("click", () => {
      cartPopup.style.display = "none";
      document.body.classList.remove("no-scroll");
    });
}
  
const video = document.getElementById("myVideo");
const playPauseBtn = document.getElementById("playPauseBtn");

const togglePlayPause = () => {
  if (video.paused) {
    video.play();
    video.setAttribute("controls", ""); // Show controls when playing
    setTimeout(() => {
      playPauseBtn.style.opacity = "0"; // Hide the play/pause button after 500ms
    }, 500);
  } else {
    video.pause();
    video.removeAttribute("controls"); // Hide controls when paused
    playPauseBtn.style.opacity = "1"; // Show the play/pause button
    playPauseBtn.textContent = "⏵";
  }
};

playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);

video.addEventListener("play", () => {
  playPauseBtn.textContent = "⏸";
  video.setAttribute("controls", ""); // Ensure controls are visible when playing
  setTimeout(() => {
    playPauseBtn.style.opacity = "0"; // Hide the play/pause button after 500ms
  }, 500);
});

video.addEventListener("pause", () => {
  playPauseBtn.textContent = "⏵";
  video.removeAttribute("controls"); // Hide controls when paused
  playPauseBtn.style.opacity = "1"; // Show the play/pause button
});

video.addEventListener("ended", () => {
  playPauseBtn.textContent = "⏵";
  video.removeAttribute("controls"); // Hide controls when video ends
  playPauseBtn.style.opacity = "1"; // Show the play/pause button
});