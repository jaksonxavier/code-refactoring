import BaseEntity from "./base-entity.mjs";

export default class Customer extends BaseEntity {
  constructor(props, id) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set email(email) {
    this.props.email = email;
  }

  get phoneNumber() {
    return this.props.phoneNumber;
  }

  set phoneNumber(phoneNumber) {
    this.props.phoneNumber = phoneNumber;
  }

  create(props, id) {
    const customer = new Customer(props, id);

    return customer;
  }
}
