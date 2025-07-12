import { type AnimationGeneratorType, motion } from "motion/react";
import Markdown from "react-markdown";

interface ChatBubbleProps {
  content: string;
}

const initial = { opacity: 0, scale: 0.75 };
const animate = { opacity: 1, scale: 1 };
const transition = {
  duration: 0.4,
  scale: { type: "spring" as AnimationGeneratorType, visualDuration: 0.4, bounce: 0.5 },
};

export function ChatBubbleAgent({ content }: ChatBubbleProps) {
  return (
    <div className="flex justify-end">
      <motion.div initial={initial} animate={animate} transition={transition} className="flex max-w-[85%] items-start">
        <span className="z-0 rounded-lg rounded-tr-none bg-neutral-200 px-3 py-1.5 text-sm shadow-[0_1px_2px_var(--color-neutral-400)]">
          <Markdown>{content}</Markdown>
        </span>
        <span className="z-10 size-0 border-[6px] border-neutral-200 border-r-transparent border-b-transparent" />
      </motion.div>
    </div>
  );
}

export function ChatBubbleUser({ content }: ChatBubbleProps) {
  return (
    <div className="flex justify-start">
      <motion.div initial={initial} animate={animate} transition={transition} className="flex max-w-[85%] items-start">
        <span className="z-10 size-0 border-[6px] border-neutral-600 border-b-transparent border-l-transparent" />
        <span className="z-0 rounded-lg rounded-tl-none bg-neutral-600 px-3 py-1.5 text-sm text-white shadow-[0_1px_2px_var(--color-neutral-400)]">
          <Markdown>{content}</Markdown>
        </span>
      </motion.div>
    </div>
  );
}
