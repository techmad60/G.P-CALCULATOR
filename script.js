var swiper = new Swiper(".mySwiper", {
  autoplay: {
    delay: 1500, // Adjust the delay value (in milliseconds) as needed
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  speed: 800, // Adjust the speed of the transition (in milliseconds) as needed
  loop: true, // Enable loop mode for seamless autoplay transition
});
swiper.autoplay.stop(); //Paused the swiper

//Created object "sections" and mapped keys to the DOM elements.
const sections = {
  section0: document.querySelector("#section-zero"),
  section1: document.querySelector("#section-one"),
  section2: document.querySelector("#section-two"),
  section3: document.querySelector("#section-three"),
  section4: document.querySelector("#section-four"),
};

////Created object "buttons" and mapped keys to the DOM elements.
const buttons = {
  landingpageButton: document.querySelector("#landing-page-btn"),
  section1Button: document.querySelector("#section-one-button"),
  section2Button: document.querySelector("#section-two-button"),
  section2Gobackbutton: document.querySelector("#section-two-go-back-button"),
  section3Gobackbutton: document.querySelector("#section-three-go-back-button"),
  addCoursebtn: document.querySelector("#addCoursebtn"),
  generateBtn: document.querySelector("#generateBtn"),
  showHelp: document.querySelector("#show-help"),
  closeHelp: document.querySelector("#close-help"),
  
};


const formInfo = document.getElementById("formInfo");
const myName = document.querySelector("#myName");
const myDept = document.querySelector("#myDept");
const unitLoadSelect = document.getElementById("unitLoad");
const gradeSelect = document.getElementById("grade");
const greetingOutput = document.querySelector("#greeting");


//Hide and display different sections
formInfo.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkFormFields()) {
    showSection(sections.section3, sections.section2);
  }
});

buttons.landingpageButton.addEventListener("click", ()=> {
  swiper.autoplay.start();
  showSection(sections.section1, sections.section0)
  
});

buttons.section1Button.addEventListener("click", () => {
  showSection(sections.section2, sections.section1);
});

buttons.section2Gobackbutton.addEventListener("click", () => {
  showSection(sections.section1, sections.section2);
});

buttons.section3Gobackbutton.addEventListener("click", () => {
  showSection(sections.section2, sections.section3);
});

buttons.showHelp.addEventListener("click", () => {
  showSection(sections.section4, sections.section3);
});

buttons.closeHelp.addEventListener("click", () => {
  showSection(sections.section3, sections.section4);
});

buttons.section2Button.addEventListener("click", () => {
  NameandDept(); 
  if (unitLoadSelect.value === " " || gradeSelect.value === " ") {
    alert("Comrade, no fear, God dey for you" + " 🙂 "   );
    generateBtn.disabled = true; //button is disabled initially.
    generateBtn.style.backgroundColor = "#b8bbc6"
  }
});

//function to hide and display different sections.
function showSection(show, hide) {
  show.style.display = "flex";
  hide.style.display = "none";
};

//function to check if formfield is empty.
function checkFormFields() {
  if (myName.value.trim() === "" || myDept.value.trim() === "") {
    alert("Please fill out all fields!");
    return false;
  }
  return true;
};

//function that assigns the 'capitalizeFirstLetter()'to the myName and myDept ID's and also uses the trim() to remove leading and trailing whitespace.
function NameandDept() {
  const inputname = capitalizeFirstLetter(myName.value.trim());
  const inputdept = capitalizeFirstLetter(myDept.value.trim());
  greetingOutput.textContent = `Welcome ${inputname} of ${inputdept} Department`; 
}

//function that capitalizes the first letter of the name and department
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//function for deleting the nearest form
function deleteCourseForm(event) {
  const formToDelete = event.target.closest("form");
  event.preventDefault(); //prevents the default behaviour
  formToDelete.remove(); //removes the "formToDelete" from the DOM.
}

//function that adds a new course form to the DOM.
function addCourseForm() {
  const container = document.getElementById("course-forms");
  const template = document.getElementById("course-form-template");

  const newForm = template.cloneNode(true);//creates a deep clone of the template element using the cloneNode() method. The true argument indicates that all descendants of the template element should also be cloned.
  
  container.appendChild(newForm);//appends the newForm element as a child to the container element.

  //resets the selected option to the first option in the dropdown.
  newForm.querySelector("#unitLoad").selectedIndex = 0;
  newForm.querySelector("#grade").selectedIndex = 0;

  const deleteBtn = newForm.querySelector("#delete-btn");

  deleteBtn.addEventListener("click", deleteCourseForm);//deletes the newform when clicked.
}

function calculateGPA() {
  const courseForms = document.querySelectorAll("#course-forms form");
  let totalScore = 0;
  let totalUnitLoad = 0;

  courseForms.forEach((form) => {
    const unitLoad = parseInt(form.querySelector("#unitLoad").value);
    const grade = parseInt(form.querySelector("#grade").value);

    if (!isNaN(unitLoad) && !isNaN(grade)) {
      totalScore += unitLoad * grade;
      totalUnitLoad += unitLoad;
    }
  });

  if (totalUnitLoad > 0) {
    const gpa = totalScore / totalUnitLoad;
    return gpa.toFixed(2); //rounds GPA to two decimal places.
  }

  return 0;
}

function generateResults() {
  const gpa = calculateGPA();
  totalScoreSpan.textContent = gpa;
  totalUnitLoadSpan.textContent = calculateTotalUnitLoad().toString();
  gpSpan.textContent = gpa;
}


function Alert() {
  const gpa = calculateGPA();
  if (gpa >= 4.5) {
    alert("IDAN!!!, you're doing well" +" 👌 " );
  } else if (gpa >= 3.50) {
    alert("Comrade, your mind de, put small effort sha" + " 💪 ");
  } else if (gpa >= 2.40) {
    alert("Comrade, hmmmmm!" + " 🤐 " );
  } else if (gpa >= 1.50) {
    alert("Comrade, what's flying colours?" + " 🌈 "  );
  } else {
    alert("Idan, you fail shaa, but you still gat this!!!" + " ✊ "  );
  }
}

function  Remark() {
const gpa = calculateGPA();
  const gradeRemark = document.getElementById("gradeRemark");
  if (gpa >= 4.5) {
    gradeRemark.textContent = "You're on first class!";
  } else if (gpa >= 3.50) {
    gradeRemark.textContent = "You're on second class upper!";
  } else if (gpa >= 2.40) {
    gradeRemark.textContent = "You're on second class lower!";
  } else if (gpa >= 1.50) {
    gradeRemark.textContent = "You're on third class!";
  } else {
    gradeRemark.textContent = "You failed!";
  }
}

//Calculates total unitload
function calculateTotalUnitLoad() {
  const courseForms = document.querySelectorAll("#course-forms form");
  let totalUnitLoad = 0;

  courseForms.forEach((form) => {
    const unitLoad = parseInt(form.querySelector("#unitLoad").value);

    if (!isNaN(unitLoad)) {
      totalUnitLoad += unitLoad;
    }
  });

  return totalUnitLoad;
  
}

courseForm.addEventListener("submit", function (event) {
  event.preventDefault();
});


generateBtn.addEventListener("click", ()=> {
  generateResults();
  Remark();
  setTimeout(Alert, 400);

});

addCoursebtn.addEventListener("click", () => {
  addCourseForm();
  if(unitLoadSelect.value !== " " || gradeSelect.value !== " " ) {
    generateBtn.disabled = false;
    generateBtn.style.backgroundColor = "#4169E1"
  }
});

const copyIcons = document.querySelectorAll(".copy-icon");
//function that copies the text, when the copy-icon is clicked.
copyIcons.forEach(function(icon) {
  icon.addEventListener("click", function() {
    var textToCopy = this.parentNode.textContent.trim();

    navigator.clipboard.writeText(textToCopy)
      .then(function() {
        alert("Text copied!");
      })
      .catch(function(error) {
        console.error("Unable to copy text: ", error);
      });
  });
})

window.addEventListener('DOMContentLoaded', function() {
  const isMobile = window.matchMedia("(max-width: 565px)").matches;
  if (!isMobile) {
      alert("This product is not available for your device.");
  }
});







