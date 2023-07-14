"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const src_1 = require("../src");
const fakeMaybePromise = async (param) => {
    if (param === 1)
        return "Promise fullfiled";
    else if (param === 2)
        throw new Error("Ann error ocured");
    else if (param === 3)
        return Promise.resolve(undefined);
    else if (param === 4)
        return "Hello world";
    else
        return;
};
const unwrapError = new Error("Value is undefined");
(0, vitest_1.suite)("MaybeContainer", () => {
    (0, vitest_1.test)("new", () => {
        const maybeArray = src_1.MaybeContainer.new([1, 2, 3, 4]);
        const maybeOfString = src_1.MaybeContainer.new("HelloWorld");
        const result = maybeArray.find((item) => item === 2), resultTwo = maybeOfString.unwrapMap((item) => item.split("").join("_"));
        (0, vitest_1.expect)(result.isNothing()).toBeFalsy();
        (0, vitest_1.expect)(result.unwrap()).toEqual(2);
        (0, vitest_1.expect)(resultTwo).toEqual("H_e_l_l_o_W_o_r_l_d");
    });
    (0, vitest_1.suite)("Maybe", () => {
        (0, vitest_1.test)("isValue", async ({ expect }) => {
            const maybePromise = src_1.MaybeContainer.from(await fakeMaybePromise(1));
            const maybeNothing = maybePromise.isNothing();
            expect(maybeNothing).toBeFalsy();
            expect(maybePromise.unwrap()).to.be.equal("Promise fullfiled");
        });
        (0, vitest_1.test)("map", async ({ expect }) => {
            const maybePromise = src_1.MaybeContainer.from("1");
            const mappedMaybe = maybePromise.map((item) => parseInt(item));
            expect(mappedMaybe.unwrap()).toEqual(1);
        });
        (0, vitest_1.test)("isNothing", async ({ expect }) => {
            const maybePromise = src_1.MaybeContainer.from(await fakeMaybePromise(3));
            const maybeNothing = maybePromise.isNothing();
            expect(maybeNothing).toBeTruthy();
            const mappedMaybe = maybePromise.map((res) => expect(res).toBeUndefined());
        });
        (0, vitest_1.test)("unwrap error", async ({ expect }) => {
            const maybePromise = src_1.MaybeContainer.from(await fakeMaybePromise(3));
            expect(() => maybePromise.unwrap()).toThrowError(unwrapError);
        });
        (0, vitest_1.test)("chain", async ({ expect }) => {
            const maybePromise = src_1.MaybeContainer.from(await fakeMaybePromise(1));
            const chained = maybePromise.chain((p) => p + " Hello world");
            expect(chained.unwrap()).to.be.equal("Promise fullfiled Hello world");
        });
    });
    (0, vitest_1.test)("async", async () => {
        const test = async () => "Hello world";
        const maybePromise = await src_1.MaybeContainer.fromAsync(test());
        (0, vitest_1.expect)(maybePromise.unwrap()).to.be.equal("Hello world");
    });
    (0, vitest_1.suite)("MaybeArray", () => {
        const arrayOfNumberString = ["1", "2", "3"];
        const arrayOfString = "HELLOWORLD".split("");
        const arrayOfObject = [
            { lastName: "name", name: "name" },
            { lastName: "otherName", name: "otherName" },
            { lastName: "lastName", name: "lastName" },
            { lastName: "unknown", name: "unknown" },
            { lastName: undefined, name: undefined },
        ];
        (0, vitest_1.test)("isValue", ({ expect }) => {
            const maybeArray = src_1.MaybeContainer.fromArray(arrayOfString);
            expect(maybeArray.isEmpty() && maybeArray.isNothing()).toBeFalsy();
            expect(maybeArray.unwrap()).toHaveLength(10);
            maybeArray.unwrap().forEach((element) => {
                expect(arrayOfString.includes(element)).toBeTruthy();
            });
        });
        (0, vitest_1.test)("isEmpty", ({ expect }) => {
            const maybeArray = src_1.MaybeContainer.fromArray([]), maybeArrayUndefined = src_1.MaybeContainer.fromArray();
            expect(maybeArray.isEmpty()).toBeTruthy();
            expect(maybeArrayUndefined.isEmpty()).toBeTruthy();
        });
        (0, vitest_1.test)("length", ({ expect }) => {
            const maybeArray = src_1.MaybeContainer.fromArray([]), maybeArrayUndefined = src_1.MaybeContainer.fromArray();
        });
        (0, vitest_1.test)("map", ({ expect }) => {
            const maybeArray = src_1.MaybeContainer.fromArray(arrayOfNumberString);
            const mapped = maybeArray.map((stringNumber) => parseInt(stringNumber));
            expect(mapped.length).toEqual(arrayOfNumberString.length);
            expect(mapped.unwrap()).toEqual([1, 2, 3]);
        });
        (0, vitest_1.test)("unwrapMap", ({ expect }) => {
            const maybeArray = src_1.MaybeContainer.fromArray(arrayOfNumberString);
            const mapped = maybeArray.unwrapMap((stringNumber) => parseInt(stringNumber));
            expect(mapped.length).toEqual(arrayOfNumberString.length);
            expect(mapped).toEqual([1, 2, 3]);
        });
        (0, vitest_1.test)("filter", ({ expect }) => {
            const maybeArray = src_1.MaybeContainer.fromArray(arrayOfNumberString);
            const filtered = maybeArray.filter((stringNumber) => stringNumber === "2");
            expect(filtered.unwrap()[0]).toEqual("2");
        });
        (0, vitest_1.test)("unwrapFilter", ({ expect }) => {
            const maybeArray = src_1.MaybeContainer.fromArray(arrayOfNumberString);
            const filtered = maybeArray.unwrapFilter((stringNumber) => stringNumber === "2");
            expect(filtered[0]).toEqual("2");
        });
        (0, vitest_1.test)("find", ({ expect }) => {
            const maybeArray = src_1.MaybeContainer.fromArray(arrayOfNumberString);
            const finded = maybeArray.find((item) => item === "3");
            expect(finded.unwrap()).toEqual("3");
        });
        (0, vitest_1.test)("Chaining MaybeArray method", () => {
            const maybeArray = src_1.MaybeContainer.fromArray(arrayOfObject);
            const result = maybeArray
                .map((item) => ({
                ...item,
                date: "12/02/23",
            }))
                .filter((item) => item.lastName !== undefined)
                .find((item) => item.name === "name");
            (0, vitest_1.expect)(result.isNothing()).toBeFalsy();
            (0, vitest_1.expect)(result.unwrap()).toEqual({
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
            (0, vitest_1.expect)(resultTwo.isNothing()).toBeTruthy();
        });
    });
});
