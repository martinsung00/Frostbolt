import { statuses } from "./utils";

export default class Seeder {
  public seed = async (
    databaseType: string,
    schema: { [key: string]: string | number },
    url: string
  ): Promise<string> => {

    if (databaseType !== "postgres" && databaseType !== "postgreSQL") {
      return statuses.unavailable;
    }

    let key: string;
    let value: any;


    for ([key, value] of Object.entries(schema)) {
      console.log(`${key}: ${value}`);
    }

    console.log(`Target url: ${url}`);

    return statuses.success;
  };
}
