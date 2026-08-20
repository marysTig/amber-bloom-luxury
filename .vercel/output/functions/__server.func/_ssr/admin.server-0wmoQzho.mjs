import { supabaseAdmin } from "./client.server-KzwUIAkW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.server-0wmoQzho.js
async function requireAdmin(token) {
	if (!token) throw new Error("غير مصرح");
	const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
	if (error || !user) throw new Error("انتهت الجلسة، يرجى تسجيل الدخول من جديد");
	const { data: roleData, error: roleError } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
	if (roleError || !roleData || roleData.role !== "admin") throw new Error("ليس لديك صلاحية الإدارة");
}
//#endregion
export { requireAdmin };
