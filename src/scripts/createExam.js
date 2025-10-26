const container = document.getElementById('questions-container');
const submitButton = document.getElementById('submitButton');
const titleExam = document.getElementById('exam-title');
const descriptionExam = document.getElementById('exam-description');
const questionsBlock = document.querySelectorAll('.question-block');

let count = 1;
let exam = {
    title: '',
    description: '',
    questions: []
};

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    exam.title = titleExam.value;
    exam.description = descriptionExam.value;
    exam.questions = [];

    const questionBlocks = document.querySelectorAll('.question-block');

    questionBlocks.forEach(block => {
        const questionText = block.querySelector('input[name="question-text"]').value;
        const correctAnswer = block.querySelector('input[name="correct-answer"]').value;
        const optionsInputs = block.querySelectorAll('.option-input');
        const options = Array.from(optionsInputs).map(input => input.value);
        exam.questions.push({
            question: questionText,
            correctAnswer: correctAnswer,
            options: options.filter(option => option !== '') // Filtramos opciones vacías
        });
    });

    console.log('Examen creado:', JSON.stringify(exam, null, 2));

});
container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('add-option')) return;
    const currentQuestionBlock = e.target.closest('.question-block');
    if (!currentQuestionBlock) return;
    e.target.remove();

    count++;
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'options';
    input.id = `option-${count}`;
    input.className = 'option-input input';
    input.placeholder = `Opción ${count}`;
    input.required = true;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'add-option';
    btn.textContent = '+';

    optionDiv.appendChild(input);
    optionDiv.appendChild(btn);
    currentQuestionBlock.appendChild(optionDiv);
});