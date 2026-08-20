//#region node_modules/.nitro/vite/services/ssr/assets/format-CVmQyRCQ.js
function formatDZD(value) {
	return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value).replace(/,/g, " ")} دج`;
}
function formatDate(value) {
	return new Intl.DateTimeFormat("ar-DZ", {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(new Date(value));
}
//#endregion
export { formatDate as n, formatDZD as t };
