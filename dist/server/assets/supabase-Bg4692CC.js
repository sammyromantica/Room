import { createClient } from "@supabase/supabase-js";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/lib/supabase.ts
var supabase_exports = /* @__PURE__ */ __exportAll({ supabase: () => supabase });
var supabase = createClient("https://ailxagjsbvnlqilfxuvp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbHhhZ2pzYnZubHFpbGZ4dXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNjU0MTUsImV4cCI6MjA5NzY0MTQxNX0.YYFjHPVGpxRZg7uPC26udnMA6vxgdfX0gtM4O_JkNS0");
//#endregion
export { supabase_exports as n, supabase as t };
