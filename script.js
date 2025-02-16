/****************************
 * HOMEPAGE NAVIGATION LOGIC
 ****************************/
const homepage = document.getElementById("homepage");
const containerIds = [
  "pomodoro-container",
  "flashcards-container",
  "something1-container",
  "something2-container",
  "whitenoise-container"
];

function switchContainer(targetId) {
  if (targetId === "homepage") {
    // Show homepage and hide other containers
    homepage.style.display = "block";
    containerIds.forEach((id) => {
      const container = document.getElementById(id);
      if (container) container.style.display = "none";
    });
  } else {
    // Hide homepage, show target container
    homepage.style.display = "none";
    containerIds.forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.style.display = (id === targetId) ? "block" : "none";
      }
    });
  }
}

// Map homepage section IDs to container IDs
const homepageNavMap = {
  "nav-pomodoro-home": "pomodoro-container",
  "nav-flashcards-home": "flashcards-container",
  "nav-something1-home": "something1-container", // Shop
  "nav-something2-home": "something2-container", // To-Do
  "nav-dinosaur-home": "something-dinosaur",      // If needed for dinosaur
  "nav-whitenoise-home": "whitenoise-container"  // White Noise
};

document.querySelectorAll(".section").forEach((section) => {
  section.addEventListener("click", () => {
    const sectionId = section.id;
    const targetContainer = homepageNavMap[sectionId];
    if (targetContainer) {
      switchContainer(targetContainer);
    }
  });
});

/****************************
 * NAVBAR LOGIC
 ****************************/
const navMap = {
  "nav-home": "homepage",
  "nav-pomodoro": "pomodoro-container",
  "nav-flashcards": "flashcards-container",
  "nav-something2": "something2-container", // To-Do
  "nav-whitenoise": "whitenoise-container"
};

const navIcons = document.querySelectorAll(".nav-icon");
navIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const iconId = icon.id;
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
let timeInSeconds = 25 * 60;

function updateTimerDisplay(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer() {
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

function showFlashcard() {
  if (flashcards.length === 0) {
    flashcardPlaceholder.style.display = "block";
    flashcardDisplay.style.display = "none";
  } else {
    flashcardPlaceholder.style.display = "none";
    flashcardDisplay.style.display = "flex";
    flashcardFront.textContent = flashcards[currentFlashcardIndex].front;
    flashcardFront.style.display = "block";
    flashcardBack.textContent = flashcards[currentFlashcardIndex].back;
    flashcardBack.style.display = "none";
  }
}

previousButton.addEventListener("click", () => {
  if (flashcards.length > 0) {
    currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
    showFlashcard();
  }
});

nextButton.addEventListener("click", () => {
  if (flashcards.length > 0) {
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    showFlashcard();
  }
});

showAnswerButton.addEventListener("click", () => {
  if (flashcards.length > 0) {
    if (flashcardBack.style.display === "none") {
      flashcardFront.style.display = "none";
      flashcardBack.style.display = "block";
    } else {
      flashcardFront.style.display = "block";
      flashcardBack.style.display = "none";
    }
  }
});

removeFlashcardButton.addEventListener("click", () => {
  if (flashcards.length > 0) {
    flashcards.splice(currentFlashcardIndex, 1);
    if (currentFlashcardIndex >= flashcards.length) {
      currentFlashcardIndex = Math.max(0, flashcards.length - 1);
    }
    showFlashcard();
  }
});

showFlashcard();

/****************************
 * TO-DO LIST LOGIC
 ****************************/
const todoBox = document.getElementById("todo-box");
const todoPlaceholder = document.getElementById("todo-placeholder");
const todoList = document.getElementById("todo-list");
const addTaskBtn = document.getElementById("add-task-btn");

let tasks = [];

function updateTodoDisplay() {
  if (tasks.length === 0) {
    todoPlaceholder.style.display = "block";
  } else {
    todoPlaceholder.style.display = "none";
  }
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (task.completed ? " completed" : "");
    li.textContent = task.text;

    const btnContainer = document.createElement("div");
    btnContainer.className = "todo-buttons";

    const checkBtn = document.createElement("button");
    checkBtn.className = "todo-btn";
    checkBtn.innerHTML = "&#10003;";
    checkBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      updateTodoDisplay();
    });

    const trashBtn = document.createElement("button");
    trashBtn.className = "todo-btn";
    trashBtn.innerHTML = "&#128465;";
    trashBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      updateTodoDisplay();
    });

    btnContainer.appendChild(checkBtn);
    btnContainer.appendChild(trashBtn);
    li.appendChild(btnContainer);

    todoList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const taskText = prompt("Enter a new task:");
  if (taskText && taskText.trim() !== "") {
    tasks.push({ text: taskText.trim(), completed: false });
    updateTodoDisplay();
  }
});

updateTodoDisplay();

/****************************
 * WHITE NOISE LOGIC
 ****************************/
let currentAudio = null;

// Select all noise buttons
const noiseButtons = document.querySelectorAll(".noise-button");
noiseButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filePath = button.getAttribute("data-file");

    // Stop any currently playing audio
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Play the new noise
    currentAudio = new Audio(filePath);
    currentAudio.play();
  });
});

// Stop button
const stopNoiseBtn = document.getElementById("stop-noise-btn");
if (stopNoiseBtn) {
  stopNoiseBtn.addEventListener("click", () => {
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  });
}
