import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./server-B5m_6cZs2.mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-DbFQTLa_.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { i as productInputSchema, n as categoryInputSchema, t as adminTokenSchema } from "./shop.schemas-7IntXOuV.mjs";
import { r as productsQuery, t as categoriesQuery } from "./catalog-PiW0eF47.mjs";
import { n as formatDate, t as formatDZD } from "./format-CVmQyRCQ.mjs";
import { t as wilayas_with_municipalities_default } from "./wilayas-with-municipalities-f6l3UAcX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as GripVertical, a as Star, b as ChevronLeft, h as LoaderCircle, i as Trash2, l as Plus, m as Lock, n as User, p as LogOut, r as Truck, t as X, u as Pencil, v as CloudUpload, y as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CBeYOx_4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var adminLogin = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	email: stringType().email(),
	password: stringType().min(1).max(200)
}).parse(data)).handler(createSsrRpc("89f029f4fc21ed092423cd54f44fb61078423691288a3a89663a6e0973cd86ea"));
var adminOverview = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.parse(data)).handler(createSsrRpc("65dbdd42678d4cf3348f8143806993df600c6d6e2d11eded1594324413609a95"));
var adminListOrders = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.parse(data)).handler(createSsrRpc("573be2cdf3c95bfa88f6bb3d2080ff0b0c620db545ac53f2f5a039a50348d737"));
var adminSetOrderStatus = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({
	id: stringType().uuid(),
	status: enumType([
		"قيد الانتظار",
		"مؤكد",
		"في التوصيل",
		"مكتمل",
		"ملغي"
	])
}).parse(data)).handler(createSsrRpc("889ae61040d9bd29926ab0915e752bccd669e918182aef01d6c23513a117ad85"));
var adminDeleteOrder = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ id: stringType().uuid() }).parse(data)).handler(createSsrRpc("077bc5ff90cc1f578c6597290e83048464fd42de4066d3cccf024c8080b55959"));
var adminSaveProduct = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ product: productInputSchema }).parse(data)).handler(createSsrRpc("0aba47d27a6b467234d5b8b494d16bb446b7ca53f463ecbbd00e9a33a19ef0f3"));
var adminDeleteProduct = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ id: stringType().uuid() }).parse(data)).handler(createSsrRpc("0ddf57ac23192120a1e98e48f57343c6fe83e8a1ddcf5df54be83354a1f768ad"));
var adminSaveCategory = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ category: categoryInputSchema }).parse(data)).handler(createSsrRpc("35f84d67dda2de6df81b7a43c7acdb0df007930bc74b903bb0d1784b68ab2349"));
var adminDeleteCategory = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ id: stringType().uuid() }).parse(data)).handler(createSsrRpc("950328abc056627e7020b8ee4af15de2c8185c6b4f0fa341cec497db75a14951"));
var adminGetDeliveryFees = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.parse(data)).handler(createSsrRpc("88d4492d68520da23c630e05ebd5be35f349083b918591673b6fac33c742169c"));
var adminSaveDeliveryFees = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({ fees: arrayType(objectType({
	wilaya_code: numberType().int().positive(),
	wilaya_name_fr: stringType().min(1),
	desk_price: numberType().min(0),
	home_price: numberType().min(0)
})) }).parse(data)).handler(createSsrRpc("4fc9dfb8da00d94592ccc4eb6f79d8c00a509e62b1662efcfa0746d07851d917"));
var adminUpdateProfile = createServerFn({ method: "POST" }).inputValidator((data) => adminTokenSchema.extend({
	email: stringType().email().optional(),
	password: stringType().min(6).optional()
}).parse(data)).handler(createSsrRpc("ee3c33bb2bfb3a4224c48a7449cddde2e0585de0dd9a0f041e0cc2aea5871203"));
async function uploadToCloudinary$1(file) {
	const cloudName = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["VITE_CLOUDINARY_CLOUD_NAME"];
	const uploadPreset = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["VITE_CLOUDINARY_UPLOAD_PRESET"];
	if (!cloudName || !uploadPreset) throw new Error("Cloudinary configuration missing");
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", uploadPreset);
	formData.append("folder", "parfum");
	const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
		method: "POST",
		body: formData
	});
	if (!res.ok) {
		const err = await res.json();
		throw new Error(err.error?.message || "Upload failed");
	}
	return (await res.json()).secure_url;
}
function ImageUploader({ value, onChange, className = "" }) {
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const handleDrag = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
		else setIsDragging(false);
	}, []);
	const handleDrop = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		if (e.dataTransfer.files?.[0]) handleUpload(e.dataTransfer.files[0]);
	}, []);
	const handleFileInput = (e) => {
		if (e.target.files?.[0]) handleUpload(e.target.files[0]);
	};
	const handleUpload = async (file) => {
		if (!file.type.startsWith("image/")) {
			toast.error("يرجى اختيار صورة صالحة");
			return;
		}
		setIsUploading(true);
		try {
			onChange(await uploadToCloudinary$1(file));
			toast.success("تم رفع الصورة بنجاح ✓");
		} catch (err) {
			toast.error(err.message || "حدث خطأ أثناء رفع الصورة");
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};
	const removeImage = (e) => {
		e.stopPropagation();
		onChange("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-all duration-200 ${isDragging ? "scale-[1.01] border-primary bg-primary/10" : value ? "border-border/40 bg-transparent" : "border-border/70 bg-card/30 hover:border-primary/50 hover:bg-card/50"} ${className}`,
		onDragEnter: handleDrag,
		onDragLeave: handleDrag,
		onDragOver: handleDrag,
		onDrop: handleDrop,
		onClick: () => !value && !isUploading && fileInputRef.current?.click(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "file",
			ref: fileInputRef,
			onChange: handleFileInput,
			accept: "image/*",
			className: "hidden"
		}), isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-9 w-9 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm",
				children: "جاري الرفع..."
			})]
		}) : value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-full w-full items-center justify-center p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: value,
				alt: "Preview",
				className: "max-h-[200px] rounded object-contain shadow-sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: removeImage,
				title: "حذف الصورة",
				className: "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 shadow transition-colors hover:bg-destructive hover:text-destructive-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-2 p-6 text-center text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-10 w-10 text-muted-foreground/50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: "اسحب وأفلت الصورة هنا"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs opacity-70",
					children: "أو اضغط لاختيار ملف"
				})
			]
		})]
	});
}
async function uploadToCloudinary(file) {
	const cloudName = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["VITE_CLOUDINARY_CLOUD_NAME"];
	const uploadPreset = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["VITE_CLOUDINARY_UPLOAD_PRESET"];
	if (!cloudName || !uploadPreset) throw new Error("Cloudinary configuration missing");
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", uploadPreset);
	formData.append("folder", "parfum");
	const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
		method: "POST",
		body: formData
	});
	if (!res.ok) {
		const err = await res.json();
		throw new Error(err.error?.message || "Upload failed");
	}
	return (await res.json()).secure_url;
}
function MultiImageUploader({ value = [], onChange, className = "" }) {
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const latestValue = (0, import_react.useRef)(value);
	latestValue.current = value;
	const dragItemIndex = (0, import_react.useRef)(null);
	const dragOverItemIndex = (0, import_react.useRef)(null);
	const handleUpload = (0, import_react.useCallback)(async (files) => {
		const validFiles = files.filter((f) => f.type.startsWith("image/"));
		if (validFiles.length === 0) {
			toast.error("يرجى اختيار صور صالحة");
			return;
		}
		setIsUploading(true);
		try {
			const urls = await Promise.all(validFiles.map(uploadToCloudinary));
			onChange([...latestValue.current, ...urls]);
			toast.success("تم رفع الصور بنجاح ✓");
		} catch (err) {
			toast.error(err.message || "حدث خطأ أثناء رفع الصور");
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	}, [onChange]);
	const handleDrag = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
		else setIsDragging(false);
	}, []);
	const handleDrop = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleUpload(Array.from(e.dataTransfer.files));
	}, [handleUpload]);
	const handleFileInput = (e) => {
		if (e.target.files && e.target.files.length > 0) handleUpload(Array.from(e.target.files));
	};
	const moveImage = (index, direction) => {
		const newValues = [...value];
		if (direction === "first") {
			const [item] = newValues.splice(index, 1);
			newValues.unshift(item);
		} else if (direction === "left" && index > 0) [newValues[index - 1], newValues[index]] = [newValues[index], newValues[index - 1]];
		else if (direction === "right" && index < newValues.length - 1) [newValues[index], newValues[index + 1]] = [newValues[index + 1], newValues[index]];
		onChange(newValues);
	};
	const removeImage = (e, indexToRemove) => {
		e.stopPropagation();
		const newValues = [...value];
		newValues.splice(indexToRemove, 1);
		onChange(newValues);
	};
	const [dragOverIndex, setDragOverIndex] = (0, import_react.useState)(null);
	const onImageDragStart = (e, index) => {
		dragItemIndex.current = index;
		e.dataTransfer.effectAllowed = "move";
		const ghost = document.createElement("div");
		ghost.style.position = "absolute";
		ghost.style.top = "-9999px";
		document.body.appendChild(ghost);
		e.dataTransfer.setDragImage(ghost, 0, 0);
		setTimeout(() => document.body.removeChild(ghost), 0);
	};
	const onImageDragEnter = (index) => {
		dragOverItemIndex.current = index;
		setDragOverIndex(index);
	};
	const onImageDragEnd = () => {
		const from = dragItemIndex.current;
		const to = dragOverItemIndex.current;
		if (from !== null && to !== null && from !== to) {
			const newValues = [...value];
			const [moved] = newValues.splice(from, 1);
			newValues.splice(to, 0, moved);
			onChange(newValues);
		}
		dragItemIndex.current = null;
		dragOverItemIndex.current = null;
		setDragOverIndex(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-4 ${className}`,
		children: [
			value.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-3 w-3" }), "اسحب أو استخدم الأسهم لتغيير الترتيب — الصورة الأولى هي الرئيسية"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
				children: [value.map((url, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					draggable: true,
					onDragStart: (e) => onImageDragStart(e, index),
					onDragEnter: () => onImageDragEnter(index),
					onDragOver: (e) => {
						e.preventDefault();
						e.dataTransfer.dropEffect = "move";
					},
					onDragEnd: onImageDragEnd,
					className: `relative group aspect-square rounded-md overflow-hidden border transition-all duration-150 cursor-grab active:cursor-grabbing select-none ${dragOverIndex === index ? "border-primary scale-105 shadow-lg shadow-primary/20" : "border-border/50 bg-card"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: url,
							alt: `Preview ${index}`,
							className: "w-full h-full object-cover pointer-events-none",
							draggable: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-4 w-4 text-white drop-shadow" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (e) => removeImage(e, index),
							title: "حذف الصورة",
							className: "absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 shadow text-muted-foreground opacity-0 group-hover:opacity-100 sm:opacity-0 opacity-100 transition-all hover:bg-destructive hover:text-destructive-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-0 inset-x-0 flex items-center justify-between bg-black/50 px-1 py-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										moveImage(index, "left");
									},
									disabled: index === 0,
									className: "flex h-6 w-6 items-center justify-center rounded text-white/80 hover:text-white disabled:opacity-20 transition-colors",
									title: "تحريك يساراً",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
								}),
								index !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										moveImage(index, "first");
									},
									className: "flex h-5 w-5 items-center justify-center rounded text-yellow-400 hover:text-yellow-300 transition-colors",
									title: "جعلها الصورة الرئيسية",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										moveImage(index, "right");
									},
									disabled: index === value.length - 1,
									className: "flex h-6 w-6 items-center justify-center rounded text-white/80 hover:text-white disabled:opacity-20 transition-colors",
									title: "تحريك يميناً",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
								})
							]
						}),
						index === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] px-2 py-0.5 rounded shadow backdrop-blur",
							children: "الرئيسية"
						})
					]
				}, url + index)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					onClick: () => !isUploading && fileInputRef.current?.click(),
					className: "aspect-square flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-md cursor-pointer hover:border-primary/50 hover:bg-card/50 transition-colors",
					children: isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-8 w-8 text-muted-foreground/60" })
				})]
			})] }),
			value.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-all duration-200 ${isDragging ? "scale-[1.01] border-primary bg-primary/10" : "border-border/70 bg-card/30 hover:border-primary/50 hover:bg-card/50"}`,
				onDragEnter: handleDrag,
				onDragLeave: handleDrag,
				onDragOver: handleDrag,
				onDrop: handleDrop,
				onClick: () => !isUploading && fileInputRef.current?.click(),
				children: isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-9 w-9 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: "جاري الرفع..."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2 p-6 text-center text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-10 w-10 text-muted-foreground/50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "اسحب وأفلت الصور هنا"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs opacity-70",
							children: "أو اضغط لاختيار ملفات"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				ref: fileInputRef,
				onChange: handleFileInput,
				accept: "image/*",
				multiple: true,
				className: "hidden"
			})
		]
	});
}
var TOKEN_KEY = "ambre-admin-token";
var TABS = [
	{
		id: "overview",
		label: "نظرة عامة"
	},
	{
		id: "products",
		label: "المنتجات"
	},
	{
		id: "categories",
		label: "الفئات"
	},
	{
		id: "orders",
		label: "الطلبات"
	},
	{
		id: "livraison",
		label: "الشحن"
	},
	{
		id: "profile",
		label: "Profil"
	}
];
function AdminPage() {
	const [token, setToken] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setToken(sessionStorage.getItem(TOKEN_KEY));
		setReady(true);
	}, []);
	const signOut = () => {
		sessionStorage.removeItem(TOKEN_KEY);
		setToken(null);
	};
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-background" });
	if (!token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, { onSuccess: (t) => {
		sessionStorage.setItem(TOKEN_KEY, t);
		setToken(t);
	} });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {
		token,
		onSignOut: signOut
	});
}
function LoginScreen({ onSuccess }) {
	const login = useServerFn(adminLogin);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setPending(true);
		try {
			onSuccess((await login({ data: {
				email,
				password
			} })).token);
			toast.success("مرحباً بك في مساحة الإدارة");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تعذّر تسجيل الدخول");
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "w-full max-w-sm rounded-sm border border-border/60 bg-card/50 p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-6 w-6 text-primary" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 text-center font-display text-2xl text-foreground",
					children: "مساحة الإدارة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm text-muted-foreground",
					children: "أدخل البريد الإلكتروني وكلمة المرور للمتابعة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					placeholder: "البريد الإلكتروني",
					"aria-label": "البريد الإلكتروني",
					className: "input-base mt-7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					placeholder: "كلمة المرور",
					"aria-label": "كلمة المرور",
					className: "input-base mt-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: pending || !password || !email,
					className: "mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50",
					children: [pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "دخول"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 block text-center text-xs text-muted-foreground hover:text-primary",
					children: "العودة إلى المتجر"
				})
			]
		})
	});
}
function Dashboard({ token, onSignOut }) {
	const [tab, setTab] = (0, import_react.useState)("overview");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border/60 bg-card/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-gold",
					children: "لوحة التحكم"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs tracking-[0.3em] text-muted-foreground",
					children: "GLOW & CARE"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-sm border border-border/70 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary",
						children: "عرض المتجر"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onSignOut,
						className: "flex items-center gap-2 rounded-sm border border-border/70 px-4 py-2.5 text-sm text-muted-foreground hover:text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "خروج"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 md:px-8",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t.id),
					className: `whitespace-nowrap rounded-sm px-5 py-2.5 text-sm transition-colors ${tab === t.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`,
					children: t.label
				}, t.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-7xl px-4 py-10 md:px-8",
			children: [
				tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewTab, { token }),
				tab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsTab, { token }),
				tab === "categories" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesTab, { token }),
				tab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersTab, { token }),
				tab === "livraison" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivraisonTab, { token }),
				tab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileTab, {
					token,
					onSignOut
				})
			]
		})]
	});
}
function OverviewTab({ token }) {
	const fetchOverview = useServerFn(adminOverview);
	const { data, isLoading } = useQuery({
		queryKey: ["admin-overview"],
		queryFn: () => fetchOverview({ data: { token } })
	});
	const cards = [
		{
			label: "إجمالي المنتجات",
			value: data?.products ?? 0
		},
		{
			label: "إجمالي الفئات",
			value: data?.categories ?? 0
		},
		{
			label: "قيد الانتظار",
			value: data?.pendingOrders ?? 0
		},
		{
			label: "مؤكدة",
			value: data?.confirmedOrders ?? 0
		},
		{
			label: "في التوصيل",
			value: data?.inDeliveryOrders ?? 0
		},
		{
			label: "مكتملة",
			value: data?.completedOrders ?? 0
		},
		{
			label: "إجمالي المبيعات",
			value: formatDZD(data?.revenue ?? 0)
		}
	];
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-sm bg-card/50" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-sm border border-border/60 bg-card/40 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: c.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-3xl text-primary",
				children: c.value
			})]
		}, c.label))
	});
}
var EMPTY_PRODUCT = {
	name: "",
	price: 0,
	stock: 0,
	description: "",
	category_id: null,
	images: [],
	volume_ml: void 0,
	badge: "",
	benefits: "",
	ingredients: "",
	how_to_use: "",
	shade: [],
	origin: "",
	expiration_date: ""
};
function ProductsTab({ token }) {
	const qc = useQueryClient();
	const products = useQuery(productsQuery());
	const categories = useQuery(categoriesQuery());
	const save = useServerFn(adminSaveProduct);
	const remove = useServerFn(adminDeleteProduct);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const refresh = () => {
		qc.invalidateQueries({ queryKey: ["products"] });
		qc.invalidateQueries({ queryKey: ["admin-overview"] });
	};
	const openEdit = (p) => setEditing({
		id: p.id,
		name: p.name,
		price: p.price,
		stock: p.stock,
		description: p.description,
		category_id: p.category_id,
		images: p.images ?? [],
		volume_ml: p.volume_ml,
		badge: p.badge ?? "",
		benefits: p.benefits.join("، "),
		ingredients: p.ingredients.join("، "),
		how_to_use: p.how_to_use,
		shade: p.shade ?? [],
		origin: p.origin ?? "",
		expiration_date: p.expiration_date ?? ""
	});
	const splitNotes = (value) => value.split(/[،,]/).map((s) => s.trim()).filter(Boolean).slice(0, 12);
	const submit = async (e) => {
		e.preventDefault();
		if (!editing) return;
		setPending(true);
		try {
			await save({ data: {
				token,
				product: {
					...editing.id ? { id: editing.id } : {},
					name: editing.name,
					price: Number(editing.price),
					stock: Number(editing.stock),
					description: editing.description,
					category_id: editing.category_id,
					images: editing.images,
					volume_ml: editing.volume_ml ? Number(editing.volume_ml) : void 0,
					badge: editing.badge ? editing.badge : null,
					benefits: splitNotes(editing.benefits),
					ingredients: splitNotes(editing.ingredients),
					how_to_use: editing.how_to_use,
					shade: editing.shade,
					origin: editing.origin,
					expiration_date: editing.expiration_date
				}
			} });
			toast.success("تم حفظ المنتج");
			setEditing(null);
			refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تعذّر الحفظ");
		} finally {
			setPending(false);
		}
	};
	const onDelete = async (id) => {
		if (!confirm("هل تريد حذف هذا المنتج نهائياً؟")) return;
		try {
			await remove({ data: {
				token,
				id
			} });
			toast.success("تم حذف المنتج");
			refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تعذّر الحذف");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-foreground",
				children: "إدارة المنتجات"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setEditing({ ...EMPTY_PRODUCT }),
				className: "flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "إضافة منتج"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4",
			children: (products.data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4 rounded-sm border border-border/60 bg-card/40 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.images?.[0] || "/images/perfume-1.jpg",
						alt: p.name,
						loading: "lazy",
						className: "h-20 w-16 rounded-sm object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-40 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-foreground",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: categories.data?.find((c) => c.id === p.category_id)?.name ?? "بدون فئة"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-primary",
						children: formatDZD(p.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground",
						children: ["المخزون: ", p.stock > 0 ? p.stock : "نفد المخزون"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => openEdit(p),
							"aria-label": "تعديل",
							className: "flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 text-muted-foreground hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onDelete(p.id),
							"aria-label": "حذف",
							className: "flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 text-muted-foreground hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})
				]
			}, p.id))
		}),
		editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			title: editing.id ? "تعديل منتج" : "إضافة منتج",
			onClose: () => setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
						label: "اسم المنتج *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							className: "input-base",
							value: editing.name,
							onChange: (e) => setEditing({
								...editing,
								name: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "السعر (دج) *",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "number",
								min: 0,
								className: "input-base",
								value: editing.price,
								onChange: (e) => setEditing({
									...editing,
									price: Number(e.target.value)
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "المخزون *",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "number",
								min: 0,
								className: "input-base",
								value: editing.stock,
								onChange: (e) => setEditing({
									...editing,
									stock: Number(e.target.value)
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
						label: "الوصف *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							rows: 3,
							className: "input-base resize-none",
							value: editing.description,
							onChange: (e) => setEditing({
								...editing,
								description: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
						label: "صور المنتج *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiImageUploader, {
							value: editing.images,
							onChange: (urls) => setEditing({
								...editing,
								images: urls
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "الفئة *",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "input-base",
								value: editing.category_id ?? "",
								onChange: (e) => setEditing({
									...editing,
									category_id: e.target.value || null
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									className: "bg-card",
									children: "بدون فئة"
								}), (categories.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									className: "bg-card",
									children: c.name
								}, c.id))]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "الشارة *",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "input-base",
								value: editing.badge ?? "",
								onChange: (e) => setEditing({
									...editing,
									badge: e.target.value || null
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									className: "bg-card",
									children: "بدون"
								}), [
									"جديد",
									"الأكثر مبيعاً",
									"إصدار محدود"
								].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: b,
									className: "bg-card",
									children: b
								}, b))]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "group pt-2 border-t border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "mb-3 cursor-pointer list-none text-xs tracking-widest text-muted-foreground/60 uppercase flex items-center justify-between hover:text-primary transition-colors",
							children: ["معلومات إضافية (اختياري)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "transition-transform duration-200 group-open:rotate-180",
								children: "▼"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
											label: "الحجم (مل)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "1",
												className: "input-base",
												placeholder: "مثال: 50",
												value: editing.volume_ml ?? "",
												onChange: (e) => setEditing({
													...editing,
													volume_ml: e.target.value ? Number(e.target.value) : void 0
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
											label: "الدرجة / اللون - Teinte/Couleur",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
												values: editing.shade,
												onChange: (tags) => setEditing({
													...editing,
													shade: tags
												}),
												placeholder: "مثال: Rouge..."
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
											label: "بلد الصنع (Origine)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "input-base",
												placeholder: "مثال: France",
												value: editing.origin ?? "",
												onChange: (e) => setEditing({
													...editing,
													origin: e.target.value
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
											label: "تاريخ الصلاحية (Date d'expiration)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "input-base",
												placeholder: "مثال: 12 شهر",
												value: editing.expiration_date ?? "",
												onChange: (e) => setEditing({
													...editing,
													expiration_date: e.target.value
												})
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "الفوائد (افصل بفاصلة)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "input-base",
										placeholder: "ترطيب عميق، تفتيح البشرة...",
										value: editing.benefits,
										onChange: (e) => setEditing({
											...editing,
											benefits: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "المكونات الأساسية (افصل بفاصلة)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "input-base",
										placeholder: "فيتامين سي، حمض الهيالورونيك...",
										value: editing.ingredients,
										onChange: (e) => setEditing({
											...editing,
											ingredients: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "طريقة الاستخدام",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 2,
										className: "input-base resize-none",
										placeholder: "يوضع على بشرة نظيفة...",
										value: editing.how_to_use,
										onChange: (e) => setEditing({
											...editing,
											how_to_use: e.target.value
										})
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: pending,
						className: "flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: [pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "حفظ"]
					})
				]
			})
		})
	] });
}
function CategoriesTab({ token }) {
	const qc = useQueryClient();
	const categories = useQuery(categoriesQuery());
	const save = useServerFn(adminSaveCategory);
	const remove = useServerFn(adminDeleteCategory);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [photo, setPhoto] = (0, import_react.useState)("");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const refresh = () => {
		qc.invalidateQueries({ queryKey: ["categories"] });
		qc.invalidateQueries({ queryKey: ["admin-overview"] });
	};
	const submit = async (e) => {
		e.preventDefault();
		try {
			console.log("SUBMIT CATEGORY:", {
				name,
				description,
				photo,
				editingId
			});
			await save({ data: {
				token,
				category: {
					...editingId ? { id: editingId } : {},
					name,
					description,
					photo
				}
			} });
			toast.success(editingId ? "تم تعديل الفئة" : "تمت إضافة الفئة");
			setName("");
			setDescription("");
			setPhoto("");
			setEditingId(null);
			refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تعذّر الحفظ");
		}
	};
	const onDelete = async (id) => {
		if (!confirm("هل تريد حذف هذه الفئة؟")) return;
		try {
			await remove({ data: {
				token,
				id
			} });
			toast.success("تم حذف الفئة");
			refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تعذّر الحذف");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-foreground",
				children: "إدارة الفئات"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-6 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "input-base flex-1",
							placeholder: "اسم الفئة",
							value: name,
							onChange: (e) => setName(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
						value: photo,
						onChange: (url) => setPhoto(url),
						className: "mt-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "input-base min-h-[80px]",
						placeholder: "وصف الفئة",
						value: description,
						onChange: (e) => setDescription(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: name.trim().length < 2,
							className: "rounded-sm bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50",
							children: editingId ? "تعديل" : "إضافة"
						}), editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setEditingId(null);
								setName("");
								setDescription("");
								setPhoto("");
							},
							className: "rounded-sm border border-border/70 px-5 py-2 text-sm text-muted-foreground",
							children: "إلغاء"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 space-y-3",
				children: (categories.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-sm border border-border/60 bg-card/40 px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [c.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.photo,
							alt: c.name,
							className: "h-12 w-12 rounded-sm object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-sm bg-muted flex items-center justify-center text-muted-foreground text-xs",
							children: "لا صورة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium text-foreground",
							children: c.name
						}), c.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-muted-foreground line-clamp-1",
							children: c.description
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "تعديل",
							onClick: () => {
								setEditingId(c.id);
								setName(c.name);
								setDescription(c.description || "");
								setPhoto(c.photo || "");
							},
							className: "flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 text-muted-foreground hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "حذف",
							onClick: () => onDelete(c.id),
							className: "flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 text-muted-foreground hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}, c.id))
			})
		]
	});
}
var STATUS_CONFIG = {
	"قيد الانتظار": {
		color: "bg-yellow-500/15 text-yellow-500",
		label: "قيد الانتظار",
		next: "مؤكد"
	},
	"مؤكد": {
		color: "bg-blue-500/15 text-blue-400",
		label: "مؤكد",
		next: "في التوصيل"
	},
	"في التوصيل": {
		color: "bg-purple-500/15 text-purple-400",
		label: "في التوصيل",
		next: "مكتمل"
	},
	"مكتمل": {
		color: "bg-primary/15 text-primary",
		label: "مكتمل"
	},
	"ملغي": {
		color: "bg-destructive/15 text-destructive",
		label: "ملغي"
	}
};
function OrdersTab({ token }) {
	const qc = useQueryClient();
	const fetchOrders = useServerFn(adminListOrders);
	const setStatus = useServerFn(adminSetOrderStatus);
	const { data, isLoading } = useQuery({
		queryKey: ["admin-orders"],
		queryFn: () => fetchOrders({ data: { token } })
	});
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [changingStatus, setChangingStatus] = (0, import_react.useState)(false);
	const removeOrder = useServerFn(adminDeleteOrder);
	const onDeleteOrder = async (id) => {
		if (!confirm("هل أنت متأكد من أنك تريد حذف هذا الطلب نهائياً؟")) return;
		try {
			await removeOrder({ data: {
				token,
				id
			} });
			toast.success("تم حذف الطلب");
			setSelected(null);
			qc.invalidateQueries({ queryKey: ["admin-orders"] });
			qc.invalidateQueries({ queryKey: ["admin-overview"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تعذّر الحذف");
		}
	};
	const updateStatus = async (id, status) => {
		setChangingStatus(true);
		try {
			await setStatus({ data: {
				token,
				id,
				status
			} });
			toast.success("تم تحديث حالة الطلب");
			qc.invalidateQueries({ queryKey: ["admin-orders"] });
			qc.invalidateQueries({ queryKey: ["admin-overview"] });
			if (selected?.id === id) setSelected((prev) => prev ? {
				...prev,
				status
			} : null);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تعذّر التحديث");
		} finally {
			setChangingStatus(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-sm bg-card/50" });
	const orders = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl text-foreground",
			children: "إدارة الطلبات"
		}),
		orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10 text-muted-foreground",
			children: "لا توجد طلبات بعد."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 overflow-x-auto rounded-sm border border-border/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[900px] text-right text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-card/60 text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"رقم الطلب",
						"العميل",
						"الهاتف",
						"الولاية",
						"البلدية",
						"المنتجات",
						"الكمية",
						"سعر التوصيل",
						"الإجمالي (التوصيل متضمن)",
						"التاريخ",
						"الحالة",
						""
					].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-normal",
						children: h
					}, i)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.map((o) => {
					const qty = o.order_items.reduce((n, i) => n + i.quantity, 0);
					const itemsTotal = o.order_items.reduce((n, i) => n + Number(i.subtotal), 0);
					const deliveryFee = Number(o.total) - itemsTotal;
					const cfg = STATUS_CONFIG[o.status] ?? {
						color: "bg-muted text-muted-foreground",
						label: o.status
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						onClick: () => setSelected(o),
						className: "cursor-pointer border-t border-border/50 transition-colors hover:bg-card/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-primary",
								children: o.reference
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: o.customer_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: o.phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: o.wilaya
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: o.commune || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: o.order_items.map((i) => i.selected_shade ? `${i.product_name} (${i.selected_shade})` : i.product_name).join("، ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: deliveryFee > 0 ? formatDZD(deliveryFee) : "مجاني"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-primary font-medium",
								children: formatDZD(Number(o.total))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4 text-muted-foreground",
								children: formatDate(o.created_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-3 py-1 text-xs font-medium ${cfg.color}`,
									children: cfg.label
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										onDeleteOrder(o.id);
									},
									className: "flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							})
						]
					}, o.id);
				}) })]
			})
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: `الطلب ${selected.reference}`,
			onClose: () => setSelected(null),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							label: "اسم العميل",
							value: selected.customer_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							label: "رقم الهاتف",
							value: selected.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							label: "الولاية",
							value: selected.wilaya
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							label: "البلدية",
							value: selected.commune || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							label: "العنوان",
							value: selected.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							label: "تاريخ الطلب",
							value: formatDate(selected.created_at)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-5 gold-rule" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3 text-sm",
					children: selected.order_items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-foreground/90",
							children: [
								i.product_name,
								" ",
								i.selected_shade ? `(${i.selected_shade}) ` : "",
								"× ",
								i.quantity,
								" (",
								formatDZD(Number(i.unit_price)),
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: formatDZD(Number(i.subtotal))
						})]
					}, i.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-5 gold-rule" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "سعر التوصيل" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Number(selected.total) - selected.order_items.reduce((n, i) => n + Number(i.subtotal), 0) > 0 ? formatDZD(Number(selected.total) - selected.order_items.reduce((n, i) => n + Number(i.subtotal), 0)) : "مجاني" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center justify-between text-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: "الإجمالي (التوصيل متضمن)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary font-medium",
						children: formatDZD(Number(selected.total))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm text-muted-foreground",
						children: "تغيير حالة الطلب"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
						children: Object.keys(STATUS_CONFIG).map((s) => {
							const cfg = STATUS_CONFIG[s];
							const isActive = selected.status === s;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: isActive || changingStatus,
								onClick: () => updateStatus(selected.id, s),
								className: `rounded-sm px-3 py-2 text-xs font-medium transition-all ${isActive ? `${cfg.color} ring-1 ring-current opacity-100 cursor-default` : "bg-card border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground disabled:opacity-40"}`,
								children: cfg.label
							}, s);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: changingStatus,
						onClick: () => onDeleteOrder(selected.id),
						className: "flex items-center gap-2 rounded-sm bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), "حذف الطلب"]
					})
				})
			]
		})
	] });
}
function DetailRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground",
			children: value
		})]
	});
}
function AdminField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block text-sm text-foreground/85",
			children: label
		}), children]
	});
}
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "my-8 w-full max-w-2xl rounded-sm border border-border/70 bg-card p-6 md:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl text-foreground",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "إغلاق",
					className: "flex h-10 w-10 items-center justify-center rounded-sm text-muted-foreground hover:text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children
			})]
		})
	});
}
function LivraisonTab({ token }) {
	const getFees = useServerFn(adminGetDeliveryFees);
	const saveFees = useServerFn(adminSaveDeliveryFees);
	const wilayaList = wilayas_with_municipalities_default;
	const [fees, setFees] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getFees({ data: { token } }).then((data) => {
			const map = {};
			wilayaList.forEach((w) => {
				map[w.wilayaCode] = {
					desk: 0,
					home: 0
				};
			});
			data.forEach((row) => {
				map[row.wilaya_code] = {
					desk: Number(row.desk_price),
					home: Number(row.home_price)
				};
			});
			setFees(map);
			setLoading(false);
		});
	}, []);
	const handleSaveAll = async () => {
		setSaving(true);
		try {
			const payload = wilayaList.map((w) => ({
				wilaya_code: w.wilayaCode,
				wilaya_name_fr: w.nameFr,
				desk_price: fees[w.wilayaCode]?.desk ?? 0,
				home_price: fees[w.wilayaCode]?.home ?? 0
			}));
			await saveFees({ data: {
				token,
				fees: payload
			} });
			toast.success("Tarifs de livraison sauvegardés !");
		} catch {
			toast.error("Erreur lors de la sauvegarde");
		} finally {
			setSaving(false);
		}
	};
	const filtered = wilayaList.filter((w) => !search || w.nameFr.toLowerCase().includes(search.toLowerCase()) || w.nameAr.includes(search) || String(w.wilayaCode).includes(search));
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-foreground",
				children: "Tarifs de Livraison"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Définissez les frais de livraison par wilaya — Bureau ou À la maison"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				placeholder: "Rechercher une wilaya…",
				value: search,
				onChange: (e) => setSearch(e.target.value),
				className: "w-52 rounded-sm border border-border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: saving,
				onClick: handleSaveAll,
				className: "flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-95 disabled:opacity-60",
				children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" }), "Sauvegarder tout"]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-sm border border-border bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[60px_1fr_150px_150px] border-b border-border bg-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Code" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wilaya" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-center",
						children: "Bureau (DZD)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-center",
						children: "À la maison (DZD)"
					})
				]
			}),
			filtered.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[60px_1fr_150px_150px] items-center border-b border-border/50 px-5 py-3 last:border-0 hover:bg-primary/5 transition-colors",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-7 w-7 items-center justify-center rounded-sm bg-primary/10 text-xs font-bold text-primary",
						children: String(w.wilayaCode).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: w.nameFr
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: w.nameAr
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: "0",
							step: "50",
							value: fees[w.wilayaCode]?.desk ?? 0,
							onChange: (e) => setFees((prev) => ({
								...prev,
								[w.wilayaCode]: {
									desk: Number(e.target.value),
									home: prev[w.wilayaCode]?.home ?? 0
								}
							})),
							className: "w-28 rounded-sm border border-border bg-background px-3 py-1.5 text-center text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: "0",
							step: "50",
							value: fees[w.wilayaCode]?.home ?? 0,
							onChange: (e) => setFees((prev) => ({
								...prev,
								[w.wilayaCode]: {
									desk: prev[w.wilayaCode]?.desk ?? 0,
									home: Number(e.target.value)
								}
							})),
							className: "w-28 rounded-sm border border-border bg-background px-3 py-1.5 text-center text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
						})
					})
				]
			}, w.wilayaCode)),
			filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-10 text-center text-sm text-muted-foreground",
				children: "Aucune wilaya trouvée"
			})
		]
	})] });
}
function ProfileTab({ token, onSignOut }) {
	const updateProfile = useServerFn(adminUpdateProfile);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			await updateProfile({ data: {
				token,
				email,
				password
			} });
			toast.success("Profil mis à jour avec succès !");
			if (password) {
				toast.info("Veuillez vous reconnecter avec le nouveau mot de passe.");
				onSignOut();
			}
		} catch (err) {
			toast.error(err.message || "Erreur lors de la mise à jour");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-foreground",
				children: "Profil"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-6 rounded-sm border border-border bg-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-2 block text-sm font-medium text-foreground",
					children: ["Nouvel Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground font-normal",
						children: "(Optionnel)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					placeholder: "admin@glow-and-care.com",
					className: "w-full rounded-sm border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary",
					dir: "ltr"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mb-2 block text-sm font-medium text-foreground",
						children: ["Nouveau Mot de passe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground font-normal",
							children: "(Optionnel)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						placeholder: "••••••••",
						minLength: 6,
						className: "w-full rounded-sm border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary",
						dir: "ltr"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Laissez vide pour conserver le mot de passe actuel."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: saving || !email && !password,
					className: "flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:brightness-95 disabled:opacity-50",
					children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Sauvegarder les modifications"]
				})
			]
		})]
	});
}
function TagInput({ values, onChange, placeholder = "أضف قيمة..." }) {
	const [inputValue, setInputValue] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const addTag = () => {
		const trimmed = inputValue.trim();
		if (!trimmed || values.includes(trimmed)) {
			setInputValue("");
			return;
		}
		onChange([...values, trimmed]);
		setInputValue("");
		inputRef.current?.focus();
	};
	const removeTag = (index) => {
		const next = [...values];
		next.splice(index, 1);
		onChange(next);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addTag();
		} else if (e.key === "Backspace" && inputValue === "" && values.length > 0) removeTag(values.length - 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [values.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: values.map((tag, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs text-primary",
				children: [tag, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => removeTag(i),
					className: "ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary/30 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
				})]
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				className: "input-base flex-1",
				placeholder,
				value: inputValue,
				onChange: (e) => setInputValue(e.target.value),
				onKeyDown: handleKeyDown
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: addTag,
				disabled: !inputValue.trim(),
				className: "flex items-center gap-1 rounded-sm bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-40 transition-all",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "إضافة"]
			})]
		})]
	});
}
//#endregion
export { AdminPage as component };
