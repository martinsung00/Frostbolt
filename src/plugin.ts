import { statuses } from "./utils";
import { QueryInfo } from "./types";
import config from "../config/seeder.config.json";

export default class Seeder {
  range: number;

  constructor() {
    const { entries } = config;

    this.range = entries;
  }

  public seed = async (
    databaseType: string,
    schema: { [key: string]: string | number },
    url: string
  ): Promise<string> => {
    switch (databaseType) {
      // Both postgreSQL & postgres will run the same code.
      case "postgreSQL":
      case "postgres":
        console.log("we are now using the postgres route!");
        console.log(`Target url: ${url}`);
        console.log(schema);
        return statuses.success;
      default:
        return statuses.unavailable;
    }
  };

  public generateQueryString = async (
    tableName: string,
    schema: {
      [key: string]: string;
    }
  ): Promise<QueryInfo> => {
    let key: string;
    let value: string;
    let count: number = 1;
    let queryString: string = `INSERT INTO ${tableName} VALUES (`;
    const allValues: Array<string> = [];
    const limit: number = Object.keys(schema).length;

    for ([key, value] of Object.entries(schema)) {
      const indicator = `$${count}`;

      count === limit
        ? (queryString += `${indicator})`)
        : (queryString += `${indicator}, `);

      allValues.push(value);

      count++;
    }

    // Final object.
    const query: QueryInfo = {
      queryString: queryString,
      queryValues: allValues,
    };

    return query;
  };
}
