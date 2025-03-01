// Komponen AppBar dengan custom attribute
class AppBar extends HTMLElement {
    constructor() {
        super();
        
        // Tangani atribut 'judul'
        const title = this.getAttribute('judul') || 'Aplikasi Catatan';
        
        this.innerHTML = `
            <header>
                <h1>${title}</h1>
                <hr>
            </header>
        `;
    }
}

customElements.define('app-bar', AppBar);