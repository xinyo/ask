import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it } from "vitest";

import App from "./App";

afterEach(() => {
  cleanup();
});

function renderApp(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routes", () => {
  it("renders the home route", () => {
    renderApp();

    expect(
      screen.getByRole("heading", {
        name: "Type a question, we will ask everyone.",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("textbox", { name: "Question" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "ask" })).toBeTruthy();
  });

  it("navigates to the iframe route with the submitted question", async () => {
    renderApp();

    fireEvent.change(screen.getByRole("textbox", { name: "Question" }), {
      target: { value: "How do React routes work?" },
    });
    fireEvent.click(screen.getByRole("button", { name: "ask" }));

    expect(await screen.findByText("How do React routes work?")).toBeTruthy();
  });

  it("renders answer frames on the ask route", () => {
    renderApp("/ask?q=What%20is%20Vite%3F");

    const framesRegion = screen.getByRole("region", {
      name: "AI answer frames",
    });

    expect(within(framesRegion).getByTitle("ChatGPT answer")).toBeTruthy();
    expect(within(framesRegion).getByTitle("Claude answer")).toBeTruthy();
    expect(within(framesRegion).getByTitle("Perplexity answer")).toBeTruthy();
    expect(
      within(framesRegion)
        .getByTitle("Perplexity answer")
        .getAttribute("src"),
    ).toContain("What%20is%20Vite%3F");
  });
});
