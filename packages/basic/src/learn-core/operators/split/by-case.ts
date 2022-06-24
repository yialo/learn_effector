import { createEvent, createEffect, split } from "effector";

type MessageType = "plain" | "markdown";

interface Message {
  type: MessageType;
  value: string;
}

const messageReceived = createEvent<Message>();

const printTextFx = createEffect((message: Message) => {
  console.log(`Plain text message: ${message.value}`);
});

const parseMarkdownFx = createEffect((message: Message) => {
  const startTime = performance.now();

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const execDration = performance.now() - startTime;
      console.log(
        `Parsed to markdown:`,
        { data: message.value.split("") },
        `duration: ${execDration}ms`
      );
      resolve();
    }, 100);
  });
});

split({
  source: messageReceived,
  match: {
    plain: (msg) => msg.type === "plain",
    md: (msg) => msg.type === "markdown",
  },
  cases: {
    plain: printTextFx,
    md: parseMarkdownFx,
  },
});

messageReceived({
  type: "plain",
  value: "Hello Bob",
});

messageReceived({
  type: "markdown",
  value: "Hello Bob",
});
