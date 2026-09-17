import type { PostBlock } from "@/data/writing";

// Renders the block list of a write-up. No markdown pipeline: the four block
// types cover everything a 600-word post needs, and the bundle stays flat.
const PostBody = ({ blocks }: { blocks: PostBlock[] }) => {
  return (
    <div className="mt-10 space-y-5 text-base leading-relaxed text-white-100 md:text-lg">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="pt-4 text-2xl font-bold text-white md:text-3xl">
                {block.text}
              </h2>
            );
          case "p":
            return <p key={i}>{block.text}</p>;
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-3 pl-5">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                tabIndex={0}
                aria-label={`${block.lang} code`}
                className="overflow-x-auto rounded-2xl border border-white/10 bg-black-200 p-4 text-sm leading-relaxed text-white">
                <code className={`language-${block.lang}`}>{block.code}</code>
              </pre>
            );
        }
      })}
    </div>
  );
};

export default PostBody;
