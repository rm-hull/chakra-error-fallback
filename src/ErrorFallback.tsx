import { useReadableStack } from "./useReadableStack";
import {
  Accordion,
  Alert,
  Code,
  Container,
  Heading,
  Span,
  Strong,
} from "@chakra-ui/react";
import { Cause } from "./Cause";

interface ErrorFallbackProps {
  title?: string;
  error: Error;
}

export default function ErrorFallback({
  error,
  title = "Something went wrong",
}: ErrorFallbackProps) {
  const { stack, loading } = useReadableStack(error);

  return (
    <Container maxWidth="container.lg" mt={8}>
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            <Strong>{title}</Strong>
            {loading && <Span color="gray.500"> (resolving source maps…)</Span>}
          </Alert.Title>
          <Alert.Description>
            <Cause error={error} />
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Container m={5}>
        <Accordion.Root collapsible variant="plain">
          <Accordion.Item value="stack">
            <Accordion.ItemTrigger>
              <Heading size="sm">Stack trace</Heading>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Code background="none">
                  <pre>{stack}</pre>
                </Code>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Container>
    </Container>
  );
}
