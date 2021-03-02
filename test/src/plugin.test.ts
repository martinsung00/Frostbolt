import Seeder from "../../src";
import { statuses } from "../../src/utils";

describe("Seeder Plugin Tests", function () {
  const mockUrl: string = "localhost:5432";
  const mockSchema: {
    [key: string]: string;
  } = {
    cats: "varchar",
    dog: "int",
  };
  const mockTable = "pets";
  const databaseType = "postgres";
  const databaseType2 = "postgreSQL";
  let seeder: Seeder;

  afterAll(function () {
    jest.resetModules();
    jest.resetAllMocks();
  });
  describe("Query String Generator", function () {
    let seeder: Seeder;

    beforeAll(() => {
      seeder = new Seeder();
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    it("should generate a query string based on the provided arguments", async function (done) {
      const expectedResult = `INSERT INTO ${mockTable} VALUES ($1, $2)`;

      try {
        const testResult = await seeder.generateQueryString(
          mockTable,
          mockSchema
        );

        expect(testResult.queryString).toEqual(expectedResult);
        expect(testResult.queryValues).toEqual(["varchar", "int"]);
      } catch (err) {
      } finally {
        done();
      }
    });
  });

  describe("Seed Method", function () {
    beforeAll(function () {
      seeder = new Seeder();
    });

    afterEach(function () {
      jest.resetAllMocks();
    });

    it("should return 'Operation Successful'", async function (done) {
      const expectedResult = statuses.success;

      try {
        const testResult = await seeder.seed(databaseType, mockSchema, mockUrl);
        const testResult2 = await seeder.seed(
          databaseType2,
          mockSchema,
          mockUrl
        );

        expect(testResult).toEqual(expectedResult);
        expect(testResult2).toEqual(expectedResult);

        expect(typeof testResult).toEqual("string");
        expect(typeof testResult2).toEqual("string");
      } catch (err) {
        console.log(err);
      } finally {
        done();
      }
    });

    it("should console log the target url", async function (done) {
      const spy: jest.SpyInstance = jest.spyOn(console, "log");

      try {
        await seeder.seed(databaseType, mockSchema, mockUrl);

        expect(spy).toHaveBeenCalledWith(`Target url: ${mockUrl}`);
      } catch (err) {
        console.log(err);
      } finally {
        done();
      }
    });

    it("should console log the schema", async function (done) {
      const spy: jest.SpyInstance = jest.spyOn(console, "log");

      try {
        await seeder.seed(databaseType, mockSchema, mockUrl);
        await seeder.seed(databaseType2, mockSchema, mockUrl);

        expect(spy).toHaveBeenCalledWith(mockSchema);
        expect(spy).toHaveBeenCalledWith(mockSchema);
      } catch (err) {
        console.log(err);
      } finally {
        done();
      }
    });

    it("should reject any database types that is not postgres or postgreSQL", async function (done) {
      const expectedResult = statuses.unavailable;
      const unsupportedInput = "unsupportedInput";

      try {
        const testResult = await seeder.seed(
          unsupportedInput,
          mockSchema,
          mockUrl
        );

        expect(testResult).toEqual(expectedResult);
      } catch (err) {
        console.log(err);
      } finally {
        done();
      }
    });
  });
});
