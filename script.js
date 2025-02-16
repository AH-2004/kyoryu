/****************************
 * USER DATA & LOCAL STORAGE
 ****************************/
let userData = JSON.parse(localStorage.getItem("userData")) || {
    currency: 0,
    purchasedAccessories: {
      necklace: false,
      strawhat: false
    },
    purchasedFood: {
      ambrosia: 0,
      carrot: 0,
      chicken: 0
    },
    // Default the dino's happiness if not present
    happiness: 50 
  };
  
  function saveUserData() {
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  
  function updateCurrencyDisplay() {
    const currencyDisplay = document.getElementById("currency-display");
    if (currencyDisplay) {
      currencyDisplay.textContent = `Currency: $${userData.currency}`;
    }
    saveUserData();
  }
  updateCurrencyDisplay();
  
  /****************************
   * HOMEPAGE NAVIGATION LOGIC
   ****************************/
  const homepage = document.getElementById("homepage");
  const containerIds = [
    "pomodoro-container",
    "flashcards-container",
    "something1-container", // Shop
    "something2-container", // To-Do
    "whitenoise-container",
    "dinosaur-container"    // Dino
  ];
  
  function switchContainer(targetId) {
    if (targetId === "homepage") {
      homepage.style.display = "block";
      containerIds.forEach((id) => {
        const container = document.getElementById(id);
        if (container) container.style.display = "none";
      });
    } else {
      homepage.style.display = "none";
      containerIds.forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
          container.style.display = (id === targetId) ? "block" : "none";
        }
      });
      // If user just opened the Dino section, init it
      if (targetId === "dinosaur-container") {
        initDinoSection();
      }
    }
  }
  
  const homepageNavMap = {
    "nav-pomodoro-home": "pomodoro-container",
    "nav-flashcards-home": "flashcards-container",
    "nav-something1-home": "something1-container",
    "nav-something2-home": "something2-container",
    "nav-dinosaur-home": "dinosaur-container",
    "nav-whitenoise-home": "whitenoise-container"
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
    "nav-something1": "something1-container",
    "nav-something2": "something2-container",
    "nav-whitenoise": "whitenoise-container",
    "nav-dinosaur": "dinosaur-container"
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
   * BACK TO HOME BUTTON (Shop)
   ****************************/
  const backHomeShopBtn = document.getElementById("back-home-shop");
  if (backHomeShopBtn) {
    backHomeShopBtn.addEventListener("click", () => {
      switchContainer("homepage");
    });
  }
  
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
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
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
  
  lockInButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 25 * 60;
    updateTimerDisplay(timeInSeconds);
  });
  
  shortBreakButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timeInSeconds = 5 * 60;
    updateTimerDisplay(timeInSeconds);
  });
  
  longBreakButton.addEventListener("click", function () {
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
   * SHOP LOGIC
   ****************************/
  const shopItems = document.querySelectorAll(".shop-item");
  shopItems.forEach((item) => {
    item.addEventListener("click", () => {
      const itemName = item.getAttribute("data-name"); // e.g., Ambrosia, Carrot, Chicken, Necklace, Strawhat
      const itemPrice = parseInt(item.getAttribute("data-price"), 10);
  
      // Accessories => buy once
      if (itemName === "Necklace" || itemName === "Strawhat") {
        const key = itemName.toLowerCase();
        if (userData.purchasedAccessories[key]) {
          alert(`You have already purchased ${itemName}.`);
          return;
        }
      }
  
      // Check currency
      if (userData.currency >= itemPrice) {
        userData.currency -= itemPrice;
  
        // If food item, increment
        if (itemName === "Ambrosia" || itemName === "Carrot" || itemName === "Chicken") {
          let key = itemName.toLowerCase();
          userData.purchasedFood[key] = (userData.purchasedFood[key] || 0) + 1;
          alert(`You purchased ${itemName} for $${itemPrice}. Total ${itemName} bought: ${userData.purchasedFood[key]}`);
        }
  
        // If accessory
        if (itemName === "Necklace" || itemName === "Strawhat") {
          userData.purchasedAccessories[itemName.toLowerCase()] = true;
          item.style.opacity = "0.5";
          item.style.pointerEvents = "none";
          alert(`You purchased ${itemName} for $${itemPrice}.`);
        }
  
        updateCurrencyDisplay();
      } else {
        alert(`Not enough currency! You need $${itemPrice - userData.currency} more.`);
      }
    });
  });
  
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
        if (!tasks[index].completed) {
          tasks[index].completed = true;
          userData.currency += 10;
          updateCurrencyDisplay();
        }
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
  const noiseButtons = document.querySelectorAll(".noise-button");
  noiseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filePath = button.getAttribute("data-file");
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      currentAudio = new Audio(filePath);
      currentAudio.play();
    });
  });
  
  const stopNoiseBtn = document.getElementById("stop-noise-btn");
  if (stopNoiseBtn) {
    stopNoiseBtn.addEventListener("click", () => {
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    });
  }
  
  /****************************
   * DINO SECTION LOGIC
   ****************************/
  function initDinoSection() {
    updateDinoState();
  }
  
  // Re-check happiness and accessories, pick correct GIF
  function updateDinoState() {
    // Clamp happiness 0..100
    userData.happiness = Math.max(0, Math.min(100, userData.happiness));
  
    // Update meter
    const fill = document.getElementById("happiness-fill");
    fill.style.width = userData.happiness + "%";
  
    // Decide which range
    let range = "sad";
    if (userData.happiness > 66) {
      range = "happy";
    } else if (userData.happiness > 33) {
      range = "idle";
    } // else remain "sad"
  
    // Check accessories
    const hasNecklace = userData.purchasedAccessories.necklace;
    const hasStrawhat = userData.purchasedAccessories.strawhat;
  
    // Choose correct GIF
    let fileName = "";
    if (range === "happy") {
      if (hasNecklace && hasStrawhat) {
        fileName = "Happy_necklace_strawhat_.gif";
      } else if (hasNecklace) {
        fileName = "Happy_necklace_.gif";
      } else if (hasStrawhat) {
        fileName = "Happy_strawhat.gif";
      } else {
        fileName = "happy.gif";
      }
    } else if (range === "idle") {
      if (hasNecklace && hasStrawhat) {
        fileName = "Idle_strawhatnecklace.gif";
      } else if (hasNecklace) {
        fileName = "Idle_necklace.gif";
      } else if (hasStrawhat) {
        fileName = "Idle_strawhat.gif";
      } else {
        fileName = "Idle_.gif";
      }
    } else {
      // sad
      if (hasNecklace && hasStrawhat) {
        fileName = "Sad_necklace_straw_hat.gif";
      } else if (hasNecklace) {
        fileName = "Sad_necklace.gif";
      } else if (hasStrawhat) {
        fileName = "Sad_strawhat.gif";
      } else {
        fileName = "Sad.gif";
      }
    }
  
    const dinoGif = document.getElementById("dino-gif");
    dinoGif.src = "Gifs/" + fileName;
  
    saveUserData();
  }
  
  // Feed Carrot (+10%)
  function feedCarrot() {
    if (userData.purchasedFood.carrot > 0) {
      userData.purchasedFood.carrot--;
      userData.happiness += 10;
      alert("You fed the dino a carrot! (+10% happiness)");
    } else {
      alert("No carrots left!");
    }
    updateDinoState();
  }
  
  // Feed Chicken (+20%)
  function feedChicken() {
    if (userData.purchasedFood.chicken > 0) {
      userData.purchasedFood.chicken--;
      userData.happiness += 20;
      alert("You fed the dino a chicken! (+20% happiness)");
    } else {
      alert("No chicken left!");
    }
    updateDinoState();
  }
  
  // Feed Ambrosia (+50%)
  function feedAmbrosia() {
    if (userData.purchasedFood.ambrosia > 0) {
      userData.purchasedFood.ambrosia--;
      userData.happiness += 50;
      alert("You fed the dino an ambrosia! (+50% happiness)");
    } else {
      alert("No ambrosia left!");
    }
    updateDinoState();
  }
  
  // Pet Dino (+5%)
  function petDino() {
    userData.happiness += 5;
    alert("You petted the dino! (+5% happiness)");
    updateDinoState();
  }
  
  // Hook up the Dino action buttons
  const carrotBtn = document.getElementById("feed-carrot-btn");
  const chickenBtn = document.getElementById("feed-chicken-btn");
  const ambrosiaBtn = document.getElementById("feed-ambrosia-btn");
  const petBtn = document.getElementById("pet-dino-btn");
  
  if (carrotBtn) carrotBtn.addEventListener("click", feedCarrot);
  if (chickenBtn) chickenBtn.addEventListener("click", feedChicken);
  if (ambrosiaBtn) ambrosiaBtn.addEventListener("click", feedAmbrosia);
  if (petBtn) petBtn.addEventListener("click", petDino);
  