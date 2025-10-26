// Simulación de preguntas (más adelante podemos cargarlas desde localStorage)
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

// Manejo del formulario
document.getElementById("exam-form").addEventListener("submit", (e) => {
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
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `${name}, tu puntaje final es ${score}/${total}`;
    resultDiv.classList.add("show");
});
