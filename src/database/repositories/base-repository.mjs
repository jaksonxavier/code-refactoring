import { readFile, writeFile } from "node:fs/promises";

export default class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async readFileContent() {
    const fileContent = await readFile(this.file);

    return JSON.parse(fileContent);
  }

  async writeContentFile(data) {
    await writeFile(this.file, JSON.stringify(data));
  }
}
