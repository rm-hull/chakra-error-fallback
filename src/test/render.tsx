import { RenderResult, render as rtlRender } from "@testing-library/react";
import { PropsWithChildren, ReactNode } from "react";
import { Provider } from "@/components/ui/provider";

export function render(ui: ReactNode): RenderResult {
  return rtlRender(<>{ui}</>, {
    wrapper: (props: PropsWithChildren) => (
      <Provider>{props.children}</Provider>
    ),
  });
}
