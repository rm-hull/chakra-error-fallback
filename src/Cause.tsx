import { VStack, HStack, Box } from "@chakra-ui/react";
import { BsArrowReturnRight } from "react-icons/bs";

interface CauseProps {
  error: Error;
  seen?: Set<Error>;
}

export function Cause({ error, seen }: CauseProps) {
  const nextSeen = new Set(seen);
  nextSeen.add(error);

  return (
    <VStack alignItems="start" gap={0.5}>
      {error.message}
      {error.cause instanceof Error && !nextSeen.has(error.cause) && (
        <HStack alignItems="start">
          <Box mt={0.5} ml={4}>
            <BsArrowReturnRight />
          </Box>
          <Cause error={error.cause} seen={nextSeen} />
        </HStack>
      )}
    </VStack>
  );
}
