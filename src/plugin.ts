import { statuses } from "./utils";

export default class Seeder {
  url: string;
  schema: {
    [key: string]: "string" | number;
  };

  constructor(url: string, schema: {}) {
    this.url = url;
    this.schema = schema;
  }

  public seed = async (): Promise<string> => {
    const url: string = this.url;
    const schema: {} = this.schema;
    let key: string;
    let value: any;

    for ([key, value] of Object.entries(schema)) {
      console.log(`${key}: ${value}`);
    }

    console.log(`Target url: ${url}`);

    return statuses.success;
  };
}
