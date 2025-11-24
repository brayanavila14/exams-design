const titleExam = document.getElementById("exam-title");
const descriptionExam = document.getElementById("exam-description");
const container = document.getElementById("questions-container");
const submitButton = document.getElementById("submitButton");
const nextBtn = document.getElementById("next-question");
const prevBtn = document.getElementById("prev-question");
const pageInfo = document.getElementById("page-info");

let currentPage = 0;
let question = {
	title: "",
	correctAnswer: "",
	options: [],
};

let exams = {
	title: "",
	description: "",
	questions: [],
};
document.addEventListener("click", function (e) {
	if (e.target.classList.contains("add-option")) {
		const container = e.target.closest(".option-container").parentNode;
		let count = container.querySelectorAll(".option-container").length + 1;

		const newOption = document.createElement("div");
		newOption.classList.add("option-container");

		newOption.innerHTML = `
            <input type="radio" name="correct-option" class="correct-option-radio" />
            
            <input
                type="text"
                name="options"
                class="option-input input"
                placeholder="Opción ${count}"
                required
            />

            <button type="button" class="add-option">+</button>
            <button type="button" class="remove-option">-</button>
        `;

		container.appendChild(newOption);
	}

	if (e.target.classList.contains("remove-option")) {
		e.target.parentNode.remove();
	}
});

function getQuestionBlocks() {
	return document.querySelectorAll(".question-block");
}

function showQuestion(index) {
	const questions = getQuestionBlocks();

	questions.forEach((q, i) => {
		q.style.display = i === index ? "block" : "none";
	});

	pageInfo.textContent = `Pregunta ${index + 1} de ${questions.length}`;

	prevBtn.disabled = index === 0;
}

function createNewQuestionBlock(questionIndex) {
	const block = document.createElement("div");
	block.classList.add("question-block");

	block.innerHTML = `
        <label>Pregunta:</label>
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

function saveCurrentQuestion() {
	const questions = getQuestionBlocks();
	const currentQuestionBlock = questions[currentPage];
	const questionTitle = currentQuestionBlock.querySelector(
		'input[name="question-text"]'
	).value;
	const options = [];
	let correctAnswer = null;
	const optionInputs = currentQuestionBlock.querySelectorAll(".option-input");
	const correctRadios = currentQuestionBlock.querySelectorAll(
		".correct-option-radio"
	);

	optionInputs.forEach((input, i) => {
		options.push(input.value);
		if (correctRadios[i].checked) {
			correctAnswer = i;
		}
	});

	exams.questions[currentPage] = {
		title: questionTitle,
		correctAnswer: correctAnswer,
		options: options,
	};
}

nextBtn.addEventListener("click", () => {
	saveCurrentQuestion();

	let questions = getQuestionBlocks();
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

showQuestion(currentPage);
