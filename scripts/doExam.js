const exam = JSON.parse(localStorage.getItem("finalExam"));
const container = document.getElementById("questions-container");
const form = document.getElementById("exam-form");
const examTitle = document.getElementById("exam-title");
const examDesc = document.querySelector(".info-exam");

examTitle.textContent = capitalize(exam.title) || "Examen sin título";
examDesc.textContent = capitalize(exam.description) || "Sin descripción";

exam.questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");
    div.innerHTML = `
    <h3>${index + 1}. ${capitalize(q.question)}</h3>
        ${q.options.map((opt) => `
            <label>
            <input type="radio" name="question${index}" value="${opt}" required>
            ${capitalize(opt)}
            </label><br>
      `).join("")}
    `;
    container.appendChild(div);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0;

    exam.questions.forEach((q, index) => {
        const selected = document.querySelector(
            `input[name="question${index}"]:checked`
        );
        if (selected && selected.value === q.correctAnswer) {
            score++;
        }
    });

    const total = exam.questions.length;
    const calificacion = ((score / total) * 5).toFixed(2);

    const mensaje = `Tu calificación final es ${calificacion}/5.00`;
    const estado = calificacion >= 3.2 ? "¡Aprobado! 🎉" : "Reprobado 😔";

    showModal(mensaje, estado, calificacion >= 3.2 ? "success" : "error");
});

function showModal(message, estado, type = "success") {
    const modal = document.getElementById("result-modal");
    const modalMessage = document.getElementById("modal-message");
    const modalEstado = document.getElementById("modal-estado");

    modalMessage.textContent = message;
    modalEstado.textContent = estado;
    modal.classList.add("show");

    document.getElementById("retry-btn").onclick = () => {
        window.location.reload();
    };

    document.getElementById("back-btn").onclick = () => {
        window.location.href = "../index.html";
    };
}
function capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
