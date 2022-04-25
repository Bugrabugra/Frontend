import { describe, expect, it } from "vitest";
import { render, screen } from "./test/test-utils";
import App from "./App";

describe("Simple working test", () => {
  it('should the title is visible', () => {
    render(<App/>);
    expect(screen.getByText(/Reacdle/i)).toBeInTheDocument();
  });
})
