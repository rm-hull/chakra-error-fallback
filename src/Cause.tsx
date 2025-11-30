import { VStack, HStack, Box } from "@chakra-ui/react";
import { BsArrowReturnRight } from "react-icons/bs";

interface CauseProps {
  error: Error;
}

interface InternalCauseProps {
  error: Error;
  seen: Set<Error>;
}

function InternalCause({ error, seen }: InternalCauseProps) {
  seen.add(error);

  return (
    <VStack alignItems="start" gap={0.5}>
      {error.message}
      {error.cause instanceof Error && !seen.has(error.cause) && (
        <HStack alignItems="start">
          <Box mt={0.5} ml={4}>
            <BsArrowReturnRight />
          </Box>
          <InternalCause error={error.cause} seen={seen} />
        </HStack>
      )}
    </VStack>
  );
}

export function Cause({ error }: CauseProps) {
  return <InternalCause error={error} seen={new Set()} />;
}
