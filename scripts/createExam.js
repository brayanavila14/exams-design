const container = document.getElementById("questions-container");
const submitButton = document.getElementById("submitButton");
const titleExam = document.getElementById("exam-title");
const descriptionExam = document.getElementById("exam-description");
const addQuestionBtn = document.getElementById("add-question");
const savedDraft = localStorage.getItem("examDraft") || null;
let examDraft = {
    title: "",
    description: "",
    questions: []
};

function saveDraft() {
    localStorage.setItem("examDraft", JSON.stringify(examDraft));
}

function saveFinalExam() {
    localStorage.setItem('finalExam', JSON.stringify(examDraft));
}

function createQuestionBlock(q = null) {
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';

    const questionText = q ? q.question : "";
    const correctAnswer = q ? q.correctAnswer : "";
    const options = q && q.options && q.options.length > 0 ? q.options : [""];

    const optionsHTML = options.map((opt, index) => `

      <div class="option-container">
        <input type="text" name="options" class="option-input input" value="${opt}" placeholder="Opción ${index + 1}" required>
        ${index === options.length - 1 ? '<button type="button" class="add-option">+</button>' : ""}
      </div>

    `).join("");

    questionBlock.innerHTML = `
    <label>Pregunta:</label>
    <input type="text" name="question-text" class="input" value="${questionText}" required>

    <label>Respuesta Correcta:</label>
    <input type="text" name="correct-answer" class="input" value="${correctAnswer}" required>

    <label>Opciones:</label>
    ${optionsHTML}
  `;

    return questionBlock;
}

if (savedDraft) {
    examDraft = JSON.parse(savedDraft);
    titleExam.value = examDraft.title;
    descriptionExam.value = examDraft.description;
    container.innerHTML = "";

    if (examDraft.questions.length > 0) {
        examDraft.questions.forEach(q => {
            const block = createQuestionBlock(q);
            container.appendChild(block);
        });
    } else {
        container.appendChild(createQuestionBlock());
    }

} else {
    if (!container.querySelector('.question-block')) {
        container.appendChild(createQuestionBlock());
    }
}

function updateDraftFromDOM() {
    examDraft.title = titleExam.value.trim();
    examDraft.description = descriptionExam.value.trim();
    examDraft.questions = [];

    const questionBlocks = document.querySelectorAll('.question-block');

    questionBlocks.forEach(block => {
        const questionText = block.querySelector("input[name='question-text']").value.trim();
        const correctAnswer = block.querySelector("input[name='correct-answer']").value.trim();
        const optionsInputs = block.querySelectorAll(".option-input");
        const options = Array.from(optionsInputs).map(input => input.value.trim());

        examDraft.questions.push({
            question: questionText || "",
            correctAnswer: correctAnswer || "",
            options: options.length > 0 ? options : [""]
        });
    });

    saveDraft();
}

function validationExam(block) {
    const questionText = block.querySelector("input[name='question-text']").value.trim();
    const correctAnswer = block.querySelector("input[name='correct-answer']").value.trim();
    const options = Array.from(block.querySelectorAll(".option-input")).map(input => input.value.trim()).filter(opt => opt !== "");

    if (!titleExam.value.trim() || !descriptionExam.value.trim()) {
        alert("Por favor, completa el título y la descripción del examen.");
        return false;
    }

    if (titleExam.value.trim().length < 15) {
        alert("El título debe tener mínimo 15 caracteres.");
        return false;
    }

    if (descriptionExam.value.trim().length < 30) {
        alert("La descripción debe tener mínimo 30 caracteres.");
        return false;
    }

    if (!questionText) {
        alert("Indica la pregunta primero.");
        return false;
    }

    if (questionText.length < 5) {
        alert("La pregunta debe tener al menos 5 caracteres.");
        return false;
    }

    if (!correctAnswer) {
        alert("Debes indicar la respuesta correcta.");
        return false;
    }

    return { correctAnswer, options };
}

function validationExamFinish(block) {
    const data = validationExam(block);
    if (!data) return false;
    const { correctAnswer, options } = data;

    if (options.length < 2) {
        alert("Debes agregar al menos dos opciones.");
        return false;
    }

    if (!options.includes(correctAnswer)) {
        alert("La respuesta correcta debe estar entre las opciones.");
        return false;
    }

    return true;
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const checked = validationExamFinish(container.querySelector('.question-block:last-child'));
    if (checked === false) return;

    saveFinalExam();
    alert("✅ Examen final guardado correctamente.");
    localStorage.removeItem("examDraft");
    container.innerHTML = "";
    titleExam.value = "";
    descriptionExam.value = "";
    const newBlock = createQuestionBlock();
    container.appendChild(newBlock);
});

container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('add-option')) return;
    const checked = validationExam(container.querySelector('.question-block:last-child'));
    if (checked === false) return;

    const currentQuestionBlock = e.target.closest('.question-block');
    const currentOptions = currentQuestionBlock.querySelectorAll('.option-input');
    const lastOptionValue = currentOptions[currentOptions.length - 1].value.trim();
    if (!lastOptionValue) {
        alert("Escribe algo en la opción antes de agregar.");
        return;
    }
    const nextOptionNumber = currentOptions.length + 1;

    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'options';
    input.className = 'option-input input';
    input.placeholder = `Opción ${nextOptionNumber}`;
    input.required = true;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'add-option';
    btn.textContent = '+';

    optionDiv.appendChild(input);
    optionDiv.appendChild(btn);

    currentQuestionBlock.appendChild(optionDiv);
    e.target.remove();

    updateDraftFromDOM();
});

addQuestionBtn.addEventListener('click', () => {
    const checked = validationExamFinish(container.querySelector('.question-block:last-child'));
    if (checked === false) return;
    const newBlock = createQuestionBlock();
    container.appendChild(newBlock);
    updateDraftFromDOM();
});

document.addEventListener('input', (e) => {
    if (e.target.classList.contains('input')) {
        updateDraftFromDOM();
    }
});
