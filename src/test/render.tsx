import { render as rtlRender } from "@testing-library/react";
import { PropsWithChildren, ReactNode } from "react";
import { Provider } from "@/components/ui/provider";

export function render(ui: ReactNode) {
  return rtlRender(<>{ui}</>, {
    wrapper: (props: PropsWithChildren) => (
      <Provider>{props.children}</Provider>
    ),
  });
}
