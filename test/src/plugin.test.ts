import Seeder from "../../src";

describe("Seeder Plugin Tests", () => {
  const mockUrl: string = "localhost:5432";
  const mockSchema: {
    [key: string]: string;
  } = {
    cats: "varchar",
    dog: "int",
  };
  let seeder: Seeder;

  beforeAll(() => {
    seeder = new Seeder(mockUrl, mockSchema);
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
      const expectedResult = "Operation Successful";

      try {
        const testResult = await seeder.seed();

        expect(testResult).toEqual(expectedResult);
        expect(typeof testResult).toEqual("string");
      } catch (err) {
        console.log(err);
      } finally {
        done();
      }
    });

    it("should console log the target url", async (done) => {
      const spy: jest.SpyInstance = jest.spyOn(console, "log");

      try {
        await seeder.seed();

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
        await seeder.seed();

        expect(spy).toHaveBeenCalledWith(`cat: ${mockSchema.cat}`);
        expect(spy).toHaveBeenCalledWith(`dog: ${mockSchema.dog}`);
      } catch (err) {
        console.log(err);
      } finally {
        done();
      }
    });
  });
});
