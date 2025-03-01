import { notesData } from "../data/notes.js";
import "../components/app-bar.js";
import "../components/note-form.js";
import "../components/note-list.js";

// Define note-card component
class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("judul") || "Untitled";
    const body = this.getAttribute("isi") || "";
    const createdAt = this.getAttribute("tanggal") || "";

    this.shadowRoot.innerHTML = `
            <style>
                .note-card {
                    background: white;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h3 {
                    margin: 0 0 8px 0;
                    color: var(--primary);
                }
                p {
                    margin: 0;
                    color: #666;
                }
                .date {
                    font-size: 0.8em;
                    color: #888;
                    margin-top: 8px;
                }
            </style>
            <div class="note-card">
                <h3>${title}</h3>
                <p>${body}</p>
                <div class="date">${new Date(
                  createdAt
                ).toLocaleDateString()}</div>
            </div>
        `;
  }
}

customElements.define("note-card", NoteCard);

function initApp() {
  const noteList = document.querySelector("note-list");
  const noteForm = document.querySelector("note-form");

  function renderNotes() {
    // Clear existing notes from note-list
    while (noteList.firstChild) {
      noteList.removeChild(noteList.firstChild);
    }

    // Render all notes
    notesData.forEach((note) => {
      const noteElement = document.createElement("note-card");
      noteElement.setAttribute("judul", note.title);
      noteElement.setAttribute("isi", note.body);
      noteElement.setAttribute("tanggal", note.createdAt);
      noteList.appendChild(noteElement);
    });
  }

  // Handle form submission
  if (noteForm) {
    const form = noteForm.shadowRoot.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput = form.querySelector("#judul");
      const bodyInput = form.querySelector("#isi");

      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (!title || !body) return;

      const newNote = {
        id: `notes-${Date.now()}`,
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      notesData.push(newNote);
      renderNotes();
      form.reset();
    });
  }

  // Initial render
  renderNotes();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
