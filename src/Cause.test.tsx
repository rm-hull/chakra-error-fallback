import { render } from "./test/render";
import { Cause } from "./Cause";

describe("Cause", () => {
  it("displays a simple error message", () => {
    const error = new Error("Test Error");
    const { container } = render(<Cause error={error} />);
    expect(container).toHaveTextContent("Test Error");
  });

  it("recursively displays nested error causes", () => {
    const innerError = new Error("Inner Error");
    const middleError = new Error("Middle Error", { cause: innerError });
    const outerError = new Error("Outer Error", { cause: middleError });

    const { container } = render(<Cause error={outerError} />);

    expect(container).toHaveTextContent("Outer Error");
    expect(container).toHaveTextContent("Middle Error");
    expect(container).toHaveTextContent("Inner Error");
  });

  it("handles cyclic errors gracefully", () => {
    const errorA = new Error("Error A");
    const errorB = new Error("Error B");
    Object.defineProperty(errorA, "cause", {
      value: errorB,
      enumerable: false,
    });
    Object.defineProperty(errorB, "cause", {
      value: errorA,
      enumerable: false,
    });

    const { container } = render(<Cause error={errorA} />);

    expect(container).toHaveTextContent("Error A");
    expect(container).toHaveTextContent("Error B");
  });
});
