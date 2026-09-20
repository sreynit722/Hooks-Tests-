import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

import userEvent from "@testing-library/user-event";

import EmailForm from "./EmailForm";

test("renders the email field", () => {
  render(<EmailForm />);

  expect(screen.getByLabelText("Email")).toBeInTheDocument();
});

test("shows validation error for empty email", async () => {
  const user = userEvent.setup();

  render(<EmailForm />);

  await user.click(
    screen.getByRole("button", {
      name: "Submit",
    }),
  );

  expect(screen.getByRole("alert")).toHaveTextContent("Email is required");
});

test("allows typing and submitting", async () => {
  const user = userEvent.setup();

  render(<EmailForm />);

  await user.type(screen.getByLabelText("Email"), "test@example.com");

  await user.click(
    screen.getByRole("button", {
      name: "Submit",
    }),
  );

  expect(screen.getByText("Form submitted!")).toBeInTheDocument();
});

test("validation error is absent initially", () => {
  render(<EmailForm />);

  expect(screen.queryByRole("alert")).toBeNull();
});

test("removes the validation error after a valid submission", async () => {
  const user = userEvent.setup();

  render(<EmailForm />);

  await user.click(screen.getByRole("button", { name: "Submit" }));
  expect(screen.getByRole("alert")).toBeInTheDocument();

  await user.type(screen.getByLabelText("Email"), "test@example.com");
  await user.click(screen.getByRole("button", { name: "Submit" }));

  expect(screen.queryByRole("alert")).toBeNull();
});
