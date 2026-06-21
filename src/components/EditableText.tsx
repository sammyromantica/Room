import { useEffect, useRef, useState } from "react";
import { useAdmin } from "@/lib/admin";

export function EditableText({
  value,
  onChange,
  as = "span",
  className = "",
  multiline = false,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  useEffect(() => setDraft(value), [value]);
  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  if (!isAdmin) {
    const Tag = as as any;
    return (
      <Tag className={className}>
        {value.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < value.split("\n").length - 1 && <br />}
          </span>
        ))}
      </Tag>
    );
  }

  if (editing) {
    const commit = () => {
      onChange(draft);
      setEditing(false);
    };
    return multiline ? (
      <textarea
        ref={ref as React.RefObject<HTMLTextAreaElement>}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        placeholder={placeholder}
        rows={Math.max(2, draft.split("\n").length)}
        className={`block w-full resize-y border-2 border-dashed border-strawberry bg-white px-1 ${className}`}
      />
    ) : (
      <input
        ref={ref as React.RefObject<HTMLInputElement>}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); }}
        placeholder={placeholder}
        className={`border-2 border-dashed border-strawberry bg-white px-1 ${className}`}
      />
    );
  }

  const Tag = as as any;
  return (
    <Tag
      className={`${className} cursor-text outline-2 outline-dashed outline-strawberry/0 hover:outline-strawberry/80`}
      onClick={() => setEditing(true)}
      title="✎ click para editar"
    >
      {value.split("\n").map((line, i) => (
        <span key={i}>
          {line || "\u00A0"}
          {i < value.split("\n").length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
}