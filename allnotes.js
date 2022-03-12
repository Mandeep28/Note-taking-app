console.log("this is all notes js file ");
var val = 23;

// now we have to show the notes
function showNotes() {
  // let notesObj=[];
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  //   console.log(notesObj, "hello");

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
       <div class="card">
        <div class="card-body">
            <h3 class="card-title">${element.title}</h3>
            <p class="card-text">${element.value} </p>
            <button class=" delBtn" id="${index}" onclick = "deleteNote(this.id)">  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg> </button>
            <button class ="editBtn" id="${index}" onclick = "editNote(this.id) " ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"></path></g></svg></button>
        </div>
    </div> `;
  });

  let showNotes = document.getElementById("show-note");
  showNotes.innerHTML = html;
  // console.log(showNotes);
  // console.log(notesObj);

  if (notesObj.length != 0) {
    showNotes.innerHTML = html;
  } else {
    showNotes.innerHTML = "Nothing to show you ..... Please add some notes by click on the add note button in the home page !!";
  }
}
// Now add a function to delete note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showMsg("delete");
  showNotes();
  showLength();
}
// it will show the message that is error or warming 
let showMsg = (msgTitle) => {
  let message = document.querySelector("#message");
  let messageBdy = document.querySelector("#message-body");
  if (msgTitle === "delete") {
    message.style.display = "block";
    message.style.background = "#fff3cd";
    messageBdy.innerHTML = " Warning : Note is deleted Successfully !!!.";
  }
  setTimeout(() => {
    message.style.display = "none";
  }, 5000);
}


// here search function is define
let search = document.querySelector("#search-bar");
search.addEventListener('input', () => {
  let inputVal = search.value.toLowerCase();
  let noteCard = document.getElementsByClassName("card");
  Array.from(noteCard).forEach(function (element) {
    let cardTitle = element.getElementsByTagName("h3")[0].innerText.toLowerCase();
    let cardBody = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    // check the condition to search 
    if (cardBody.includes(inputVal) || cardTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
  
})
// it will show the result when click on the search btn 
// let searchBtn = document.getElementById("searchBtn");
// searchBtn.addEventListener("click", () => {
//   let searchTxt = document.getElementById("search-bar").value.toLowerCase();
//   // console.log(searchTxt);
//   Array.from(noteCard).forEach(function (element) {
//     let cardTitle = element.getElementsByTagName("h3")[0].innerText.toLowerCase();
//     let cardBody = element.getElementsByTagName("p")[0].innerText.toLowerCase();
//     // check the condition to search 
//     if (cardBody.includes(searchTxt) || cardTitle.includes(searchTxt)) {
//       element.style.display = "block";
//     } else {
//       element.style.display = "none";
//     }
//   });
//   document.getElementById("search-bar").value = "";
// });

// it will show the length of notes in the all notes file 
let showLength = () => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let noteLength = notesObj.length;
  // console.log(noteLength);
  document.querySelector("#length").innerText = "(" + noteLength + ")";
}

// here we define the edit functionality 
let editNote = (index) => {
  // use var to use this is throughout the program 
  val = index;
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let saveCont = document.querySelector(".Save-container");
  saveCont.style.visibility = "visible";
  // console.log(val);
  
  // console.log(saveCont.classList);
  
  // saveCont.classList.add(val);
  // console.log(saveCont.classList);


  let noteTitle = document.querySelector(" #Stitle");
  let noteTxt = document.querySelector(" #Snote");
  noteTitle.value = notesObj[index].title;
  noteTxt.value = notesObj[index].value;
  // makeCall (index);
};
// console.log(val);


// it will save the note to the same place from where it call
  document.querySelector("#saveNote").addEventListener('click', () => {
    let saveCont = document.querySelector(".Save-container");;
    // console.log(val);
    let index = val;
    
      
    let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let noteTitle = document.querySelector(" #Stitle").value;
  let noteTxt = document.querySelector(" #Snote").value;
  notesObj[index].title= noteTitle;
  notesObj[index].value= noteTxt;

  
  localStorage.setItem("notes", JSON.stringify(notesObj));
  saveCont.style.visibility = "hidden";
  showNotes();
  });
  document.querySelector("#menu-cross").addEventListener('click', () => {
    document.querySelector("#menu-cross").classList.toggle("open");
    document.querySelectorAll(".list")[0].classList.toggle("all");
    document.querySelectorAll(".list")[1].classList.toggle("all");
    document.querySelector(".search").classList.toggle("all");
  
  })
  
      // when dom loaded then it will show you the notes in the local stroage ....
      showNotes();
      showLength();


