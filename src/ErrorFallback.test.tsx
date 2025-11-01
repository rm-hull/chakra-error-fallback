import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "./test/render";
import ErrorFallback from "./ErrorFallback";
import { vi } from "vitest";
import { useReadableStack } from "./useReadableStack";

// Mock the useReadableStack hook
vi.mock("./useReadableStack", () => ({
  useReadableStack: vi.fn(),
}));

const mockUseReadableStack = useReadableStack as vi.Mock;

describe("ErrorFallback", () => {
  beforeEach(() => {
    // Reset mock before each test
    mockUseReadableStack.mockReturnValue({ stack: "Mock stack trace", loading: false });
  });

  it("renders with a default title and error message", () => {
    const error = new Error("Test Error Message");
    render(<ErrorFallback error={error} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test Error Message")).toBeInTheDocument();
    expect(screen.getByText("Stack trace")).toBeInTheDocument();
  });

  it("renders with a custom title", () => {
    const error = new Error("Another Error");
    render(<ErrorFallback error={error} title="Custom Error Title" />);

    expect(screen.getByText("Custom Error Title")).toBeInTheDocument();
    expect(screen.getByText("Another Error")).toBeInTheDocument();
  });

  it("displays 'resolving source maps…' when loading is true", () => {
    mockUseReadableStack.mockReturnValue({ stack: "", loading: true });
    const error = new Error("Loading Error");
    render(<ErrorFallback error={error} />);

    expect(screen.getByText(/resolving source maps…/)).toBeInTheDocument();
  });

  it("displays the stack trace when the accordion is expanded", async () => {
    const error = new Error("Stack Trace Error");
    render(<ErrorFallback error={error} />);

    const trigger = screen.getByText("Stack trace");
    const accordionItem = trigger.closest("[data-part='item']");
    const stackTraceContent = accordionItem?.querySelector("[data-part='item-content']");

    // Stack trace content should be closed initially
    expect(stackTraceContent).toHaveAttribute("data-state", "closed");

    // Click to expand the accordion
    await userEvent.click(trigger);

    // Stack trace content should now be open after waiting
    await waitFor(() => expect(stackTraceContent).toHaveAttribute("data-state", "open"));
    expect(screen.getByText("Mock stack trace")).toBeInTheDocument();
  });

  it("renders the Cause component with the provided error", () => {
    const error = new Error("Error for Cause Component");
    render(<ErrorFallback error={error} />);

    // The Cause component should display the error message
    expect(screen.getByText("Error for Cause Component")).toBeInTheDocument();
  });
});
