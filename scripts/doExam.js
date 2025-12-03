
const exam = JSON.parse(localStorage.getItem("examData"));
const container = document.getElementById("questions-container");
const form = document.getElementById("exam-form");
const examTitleEl = document.getElementById("exam-title");
const examDescEl = document.querySelector(".info-exam");
<<<<<<< HEAD
const MIN_PASS_GRADE = 3.2;

const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const createQuestionElement = (question, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");

    div.innerHTML = `
    <h3>${index + 1}. ${capitalize(question.title)}</h3>
    ${question.options
            .map(
                (option, optionIndex) => `
=======
const MIN_PASS_GRADE = 3.2; 

const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const createQuestionElement = (question, index) => {
  const div = document.createElement("div");
  div.classList.add("question-block");

  div.innerHTML = `
    <h3>${index + 1}. ${capitalize(question.title)}</h3>
    ${question.options
      .map(
        (option, optionIndex) => `
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd
      <label>
        <input type="radio" name="question${index}" value="${optionIndex}" required>
        ${capitalize(option)}
      </label><br>
    `
<<<<<<< HEAD
            )
            .join("")}
  `;
    return div;
};

const renderExam = () => {
    examTitleEl.textContent = "Examen de " + capitalize(exam.title) || "Examen sin título";
    examDescEl.textContent = capitalize(exam.description) || "Sin descripción";

    exam.questions.forEach((question, index) => {
        const questionEl = createQuestionElement(question, index);
        container.appendChild(questionEl);
    });
};

const calculateScore = () => {
    let score = 0;
    let total = 0;

    exam.questions.forEach((q, index) => {
        if (!q.title || q.correctAnswer < 0 || !q.options?.length) return;

        total++;

        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && parseInt(selected.value, 10) === q.correctAnswer) {
            score++;
        }
    });

    return { score, total };
};

const showModal = (message, estado, type = "success") => {
    const modal = document.getElementById("result-modal");
    const modalMessage = document.getElementById("modal-message");
    const modalEstado = document.getElementById("modal-estado");
=======
      )
      .join("")}
  `;
  return div;
};

const renderExam = () => {
  examTitleEl.textContent = "Examen de " + capitalize(exam.title) || "Examen sin título";
  examDescEl.textContent = capitalize(exam.description) || "Sin descripción";

  exam.questions.forEach((question, index) => {
    const questionEl = createQuestionElement(question, index);
    container.appendChild(questionEl);
  });
};

const calculateScore = () => {
  let score = 0;
  let total = 0;

  exam.questions.forEach((q, index) => {
    if (!q.title || q.correctAnswer < 0 || !q.options?.length) return;

    total++;
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd

    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    if (selected && parseInt(selected.value, 10) === q.correctAnswer) {
      score++;
    }
  });

<<<<<<< HEAD
    document.getElementById("retry-btn").onclick = () => window.location.reload();
    document.getElementById("back-btn").onclick = () => (window.location.href = "../index.html");
};

const handleSubmit = (e) => {
    e.preventDefault();

    const { score, total } = calculateScore();

    if (total === 0) {
        alert("No hay preguntas válidas para calificar.");
        return;
    }

    const calificacion = ((score / total) * 5).toFixed(2);
    const estado = calificacion >= MIN_PASS_GRADE ? "¡Aprobado! 🎉" : "Reprobado 😔";
    const mensaje = `Tu calificación final es ${calificacion}/5.00`;

    showModal(mensaje, estado, calificacion >= MIN_PASS_GRADE ? "success" : "error");
=======
  return { score, total };
};

const showModal = (message, estado, type = "success") => {
  const modal = document.getElementById("result-modal");
  const modalMessage = document.getElementById("modal-message");
  const modalEstado = document.getElementById("modal-estado");

  modalMessage.textContent = message;
  modalEstado.textContent = estado;
  modal.classList.add("show");

  document.getElementById("retry-btn").onclick = () => window.location.reload();
  document.getElementById("back-btn").onclick = () => (window.location.href = "../index.html");
};

const handleSubmit = (e) => {
  e.preventDefault();

  const { score, total } = calculateScore();

  if (total === 0) {
    alert("No hay preguntas válidas para calificar.");
    return;
  }

  const calificacion = ((score / total) * 5).toFixed(2);
  const estado = calificacion >= MIN_PASS_GRADE ? "¡Aprobado! 🎉" : "Reprobado 😔";
  const mensaje = `Tu calificación final es ${calificacion}/5.00`;

  showModal(mensaje, estado, calificacion >= MIN_PASS_GRADE ? "success" : "error");
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd
};

form.addEventListener("submit", handleSubmit);

<<<<<<< HEAD
renderExam();
=======
renderExam();
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd
