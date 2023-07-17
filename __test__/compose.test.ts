import { suite, test } from "vitest";
import { compose, composeMulti } from "../src/pattern/compose/compose";
import {
  composeAsync,
  composeMultiAsync,
} from "../src/pattern/compose/composeAsync";
suite("Compose suite", () => {
  test("It should compose  function", ({ expect }) => {
    const first = (x: number) => x + x;
    const second = (y: number) => y * y;
    const third = (z: number) => z - z;
    console.time("c");
    const composedCalculation = compose(third, second, first)(2);
    console.timeEnd("c");
    expect(composedCalculation).to.be.equal(0);
  });
  test("It should compose async function", async ({ expect }) => {
    const first = async (x: number) => x + x;
    const second = async (y: number) => y * y;
    const third = async (z: number) => z - z;
    console.time("ca");
    const composedCalculation = await composeAsync(third, second, first)(2);
    console.timeEnd("ca");
    expect(composedCalculation).to.be.equal(0);
  });
  test("It should compose mutli type function", ({ expect }) => {
    const first = (x: number) => x + x;
    const second = (y: number) => y * y;
    const third = (z: number) => (z - z).toString();
    console.time("cm");
    const composedCalculation = composeMulti(third, second, first)(2);
    console.timeEnd("cm");
    expect(composedCalculation).to.be.equal("0");
  });
  test("Compose multi async", async ({ expect }) => {
    const firstProm = async (x: number) => x + x;
    const secondProm = async (y: number) => y * y;
    const thirdProm = async (z: number) => (z - z).toString();
    console.time("cma");
    const composedCalculation = await composeMultiAsync(
      thirdProm,
      secondProm,
      firstProm
    )(2);
    console.timeEnd("cma");
    expect(composedCalculation).to.be.equal("0");
  });
  suite("Overkill", () => {
    test("compose", () => {});
    test("multiCompose", ({ expect }) => {
      const first = (x: number) => x + x;
      const second = (y: number) => y * y;
      const third = (z: number) => (z - z).toString();
      const fourth = (z: number) => z - z;
      console.time("cm");
      const composedCalculation = composeMulti(fourth, third, second, first)(2);
      console.timeEnd("cm");
      expect(composedCalculation).to.be.equal(0);
    });
  });
});
