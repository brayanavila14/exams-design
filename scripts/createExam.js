const container = document.getElementById('questions-container');
const submitButton = document.getElementById('submitButton');
const titleExam = document.getElementById('exam-title');
const descriptionExam = document.getElementById('exam-description');
const addQuestionBtn = document.getElementById('add-question');
const savedDraft = localStorage.getItem('examDraft') || null;
let examDraft = {
    title: "",
    description: "",
    questions: []
};

function saveDraft() {
    localStorage.setItem('examDraft', JSON.stringify(examDraft));
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

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!titleExam.value.trim() || !descriptionExam.value.trim()) {
        alert("Por favor, completa el título y la descripción del examen.");
        return;
    }

    updateDraftFromDOM();
    saveFinalExam();
    alert("✅ Examen final guardado correctamente. Puedes recargar sin perder datos.");
});

container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('add-option')) return;

    const currentQuestionBlock = e.target.closest('.question-block');
    const currentOptions = currentQuestionBlock.querySelectorAll('.option-input');
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
    const newBlock = createQuestionBlock();
    container.appendChild(newBlock);
    updateDraftFromDOM();
});

document.addEventListener('input', (e) => {
    if (e.target.classList.contains('input')) {
        updateDraftFromDOM();
    }
});
