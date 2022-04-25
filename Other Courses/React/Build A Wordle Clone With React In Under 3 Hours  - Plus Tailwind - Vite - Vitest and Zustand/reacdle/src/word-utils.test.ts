import { describe, expect, it } from "vitest";
import { render, screen } from "./test/test-utils";
import { getRandomWord } from "./word-utils";

describe("word-utils", () => {
  it('random word', () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
})
