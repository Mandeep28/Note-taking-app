console.log("This is js file of note taking project");


// here we add function to the add button that call the add notes () function to add notes 
let addBtn = document.getElementById("addNote");
addBtn.addEventListener("click", () => {
  let title = document.getElementById("title");
  let addTxt = document.getElementById("note");

  if (title.value === "" || addTxt.value === "") {
    showMsg("danger");
  } else {
    addNotes(title.value, addTxt.value);
    title.value = "";
    addTxt.value = "";
    showMsg("success");
  }
});

// function to add note value to local stroage
function addNotes(title, addTxt) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  arrNotes = {
    title: title,
    value: addTxt,
  };

  notesObj.push(arrNotes);


  localStorage.setItem("notes", JSON.stringify(notesObj));
  showLength();
}
// it will show you error and some interesting messages 
let showMsg = (msgTitle) => {
  let message = document.querySelector("#message");
  let messageBdy = document.querySelector("#message-body");
  if (msgTitle === "danger") {
    message.style.display = "block";
    messageBdy.innerHTML = " Error : Please fill the values corectly.";
  } else if (msgTitle === "success") {
    message.style.display = "block";
    message.style.background = "#d1e7dd";
    messageBdy.innerHTML = " Nice! : You successfully created note using magic notes.";
  }
  setTimeout(() => {
    message.style.display = "none";
  }, 5000);
};

// it will show the length of the note in the all notes 
let showLength = () => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let noteLength = notesObj.length;
  console.log(noteLength);
  document.querySelector("#length").innerText = "(" + noteLength + ")";
}

// add event listener to the menu btn
document.querySelector("#menu-cross").addEventListener('click', () => {
  document.querySelector("#menu-cross").classList.toggle("open");
  document.querySelectorAll(".list")[0].classList.toggle("all");
  document.querySelectorAll(".list")[1].classList.toggle("all");
  document.querySelector(".search").classList.toggle("all");

})
// it will show length when dom is loaded 
showLength();