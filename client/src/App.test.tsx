import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders react app", () => {
  render(<App />);
  expect(screen.getByText(/Hello world!/i)).toBeInTheDocument();
});
