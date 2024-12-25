// Selectors
const carousel = document.querySelector(".carousel-track");
const items = Array.from(document.querySelectorAll(".carousel-item"));

// Duplicate the items for seamless looping
const firstItems = items.map(item => item.cloneNode(true));
const lastItems = items.map(item => item.cloneNode(true));

firstItems.forEach(item => carousel.appendChild(item)); // Append to end
lastItems.reverse().forEach(item => carousel.insertBefore(item, items[0])); // Prepend to start

// Variables
const totalItems = items.length;
const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(items[0]).marginLeft) + parseFloat(getComputedStyle(items[0]).marginRight);
let currentIndex = totalItems; // Start at the "real" first item
let isAnimating = false; // To prevent rapid clicks

// Set initial position
carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

// Function to scroll carousel
function scrollCarousel(direction) {
  if (isAnimating) return; // Prevent rapid clicks
  isAnimating = true;

  // Update index
  currentIndex += direction;

  // Apply sliding transition
  carousel.style.transition = "transform 0.5s ease";
  carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Handle seamless looping after the transition
  setTimeout(() => {
    if (currentIndex >= totalItems * 2) {
      // If at the end of cloned items, reset to the original first items
      currentIndex = totalItems;
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    } else if (currentIndex < totalItems) {
      // If at the start of cloned items, reset to the original last items
      currentIndex = totalItems * 2 - 1;
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    isAnimating = false; // Allow new clicks
  }, 500); // Wait for the sliding animation to complete
}

// Event listeners for buttons
document.querySelector(".next").addEventListener("click", () => scrollCarousel(1));
document.querySelector(".prev").addEventListener("click", () => scrollCarousel(-1));
