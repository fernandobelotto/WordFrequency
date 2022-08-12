import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState<string | null>(null);

  const [stats, setStats] = useState<any | null>(null);

  const storageKey = "text";

  useEffect(() => {
    if (text) {
      localStorage.setItem(storageKey, text);
    }
  }, [text]);

  useEffect(() => {
    console.log("localStorage.getItem(", localStorage.getItem(storageKey));
    if (localStorage.getItem(storageKey)) {
      setText(localStorage.getItem(storageKey));
    }
  }, []);

  // TODO: check corner cases!
  function getStats() {
    const clearText = text?.trimEnd().trimStart();

    let numberOfWords = clearText?.split(" ").length;
    let numberOfSenteces = clearText?.split(". ").length;
    let numberOfParagraphs = clearText?.split("\n").length;

    if (clearText?.length === 0) {
      numberOfWords = 0;
      numberOfSenteces = 0;
      numberOfParagraphs = 0;
    }
    setStats({
      numberOfWords,
      numberOfSenteces,
      numberOfParagraphs,
    });
  }

  return (
    <>
      <Center h="100vh">
        <Box>
          <VStack
            spacing={3}
            border="1px solid"
            borderColor="gray.300"
            p={5}
            borderRadius={10}
          >
            <Heading>Word Frequency</Heading>

            <Textarea
              size="sm"
              borderRadius={4}
              value={text ?? ""}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a paragraph of text"
            />
            <Button onClick={getStats}>Check</Button>

            <Box m={4} p={4} bg="gray.100" borderRadius="md" w="100%">
              <Text>Number of words: {stats?.numberOfWords}</Text>
              <Text>Number of paragraphs: {stats?.numberOfParagraphs}</Text>
              <Text>Number of senteces: {stats?.numberOfSenteces}</Text>
            </Box>
          </VStack>
        </Box>
      </Center>
    </>
  );
}
