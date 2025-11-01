import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

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
