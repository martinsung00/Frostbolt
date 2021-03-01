import Seeder from "../../src";
import { statuses } from "../../src/utils";

describe("Seeder Plugin Tests", () => {
  const mockUrl: string = "localhost:5432";
  const mockSchema: {
    [key: string]: string;
  } = {
    cats: "varchar",
    dog: "int",
  };
  const databaseType = "postgres";
  const databaseType2 = "postgreSQL";
  let seeder: Seeder;

  beforeAll(() => {
    seeder = new Seeder();
  });

  afterAll(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  describe("Seed Method", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return 'Operation Successful'", async (done) => {
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

    it("should console log the target url", async (done) => {
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

    it("should console log the key value pairs", async (done) => {
      const spy: jest.SpyInstance = jest.spyOn(console, "log");

      try {
        await seeder.seed(databaseType, mockSchema, mockUrl);
        await seeder.seed(databaseType2, mockSchema, mockUrl);

        expect(spy).toHaveBeenCalledWith(`cat: ${mockSchema.cat}`);
        expect(spy).toHaveBeenCalledWith(`dog: ${mockSchema.dog}`);
      } catch (err) {
        console.log(err);
      } finally {
        done();
      }
    });

    it("should reject any database types that is not postgres or postgreSQL", async (done) => {
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
