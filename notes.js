document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notesList');
    const newNoteBtn = document.getElementById('newNoteBtn');
    const noteTitle = document.getElementById('noteTitle');
    const noteBody = document.getElementById('noteBody');
    const deleteNoteBtn = document.getElementById('deleteNoteBtn');
    const editor = document.getElementById('editor');
    const welcomeMessage = document.getElementById('welcomeMessage');

    let notes = JSON.parse(localStorage.getItem('zenith-notes')) || [];
    let activeNoteId = null;

    const saveNotes = () => {
        localStorage.setItem('zenith-notes', JSON.stringify(notes));
    };

    const renderNotesList = () => {
        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = `note-item ${note.id === activeNoteId ? 'active' : ''}`;
            noteItem.setAttribute('data-id', note.id);

            const title = note.title || 'New Note';
            const bodyPreview = note.body ? note.body.substring(0, 40) + '...' : 'No additional text';

            noteItem.innerHTML = `
                <h3>${title}</h3>
                <p>${bodyPreview}</p>
            `;
            noteItem.addEventListener('click', () => selectNote(note.id));
            notesList.appendChild(noteItem);
        });
    };
    
    const showEditor = (show) => {
        editor.style.display = show ? 'flex' : 'none';
        welcomeMessage.style.display = show ? 'none' : 'flex';
    };

    const selectNote = (id) => {
        activeNoteId = id;
        const note = notes.find(n => n.id === id);
        if (note) {
            noteTitle.value = note.title;
            noteBody.value = note.body;
            showEditor(true);
        }
        renderNotesList();
    };

    newNoteBtn.addEventListener('click', () => {
        const newNote = {
            id: Date.now(),
            title: '',
            body: ''
        };
        notes.unshift(newNote); // Add to the top
        saveNotes();
        selectNote(newNote.id);
    });
    
    deleteNoteBtn.addEventListener('click', () => {
        if (activeNoteId) {
            notes = notes.filter(n => n.id !== activeNoteId);
            activeNoteId = null;
            saveNotes();
            renderNotesList();
            showEditor(false);
        }
    });

    function updateActiveNote() {
        if (activeNoteId) {
            const note = notes.find(n => n.id === activeNoteId);
            if (note) {
                note.title = noteTitle.value;
                note.body = noteBody.value;
                saveNotes();
                renderNotesList(); // Re-render to update preview
            }
        }
    }

    // Auto-save on input
    noteTitle.addEventListener('input', updateActiveNote);
    noteBody.addEventListener('input', updateActiveNote);

    // Initial Load
    renderNotesList();
    if (notes.length > 0) {
        selectNote(notes[0].id);
    } else {
        showEditor(false);
    }
});