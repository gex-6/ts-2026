type NoteStatus = "active" | "completed";

interface Managable {
    addNote(note: BaseNote): void;
    removeNote(id: string): void;
    editNote(id: string, title: string, desc: string): void;
    getNotes(): BaseNote[];
}

interface TodoStats {
    getCompleteNotesCount(): number;
    getActiveNotesCount(): number;
}

interface Sortable {
    sortNotesByDate(): BaseNote[];
    sortNotesByStatus(): BaseNote[];
}

abstract class BaseNote {
    id: string;
    title: string;
    description: string;
    status: NoteStatus;
    readonly createdAt: Date;
    editedAt: Date;

    constructor(id: string, title: string, description: string = "") {
        this.validate(title); // нотатка не може мати порожній заголовок, але може не мати опису
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = "active";
        this.createdAt = new Date();
        this.editedAt = new Date();
    }

    updateNote(newTitle: string, newDescription: string): void {
        this.validate(newTitle);
        this.title = newTitle;
        this.description = newDescription;
        this.editedAt = new Date();
    }

    changeStatus(newStatus: NoteStatus): void {
        this.status = newStatus;
        this.editedAt = new Date();
    }

    complete(): void {
        this.changeStatus("completed");
    }

    protected validate(title: string): void {
        if (!title.trim()) {
            throw new Error("Note title cannot be empty");
        }
    }
}

class DefaultNote extends BaseNote {
    constructor(id: string, title: string = "New default note", description: string = "") {
        super(id, title, description);
    }
}

class StrictNote extends BaseNote {

    constructor(id: string, title: string = "New strict note", description: string = "") {
        super(id, title, description);
    }

    updateNote(newTitle: string, newDescription: string): void {
        const confirmed = confirm(`Ви впевнені, що хочете змінити нотатку "${this.title}"?`);
        if (confirmed) {
            super.updateNote(newTitle, newDescription);
        }
    }
}

class TodoList implements Managable, Sortable, TodoStats {
    private notes: BaseNote[] = [];

    addNote(note: BaseNote): void {
        this.notes.push(note);
    }

    removeNote(id: string): void {
        this.notes = this.notes.filter(note => note.id !== id);
    }

    getNotes(): BaseNote[] {
        return this.notes;
    }

    getNoteDetails(id: string): BaseNote {
        const note = this.notes.find(n => n.id === id);
        if (!note) throw new Error("Note not found");
        return note;
    }

    editNote(id: string, newTitle: string, newDescription: string): void {
        const note = this.getNoteDetails(id);
        note.updateNote(newTitle, newDescription);
    }

    getNoteById(id: string): BaseNote | undefined {
        return this.notes.find(note => note.id === id);
    }

    completeNote(id: string): void {
        const note = this.notes.find(note => note.id === id);
        if (!note) throw new Error("Note not found");
        if (note instanceof BaseNote) {
            note.complete();
        }
    }

    getCompleteNotesCount(): number {
        return this.notes.filter(note => note.status === "completed").length;
    }

    getActiveNotesCount(): number {
        return this.notes.filter(note => note.status === "active").length;
    }

    searchNote(query: string): BaseNote[] {
        const lowerQuery = query.toLowerCase();

        return this.notes.filter(note =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.description.toLowerCase().includes(lowerQuery)
        );
    }

    sortNotesByDate(): BaseNote[] {
        return [...this.notes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    sortNotesByStatus(): BaseNote[] {
        return [...this.notes].sort((a, b) => b.status.localeCompare(a.status));
    }
}
