window.addEventListener('DOMContentLoaded', () => {
  const savedNote = localStorage.getItem("quickNote");
  if (savedNote) {
    document.getElementById("noteInput").value = savedNote;
  }

  const saveBtn = document.getElementById("saveNoteBtn");
  const msg = document.getElementById("saveMsg");

  saveBtn.addEventListener('click', () => {
    const note = document.getElementById("noteInput").value;
    localStorage.setItem("quickNote", note);
    msg.textContent = "Note saved!";
    setTimeout(() => (msg.textContent = ""), 2000);
  });
});
