/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timers_1 = require("../common/timers");
var utils_1 = require("../common/utils");
var define_property_1 = require("./define-property");
var event_target_1 = require("./event-target");
var property_descriptor_1 = require("./property-descriptor");
var register_element_1 = require("./register-element");
Zone.__load_patch('timers', function (global, Zone, api) {
    var set = 'set';
    var clear = 'clear';
    timers_1.patchTimer(global, set, clear, 'Timeout');
    timers_1.patchTimer(global, set, clear, 'Interval');
    timers_1.patchTimer(global, set, clear, 'Immediate');
    timers_1.patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    timers_1.patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    timers_1.patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone, api) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        utils_1.patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    event_target_1.eventTargetPatch(global);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        utils_1.patchEventTargetMethods(XMLHttpRequestEventTarget.prototype);
    }
    utils_1.patchClass('MutationObserver');
    utils_1.patchClass('WebKitMutationObserver');
    utils_1.patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    property_descriptor_1.propertyDescriptorPatch(global);
    define_property_1.propertyPatch();
    register_element_1.registerElementPatch(global);
});
Zone.__load_patch('canvas', function (global, Zone, api) {
    var HTMLCanvasElement = global['HTMLCanvasElement'];
    if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob) {
        utils_1.patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
            return { name: 'HTMLCanvasElement.toBlob', target: self, callbackIndex: 0, args: args };
        });
    }
});
Zone.__load_patch('XHR', function (global, Zone, api) {
    // Treat XMLHTTPRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = utils_1.zoneSymbol('xhrTask');
    var XHR_SYNC = utils_1.zoneSymbol('xhrSync');
    var XHR_LISTENER = utils_1.zoneSymbol('xhrListener');
    var XHR_SCHEDULED = utils_1.zoneSymbol('xhrScheduled');
    function patchXHR(window) {
        function findPendingTask(target) {
            var pendingTask = target[XHR_TASK];
            return pendingTask;
        }
        function scheduleTask(task) {
            XMLHttpRequest[XHR_SCHEDULED] = false;
            var data = task.data;
            // remove existing event listener
            var listener = data.target[XHR_LISTENER];
            var oriAddListener = data.target[utils_1.zoneSymbol('addEventListener')];
            var oriRemoveListener = data.target[utils_1.zoneSymbol('removeEventListener')];
            if (listener) {
                oriRemoveListener.apply(data.target, ['readystatechange', listener]);
            }
            var newListener = data.target[XHR_LISTENER] = function () {
                if (data.target.readyState === data.target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && XMLHttpRequest[XHR_SCHEDULED] &&
                        task.state === 'scheduled') {
                        task.invoke();
                    }
                }
            };
            oriAddListener.apply(data.target, ['readystatechange', newListener]);
            var storedTask = data.target[XHR_TASK];
            if (!storedTask) {
                data.target[XHR_TASK] = task;
            }
            sendNative.apply(data.target, data.args);
            XMLHttpRequest[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = utils_1.patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            return openNative.apply(self, args);
        }; });
        var sendNative = utils_1.patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
            var zone = Zone.current;
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = { target: self, isPeriodic: false, delay: null, args: args, aborted: false };
                return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);
            }
        }; });
        var abortNative = utils_1.patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
            var task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global, Zone, api) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        utils_1.patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone, api) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = utils_1.findEventTask(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[utils_1.zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[utils_1.zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchEventTargetMethods = utils_1.patchEventTargetMethods;
    api.patchOnProperties = utils_1.patchOnProperties;
    api.patchMethod = utils_1.patchMethod;
});
//# sourceMappingURL=browser.js.map