import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorFallback } from "./ErrorFallback";
import { Provider } from "./components/ui/provider";

const meta = {
  component: ErrorFallback,
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: new Error("Top level error"),
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Custom error title here",
    error: new Error("Top level error"),
  },
};

export const NestedErrors: Story = {
  args: {
    title: "Another error occurred",
    error: new Error("Top level error", {
      cause: new Error("First cause", {
        cause: new Error("Second cause"),
      }),
    }),
  },
};

export const ExpandedStackTrace: Story = {
  args: {
    title: "Another error with expanded stack trace",
    error: new Error("Top level error"),
    expandStackTrace: true,
  },
};

export const CyclicErrors: Story = {
  args: {
    title: "Gracefully handle cyclic errors",
    error: new Error("Placeholder"), // Placeholder to satisfy types, overwritten in render
    expandStackTrace: true,
  },
  render: (args) => {
    const errorA = new Error("Error A");
    const errorB = new Error("Error B");
    // Create cycle
    Object.defineProperty(errorA, "cause", { value: errorB, enumerable: false });
    Object.defineProperty(errorB, "cause", { value: errorA, enumerable: false });
    
    const error = new Error("Top level error", { cause: errorA });
    
    return <ErrorFallback {...args} error={error} />;
  },
};
