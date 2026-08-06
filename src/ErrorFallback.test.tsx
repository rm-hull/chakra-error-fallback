import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "./test/render";
import { ErrorFallback } from "./ErrorFallback";
import { useReadableStack } from "./useReadableStack"; // Import the function directly
import { vi } from "vitest";

// Mock the useReadableStack hook. We'll set its implementation in beforeEach.
vi.mock("./useReadableStack", async () => {
  // Use async for importActual
  const actual =
    await vi.importActual<typeof import("./useReadableStack")>(
      "./useReadableStack",
    );
  return {
    ...actual, // Keep original exports if any
    useReadableStack: vi.fn(), // Mock the specific function
  };
});

// Get a reference to the mocked function
const mockedUseReadableStack = vi.mocked(useReadableStack);

describe("ErrorFallback", () => {
  beforeEach(() => {
    // Reset the mock to its default implementation before each test
    mockedUseReadableStack.mockClear();
    mockedUseReadableStack.mockImplementation(() => ({
      stack: "Mock stack trace",
      loading: false,
    }));
  });

  it("renders with a default title and error message", () => {
    const error = new Error("Test Error Message");
    const { container } = render(<ErrorFallback error={error} />);

    expect(container).toHaveTextContent("Something went wrong");
    expect(container).toHaveTextContent("Test Error Message");
    expect(container).toHaveTextContent("Stack trace");
  });

  it("renders with a custom title", () => {
    const error = new Error("Another Error");
    const { container } = render(
      <ErrorFallback error={error} title="Custom Error Title" />,
    );

    expect(container).toHaveTextContent("Custom Error Title");
    expect(container).toHaveTextContent("Another Error");
  });

  it("displays 'resolving source maps…' when loading is true", () => {
    mockedUseReadableStack.mockImplementation(() => ({
      stack: "",
      loading: true,
    }));
    const error = new Error("Loading Error");
    const { container } = render(<ErrorFallback error={error} />);

    expect(container).toHaveTextContent(/resolving source maps…/);
  });

  it("displays the stack trace when the accordion is expanded", async () => {
    const error = new Error("Stack Trace Error");
    const { container, getByText } = render(<ErrorFallback error={error} />);

    const trigger = getByText("Stack trace");
    const accordionItem = trigger.closest("[data-part='item']");
    const stackTraceContent = accordionItem?.querySelector(
      "[data-part='item-content']",
    );

    // Stack trace content should be closed initially
    expect(stackTraceContent).toHaveAttribute("data-state", "closed");

    // Click to expand the accordion
    await userEvent.click(trigger);

    // Stack trace content should now be open after waiting
    await waitFor(() =>
      expect(stackTraceContent).toHaveAttribute("data-state", "open"),
    );
    expect(container).toHaveTextContent("Mock stack trace");
  });

  it("displays the stack trace immediately when expandStackTrace is true", async () => {
    const error = new Error("Expanded Stack Trace Error");
    const { container } = render(
      <ErrorFallback error={error} expandStackTrace={true} />,
    );

    await waitFor(() => {
      expect(container).toHaveTextContent("Mock stack trace");
    });
  });

  it("renders the Cause component with the provided error", () => {
    const error = new Error("Error for Cause Component");
    const { container } = render(<ErrorFallback error={error} />);

    // The Cause component should display the error message
    expect(container).toHaveTextContent("Error for Cause Component");
  });
});
