const container = document.getElementById("questions-container");
const submitButton = document.getElementById("submitButton");
const nextBtn = document.getElementById("next-question");
const prevBtn = document.getElementById("prev-question");
const pageInfo = document.getElementById("page-info");

const openExamModalBtn = document.getElementById("open-exam-modal");
const examModal = document.getElementById("exam-modal");
const closeExamModal = document.getElementById("close-exam-modal");
const modalExamTitle = document.getElementById("modal-exam-title");
const modalExamDescription = document.getElementById("modal-exam-description");
const saveExamInfoBtn = document.getElementById("save-exam-info");

let currentPage = 0;
let currentQuestionBlock = container.querySelector(".question-block");

let exams = {
  title: "",
  description: "",
  questions: [],
};

/* -------------------- LOCAL STORAGE -------------------- */
function saveToLocalStorage() {
  localStorage.setItem("examData", JSON.stringify(exams));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("examData");
  if (data) {
    exams = JSON.parse(data);
    modalExamTitle.value = exams.title;
    modalExamDescription.value = exams.description;

    container.innerHTML = "";
    exams.questions.forEach((q, idx) => {
      const block = createNewQuestionBlock(idx);
      block.querySelector('input[name="question-text"]').value = q.title;
      const optionContainer = block.querySelector(".option-container");
      optionContainer.remove(); // quitamos la opción inicial
      q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.classList.add("option-container");
        div.innerHTML = `
          <input type="radio" class="correct-option-radio" ${i === q.correctAnswer ? "checked" : ""}/>
          <input type="text" class="option-input input" value="${opt}" placeholder="Opción ${i+1}" required />
          <button type="button" class="remove-option">-</button>
          <button type="button" class="add-option">+</button>
        `;
        block.appendChild(div);
      });
      container.appendChild(block);
    });
  }
}

/* -------------------- MODAL EXAM -------------------- */
openExamModalBtn.addEventListener("click", () => {
  modalExamTitle.value = exams.title;
  modalExamDescription.value = exams.description;
  examModal.style.display = "block";
});

closeExamModal.addEventListener("click", () => {
  examModal.style.display = "none";
});

saveExamInfoBtn.addEventListener("click", () => {
  const title = modalExamTitle.value.trim();
  const desc = modalExamDescription.value.trim();
  if (!title || !desc) {
    alert("Debe completar título y descripción del examen.");
    return;
  }
  exams.title = title;
  exams.description = desc;
  saveToLocalStorage();
  examModal.style.display = "none";
});

/* -------------------- UTILS -------------------- */
function renumber(container) {
  container.querySelectorAll(".option-container").forEach((opt, i) => {
    const input = opt.querySelector(".option-input");
    if (input) input.placeholder = `Opción ${i + 1}`;
  });
}

function updateButtons(container) {
  const options = container.querySelectorAll(".option-container");
  options.forEach((opt, i) => {
    const plus = opt.querySelector(".add-option");
    if (plus) plus.remove();
    const minus = opt.querySelector(".remove-option");
    if (minus) minus.style.display = options.length === 1 ? "none" : "inline-block";
    if (i === options.length - 1) {
      const add = document.createElement("button");
      add.type = "button";
      add.textContent = "+";
      add.classList.add("add-option");
      opt.appendChild(add);
    }
  });
}

function showQuestion(index) {
  const questions = container.querySelectorAll(".question-block");
  questions.forEach((q, i) => (q.style.display = i === index ? "block" : "none"));
  currentQuestionBlock = questions[index];
  pageInfo.textContent = `Pregunta ${index + 1} de ${questions.length}`;
  prevBtn.disabled = index === 0;
}

/* -------------------- CREAR PREGUNTA -------------------- */
function createNewQuestionBlock(questionIndex) {
  const block = document.createElement("div");
  block.classList.add("question-block");
  block.innerHTML = `
    <div class="question-head" style="display:flex; justify-content:space-between; align-items:center;">
      <label>Pregunta:</label>
      <button type="button" class="delete-question" title="Eliminar Pregunta">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <input type="text" name="question-text" class="input" required />
    <label>Opciones:</label>
    <div class="option-container">
      <input type="radio" name="correct-option-${questionIndex}" class="correct-option-radio" />
      <input type="text" name="options" class="option-input input" placeholder="Opción 1" required />
      <button type="button" class="add-option">+</button>
    </div>
  `;
  return block;
}

/* -------------------- GUARDAR PREGUNTA -------------------- */
function saveCurrentQuestion() {
  if (!currentQuestionBlock) return;
  const questionTitle = currentQuestionBlock.querySelector('input[name="question-text"]').value;
  const optionInputs = currentQuestionBlock.querySelectorAll(".option-input");
  const correctRadios = currentQuestionBlock.querySelectorAll(".correct-option-radio");
  const options = Array.from(optionInputs).map(input => input.value);
  const correctAnswer = Array.from(correctRadios).findIndex(r => r.checked);
  exams.questions[currentPage] = { title: questionTitle, options, correctAnswer };
  saveToLocalStorage();
}

/* -------------------- VALIDACIONES -------------------- */
function validateExamInfo() {
  if (!exams.title || !exams.description) {
    alert("Debe completar la información del examen primero.");
    return false;
  }
  return true;
}

function validateCurrentQuestion() {
  if (!validateExamInfo()) return false;
  const title = currentQuestionBlock.querySelector('input[name="question-text"]').value.trim();
  const optionInputs = currentQuestionBlock.querySelectorAll(".option-input");
  const radios = currentQuestionBlock.querySelectorAll(".correct-option-radio");
  if (!title) { alert("Debe escribir la pregunta."); return false; }

  let hasCorrect = false, filledOptions = 0, emptyOption = false;
  optionInputs.forEach((opt, i) => {
    if (!opt.value.trim()) emptyOption = true; else filledOptions++;
    if (radios[i].checked) hasCorrect = true;
  });

  if (emptyOption) { alert("Debe completar todas las opciones."); return false; }
  if (filledOptions < 2) { alert("Debe agregar al menos 2 opciones."); return false; }
  if (!hasCorrect) { alert("Debe seleccionar una respuesta correcta."); return false; }
  return true;
}

/* -------------------- EVENTOS GLOBAL -------------------- */
document.addEventListener("click", function (e) {
  /* Agregar opción */
  if (e.target.classList.contains("add-option")) {
    const containerOptions = e.target.closest(".option-container").parentNode;
    const lastOptionInput = containerOptions.querySelectorAll(".option-input");
    if (lastOptionInput[lastOptionInput.length-1].value.trim() === "") { 
      alert("Complete la opción antes de agregar otra."); return; 
    }
    e.target.remove();
    const newOption = document.createElement("div");
    newOption.classList.add("option-container");
    const count = containerOptions.querySelectorAll(".option-container").length + 1;
    newOption.innerHTML = `
      <input type="radio" class="correct-option-radio" />
      <input type="text" class="option-input input" placeholder="Opción ${count}" required />
      <button type="button" class="remove-option">-</button>
      <button type="button" class="add-option">+</button>
    `;
    containerOptions.appendChild(newOption);
    renumber(containerOptions);
  }

  /* Eliminar opción */
  if (e.target.classList.contains("remove-option")) {
    const option = e.target.parentNode;
    const containerOptions = option.parentNode;
    option.remove();
    updateButtons(containerOptions);
    renumber(containerOptions);
  }

  /* Eliminar pregunta */
  if (e.target.closest(".delete-question")) {
    currentQuestionBlock = e.target.closest(".question-block");
    const questions = container.querySelectorAll(".question-block");

    if (questions.length <= 1) {
      alert("No se puede eliminar la última pregunta.");
      return;
    }

    if (confirm("¿Desea eliminar esta pregunta?")) {
      const indexToRemove = Array.from(questions).indexOf(currentQuestionBlock);
      currentQuestionBlock.remove();
      exams.questions.splice(indexToRemove, 1);
      saveToLocalStorage();
      currentPage = Math.min(currentPage, container.querySelectorAll(".question-block").length - 1);
      showQuestion(currentPage);
    }
  }
});

/* -------------------- NAVEGACIÓN -------------------- */
nextBtn.addEventListener("click", () => {
  if (!validateExamInfo() || !validateCurrentQuestion()) return;
  saveCurrentQuestion();

  const questions = container.querySelectorAll(".question-block");
  if (currentPage === questions.length - 1) {
    const newBlock = createNewQuestionBlock(questions.length);
    container.appendChild(newBlock);
  }
  currentPage++;
  showQuestion(currentPage);
});

prevBtn.addEventListener("click", () => {
  saveCurrentQuestion();
  currentPage--;
  showQuestion(currentPage);
});

/* -------------------- GUARDAR EXAM -------------------- */
submitButton.addEventListener("click", e => {
  if (!validateExamInfo()) { e.preventDefault(); return; }
  const questions = container.querySelectorAll(".question-block");
  questions.forEach((_, idx) => {
    currentPage = idx;
    currentQuestionBlock = questions[idx];
    saveCurrentQuestion();
  });
  if (exams.questions.length === 0) { alert("Debe agregar al menos una pregunta"); e.preventDefault(); return; }
  console.log(exams);
  alert("Examen guardado correctamente!");
});

/* -------------------- INICIALIZACIÓN -------------------- */
loadFromLocalStorage();
showQuestion(currentPage);
