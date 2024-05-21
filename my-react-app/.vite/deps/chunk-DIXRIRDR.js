import {
  GlobalStyles_default
} from "./chunk-HJSH3KB6.js";
import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier
} from "./chunk-MGWKBR45.js";
import {
  require_jsx_runtime
} from "./chunk-MVVPL73G.js";
import {
  require_prop_types
} from "./chunk-6KRNYLUJ.js";
import {
  _extends,
  init_extends
} from "./chunk-Y2EA4APU.js";
import {
  require_react
} from "./chunk-7IKHB6XJ.js";
import {
  __toESM
} from "./chunk-GFT2G5UO.js";

// node_modules/@mui/material/GlobalStyles/GlobalStyles.js
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_defaultTheme();
init_identifier();
var import_jsx_runtime = __toESM(require_jsx_runtime());
function GlobalStyles(props) {
  return (0, import_jsx_runtime.jsx)(GlobalStyles_default, _extends({}, props, {
    defaultTheme: defaultTheme_default,
    themeId: identifier_default
  }));
}
true ? GlobalStyles.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: import_prop_types.default.oneOfType([import_prop_types.default.array, import_prop_types.default.func, import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string, import_prop_types.default.bool])
} : void 0;
var GlobalStyles_default2 = GlobalStyles;

export {
  GlobalStyles_default2 as GlobalStyles_default
};
//# sourceMappingURL=chunk-DIXRIRDR.js.map
