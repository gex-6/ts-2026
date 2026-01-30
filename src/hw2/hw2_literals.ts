export type Lecturer = {
  id: number,
  name: string,
  surname: string,
  position: string,
  company: string,
  experience: number,
  courses: Course[],
  contacts: Contact[]
}

export type Course = {
  name: string,
  code: number
}

export type Contact = {
  email: `${string}@${string}.${string}`,
  phone: `+380${number}`
}

class School {
  private _areas: Area[] = [];
  private _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(areaToRemove: Area): void {
    this._areas = this._areas.filter(area => area.name !== areaToRemove.name);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturerId: number): void {
    this._lecturers = this._lecturers.filter(lecturer => lecturer.id !== lecturerId);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  private _levels: Level[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(levelToRemove: Level): void {
    this._levels = this._levels.filter(level => level.name !== levelToRemove.name);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  private _groups: Group[];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(groupToRemove: Group): void {
    this._groups = this._groups.filter(group => group.area.name !== groupToRemove.area.name);
  }
}

export type GroupStatuses = 'planned' | 'started' | 'closed';

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  private _area: Area;
  private _status: GroupStatuses;
  private _students: Student[] = []; // Modify the array so that it has a valid toSorted method* -- якщо я правильно зрозумів доки, в поточній реалізації буде працювати залежно від налаштувань tsconfig
  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string, area: Area, status: GroupStatuses, students: Student[]) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._area = area;
    this._status = status;
    this._students = students;
  }

  get area(): Area {
    return this._area;
  }

  get status(): GroupStatuses {
    return this._status;
  }

  set status(newStatus: GroupStatuses) {
    this._status = newStatus;
  }

  get students(): Student[] {
    return this._students;
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }

  addStudent(student: Student): void {
    this._students.push(student)
  }

  removeStudent(studentToRemove: Student): void {
    this._students = this._students.filter(student => student.fullName !== studentToRemove.fullName);
  }
}

export type Grades = 0 | 1 | 2 | 3 | 4 | 5;
export type Lesson = "math" | "chemistry" | "ukrainian literature"; // etc.
export type FullName = `${string} ${string}`;

class Student {
  // implement 'set grade' and 'set visit' methods

  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;
  private _grades: Record<string, Grades>[] = []; // workName: mark
  private _visits: Record<Lesson, boolean>[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: FullName) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  getPerformanceRating(): number {
    const allGrades: number[] = this._grades.flatMap(gradeRecord => Object.values(gradeRecord));
    const allVisits: boolean[] = this._visits.flatMap(visitRecord => Object.values(visitRecord));

    if (allGrades.length === 0 && allVisits.length === 0) return 0;

    const averageGrade = getAverageGrades(allGrades);
    const attendancePercentage = getattendancePercentage(allVisits);

    return (averageGrade + attendancePercentage) / 2;
  }
}

// helpers
function getAverageGrades(grades: number[]): number {
  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

function getattendancePercentage(visits: boolean[]): number {
  return (visits.filter(present => present).length / visits.length) * 100;
}
