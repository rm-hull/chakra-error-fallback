import {
  CodeBlock,
  Float,
  IconButton,
  createShikiAdapter,
} from "@chakra-ui/react";
import type { LanguageInput } from "shiki";
import { useColorMode } from "./components/ui/color-mode";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const stackTraceLang: LanguageInput = [
  {
    name: "stack-trace-lang",
    scopeName: "source.stacktrace",
    aliases: ["stacktrace"],
    patterns: [
      {
        name: "keyword.error.stacktrace",
        match: "^Error:",
      },
      {
        // The error message text after "Error:" on the first line
        name: "string.error-message.stacktrace",
        match: "(?<=^Error: ).*",
      },
      {
        name: "keyword.stacktrace",
        match: "\\bat\\b",
      },
      {
        name: "entity.name.function.stacktrace",
        match: "(?<=at )[^\\s(]+",
      },
      {
        name: "string.url.stacktrace",
        match: "https?:\\/\\/[^\\s:]+(?:\\:[0-9]+)?(?:\\:[0-9]+)?",
      },
      {
        name: "constant.numeric.stacktrace",
        match: "\\b[0-9]+\\b",
      },
    ],
    repository: {},
    // folding: {},
  },
];

interface StackTraceProps {
  details?: string;
}

const shikiAdapter = createShikiAdapter({
  load: async () =>
    await createHighlighterCore({
      themes: [
        import("@shikijs/themes/vitesse-light"),
        import("@shikijs/themes/vitesse-dark"),
      ],
      langs: [stackTraceLang],
      engine: createJavaScriptRegexEngine(),
    }),
  theme: "vitesse-light",
});

export function StackTrace({ details = "" }: StackTraceProps) {
  const { colorMode } = useColorMode();
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        code={details}
        language="stack-trace-lang"
        meta={{
          showLineNumbers: true,
          colorScheme: colorMode,
        }}
      >
        <CodeBlock.Content bg="bg">
          <CodeBlock.Code>
            <Float placement="top-end" offset="5" zIndex="1">
              <CodeBlock.CopyTrigger asChild>
                <IconButton variant="ghost" size="2xs">
                  <CodeBlock.CopyIndicator />
                </IconButton>
              </CodeBlock.CopyTrigger>
            </Float>
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  );
}
