"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var utils_1 = require("./utils");
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global, Zone, api) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    Function.prototype.toString = function () {
        if (typeof this === 'function') {
            var originalDelegate = this[utils_1.zoneSymbol('OriginalDelegate')];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.apply(this[utils_1.zoneSymbol('OriginalDelegate')], arguments);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[utils_1.zoneSymbol('Promise')];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = global[utils_1.zoneSymbol('Error')];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return '[object Promise]';
        }
        return originalObjectToString.apply(this, arguments);
    };
});
//# sourceMappingURL=to-string.js.map