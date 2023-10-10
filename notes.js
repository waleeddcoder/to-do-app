const main = document.querySelector("#main");
const addBtn = document.querySelector("#addBtn");

const saveNote = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });
    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

addBtn.addEventListener("click", function () {
    addNote();
});

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `<div class="toolbar">
    <i class="delete fa-solid fa-trash"></i>
    <i class="save fa-solid fa-floppy-disk"></i>
    </div>
    <textarea class="textArea">${text}</textarea>`;

    const deleteButton = note.querySelector(".delete");
    const saveButton = note.querySelector(".save");

    deleteButton.addEventListener("click", function () {
        note.remove();
        saveNote();
    });

    saveButton.addEventListener("click", function () {
        saveNote();
    });
    note.querySelector("textarea").addEventListener("focusout", function () {
        saveNote();
    });

    main.appendChild(note);
    saveNote();
};

(function () {
    const lsnotes = JSON.parse(localStorage.getItem("notes"));
    if (lsnotes === null) {
        addNote();
    } else {
        lsnotes.forEach((lsnote) => {
            addNote(lsnote);
        });
    }
})();
