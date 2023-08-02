        const mikePassword = "mike123"; // Replace with Mike's actual password
        const elisaPassword = "elisa456"; // Replace with Elisa's actual password
        let currentUser = null;

        function addPoints() {
            // Check if the user is logged in before adding points
            if (currentUser === null) {
                promptLogin();
                return;
            }

            // Get the person's name from the URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const person = urlParams.get("person");

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

            document.getElementById("points").textContent = points;
            localStorage.setItem(person + "Points", points);
            localStorage.setItem(person + "LastUsed", today);
        }

        function promptLogin() {
            const password = prompt(`Enter the password:`);

            // Get the person's name from the URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const person = urlParams.get("person");

            if (person === "mike" && password === mikePassword) {
                currentUser = "mike";
                addPoints();
            } else if (person === "elisa" && password === elisaPassword) {
                currentUser = "elisa";
                addPoints();
            } else {
                alert("Incorrect password. Please try again.");
            }
        }

        function redirectToPointsPage(person) {
            window.location.href = `https://highon-code.github.io/points-counter.github.io/points.html?person=${person}`;
        }

        // On page load, fetch and display the points from local storage
        window.onload = function () {
            // Get the person's name from the URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const person = urlParams.get("person");

            // Check if the person's name is valid
            if (person === "mike" || person === "elisa") {
                document.getElementById("personName").textContent = person.toUpperCase();
                document.getElementById("pointsButton").textContent = `Add Points for ${person.toUpperCase()}`;
                document.getElementById("pointsButton").onclick = addPoints;
                document.getElementById("points").textContent = localStorage.getItem(person + "Points") || 0;
            } else {
                alert("Invalid person's name.");
            }
        };
