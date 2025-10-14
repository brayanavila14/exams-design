// Respuesta correcta
let selectedAnswer = null;
let pregunta = {
    texto: "¿Cuál es el lenguaje principal para la interactividad web?",
    opciones: [
        { valor: "html", texto: "HTML" },
        { valor: "css", texto: "CSS" },
        { valor: "javascript", texto: "JavaScript" },
        { valor: "python", texto: "Python" }
    ],
    correcta: "javascript",
    feedbackCorrecto: "¡Correcto! JavaScript es el lenguaje principal para la interactividad web.",
    feedbackIncorrecto: "Incorrecto. La respuesta correcta es JavaScript."
};
// Seleccionar todas las opciones
const options = document.querySelectorAll('.option');
const checkBtn = document.getElementById('check-btn');
const feedback = document.getElementById('feedback');

// Manejar selección de opción
options.forEach(option => {
    option.addEventListener('click', () => {
        // Remover clase 'selected' de todas
        options.forEach(opt => opt.classList.remove('selected'));
        // Agregar clase a la opción seleccionada
        option.classList.add('selected');
        selectedAnswer = option.dataset.value;
    });
});

// Verificar respuesta
checkBtn.addEventListener('click', () => {
    if (selectedAnswer === correctAnswer) {
        feedback.textContent = "¡Correcto! JavaScript es el lenguaje principal para la interactividad web.";
        feedback.className = "feedback correct show";
    } else {
        feedback.textContent = "Incorrecto. La respuesta correcta es JavaScript.";
        feedback.className = "feedback incorrect show";
    }
});
