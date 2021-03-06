/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
Zone.__load_patch('EventEmitter', function (global, Zone, api) {
    var callAndReturnFirstParam = function (fn) {
        return function (self, args) {
            fn(self, args);
            return self;
        };
    };
    // For EventEmitter
    var EE_ADD_LISTENER = 'addListener';
    var EE_PREPEND_LISTENER = 'prependListener';
    var EE_REMOVE_LISTENER = 'removeListener';
    var EE_REMOVE_ALL_LISTENER = 'removeAllListeners';
    var EE_LISTENERS = 'listeners';
    var EE_ON = 'on';
    var zoneAwareAddListener = callAndReturnFirstParam(utils_1.makeZoneAwareAddListener(EE_ADD_LISTENER, EE_REMOVE_LISTENER, false, true, false));
    var zoneAwarePrependListener = callAndReturnFirstParam(utils_1.makeZoneAwareAddListener(EE_PREPEND_LISTENER, EE_REMOVE_LISTENER, false, true, true));
    var zoneAwareRemoveListener = callAndReturnFirstParam(utils_1.makeZoneAwareRemoveListener(EE_REMOVE_LISTENER, false));
    var zoneAwareRemoveAllListeners = callAndReturnFirstParam(utils_1.makeZoneAwareRemoveAllListeners(EE_REMOVE_ALL_LISTENER));
    var zoneAwareListeners = utils_1.makeZoneAwareListeners(EE_LISTENERS);
    function patchEventEmitterMethods(obj) {
        if (obj && obj.addListener) {
            utils_1.patchMethod(obj, EE_ADD_LISTENER, function () { return zoneAwareAddListener; });
            utils_1.patchMethod(obj, EE_PREPEND_LISTENER, function () { return zoneAwarePrependListener; });
            utils_1.patchMethod(obj, EE_REMOVE_LISTENER, function () { return zoneAwareRemoveListener; });
            utils_1.patchMethod(obj, EE_REMOVE_ALL_LISTENER, function () { return zoneAwareRemoveAllListeners; });
            utils_1.patchMethod(obj, EE_LISTENERS, function () { return zoneAwareListeners; });
            obj[EE_ON] = obj[EE_ADD_LISTENER];
            return true;
        }
        else {
            return false;
        }
    }
    // EventEmitter
    var events;
    try {
        events = require('events');
    }
    catch (err) {
    }
    if (events && events.EventEmitter) {
        patchEventEmitterMethods(events.EventEmitter.prototype);
    }
});
//# sourceMappingURL=events.js.map