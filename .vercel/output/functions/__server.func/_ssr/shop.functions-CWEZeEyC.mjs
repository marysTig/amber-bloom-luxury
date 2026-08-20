import { r as createServerFn } from "./server-B5m_6cZs2.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DbFQTLa_.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { r as orderInputSchema } from "./shop.schemas-7IntXOuV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop.functions-CWEZeEyC.js
var getDeliveryFees = createServerFn({ method: "GET" }).handler(createSsrRpc("69a8504d74a18043e2ac882ac4ad35f0dcb299dd1afb2741f43c4c093ef738d0"));
var submitOrder = createServerFn({ method: "POST" }).inputValidator((data) => orderInputSchema.parse(data)).handler(createSsrRpc("a588f9e544729348735fe5bdfd638ab14f15e87d805702dc709b2dbb2474f92e"));
var getOrderByReference = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ reference: stringType().min(3).max(40) }).parse(data)).handler(createSsrRpc("3c5ece365351dbd5cbb3f09730a1f03ea9785b5c10f82478b139e03ecf33002a"));
//#endregion
export { getOrderByReference as n, submitOrder as r, getDeliveryFees as t };
