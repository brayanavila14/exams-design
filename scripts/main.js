const exam = JSON.parse(localStorage.getItem("finalExam"));
function redirect(page) {
    if (page === 'createExam') {
        window.location.href = './pages/createExam.html';
    } else if (page === 'doExam') {
        if (!exam || !exam.questions || exam.questions.length === 0) {
            alert("⚠️ No hay examen disponible. Crea uno primero.");
        } else {
            window.location.href = './pages/doExam.html';
        }
    }
}
