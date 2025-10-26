// Simulación de preguntas (más adelante podemos cargarlas desde localStorage)
const exam = {
    title: "Examen de JavaScript",
    descriptions: "Responde las siguientes preguntas sobre JavaScript."
}
const questions = [
    {
        text: "¿Cuál es el lenguaje que se ejecuta en el navegador?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: "JavaScript"
    },
    {
        text: "¿Qué etiqueta se usa para enlazar un archivo JS en HTML?",
        options: ["<link>", "<js>", "<script>", "<src>"],
        correct: "<script>"
    },
    {
        text: "¿Cuál de los siguientes es un tipo de dato en JavaScript?",
        options: ["String", "Number", "Boolean", "Todas las anteriores"],
        correct: "Todas las anteriores"
    }
];

const container = document.getElementById("questions-container");
const form = document.getElementById("exam-form");
const examTitle = document.getElementById("exam-title");
const examDesc = document.querySelector(".info-exam");

// Configurar título y descripción del examen
examTitle.textContent = exam.title;
examDesc.textContent = exam.descriptions;

// Mostrar preguntas
questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");
    div.innerHTML = `
    <h3>${index + 1}. ${q.text}</h3>
    ${q.options.map(opt => `
      <label>
        <input type="radio" name="question${index}" value="${opt}" required>
        ${opt}
      </label><br>
    `).join("")}
  `;
    container.appendChild(div);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("student-name").value.trim();
    let score = 0;

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && selected.value === q.correct) {
            score++;
        }
    });

    const total = questions.length;
    const calificacion = ((score / total) * 5).toFixed(2);

    const mensaje = `${name}, tu calificación final es ${calificacion}/5 — ${calificacion >= 3.2 ? "¡Aprobado! 🎉" : "Reprobado 😔"}`;

    showResult(mensaje, calificacion >= 3.2 ? "success" : "error");
});

function showResult(message, type = "success") {
    const result = document.getElementById("result");
    result.textContent = message;
    result.className = `result show ${type}`;

    setTimeout(() => {
        result.classList.remove("show");
    }, 5000);
}
