import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

import UserMessage from "./UserMessage";

test("waits for data to appear", async () => {
  render(<UserMessage />);

  expect(await screen.findByText("Data loaded!")).toBeInTheDocument();
});
