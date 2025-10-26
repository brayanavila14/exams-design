// Respuesta correcta
let selectedAnswer = null;
// Definición de la pregunta y opciones, y demas detalles
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
// Selecciona el elemento contenedor
const container = document.getElementById('quiz-container');

// Mostrar la pregunta y opciones en el contenedor
container.innerHTML = `
    <h2>${pregunta.texto}</h2>
    <div class="options">
        ${pregunta.opciones.map(opt => `
            <button class="option" data-value="${opt.valor}">${opt.texto}</button>
        `).join('')}
    </div>
    <button id="check-btn" class="btn">Verificar Respuesta</button>
    <div id="feedback"></div>
`;
// Después de renderizar, ya se selecciona los elementos necesarios (No hacerlo antes porque no existen en el DOM)
const options = document.querySelectorAll('.option');
const checkBtn = document.getElementById('check-btn');
const feedback = document.getElementById('feedback');

// Seleccionar opción
options.forEach(option => {
    option.addEventListener('click', () => {
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedAnswer = option.getAttribute('data-value');
        feedback.className = "feedback";
    });
});

// Verificar respuesta
checkBtn.addEventListener('click', () => {
    if (selectedAnswer === pregunta.correcta) {
        feedback.textContent = pregunta.feedbackCorrecto;
        feedback.className = "feedback correct show";
    } else {
        feedback.textContent = pregunta.feedbackIncorrecto;
        feedback.className = "feedback incorrect show";
    }
});
