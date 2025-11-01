import { screen } from "@testing-library/react";
import { render } from "./test/render";
import { Cause } from "./Cause";

describe("Cause", () => {
  it("displays a simple error message", () => {
    const error = new Error("Test Error");
    render(<Cause error={error} />);
    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  it("recursively displays nested error causes", () => {
    const innerError = new Error("Inner Error");
    const middleError = new Error("Middle Error", { cause: innerError });
    const outerError = new Error("Outer Error", { cause: middleError });

    render(<Cause error={outerError} />);

    expect(screen.getByText("Outer Error")).toBeInTheDocument();
    expect(screen.getByText("Middle Error")).toBeInTheDocument();
    expect(screen.getByText("Inner Error")).toBeInTheDocument();
  });
});
