interface UserInterface2 {
  getFullName(): string;
}

class User2 implements UserInterface2 {
  age: number;
  protected firstNAme: string; // class ve diğr classlar içinde
  private lastName: string; // sadece class içinde
  readonly unchangableName: string; // değişmiyor
  static maxAge = 50; // static sadece class içinde var instance'ta yok

  constructor(firstName: string, lastName: string) {
    this.firstNAme = firstName;
    this.lastName = lastName;
    this.unchangableName = firstName;
  }

  changeUnchangableName(): void {
    // this.unchangableName = "foo";
  }

  getFullName(): string {
    return this.firstNAme + " " + this.lastName;
  }
}

class Admin extends User2 {
  private editor: string;

  setEditor(editor: string): void {
    this.editor = editor;
  }

  getEditor(): string {
    return this.editor;
  }
}

const user3 = new User2("Monster", "lessons");
console.log(user3.getFullName());

const admin = new Admin("Foo", "bar");
console.log(admin.age);
console.log(admin.getEditor());