// Handle Feedback Submission
document.querySelectorAll('.submit-feedback').forEach((button, index) => {
    button.addEventListener('click', function() {
        const commentBox = document.querySelectorAll('.comment-box')[index];
        const feedback = commentBox.value;
        if (feedback) {
            alert("Feedback Submitted: " + feedback);
            commentBox.value = "";  // Clear the text area after submission
        } else {
            alert("Please enter your feedback before submitting.");
        }
    });
});

// Handle Like and Dislike Buttons
document.querySelectorAll('.like-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        alert("You liked the video " + (index + 1));
    });
});

document.querySelectorAll('.dislike-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        alert("You disliked the video " + (index + 1));
    });
});
