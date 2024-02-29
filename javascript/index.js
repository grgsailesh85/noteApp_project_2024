const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")
addBtn.addEventListener(
    "click",
    function() {
        addNote()
    }
)
//saveNotes function gathers the text content from all the textarea elements within elements having class ".note" on the webpage and iterates through eaach note element, extracts the text value and stores it in array named "data"
function saveNotes() {
  const notes = document.querySelectorAll(".note textarea")
  console.log(notes)
  const data = []
  notes.forEach(
    (note) => {
      data.push(note.value)
    }
  )
  // console.log(data)
  if (data.length === 0) {
    localStorage.removeItem("notes")
  } else {
    //takes the data extracted from the notes stored in the "data" array and saves it under the key notes in the browsers local storage, persisting it even after the page is refreshed or the browser window is closed
    localStorage.setItem("notes", JSON.stringify(data))
  }
}


//  <div class="note">
// <div class="tool">
//     <i class="fas fa-save"></i>
//     <i class="fas fa-trash"></i>
// </div>
// <textarea></textarea>
// </div>

//when the "Add Note" button is clicked the eventListener is added which create a new element div with id "note" as above
const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;

    
    //making trash icon responsive
    //this below code finds the first element with class ".trash" inside the "note" element, listens for clicks on the element and if clicked the entire "note" element is removed from the webpage
    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNotes()
        }
    )


    //adds the content represented by the "note" variable as the last child element within the main content area (main) of the webpage
    //.appendChild():- used to add child nodes to an existing element
    main.appendChild(note);
    saveNotes()
}


(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()