import { o as __toESM } from "../../_runtime.mjs";
import { d as _objectSpread2, f as init_objectSpread2, u as _objectWithoutProperties } from "../@dnd-kit/core.mjs";
import { C as DismissableLayer, D as useLayoutEffect2, E as useId, M as useComposedRefs, N as require_jsx_runtime, O as createContextScope, S as FocusScope, T as useControllableState, _ as hideOthers, b as Presence, j as createSlot, k as Primitive, v as ReactRemoveScroll, w as useCallbackRef, x as Portal$1, y as useFocusGuards } from "./react-alert-dialog+[...].mjs";
import { i as require_react } from "../dnd-kit__accessibility+react.mjs";
import { t as composeEventHandlers } from "../radix-ui__primitive.mjs";
import { n as autoUpdate } from "../@floating-ui/dom+[...].mjs";
import { a as offset, c as useFloating, i as limitShift, n as flip, o as shift, r as hide, s as size, t as arrow } from "../floating-ui__react-dom.mjs";
import { t as Root } from "../radix-ui__react-arrow.mjs";
import { i as useSize } from "./react-checkbox+[...].mjs";
//#region node_modules/@radix-ui/react-popper/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
init_objectSpread2();
var _excluded$1 = ["__scopePopper", "virtualRef"], _excluded2$1 = [
	"__scopePopper",
	"side",
	"sideOffset",
	"align",
	"alignOffset",
	"arrowPadding",
	"avoidCollisions",
	"collisionBoundary",
	"collisionPadding",
	"sticky",
	"hideWhenDetached",
	"updatePositionStrategy",
	"onPlaced"
], _excluded3$1 = ["__scopePopper"];
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
	const { __scopePopper, children } = props;
	const [anchor, setAnchor] = import_react.useState(null);
	const [placementState, setPlacementState] = import_react.useState(void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperProvider, {
		scope: __scopePopper,
		anchor,
		onAnchorChange: setAnchor,
		placementState,
		setPlacementState,
		children
	});
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME$1 = "PopperAnchor";
var PopperAnchor = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopper, virtualRef } = props, anchorProps = _objectWithoutProperties(props, _excluded$1);
	const context = usePopperContext(ANCHOR_NAME$1, __scopePopper);
	const ref = import_react.useRef(null);
	const onAnchorChange = context.onAnchorChange;
	const composedRefs = useComposedRefs(forwardedRef, import_react.useCallback((node) => {
		ref.current = node;
		if (node) onAnchorChange(node);
	}, [onAnchorChange]));
	const anchorRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (!virtualRef) return;
		const previousAnchor = anchorRef.current;
		anchorRef.current = virtualRef.current;
		if (previousAnchor !== anchorRef.current) onAnchorChange(anchorRef.current);
	});
	const sideAndAlign = context.placementState && getSideAndAlignFromPlacement(context.placementState);
	const placedSide = sideAndAlign === null || sideAndAlign === void 0 ? void 0 : sideAndAlign[0];
	const placedAlign = sideAndAlign === null || sideAndAlign === void 0 ? void 0 : sideAndAlign[1];
	return virtualRef ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({
		"data-radix-popper-side": placedSide,
		"data-radix-popper-align": placedAlign
	}, anchorProps), {}, { ref: composedRefs }));
});
PopperAnchor.displayName = ANCHOR_NAME$1;
var CONTENT_NAME$1 = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1);
var PopperContent = import_react.forwardRef((props, forwardedRef) => {
	var _arrowSize$width, _arrowSize$height, _middlewareData$arrow, _middlewareData$arrow2, _middlewareData$arrow3, _middlewareData$trans, _middlewareData$trans2, _middlewareData$hide;
	const { __scopePopper, side = "bottom", sideOffset = 0, align = "center", alignOffset = 0, arrowPadding = 0, avoidCollisions = true, collisionBoundary = [], collisionPadding: collisionPaddingProp = 0, sticky = "partial", hideWhenDetached = false, updatePositionStrategy = "optimized", onPlaced } = props, contentProps = _objectWithoutProperties(props, _excluded2$1);
	const context = usePopperContext(CONTENT_NAME$1, __scopePopper);
	const [content, setContent] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
	const [arrow$1, setArrow] = import_react.useState(null);
	const arrowSize = useSize(arrow$1);
	const arrowWidth = (_arrowSize$width = arrowSize === null || arrowSize === void 0 ? void 0 : arrowSize.width) !== null && _arrowSize$width !== void 0 ? _arrowSize$width : 0;
	const arrowHeight = (_arrowSize$height = arrowSize === null || arrowSize === void 0 ? void 0 : arrowSize.height) !== null && _arrowSize$height !== void 0 ? _arrowSize$height : 0;
	const desiredPlacement = side + (align !== "center" ? "-" + align : "");
	const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : _objectSpread2({
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}, collisionPaddingProp);
	const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
	const hasExplicitBoundaries = boundary.length > 0;
	const detectOverflowOptions = {
		padding: collisionPadding,
		boundary: boundary.filter(isNotNull),
		altBoundary: hasExplicitBoundaries
	};
	const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
		strategy: "fixed",
		placement: desiredPlacement,
		whileElementsMounted: (...args) => {
			return autoUpdate(...args, { animationFrame: updatePositionStrategy === "always" });
		},
		elements: { reference: context.anchor },
		middleware: [
			offset({
				mainAxis: sideOffset + arrowHeight,
				alignmentAxis: alignOffset
			}),
			avoidCollisions && shift(_objectSpread2({
				mainAxis: true,
				crossAxis: false,
				limiter: sticky === "partial" ? limitShift() : void 0
			}, detectOverflowOptions)),
			avoidCollisions && flip(_objectSpread2({}, detectOverflowOptions)),
			size(_objectSpread2(_objectSpread2({}, detectOverflowOptions), {}, { apply: ({ elements, rects, availableWidth, availableHeight }) => {
				const { width: anchorWidth, height: anchorHeight } = rects.reference;
				const contentStyle = elements.floating.style;
				contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
				contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
				contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
				contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
			} })),
			arrow$1 && arrow({
				element: arrow$1,
				padding: arrowPadding
			}),
			transformOrigin({
				arrowWidth,
				arrowHeight
			}),
			hideWhenDetached && hide(_objectSpread2(_objectSpread2({ strategy: "referenceHidden" }, detectOverflowOptions), {}, { boundary: hasExplicitBoundaries ? detectOverflowOptions.boundary : void 0 }))
		]
	});
	const setPlacementState = context.setPlacementState;
	useLayoutEffect2(() => {
		setPlacementState(placement);
		return () => {
			setPlacementState(void 0);
		};
	}, [placement, setPlacementState]);
	const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
	const handlePlaced = useCallbackRef(onPlaced);
	useLayoutEffect2(() => {
		if (isPositioned) handlePlaced === null || handlePlaced === void 0 || handlePlaced();
	}, [isPositioned, handlePlaced]);
	const arrowX = (_middlewareData$arrow = middlewareData.arrow) === null || _middlewareData$arrow === void 0 ? void 0 : _middlewareData$arrow.x;
	const arrowY = (_middlewareData$arrow2 = middlewareData.arrow) === null || _middlewareData$arrow2 === void 0 ? void 0 : _middlewareData$arrow2.y;
	const cannotCenterArrow = ((_middlewareData$arrow3 = middlewareData.arrow) === null || _middlewareData$arrow3 === void 0 ? void 0 : _middlewareData$arrow3.centerOffset) !== 0;
	const [contentZIndex, setContentZIndex] = import_react.useState();
	useLayoutEffect2(() => {
		if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
	}, [content]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: refs.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: _objectSpread2(_objectSpread2({}, floatingStyles), {}, {
			transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: contentZIndex,
			"--radix-popper-transform-origin": [(_middlewareData$trans = middlewareData.transformOrigin) === null || _middlewareData$trans === void 0 ? void 0 : _middlewareData$trans.x, (_middlewareData$trans2 = middlewareData.transformOrigin) === null || _middlewareData$trans2 === void 0 ? void 0 : _middlewareData$trans2.y].join(" ")
		}, ((_middlewareData$hide = middlewareData.hide) === null || _middlewareData$hide === void 0 ? void 0 : _middlewareData$hide.referenceHidden) && {
			visibility: "hidden",
			pointerEvents: "none"
		}),
		dir: props.dir,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperContentProvider, {
			scope: __scopePopper,
			placedSide,
			placedAlign,
			onArrowChange: setArrow,
			arrowX,
			arrowY,
			shouldHideArrow: cannotCenterArrow,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({
				"data-side": placedSide,
				"data-align": placedAlign
			}, contentProps), {}, {
				ref: composedRefs,
				style: _objectSpread2(_objectSpread2({}, contentProps.style), {}, { animation: !isPositioned ? "none" : void 0 })
			}))
		})
	});
});
PopperContent.displayName = CONTENT_NAME$1;
var ARROW_NAME$1 = "PopperArrow";
var OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
var PopperArrow = import_react.forwardRef(function PopperArrow2(props, forwardedRef) {
	const { __scopePopper } = props, arrowProps = _objectWithoutProperties(props, _excluded3$1);
	const contentContext = useContentContext(ARROW_NAME$1, __scopePopper);
	const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: contentContext.onArrowChange,
		style: {
			position: "absolute",
			left: contentContext.arrowX,
			top: contentContext.arrowY,
			[baseSide]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[contentContext.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: `rotate(180deg)`,
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[contentContext.placedSide],
			visibility: contentContext.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, _objectSpread2(_objectSpread2({}, arrowProps), {}, {
			ref: forwardedRef,
			style: _objectSpread2(_objectSpread2({}, arrowProps.style), {}, { display: "block" })
		}))
	});
});
PopperArrow.displayName = ARROW_NAME$1;
function isNotNull(value) {
	return value !== null;
}
var transformOrigin = (options) => ({
	name: "transformOrigin",
	options,
	fn(data) {
		var _middlewareData$arrow4, _middlewareData$arrow5, _middlewareData$arrow6, _middlewareData$arrow7, _middlewareData$arrow8;
		const { placement, rects, middlewareData } = data;
		const isArrowHidden = ((_middlewareData$arrow4 = middlewareData.arrow) === null || _middlewareData$arrow4 === void 0 ? void 0 : _middlewareData$arrow4.centerOffset) !== 0;
		const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
		const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
		const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
		const noArrowAlign = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[placedAlign];
		const arrowXCenter = ((_middlewareData$arrow5 = (_middlewareData$arrow6 = middlewareData.arrow) === null || _middlewareData$arrow6 === void 0 ? void 0 : _middlewareData$arrow6.x) !== null && _middlewareData$arrow5 !== void 0 ? _middlewareData$arrow5 : 0) + arrowWidth / 2;
		const arrowYCenter = ((_middlewareData$arrow7 = (_middlewareData$arrow8 = middlewareData.arrow) === null || _middlewareData$arrow8 === void 0 ? void 0 : _middlewareData$arrow8.y) !== null && _middlewareData$arrow7 !== void 0 ? _middlewareData$arrow7 : 0) + arrowHeight / 2;
		let x = "";
		let y = "";
		if (placedSide === "bottom") {
			x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
			y = `${-arrowHeight}px`;
		} else if (placedSide === "top") {
			x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
			y = `${rects.floating.height + arrowHeight}px`;
		} else if (placedSide === "right") {
			x = `${-arrowHeight}px`;
			y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
		} else if (placedSide === "left") {
			x = `${rects.floating.width + arrowHeight}px`;
			y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
		}
		return { data: {
			x,
			y
		} };
	}
});
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
var Root2$1 = Popper;
var Anchor = PopperAnchor;
var Content = PopperContent;
var Arrow = PopperArrow;
//#endregion
//#region node_modules/@radix-ui/react-popover/dist/index.mjs
init_objectSpread2();
var _excluded = ["__scopePopover"], _excluded2 = ["__scopePopover"], _excluded3 = ["forceMount"], _excluded4 = [
	"__scopePopover",
	"trapFocus",
	"onOpenAutoFocus",
	"onCloseAutoFocus",
	"disableOutsidePointerEvents",
	"onEscapeKeyDown",
	"onPointerDownOutside",
	"onFocusOutside",
	"onInteractOutside"
], _excluded5 = ["__scopePopover"], _excluded6 = ["__scopePopover"];
var POPOVER_NAME = "Popover";
var [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [createPopperScope]);
var usePopperScope = createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover = (props) => {
	const { __scopePopover, children, open: openProp, defaultOpen, onOpenChange, modal = false } = props;
	const popperScope = usePopperScope(__scopePopover);
	const triggerRef = import_react.useRef(null);
	const [hasCustomAnchor, setHasCustomAnchor] = import_react.useState(false);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen !== null && defaultOpen !== void 0 ? defaultOpen : false,
		onChange: onOpenChange,
		caller: POPOVER_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, _objectSpread2(_objectSpread2({}, popperScope), {}, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverProvider, {
		scope: __scopePopover,
		contentId: useId(),
		triggerRef,
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		hasCustomAnchor,
		onCustomAnchorAdd: import_react.useCallback(() => setHasCustomAnchor(true), []),
		onCustomAnchorRemove: import_react.useCallback(() => setHasCustomAnchor(false), []),
		modal,
		children
	}) }));
};
Popover.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover } = props, anchorProps = _objectWithoutProperties(props, _excluded);
	const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
	const popperScope = usePopperScope(__scopePopover);
	const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
	import_react.useEffect(() => {
		onCustomAnchorAdd();
		return () => onCustomAnchorRemove();
	}, [onCustomAnchorAdd, onCustomAnchorRemove]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, _objectSpread2(_objectSpread2(_objectSpread2({}, popperScope), anchorProps), {}, { ref: forwardedRef }));
});
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME = "PopoverTrigger";
var PopoverTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover } = props, triggerProps = _objectWithoutProperties(props, _excluded2);
	const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
	const popperScope = usePopperScope(__scopePopover);
	const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
	const trigger = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, _objectSpread2(_objectSpread2({
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": context.open,
		"aria-controls": context.open ? context.contentId : void 0,
		"data-state": getState(context.open)
	}, triggerProps), {}, {
		ref: composedTriggerRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	}));
	return context.hasCustomAnchor ? trigger : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, _objectSpread2(_objectSpread2({ asChild: true }, popperScope), {}, { children: trigger }));
});
PopoverTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, { forceMount: void 0 });
var PopoverPortal = (props) => {
	const { __scopePopover, forceMount, children, container } = props;
	const context = usePopoverContext(PORTAL_NAME, __scopePopover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopePopover,
		forceMount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, {
				asChild: true,
				container,
				children
			})
		})
	});
};
PopoverPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "PopoverContent";
var PopoverContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
	const { forceMount = portalContext.forceMount } = props, contentProps = _objectWithoutProperties(props, _excluded3);
	const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentModal, _objectSpread2(_objectSpread2({}, contentProps), {}, { ref: forwardedRef })) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentNonModal, _objectSpread2(_objectSpread2({}, contentProps), {}, { ref: forwardedRef }))
	});
});
PopoverContent.displayName = CONTENT_NAME;
var Slot = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	const isRightClickOutsideRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const content = contentRef.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
		as: Slot,
		allowPinchZoom: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentImpl, _objectSpread2(_objectSpread2({}, props), {}, {
			ref: composedRefs,
			trapFocus: context.open,
			disableOutsidePointerEvents: true,
			onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
				var _context$triggerRef$c;
				event.preventDefault();
				if (!isRightClickOutsideRef.current) (_context$triggerRef$c = context.triggerRef.current) === null || _context$triggerRef$c === void 0 || _context$triggerRef$c.focus();
			}),
			onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
				const originalEvent = event.detail.originalEvent;
				const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
				isRightClickOutsideRef.current = originalEvent.button === 2 || ctrlLeftClick;
			}, { checkForDefaultPrevented: false }),
			onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), { checkForDefaultPrevented: false })
		}))
	});
});
var PopoverContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
	const hasInteractedOutsideRef = import_react.useRef(false);
	const hasPointerDownOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentImpl, _objectSpread2(_objectSpread2({}, props), {}, {
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		onCloseAutoFocus: (event) => {
			var _props$onCloseAutoFoc;
			(_props$onCloseAutoFoc = props.onCloseAutoFocus) === null || _props$onCloseAutoFoc === void 0 || _props$onCloseAutoFoc.call(props, event);
			if (!event.defaultPrevented) {
				var _context$triggerRef$c2;
				if (!hasInteractedOutsideRef.current) (_context$triggerRef$c2 = context.triggerRef.current) === null || _context$triggerRef$c2 === void 0 || _context$triggerRef$c2.focus();
				event.preventDefault();
			}
			hasInteractedOutsideRef.current = false;
			hasPointerDownOutsideRef.current = false;
		},
		onInteractOutside: (event) => {
			var _props$onInteractOuts, _context$triggerRef$c3;
			(_props$onInteractOuts = props.onInteractOutside) === null || _props$onInteractOuts === void 0 || _props$onInteractOuts.call(props, event);
			if (!event.defaultPrevented) {
				hasInteractedOutsideRef.current = true;
				if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
			}
			const target = event.target;
			if ((_context$triggerRef$c3 = context.triggerRef.current) === null || _context$triggerRef$c3 === void 0 ? void 0 : _context$triggerRef$c3.contains(target)) event.preventDefault();
			if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
		}
	}));
});
var PopoverContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside } = props, contentProps = _objectWithoutProperties(props, _excluded4);
	const context = usePopoverContext(CONTENT_NAME, __scopePopover);
	const popperScope = usePopperScope(__scopePopover);
	useFocusGuards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
		asChild: true,
		loop: true,
		trapped: trapFocus,
		onMountAutoFocus: onOpenAutoFocus,
		onUnmountAutoFocus: onCloseAutoFocus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
			asChild: true,
			disableOutsidePointerEvents,
			onInteractOutside,
			onEscapeKeyDown,
			onPointerDownOutside,
			onFocusOutside,
			onDismiss: () => context.onOpenChange(false),
			deferPointerDownOutside: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, _objectSpread2(_objectSpread2(_objectSpread2({
				"data-state": getState(context.open),
				role: "dialog",
				id: context.contentId
			}, popperScope), contentProps), {}, {
				ref: forwardedRef,
				style: _objectSpread2(_objectSpread2({}, contentProps.style), {
					"--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-popover-content-available-width": "var(--radix-popper-available-width)",
					"--radix-popover-content-available-height": "var(--radix-popper-available-height)",
					"--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
				})
			}))
		})
	});
});
var CLOSE_NAME = "PopoverClose";
var PopoverClose = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover } = props, closeProps = _objectWithoutProperties(props, _excluded5);
	const context = usePopoverContext(CLOSE_NAME, __scopePopover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, _objectSpread2(_objectSpread2({ type: "button" }, closeProps), {}, {
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
	}));
});
PopoverClose.displayName = CLOSE_NAME;
var ARROW_NAME = "PopoverArrow";
var PopoverArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover } = props, arrowProps = _objectWithoutProperties(props, _excluded6);
	const popperScope = usePopperScope(__scopePopover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, _objectSpread2(_objectSpread2(_objectSpread2({}, popperScope), arrowProps), {}, { ref: forwardedRef }));
});
PopoverArrow.displayName = ARROW_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
var Root2 = Popover;
var Trigger = PopoverTrigger;
var Portal = PopoverPortal;
var Content2 = PopoverContent;
//#endregion
export { Anchor as a, Root2$1 as c, Trigger as i, createPopperScope as l, Portal as n, Arrow as o, Root2 as r, Content as s, Content2 as t };
