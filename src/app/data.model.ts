import {DataItem} from "./types";

export class Data {
  private readonly _data: DataItem;

  constructor(data: DataItem) {
    this._data = data;
  }

  get id() {
    return this._data.id;
  }

  get int() {
    return this._data.int;
  }

  get float() {
    return this._data.float;
  }

  get color() {
    return this._data.color;
  }

  get child() {
    // return [{ id: this._data.child.id, color: this._data.child.color }];
    return this._data.child;
  }
}
