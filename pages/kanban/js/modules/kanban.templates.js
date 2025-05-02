export class KanbanTemplates {
    constructor() {
        this.templates = {};
    }

    loadTemplates() {
        this.templates = {
            lista: document.getElementById('listTemplate'),
            card: document.getElementById('cardTemplate')
        };
    }

    getTemplate(name) {
        return this.templates[name];
    }
}
