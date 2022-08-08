import BaseRepository from "./base-repository.mjs";
import Customer from "../../entities/customer.mjs";
import Extender from "../../utils/extender.mjs";

export default class CustomerRepository extends Extender(
  BaseRepository,
  Customer
) {
  async create(data) {
    const customer = super.create(data);

    const rows = await super.readFileContent();

    rows.push(customer);

    await super.writeContentFile(rows);

    return customer;
  }

  async findById(id) {
    const rows = await super.readFileContent();

    const customer = rows.find((item) => item.id === id);

    if (!customer) {
      return null;
    }

    return customer;
  }

  async findMany(search) {
    let customers = await super.readFileContent();

    if (search) {
      customers = customers.filter((item) =>
        item.name.match(new RegExp(search, "i"))
      );
    }

    return customers;
  }

  async update(id, params) {
    const customers = await super.readFileContent();

    const index = customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      return null;
    }

    customers[index] = Object.assign(customers[index], { ...params });

    await super.writeContentFile(customers);

    return customers[index];
  }

  async remove(id) {
    const customers = await super.readFileContent();

    const index = customers.findIndex((customer) => customer.id === id);

    customers.splice(index, 1);

    await super.writeContentFile(customers);

    return true;
  }
}
