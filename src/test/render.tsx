import { render as rtlRender } from "@testing-library/react";
import { PropsWithChildren, ReactNode } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function render(ui: ReactNode) {
  return rtlRender(<>{ui}</>, {
    wrapper: (props: PropsWithChildren) => (
      <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
    ),
  });
}
