export default class TodoModel {
  private _id: number;
  private _text: string;
  private _completed: boolean;


  constructor(id: number, text: string, completed: boolean) {
    this._id = id;
    this._text = text;
    this._completed = completed;
  }

  get id(): number {
    return this._id;
  }

  get text(): string {
    return this._text;
  }

  get completed(): boolean {
    return this._completed;
  }
}
