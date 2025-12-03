const exam = JSON.parse(localStorage.getItem("examData"));
const createBtn = document.querySelector(".create-exam");
const doBtn = document.querySelector(".do-exam");

function redirect(page) {
<<<<<<< HEAD
    if (page === "createExam") {
        if (exam) {
            localStorage.removeItem("examData");
            localStorage.removeItem("examFormulated")
        }
        window.location.href = "./pages/createExamn.html";
    } else if (page === "doExam") {
        if (!exam || !exam.questions || exam.questions.length === 0) {
            alert("No hay examen disponible. Crea uno primero.");
        } else {
            window.location.href = "./pages/doExamn.html";
        }
=======
  if (page === "createExam") {
    if (exam) {
      localStorage.removeItem("examData");
      localStorage.removeItem("examFormulated")
    } 
    window.location.href = "./pages/createExamn.html";
  } else if (page === "doExam") {
    if (!exam || !exam.questions || exam.questions.length === 0) {
      alert("No hay examen disponible. Crea uno primero.");
    } else {
      window.location.href = "./pages/doExamn.html";
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd
    }
  }
}

createBtn.addEventListener("click", () => redirect("createExam"));

<<<<<<< HEAD
doBtn.addEventListener("click", () => redirect("doExam"));
=======
doBtn.addEventListener("click", () => redirect("doExam"));
>>>>>>> 39da0df3951751363c1b3093c6972a48ff9639fd
