import ReactMarkdown from "react-markdown";
interface MarkdownProps {
  children: string;
}
export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => (
          <ul className="list-outside list-disc pl-5" {...props} />
        ),
        a: (props) => <a className="text-blue-500" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
