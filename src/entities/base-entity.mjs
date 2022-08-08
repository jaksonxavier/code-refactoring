import { randomUUID } from "node:crypto";

export default class BaseEntity {
  constructor(props, id) {
    this._id = id || randomUUID();
    this.props = props;
  }

  get id() {
    return this._id;
  }
}
