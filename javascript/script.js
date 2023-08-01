const mikePassword = "mike123"; // Replace with Mike's actual password
const elisaPassword = "elisa456"; // Replace with Elisa's actual password
let currentUser = null;

// Function to add points for Mike or Elisa
function addPoints(person) {
    // Check if the user is logged in before adding points
    if (currentUser === null) {
        promptLogin(person);
        return;
    }

    // Check if the button has been used today
    const lastUsedDate = localStorage.getItem(person + "LastUsed");
    const today = new Date().toLocaleDateString();

    if (lastUsedDate === today) {
        alert("You can use this button only once a day.");
        return;
    }

    // Get the current points from storage
    let points = parseInt(localStorage.getItem(person + "Points")) || 0;

    // Add 10 points
    points += 10;

    // Update the display and save the points in storage
    document.getElementById(person + "Points").textContent = points;
    localStorage.setItem(person + "Points", points);
    localStorage.setItem(person + "LastUsed", today);
}

function promptLogin(person) {
    const password = prompt(`Enter ${person}'s password:`);

    if (person === "mike" && password === mikePassword) {
        currentUser = "mike";
        addPoints("mike");
    } else if (person === "elisa" && password === elisaPassword) {
        currentUser = "elisa";
        addPoints("elisa");
    } else {
        alert("Incorrect password. Please try again.");
    }
}

function showTotalPoints() {
    // Check if the user is logged in before showing total points
    if (currentUser === null) {
        alert("Please log in to view total points.");
        return;
    }

    // Get and display the total points for Mike and Elisa
    const totalMikePoints = parseInt(localStorage.getItem("mikePoints")) || 0;
    const totalElisaPoints = parseInt(localStorage.getItem("elisaPoints")) || 0;

    document.getElementById("totalMikePoints").textContent = totalMikePoints;
    document.getElementById("totalElisaPoints").textContent = totalElisaPoints;

    // Hide the "Show Total Points" button and show the total points display
    document.getElementById("showTotalButton").style.display = "none";
    document.getElementById("totalPointsDisplay").style.display = "block";
}

function hideTotalPoints() {
    // Clear the current user and hide the total points display
    currentUser = null;
    document.getElementById("totalPointsDisplay").style.display = "none";

    // Show the "Show Total Points" button again
    document.getElementById("showTotalButton").style.display = "block";
}

// On page load, fetch and display the points from local storage
window.onload = function () {
    document.getElementById("mikePoints").textContent = localStorage.getItem("mikePoints") || 0;
    document.getElementById("elisaPoints").textContent = localStorage.getItem("elisaPoints") || 0;
};
