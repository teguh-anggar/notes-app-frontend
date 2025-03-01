// Komponen Form Catatan dengan validasi realtime
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this._initValidation();
  }

  _initValidation() {
    const form = this.shadowRoot.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInput(input);
      });

      input.addEventListener("blur", () => {
        this._validateInput(input);
      });
    });
  }

  _validateInput(input) {
    const errorElement = input.nextElementSibling;
    let isValid = true;
    let errorMessage = "";

    if (!input.value.trim()) {
      isValid = false;
      errorMessage = `${input.placeholder} tidak boleh kosong`;
    } else if (input.id === "judul" && input.value.length > 50) {
      isValid = false;
      errorMessage = "Judul tidak boleh lebih dari 50 karakter";
    }

    if (!isValid) {
      input.classList.add("error");
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
    } else {
      input.classList.remove("error");
      errorElement.style.display = "none";
    }

    return isValid;
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .note-form {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }

                .form-group {
                    margin-bottom: 15px;
                }

                input, textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    margin-bottom: 5px;
                }

                input.error, textarea.error {
                    border-color: var(--secondary);
                }

                .error-message {
                    color: var(--secondary);
                    font-size: 0.8em;
                    display: none;
                }

                button {
                    background: var(--secondary);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                button:hover {
                    background: var(--accent);
                }

                button:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }
            </style>
            <div class="note-form">
                <form>
                    <div class="form-group">
                        <input type="text" id="judul" placeholder="Judul catatan" required>
                        <div class="error-message"></div>
                    </div>
                    <div class="form-group">
                        <textarea id="isi" rows="4" placeholder="Isi catatan" required></textarea>
                        <div class="error-message"></div>
                    </div>
                    <button type="submit">Tambah Catatan</button>
                </form>
            </div>
        `;
  }
}

customElements.define("note-form", NoteForm);
