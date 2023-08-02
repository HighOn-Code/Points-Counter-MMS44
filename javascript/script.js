function addPoints(person) {
            // Check if the person's name is valid
            if (person !== "mike" && person !== "elisa") {
                alert("Invalid person's name.");
                return;
            }

            // Check if the button has been used today
            const lastUsedDate = localStorage.getItem(person + "LastUsed");
            const today = new Date().toISOString().slice(0, 10);

            if (lastUsedDate === today) {
                alert("You can use this button only once a day.");
                return;
            }

            const clickCount = parseInt(localStorage.getItem(person + "ClickCount")) || 0;

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

        window.onload = function () {
            const urlParams = new URLSearchParams(window.location.search);
            const person = urlParams.get("person");

            // Check if the person's name is valid
            if (person === "mike" || person === "elisa") {
                document.getElementById("personName").textContent = person.toUpperCase();
                document.getElementById("pointsButton").onclick = function() { addPoints(person); };
                document.getElementById("points").textContent = localStorage.getItem(person + "Points") || 0;
            } else {
                alert("Invalid person's name.");
            }
        };
