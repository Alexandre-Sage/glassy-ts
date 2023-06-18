import { expect, suite, test } from "vitest";
import { MaybeContainer } from "../src";
const fakeMaybePromise = async (param: number) => {
  if (param === 1) return "Promise fullfiled";
  else if (param === 2) throw new Error("Ann error ocured");
  else if (param === 3) return Promise.resolve(undefined);
  else if (param === 4) return "Hello world";
  else return;
};
const unwrapError = new Error("Value is undefined");
suite("MaybeContainer", () => {
  test("new", () => {
    const maybeArray = MaybeContainer.new([1, 2, 3, 4]);
    const maybeOfString = MaybeContainer.new("HelloWorld");
    const result = maybeArray.find((item) => item === 2),
      resultTwo = maybeOfString.unwrapMap((item) => item.split("").join("_"));
    expect(result.isNothing()).toBeFalsy();
    expect(result.unwrap()).toEqual(2);
    expect(resultTwo).toEqual("H_e_l_l_o_W_o_r_l_d");
  });
  suite("Maybe", () => {
    test("isValue", async ({ expect }) => {
      const maybePromise = MaybeContainer.from(await fakeMaybePromise(1));
      const maybeNothing = maybePromise.isNothing();
      expect(maybeNothing).toBeFalsy();
      expect(maybePromise.unwrap()).to.be.equal("Promise fullfiled");
    });

    test("map", async ({ expect }) => {
      const maybePromise = MaybeContainer.from("1");
      const mappedMaybe = maybePromise.map((item) => parseInt(item));
      expect(mappedMaybe.unwrap()).toEqual(1);
    });

    test("isNothing", async ({ expect }) => {
      const maybePromise = MaybeContainer.from(await fakeMaybePromise(3));
      const maybeNothing = maybePromise.isNothing();
      expect(maybeNothing).toBeTruthy();
      const mappedMaybe = maybePromise.map((res) =>
        expect(res).toBeUndefined()
      );
    });

    test("unwrap error", async ({ expect }) => {
      const maybePromise = MaybeContainer.from(await fakeMaybePromise(3));
      expect(() => maybePromise.unwrap()).toThrowError(unwrapError);
    });

    test("chain", async ({ expect }) => {
      const maybePromise = MaybeContainer.from(await fakeMaybePromise(1));
      const chained = maybePromise.chain((p) => p + " Hello world");
      expect(chained.unwrap()).to.be.equal("Promise fullfiled Hello world");
    });
  });

  suite("MaybeArray", () => {
    const arrayOfNumberString = ["1", "2", "3"];
    const arrayOfString = "HELLOWORLD".split("");
    const arrayOfObject: {
      name: string | undefined;
      lastName: string | undefined;
    }[] = [
      { lastName: "name", name: "name" },
      { lastName: "otherName", name: "otherName" },
      { lastName: "lastName", name: "lastName" },
      { lastName: "unknown", name: "unknown" },
      { lastName: undefined, name: undefined },
    ];

    test("isValue", ({ expect }) => {
      const maybeArray = MaybeContainer.fromArray(arrayOfString);
      expect(maybeArray.isEmpty() && maybeArray.isNothing()).toBeFalsy();
      expect(maybeArray.unwrap()).toHaveLength(10);
      maybeArray.unwrap().forEach((element) => {
        expect(arrayOfString.includes(element)).toBeTruthy();
      });
    });

    test("isEmpty", ({ expect }) => {
      const maybeArray = MaybeContainer.fromArray([]),
        maybeArrayUndefined = MaybeContainer.fromArray(undefined);
      const chainded = maybeArrayUndefined.find((item) => item === "test");
      expect(maybeArray.isEmpty()).toBeTruthy();
      expect(maybeArrayUndefined.isEmpty()).toBeTruthy();
    });
    test("isNothing", () => {});
    test("length", ({ expect }) => {
      const maybeArray = MaybeContainer.fromArray([]),
        maybeArrayUndefined = MaybeContainer.fromArray();
    });

    test("map", ({ expect }) => {
      const maybeArray = MaybeContainer.fromArray(arrayOfNumberString);
      const mapped = maybeArray.map((stringNumber) => parseInt(stringNumber));
      expect(mapped.length).toEqual(arrayOfNumberString.length);
      expect(mapped.unwrap()).toEqual([1, 2, 3]);
    });

    test("unwrapMap", ({ expect }) => {
      const maybeArray = MaybeContainer.fromArray(arrayOfNumberString);
      const mapped = maybeArray.unwrapMap((stringNumber) =>
        parseInt(stringNumber)
      );
      expect(mapped.length).toEqual(arrayOfNumberString.length);
      expect(mapped).toEqual([1, 2, 3]);
    });

    test("filter", ({ expect }) => {
      const maybeArray = MaybeContainer.fromArray(arrayOfNumberString);
      const filtered = maybeArray.filter(
        (stringNumber) => stringNumber === "2"
      );
      expect(filtered.unwrap()[0]).toEqual("2");
    });

    test("unwrapFilter", ({ expect }) => {
      const maybeArray = MaybeContainer.fromArray(arrayOfNumberString);
      const filtered = maybeArray.unwrapFilter(
        (stringNumber) => stringNumber === "2"
      );
      expect(filtered[0]).toEqual("2");
    });

    test("find", ({ expect }) => {
      const maybeArray = MaybeContainer.fromArray(arrayOfNumberString);
      const finded = maybeArray.find((item) => item === "3");
      expect(finded.unwrap()).toEqual("3");
    });

    test("Chaining MaybeArray method", () => {
      const maybeArray = MaybeContainer.fromArray(arrayOfObject);
      const result = maybeArray
        .map((item) => ({
          ...item,
          date: "12/02/23",
        }))
        .filter((item) => item.lastName !== undefined)
        .find((item) => item.name === "name");
      expect(result.isNothing()).toBeFalsy();
      expect(result.unwrap()).toEqual({
        lastName: "name",
        name: "name",
        date: "12/02/23",
      });
      const resultTwo = maybeArray
        .map((item) => ({
          ...item,
          date: undefined,
        }))
        .filter((item) => item.date !== undefined)
        .find((item) => item.name === "name");
      // console.log({ resultTwo:  })
      expect(resultTwo.isNothing()).toBeTruthy();
    });
  });
});
