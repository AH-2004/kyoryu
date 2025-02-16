/****************************
 * HOMEPAGE NAVIGATION LOGIC
 ****************************/

// Data
let data ={
	pet: {
		state: 0,
		states: ["neutral", "happy", "sad"],
		cosmetics: [],
		meters: {
			happiness: {
				value: 20
			}
		}
	}
}

const updateMeters = () => {
	Object.keys(meters).forEach((meter) => {
		let element = document.querySelector(`#${meter} div`);
		element.style = `width: ${meters[meter].value}%`
	});
};

window.localStorage.setItem("data", JSON.stringify(data));

const homepage = document.getElementById("homepage");
const containerIds = [
	"pomodoro-container",
	"flashcards-container",
	"shop-container",
	"todo-container"
];

// Hide all containers, show only the target
function switchContainer(targetId) {
	homepage.style.display = "none"; // Hide homepage
	containerIds.forEach((id) => {
		const container = document.getElementById(id);
		if (container) {
			container.style.display = (id === targetId) ? "block" : "none";
		}
	});
}

// Map homepage section IDs to container IDs
const homepageNavMap = {
	"nav-pomodoro-home": "pomodoro-container",
	"nav-flashcards-home": "flashcards-container",
	"nav-something1-home": "something1-container",
	"nav-something2-home": "something2-container"
};

// Add click handlers to homepage sections
document.querySelectorAll(".section").forEach((section) => {
	section.addEventListener("click", () => {
		const sectionId = section.id; // e.g., "nav-pomodoro-home"
		const targetContainer = homepageNavMap[sectionId];
		if (targetContainer) {
			switchContainer(targetContainer);
		}
	});
});

/****************************
 * NAVBAR LOGIC
 ****************************/
// Map icon ID -> container ID
const navMap = {
	"nav-pomodoro": "pomodoro-container",
	"nav-flashcards": "flashcards-container",
	"nav-something1": "something1-container",
	"nav-something2": "something2-container"
};

// Select all nav-icon elements (from all navbars)
const navIcons = document.querySelectorAll(".nav-icon");

// Add a click handler to each icon
navIcons.forEach((icon) => {
	icon.addEventListener("click", () => {
		const iconId = icon.id; // e.g. "nav-pomodoro"
		const targetContainer = navMap[iconId];
		if (targetContainer) {
			switchContainer(targetContainer);
		}
	});
});

/****************************
 * POMODORO TIMER LOGIC
 ****************************/
let timerDisplay = document.getElementById("timer");
let lockInButton = document.getElementById("lock-in-btn");
let shortBreakButton = document.getElementById("short-break-btn");
let longBreakButton = document.getElementById("long-break-btn");
let startButton = document.getElementById("start-button");

let timerInterval;
let timeInSeconds = 25 * 60; // Default 25 minutes

// Update the timer display
function updateTimerDisplay(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Start the timer
function startTimer() {
    // Prevent multiple intervals
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (timeInSeconds <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
            timerInterval = null;
            return;
        }
        timeInSeconds--;
        updateTimerDisplay(timeInSeconds);
    }, 1000);
}

// Button event listeners
startButton.addEventListener("click", startTimer);

lockInButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 25 * 60;
    updateTimerDisplay(timeInSeconds);
});

shortBreakButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 5 * 60;
    updateTimerDisplay(timeInSeconds);
});

longBreakButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 15 * 60;
    updateTimerDisplay(timeInSeconds);
});

/****************************
 * FLASHCARDS LOGIC
 ****************************/
let flashcards = [];
let currentFlashcardIndex = 0;

const flashcardPlaceholder = document.getElementById("flashcard-placeholder");
const flashcardDisplay = document.getElementById("flashcard-display");
const flashcardFront = document.getElementById("flashcard-front");
const flashcardBack = document.getElementById("flashcard-back");
const addFlashcardButton = document.getElementById("add-flashcard-btn");
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");
const showAnswerButton = document.getElementById("show-answer-btn");
const removeFlashcardButton = document.getElementById("remove-flashcard-btn");

// Add a new flashcard
addFlashcardButton.addEventListener("click", () => {
    const front = prompt("Enter the front of the flashcard:");
    const back = prompt("Enter the back of the flashcard:");
    if (front && back) {
        flashcards.push({ front, back });
        if (flashcards.length === 1) {
            currentFlashcardIndex = 0;
            showFlashcard();
        }
    }
});

// Show the current flashcard
function showFlashcard() {
    if (flashcards.length === 0) {
        flashcardPlaceholder.style.display = "block";
        flashcardDisplay.style.display = "none";
    } else {
        flashcardPlaceholder.style.display = "none";
        flashcardDisplay.style.display = "flex";
        flashcardFront.textContent = flashcards[currentFlashcardIndex].front;
        flashcardFront.style.display = "block"; // Ensure the front is visible
        flashcardBack.textContent = flashcards[currentFlashcardIndex].back;
        flashcardBack.style.display = "none"; // Hide the back initially
    }
}

// Navigate to the previous flashcard
previousButton.addEventListener("click", () => {
    if (flashcards.length > 0) {
        currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
        showFlashcard();
    }
});

// Navigate to the next flashcard
nextButton.addEventListener("click", () => {
    if (flashcards.length > 0) {
        currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
        showFlashcard();
    }
});

// Toggle between front and back of the flashcard
showAnswerButton.addEventListener("click", () => {
    if (flashcards.length > 0) {
        if (flashcardBack.style.display === "none") {
            // Show the back and hide the front
            flashcardFront.style.display = "none";
            flashcardBack.style.display = "block";
        } else {
            // Show the front and hide the back
            flashcardFront.style.display = "block";
            flashcardBack.style.display = "none";
        }
    }
});

// Remove the current flashcard
removeFlashcardButton.addEventListener("click", () => {
    if (flashcards.length > 0) {
        flashcards.splice(currentFlashcardIndex, 1);
        if (currentFlashcardIndex >= flashcards.length) {
            currentFlashcardIndex = Math.max(0, flashcards.length - 1);
        }
        showFlashcard();
    }
});

// Initialize flashcards display
showFlashcard();
