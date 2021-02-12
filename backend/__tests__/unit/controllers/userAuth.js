// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
import { login } from "../../../controllers/userAuth.js";

describe("login()", () => {
    it("Successful Login", () => {
        //Another way to test a boolean
        expect(login()).toEqual(true);
    });
});
