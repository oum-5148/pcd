import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier,
  useTheme_default
} from "./chunk-MGWKBR45.js";
import {
  require_react
} from "./chunk-7IKHB6XJ.js";
import {
  __toESM
} from "./chunk-GFT2G5UO.js";

// node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

export {
  useTheme
};
//# sourceMappingURL=chunk-DF5UKTSH.js.map
