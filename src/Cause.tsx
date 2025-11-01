import { VStack, HStack, Box } from "@chakra-ui/react";
import { BsArrowReturnRight } from "react-icons/bs";

interface CauseProps {
  error: Error;
}

export function Cause({ error }: CauseProps) {
  return (
    <VStack alignItems="start" gap={0.5}>
      {error.message}
      {error.cause instanceof Error && (
        <HStack alignItems="start">
          <Box mt={0.5} ml={4}>
            <BsArrowReturnRight />
          </Box>
          <Cause error={error.cause} />
        </HStack>
      )}
    </VStack>
  );
}
