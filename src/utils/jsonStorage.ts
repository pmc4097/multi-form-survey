import fs from "fs";
type key = string | number;

export default class JsonStorage<Data> {
  #values: Record<key, Data> = {};

  constructor(private readonly filename: string) {
    this.load();
  }

  load() {
    try {
      const data = fs.readFileSync(this.filename, "utf-8");
      this.#values = JSON.parse(data) ?? {};
    } catch (e) {
      console.error("Failed to load json file", e);
    }
  }
  save() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.#values));
    } catch (e) {
      console.error("Failed to save json file", e);
    }
  }
  get(key: key): Data | undefined {
    return this.#values[key];
  }
  set(key: key, value: Data) {
    this.#values[key] = value;
    this.save();
  }
  getAll() {
    return this.#values;
  }
}
