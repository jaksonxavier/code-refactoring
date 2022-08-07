import { randomUUID } from "node:crypto";

export default class Customer {
  constructor({ name, email, phoneNumber }) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
