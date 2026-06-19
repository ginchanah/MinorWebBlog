console.log("hello world")

// MARK: heart logic
const container = document.querySelector('.hearts-container');
const hearts = Array.from(container.querySelectorAll('.heart'));
const hiddenInput = document.getElementById('rating-value');

let currentRating = 5;

hearts.forEach((heart) => {
    heart.classList.add('is-active');
});

function updateHearts() {
  hearts.forEach((heart) => {
    const value = Number(heart.dataset.value);
    heart.classList.toggle('is-active', value <= currentRating);
  });
  if (hiddenInput) hiddenInput.value = currentRating;
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