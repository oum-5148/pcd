import {
  debounce_default,
  init_debounce,
  init_ownerDocument,
  init_ownerWindow,
  init_useEnhancedEffect,
  ownerDocument_default,
  ownerWindow_default,
  useEnhancedEffect_default
} from "./chunk-T37UVTAF.js";
import {
  init_isMuiElement,
  isMuiElement_default
} from "./chunk-PV5SBR3U.js";
import {
  createSvgIcon,
  init_createSvgIcon,
  init_useControlled,
  useControlled_default
} from "./chunk-ERPI24MV.js";
import {
  init_requirePropFactory,
  requirePropFactory_default
} from "./chunk-3ECJ5SWL.js";
import {
  init_useEventCallback,
  useEventCallback_default
} from "./chunk-DM74YL5P.js";
import {
  init_useIsFocusVisible,
  useIsFocusVisible_default
} from "./chunk-PM4CXDOY.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-5XRT4CXS.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-XPEZZXCY.js";
import {
  createChainedFunction,
  deprecatedPropType,
  init_createChainedFunction,
  init_deprecatedPropType,
  init_setRef,
  init_unsupportedProp,
  init_useId,
  init_utils,
  setRef,
  unsupportedProp,
  useId
} from "./chunk-GSTAEHIX.js";
import {
  ClassNameGenerator_default
} from "./chunk-MGWKBR45.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-GFT2G5UO.js";

// node_modules/@mui/base/ClassNameGenerator/index.js
var init_ClassNameGenerator = __esm({
  "node_modules/@mui/base/ClassNameGenerator/index.js"() {
    init_utils();
  }
});

// node_modules/@mui/material/utils/createChainedFunction.js
var createChainedFunction_default;
var init_createChainedFunction2 = __esm({
  "node_modules/@mui/material/utils/createChainedFunction.js"() {
    init_createChainedFunction();
    createChainedFunction_default = createChainedFunction;
  }
});

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default;
var init_deprecatedPropType2 = __esm({
  "node_modules/@mui/material/utils/deprecatedPropType.js"() {
    init_deprecatedPropType();
    deprecatedPropType_default = deprecatedPropType;
  }
});

// node_modules/@mui/material/utils/setRef.js
var setRef_default;
var init_setRef2 = __esm({
  "node_modules/@mui/material/utils/setRef.js"() {
    init_setRef();
    setRef_default = setRef;
  }
});

// node_modules/@mui/material/utils/useId.js
var useId_default;
var init_useId2 = __esm({
  "node_modules/@mui/material/utils/useId.js"() {
    "use client";
    init_useId();
    useId_default = useId;
  }
});

// node_modules/@mui/material/utils/unsupportedProp.js
var unsupportedProp_default;
var init_unsupportedProp2 = __esm({
  "node_modules/@mui/material/utils/unsupportedProp.js"() {
    init_unsupportedProp();
    unsupportedProp_default = unsupportedProp;
  }
});

// node_modules/@mui/material/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  capitalize: () => capitalize_default,
  createChainedFunction: () => createChainedFunction_default,
  createSvgIcon: () => createSvgIcon,
  debounce: () => debounce_default,
  deprecatedPropType: () => deprecatedPropType_default,
  isMuiElement: () => isMuiElement_default,
  ownerDocument: () => ownerDocument_default,
  ownerWindow: () => ownerWindow_default,
  requirePropFactory: () => requirePropFactory_default,
  setRef: () => setRef_default,
  unstable_ClassNameGenerator: () => unstable_ClassNameGenerator,
  unstable_useEnhancedEffect: () => useEnhancedEffect_default,
  unstable_useId: () => useId_default,
  unsupportedProp: () => unsupportedProp_default,
  useControlled: () => useControlled_default,
  useEventCallback: () => useEventCallback_default,
  useForkRef: () => useForkRef_default,
  useIsFocusVisible: () => useIsFocusVisible_default
});
var unstable_ClassNameGenerator;
var init_utils2 = __esm({
  "node_modules/@mui/material/utils/index.js"() {
    "use client";
    init_ClassNameGenerator();
    init_capitalize();
    init_createChainedFunction2();
    init_createSvgIcon();
    init_debounce();
    init_deprecatedPropType2();
    init_isMuiElement();
    init_ownerDocument();
    init_ownerWindow();
    init_requirePropFactory();
    init_setRef2();
    init_useEnhancedEffect();
    init_useId2();
    init_unsupportedProp2();
    init_useControlled();
    init_useEventCallback();
    init_useForkRef();
    init_useIsFocusVisible();
    unstable_ClassNameGenerator = {
      configure: (generator) => {
        if (true) {
          console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
        }
        ClassNameGenerator_default.configure(generator);
      }
    };
  }
});

// node_modules/@mui/icons-material/utils/createSvgIcon.js
var require_createSvgIcon = __commonJS({
  "node_modules/@mui/icons-material/utils/createSvgIcon.js"(exports) {
    "use strict";
    "use client";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _utils.createSvgIcon;
      }
    });
    var _utils = (init_utils2(), __toCommonJS(utils_exports));
  }
});

export {
  require_createSvgIcon
};
//# sourceMappingURL=chunk-V5P4HNMW.js.map
