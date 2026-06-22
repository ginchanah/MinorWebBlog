console.log("hello world")

// MARK: heart logic
const container = document.querySelector('.hearts-container');
const hearts = Array.from(container.querySelectorAll('.heart'));

let currentRating = 5;

hearts.forEach((heart) => {
    heart.classList.add('is-active');
});

function updateHearts() {
    hearts.forEach((heart) => {
        const value = Number(heart.dataset.value);
        const isActive = value <= currentRating;

        heart.classList.toggle('is-active', isActive);
        heart.setAttribute('aria-checked', String(isActive));
    });
}

hearts.forEach((heart) => {
    heart.addEventListener('click', () => {
        const value = Number(heart.dataset.value);

        if (value <= currentRating) {
        // clicked a red heart → move rating down
        currentRating = value - 1;
        } else {
        // clicked a see-through heart → move rating up
        currentRating = value;
        }

        updateHearts();
    });
});

// initial render
updateHearts();


// src: https://blog.logrocket.com/build-image-carousel-scratch-vanilla-javascript/
// MARK: carousel
const addElement = (tag, attributes = {}, children = "") => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (children) element.innerHTML = children;
  return element;
};

const JSCarousel = ({ carouselSelector, slideSelector }) => {
  let currentSlideIndex = 0;
  let prevButton, nextButton;

  const carousel = document.querySelector(carouselSelector);
  if (!carousel) {
    console.error("Specify a valid selector for the carousel.");
    return null;
  }

  const slides = carousel.querySelectorAll(slideSelector);
  if (!slides.length) {
    console.error("Specify a valid selector for slides.");
    return null;
  }

  const tweakStructure = () => {
    const carouselInner = addElement("div", { class: "carousel-inner" });
    carousel.insertBefore(carouselInner, slides[0]);

    slides.forEach((slide, index) => {
      carouselInner.appendChild(slide);
      slide.style.transform = `translateX(${index * 100}%)`;
    });

    // mark first slide as active initially
    slides[0].classList.add("is-active");

    prevButton = addElement(
      "button",
      {
        class: "carousel-btn carousel-btn--prev-next carousel-btn--prev",
        "aria-label": "Previous Slide",
      },
      "<"
    );
    carouselInner.appendChild(prevButton);

    nextButton = addElement(
      "button",
      {
        class: "carousel-btn carousel-btn--prev-next carousel-btn--next",
        "aria-label": "Next Slide",
      },
      ">"
    );
    carouselInner.appendChild(nextButton);
  };

  const focusableSelector = `a, button, input, textarea, select, summary, [tabindex]`;
    const adjustSlidePosition = () => {
        slides.forEach((slide, i) => {
            const isActive = i === currentSlideIndex;

            slide.style.transform = `translateX(${100 * (i - currentSlideIndex)}%)`;
            slide.classList.toggle("is-active", isActive);

            const details = slide.querySelector("details");
            if (details && !isActive) {
            details.open = false;
            }

            // Hide/show entire slide from a11y tree
            if (!isActive) {
            slide.setAttribute("aria-hidden", "true");
            slide.setAttribute("inert", "");
            } else {
            slide.removeAttribute("aria-hidden");
            slide.removeAttribute("inert");
            }
        });
    };
  const updateCarouselState = () => {
    adjustSlidePosition();
  };

const moveSlide = (direction) => {
  const newSlideIndex =
    direction === "next"
      ? (currentSlideIndex + 1) % slides.length
      : (currentSlideIndex - 1 + slides.length) % slides.length;

  currentSlideIndex = newSlideIndex;
  updateCarouselState();

  // Restore all focusables in the active slide
  const activeSlide = slides[currentSlideIndex];
  const focusables = activeSlide.querySelectorAll(
    `a, button, input, textarea, select, summary, [tabindex]`
  );
  
  focusables.forEach((el) => {
    el.removeAttribute("tabindex");
  });

  // Move focus to first focusable
  const firstFocusable = focusables[0];
  if (firstFocusable) {
    firstFocusable.focus();
  }
};

  const handlePrevButtonClick = () => moveSlide("prev");
  const handleNextButtonClick = () => moveSlide("next");

  const attachEventListeners = () => {
    prevButton.addEventListener("click", handlePrevButtonClick);
    nextButton.addEventListener("click", handleNextButtonClick);
  };

  const create = () => {
    tweakStructure();
    updateCarouselState(); // ensure transforms + is-active are in sync
    attachEventListeners();
  };

  const destroy = () => {
    prevButton.removeEventListener("click", handlePrevButtonClick);
    nextButton.removeEventListener("click", handleNextButtonClick);
  };

  return { create, destroy };
};

// Initializing the carousel
const carousel1 = JSCarousel({
  carouselSelector: "#carousel-1",
  slideSelector: ".slide",
});

carousel1?.create();

// Cleanup
window.addEventListener("unload", () => {
  carousel1?.destroy();
});

