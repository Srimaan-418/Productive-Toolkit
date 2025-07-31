window.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("noteInput");
  const saveBtn = document.getElementById("saveNoteBtn");
  const notesContainer = document.getElementById("notesContainer");

  // Load saved notes
  const savedNotes = JSON.parse(localStorage.getItem("notesList")) || [];
  savedNotes.forEach(addNoteToUI);

  // Add new note
  saveBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (!noteText) return;

    addNoteToUI(noteText);
    savedNotes.push(noteText);
    localStorage.setItem("notesList", JSON.stringify(savedNotes));
    noteInput.value = "";
  });

  // Create note element
  function addNoteToUI(text) {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";
    noteCard.textContent = text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => {
      noteCard.remove();
      const updated = JSON.parse(localStorage.getItem("notesList")).filter(n => n !== text);
      localStorage.setItem("notesList", JSON.stringify(updated));
    });

    noteCard.appendChild(delBtn);
    notesContainer.appendChild(noteCard);
  }
});
