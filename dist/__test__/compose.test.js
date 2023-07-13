"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const compose_1 = require("../src/pattern/compose/compose");
const composeAsync_1 = require("../src/pattern/compose/composeAsync");
(0, vitest_1.suite)("Compose suite", () => {
    (0, vitest_1.test)("It should compose  function", ({ expect }) => {
        const first = (x) => x + x;
        const second = (y) => y * y;
        const third = (z) => z - z;
        console.time("c");
        const composedCalculation = (0, compose_1.compose)(third, second, first)(2);
        console.timeEnd("c");
        expect(composedCalculation).to.be.equal(0);
    });
    (0, vitest_1.test)("It should compose async function", async ({ expect }) => {
        const first = async (x) => x + x;
        const second = async (y) => y * y;
        const third = async (z) => z - z;
        console.time("ca");
        const composedCalculation = await (0, composeAsync_1.composeAsync)(third, second, first)(2);
        console.timeEnd("ca");
        expect(composedCalculation).to.be.equal(0);
    });
    (0, vitest_1.test)("It should compose mutli type function", ({ expect }) => {
        const first = (x) => x + x;
        const second = (y) => y * y;
        const third = (z) => (z - z).toString();
        console.time("cm");
        const composedCalculation = (0, compose_1.composeMulti)(third, second, first)(2);
        console.timeEnd("cm");
        expect(composedCalculation).to.be.equal("0");
    });
    (0, vitest_1.test)("Compose multi async", async ({ expect }) => {
        const firstProm = async (x) => x + x;
        const secondProm = async (y) => y * y;
        const thirdProm = async (z) => (z - z).toString();
        console.time("cma");
        const composedCalculation = await (0, composeAsync_1.composeMultiAsync)(thirdProm, secondProm, firstProm)(2);
        console.timeEnd("cma");
        expect(composedCalculation).to.be.equal("0");
    });
    (0, vitest_1.suite)("Overkill", () => {
        (0, vitest_1.test)("compose", () => { });
        (0, vitest_1.test)("multiCompose", ({ expect }) => {
            const first = (x) => x + x;
            const second = (y) => y * y;
            const third = (z) => (z - z).toString();
            const fourth = (z) => z - z;
            console.time("cm");
            const composedCalculation = (0, compose_1.composeMulti)(fourth, third, second, first)(2);
            console.timeEnd("cm");
            expect(composedCalculation).to.be.equal("0");
        });
    });
});
