import { useReadableStack } from "./useReadableStack";
import {
  Accordion,
  Alert,
  Container,
  Heading,
  Span,
  Strong,
} from "@chakra-ui/react";
import { Cause } from "./Cause";
import { StackTrace } from "./StackTrace";

interface ErrorFallbackProps {
  title?: string;
  error: Error;
  expandStackTrace?: boolean;
}

export function ErrorFallback({
  error,
  title = "Something went wrong",
  expandStackTrace,
}: ErrorFallbackProps) {
  const { stack, loading } = useReadableStack(error);

  return (
    <Container maxWidth="container.lg" mt={8}>
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            <Strong>{title}</Strong>
          </Alert.Title>
          <Alert.Description>
            <Cause error={error} />
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Container m={5}>
        <Accordion.Root
          collapsible
          variant="plain"
          defaultValue={expandStackTrace ? ["stack"] : undefined}
        >
          <Accordion.Item value="stack">
            <Accordion.ItemTrigger>
              <Heading size="sm">
                Stack trace
                {loading && (
                  <Span color="gray.500"> (resolving source maps…)</Span>
                )}
              </Heading>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <StackTrace details={stack} />
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Container>
    </Container>
  );
}
