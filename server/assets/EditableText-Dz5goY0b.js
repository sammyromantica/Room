import { n as useAdmin } from "./admin-DTYQ9p9N.js";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/EditableText.tsx
function EditableText({ value, onChange, as = "span", className = "", multiline = false, placeholder }) {
	const { isAdmin } = useAdmin();
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState(value);
	const ref = useRef(null);
	useEffect(() => setDraft(value), [value]);
	useEffect(() => {
		if (editing) ref.current?.focus();
	}, [editing]);
	if (!isAdmin) return /* @__PURE__ */ jsx(as, {
		className,
		children: value.split("\n").map((line, i) => /* @__PURE__ */ jsxs("span", { children: [line, i < value.split("\n").length - 1 && /* @__PURE__ */ jsx("br", {})] }, i))
	});
	if (editing) {
		const commit = () => {
			onChange(draft);
			setEditing(false);
		};
		return multiline ? /* @__PURE__ */ jsx("textarea", {
			ref,
			value: draft,
			onChange: (e) => setDraft(e.target.value),
			onBlur: commit,
			placeholder,
			rows: Math.max(2, draft.split("\n").length),
			className: `block w-full resize-y border-2 border-dashed border-strawberry bg-white px-1 ${className}`
		}) : /* @__PURE__ */ jsx("input", {
			ref,
			value: draft,
			onChange: (e) => setDraft(e.target.value),
			onBlur: commit,
			onKeyDown: (e) => {
				if (e.key === "Enter") commit();
			},
			placeholder,
			className: `border-2 border-dashed border-strawberry bg-white px-1 ${className}`
		});
	}
	return /* @__PURE__ */ jsx(as, {
		className: `${className} cursor-text outline-2 outline-dashed outline-strawberry/0 hover:outline-strawberry/80`,
		onClick: () => setEditing(true),
		title: "✎ click para editar",
		children: value.split("\n").map((line, i) => /* @__PURE__ */ jsxs("span", { children: [line || "\xA0", i < value.split("\n").length - 1 && /* @__PURE__ */ jsx("br", {})] }, i))
	});
}
//#endregion
export { EditableText as t };
