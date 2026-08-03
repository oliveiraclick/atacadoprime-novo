import { o as __toESM } from "../../_runtime.mjs";
import { d as _objectSpread2, f as init_objectSpread2, l as require_react_dom, u as _objectWithoutProperties } from "../@dnd-kit/core.mjs";
import { C as DismissableLayer, D as useLayoutEffect2, E as useId, M as useComposedRefs, N as require_jsx_runtime, O as createContextScope, S as FocusScope, T as useControllableState, _ as hideOthers, b as Presence, j as createSlot, k as Primitive, v as ReactRemoveScroll, w as useCallbackRef, x as Portal, y as useFocusGuards } from "./react-alert-dialog+[...].mjs";
import { i as require_react } from "../dnd-kit__accessibility+react.mjs";
import { t as composeEventHandlers } from "../radix-ui__primitive.mjs";
import { t as clamp } from "../radix-ui__number.mjs";
import { t as createCollection } from "../radix-ui__react-collection.mjs";
import { t as useDirection } from "../radix-ui__react-direction.mjs";
import { r as usePrevious } from "./react-checkbox+[...].mjs";
import { a as Anchor, c as Root2, l as createPopperScope, o as Arrow, s as Content } from "./react-popover+[...].mjs";
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
init_objectSpread2();
var VISUALLY_HIDDEN_STYLES = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, _objectSpread2(_objectSpread2({}, props), {}, {
		ref: forwardedRef,
		style: _objectSpread2(_objectSpread2({}, VISUALLY_HIDDEN_STYLES), props.style)
	}));
});
VisuallyHidden.displayName = NAME;
//#endregion
//#region node_modules/@radix-ui/react-select/dist/index.mjs
init_objectSpread2();
var _excluded = ["__scopeSelect", "children"], _excluded2 = ["__scopeSelect", "disabled"], _excluded3 = [
	"__scopeSelect",
	"className",
	"style",
	"children",
	"placeholder"
], _excluded4 = ["__scopeSelect", "children"], _excluded5 = ["__scopeSelect", "forceMount"], _excluded6 = ["forceMount"], _excluded7 = [
	"position",
	"onCloseAutoFocus",
	"onEscapeKeyDown",
	"onPointerDownOutside",
	"side",
	"sideOffset",
	"align",
	"alignOffset",
	"arrowPadding",
	"collisionBoundary",
	"collisionPadding",
	"sticky",
	"hideWhenDetached",
	"avoidCollisions"
], _excluded8 = ["__scopeSelect", "onPlaced"], _excluded9 = [
	"__scopeSelect",
	"align",
	"collisionPadding"
], _excluded10 = ["__scopeSelect", "nonce"], _excluded11 = ["__scopeSelect"], _excluded12 = ["__scopeSelect"], _excluded13 = [
	"__scopeSelect",
	"value",
	"disabled",
	"textValue"
], _excluded14 = [
	"__scopeSelect",
	"className",
	"style"
], _excluded15 = ["__scopeSelect"], _excluded16 = ["__scopeSelect", "onAutoScroll"], _excluded17 = ["__scopeSelect"], _excluded18 = ["__scopeSelect"], _excluded19 = ["__scopeSelect"];
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection, useCollection, createCollectionScope] = createCollection(SELECT_NAME);
var [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME, [createCollectionScope, createPopperScope]);
var usePopperScope = createPopperScope();
var [SelectProviderImpl, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var PROVIDER_NAME = "SelectProvider";
function SelectProvider(props) {
	const { __scopeSelect, children, open: openProp, defaultOpen, onOpenChange, value: valueProp, defaultValue, onValueChange, dir, name, autoComplete, disabled, required, form, internal_do_not_use_render } = props;
	const popperScope = usePopperScope(__scopeSelect);
	const [trigger, setTrigger] = import_react.useState(null);
	const [valueNode, setValueNode] = import_react.useState(null);
	const [valueNodeHasChildren, setValueNodeHasChildren] = import_react.useState(false);
	const direction = useDirection(dir);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen !== null && defaultOpen !== void 0 ? defaultOpen : false,
		onChange: onOpenChange,
		caller: SELECT_NAME
	});
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue,
		onChange: onValueChange,
		caller: SELECT_NAME
	});
	const triggerPointerDownPosRef = import_react.useRef(null);
	const isFormControl = trigger ? !!form || !!trigger.closest("form") : true;
	const [nativeOptionsSet, setNativeOptionsSet] = import_react.useState(/* @__PURE__ */ new Set());
	const contentId = useId();
	const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
	const handleNativeOptionAdd = import_react.useCallback((option) => {
		setNativeOptionsSet((prev) => new Set(prev).add(option));
	}, []);
	const handleNativeOptionRemove = import_react.useCallback((option) => {
		setNativeOptionsSet((prev) => {
			const optionsSet = new Set(prev);
			optionsSet.delete(option);
			return optionsSet;
		});
	}, []);
	const context = {
		required,
		trigger,
		onTriggerChange: setTrigger,
		valueNode,
		onValueNodeChange: setValueNode,
		valueNodeHasChildren,
		onValueNodeHasChildrenChange: setValueNodeHasChildren,
		contentId,
		value,
		onValueChange: setValue,
		open,
		onOpenChange: setOpen,
		dir: direction,
		triggerPointerDownPosRef,
		disabled,
		name,
		autoComplete,
		form,
		nativeOptions: nativeOptionsSet,
		nativeSelectKey,
		isFormControl
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, _objectSpread2(_objectSpread2({}, popperScope), {}, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectProviderImpl, _objectSpread2(_objectSpread2({ scope: __scopeSelect }, context), {}, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: __scopeSelect,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectNativeOptionsProvider, {
			scope: __scopeSelect,
			onNativeOptionAdd: handleNativeOptionAdd,
			onNativeOptionRemove: handleNativeOptionRemove,
			children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
		})
	}) })) }));
}
SelectProvider.displayName = PROVIDER_NAME;
var Select = (props) => {
	const { __scopeSelect, children } = props, providerProps = _objectWithoutProperties(props, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectProvider, _objectSpread2(_objectSpread2({ __scopeSelect }, providerProps), {}, { internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [children, isFormControl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectBubbleInput, { __scopeSelect }) : null] }) }));
};
Select.displayName = SELECT_NAME;
var TRIGGER_NAME = "SelectTrigger";
var SelectTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, disabled = false } = props, triggerProps = _objectWithoutProperties(props, _excluded2);
	const popperScope = usePopperScope(__scopeSelect);
	const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
	const isDisabled = context.disabled || disabled;
	const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
	const getItems = useCollection(__scopeSelect);
	const pointerTypeRef = import_react.useRef("touch");
	const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
		const enabledItems = getItems().filter((item) => !item.disabled);
		const nextItem = findNextItem(enabledItems, search, enabledItems.find((item) => item.value === context.value));
		if (nextItem !== void 0) context.onValueChange(nextItem.value);
	});
	const handleOpen = (pointerEvent) => {
		if (!isDisabled) {
			context.onOpenChange(true);
			resetTypeahead();
		}
		if (pointerEvent) context.triggerPointerDownPosRef.current = {
			x: Math.round(pointerEvent.pageX),
			y: Math.round(pointerEvent.pageY)
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, _objectSpread2(_objectSpread2({ asChild: true }, popperScope), {}, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, _objectSpread2(_objectSpread2({
		type: "button",
		role: "combobox",
		"aria-controls": context.open ? context.contentId : void 0,
		"aria-expanded": context.open,
		"aria-required": context.required,
		"aria-autocomplete": "none",
		dir: context.dir,
		"data-state": context.open ? "open" : "closed",
		disabled: isDisabled,
		"data-disabled": isDisabled ? "" : void 0,
		"data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0
	}, triggerProps), {}, {
		ref: composedRefs,
		onClick: composeEventHandlers(triggerProps.onClick, (event) => {
			event.currentTarget.focus();
			if (pointerTypeRef.current !== "mouse") handleOpen(event);
		}),
		onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
			pointerTypeRef.current = event.pointerType;
			const target = event.target;
			if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
			if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
				handleOpen(event);
				event.preventDefault();
			}
		}),
		onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
			const isTypingAhead = searchRef.current !== "";
			if (!(event.ctrlKey || event.altKey || event.metaKey) && event.key.length === 1) handleTypeaheadSearch(event.key);
			if (isTypingAhead && event.key === " ") return;
			if (OPEN_KEYS.includes(event.key)) {
				handleOpen();
				event.preventDefault();
			}
		})
	})) }));
});
SelectTrigger.displayName = TRIGGER_NAME;
var VALUE_NAME = "SelectValue";
var SelectValue = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, className, style, children, placeholder = "" } = props, valueProps = _objectWithoutProperties(props, _excluded3);
	const context = useSelectContext(VALUE_NAME, __scopeSelect);
	const { onValueNodeHasChildrenChange } = context;
	const hasChildren = children !== void 0;
	const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
	useLayoutEffect2(() => {
		onValueNodeHasChildrenChange(hasChildren);
	}, [onValueNodeHasChildrenChange, hasChildren]);
	const showPlaceholder = shouldShowPlaceholder(context.value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, _objectSpread2(_objectSpread2({}, valueProps), {}, {
		asChild: showPlaceholder ? false : valueProps.asChild,
		ref: composedRefs,
		style: { pointerEvents: "none" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: showPlaceholder ? placeholder : children }, showPlaceholder ? "placeholder" : "value")
	}));
});
SelectValue.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, children } = props, iconProps = _objectWithoutProperties(props, _excluded4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, _objectSpread2(_objectSpread2({ "aria-hidden": true }, iconProps), {}, {
		ref: forwardedRef,
		children: children || "▼"
	}));
});
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal";
var [PortalProvider, usePortalContext] = createSelectContext(PORTAL_NAME, { forceMount: void 0 });
var SelectPortal = (props) => {
	const { __scopeSelect, forceMount } = props, portalProps = _objectWithoutProperties(props, _excluded5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: props.__scopeSelect,
		forceMount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, _objectSpread2({ asChild: true }, portalProps))
	});
};
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "SelectContent";
var SelectContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME, props.__scopeSelect);
	const { forceMount = portalContext.forceMount } = props, contentProps = _objectWithoutProperties(props, _excluded6);
	const context = useSelectContext(CONTENT_NAME, props.__scopeSelect);
	const [fragment, setFragment] = import_react.useState();
	useLayoutEffect2(() => {
		setFragment(new DocumentFragment());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: ({ present }) => present ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentImpl, _objectSpread2(_objectSpread2({}, contentProps), {}, { ref: forwardedRef })) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentFragment, _objectSpread2(_objectSpread2({}, contentProps), {}, { fragment }))
	});
});
SelectContent.displayName = CONTENT_NAME;
var SelectContentFragment = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, children, fragment } = props;
	if (!fragment) return null;
	return import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentProvider, {
		scope: __scopeSelect,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: __scopeSelect,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: forwardedRef,
				children
			})
		})
	}), fragment);
});
SelectContentFragment.displayName = "SelectContentFragment";
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect } = props;
	const { position = "item-aligned", onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, side, sideOffset, align, alignOffset, arrowPadding, collisionBoundary, collisionPadding, sticky, hideWhenDetached, avoidCollisions } = props, contentProps = _objectWithoutProperties(props, _excluded7);
	const context = useSelectContext(CONTENT_NAME, __scopeSelect);
	const [content, setContent] = import_react.useState(null);
	const [viewport, setViewport] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
	const [selectedItem, setSelectedItem] = import_react.useState(null);
	const [selectedItemText, setSelectedItemText] = import_react.useState(null);
	const getItems = useCollection(__scopeSelect);
	const [isPositioned, setIsPositioned] = import_react.useState(false);
	const firstValidItemFoundRef = import_react.useRef(false);
	import_react.useEffect(() => {
		if (content) return hideOthers(content);
	}, [content]);
	useFocusGuards();
	const focusFirst = import_react.useCallback((candidates) => {
		const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
		const [lastItem] = restItems.slice(-1);
		const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
		for (const candidate of candidates) {
			if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
			candidate === null || candidate === void 0 || candidate.scrollIntoView({ block: "nearest" });
			if (candidate === firstItem && viewport) viewport.scrollTop = 0;
			if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
			candidate === null || candidate === void 0 || candidate.focus();
			if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
		}
	}, [getItems, viewport]);
	const focusSelectedItem = import_react.useCallback(() => focusFirst([selectedItem, content]), [
		focusFirst,
		selectedItem,
		content
	]);
	import_react.useEffect(() => {
		if (isPositioned) focusSelectedItem();
	}, [isPositioned, focusSelectedItem]);
	const { onOpenChange, triggerPointerDownPosRef } = context;
	import_react.useEffect(() => {
		if (content) {
			let pointerMoveDelta = {
				x: 0,
				y: 0
			};
			const handlePointerMove = (event) => {
				var _triggerPointerDownPo, _triggerPointerDownPo2, _triggerPointerDownPo3, _triggerPointerDownPo4;
				pointerMoveDelta = {
					x: Math.abs(Math.round(event.pageX) - ((_triggerPointerDownPo = (_triggerPointerDownPo2 = triggerPointerDownPosRef.current) === null || _triggerPointerDownPo2 === void 0 ? void 0 : _triggerPointerDownPo2.x) !== null && _triggerPointerDownPo !== void 0 ? _triggerPointerDownPo : 0)),
					y: Math.abs(Math.round(event.pageY) - ((_triggerPointerDownPo3 = (_triggerPointerDownPo4 = triggerPointerDownPosRef.current) === null || _triggerPointerDownPo4 === void 0 ? void 0 : _triggerPointerDownPo4.y) !== null && _triggerPointerDownPo3 !== void 0 ? _triggerPointerDownPo3 : 0))
				};
			};
			const handlePointerUp = (event) => {
				if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
				else if (!event.composedPath().includes(content)) onOpenChange(false);
				document.removeEventListener("pointermove", handlePointerMove);
				triggerPointerDownPosRef.current = null;
			};
			if (triggerPointerDownPosRef.current !== null) {
				document.addEventListener("pointermove", handlePointerMove);
				document.addEventListener("pointerup", handlePointerUp, {
					capture: true,
					once: true
				});
			}
			return () => {
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp, { capture: true });
			};
		}
	}, [
		content,
		onOpenChange,
		triggerPointerDownPosRef
	]);
	import_react.useEffect(() => {
		const close = () => onOpenChange(false);
		window.addEventListener("blur", close);
		window.addEventListener("resize", close);
		return () => {
			window.removeEventListener("blur", close);
			window.removeEventListener("resize", close);
		};
	}, [onOpenChange]);
	const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
		const enabledItems = getItems().filter((item) => !item.disabled);
		const nextItem = findNextItem(enabledItems, search, enabledItems.find((item) => item.ref.current === document.activeElement));
		if (nextItem) setTimeout(() => {
			var _nextItem$ref$current;
			return (_nextItem$ref$current = nextItem.ref.current) === null || _nextItem$ref$current === void 0 ? void 0 : _nextItem$ref$current.focus();
		});
	});
	const itemRefCallback = import_react.useCallback((node, value, disabled) => {
		const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
		if (context.value !== void 0 && context.value === value || isFirstValidItem) {
			setSelectedItem(node);
			if (isFirstValidItem) firstValidItemFoundRef.current = true;
		}
	}, [context.value]);
	const handleItemLeave = import_react.useCallback(() => content === null || content === void 0 ? void 0 : content.focus(), [content]);
	const itemTextRefCallback = import_react.useCallback((node, value, disabled) => {
		const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
		if (context.value !== void 0 && context.value === value || isFirstValidItem) setSelectedItemText(node);
	}, [context.value]);
	const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
	const popperContentProps = SelectPosition === SelectPopperPosition ? {
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		collisionBoundary,
		collisionPadding,
		sticky,
		hideWhenDetached,
		avoidCollisions
	} : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentProvider, {
		scope: __scopeSelect,
		content,
		viewport,
		onViewportChange: setViewport,
		itemRefCallback,
		selectedItem,
		onItemLeave: handleItemLeave,
		itemTextRefCallback,
		focusSelectedItem,
		selectedItemText,
		position,
		isPositioned,
		searchRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
			as: Slot,
			allowPinchZoom: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
				asChild: true,
				trapped: context.open,
				onMountAutoFocus: (event) => {
					event.preventDefault();
				},
				onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
					var _context$trigger;
					(_context$trigger = context.trigger) === null || _context$trigger === void 0 || _context$trigger.focus({ preventScroll: true });
					event.preventDefault();
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
					asChild: true,
					disableOutsidePointerEvents: true,
					onEscapeKeyDown,
					onPointerDownOutside,
					onFocusOutside: (event) => event.preventDefault(),
					onDismiss: () => context.onOpenChange(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPosition, _objectSpread2(_objectSpread2(_objectSpread2({
						role: "listbox",
						id: context.contentId,
						"data-state": context.open ? "open" : "closed",
						dir: context.dir,
						onContextMenu: (event) => event.preventDefault()
					}, contentProps), popperContentProps), {}, {
						onPlaced: () => setIsPositioned(true),
						ref: composedRefs,
						style: _objectSpread2({
							display: "flex",
							flexDirection: "column",
							outline: "none"
						}, contentProps.style),
						onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
							const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
							if (event.key === "Tab") event.preventDefault();
							if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
							if ([
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(event.key)) {
								let candidateNodes = getItems().filter((item) => !item.disabled).map((item) => item.ref.current);
								if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
								if (["ArrowUp", "ArrowDown"].includes(event.key)) {
									const currentElement = event.target;
									const currentIndex = candidateNodes.indexOf(currentElement);
									candidateNodes = candidateNodes.slice(currentIndex + 1);
								}
								setTimeout(() => focusFirst(candidateNodes));
								event.preventDefault();
							}
						})
					}))
				})
			})
		})
	});
});
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, onPlaced } = props, popperProps = _objectWithoutProperties(props, _excluded8);
	const context = useSelectContext(CONTENT_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(CONTENT_NAME, __scopeSelect);
	const [contentWrapper, setContentWrapper] = import_react.useState(null);
	const [content, setContent] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
	const getItems = useCollection(__scopeSelect);
	const shouldExpandOnScrollRef = import_react.useRef(false);
	const shouldRepositionRef = import_react.useRef(true);
	const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
	const position = import_react.useCallback(() => {
		if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
			const triggerRect = context.trigger.getBoundingClientRect();
			const contentRect = content.getBoundingClientRect();
			const valueNodeRect = context.valueNode.getBoundingClientRect();
			const itemTextRect = selectedItemText.getBoundingClientRect();
			if (context.dir !== "rtl") {
				const itemTextOffset = itemTextRect.left - contentRect.left;
				const left = valueNodeRect.left - itemTextOffset;
				const leftDelta = triggerRect.left - left;
				const minContentWidth = triggerRect.width + leftDelta;
				const contentWidth = Math.max(minContentWidth, contentRect.width);
				const rightEdge = window.innerWidth - CONTENT_MARGIN;
				const clampedLeft = clamp(left, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, rightEdge - contentWidth)]);
				contentWrapper.style.minWidth = minContentWidth + "px";
				contentWrapper.style.left = clampedLeft + "px";
			} else {
				const itemTextOffset = contentRect.right - itemTextRect.right;
				const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
				const rightDelta = window.innerWidth - triggerRect.right - right;
				const minContentWidth = triggerRect.width + rightDelta;
				const contentWidth = Math.max(minContentWidth, contentRect.width);
				const leftEdge = window.innerWidth - CONTENT_MARGIN;
				const clampedRight = clamp(right, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, leftEdge - contentWidth)]);
				contentWrapper.style.minWidth = minContentWidth + "px";
				contentWrapper.style.right = clampedRight + "px";
			}
			const items = getItems();
			const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
			const itemsHeight = viewport.scrollHeight;
			const contentStyles = window.getComputedStyle(content);
			const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
			const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
			const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
			const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
			const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
			const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
			const viewportStyles = window.getComputedStyle(viewport);
			const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
			const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
			const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
			const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
			const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
			const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
			const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
			const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
			if (contentTopToItemMiddle <= topEdgeToTriggerMiddle) {
				const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
				contentWrapper.style.bottom = "0px";
				const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
				const height = contentTopToItemMiddle + Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
				contentWrapper.style.height = height + "px";
			} else {
				const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
				contentWrapper.style.top = "0px";
				const height = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight) + itemMiddleToContentBottom;
				contentWrapper.style.height = height + "px";
				viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
			}
			contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
			contentWrapper.style.minHeight = minContentHeight + "px";
			contentWrapper.style.maxHeight = availableHeight + "px";
			onPlaced === null || onPlaced === void 0 || onPlaced();
			requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
		}
	}, [
		getItems,
		context.trigger,
		context.valueNode,
		contentWrapper,
		content,
		viewport,
		selectedItem,
		selectedItemText,
		context.dir,
		onPlaced
	]);
	useLayoutEffect2(() => position(), [position]);
	const [contentZIndex, setContentZIndex] = import_react.useState();
	useLayoutEffect2(() => {
		if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
	}, [content]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewportProvider, {
		scope: __scopeSelect,
		contentWrapper,
		shouldExpandOnScrollRef,
		onScrollButtonChange: import_react.useCallback((node) => {
			if (node && shouldRepositionRef.current === true) {
				position();
				focusSelectedItem === null || focusSelectedItem === void 0 || focusSelectedItem();
				shouldRepositionRef.current = false;
			}
		}, [position, focusSelectedItem]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: setContentWrapper,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: contentZIndex
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({}, popperProps), {}, {
				ref: composedRefs,
				style: _objectSpread2({
					boxSizing: "border-box",
					maxHeight: "100%"
				}, popperProps.style)
			}))
		})
	});
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, align = "start", collisionPadding = CONTENT_MARGIN } = props, popperProps = _objectWithoutProperties(props, _excluded9);
	const popperScope = usePopperScope(__scopeSelect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, _objectSpread2(_objectSpread2(_objectSpread2({}, popperScope), popperProps), {}, {
		ref: forwardedRef,
		align,
		collisionPadding,
		style: _objectSpread2(_objectSpread2({ boxSizing: "border-box" }, popperProps.style), {
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		})
	}));
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, nonce } = props, viewportProps = _objectWithoutProperties(props, _excluded10);
	const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
	const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
	const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
	const prevScrollTopRef = import_react.useRef(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		dangerouslySetInnerHTML: { __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}` },
		nonce
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
		scope: __scopeSelect,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({
			"data-radix-select-viewport": "",
			role: "presentation"
		}, viewportProps), {}, {
			ref: composedRefs,
			style: _objectSpread2({
				position: "relative",
				flex: 1,
				overflow: "hidden auto"
			}, viewportProps.style),
			onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
				const viewport = event.currentTarget;
				const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
				if ((shouldExpandOnScrollRef === null || shouldExpandOnScrollRef === void 0 ? void 0 : shouldExpandOnScrollRef.current) && contentWrapper) {
					const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
					if (scrolledBy > 0) {
						const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
						const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
						const cssHeight = parseFloat(contentWrapper.style.height);
						const prevHeight = Math.max(cssMinHeight, cssHeight);
						if (prevHeight < availableHeight) {
							const nextHeight = prevHeight + scrolledBy;
							const clampedNextHeight = Math.min(availableHeight, nextHeight);
							const heightDiff = nextHeight - clampedNextHeight;
							contentWrapper.style.height = clampedNextHeight + "px";
							if (contentWrapper.style.bottom === "0px") {
								viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
								contentWrapper.style.justifyContent = "flex-end";
							}
						}
					}
				}
				prevScrollTopRef.current = viewport.scrollTop;
			})
		}))
	})] });
});
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME);
var SelectGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect } = props, groupProps = _objectWithoutProperties(props, _excluded11);
	const groupId = useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroupContextProvider, {
		scope: __scopeSelect,
		id: groupId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({
			role: "group",
			"aria-labelledby": groupId
		}, groupProps), {}, { ref: forwardedRef }))
	});
});
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel";
var SelectLabel = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect } = props, labelProps = _objectWithoutProperties(props, _excluded12);
	const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({ id: groupContext.id }, labelProps), {}, { ref: forwardedRef }));
});
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME);
var SelectItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, value, disabled = false, textValue: textValueProp } = props, itemProps = _objectWithoutProperties(props, _excluded13);
	const context = useSelectContext(ITEM_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(ITEM_NAME, __scopeSelect);
	const isSelected = context.value === value;
	const [textValue, setTextValue] = import_react.useState(textValueProp !== null && textValueProp !== void 0 ? textValueProp : "");
	const [isFocused, setIsFocused] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, (node) => {
		var _contentContext$itemR;
		return (_contentContext$itemR = contentContext.itemRefCallback) === null || _contentContext$itemR === void 0 ? void 0 : _contentContext$itemR.call(contentContext, node, value, disabled);
	});
	const textId = useId();
	const pointerTypeRef = import_react.useRef("touch");
	const handleSelect = () => {
		if (!disabled) {
			context.onValueChange(value);
			context.onOpenChange(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemContextProvider, {
		scope: __scopeSelect,
		value,
		disabled,
		textId,
		isSelected,
		onItemTextChange: import_react.useCallback((node) => {
			setTextValue((prevTextValue) => {
				var _node$textContent;
				return prevTextValue || ((_node$textContent = node === null || node === void 0 ? void 0 : node.textContent) !== null && _node$textContent !== void 0 ? _node$textContent : "").trim();
			});
		}, []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
			scope: __scopeSelect,
			value,
			disabled,
			textValue,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({
				role: "option",
				"aria-labelledby": textId,
				"data-highlighted": isFocused ? "" : void 0,
				"aria-selected": isSelected && isFocused,
				"data-state": isSelected ? "checked" : "unchecked",
				"aria-disabled": disabled || void 0,
				"data-disabled": disabled ? "" : void 0,
				tabIndex: disabled ? void 0 : -1
			}, itemProps), {}, {
				ref: composedRefs,
				onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
				onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
				onClick: composeEventHandlers(itemProps.onClick, () => {
					if (pointerTypeRef.current !== "mouse") handleSelect();
				}),
				onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
					if (pointerTypeRef.current === "mouse") handleSelect();
				}),
				onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
					pointerTypeRef.current = event.pointerType;
				}),
				onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
					pointerTypeRef.current = event.pointerType;
					if (disabled) {
						var _contentContext$onIte;
						(_contentContext$onIte = contentContext.onItemLeave) === null || _contentContext$onIte === void 0 || _contentContext$onIte.call(contentContext);
					} else if (pointerTypeRef.current === "mouse") event.currentTarget.focus({ preventScroll: true });
				}),
				onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
					if (event.currentTarget === document.activeElement) {
						var _contentContext$onIte2;
						(_contentContext$onIte2 = contentContext.onItemLeave) === null || _contentContext$onIte2 === void 0 || _contentContext$onIte2.call(contentContext);
					}
				}),
				onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
					var _contentContext$searc;
					if (((_contentContext$searc = contentContext.searchRef) === null || _contentContext$searc === void 0 ? void 0 : _contentContext$searc.current) !== "" && event.key === " ") return;
					if (SELECTION_KEYS.includes(event.key)) handleSelect();
					if (event.key === " ") event.preventDefault();
				})
			}))
		})
	});
});
SelectItem.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, className, style } = props, itemTextProps = _objectWithoutProperties(props, _excluded14);
	const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
	const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
	const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
	const [itemTextNode, setItemTextNode] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setItemTextNode(node), itemContext.onItemTextChange, (node) => {
		var _contentContext$itemT;
		return (_contentContext$itemT = contentContext.itemTextRefCallback) === null || _contentContext$itemT === void 0 ? void 0 : _contentContext$itemT.call(contentContext, node, itemContext.value, itemContext.disabled);
	});
	const textContent = itemTextNode === null || itemTextNode === void 0 ? void 0 : itemTextNode.textContent;
	const nativeOption = import_react.useMemo(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
		value: itemContext.value,
		disabled: itemContext.disabled,
		children: textContent
	}, itemContext.value), [
		itemContext.disabled,
		itemContext.value,
		textContent
	]);
	const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
	useLayoutEffect2(() => {
		onNativeOptionAdd(nativeOption);
		return () => onNativeOptionRemove(nativeOption);
	}, [
		onNativeOptionAdd,
		onNativeOptionRemove,
		nativeOption
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, _objectSpread2(_objectSpread2({ id: itemContext.textId }, itemTextProps), {}, { ref: composedRefs })), itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren && !shouldShowPlaceholder(context.value) ? import_react_dom.createPortal(itemTextProps.children, context.valueNode) : null] });
});
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect } = props, itemIndicatorProps = _objectWithoutProperties(props, _excluded15);
	return useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect).isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, _objectSpread2(_objectSpread2({ "aria-hidden": true }, itemIndicatorProps), {}, { ref: forwardedRef })) : null;
});
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton = import_react.forwardRef((props, forwardedRef) => {
	const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
	const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
	const [canScrollUp, setCanScrollUp] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
	useLayoutEffect2(() => {
		if (contentContext.viewport && contentContext.isPositioned) {
			let handleScroll2 = function() {
				setCanScrollUp(viewport.scrollTop > 0);
			};
			const viewport = contentContext.viewport;
			handleScroll2();
			viewport.addEventListener("scroll", handleScroll2);
			return () => viewport.removeEventListener("scroll", handleScroll2);
		}
	}, [contentContext.viewport, contentContext.isPositioned]);
	return canScrollUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollButtonImpl, _objectSpread2(_objectSpread2({}, props), {}, {
		ref: composedRefs,
		onAutoScroll: () => {
			const { viewport, selectedItem } = contentContext;
			if (viewport && selectedItem) viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
		}
	})) : null;
});
SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton = import_react.forwardRef((props, forwardedRef) => {
	const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
	const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
	const [canScrollDown, setCanScrollDown] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
	useLayoutEffect2(() => {
		if (contentContext.viewport && contentContext.isPositioned) {
			let handleScroll2 = function() {
				const maxScroll = viewport.scrollHeight - viewport.clientHeight;
				setCanScrollDown(Math.ceil(viewport.scrollTop) < maxScroll);
			};
			const viewport = contentContext.viewport;
			handleScroll2();
			viewport.addEventListener("scroll", handleScroll2);
			return () => viewport.removeEventListener("scroll", handleScroll2);
		}
	}, [contentContext.viewport, contentContext.isPositioned]);
	return canScrollDown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollButtonImpl, _objectSpread2(_objectSpread2({}, props), {}, {
		ref: composedRefs,
		onAutoScroll: () => {
			const { viewport, selectedItem } = contentContext;
			if (viewport && selectedItem) viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
		}
	})) : null;
});
SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, onAutoScroll } = props, scrollIndicatorProps = _objectWithoutProperties(props, _excluded16);
	const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
	const autoScrollTimerRef = import_react.useRef(null);
	const getItems = useCollection(__scopeSelect);
	const clearAutoScrollTimer = import_react.useCallback(() => {
		if (autoScrollTimerRef.current !== null) {
			window.clearInterval(autoScrollTimerRef.current);
			autoScrollTimerRef.current = null;
		}
	}, []);
	import_react.useEffect(() => {
		return () => clearAutoScrollTimer();
	}, [clearAutoScrollTimer]);
	useLayoutEffect2(() => {
		var _activeItem$ref$curre;
		const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
		activeItem === null || activeItem === void 0 || (_activeItem$ref$curre = activeItem.ref.current) === null || _activeItem$ref$curre === void 0 || _activeItem$ref$curre.scrollIntoView({ block: "nearest" });
	}, [getItems]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({ "aria-hidden": true }, scrollIndicatorProps), {}, {
		ref: forwardedRef,
		style: _objectSpread2({ flexShrink: 0 }, scrollIndicatorProps.style),
		onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
			if (autoScrollTimerRef.current === null) autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
		}),
		onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
			var _contentContext$onIte3;
			(_contentContext$onIte3 = contentContext.onItemLeave) === null || _contentContext$onIte3 === void 0 || _contentContext$onIte3.call(contentContext);
			if (autoScrollTimerRef.current === null) autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
		}),
		onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
			clearAutoScrollTimer();
		})
	}));
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect } = props, separatorProps = _objectWithoutProperties(props, _excluded17);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({ "aria-hidden": true }, separatorProps), {}, { ref: forwardedRef }));
});
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow";
var SelectArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect } = props, arrowProps = _objectWithoutProperties(props, _excluded18);
	const popperScope = usePopperScope(__scopeSelect);
	return useSelectContentContext(ARROW_NAME, __scopeSelect).position === "popper" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, _objectSpread2(_objectSpread2(_objectSpread2({}, popperScope), arrowProps), {}, { ref: forwardedRef })) : null;
});
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = import_react.forwardRef((_ref, forwardedRef) => {
	let { __scopeSelect } = _ref, props = _objectWithoutProperties(_ref, _excluded19);
	const context = useSelectContext(BUBBLE_INPUT_NAME, __scopeSelect);
	const { value, onValueChange, required, disabled, name, autoComplete, form } = context;
	const { nativeOptions, nativeSelectKey } = context;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const selectValue = value !== null && value !== void 0 ? value : "";
	const prevValue = usePrevious(selectValue);
	const hasEmptyValueOption = Array.from(nativeOptions).some((option) => {
		var _option$props$value;
		return ((_option$props$value = option.props.value) !== null && _option$props$value !== void 0 ? _option$props$value : "") === "";
	});
	import_react.useEffect(() => {
		const select = ref.current;
		if (!select) return;
		const selectProto = window.HTMLSelectElement.prototype;
		const setValue = Object.getOwnPropertyDescriptor(selectProto, "value").set;
		if (prevValue !== selectValue && setValue) {
			const event = new Event("change", { bubbles: true });
			setValue.call(select, selectValue);
			select.dispatchEvent(event);
		}
	}, [prevValue, selectValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primitive.select, _objectSpread2(_objectSpread2({
		"aria-hidden": true,
		required,
		tabIndex: -1,
		name,
		autoComplete,
		disabled,
		form,
		onChange: (event) => onValueChange(event.target.value)
	}, props), {}, {
		style: _objectSpread2(_objectSpread2({}, VISUALLY_HIDDEN_STYLES), props.style),
		ref: composedRefs,
		defaultValue: selectValue,
		children: [shouldShowPlaceholder(value) && !hasEmptyValueOption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "" }) : null, Array.from(nativeOptions)]
	}), nativeSelectKey);
});
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
	return typeof value === "function";
}
function shouldShowPlaceholder(value) {
	return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
	const handleSearchChange = useCallbackRef(onSearchChange);
	const searchRef = import_react.useRef("");
	const timerRef = import_react.useRef(0);
	const handleTypeaheadSearch = import_react.useCallback((key) => {
		const search = searchRef.current + key;
		handleSearchChange(search);
		(function updateSearch(value) {
			searchRef.current = value;
			window.clearTimeout(timerRef.current);
			if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
		})(search);
	}, [handleSearchChange]);
	const resetTypeahead = import_react.useCallback(() => {
		searchRef.current = "";
		window.clearTimeout(timerRef.current);
	}, []);
	import_react.useEffect(() => {
		return () => window.clearTimeout(timerRef.current);
	}, []);
	return [
		searchRef,
		handleTypeaheadSearch,
		resetTypeahead
	];
}
function findNextItem(items, search, currentItem) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
	let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
	if (normalizedSearch.length === 1) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
	const nextItem = wrappedItems.find((item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
//#endregion
export { SelectItemIndicator as a, SelectPortal as c, SelectSeparator as d, SelectTrigger as f, VisuallyHidden as h, SelectItem as i, SelectScrollDownButton as l, SelectViewport as m, SelectContent as n, SelectItemText as o, SelectValue as p, SelectIcon as r, SelectLabel as s, Select as t, SelectScrollUpButton as u };
