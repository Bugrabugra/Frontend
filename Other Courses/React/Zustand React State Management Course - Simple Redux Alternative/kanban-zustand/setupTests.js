import matchers from "@testing-library/jest-dom/matchers.js";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";


expect.extend(matchers);
afterEach(cleanup);
