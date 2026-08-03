import { o as __toESM } from "../_runtime.mjs";
import { d as _objectSpread2, f as init_objectSpread2, u as _objectWithoutProperties } from "./@dnd-kit/core.mjs";
import { D as useLayoutEffect2, N as require_jsx_runtime, O as createContextScope, k as Primitive, w as useCallbackRef } from "./@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "./dnd-kit__accessibility+react.mjs";
//#region node_modules/@radix-ui/react-avatar/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
init_objectSpread2();
var _excluded = ["__scopeAvatar"], _excluded2 = [
	"__scopeAvatar",
	"src",
	"onLoadingStatusChange"
], _excluded3 = ["__scopeAvatar", "delayMs"];
var AVATAR_NAME = "Avatar";
var [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
var STATIC_IMAGE_COUNT_STATE = [0, () => void 0];
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar } = props, avatarProps = _objectWithoutProperties(props, _excluded);
	const [imageLoadingStatus, setImageLoadingStatus] = import_react.useState("idle");
	const [imageCount, setImageCount] = useImageCount();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarProvider, {
		scope: __scopeAvatar,
		imageLoadingStatus,
		setImageLoadingStatus,
		imageCount,
		setImageCount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, _objectSpread2(_objectSpread2({}, avatarProps), {}, { ref: forwardedRef }))
	});
});
Avatar.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, src, onLoadingStatusChange } = props, imageProps = _objectWithoutProperties(props, _excluded2);
	const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
	useUpdateImageCount(context.setImageCount);
	const imageLoadingStatus = useImageLoadingStatus(src, {
		referrerPolicy: imageProps.referrerPolicy,
		crossOrigin: imageProps.crossOrigin,
		loadingStatus: context.imageLoadingStatus,
		setLoadingStatus: context.setImageLoadingStatus
	});
	const handleLoadingStatusChange = useCallbackRef((status) => {
		onLoadingStatusChange === null || onLoadingStatusChange === void 0 || onLoadingStatusChange(status);
	});
	const loadingStatusRef = import_react.useRef(imageLoadingStatus);
	useLayoutEffect2(() => {
		const previousLoadingStatus = loadingStatusRef.current;
		loadingStatusRef.current = imageLoadingStatus;
		if (imageLoadingStatus !== previousLoadingStatus) handleLoadingStatusChange(imageLoadingStatus);
	}, [imageLoadingStatus, handleLoadingStatusChange]);
	return imageLoadingStatus === "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.img, _objectSpread2(_objectSpread2({}, imageProps), {}, {
		ref: forwardedRef,
		src
	})) : null;
});
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, delayMs } = props, fallbackProps = _objectWithoutProperties(props, _excluded3);
	const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
	const [canRender, setCanRender] = import_react.useState(delayMs === void 0);
	import_react.useEffect(() => {
		if (delayMs !== void 0) {
			const timerId = window.setTimeout(() => setCanRender(true), delayMs);
			return () => window.clearTimeout(timerId);
		}
	}, [delayMs]);
	return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, _objectSpread2(_objectSpread2({}, fallbackProps), {}, { ref: forwardedRef })) : null;
});
AvatarFallback.displayName = FALLBACK_NAME;
function useImageLoadingStatus(src, { loadingStatus, setLoadingStatus, referrerPolicy, crossOrigin }) {
	useLayoutEffect2(() => {
		if (!src) {
			setLoadingStatus("error");
			return;
		}
		const image = new window.Image();
		const handleLoad = (event) => {
			const image2 = event.currentTarget;
			setLoadingStatus(getImageLoadingStatus(image2));
		};
		const handleError = () => setLoadingStatus("error");
		image.addEventListener("load", handleLoad);
		image.addEventListener("error", handleError);
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		image.crossOrigin = crossOrigin !== null && crossOrigin !== void 0 ? crossOrigin : null;
		image.src = src;
		setLoadingStatus(getImageLoadingStatus(image));
		return () => {
			image.removeEventListener("load", handleLoad);
			image.removeEventListener("error", handleError);
			setLoadingStatus("idle");
		};
	}, [
		src,
		crossOrigin,
		referrerPolicy,
		setLoadingStatus
	]);
	return loadingStatus;
}
function getImageLoadingStatus(image) {
	return image.complete ? image.naturalWidth > 0 ? "loaded" : "error" : "loading";
}
function useImageCount() {
	let state = STATIC_IMAGE_COUNT_STATE;
	{
		state = import_react.useState(0);
		const [imageCount] = state;
		const hasWarnedRef = import_react.useRef(false);
		import_react.useEffect(() => {
			if (imageCount > 1 && !hasWarnedRef.current) {
				hasWarnedRef.current = true;
				console.warn("Avatar: Only one `Avatar.Image` component should be rendered per `Avatar.Root`, but multiple were detected. This will lead to unexpected behavior.");
			}
		}, [imageCount]);
	}
	return state;
}
function useUpdateImageCount(setImageCount) {
	import_react.useEffect(() => {
		setImageCount((imageCount) => imageCount + 1);
		return () => {
			setImageCount((imageCount) => imageCount - 1);
		};
	}, [setImageCount]);
}
//#endregion
export { AvatarFallback as n, AvatarImage as r, Avatar as t };
