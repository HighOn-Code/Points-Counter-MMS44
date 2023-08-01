const mikePassword = "mike123"; // Replace with Mike's actual password
const elisaPassword = "elisa456"; // Replace with Elisa's actual password
let currentUser = null;

function addPoints(person) {
    if (currentUser === null) {
        promptLogin(person);
        return;
    }

    // Check if the user is allowed to add points for the current person
    if (currentUser !== person) {
        alert("You are not allowed to add points for this person.");
        return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const lastUsedDate = localStorage.getItem(person + "LastUsed");
    const clickCount = parseInt(localStorage.getItem(person + "ClickCount")) || 0;

    if (lastUsedDate === today && clickCount >= 2) {
        alert("You can use this button only twice a day.");
        return;
    }

    let points = parseInt(localStorage.getItem(person + "Points")) || 0;

    if (clickCount === 0) {
        points += 10;
        localStorage.setItem(person + "ClickCount", 1);
    } else if (clickCount === 1) {
        points += 15;
        localStorage.setItem(person + "ClickCount", 2);
    }

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
    if (currentUser === null) {
        alert("Please log in to view total points.");
        return;
    }

    const totalMikePoints = parseInt(localStorage.getItem("mikePoints")) || 0;
    const totalElisaPoints = parseInt(localStorage.getItem("elisaPoints")) || 0;

    document.getElementById("totalMikePoints").textContent = totalMikePoints;
    document.getElementById("totalElisaPoints").textContent = totalElisaPoints;

    document.getElementById("showTotalButton").style.display = "none";
    document.getElementById("totalPointsDisplay").style.display = "block";
}

function hideTotalPoints() {
    currentUser = null;
    document.getElementById("totalPointsDisplay").style.display = "none";
    document.getElementById("showTotalButton").style.display = "block";
}

window.onload = function () {
    document.getElementById("mikePoints").textContent = localStorage.getItem("mikePoints") || 0;
    document.getElementById("elisaPoints").textContent = localStorage.getItem("elisaPoints") || 0;
};

const resetPassword = "reset123"; // Replace with your desired reset password

function resetPoints() {
    const password = prompt("Enter the reset password:");

    if (password === resetPassword) {
        localStorage.setItem("mikePoints", 0);
        localStorage.setItem("elisaPoints", 0);
        localStorage.setItem("mikeClickCount", 0);
        localStorage.setItem("elisaClickCount", 0);
        document.getElementById("mikePoints").textContent = "0";
        document.getElementById("elisaPoints").textContent = "0";

        localStorage.removeItem("mikeLastUsed");
        localStorage.removeItem("elisaLastUsed");

        currentUser = null;

        alert("Points and daily usage reset for both Mike and Elisa.");
    } else {
        alert("Incorrect password. Points reset aborted.");
    }
}