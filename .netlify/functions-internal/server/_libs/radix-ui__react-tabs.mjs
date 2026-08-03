import { o as __toESM } from "../_runtime.mjs";
import { d as _objectSpread2, f as init_objectSpread2, u as _objectWithoutProperties } from "./@dnd-kit/core.mjs";
import { E as useId, N as require_jsx_runtime, O as createContextScope, T as useControllableState, b as Presence, k as Primitive } from "./@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "./dnd-kit__accessibility+react.mjs";
import { t as composeEventHandlers } from "./radix-ui__primitive.mjs";
import { t as useDirection } from "./radix-ui__react-direction.mjs";
import { n as Root, r as createRovingFocusGroupScope, t as Item } from "./radix-ui__react-roving-focus.mjs";
//#region node_modules/@radix-ui/react-tabs/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
init_objectSpread2();
var _excluded = [
	"__scopeTabs",
	"value",
	"onValueChange",
	"defaultValue",
	"orientation",
	"dir",
	"activationMode"
], _excluded2 = ["__scopeTabs", "loop"], _excluded3 = [
	"__scopeTabs",
	"value",
	"disabled"
], _excluded4 = [
	"__scopeTabs",
	"value",
	"forceMount",
	"children"
];
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic" } = props, tabsProps = _objectWithoutProperties(props, _excluded);
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
		defaultProp: defaultValue !== null && defaultValue !== void 0 ? defaultValue : "",
		caller: TABS_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		scope: __scopeTabs,
		baseId: useId(),
		value,
		onValueChange: setValue,
		orientation,
		dir: direction,
		activationMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({
			dir: direction,
			"data-orientation": orientation
		}, tabsProps), {}, { ref: forwardedRef }))
	});
});
Tabs.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, loop = true } = props, listProps = _objectWithoutProperties(props, _excluded2);
	const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, _objectSpread2(_objectSpread2({ asChild: true }, rovingFocusGroupScope), {}, {
		orientation: context.orientation,
		dir: context.dir,
		loop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({
			role: "tablist",
			"aria-orientation": context.orientation
		}, listProps), {}, { ref: forwardedRef }))
	}));
});
TabsList.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, disabled = false } = props, triggerProps = _objectWithoutProperties(props, _excluded3);
	const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, _objectSpread2(_objectSpread2({ asChild: true }, rovingFocusGroupScope), {}, {
		focusable: !disabled,
		active: isSelected,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, _objectSpread2(_objectSpread2({
			type: "button",
			role: "tab",
			"aria-selected": isSelected,
			"aria-controls": contentId,
			"data-state": isSelected ? "active" : "inactive",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			id: triggerId
		}, triggerProps), {}, {
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) context.onValueChange(value);
				else event.preventDefault();
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				const isAutomaticActivation = context.activationMode !== "manual";
				if (!isSelected && !disabled && isAutomaticActivation) context.onValueChange(value);
			})
		}))
	}));
});
TabsTrigger.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, forceMount, children } = props, contentProps = _objectWithoutProperties(props, _excluded4);
	const context = useTabsContext(CONTENT_NAME, __scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	const isMountAnimationPreventedRef = import_react.useRef(isSelected);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isSelected,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, _objectSpread2(_objectSpread2({
			"data-state": isSelected ? "active" : "inactive",
			"data-orientation": context.orientation,
			role: "tabpanel",
			"aria-labelledby": triggerId,
			hidden: !present,
			id: contentId,
			tabIndex: 0
		}, contentProps), {}, {
			ref: forwardedRef,
			style: _objectSpread2(_objectSpread2({}, props.style), {}, { animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0 }),
			children: present && children
		}))
	});
});
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var Root2 = Tabs;
var List = TabsList;
var Trigger = TabsTrigger;
var Content = TabsContent;
//#endregion
export { Trigger as i, List as n, Root2 as r, Content as t };
