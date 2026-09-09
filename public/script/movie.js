function ratingStars(rating) {
  const ratingElement = document.getElementById("rating");

  if (rating >= 7) {
    ratingElement.style.color = "green";
  } else if (rating < 5) {
    ratingElement.style.color = "red";
  } else {
    ratingElement.style.color = "orange";
  }
}

function displayRatingStars(rating) {
  const ratingElement = document.getElementById("rating-stars");
  const starCount = Math.round(rating / 2); // Convert rating to a 5-star scale
  let stars = "";

  for (let i = 0; i < starCount; i++) {
    stars += "★"; // Filled star
  }
  for (let i = starCount; i < 5; i++) {
    stars += "☆"; // Empty star
  }

  ratingElement.textContent = stars;
}

const ratings = Number(document.getElementById("rating").dataset.rating);

ratingStars(ratings);
displayRatingStars(ratings);