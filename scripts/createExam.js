const container = document.getElementById('questions-container');
const submitButton = document.getElementById('submitButton');
const titleExam = document.getElementById('exam-title');
const descriptionExam = document.getElementById('exam-description');

let exam = {
    title: "",
    description: "",
    questions: []
};

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!titleExam.value.trim() || !descriptionExam.value.trim()) {
        alert("Por favor, completa el título y la descripción del examen.");
        return;
    }
    exam.title = titleExam.value.trim();
    exam.description = descriptionExam.value.trim();
    exam.questions = [];

    const questionBlocks = document.querySelectorAll('.question-block');

    questionBlocks.forEach(block => {
        const questionText = block.querySelector("input[name='question-text']").value.trim();
        const correctAnswer = block.querySelector("input[name='correct-answer']").value.trim();
        const optionsInputs = block.querySelectorAll(".option-input");
        const options = Array.from(optionsInputs).map(input => input.value.trim()).filter(opt => opt !== "");

        if (!questionText || !correctAnswer || options.length === 0) {
            alert("Por favor, completa todos los campos de las preguntas.");
            return;
        }

        exam.questions.push({
            question: questionText,
            correctAnswer: correctAnswer,
            options: options
        });
    });

    console.log("Examen creado:", JSON.stringify(exam, null, 2));
    alert("Examen creado correctamente, ya lo puedes ir a realizar.");
});

container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('add-option')) return;

    const currentQuestionBlock = e.target.closest('.question-block');
    if (!currentQuestionBlock) return;

    const currentOptions = currentQuestionBlock.querySelectorAll('.option-input');
    const lastOption = currentOptions[currentOptions.length - 1];
    const correctAnswer = currentQuestionBlock.querySelector("input[name='correct-answer']").value.trim();
    const questionText = currentQuestionBlock.querySelector("input[name='question-text']").value.trim();

    if (!lastOption.value.trim()) {
        alert("Por favor, ingresa una opción válida (mínimo 2 caracteres).");
        return;
    }

    if (!questionText.trim() || questionText.trim().length < 5) {
        alert("Por favor, ingresa una pregunta válida (mínimo 5 caracteres).");
        return;
    }

    if (!correctAnswer.trim()) {
        alert("Por favor, ingresa la respuesta correcta antes de agregar más opciones.");
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
});

document.getElementById('add-question').addEventListener('click', () => {
    const lastQuestionBlock = container.querySelector('.question-block:last-child');

    if (lastQuestionBlock) {
        const questionText = lastQuestionBlock.querySelector("input[name='question-text']").value.trim();
        const correctAnswer = lastQuestionBlock.querySelector("input[name='correct-answer']").value.trim();
        const options = lastQuestionBlock.querySelectorAll(".option-input");
        const filledOptions = Array.from(options).filter(opt => opt.value.trim() !== "").length;

        if (!questionText) {
            alert("Por favor, completa la pregunta antes de agregar una nueva.");
            return;
        }
        if (!correctAnswer) {
            alert("Por favor, agrega la respuesta correcta antes de continuar.");
            return;
        }
        if (filledOptions < 2) {
            alert("Debes agregar al menos dos opciones de respuesta.");
            return;
        }
        const optionValues = Array.from(options).map(opt => opt.value.trim());
        if (!optionValues.includes(correctAnswer)) {
            alert("La respuesta correcta debe estar entre las opciones de respuesta.");
            return;
        }
    }

    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';

    questionBlock.innerHTML = `
        <label>Pregunta:</label>
        <input type="text" name="question-text" class="input" required>

        <label>Respuesta Correcta:</label>
        <input type="text" name="correct-answer" class="input" required>

        <label>Opciones:</label>
        <div class="option-container">
            <input type="text" name="options" class="option-input input" placeholder="Opción 1" required>
            <button type="button" class="add-option">+</button>
        </div>
    `;

    container.appendChild(questionBlock);
});

