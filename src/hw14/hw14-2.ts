/* Вам треба створити додаток для управління нотатками, використовуючи принципи ООП, патерн DTO та декоратори.

1. Нотатки
Кожна нотатка має містити:
- ідентифікатор
- назву
- зміст
- дату створення
- дату редагування
- статус
- тип

Нотатки бувають двох типів (використовуйте наслідування):
- Дефолтні.
- Такі, що вимагають підтвердження при редагуванні та видалинні */

type NoteStatus = "active" | "completed";
type NoteType = "default" | "strict";

abstract class BaseNote implements Note {
  noteId: string;
  noteTitle: string;
  noteContent: string;
  status: NoteStatus;
  readonly createdAt: string;
  updatedAt: string;
  readonly type: NoteType;

  constructor(id: string, title: string, description: string = "", type: NoteType) {
    this.validate(title); // нотатка не може мати порожній заголовок, але може не мати опису
    this.noteId = id;
    this.noteTitle = title;
    this.noteContent = description;
    this.status = "active";
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
    this.type = type;
  }

  @SanitizeInput
  @ValidateNotEmpty
  @AutoUpdateTimestamp
  updateNote(newTitle: string, newDescription: string): void {
    this.validate(newTitle);
    this.noteTitle = newTitle;
    this.noteContent = newDescription;
  }

  @AutoUpdateTimestamp
  changeStatus(newStatus: NoteStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date().toString();
  }

  complete(): void {
    this.changeStatus("completed");
  }

  abstract canBeEdited(): boolean;

  protected validate(title: string): void {
    if (!title.trim()) {
      throw new Error("Note title cannot be empty");
    }
  }
}

class DefaultNote extends BaseNote {
  constructor(id: string, title: string = "New default note", description: string = "", type: NoteType) {
    super(id, title, description, type);
  }

  canBeEdited(): boolean {
    return true;
  }
}

class StrictNote extends BaseNote {

  constructor(id: string, title: string = "New strict note", description: string = "", type: NoteType) {
    super(id, title, description, type);
  }

  canBeEdited(): boolean {
    const confirmed = confirm(`Are you sure? Allow access to edit "${this.noteTitle}"`);
    return confirmed;
  }

  @SanitizeInput
  @ValidateNotEmpty
  @AutoUpdateTimestamp
  updateNote(newTitle: string, newDescription: string): void {
    if (this.canBeEdited()) {
      super.updateNote(newTitle, newDescription);
    }
  }
}

/* 2. У списку нотаток повинні бути методи для:
- Додавання нового запису.
- Видалення запису за ідентифікатором.
- Редагування запису.
- Отримання повної інформації про нотатку за ідентифікатором.
- Позначення нотатки як "виконаної".
- Отримання статистики: скільки всього нотаток у списку і скільки залишилося невиконаними.
- У списку повинна бути можливість пошуку нотатки за ім'ям або змістом.
- Додайте можливість сортування нотаток за статусом виконання або за часом створення. */

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

class TodoList implements Managable, Sortable, TodoStats {
  private notes: BaseNote[] = [];

  addNote(note: BaseNote): void {
      this.notes.push(note);
  }

  removeNote(id: string): void {
      const note = this.notes.find(n => n.noteId === id);

      if (note && note.canBeEdited()) {
        this.notes = this.notes.filter(n => n.noteId !== id);
      }      
  }

  getNotes(): BaseNote[] {
      return this.notes;
  }

  getNoteDetails(id: string): BaseNote {
      const note = this.notes.find(n => n.noteId === id);
      if (!note) throw new Error("Note not found");
      return note;
  }

  @SanitizeInput
  @ValidateNotEmpty
  editNote(id: string, newTitle: string, newDescription: string): void {
      const note = this.getNoteDetails(id);
      note.updateNote(newTitle, newDescription);
  }

  getNoteById(id: string): BaseNote | undefined {
      return this.notes.find(note => note.noteId === id);
  }

  completeNote(id: string): void {
      const note = this.notes.find(note => note.noteId === id);
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
          note.noteContent.toLowerCase().includes(lowerQuery) ||
          note.noteContent.toLowerCase().includes(lowerQuery)
      );
  }

  sortNotesByDate(): BaseNote[] {
      return [...this.notes].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA
      });
  }

  sortNotesByStatus(): BaseNote[] {
      return [...this.notes].sort((a, b) => b.status.localeCompare(a.status));
  }
}

/* 3. Робота з даними
Уявіть, що дані надходять до вашого списку із зовнішнього API. Всі вхідні дані приходять у форматі snake_case.
Внутрішня бізнес-логіка вашого додатку та класи повинні суворо використовувати camelCase.

Типізуйте механізм, який автоматично трансформує ключі об'єктів зі snake_case у camelCase при отриманні даних, та навпаки — при поверненні результату клієнту. */

const mockServerResponse: NoteServerDTO[] = [
  {
    note_id: '1',
    note_title: 'Прочитати: Великий Гетсбі (Ф. Скотт Фіцджеральд)',
    note_content: 'Проаналізувати мотив «зеленого вогника» та крах американської мрії.',
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-02-02T15:30:00Z',
    status: "completed",
    type: 'default',
  },
  {
    note_id: '2',
    note_title: 'Купити: На Західному фронті без змін (Е.М. Ремарк)',
    note_content: 'Звернути увагу на контраст між мирним життям та жахами окопів.',
    created_at: '2026-02-05T09:15:00Z',
    updated_at: '2026-02-05T09:15:00Z',
    status: "active",
    type: 'strict',
  },
  {
    note_id: '3',
    note_title: 'Написати есе: Фієста (Е. Хемінґвей)',
    note_content: 'Розібрати «принцип айсберга» Хемінґвея.',
    created_at: '2026-02-10T14:20:00Z',
    updated_at: '2026-02-12T11:00:00Z',
    status: "active",
    type: 'default',
  },
];

interface Note {
  noteId: string;
  noteTitle: string;
  noteContent: string;
  createdAt: string;
  updatedAt: string;
  status: NoteStatus;
  type: NoteType;
}

type StartsWithUppercase<StringPart extends string> =
  StringPart extends Uncapitalize<StringPart> ? false : true;

type CamelToSnake<Text extends string> =
  Text extends `${infer CurrentChar}${infer RestOfString}`
  ? StartsWithUppercase<RestOfString> extends true
  ? `${Uncapitalize<CurrentChar>}_${CamelToSnake<RestOfString>}`
  : `${Uncapitalize<CurrentChar>}${CamelToSnake<RestOfString>}`
  : Text;

type MapToSnakeCaseDTO<T> = {
  [K in keyof T as CamelToSnake<K & string>]: T[K];
};

type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<SnakeToCamel<U>>}`
  : Lowercase<S>;

type MapToCamelCaseDomain<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: T[K];
};

type NoteServerDTO = MapToSnakeCaseDTO<Note>;
type ReconstructedNote = MapToCamelCaseDomain<NoteServerDTO>;

function mapToDTO(data: ReconstructedNote): NoteServerDTO {
  return {
    note_id: data.noteId,
    note_title: data.noteTitle,
    note_content: data.noteContent,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    status: data.status,
    type: data.type,
  };
}

function mapFromDTO(data: NoteServerDTO): ReconstructedNote {
  return {
    noteId: data.note_id,
    noteTitle: data.note_title,
    noteContent: data.note_content,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    status: data.status,
    type: data.type,
  };
}

/*  4. Декоратори
Для оптимізації та чистоти коду необхідно реалізувати та застосувати наступні декоратори:

@SanitizeInput: Застосовується до методів додавання та редагування. Повинен автоматично видаляти зайві пробіли на початку
та в кінці строк у назві та змісті нотатки перед тим, як дані потраплять до основної логіки методу.

@ValidateNotEmpty: Застосовується після очищення. Нотатки не повинні бути порожніми. Декоратор перевіряє,
чи не є назва та зміст порожніми строками, і якщо так — викидає помилку до виконання основної логіки методу.

@AutoUpdateTimestamp: Застосовується до методу редагування. Декоратор повинен перехоплювати виклик методу
і автоматично оновлювати поле дата редагування поточною датою та часом, звільняючи розробника від необхідності
писати цю логіку всередині самого методу.
*/

function SanitizeInput(originalMethod: any, context: ClassMethodDecoratorContext) {
  
  function replacementMethod(this: any, ...args: any[]) {
    const sanitizedArgs = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        const newArg = { ...arg };
        for (const key in newArg) {
          if (typeof newArg[key] === 'string') {
            newArg[key] = newArg[key].trim();
          }
        }
        return newArg;
      }

      return typeof arg === 'string' ? arg.trim() : arg;
    });

    return originalMethod.apply(this, sanitizedArgs);
  }

  return replacementMethod;
}

function ValidateNotEmpty(originalMethod: any, context: ClassMethodDecoratorContext) {
  
  function replacementMethod(this: any, ...args: any[]) {
    const checkValue = (val: any, fieldName: string) => {
      if (typeof val === 'string' && val.trim().length === 0) {
        throw new Error(`Validation failed: [${fieldName}] in method "${String(context.name)}" cannot be empty`);
      }
    };

    args.forEach(arg => {
      if (typeof arg === 'object' && arg !== null) {
        if ('noteTitle' in arg) checkValue(arg.noteTitle, 'noteTitle');
        if ('noteContent' in arg) checkValue(arg.noteContent, 'noteContent');
      } else {
        checkValue(arg, 'argument');
      }
    });

    return originalMethod.apply(this, args);
  }

  return replacementMethod;
}

function AutoUpdateTimestamp(originalMethod: any, context: ClassMethodDecoratorContext) {
  
  function replacementMethod(this: any, ...args: any[]) {
      const result = originalMethod.apply(this, args);

      if (this && 'updatedAt' in this) {
          this.updatedAt = new Date().toString();
      }
      
      return result;
  }

  return replacementMethod;
}
