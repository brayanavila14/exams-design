const container = document.getElementById("questions-container");
const submitBtn = document.getElementById("submitButton");
const nextBtn = document.getElementById("next-question");
const prevBtn = document.getElementById("prev-question");
const pageInfo = document.getElementById("page-info");

const openModalBtn = document.getElementById("open-exam-modal-btn");
const examModal = document.getElementById("exam-modal");
const modalTitle = document.getElementById("modal-exam-title");
const modalDesc = document.getElementById("modal-exam-description");
const saveExamInfoBtn = document.getElementById("save-exam-info");

let currentPage = 0;
<<<<<<< HEAD
let examFormulated = JSON.parse(localStorage.getItem("examFormulated")) || false;
let exams = JSON.parse(localStorage.getItem("examData")) || {
    title: "",
    description: "",
    questions: [],
};

// --- LocalStorage y Modal ---
const saveToLocalStorage = () => localStorage.setItem("examData", JSON.stringify(exams));
const saveFormulated = () => localStorage.setItem("examFormulated", "true");
const showModal = () => (examModal.style.display = "flex");
const hideModal = () => (examModal.style.display = "none");

openModalBtn.addEventListener("click", showModal);

saveExamInfoBtn.addEventListener("click", () => {
    const title = modalTitle.value.trim();
    const desc = modalDesc.value.trim();

    if (!title || !desc) return alert("Complete título y descripción.");

    exams.title = title;
    exams.description = desc;
    saveToLocalStorage();
    examFormulated = true;
    saveFormulated();
    hideModal();
=======
let examFormulated =
  JSON.parse(localStorage.getItem("examFormulated")) || false;
let exams = JSON.parse(localStorage.getItem("examData")) || {
  title: "",
  description: "",
  questions: [],
};

const saveToLocalStorage = () =>
  localStorage.setItem("examData", JSON.stringify(exams));
const saveFormulated = () => localStorage.setItem("examFormulated", "true");

const showModal = () => (examModal.style.display = "flex");
const hideModal = () => (examModal.style.display = "none");

openModalBtn.addEventListener("click", showModal);
saveExamInfoBtn.addEventListener("click", () => {
  const title = modalTitle.value.trim();
  const desc = modalDesc.value.trim();

  if (!title || !desc) return alert("Complete título y descripción.");

  exams.title = title;
  exams.description = desc;
  saveToLocalStorage();
  examFormulated = true;
  saveFormulated();
  hideModal();
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd
});

if (!examFormulated) showModal();

<<<<<<< HEAD
// --- Lógica de Opciones (Corrección de botones) ---

// 1. Función para organizar visualmente: Renumera y decide qué botones mostrar
const updateOptionUI = (block, questionIndex) => {
    const options = block.querySelectorAll(".option-container");

    options.forEach((opt, i) => {
        // Renumerar placeholder
        const input = opt.querySelector(".option-input");
        input.placeholder = `Opción ${i + 1}`;

        // Arreglar nombre del radio para que solo se seleccione uno por pregunta
        const radio = opt.querySelector(".correct-option-radio");
        radio.name = `correct-option-${questionIndex}`;

        // Lógica de botones + y -
        const addBtn = opt.querySelector(".add-option");
        const removeBtn = opt.querySelector(".remove-option");

        // El botón "+" SOLO aparece en la ÚLTIMA opción
        if (i === options.length - 1) {
            addBtn.style.display = "inline-block";
        } else {
            addBtn.style.display = "none";
        }

        // El botón "-" NO aparece si es la única opción
        if (options.length === 1) {
            removeBtn.style.display = "none";
        } else {
            removeBtn.style.display = "inline-block";
        }
    });
};

// 2. Crear elemento de opción (simple, sin lógica de índice aquí)
const createOptionElement = () => {
    const div = document.createElement("div");
    div.classList.add("option-container");
    div.innerHTML = `
        <input type="radio" class="correct-option-radio">
        <input type="text" class="option-input input" required>
        <button type="button" class="remove-option">-</button>
        <button type="button" class="add-option">+</button>
    `;
    return div;
};

// --- Creación de Preguntas ---

const createQuestionBlock = (questionData = null) => {
    const block = document.createElement("div");
    block.classList.add("question-block");
    // Agregamos un div .options-list para separar las opciones del resto
    block.innerHTML = `
        <div class="question-head">
            <label>Pregunta:</label>
            <button type="button" class="delete-question"><i class="fas fa-trash-alt"></i></button>
        </div>
        <input type="text" name="question-text" class="input" required>
        <label>Opciones:</label>
        <div class="options-list"></div>
=======
const createOptionElement = (index) => {
  const div = document.createElement("div");
  div.classList.add("option-container");
  div.innerHTML = `
        <input type="radio" class="correct-option-radio" name="correct-option-${currentPage}">
        <input type="text" class="option-input input" placeholder="Opción ${
          index + 1
        }" required>
        <button type="button" class="remove-option">-</button>
        <button type="button" class="add-option">+</button>
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd
    `;
  return div;
};

<<<<<<< HEAD
    const optionsList = block.querySelector(".options-list");
    const questionText = block.querySelector('input[name="question-text"]');

    if (questionData) {
        questionText.value = questionData.title;
        questionData.options.forEach((opt, i) => {
            const option = createOptionElement();
            option.querySelector(".option-input").value = opt;
            if (i === questionData.correctAnswer)
                option.querySelector(".correct-option-radio").checked = true;
            optionsList.appendChild(option);
        });
    } else {
        optionsList.appendChild(createOptionElement());
    }

    // Calculamos el índice para organizar los radios y placeholders
    const currentIdx = container.querySelectorAll(".question-block").length;
    updateOptionUI(block, currentIdx);

    return block;
};

// --- Navegación y Renderizado ---

const showQuestion = (index) => {
    const questions = container.querySelectorAll(".question-block");

    // Protección por si se borra todo
    if (questions.length === 0) {
        pageInfo.textContent = "0 de 0";
        return;
    }

    questions.forEach(
        (q, i) => (q.style.display = i === index ? "block" : "none")
    );
    currentPage = index;
    pageInfo.textContent = `Pregunta ${index + 1} de ${questions.length}`;
    prevBtn.disabled = index === 0;
};

const saveCurrentQuestion = () => {
    const currentBlock = container.querySelectorAll(".question-block")[currentPage];
    if (!currentBlock) return; // Validación extra

    const title = currentBlock.querySelector('input[name="question-text"]').value.trim();
    const options = Array.from(
        currentBlock.querySelectorAll(".option-input")
    ).map((o) => o.value.trim());
    const correctAnswer = Array.from(
        currentBlock.querySelectorAll(".correct-option-radio")
    ).findIndex((r) => r.checked);

    exams.questions[currentPage] = { title, options, correctAnswer };
    saveToLocalStorage();
};

const validateExamInfo = () => exams.title && exams.description;

const validateQuestion = (block) => {
    const title = block.querySelector('input[name="question-text"]').value.trim();
    const options = Array.from(block.querySelectorAll(".option-input")).map((o) =>
        o.value.trim()
    );
    const correctAnswer = Array.from(
        block.querySelectorAll(".correct-option-radio")
    ).some((r) => r.checked);

    if (!title) return alert("Debe escribir la pregunta.") && false;
    if (options.length < 2) return alert("Debe agregar al menos 2 opciones.") && false;
    if (options.some((o) => !o)) return alert("Complete todas las opciones.") && false;
    if (!correctAnswer) return alert("Seleccione una respuesta correcta.") && false;
    return true;
};

// --- Event Listeners Globales ---

document.addEventListener("click", (e) => {
    // Solo nos interesa si el click fue dentro de un bloque de pregunta
    const block = e.target.closest(".question-block");
    if (!block) return;

    const questionIndex = Array.from(container.querySelectorAll(".question-block")).indexOf(block);
    const optionsList = block.querySelector(".options-list");

    // Agregar Opción
    if (e.target.classList.contains("add-option")) {
        const questionInput = block.querySelector('input[name="question-text"]');
        const currentOptions = block.querySelectorAll(".option-container");
        const lastOptionInput = currentOptions[currentOptions.length - 1].querySelector(".option-input");

        if (!questionInput.value.trim()) return alert("Debe escribir la pregunta antes de agregar opciones.");
        if (!lastOptionInput.value.trim()) return alert("Complete la opción antes de agregar otra.");

        // Agregar
        optionsList.appendChild(createOptionElement());
        // Reorganizar botones y números
        updateOptionUI(block, questionIndex);
    }

    // Eliminar Opción
    if (e.target.classList.contains("remove-option")) {
        const option = e.target.closest(".option-container");
        const allOptions = block.querySelectorAll(".option-container");

        if (allOptions.length <= 1) return; // Seguridad extra

        option.remove();
        // Reorganizar botones y números tras borrar
        updateOptionUI(block, questionIndex);
    }

    // Eliminar Pregunta
    if (e.target.closest(".delete-question")) {
        if (container.querySelectorAll(".question-block").length <= 1)
            return alert("No se puede eliminar la última pregunta.");

        if (!confirm("¿Desea eliminar esta pregunta?")) return;

        const blockToRemove = e.target.closest(".question-block");
        const indexToRemove = Array.from(container.querySelectorAll(".question-block")).indexOf(blockToRemove);

        blockToRemove.remove();
        exams.questions.splice(indexToRemove, 1);
        saveToLocalStorage();

        // Ajustar navegación tras borrar
        const newTotal = container.querySelectorAll(".question-block").length;
        const newPage = Math.min(currentPage, newTotal - 1);
        showQuestion(newPage);
    }
});

// --- Botones de Navegación ---

nextBtn.addEventListener("click", () => {
    const block = container.querySelectorAll(".question-block")[currentPage];
    if (!validateExamInfo() || !validateQuestion(block)) return;
    saveCurrentQuestion();

    const questions = container.querySelectorAll(".question-block");
    if (currentPage === questions.length - 1) {
        // Crear nueva pregunta
        container.appendChild(createQuestionBlock());
    }
    showQuestion(currentPage + 1);
});

prevBtn.addEventListener("click", () => {
    saveCurrentQuestion();
    showQuestion(currentPage - 1);
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validateExamInfo()) return alert("Complete información del examen.");

    const allQuestions = container.querySelectorAll(".question-block");
    for (let i = 0; i < allQuestions.length; i++) {
        const block = allQuestions[i];
        currentPage = i;
        if (!validateQuestion(block)) {
            showQuestion(i); // Mostrar la pregunta con error
            return;
        }
        saveCurrentQuestion(); // Guardar si es válida
    }

    exams.questions = exams.questions.filter(
        (q) => q.title && q.options.length >= 2
    );
    saveToLocalStorage();
    alert("Examen guardado correctamente!");
    window.location.replace("../index.html");
});

// --- Inicialización (Corregida para evitar '1 de 2') ---

const init = () => {
    // 1. Limpiamos el HTML para que no haya duplicados ni basura vieja
    container.innerHTML = "";

    modalTitle.value = exams.title;
    modalDesc.value = exams.description;

    // 2. Cargamos preguntas existentes o creamos la primera limpia
    if (exams.questions.length === 0) {
        container.appendChild(createQuestionBlock());
    } else {
        exams.questions.forEach((q) =>
            container.appendChild(createQuestionBlock(q))
        );
    }

    // 3. Reseteamos a la página 0
    currentPage = 0;
    showQuestion(currentPage);
};

init();
=======
const createQuestionBlock = (questionData = null) => {
  const block = document.createElement("div");
  block.classList.add("question-block");
  block.innerHTML = `
        <div class="question-head">
            <label>Pregunta:</label>
            <button type="button" class="delete-question"><i class="fas fa-trash-alt"></i></button>
        </div>
        <input type="text" name="question-text" class="input" required>
        <label>Opciones:</label>
    `;
  const questionText = block.querySelector('input[name="question-text"]');
  if (questionData) {
    questionText.value = questionData.title;
    questionData.options.forEach((opt, i) => {
      const option = createOptionElement(i);
      option.querySelector(".option-input").value = opt;
      if (i === questionData.correctAnswer)
        option.querySelector(".correct-option-radio").checked = true;
      block.appendChild(option);
    });
  } else {
    block.appendChild(createOptionElement(0));
  }
  return block;
};

const showQuestion = (index) => {
  const questions = container.querySelectorAll(".question-block");
  questions.forEach(
    (q, i) => (q.style.display = i === index ? "block" : "none")
  );
  currentPage = index;
  pageInfo.textContent = `Pregunta ${index + 1} de ${questions.length}`;
  prevBtn.disabled = index === 0;
};

const saveCurrentQuestion = () => {
  const currentBlock =
    container.querySelectorAll(".question-block")[currentPage];
  const title = currentBlock
    .querySelector('input[name="question-text"]')
    .value.trim();
  const options = Array.from(
    currentBlock.querySelectorAll(".option-input")
  ).map((o) => o.value.trim());
  const correctAnswer = Array.from(
    currentBlock.querySelectorAll(".correct-option-radio")
  ).findIndex((r) => r.checked);

  exams.questions[currentPage] = { title, options, correctAnswer };
  saveToLocalStorage();
};

const validateExamInfo = () => exams.title && exams.description;

const validateQuestion = (block) => {
  const title = block.querySelector('input[name="question-text"]').value.trim();
  const options = Array.from(block.querySelectorAll(".option-input")).map((o) =>
    o.value.trim()
  );
  const correctAnswer = Array.from(
    block.querySelectorAll(".correct-option-radio")
  ).some((r) => r.checked);

  if (!title) return alert("Debe escribir la pregunta.") && false;
  if (options.length < 2)
    return alert("Debe agregar al menos 2 opciones.") && false;
  if (options.some((o) => !o))
    return alert("Complete todas las opciones.") && false;
  if (!correctAnswer)
    return alert("Seleccione una respuesta correcta.") && false;
  return true;
};

const renumberOptions = (block, questionIndex) => {
  const options = block.querySelectorAll(".option-container");
  options.forEach((opt, i) => {
    const radio = opt.querySelector(".correct-option-radio");
    const input = opt.querySelector(".option-input");

    if (radio) radio.name = `correct-option-${questionIndex}`;
    if (input) input.placeholder = `Opción ${i + 1}`;
  });
};

document.addEventListener("click", (e) => {
  const block = e.target.closest(".question-block");
  const questionIndex = Array.from(container.querySelectorAll(".question-block")).indexOf(block);

  if (e.target.classList.contains("add-option")) {
    const questionInput = block.querySelector('input[name="question-text"]');
    const optionsContainer = e.target.parentElement.parentElement;
    const lastOption = optionsContainer.querySelectorAll(".option-container");

    if (!questionInput.value.trim()) return alert("Debe escribir la pregunta antes de agregar opciones.");
    if (lastOption[lastOption.length - 1].querySelector(".option-input").value.trim() === "") return alert("Complete la opción antes de agregar otra.");

    e.target.remove();
    optionsContainer.appendChild(createOptionElement(lastOption.length));

    renumberOptions(block, questionIndex);
  }

  if (e.target.classList.contains("remove-option")) {
    const option = e.target.parentElement;
    const optionsContainer = option.parentElement;
    if (optionsContainer.querySelectorAll(".option-container").length === 1)
      return;
    option.remove();

    renumberOptions(block, questionIndex);
  }

  if (e.target.closest(".delete-question")) {
    if (container.querySelectorAll(".question-block").length <= 1)
      return alert("No se puede eliminar la última pregunta.");
    if (!confirm("¿Desea eliminar esta pregunta?")) return;
    const blockToRemove = e.target.closest(".question-block");
    const index = Array.from(
      container.querySelectorAll(".question-block")
    ).indexOf(blockToRemove);
    blockToRemove.remove();
    exams.questions.splice(index, 1);
    saveToLocalStorage();
    showQuestion(
      Math.min(
        currentPage,
        container.querySelectorAll(".question-block").length - 1
      )
    );
  }
});

nextBtn.addEventListener("click", () => {
  const block = container.querySelectorAll(".question-block")[currentPage];
  if (!validateExamInfo() || !validateQuestion(block)) return;
  saveCurrentQuestion();

  const questions = container.querySelectorAll(".question-block");
  if (currentPage === questions.length - 1)
    container.appendChild(createQuestionBlock());
  showQuestion(currentPage + 1);
});

prevBtn.addEventListener("click", () => {
  saveCurrentQuestion();
  showQuestion(currentPage - 1);
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateExamInfo()) return alert("Complete información del examen.");

  const allQuestions = container.querySelectorAll(".question-block");
  for (let i = 0; i < allQuestions.length; i++) {
    const block = allQuestions[i];
    currentPage = i;
    if (!validateQuestion(block)) return;
    saveCurrentQuestion();
  }

  exams.questions = exams.questions.filter(
    (q) => q.title && q.options.length >= 2
  );
  saveToLocalStorage();
  alert("Examen guardado correctamente!");
  window.location.replace("../index.html");
});

const init = () => {
  modalTitle.value = exams.title;
  modalDesc.value = exams.description;

  if (exams.questions.length === 0)
    container.appendChild(createQuestionBlock());
  else
    exams.questions.forEach((q) =>
      container.appendChild(createQuestionBlock(q))
    );

  showQuestion(currentPage);
};

init();
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd
