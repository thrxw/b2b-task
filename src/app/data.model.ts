export class Data {
  private readonly _id: number;
  private readonly _int: number;
  private readonly _float: number;
  private readonly _color: string;
  private readonly _child: any;

  constructor(data: any) {
    this._id = data.id;
    this._int = data.int;
    this._float = data.float;
    this._color = data.color;
    this._child = data.child;
  }

  get id(): number {
    return this._id;
  }

  get int(): number {
    return this._int;
  }

  get float(): number {
    return this._float;
  }

  get color(): string {
    return this._color;
  }

  get child() {
    return [{ id: this._child.id, color: this._child.color }];
  }
}
