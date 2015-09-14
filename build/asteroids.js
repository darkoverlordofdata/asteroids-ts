// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function f(a,e,b){a=document.createElement(a);a.id=e;a.style.cssText=b;return a}function l(a,e,b){var c=f("div",a,"padding:0 0 3px 3px;text-align:left;background:"+b),d=f("div",a+"Text","font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:"+e);d.innerHTML=a.toUpperCase();c.appendChild(d);a=f("div",a+"Graph","width:74px;height:30px;background:"+e);c.appendChild(a);for(e=0;74>e;e++)a.appendChild(f("span","","width:1px;height:30px;float:left;opacity:0.9;background:"+
b));return c}function m(a){for(var b=c.children,d=0;d<b.length;d++)b[d].style.display=d===a?"block":"none";n=a}function p(a,b){a.appendChild(a.firstChild).style.height=Math.min(30,30-30*b)+"px"}var q=self.performance&&self.performance.now?self.performance.now.bind(performance):Date.now,k=q(),r=k,t=0,n=0,c=f("div","stats","width:80px;opacity:0.9;cursor:pointer");c.addEventListener("mousedown",function(a){a.preventDefault();m(++n%c.children.length)},!1);var d=0,u=Infinity,v=0,b=l("fps","#0ff","#002"),
A=b.children[0],B=b.children[1];c.appendChild(b);var g=0,w=Infinity,x=0,b=l("ms","#0f0","#020"),C=b.children[0],D=b.children[1];c.appendChild(b);if(self.performance&&self.performance.memory){var h=0,y=Infinity,z=0,b=l("mb","#f08","#201"),E=b.children[0],F=b.children[1];c.appendChild(b)}m(n);return{REVISION:14,domElement:c,setMode:m,begin:function(){k=q()},end:function(){var a=q();g=a-k;w=Math.min(w,g);x=Math.max(x,g);C.textContent=(g|0)+" MS ("+(w|0)+"-"+(x|0)+")";p(D,g/200);t++;if(a>r+1E3&&(d=Math.round(1E3*
t/(a-r)),u=Math.min(u,d),v=Math.max(v,d),A.textContent=d+" FPS ("+u+"-"+v+")",p(B,d/100),r=a,t=0,void 0!==h)){var b=performance.memory.usedJSHeapSize,c=performance.memory.jsHeapSizeLimit;h=Math.round(9.54E-7*b);y=Math.min(y,h);z=Math.max(z,h);E.textContent=h+" MB ("+y+"-"+z+")";p(F,b/c)}return a},update:function(){k=this.end()}}};"object"===typeof module&&(module.exports=Stats);

/**
 *
 *      ___       __            _   ______
 *     / _ | ____/ /____ __ _  (_)_/_  __/__
 *    / __ |/ __/ __/ -_)  ' \/ (_-</ / (_-<
 *   /_/ |_/_/  \__/\__/_/_/_/_/___/_/ /___/
 *
 *
 */
var artemis;
(function (artemis) {
    /**
     * Gets Class Metadata - Name
     *
     * @param klass
     * @returns {string|SVGAnimatedString|string|string|string|string|*}
     */
    function getClassName(klass) {
        return klass.className || klass.name;
    }
    artemis.getClassName = getClassName;
})(artemis || (artemis = {}));
//# sourceMappingURL=prolog.js.map
/**
 * Universal Module Interface
 */
(function (root, factory) {
    /**
     * Are we using requirejs?
     */
    if ('function' === typeof define && define.amd) {
        define(factory);
    }
    else if ('object' === typeof exports) {
        module.exports['artemis'] = factory();
    }
    else {
        root['artemis'] = factory();
    }
})(this, function () { return artemis; });
//# sourceMappingURL=exports.js.map
/**
 * A node in the list of listeners in a signal.
*/
var artemis;
(function (artemis) {
    var signals;
    (function (signals) {
        /**
         * @constructor
        */
        var ListenerNode = (function () {
            function ListenerNode() {
                /** @param {artemis.signals.ListenerNode} */
                this.previous = null;
                /** @param {artemis.signals.ListenerNode}*/
                this.next = null;
                /** @param {artemis.signals.SignalBase} */
                this.listener = null;
                /** @param {boolean} */
                this.once = false;
            }
            return ListenerNode;
        })();
        signals.ListenerNode = ListenerNode;
    })(signals = artemis.signals || (artemis.signals = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=ListenerNode.js.map
/**
 * This internal class maintains a pool of deleted listener nodes for reuse by framework. This reduces
 * the overhead from object creation and garbage collection.
*/
var artemis;
(function (artemis) {
    var signals;
    (function (signals) {
        var ListenerNode = artemis.signals.ListenerNode;
        /**
         * @constructor
         */
        var ListenerNodePool = (function () {
            function ListenerNodePool() {
                /** @type {artemis.signals.ListenerNodePool} */
                this.tail = null;
                /** @type {artemis.signals.ListenerNodePool} */
                this.cacheTail = null;
            }
            /**
             * Get listener node
             * @return {artemis.signals.ListenerNode}
             */
            ListenerNodePool.prototype.get = function () {
                var node;
                if (this.tail !== null) {
                    node = this.tail;
                    this.tail = this.tail.previous;
                    node.previous = null;
                    return node;
                }
                else {
                    return new ListenerNode();
                }
            };
            /**
             * Dispose of listener node
             * @param {artemis.signals.ListenerNode} node
             */
            ListenerNodePool.prototype.dispose = function (node) {
                node.listener = null;
                node.once = false;
                node.next = null;
                node.previous = this.tail;
                this.tail = node;
            };
            /**
             * Cache listener node
             * @param {artemis.signals.ListenerNode} node
             */
            ListenerNodePool.prototype.cache = function (node) {
                node.listener = null;
                node.previous = this.cacheTail;
                this.cacheTail = node;
            };
            /**
             * Release cache
             */
            ListenerNodePool.prototype.releaseCache = function () {
                var node;
                while (this.cacheTail !== null) {
                    node = this.cacheTail;
                    this.cacheTail = node.previous;
                    node.next = null;
                    node.previous = this.tail;
                    this.tail = node;
                }
            };
            return ListenerNodePool;
        })();
        signals.ListenerNodePool = ListenerNodePool;
    })(signals = artemis.signals || (artemis.signals = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=ListenerNodePool.js.map
var artemis;
(function (artemis) {
    var signals;
    (function (signals) {
        var ListenerNodePool = artemis.signals.ListenerNodePool;
        var SignalBase = (function () {
            /**
             * @constructor
             */
            function SignalBase() {
                /** @type {artemis.signals.ListenerNode} */
                this.head = null;
                /** @type {artemis.signals.ListenerNode} */
                this.tail = null;
                /** @type {number} */
                this.numListeners = 0;
                /** @type {Array<Object>} */
                this.keys = null;
                /** @type {artemis.signals.ListenerNode} */
                this.nodes = null;
                /** @type {artemis.signals.ListenerNodePool} */
                this.listenerNodePool = null;
                /** @type {artemis.signals.ListenerNode} */
                this.toAddHead = null;
                /** @type {artemis.signals.ListenerNode} */
                this.toAddTail = null;
                /** @type {boolean} */
                this.dispatching = false;
                this.nodes = [];
                this.keys = [];
                this.listenerNodePool = new ListenerNodePool();
                this.numListeners = 0;
            }
            /**
             */
            SignalBase.prototype.startDispatch = function () {
                this.dispatching = true; // Void
            };
            /**
             */
            SignalBase.prototype.endDispatch = function () {
                this.dispatching = false;
                if (this.toAddHead) {
                    if (!this.head) {
                        this.head = this.toAddHead;
                        this.tail = this.toAddTail;
                    }
                    else {
                        this.tail.next = this.toAddHead;
                        this.toAddHead.previous = this.tail;
                        this.tail = this.toAddTail;
                    }
                    this.toAddHead = null;
                    this.toAddTail = null;
                }
                this.listenerNodePool.releaseCache(); // Void
            };
            /**
             * @param {Object} listener
             */
            SignalBase.prototype.getNode = function (listener) {
                var node;
                node = this.head;
                while (node !== null) {
                    if (node.listener === listener) {
                        break;
                    }
                    node = node.next;
                }
                if (node === null) {
                    node = this.toAddHead;
                    while (node !== null) {
                        if (node.listener === listener) {
                            break;
                        }
                        node = node.next;
                    }
                }
                return node;
            };
            /**
             * @param {Object} listener
             */
            SignalBase.prototype.add = function (listener) {
                var node;
                if (this.keys.indexOf(listener) !== -1) {
                    return;
                }
                node = this.listenerNodePool.get();
                node.listener = listener;
                this.nodes.push(node);
                this.keys.push(listener);
                this.addNode(node); // Void
            };
            /**
             * @param {Object} listener
             */
            SignalBase.prototype.addOnce = function (listener) {
                var node;
                if (this.keys.indexOf(listener) !== -1) {
                    return;
                }
                node = this.listenerNodePool.get();
                node.listener = listener;
                node.once = true;
                this.nodes.push(node);
                this.keys.push(listener);
                this.addNode(node); // Void
            };
            /**
             * @param {artemis.signals.ListenerNode} node
             */
            SignalBase.prototype.addNode = function (node) {
                if (this.dispatching) {
                    if (this.toAddHead === null) {
                        this.toAddHead = this.toAddTail = node;
                    }
                    else {
                        this.toAddTail.next = node;
                        node.previous = this.toAddTail;
                        this.toAddTail = node;
                    }
                }
                else {
                    if (this.head === null) {
                        this.head = this.tail = node;
                    }
                    else {
                        this.tail.next = node;
                        node.previous = this.tail;
                        this.tail = node;
                    }
                }
                this.numListeners++; // Void
            };
            /**
             * @param {Object} listener
             */
            SignalBase.prototype.remove = function (listener) {
                var index, node;
                index = this.keys.indexOf(listener);
                node = this.nodes[index];
                if (node) {
                    if (this.head === node) {
                        this.head = this.head.next;
                    }
                    if (this.tail === node) {
                        this.tail = this.tail.previous;
                    }
                    if (this.toAddHead === node) {
                        this.toAddHead = this.toAddHead.next;
                    }
                    if (this.toAddTail === node) {
                        this.toAddTail = this.toAddTail.previous;
                    }
                    if (node.previous) {
                        node.previous.next = node.next;
                    }
                    if (node.next) {
                        node.next.previous = node.previous;
                    }
                    this.nodes.splice(index, 1);
                    this.keys.splice(index, 1);
                    if (this.dispatching) {
                        this.listenerNodePool.cache(node);
                    }
                    else {
                        this.listenerNodePool.dispose(node);
                    }
                    this.numListeners--; // Void
                }
            };
            /**
             */
            SignalBase.prototype.removeAll = function () {
                var index, node;
                while (this.head) {
                    node = this.head;
                    this.head = this.head.next;
                    index = this.keys.indexOf(node.listener);
                    this.nodes.splice(index, 1);
                    this.listenerNodePool.dispose(node);
                }
                this.nodes = [];
                this.keys = [];
                this.tail = null;
                this.toAddHead = null;
                this.toAddTail = null;
                this.numListeners = 0; // Void
            };
            return SignalBase;
        })();
        signals.SignalBase = SignalBase;
    })(signals = artemis.signals || (artemis.signals = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=SignalBase.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var signals;
    (function (signals) {
        /**
         * @extends {artemis.signals.SignalBase}
         * @constructor
         */
        var Signal0 = (function (_super) {
            __extends(Signal0, _super);
            function Signal0() {
                _super.apply(this, arguments);
            }
            /**
             * dispatch the event
             */
            Signal0.prototype.dispatch = function () {
                var node;
                this.startDispatch();
                node = this.head;
                while (node !== null) {
                    node.listener();
                    if (node.once) {
                        this.remove(node.listener);
                    }
                    node = node.next;
                }
                return this.endDispatch();
            };
            return Signal0;
        })(artemis.signals.SignalBase);
        signals.Signal0 = Signal0;
    })(signals = artemis.signals || (artemis.signals = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Signal0.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var signals;
    (function (signals) {
        /**
         * @extends {artemis.signals.SignalBase}
         * @constructor
         */
        var Signal1 = (function (_super) {
            __extends(Signal1, _super);
            function Signal1() {
                _super.apply(this, arguments);
            }
            /**
             * dispatch the event
             * @param {Object} $1
             */
            Signal1.prototype.dispatch = function ($1) {
                var node;
                this.startDispatch();
                node = this.head;
                while (node !== null) {
                    node.listener($1);
                    if (node.once) {
                        this.remove(node.listener);
                    }
                    node = node.next;
                }
                return this.endDispatch();
            };
            return Signal1;
        })(artemis.signals.SignalBase);
        signals.Signal1 = Signal1;
    })(signals = artemis.signals || (artemis.signals = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Signal1.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var signals;
    (function (signals) {
        /**
         * @extends {artemis.signals.SignalBase}
         * @constructor
         */
        var Signal2 = (function (_super) {
            __extends(Signal2, _super);
            function Signal2() {
                _super.apply(this, arguments);
            }
            /**
             * dispatch the event
             * @param {Object} $1
             * @param {Object} $2
             */
            Signal2.prototype.dispatch = function ($1, $2) {
                var node;
                this.startDispatch();
                node = this.head;
                while (node) {
                    node.listener($1, $2);
                    if (node.once) {
                        this.remove(node.listener);
                    }
                    node = node.next;
                }
                return this.endDispatch();
            };
            return Signal2;
        })(artemis.signals.SignalBase);
        signals.Signal2 = Signal2;
    })(signals = artemis.signals || (artemis.signals = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Signal2.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var signals;
    (function (signals) {
        /**
         * @extends {artemis.signals.SignalBase}
         * @constructor
         */
        var Signal3 = (function (_super) {
            __extends(Signal3, _super);
            function Signal3() {
                _super.apply(this, arguments);
            }
            /**
             * dispatch the event
             * @param {Object} $1
             * @param {Object} $2
             * @param {Object} $3
             */
            Signal3.prototype.dispatch = function ($1, $2, $3) {
                var node;
                this.startDispatch();
                node = this.head;
                while (node !== null) {
                    node.listener($1, $2, $3);
                    if (node.once) {
                        this.remove(node.listener);
                    }
                    node = node.next;
                }
                return this.endDispatch();
            };
            return Signal3;
        })(artemis.signals.SignalBase);
        signals.Signal3 = Signal3;
    })(signals = artemis.signals || (artemis.signals = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Signal3.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        /**
        * Collection type a bit like ArrayList but does not preserve the order of its
        * entities, speedwise it is very good, especially suited for games.
        */
        var Bag = (function () {
            /**
            * Constructs an empty Bag with the specified initial capacity.
            * Constructs an empty Bag with an initial capacity of 64.
            *
            * @param capacity
            *            the initial capacity of Bag
            */
            function Bag(capacity) {
                if (capacity === void 0) { capacity = 64; }
                this.size_ = 0;
                this.data_ = new Array(capacity);
            }
            /**
            * Removes the element at the specified position in this Bag. does this by
            * overwriting it was last element then removing last element
            *
            * @param index
            *            the index of element to be removed
            * @return element that was removed from the Bag
            */
            Bag.prototype.removeAt = function (index) {
                var e = this.data_[index]; // make copy of element to remove so it can be returned
                this.data_[index] = this.data_[--this.size_]; // overwrite item to remove with last element
                this.data_[this.size_] = null; // null last element, so gc can do its work
                return e;
            };
            /**
            * Removes the first occurrence of the specified element from this Bag, if
            * it is present. If the Bag does not contain the element, it is unchanged.
            * does this by overwriting it was last element then removing last element
            *
            * @param e
            *            element to be removed from this list, if present
            * @return <tt>true</tt> if this list contained the specified element
            */
            Bag.prototype.remove = function (e) {
                var i;
                var e2;
                for (i = 0; i < this.size_; i++) {
                    e2 = this.data_[i];
                    if (e == e2) {
                        this.data_[i] = this.data_[--this.size_]; // overwrite item to remove with last element
                        this.data_[this.size_] = null; // null last element, so gc can do its work
                        return true;
                    }
                }
                return false;
            };
            /**
            * Remove and return the last object in the bag.
            *
            * @return the last object in the bag, null if empty.
            */
            Bag.prototype.removeLast = function () {
                if (this.size_ > 0) {
                    var e = this.data_[--this.size_];
                    this.data_[this.size_] = null;
                    return e;
                }
                return null;
            };
            /**
            * Check if bag contains this element.
            *
            * @param e
            * @return
            */
            Bag.prototype.contains = function (e) {
                var i;
                for (i = 0; this.size_ > i; i++) {
                    if (e === this.data_[i]) {
                        return true;
                    }
                }
                return false;
            };
            /**
            * Removes from this Bag all of its elements that are contained in the
            * specified Bag.
            *
            * @param bag
            *            Bag containing elements to be removed from this Bag
            * @return {@code true} if this Bag changed as a result of the call
            */
            Bag.prototype.removeAll = function (bag) {
                var modified = false;
                var i;
                var j;
                var e1;
                var e2;
                for (i = 0; i < bag.size(); i++) {
                    e1 = bag.get(i);
                    for (j = 0; j < this.size_; j++) {
                        e2 = this.data_[j];
                        if (e1 === e2) {
                            this.removeAt(j);
                            j--;
                            modified = true;
                            break;
                        }
                    }
                }
                return modified;
            };
            /**
             * Returns the element at the specified position in Bag.
             *
             * @param index
             *            index of the element to return
             * @return the element at the specified position in bag
         *
         * @throws ArrayIndexOutOfBoundsException
             */
            Bag.prototype.get = function (index) {
                if (index >= this.data_.length) {
                    throw new Error('ArrayIndexOutOfBoundsException');
                }
                return this.data_[index];
            };
            /**
             * Returns the element at the specified position in Bag. This method
             * ensures that the bag grows if the requested index is outside the bounds
             * of the current backing array.
             *
             * @param index
             *			index of the element to return
             *
             * @return the element at the specified position in bag
             *
             */
            Bag.prototype.safeGet = function (index) {
                if (index >= this.data_.length) {
                    this.grow((index * 7) / 4 + 1);
                }
                return this.data_[index];
            };
            /**
            * Returns the number of elements in this bag.
            *
            * @return the number of elements in this bag
            */
            Bag.prototype.size = function () {
                return this.size_;
            };
            /**
            * Returns the number of elements the bag can hold without growing.
            *
            * @return the number of elements the bag can hold without growing.
            */
            Bag.prototype.getCapacity = function () {
                return this.data_.length;
            };
            /**
            * Checks if the internal storage supports this index.
            *
            * @param index
            * @return
            */
            Bag.prototype.isIndexWithinBounds = function (index) {
                return index < this.getCapacity();
            };
            /**
            * Returns true if this list contains no elements.
            *
            * @return true if this list contains no elements
            */
            Bag.prototype.isEmpty = function () {
                return this.size_ == 0;
            };
            /**
            * Adds the specified element to the end of this bag. if needed also
            * increases the capacity of the bag.
            *
            * @param e
            *            element to be added to this list
            */
            Bag.prototype.add = function (e) {
                // is size greater than capacity increase capacity
                if (this.size_ === this.data_.length) {
                    this.grow();
                }
                this.data_[this.size_++] = e;
            };
            /**
            * Set element at specified index in the bag.
            *
            * @param index position of element
            * @param e the element
            */
            Bag.prototype.set = function (index, e) {
                if (index >= this.data_.length) {
                    this.grow(index * 2);
                }
                this.size_ = index + 1;
                this.data_[index] = e;
            };
            Bag.prototype.grow = function (newCapacity) {
                if (newCapacity === void 0) { newCapacity = ~~((this.data_.length * 3) / 2) + 1; }
                this.data_.length = ~~newCapacity;
            };
            Bag.prototype.ensureCapacity = function (index) {
                if (index >= this.data_.length) {
                    this.grow(index * 2);
                }
            };
            /**
            * Removes all of the elements from this bag. The bag will be empty after
            * this call returns.
            */
            Bag.prototype.clear = function () {
                var i;
                // null all elements so gc can clean up
                for (i = 0; i < this.size_; i++) {
                    this.data_[i] = null;
                }
                this.size_ = 0;
            };
            /**
            * Add all items into this bag.
             * @param items
             */
            Bag.prototype.addAll = function (items) {
                var i;
                for (i = 0; items.size() > i; i++) {
                    this.add(items.get(i));
                }
            };
            return Bag;
        })();
        utils.Bag = Bag;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Bag.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        /*
         * BitSets are packed into arrays of "words."  Currently a word
         * consists of 32 bits, requiring 5 address bits.
         */
        var ADDRESS_BITS_PER_WORD = 5;
        var BITS_PER_WORD = 1 << ADDRESS_BITS_PER_WORD; // 32
        var WORD_MASK = 0xffffffff;
        /**
         * @see http://stackoverflow.com/questions/6506356/java-implementation-of-long-numberoftrailingzeros
         */
        function numberOfTrailingZeros(i) {
            if (i == 0)
                return 64;
            var x = i;
            var y;
            var n = 63;
            y = x << 32;
            if (y != 0) {
                n -= 32;
                x = y;
            }
            y = x << 16;
            if (y != 0) {
                n -= 16;
                x = y;
            }
            y = x << 8;
            if (y != 0) {
                n -= 8;
                x = y;
            }
            y = x << 4;
            if (y != 0) {
                n -= 4;
                x = y;
            }
            y = x << 2;
            if (y != 0) {
                n -= 2;
                x = y;
            }
            return (n - ((x << 1) >>> 63));
        }
        var BitSet = (function () {
            function BitSet(nbits) {
                if (nbits === void 0) { nbits = 0; }
                if (nbits < 0) {
                    throw RangeError("Negative Array Size: [" + nbits + ']');
                }
                else if (nbits === 0) {
                    this.words_ = [];
                }
                else {
                    var words = this.words_ = new Array(((nbits - 1) >> ADDRESS_BITS_PER_WORD) + 1);
                    for (var i = 0, l = words.length; i < l; i++) {
                        words[i] = 0;
                    }
                }
            }
            BitSet.prototype.nextSetBit = function (fromIndex) {
                var u = fromIndex >> ADDRESS_BITS_PER_WORD;
                var words = this.words_;
                var wordsInUse = words.length;
                var word = words[u] & (WORD_MASK << fromIndex);
                while (true) {
                    if (word !== 0)
                        return (u * BITS_PER_WORD) + numberOfTrailingZeros(word);
                    if (++u === wordsInUse)
                        return -1;
                    word = words[u];
                }
            };
            BitSet.prototype.intersects = function (set) {
                var words = this.words_;
                var wordsInUse = words.length;
                for (var i = Math.min(wordsInUse, set.words_.length) - 1; i >= 0; i--)
                    if ((words[i] & set.words_[i]) != 0)
                        return true;
                return false;
            };
            // length():number {
            // 	return this.length_;
            // }
            // and(set:BitSet):BitSet {
            // }
            // or(set:BitSet):BitSet {
            // }
            // nand(set:BitSet):BitSet {
            // }
            // nor(set:BitSet):BitSet {
            // }
            // not(set:BitSet):BitSet {
            // }
            // xor(set:BitSet):BitSet {
            // }
            // equals(set:BitSet):boolean {
            // }
            // clone():BitSet {
            // }
            BitSet.prototype.isEmpty = function () {
                return this.words_.length === 0;
            };
            // toString():string {
            // }
            // cardinality():number {
            // }
            // msb():number {
            // }
            BitSet.prototype.set = function (bitIndex, value) {
                if (value === void 0) { value = true; }
                var wordIndex = bitIndex >> ADDRESS_BITS_PER_WORD;
                var words = this.words_;
                var wordsInUse = words.length;
                var wordsRequired = wordIndex + 1;
                if (wordsInUse < wordsRequired) {
                    words.length = Math.max(2 * wordsInUse, wordsRequired);
                    for (var i = wordsInUse, l = words.length; i < l; i++) {
                        words[i] = 0;
                    }
                }
                if (value) {
                    return words[wordIndex] |= (1 << bitIndex);
                }
                else {
                    return words[wordIndex] &= ~(1 << bitIndex);
                }
            };
            // setRange(from:number, to:number, value:number):number {
            // }
            BitSet.prototype.get = function (bitIndex) {
                var wordIndex = bitIndex >> ADDRESS_BITS_PER_WORD;
                var words = this.words_;
                var wordsInUse = words.length;
                return (wordIndex < wordsInUse) && ((words[wordIndex] & (1 << bitIndex)) != 0);
            };
            // getRange(from:number, to:number):number {
            // }
            BitSet.prototype.clear = function (bitIndex) {
                if (bitIndex === null) {
                    var words = this.words_;
                    var wordsInUse = words.length;
                    while (wordsInUse > 0) {
                        words[--wordsInUse] = 0;
                    }
                    return;
                }
                var wordIndex = bitIndex >> ADDRESS_BITS_PER_WORD;
                this.words_[wordIndex] &= ~(1 << bitIndex);
            };
            return BitSet;
        })();
        utils.BitSet = BitSet;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=BitSet.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.nextBool = function () {
                return ((~~(Math.random() * 32767)) & 1) === 1;
            };
            /*
             * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
            */
            MathUtils.nextDouble = function () {
                return Math.random();
            };
            /*
             * Generates a random int value from 0, inclusive, to max, exclusive.
            */
            MathUtils.nextInt = function (max) {
                return ~~(Math.random() * max);
            };
            MathUtils.random = function (start, end) {
                if (end === null) {
                    return MathUtils.nextInt(start + 1);
                }
                else if (parseInt(start) === parseFloat(start) && parseInt(end) === parseFloat(end)) {
                    return start + MathUtils.nextInt(end - start + 1);
                }
                else {
                    return start + MathUtils.nextDouble() * (end - start);
                }
            };
            return MathUtils;
        })();
        utils.MathUtils = MathUtils;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=MathUtils.js.map
//# sourceMappingURL=Map.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        /**
         * Decode HashMap key
         *
         * When the key is an object, we generate a unique uuid and use that as the actual key.
         */
        function decode(key) {
            switch (typeof key) {
                case 'boolean':
                    return '' + key;
                case 'number':
                    return '' + key;
                case 'string':
                    return '' + key;
                case 'function':
                    return artemis.getClassName(key);
                default:
                    key.uuid = key.uuid ? key.uuid : utils.UUID.randomUUID();
                    return key.uuid;
            }
        }
        /**
         * HashMap
         *
         * Allow object as key.
         */
        var HashMap = (function () {
            function HashMap() {
                this.clear();
            }
            HashMap.prototype.clear = function () {
                this.map_ = {};
                this.keys_ = {};
            };
            HashMap.prototype.values = function () {
                var result = [];
                for (var key in this.map_) {
                    result.push(this.map_[key]);
                }
                return result;
            };
            HashMap.prototype.contains = function (value) {
                for (var key in this.map_) {
                    if (value === this.map_[key]) {
                        return true;
                    }
                }
                return false;
            };
            HashMap.prototype.containsKey = function (key) {
                return decode(key) in this.map_;
            };
            HashMap.prototype.containsValue = function (value) {
                for (var key in this.map_) {
                    if (value === this.map_[key]) {
                        return true;
                    }
                }
                return false;
            };
            HashMap.prototype.get = function (key) {
                return this.map_[decode(key)];
            };
            HashMap.prototype.isEmpty = function () {
                return Object.keys(this.map_).length === 0;
            };
            HashMap.prototype.keys = function () {
                var result = [];
                for (var key in this.keys_) {
                    result.push(this.keys_[key]);
                }
                return result;
            };
            /**
             * if key is a string, use as is, else use key.id_ or key.name
             */
            HashMap.prototype.put = function (key, value) {
                var k = decode(key);
                this.map_[k] = value;
                this.keys_[k] = key;
            };
            HashMap.prototype.remove = function (key) {
                var k = decode(key);
                var value = this.map_[k];
                delete this.map_[k];
                delete this.keys_[k];
                return value;
            };
            HashMap.prototype.size = function () {
                return Object.keys(this.map_).length;
            };
            return HashMap;
        })();
        utils.HashMap = HashMap;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=HashMap.js.map
//# sourceMappingURL=ImmutableBag.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        var Timer = (function () {
            function Timer(delay, repeat) {
                if (repeat === void 0) { repeat = false; }
                this.execute = function () { };
                this.delay = delay;
                this.repeat = repeat;
                this.acc = 0;
            }
            Timer.prototype.update = function (delta) {
                if (!this.done && !this.stopped) {
                    this.acc += delta;
                    if (this.acc >= this.delay) {
                        this.acc -= this.delay;
                        if (this.repeat) {
                            this.reset();
                        }
                        else {
                            this.done = true;
                        }
                        this.execute();
                    }
                }
            };
            Timer.prototype.reset = function () {
                this.stopped = false;
                this.done = false;
                this.acc = 0;
            };
            Timer.prototype.isDone = function () {
                return this.done;
            };
            Timer.prototype.isRunning = function () {
                return !this.done && this.acc < this.delay && !this.stopped;
            };
            Timer.prototype.stop = function () {
                this.stopped = true;
            };
            Timer.prototype.setDelay = function (delay) {
                this.delay = delay;
            };
            Timer.prototype.getPercentageRemaining = function () {
                if (this.done)
                    return 100;
                else if (this.stopped)
                    return 0;
                else
                    return 1 - (this.delay - this.acc) / this.delay;
            };
            Timer.prototype.getDelay = function () {
                return this.delay;
            };
            return Timer;
        })();
        utils.Timer = Timer;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Timer.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        // Thanks to Riven
        // From: http://riven8192.blogspot.com/2009/08/fastmath-sincos-lookup-tables.html
        var TrigLUT = (function () {
            function TrigLUT() {
            }
            TrigLUT.main = function () {
                console.log(TrigLUT.cos(Math.PI));
                console.log(TrigLUT.cosDeg(180));
            };
            TrigLUT.sin = function (rad) {
                return TrigLUT.sin_[(rad * TrigLUT.radToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.cos = function (rad) {
                return TrigLUT.cos_[(rad * TrigLUT.radToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.sinDeg = function (deg) {
                return TrigLUT.sin_[(deg * TrigLUT.degToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.cosDeg = function (deg) {
                return TrigLUT.cos_[(deg * TrigLUT.degToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.init = function (update) {
                TrigLUT.RAD = Math.PI / 180.0;
                TrigLUT.DEG = 180.0 / Math.PI;
                TrigLUT.SIN_BITS = 12;
                TrigLUT.SIN_MASK = ~(-1 << TrigLUT.SIN_BITS);
                TrigLUT.SIN_COUNT = TrigLUT.SIN_MASK + 1;
                TrigLUT.radFull = (Math.PI * 2.0);
                TrigLUT.degFull = (360.0);
                TrigLUT.radToIndex = TrigLUT.SIN_COUNT / TrigLUT.radFull;
                TrigLUT.degToIndex = TrigLUT.SIN_COUNT / TrigLUT.degFull;
                TrigLUT.sin_ = new Array(TrigLUT.SIN_COUNT);
                TrigLUT.cos_ = new Array(TrigLUT.SIN_COUNT);
                for (var i = 0; i < TrigLUT.SIN_COUNT; i++) {
                    TrigLUT.sin_[i] = Math.sin((i + 0.5) / TrigLUT.SIN_COUNT * TrigLUT.radFull);
                    TrigLUT.cos_[i] = Math.cos((i + 0.5) / TrigLUT.SIN_COUNT * TrigLUT.radFull);
                }
                if (update) {
                    Math.sin = TrigLUT.sin;
                    Math.cos = TrigLUT.cos;
                }
            };
            return TrigLUT;
        })();
        utils.TrigLUT = TrigLUT;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TrigLUT.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        var hex = [
            "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f",
            "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f",
            "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f",
            "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f",
            "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f",
            "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f",
            "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f",
            "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f",
            "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f",
            "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f",
            "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af",
            "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf",
            "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf",
            "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df",
            "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef",
            "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"
        ];
        var UUID = (function () {
            function UUID() {
            }
            //static check = {};
            /**
            * Fast UUID generator, RFC4122 version 4 compliant
        * format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        *
            * @author Jeff Ward (jcward.com).
            * @license MIT license
            * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
            **/
            UUID.randomUUID = function () {
                var d0 = Math.random() * 0xffffffff | 0;
                var d1 = Math.random() * 0xffffffff | 0;
                var d2 = Math.random() * 0xffffffff | 0;
                var d3 = Math.random() * 0xffffffff | 0;
                return hex[d0 & 0xff] + hex[d0 >> 8 & 0xff] + hex[d0 >> 16 & 0xff] + hex[d0 >> 24 & 0xff] + '-' +
                    hex[d1 & 0xff] + hex[d1 >> 8 & 0xff] + '-' + hex[d1 >> 16 & 0x0f | 0x40] + hex[d1 >> 24 & 0xff] + '-' +
                    hex[d2 & 0x3f | 0x80] + hex[d2 >> 8 & 0xff] + '-' + hex[d2 >> 16 & 0xff] + hex[d2 >> 24 & 0xff] +
                    hex[d3 & 0xff] + hex[d3 >> 8 & 0xff] + hex[d3 >> 16 & 0xff] + hex[d3 >> 24 & 0xff];
            };
            return UUID;
        })();
        utils.UUID = UUID;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=UUID.js.map
var artemis;
(function (artemis) {
    var annotations;
    (function (annotations) {
        /**
         * EntityTemplate
         *
         */
        function EntityTemplate(component) {
            return function (target, propertyKey, descriptor) {
                EntityTemplate['entityTemplates'] = EntityTemplate['entityTemplates'] || {};
                EntityTemplate['entityTemplates'][component] = target;
            };
        }
        annotations.EntityTemplate = EntityTemplate;
    })(annotations = artemis.annotations || (artemis.annotations = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=EntityTemplate.js.map
var artemis;
(function (artemis) {
    var annotations;
    (function (annotations) {
        /**
        * Mapper artemis.component.Position
        * em:ComponentMapper<artemis.component.Position>;
        *
        */
        function Mapper(component) {
            return function (target, propertyKey, descriptor) {
                var klass = target.constructor;
                klass.declaredFields = klass.declaredFields || [];
                klass.declaredFields.push(propertyKey);
                klass.prototype[propertyKey] = component;
            };
        }
        annotations.Mapper = Mapper;
    })(annotations = artemis.annotations || (artemis.annotations = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Mapper.js.map
var artemis;
(function (artemis) {
    var annotations;
    (function (annotations) {
        /**
        * Mapper artemis.component.Position
        * em:ComponentMapper<artemis.component.Position>;
        *
        */
        function Pooled() {
            return function (klass, propertyKey, descriptor) {
                Pooled['pooledComponents'] = Pooled['pooledComponents'] || {};
                Pooled['pooledComponents'][artemis.getClassName(klass)] = klass;
            };
        }
        annotations.Pooled = Pooled;
        Pooled['pooledComponents'] = {};
    })(annotations = artemis.annotations || (artemis.annotations = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Pooled.js.map
var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        /**
         *
         */
        (function (TriggerStateType) {
            TriggerStateType[TriggerStateType["ValueAdded"] = 1] = "ValueAdded";
            TriggerStateType[TriggerStateType["ValueRemoved"] = 16] = "ValueRemoved";
            TriggerStateType[TriggerStateType["ValueChanged"] = 256] = "ValueChanged";
            TriggerStateType[TriggerStateType["TriggerAdded"] = 4096] = "TriggerAdded";
        })(blackboard.TriggerStateType || (blackboard.TriggerStateType = {}));
        var TriggerStateType = blackboard.TriggerStateType;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TriggerStateType.js.map
var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        /**
         *
         */
        var BlackBoard = (function () {
            /**
             * Initializes a new instance of the BlackBoard class
             */
            function BlackBoard() {
                this.intelligence = {};
                this.triggers = {};
            }
            /**
             * Adds the trigger.
             *
             * @param trigger   The trigger.
             * @param evaluateNow if set to true [evaluate now].
             */
            BlackBoard.prototype.addTrigger = function (trigger, evaluateNow) {
                if (evaluateNow === void 0) { evaluateNow = false; }
                trigger.blackboard = this;
                for (var i in trigger.worldPropertiesMonitored) {
                    var intelName = trigger.worldPropertiesMonitored[i];
                    if (this.triggers[name]) {
                        this.triggers[name].push(trigger);
                    }
                    else {
                        this.triggers[name] = [trigger];
                    }
                }
                if (evaluateNow) {
                    if (trigger.isFired === false) {
                        trigger.fire(blackboard.TriggerStateType.TriggerAdded);
                    }
                }
            };
            /**
             * Atomics the operate on entry.
             * @param operation The operation.
             */
            BlackBoard.prototype.atomicOperateOnEntry = function (operation) {
                operation(this);
            };
            /**
             * Gets the entry.
             *
             * @param name  The name.
             * @returns {T} The specified element.
             */
            BlackBoard.prototype.getEntry = function (name) {
                return this.intelligence[name];
            };
            /**
             * Removes the entry.
             * @param name  The name.
             */
            BlackBoard.prototype.removeEntry = function (name) {
                if (this.intelligence[name]) {
                    delete this.intelligence[name];
                    if (this.triggers[name]) {
                        for (var i in this.triggers[name]) {
                            var item = this.triggers[name][i];
                            if (item.isFired === false) {
                                item.fire(blackboard.TriggerStateType.ValueRemoved);
                            }
                        }
                    }
                }
            };
            /**
             * Removes the trigger.
             * @param trigger The trigger.
             */
            BlackBoard.prototype.removeTrigger = function (trigger) {
                for (var i in trigger.worldPropertiesMonitored) {
                    var intelName = trigger.worldPropertiesMonitored[i];
                    var t = this.triggers[intelName].indexOf(trigger);
                    if (t !== -1) {
                        this.triggers[intelName].slice(t, 1);
                    }
                }
            };
            /**
             * Sets the entry.
             * @param name  The name.
             * @param intel The intel.
             */
            BlackBoard.prototype.setEntry = function (name, intel) {
                var triggerStateType = this.intelligence[name] ? blackboard.TriggerStateType.ValueChanged : blackboard.TriggerStateType.ValueAdded;
                this.intelligence[name] = intel;
                if (this.triggers[name]) {
                    for (var i in this.triggers[name]) {
                        var item = this.triggers[name][i];
                        if (item.isFired === false) {
                            item.fire(triggerStateType);
                        }
                    }
                }
            };
            /**
             * Get a list of all related triggers.]
             *
             * @param name  The name.
             * @returns {Array<Trigger>}  List of appropriated triggers.
             */
            BlackBoard.prototype.triggerList = function (name) {
                return this.triggers[name];
            };
            return BlackBoard;
        })();
        blackboard.BlackBoard = BlackBoard;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=BlackBoard.js.map
var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        var Trigger = (function () {
            /**
             * Initializes a new instance of the Trigger class
             * @param propertyName Name of the property.
             */
            function Trigger(propertyName) {
                this.isFired = false;
                this.worldPropertiesMonitored = [].concat(propertyName);
            }
            /**
             * Removes the this trigger.
             */
            Trigger.prototype.removeThisTrigger = function () {
                this.blackboard.removeTrigger(this);
            };
            /**
             * Fires the specified trigger state.
             * @param triggerStateType
             */
            Trigger.prototype.fire = function (triggerStateType) {
                this.isFired = true;
                this.triggerStateType = triggerStateType;
                if (this.checkConditionToFire()) {
                    this.calledOnFire(triggerStateType);
                    if (this.onFire !== null) {
                        this.onFire(this);
                    }
                }
                this.isFired = false;
            };
            /**
             * Called if is fired.
             * @param triggerStateType  State of the trigger.
             */
            Trigger.prototype.calledOnFire = function (triggerStateType) { };
            /**
             * Checks the condition to fire.
             * @returns {boolean} if XXXX, false otherwise
             */
            Trigger.prototype.checkConditionToFire = function () {
                return true;
            };
            return Trigger;
        })();
        blackboard.Trigger = Trigger;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Trigger.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        var SimpleTrigger = (function (_super) {
            __extends(SimpleTrigger, _super);
            /**
             * Initializes a new instance of the SimpleTrigger class.
             *
             * @param name  The name.
             * @param condition The condition.
             * @param onFire  The event.
             */
            function SimpleTrigger(name, condition, onFire) {
                _super.call(this, [name]);
                this.condition = condition;
                this.onFire = onFire;
            }
            /**
             * Called if is fired.
             * @param triggerStateType  State of the trigger.
             */
            SimpleTrigger.prototype.calledOnFire = function (triggerStateType) {
                if (this.onFire !== null) {
                    this.onFire(triggerStateType);
                }
            };
            /**
             * Checks the condition to fire.
             * @returns {boolean} if XXXX, false otherwise
             */
            SimpleTrigger.prototype.checkConditionToFire = function () {
                return this.condition(this.blackboard, this.triggerStateType);
            };
            return SimpleTrigger;
        })(blackboard.Trigger);
        blackboard.SimpleTrigger = SimpleTrigger;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=SimpleTrigger.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        var TriggerMultiCondition = (function (_super) {
            __extends(TriggerMultiCondition, _super);
            /**
             * Initializes a new instance of the SimpleTrigger class.
             *
             * @param condition The condition.
             * @param onFire  The event.
             * @param names  The names.
             */
            function TriggerMultiCondition(condition, onFire, names) {
                _super.call(this, names);
                this.condition = condition;
                this.onFire = onFire;
            }
            /**
             * Removes the this trigger.
             */
            TriggerMultiCondition.prototype.removeThisTrigger = function () {
                this.blackboard.removeTrigger(this);
            };
            /**
             * Called if is fired.
             * @param triggerStateType  State of the trigger.
             */
            TriggerMultiCondition.prototype.calledOnFire = function (triggerStateType) {
                if (this.onFire !== null) {
                    this.onFire(triggerStateType);
                }
            };
            /**
             * Checks the condition to fire.
             * @returns {boolean} if XXXX, false otherwise
             */
            TriggerMultiCondition.prototype.checkConditionToFire = function () {
                return this.condition(this.blackboard, this.triggerStateType);
            };
            return TriggerMultiCondition;
        })(blackboard.Trigger);
        blackboard.TriggerMultiCondition = TriggerMultiCondition;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TriggerMultiCondition.js.map
var artemis;
(function (artemis) {
    /**
     * A tag class. All components in the system must extend this class.
     *
     * @author Arni Arent
     */
    var Component = (function () {
        function Component() {
        }
        Component.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        return Component;
    })();
    artemis.Component = Component;
})(artemis || (artemis = {}));
//# sourceMappingURL=Component.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    /**
     * Component type that recycles instances.
     * <p>
     * Expects no <code>final</code> fields.
     */
    var PooledComponent = (function (_super) {
        __extends(PooledComponent, _super);
        function PooledComponent() {
            _super.apply(this, arguments);
        }
        PooledComponent.prototype.reset = function () { };
        return PooledComponent;
    })(artemis.Component);
    artemis.PooledComponent = PooledComponent;
})(artemis || (artemis = {}));
//# sourceMappingURL=PooledComponent.js.map
var artemis;
(function (artemis) {
    var BitSet = artemis.utils.BitSet;
    /**
    * An Aspects is used by systems as a matcher against entities, to check if a system is
    * interested in an entity. Aspects define what sort of component types an entity must
    * possess, or not possess.
    *
    * This creates an aspect where an entity must possess A and B and C:
    * Aspect.getAspectForAll(A.class, B.class, C.class)
    *
    * This creates an aspect where an entity must possess A and B and C, but must not possess U or V.
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class)
    *
    * This creates an aspect where an entity must possess A and B and C, but must not possess U or V, but must possess one of X or Y or Z.
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class).one(X.class, Y.class, Z.class)
    *
    * You can create and compose aspects in many ways:
    * Aspect.getEmpty().one(X.class, Y.class, Z.class).all(A.class, B.class, C.class).exclude(U.class, V.class)
    * is the same as:
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class).one(X.class, Y.class, Z.class)
    *
    * @author Arni Arent
    *
    */
    var Aspect = (function () {
        function Aspect() {
            this.allSet_ = new BitSet();
            this.exclusionSet_ = new BitSet();
            this.oneSet_ = new BitSet();
        }
        Aspect.prototype.setWorld = function (world) {
            this.world_ = world;
        };
        Aspect.prototype.getAllSet = function () {
            return this.allSet_;
        };
        Aspect.prototype.getExclusionSet = function () {
            return this.exclusionSet_;
        };
        Aspect.prototype.getOneSet = function () {
            return this.oneSet_;
        };
        Aspect.prototype.getIndexFor = function (c) {
            return Aspect.typeFactory.getIndexFor(c);
        };
        /**
            * Returns an aspect where an entity must possess all of the specified component types.
            * @param type a required component type
            * @param types a required component type
            * @return an aspect that can be matched against entities
            */
        Aspect.prototype.all = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            this.allSet_.set(this.getIndexFor(type));
            var t;
            for (t in types) {
                this.allSet_.set(this.getIndexFor(types[t]));
            }
            return this;
        };
        /**
        * Excludes all of the specified component types from the aspect. A system will not be
        * interested in an entity that possesses one of the specified exclusion component types.
        *
        * @param type component type to exclude
        * @param types component type to exclude
        * @return an aspect that can be matched against entities
        */
        Aspect.prototype.exclude = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            this.exclusionSet_.set(this.getIndexFor(type));
            var t;
            for (t in types) {
                this.exclusionSet_.set(this.getIndexFor(types[t]));
            }
            return this;
        };
        /**
        * Returns an aspect where an entity must possess one of the specified component types.
        * @param type one of the types the entity must possess
        * @param types one of the types the entity must possess
        * @return an aspect that can be matched against entities
        */
        Aspect.prototype.one = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            this.oneSet_.set(this.getIndexFor(type));
            for (var t in types) {
                this.oneSet_.set(this.getIndexFor(types[t]));
            }
            return this;
        };
        /**
        * Creates an aspect where an entity must possess all of the specified component types.
        *
        * @param type the type the entity must possess
        * @param types the type the entity must possess
        * @return an aspect that can be matched against entities
        *
        * @deprecated
        * @see getAspectForAll
        */
        Aspect.getAspectFor = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            return Aspect.getAspectForAll.apply(Aspect, [type].concat(types));
        };
        /**
        * Creates an aspect where an entity must possess all of the specified component types.
        *
        * @param type a required component type
        * @param types a required component type
        * @return an aspect that can be matched against entities
        */
        Aspect.getAspectForAll = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            var aspect = new Aspect();
            aspect.all.apply(aspect, [type].concat(types));
            return aspect;
        };
        /**
        * Creates an aspect where an entity must possess one of the specified component types.
        *
        * @param type one of the types the entity must possess
        * @param types one of the types the entity must possess
        * @return an aspect that can be matched against entities
        */
        Aspect.getAspectForOne = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            var aspect = new Aspect();
            aspect.one.apply(aspect, [type].concat(types));
            return aspect;
        };
        /**
        * Creates and returns an empty aspect. This can be used if you want a system that processes no entities, but
        * still gets invoked. Typical usages is when you need to create special purpose systems for debug rendering,
        * like rendering FPS, how many entities are active in the world, etc.
        *
        * You can also use the all, one and exclude methods on this aspect, so if you wanted to create a system that
        * processes only entities possessing just one of the components A or B or C, then you can do:
        * Aspect.getEmpty().one(A,B,C);
        *
        * @return an empty Aspect that will reject all entities.
        */
        Aspect.getEmpty = function () {
            return new Aspect();
        };
        return Aspect;
    })();
    artemis.Aspect = Aspect;
})(artemis || (artemis = {}));
//# sourceMappingURL=Aspect.js.map
var artemis;
(function (artemis) {
    var BitSet = artemis.utils.BitSet;
    var UUID = artemis.utils.UUID;
    /**
    * The entity class. Cannot be instantiated outside the framework, you must
    * create new entities using World.
    *
    * @author Arni Arent
    *
    */
    var Entity = (function () {
        function Entity(world, id) {
            this.world_ = world;
            this.id_ = id;
            this.entityManager_ = world.getEntityManager();
            this.componentManager_ = world.getComponentManager();
            this.systemBits_ = new BitSet();
            this.componentBits_ = new BitSet();
            this.reset();
        }
        /**
        * The internal id for this entity within the framework. No other entity
        * will have the same ID, but ID's are however reused so another entity may
        * acquire this ID if the previous entity was deleted.
        *
        * @return id of the entity.
        */
        Entity.prototype.getId = function () {
            return this.id_;
        };
        /**
        * Returns a BitSet instance containing bits of the components the entity possesses.
        * @return
        */
        Entity.prototype.getComponentBits = function () {
            return this.componentBits_;
        };
        /**
        * Returns a BitSet instance containing bits of the components the entity possesses.
        * @return
        */
        Entity.prototype.getSystemBits = function () {
            return this.systemBits_;
        };
        /**
        * Make entity ready for re-use.
        * Will generate a new uuid for the entity.
        */
        Entity.prototype.reset = function () {
            this.systemBits_.clear();
            this.componentBits_.clear();
            this.uuid = UUID.randomUUID();
        };
        Entity.prototype.toString = function () {
            return "Entity[" + this.id_ + "]";
        };
        Entity.prototype.createComponent = function (componentKlazz) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var componentManager = this.world_.getComponentManager();
            var component = componentManager.create(this, componentKlazz);
            if (args.length) {
                (_a = component).initialize.apply(_a, args);
            }
            var tf = this.world_.getComponentManager().typeFactory;
            var componentType = tf.getTypeFor(componentKlazz);
            this.componentBits_.set(componentType.getIndex());
            return component;
            var _a;
        };
        /**
              * Add a component to this entity.
              *
              * @param component to add to this entity
              *
              * @return this entity for chaining.
              */
        // public addComponent(component: Component):Entity {
        // 	this.addComponent(component, ComponentType.getTypeFor(component.getClass()));
        // 	return this;
        // }
        /**
        * Faster adding of components into the entity. Not neccessery to use this, but
        * in some cases you might need the extra performance.
        *
        * @param component the component to add
        * @param args of the component
        *
        * @return this entity for chaining.
        */
        //public addComponent(component:Component, type?:ComponentType):Entity {
        Entity.prototype.addComponent = function (component) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var type;
            if (component instanceof artemis.Component) {
                type = args[0];
            }
            else {
                component = this.createComponent.apply(this, [component].concat(args));
                type = this.getTypeFor(component.constructor);
            }
            if (type === undefined)
                type = this.getTypeFor(component.constructor);
            //type = ComponentType.getTypeFor(component.constructor);
            this.componentManager_.addComponent(this, type, component);
            return this;
        };
        Entity.prototype.getTypeFor = function (c) {
            return this.world_.getComponentManager().typeFactory.getTypeFor(c);
        };
        /**
        * Removes the component from this entity.
        *
        * @param component to remove from this entity.
        *
        * @return this entity for chaining.
        */
        Entity.prototype.removeComponentInstance = function (component) {
            //this.removeComponent(ComponentType.getTypeFor(component.constructor));
            this.removeComponent(this.getTypeFor(component.constructor));
            return this;
        };
        /**
        * Faster removal of components from a entity.
        *
        * @param component to remove from this entity.
        *
        * @return this entity for chaining.
        */
        Entity.prototype.removeComponent = function (type) {
            this.componentManager_.removeComponent(this, type);
            return this;
        };
        /**
        * Remove component by its type.
        * @param type
        *
        * @return this entity for chaining.
        */
        Entity.prototype.removeComponentByType = function (type) {
            //this.removeComponent(ComponentType.getTypeFor(type));
            this.removeComponent(this.getTypeFor(type));
            return this;
        };
        /**
        * Checks if the entity has been added to the world and has not been deleted from it.
        * If the entity has been disabled this will still return true.
        *
        * @return if it's active.
        */
        Entity.prototype.isActive = function () {
            return this.entityManager_.isActive(this.id_);
        };
        /**
        * Will check if the entity is enabled in the world.
        * By default all entities that are added to world are enabled,
        * this will only return false if an entity has been explicitly disabled.
        *
        * @return if it's enabled
        */
        Entity.prototype.isEnabled = function () {
            return this.entityManager_.isEnabled(this.id_);
        };
        /**
        * This is the preferred method to use when retrieving a component from a
        * entity. It will provide good performance.
        * But the recommended way to retrieve components from an entity is using
        * the ComponentMapper.
        *
        * @param type
        *            in order to retrieve the component fast you must provide a
        *            ComponentType instance for the expected component.
        * @return
        */
        Entity.prototype.getComponent = function (type) {
            return this.componentManager_.getComponent(this, type);
        };
        // public <T extends Component> T getComponent(Class<T> type) {
        // 	return type.cast(getComponent(ComponentType.getTypeFor(type)));
        // }
        /**
        * Slower retrieval of components from this entity. Minimize usage of this,
        * but is fine to use e.g. when creating new entities and setting data in
        * components.
        *
        * @param <T>
        *            the expected return component type.
        * @param type
        *            the expected return component type.
        * @return component that matches, or null if none is found.
        */
        Entity.prototype.getComponentByType = function (type) {
            return this.componentManager_.getComponent(this, this.getTypeFor(type));
            //return this.componentManager_.getComponent(this, ComponentType.getTypeFor(type));
        };
        /**
        * Returns a bag of all components this entity has.
        * You need to reset the bag yourself if you intend to fill it more than once.
        *
        * @param fillBag the bag to put the components into.
        * @return the fillBag with the components in.
        */
        Entity.prototype.getComponents = function (fillBag) {
            return this.componentManager_.getComponentsFor(this, fillBag);
        };
        /**
        * Refresh all changes to components for this entity. After adding or
        * removing components, you must call this method. It will update all
        * relevant systems. It is typical to call this after adding components to a
        * newly created entity.
        */
        Entity.prototype.addToWorld = function () {
            this.world_.addEntity(this);
        };
        /**
        * This entity has changed, a component added or deleted.
        */
        Entity.prototype.changedInWorld = function () {
            this.world_.changedEntity(this);
        };
        /**
        * Delete this entity from the world.
        */
        Entity.prototype.deleteFromWorld = function () {
            this.world_.deleteEntity(this);
        };
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        Entity.prototype.enable = function () {
            this.world_.enable(this);
        };
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        Entity.prototype.disable = function () {
            this.world_.disable(this);
        };
        /**
        * Get the UUID for this entity.
        * This UUID is unique per entity (re-used entities get a new UUID).
        * @return uuid instance for this entity.
        */
        Entity.prototype.getUuid = function () {
            return this.uuid;
        };
        /**
        * Returns the world this entity belongs to.
        * @return world of entity.
        */
        Entity.prototype.getWorld = function () {
            return this.world_;
        };
        return Entity;
    })();
    artemis.Entity = Entity;
})(artemis || (artemis = {}));
//# sourceMappingURL=Entity.js.map
var artemis;
(function (artemis) {
    /**
    * Manager.
    *
    * @author Arni Arent
    *
    */
    var Manager = (function () {
        function Manager() {
        }
        Manager.prototype.initialize = function () {
        };
        Manager.prototype.setWorld = function (world) {
            this.world_ = world;
        };
        Manager.prototype.getWorld = function () {
            return this.world_;
        };
        Manager.prototype.added = function (e) {
        };
        Manager.prototype.changed = function (e) {
        };
        Manager.prototype.deleted = function (e) {
        };
        Manager.prototype.disabled = function (e) {
        };
        Manager.prototype.enabled = function (e) {
        };
        return Manager;
    })();
    artemis.Manager = Manager;
})(artemis || (artemis = {}));
//# sourceMappingURL=Manager.js.map
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var HashMap = artemis.utils.HashMap;
    var EntityTemplate = artemis.annotations.EntityTemplate;
    /**
    * The primary instance for the framework. It contains all the managers.
    *
    * You must use this to create, delete and retrieve entities.
    *
    * It is also important to set the delta each game loop iteration, and initialize before game loop.
    *
    * @author Arni Arent
    *
    */
    var World = (function () {
        function World() {
            this.managers_ = new HashMap();
            this.managersBag_ = new Bag();
            this.systems_ = new HashMap();
            this.systemsBag_ = new Bag();
            this.added_ = new Bag();
            this.changed_ = new Bag();
            this.deleted_ = new Bag();
            this.enable_ = new Bag();
            this.disable_ = new Bag();
            this.cm_ = new artemis.ComponentManager();
            this.setManager(this.cm_);
            this.em_ = new artemis.EntityManager();
            this.setManager(this.em_);
        }
        /**
        * Makes sure all managers systems are initialized in the order they were added.
        */
        World.prototype.initialize = function () {
            for (var i = 0; i < this.managersBag_.size(); i++) {
                this.managersBag_.get(i).initialize();
            }
            for (var i = 0; i < this.systemsBag_.size(); i++) {
                ComponentMapperInitHelper.config(this.systemsBag_.get(i), this);
                this.systemsBag_.get(i).initialize();
            }
            this.entityTemplates = {};
            for (var component in EntityTemplate['entityTemplates']) {
                var Template = EntityTemplate['entityTemplates'][component];
                this.setEntityTemplate(component, new Template);
            }
        };
        /**
        * Returns a manager that takes care of all the entities in the world.
        * entities of this world.
        *
        * @return entity manager.
        */
        World.prototype.getEntityManager = function () {
            return this.em_;
        };
        /**
        * Returns a manager that takes care of all the components in the world.
        *
        * @return component manager.
        */
        World.prototype.getComponentManager = function () {
            return this.cm_;
        };
        /**
        * Add a manager into this world. It can be retrieved later.
        * World will notify this manager of changes to entity.
        *
        * @param manager to be added
        */
        World.prototype.setManager = function (manager) {
            this.managers_.put(manager.constructor, manager);
            this.managersBag_.add(manager);
            manager.setWorld(this);
            return manager;
        };
        /**
        * Returns a manager of the specified type.
        *
        * @param <T>
        * @param managerType
        *            class type of the manager
        * @return the manager
        */
        World.prototype.getManager = function (managerType) {
            return this.managers_.get(managerType);
        };
        /**
        * Deletes the manager from this world.
        * @param manager to delete.
        */
        World.prototype.deleteManager = function (manager) {
            this.managers_.remove(manager);
            this.managersBag_.remove(manager);
        };
        /**
        * Time since last game loop.
        *
        * @return delta time since last game loop.
        */
        World.prototype.getDelta = function () {
            return this.delta;
        };
        /**
        * You must specify the delta for the game here.
        *
        * @param delta time since last game loop.
        */
        World.prototype.setDelta = function (delta) {
            this.delta = delta;
        };
        /**
        * Adds a entity to this world.
        *
        * @param e entity
        */
        World.prototype.addEntity = function (e) {
            this.added_.add(e);
        };
        /**
        * Ensure all systems are notified of changes to this entity.
        * If you're adding a component to an entity after it's been
        * added to the world, then you need to invoke this method.
        *
        * @param e entity
        */
        World.prototype.changedEntity = function (e) {
            this.changed_.add(e);
        };
        /**
        * Delete the entity from the world.
        *
        * @param e entity
        */
        World.prototype.deleteEntity = function (e) {
            if (!this.deleted_.contains(e)) {
                this.deleted_.add(e);
            }
        };
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        World.prototype.enable = function (e) {
            this.enable_.add(e);
        };
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        World.prototype.disable = function (e) {
            this.disable_.add(e);
        };
        /**
        * Create and return a new or reused entity instance.
        * Will NOT add the entity to the world, use World.addEntity(Entity) for that.
        *
        * @return entity
        */
        World.prototype.createEntity = function () {
            return this.em_.createEntityInstance();
        };
        /**
        * Get a entity having the specified id.
        *
        * @param entityId
        * @return entity
        */
        World.prototype.getEntity = function (entityId) {
            return this.em_.getEntity(entityId);
        };
        /**
        * Gives you all the systems in this world for possible iteration.
        *
        * @return all entity systems in world.
        */
        World.prototype.getSystems = function () {
            return this.systemsBag_;
        };
        /**
        * Adds a system to this world that will be processed by World.process()
        *
        * @param system the system to add.
        * @return the added system.
        */
        // public setSystem(system:T):<T extends EntitySystem> T  {
        // 	return this.setSystem(system, false);
        // }
        /**
        * Will add a system to this world.
        *
        * @param system the system to add.
        * @param passive wether or not this system will be processed by World.process()
        * @return the added system.
        */
        //	public <T extends EntitySystem> T setSystem(T system, boolean passive) {
        World.prototype.setSystem = function (system, passive) {
            if (passive === void 0) { passive = false; }
            system.setWorld(this);
            system.setPassive(passive);
            this.systems_.put(system.constructor, system);
            this.systemsBag_.add(system);
            return system;
        };
        /**
        * Removed the specified system from the world.
        * @param system to be deleted from world.
        */
        World.prototype.deleteSystem = function (system) {
            this.systems_.remove(system.constructor);
            this.systemsBag_.remove(system);
        };
        World.prototype.notifySystems = function (performer, e) {
            for (var i = 0, s = this.systemsBag_.size(); s > i; i++) {
                performer.perform(this.systemsBag_.get(i), e);
            }
        };
        World.prototype.notifyManagers = function (performer, e) {
            for (var a = 0; this.managersBag_.size() > a; a++) {
                performer.perform(this.managersBag_.get(a), e);
            }
        };
        /**
        * Retrieve a system for specified system type.
        *
        * @param type type of system.
        * @return instance of the system in this world.
        */
        World.prototype.getSystem = function (type) {
            return this.systems_.get(type);
        };
        /**
        * Performs an action on each entity.
        * @param entities
        * @param performer
        */
        World.prototype.check = function (entities, performer) {
            if (!entities.isEmpty()) {
                for (var i = 0; entities.size() > i; i++) {
                    var e = entities.get(i);
                    this.notifyManagers(performer, e);
                    this.notifySystems(performer, e);
                }
                entities.clear();
            }
        };
        /**
        * Process all non-passive systems.
        */
        World.prototype.process = function () {
            this.check(this.added_, {
                perform: function (observer, e) {
                    observer.added(e);
                }
            });
            this.check(this.changed_, {
                perform: function (observer, e) {
                    observer.changed(e);
                }
            });
            this.check(this.disable_, {
                perform: function (observer, e) {
                    observer.disabled(e);
                }
            });
            this.check(this.enable_, {
                perform: function (observer, e) {
                    observer.enabled(e);
                }
            });
            this.check(this.deleted_, {
                perform: function (observer, e) {
                    observer.deleted(e);
                }
            });
            this.cm_.clean();
            for (var i = 0; this.systemsBag_.size() > i; i++) {
                var system = this.systemsBag_.get(i);
                if (!system.isPassive()) {
                    system.process();
                }
            }
        };
        /**
        * Retrieves a ComponentMapper instance for fast retrieval of components from entities.
        *
        * @param type of component to get mapper for.
        * @return mapper for specified component type.
        */
        World.prototype.getMapper = function (type) {
            return artemis.ComponentMapper.getFor(type, this);
        };
        /**
         * Set an Entity Template
         *
         * @param entityTag
         * @param entityTemplate
         */
        World.prototype.setEntityTemplate = function (entityTag, entityTemplate) {
            this.entityTemplates[entityTag] = entityTemplate;
        };
        /**
         * Creates a entity from template.
         *
         * @param name
         * @param args
         * @returns {Entity}
         * EntityTemplate
         */
        World.prototype.createEntityFromTemplate = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.entityTemplates[name]).buildEntity.apply(_a, [this.createEntity(), this].concat(args));
            var _a;
        };
        return World;
    })();
    artemis.World = World;
    var ComponentMapperInitHelper = (function () {
        function ComponentMapperInitHelper() {
        }
        ComponentMapperInitHelper.config = function (target, world) {
            try {
                var clazz = target.constructor;
                for (var fieldIndex in clazz.declaredFields) {
                    var field = clazz.declaredFields[fieldIndex];
                    if (!target.hasOwnProperty(field)) {
                        var componentType = clazz.prototype[field];
                        target[field] = world.getMapper(componentType);
                    }
                }
            }
            catch (e) {
                throw new Error("Error while setting component mappers");
            }
        };
        return ComponentMapperInitHelper;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=World.js.map
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var ComponentPool = (function () {
        function ComponentPool() {
            this.pools = new Bag();
        }
        ComponentPool.prototype.obtain = function (componentClass, type) {
            var pool = this.getPool(type.getIndex());
            return ((pool.size() > 0) ? pool.obtain() : new componentClass());
        };
        ComponentPool.prototype.free = function (c, type) {
            this.freeByIndex(c, type.getIndex());
        };
        ComponentPool.prototype.freeByIndex = function (c, typeIndex) {
            c.reset();
            this.getPool(typeIndex).free(c);
        };
        ComponentPool.prototype.getPool = function (typeIndex) {
            var pool = this.pools.safeGet(typeIndex);
            if (pool == null) {
                pool = new Pool();
                this.pools.set(typeIndex, pool);
            }
            return pool;
        };
        return ComponentPool;
    })();
    artemis.ComponentPool = ComponentPool;
    var Pool = (function () {
        function Pool() {
            this.cache = new Bag();
        }
        Pool.prototype.obtain = function () {
            return this.cache.removeLast();
        };
        Pool.prototype.size = function () {
            return this.cache.size();
        };
        Pool.prototype.free = function (component) {
            this.cache.add(component);
        };
        return Pool;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentPool.js.map
var artemis;
(function (artemis) {
    var Pooled = artemis.annotations.Pooled;
    (function (Taxonomy) {
        Taxonomy[Taxonomy["BASIC"] = 0] = "BASIC";
        Taxonomy[Taxonomy["POOLED"] = 1] = "POOLED"; //, PACKED
    })(artemis.Taxonomy || (artemis.Taxonomy = {}));
    var Taxonomy = artemis.Taxonomy;
    var ComponentType = (function () {
        function ComponentType(type, index) {
            this.index_ = 0;
            if (index !== undefined) {
                this.index_ = ComponentType.INDEX++;
            }
            else {
                this.index_ = index;
            }
            this.type_ = type;
            if (Pooled['pooledComponents'][artemis.getClassName(type)] === type) {
                this.taxonomy_ = Taxonomy.POOLED;
            }
            else {
                this.taxonomy_ = Taxonomy.BASIC;
            }
        }
        ComponentType.prototype.getName = function () {
            return artemis.getClassName(this.type_);
        };
        ComponentType.prototype.getIndex = function () {
            return this.index_;
        };
        ComponentType.prototype.getTaxonomy = function () {
            return this.taxonomy_;
        };
        ComponentType.prototype.toString = function () {
            return "ComponentType[" + artemis.getClassName(ComponentType) + "] (" + this.index_ + ")";
        };
        ComponentType.INDEX = 0;
        return ComponentType;
    })();
    artemis.ComponentType = ComponentType;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentType.js.map
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var ComponentType = artemis.ComponentType;
    var Aspect = artemis.Aspect;
    var ComponentTypeFactory = (function () {
        function ComponentTypeFactory() {
            /** Amount of generated component types. */
            this.componentTypeCount_ = 0;
            this.componentTypes_ = {};
            this.types = new Bag();
            Aspect.typeFactory = this;
        }
        /**
         * Gets the component type for the given component class.
         * <p>
         * If no component type exists yet, a new one will be created and stored
         * for later retrieval.
         * </p>
         *
         * @param c
         *			the component's class to get the type for
         *
         * @return the component's {@link ComponentType}
         */
        ComponentTypeFactory.prototype.getTypeFor = function (c) {
            if ('number' === typeof c) {
                return this.types.get(parseInt(c));
            }
            var type = this.componentTypes_[artemis.getClassName(c)];
            if (type == null) {
                var index = this.componentTypeCount_++;
                type = new ComponentType(c, index);
                this.componentTypes_[artemis.getClassName(c)] = type;
                this.types.set(index, type);
            }
            return type;
        };
        /**
         * Get the index of the component type of given component class.
         *
         * @param c
         *			the component class to get the type index for
         *
         * @return the component type's index
         */
        ComponentTypeFactory.prototype.getIndexFor = function (c) {
            return this.getTypeFor(c).getIndex();
        };
        ComponentTypeFactory.prototype.getTaxonomy = function (index) {
            return this.types.get(index).getTaxonomy();
        };
        return ComponentTypeFactory;
    })();
    artemis.ComponentTypeFactory = ComponentTypeFactory;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentTypeFactory.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var Manager = artemis.Manager;
    var ComponentTypeFactory = artemis.ComponentTypeFactory;
    var ComponentPool = artemis.ComponentPool;
    var Taxonomy = artemis.Taxonomy;
    var ComponentManager = (function (_super) {
        __extends(ComponentManager, _super);
        function ComponentManager() {
            _super.call(this);
            this.componentsByType_ = new Bag();
            this.pooledComponents_ = new ComponentPool();
            this.deleted_ = new Bag();
            this.typeFactory = new ComponentTypeFactory();
        }
        ComponentManager.prototype.initialize = function () {
        };
        ComponentManager.prototype.create = function (owner, componentClass) {
            var type = this.typeFactory.getTypeFor(componentClass);
            var component = null;
            switch (type.getTaxonomy()) {
                case Taxonomy.BASIC:
                    //console.log('create BASIC');
                    component = this.newInstance(componentClass, false);
                    break;
                case Taxonomy.POOLED:
                    //console.log('create POOLED');
                    this.reclaimPooled(owner, type);
                    /**
                     * YUK! <T> is not working here.
                     * It should be ok, since it will be the same as 'type'
                     */
                    component = this.pooledComponents_.obtain(componentClass, type);
                    break;
                default:
                    throw new Error('InvalidComponentException unknown component type:' + type.getTaxonomy());
            }
            this.addComponent(owner, type, component);
            return component;
        };
        ComponentManager.prototype.reclaimPooled = function (owner, type) {
            var components = this.componentsByType_.safeGet(type.getIndex());
            if (components == null)
                return;
            var old = components.safeGet(owner.getId());
            if (old !== undefined && old !== null) {
                this.pooledComponents_.free(old, type);
            }
        };
        ComponentManager.prototype.newInstance = function (constructor, constructorHasWorldParameter) {
            if (constructorHasWorldParameter) {
                return new constructor(this.world_);
            }
            else {
                return new constructor();
            }
        };
        /**
         * Removes all components from the entity associated in this manager.
         *
         * @param e
         *			the entity to remove components from
         */
        ComponentManager.prototype.removeComponentsOfEntity = function (e) {
            var componentBits = e.getComponentBits();
            for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                switch (this.typeFactory.getTaxonomy(i)) {
                    case Taxonomy.BASIC:
                        //console.log('remove BASIC');
                        this.componentsByType_.get(i).set(e.getId(), null);
                        break;
                    case Taxonomy.POOLED:
                        //console.log('remove POOLED');
                        var pooled = this.componentsByType_.get(i).get(e.getId());
                        this.pooledComponents_.freeByIndex(pooled, i);
                        this.componentsByType_.get(i).set(e.getId(), null);
                        break;
                    default:
                        throw new Error('InvalidComponentException' + " unknown component type: " + this.typeFactory.getTaxonomy(i));
                }
            }
            componentBits.clear();
        };
        /**
         * Adds the component of the given type to the entity.
         * <p>
         * Only one component of given type can be associated with a entity at the
         * same time.
         * </p>
         *
         * @param e
         *			the entity to add to
         * @param type
         *			the type of component being added
         * @param component
         *			the component to add
         */
        ComponentManager.prototype.addComponent = function (e, type, component) {
            this.componentsByType_.ensureCapacity(type.getIndex());
            var components = this.componentsByType_.get(type.getIndex());
            if (components == null) {
                components = new Bag();
                this.componentsByType_.set(type.getIndex(), components);
            }
            components.set(e.getId(), component);
            e.getComponentBits().set(type.getIndex());
        };
        /**
         * Removes the component of given type from the entity.
         *
         * @param e
         *			the entity to remove from
         * @param type
         *			the type of component being removed
         */
        ComponentManager.prototype.removeComponent = function (e, type) {
            var index = type.getIndex();
            switch (type.getTaxonomy()) {
                case Taxonomy.BASIC:
                    this.componentsByType_.get(index).set(e.getId(), null);
                    e.getComponentBits().clear(type.getIndex());
                    break;
                case Taxonomy.POOLED:
                    var pooled = this.componentsByType_.get(index).get(e.getId());
                    e.getComponentBits().clear(type.getIndex());
                    this.pooledComponents_.free(pooled, type);
                    this.componentsByType_.get(index).set(e.getId(), null);
                    break;
                default:
                    throw new Error('InvalidComponentException' + type + " unknown component type: " + type.getTaxonomy());
            }
        };
        /**
         * Get all components from all entities for a given type.
         *
         * @param type
         *			the type of components to get
         * @return a bag containing all components of the given type
         */
        ComponentManager.prototype.getComponentsByType = function (type) {
            var components = this.componentsByType_.get(type.getIndex());
            if (components == null) {
                components = new Bag();
                this.componentsByType_.set(type.getIndex(), components);
            }
            return components;
        };
        /**
         * Get a component of an entity.
         *
         * @param e
         *			the entity associated with the component
         * @param type
         *			the type of component to get
         * @return the component of given type
         */
        ComponentManager.prototype.getComponent = function (e, type) {
            var components = this.componentsByType_.get(type.getIndex());
            if (components != null) {
                return components.get(e.getId());
            }
            return null;
        };
        /**
         * Get all component associated with an entity.
         *
         * @param e
         *			the entity to get components from
         * @param fillBag
         *			a bag to be filled with components
         * @return the {@code fillBag}, filled with the entities components
         */
        ComponentManager.prototype.getComponentsFor = function (e, fillBag) {
            var componentBits = e.getComponentBits();
            for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                fillBag.add(this.componentsByType_.get(i).get(e.getId()));
            }
            return fillBag;
        };
        ComponentManager.prototype.deleted = function (e) {
            this.deleted_.add(e);
        };
        ComponentManager.prototype.clean = function () {
            if (this.deleted_.size() > 0) {
                for (var i = 0; this.deleted_.size() > i; i++) {
                    this.removeComponentsOfEntity(this.deleted_.get(i));
                }
                this.deleted_.clear();
            }
        };
        return ComponentManager;
    })(Manager);
    artemis.ComponentManager = ComponentManager;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentManager.js.map
var artemis;
(function (artemis) {
    /**
    * High performance component retrieval from entities. Use this wherever you
    * need to retrieve components from entities often and fast.
    *
    * @author Arni Arent
    *
    * @param <A> the class type of the component
    */
    var ComponentMapper = (function () {
        function ComponentMapper(type, world) {
            //this.type_ = ComponentType.getTypeFor(type);
            this.type_ = world.getComponentManager().typeFactory.getTypeFor(type);
            this.components_ = world.getComponentManager().getComponentsByType(this.type_);
            this.classType_ = type;
        }
        /**
        * Fast but unsafe retrieval of a component for this entity.
        * No bounding checks, so this could throw an ArrayIndexOutOfBoundsExeption,
        * however in most scenarios you already know the entity possesses this component.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
        ComponentMapper.prototype.get = function (e) {
            return this.components_.get(e.getId());
        };
        /**
        * Fast and safe retrieval of a component for this entity.
        * If the entity does not have this component then null is returned.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
        ComponentMapper.prototype.getSafe = function (e) {
            if (this.components_.isIndexWithinBounds(e.getId())) {
                return this.components_.get(e.getId());
            }
            return null;
        };
        /**
        * Checks if the entity has this type of component.
        * @param e the entity to check
        * @return true if the entity has this component type, false if it doesn't.
        */
        ComponentMapper.prototype.has = function (e) {
            return this.getSafe(e) != null;
        };
        /**
        * Returns a component mapper for this type of components.
        *
        * @param type the type of components this mapper uses.
        * @param world the world that this component mapper should use.
        * @return a new mapper.
        */
        ComponentMapper.getFor = function (type, world) {
            return new ComponentMapper(type, world);
        };
        return ComponentMapper;
    })();
    artemis.ComponentMapper = ComponentMapper;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentMapper.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var BitSet = artemis.utils.BitSet;
    var Manager = artemis.Manager;
    var EntityManager = (function (_super) {
        __extends(EntityManager, _super);
        function EntityManager() {
            _super.call(this);
            this.entities_ = new Bag();
            this.disabled_ = new BitSet();
            this.identifierPool_ = new IdentifierPool();
            this.active_ = 0;
            this.added_ = 0;
            this.created_ = 0;
            this.deleted_ = 0;
        }
        EntityManager.prototype.initialize = function () {
        };
        EntityManager.prototype.createEntityInstance = function () {
            var e = new artemis.Entity(this.world_, this.identifierPool_.checkOut());
            this.created_++;
            return e;
        };
        EntityManager.prototype.added = function (e) {
            this.active_++;
            this.added_++;
            this.entities_.set(e.getId(), e);
        };
        EntityManager.prototype.enabled = function (e) {
            this.disabled_.clear(e.getId());
        };
        EntityManager.prototype.disabled = function (e) {
            this.disabled_.set(e.getId());
        };
        EntityManager.prototype.deleted = function (e) {
            this.entities_.set(e.getId(), null);
            this.disabled_.clear(e.getId());
            this.identifierPool_.checkIn(e.getId());
            this.active_--;
            this.deleted_++;
        };
        /**
        * Check if this entity is active.
        * Active means the entity is being actively processed.
        *
        * @param entityId
        * @return true if active, false if not.
        */
        EntityManager.prototype.isActive = function (entityId) {
            return this.entities_.get(entityId) != null;
        };
        /**
        * Check if the specified entityId is enabled.
        *
        * @param entityId
        * @return true if the entity is enabled, false if it is disabled.
        */
        EntityManager.prototype.isEnabled = function (entityId) {
            return !this.disabled_.get(entityId);
        };
        /**
        * Get a entity with this id.
        *
        * @param entityId
        * @return the entity
        */
        EntityManager.prototype.getEntity = function (entityId) {
            return this.entities_.get(entityId);
        };
        /**
        * Get how many entities are active in this world.
        * @return how many entities are currently active.
        */
        EntityManager.prototype.getActiveEntityCount = function () {
            return this.active_;
        };
        /**
        * Get how many entities have been created in the world since start.
        * Note: A created entity may not have been added to the world, thus
        * created count is always equal or larger than added count.
        * @return how many entities have been created since start.
        */
        EntityManager.prototype.getTotalCreated = function () {
            return this.created_;
        };
        /**
        * Get how many entities have been added to the world since start.
        * @return how many entities have been added.
        */
        EntityManager.prototype.getTotalAdded = function () {
            return this.added_;
        };
        /**
        * Get how many entities have been deleted from the world since start.
        * @return how many entities have been deleted since start.
        */
        EntityManager.prototype.getTotalDeleted = function () {
            return this.deleted_;
        };
        return EntityManager;
    })(Manager);
    artemis.EntityManager = EntityManager;
    /*
* Used only internally to generate distinct ids for entities and reuse them.
*/
    var IdentifierPool = (function () {
        function IdentifierPool() {
            this.nextAvailableId_ = 0;
            this.ids_ = new Bag();
        }
        IdentifierPool.prototype.checkOut = function () {
            if (this.ids_.size() > 0) {
                return this.ids_.removeLast();
            }
            return this.nextAvailableId_++;
        };
        IdentifierPool.prototype.checkIn = function (id) {
            this.ids_.add(id);
        };
        return IdentifierPool;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=EntityManager.js.map
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var HashMap = artemis.utils.HashMap;
    var BlackBoard = artemis.blackboard.BlackBoard;
    /**
    * The most raw entity system. It should not typically be used, but you can create your own
    * entity system handling by extending this. It is recommended that you use the other provided
    * entity system implementations.
    *
    * @author Arni Arent
    *
    */
    var EntitySystem = (function () {
        /**
        * Creates an entity system that uses the specified aspect as a matcher against entities.
        * @param aspect to match against entities
        */
        function EntitySystem(aspect) {
            this.actives_ = new Bag();
            this.aspect_ = aspect;
            this.systemIndex_ = SystemIndexManager.getIndexFor(this.constructor);
            this.allSet_ = aspect.getAllSet();
            this.exclusionSet_ = aspect.getExclusionSet();
            this.oneSet_ = aspect.getOneSet();
            this.dummy_ = this.allSet_.isEmpty() && this.oneSet_.isEmpty(); // This system can't possibly be interested in any entity, so it must be "dummy"
        }
        /**
        * Called before processing of entities begins.
        */
        EntitySystem.prototype.begin = function () { };
        EntitySystem.prototype.process = function () {
            if (this.checkProcessing()) {
                this.begin();
                this.processEntities(this.actives_);
                this.end();
            }
        };
        /**
        * Called after the processing of entities ends.
        */
        EntitySystem.prototype.end = function () { };
        /**
        * Any implementing entity system must implement this method and the logic
        * to process the given entities of the system.
        *
        * @param entities the entities this system contains.
        */
        EntitySystem.prototype.processEntities = function (entities) { };
        /**
        *
        * @return true if the system should be processed, false if not.
        */
        EntitySystem.prototype.checkProcessing = function () {
            return true;
        };
        /**
        * Override to implement code that gets executed when systems are initialized.
        */
        EntitySystem.prototype.initialize = function () { };
        /**
        * Called if the system has received a entity it is interested in, e.g. created or a component was added to it.
        * @param e the entity that was added to this system.
        */
        EntitySystem.prototype.inserted = function (e) { };
        ;
        /**
        * Called if a entity was removed from this system, e.g. deleted or had one of it's components removed.
        * @param e the entity that was removed from this system.
        */
        EntitySystem.prototype.removed = function (e) { };
        ;
        /**
        * Will check if the entity is of interest to this system.
        * @param e entity to check
        */
        EntitySystem.prototype.check = function (e) {
            if (this.dummy_) {
                return;
            }
            var contains = e.getSystemBits().get(this.systemIndex_);
            var interested = true; // possibly interested, let's try to prove it wrong.
            var componentBits = e.getComponentBits();
            // Check if the entity possesses ALL of the components defined in the aspect.
            if (!this.allSet_.isEmpty()) {
                for (var i = this.allSet_.nextSetBit(0); i >= 0; i = this.allSet_.nextSetBit(i + 1)) {
                    if (!componentBits.get(i)) {
                        interested = false;
                        break;
                    }
                }
            }
            // Check if the entity possesses ANY of the exclusion components, if it does then the system is not interested.
            if (!this.exclusionSet_.isEmpty() && interested) {
                interested = !this.exclusionSet_.intersects(componentBits);
            }
            // Check if the entity possesses ANY of the components in the oneSet. If so, the system is interested.
            if (!this.oneSet_.isEmpty()) {
                interested = this.oneSet_.intersects(componentBits);
            }
            if (interested && !contains) {
                this.insertToSystem(e);
            }
            else if (!interested && contains) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.removeFromSystem = function (e) {
            this.actives_.remove(e);
            e.getSystemBits().clear(this.systemIndex_);
            this.removed(e);
        };
        EntitySystem.prototype.insertToSystem = function (e) {
            this.actives_.add(e);
            e.getSystemBits().set(this.systemIndex_);
            this.inserted(e);
        };
        EntitySystem.prototype.added = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.changed = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.deleted = function (e) {
            if (e.getSystemBits().get(this.systemIndex_)) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.disabled = function (e) {
            if (e.getSystemBits().get(this.systemIndex_)) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.enabled = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.setWorld = function (world) {
            this.world = world;
        };
        EntitySystem.prototype.isPassive = function () {
            return this.passive_;
        };
        EntitySystem.prototype.setPassive = function (passive) {
            this.passive_ = passive;
        };
        EntitySystem.prototype.getActive = function () {
            return this.actives_;
        };
        EntitySystem.blackBoard = new BlackBoard();
        return EntitySystem;
    })();
    artemis.EntitySystem = EntitySystem;
    /**
    * Used to generate a unique bit for each system.
    * Only used internally in EntitySystem.
    */
    var SystemIndexManager = (function () {
        function SystemIndexManager() {
        }
        SystemIndexManager.getIndexFor = function (es) {
            var index = SystemIndexManager.indices.get(es);
            if (index === undefined) {
                index = SystemIndexManager.INDEX++;
                SystemIndexManager.indices.put(es, index);
            }
            return index;
        };
        SystemIndexManager.INDEX = 0;
        SystemIndexManager.indices = new HashMap();
        return SystemIndexManager;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=EntitySystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var Bag = artemis.utils.Bag;
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * If you need to group your entities together, e.g. tanks going into "units" group or explosions into "effects",
        * then use this manager. You must retrieve it using world instance.
        *
        * A entity can be assigned to more than one group.
        *
        * @author Arni Arent
        *
        */
        var GroupManager = (function (_super) {
            __extends(GroupManager, _super);
            function GroupManager() {
                _super.call(this);
                this.entitiesByGroup_ = new HashMap();
                this.groupsByEntity_ = new HashMap();
            }
            GroupManager.prototype.initialize = function () {
            };
            /**
            * Set the group of the entity.
            *
            * @param group group to add the entity into.
            * @param e entity to add into the group.
            */
            GroupManager.prototype.add = function (e, group) {
                var entities = this.entitiesByGroup_.get(group);
                if (entities == null) {
                    entities = new Bag();
                    this.entitiesByGroup_.put(group, entities);
                }
                entities.add(e);
                var groups = this.groupsByEntity_.get(e);
                if (groups == null) {
                    groups = new Bag();
                    this.groupsByEntity_.put(e, groups);
                }
                groups.add(group);
            };
            /**
            * Remove the entity from the specified group.
            * @param e
            * @param group
            */
            GroupManager.prototype.remove = function (e, group) {
                var entities = this.entitiesByGroup_.get(group);
                if (entities != null) {
                    entities.remove(e);
                }
                var groups = this.groupsByEntity_.get(e);
                if (groups != null) {
                    groups.remove(group);
                }
            };
            GroupManager.prototype.removeFromAllGroups = function (e) {
                var groups = this.groupsByEntity_.get(e);
                if (groups != null) {
                    for (var i = 0; groups.size() > i; i++) {
                        var entities = this.entitiesByGroup_.get(groups.get(i));
                        if (entities != null) {
                            entities.remove(e);
                        }
                    }
                    groups.clear();
                }
            };
            /**
            * Get all entities that belong to the provided group.
            * @param group name of the group.
            * @return read-only bag of entities belonging to the group.
            */
            GroupManager.prototype.getEntities = function (group) {
                var entities = this.entitiesByGroup_.get(group);
                if (entities == null) {
                    entities = new Bag();
                    this.entitiesByGroup_.put(group, entities);
                }
                return entities;
            };
            /**
            * @param e entity
            * @return the groups the entity belongs to, null if none.
            */
            GroupManager.prototype.getGroups = function (e) {
                return this.groupsByEntity_.get(e);
            };
            /**
            * Checks if the entity belongs to any group.
            * @param e the entity to check.
            * @return true if it is in any group, false if none.
            */
            GroupManager.prototype.isInAnyGroup = function (e) {
                return this.getGroups(e) != null;
            };
            /**
            * Check if the entity is in the supplied group.
            * @param group the group to check in.
            * @param e the entity to check for.
            * @return true if the entity is in the supplied group, false if not.
            */
            GroupManager.prototype.isInGroup = function (e, group) {
                if (group != null) {
                    var groups = this.groupsByEntity_.get(e);
                    for (var i = 0; groups.size() > i; i++) {
                        var g = groups.get(i);
                        if (group === g) {
                            return true;
                        }
                    }
                }
                return false;
            };
            GroupManager.prototype.deleted = function (e) {
                this.removeFromAllGroups(e);
            };
            return GroupManager;
        })(Manager);
        managers.GroupManager = GroupManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=GroupManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var Bag = artemis.utils.Bag;
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * You may sometimes want to specify to which player an entity belongs to.
        *
        * An entity can only belong to a single player at a time.
        *
        * @author Arni Arent
        *
        */
        var PlayerManager = (function (_super) {
            __extends(PlayerManager, _super);
            function PlayerManager() {
                _super.call(this);
                this.playerByEntity_ = new HashMap();
                this.entitiesByPlayer_ = new HashMap();
            }
            PlayerManager.prototype.setPlayer = function (e, player) {
                this.playerByEntity_.put(e, player);
                var entities = this.entitiesByPlayer_.get(player);
                if (entities == null) {
                    entities = new Bag();
                    this.entitiesByPlayer_.put(player, entities);
                }
                entities.add(e);
            };
            PlayerManager.prototype.getEntitiesOfPlayer = function (player) {
                var entities = this.entitiesByPlayer_.get(player);
                if (entities == null) {
                    entities = new Bag();
                }
                return entities;
            };
            PlayerManager.prototype.removeFromPlayer = function (e) {
                var player = this.playerByEntity_.get(e);
                if (player !== null) {
                    var entities = this.entitiesByPlayer_.get(player);
                    if (entities !== null) {
                        entities.remove(e);
                    }
                }
            };
            PlayerManager.prototype.getPlayer = function (e) {
                return this.playerByEntity_.get(e);
            };
            PlayerManager.prototype.initialize = function () {
            };
            PlayerManager.prototype.deleted = function (e) {
                this.removeFromPlayer(e);
            };
            return PlayerManager;
        })(Manager);
        managers.PlayerManager = PlayerManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=PlayerManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * If you need to tag any entity, use this. A typical usage would be to tag
        * entities such as "PLAYER", "BOSS" or something that is very unique.
        *
        * @author Arni Arent
        *
        */
        var TagManager = (function (_super) {
            __extends(TagManager, _super);
            function TagManager() {
                _super.call(this);
                this.entitiesByTag_ = new HashMap();
                this.tagsByEntity_ = new HashMap();
            }
            TagManager.prototype.register = function (tag, e) {
                this.entitiesByTag_.put(tag, e);
                this.tagsByEntity_.put(e, tag);
            };
            TagManager.prototype.unregister = function (tag) {
                this.tagsByEntity_.remove(this.entitiesByTag_.remove(tag));
            };
            TagManager.prototype.isRegistered = function (tag) {
                return this.entitiesByTag_.containsKey(tag);
            };
            TagManager.prototype.getEntity = function (tag) {
                return this.entitiesByTag_.get(tag);
            };
            TagManager.prototype.getRegisteredTags = function () {
                return this.tagsByEntity_.values();
            };
            TagManager.prototype.deleted = function (e) {
                var removedTag = this.tagsByEntity_.remove(e);
                if (removedTag != null) {
                    this.entitiesByTag_.remove(removedTag);
                }
            };
            TagManager.prototype.initialize = function () {
            };
            return TagManager;
        })(Manager);
        managers.TagManager = TagManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TagManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var Bag = artemis.utils.Bag;
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * Use this class together with PlayerManager.
        *
        * You may sometimes want to create teams in your game, so that
        * some players are team mates.
        *
        * A player can only belong to a single team.
        *
        * @author Arni Arent
        *
        */
        var TeamManager = (function (_super) {
            __extends(TeamManager, _super);
            function TeamManager() {
                _super.call(this);
                this.playersByTeam_ = new HashMap();
                this.teamByPlayer_ = new HashMap();
            }
            TeamManager.prototype.initialize = function () {
            };
            TeamManager.prototype.getTeam = function (player) {
                return this.teamByPlayer_.get(player);
            };
            TeamManager.prototype.setTeam = function (player, team) {
                this.removeFromTeam(player);
                this.teamByPlayer_.put(player, team);
                var players = this.playersByTeam_.get(team);
                if (players == null) {
                    players = new Bag();
                    this.playersByTeam_.put(team, players);
                }
                players.add(player);
            };
            TeamManager.prototype.getPlayers = function (team) {
                return this.playersByTeam_.get(team);
            };
            TeamManager.prototype.removeFromTeam = function (player) {
                var team = this.teamByPlayer_.remove(player);
                if (team != null) {
                    var players = this.playersByTeam_.get(team);
                    if (players != null) {
                        players.remove(player);
                    }
                }
            };
            return TeamManager;
        })(Manager);
        managers.TeamManager = TeamManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TeamManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        /**
        * The purpose of this class is to allow systems to execute at varying intervals.
        *
        * An example system would be an ExpirationSystem, that deletes entities after a certain
        * lifetime. Instead of running a system that decrements a timeLeft value for each
        * entity, you can simply use this system to execute in a future at a time of the shortest
        * lived entity, and then reset the system to run at a time in a future at a time of the
        * shortest lived entity, etc.
        *
        * Another example system would be an AnimationSystem. You know when you have to animate
        * a certain entity, e.g. in 300 milliseconds. So you can set the system to run in 300 ms.
        * to perform the animation.
        *
        * This will save CPU cycles in some scenarios.
        *
        * Implementation notes:
        * In order to start the system you need to override the inserted(Entity e) method,
        * look up the delay time from that entity and offer it to the system by using the
        * offerDelay(float delay) method.
        * Also, when processing the entities you must also call offerDelay(float delay)
        * for all valid entities.
        *
        * @author Arni Arent
        *
        */
        var DelayedEntityProcessingSystem = (function (_super) {
            __extends(DelayedEntityProcessingSystem, _super);
            function DelayedEntityProcessingSystem(aspect) {
                _super.call(this, aspect);
            }
            DelayedEntityProcessingSystem.prototype.processEntities = function (entities) {
                for (var i = 0, s = entities.size(); s > i; i++) {
                    var entity = entities.get(i);
                    this.processDelta(entity, this.acc_);
                    var remaining = this.getRemainingDelay(entity);
                    if (remaining <= 0) {
                        this.processExpired(entity);
                    }
                    else {
                        this.offerDelay(remaining);
                    }
                }
                this.stop();
            };
            DelayedEntityProcessingSystem.prototype.inserted = function (e) {
                var delay = this.getRemainingDelay(e);
                if (delay > 0) {
                    this.offerDelay(delay);
                }
            };
            /**
            * Return the delay until this entity should be processed.
            *
            * @param e entity
            * @return delay
            */
            DelayedEntityProcessingSystem.prototype.getRemainingDelay = function (e) {
                throw Error('Abstract Method');
            };
            DelayedEntityProcessingSystem.prototype.checkProcessing = function () {
                if (this.running_) {
                    this.acc_ += this.world.getDelta();
                    if (this.acc_ >= this.delay_) {
                        return true;
                    }
                }
                return false;
            };
            /**
            * Process a entity this system is interested in. Substract the accumulatedDelta
            * from the entities defined delay.
            *
            * @param e the entity to process.
            * @param accumulatedDelta the delta time since this system was last executed.
            */
            DelayedEntityProcessingSystem.prototype.processDelta = function (e, accumulatedDelta) { };
            DelayedEntityProcessingSystem.prototype.processExpired = function (e) { };
            /**
            * Start processing of entities after a certain amount of delta time.
            *
            * Cancels current delayed run and starts a new one.
            *
            * @param delta time delay until processing starts.
            */
            DelayedEntityProcessingSystem.prototype.restart = function (delay) {
                this.delay_ = delay;
                this.acc_ = 0;
                this.running_ = true;
            };
            /**
            * Restarts the system only if the delay offered is shorter than the
            * time that the system is currently scheduled to execute at.
            *
            * If the system is already stopped (not running) then the offered
            * delay will be used to restart the system with no matter its value.
            *
            * If the system is already counting down, and the offered delay is
            * larger than the time remaining, the system will ignore it. If the
            * offered delay is shorter than the time remaining, the system will
            * restart itself to run at the offered delay.
            *
            * @param delay
            */
            DelayedEntityProcessingSystem.prototype.offerDelay = function (delay) {
                if (!this.running_ || delay < this.getRemainingTimeUntilProcessing()) {
                    this.restart(delay);
                }
            };
            /**
            * Get the initial delay that the system was ordered to process entities after.
            *
            * @return the originally set delay.
            */
            DelayedEntityProcessingSystem.prototype.getInitialTimeDelay = function () {
                return this.delay_;
            };
            /**
            * Get the time until the system is scheduled to run at.
            * Returns zero (0) if the system is not running.
            * Use isRunning() before checking this value.
            *
            * @return time when system will run at.
            */
            DelayedEntityProcessingSystem.prototype.getRemainingTimeUntilProcessing = function () {
                if (this.running_) {
                    return this.delay_ - this.acc_;
                }
                return 0;
            };
            /**
            * Check if the system is counting down towards processing.
            *
            * @return true if it's counting down, false if it's not running.
            */
            DelayedEntityProcessingSystem.prototype.isRunning = function () {
                return this.running_;
            };
            /**
            * Stops the system from running, aborts current countdown.
            * Call offerDelay or restart to run it again.
            */
            DelayedEntityProcessingSystem.prototype.stop = function () {
                this.running_ = false;
                this.acc_ = 0;
            };
            return DelayedEntityProcessingSystem;
        })(EntitySystem);
        systems.DelayedEntityProcessingSystem = DelayedEntityProcessingSystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=DelayedEntityProcessingSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        /**
        * A typical entity system. Use this when you need to process entities possessing the
        * provided component types.
        *
        * @author Arni Arent
        *
        */
        var EntityProcessingSystem = (function (_super) {
            __extends(EntityProcessingSystem, _super);
            function EntityProcessingSystem(aspect) {
                _super.call(this, aspect);
            }
            /**
            * Process a entity this system is interested in.
            * @param e the entity to process.
            */
            EntityProcessingSystem.prototype.processEach = function (e) { };
            EntityProcessingSystem.prototype.processEntities = function (entities) {
                for (var i = 0, s = entities.size(); s > i; i++) {
                    this.processEach(entities.get(i));
                }
            };
            EntityProcessingSystem.prototype.checkProcessing = function () {
                return true;
            };
            return EntityProcessingSystem;
        })(EntitySystem);
        systems.EntityProcessingSystem = EntityProcessingSystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=EntityProcessingSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        /**
        * A system that processes entities at a interval in milliseconds.
        * A typical usage would be a collision system or physics system.
        *
        * @author Arni Arent
        *
        */
        var IntervalEntitySystem = (function (_super) {
            __extends(IntervalEntitySystem, _super);
            function IntervalEntitySystem(aspect, interval) {
                _super.call(this, aspect);
                this.acc_ = 0;
                this.interval_ = 0;
                this.interval_ = interval;
            }
            IntervalEntitySystem.prototype.checkProcessing = function () {
                this.acc_ += this.world.getDelta();
                if (this.acc_ >= this.interval_) {
                    this.acc_ -= this.interval_;
                    return true;
                }
                return false;
            };
            return IntervalEntitySystem;
        })(EntitySystem);
        systems.IntervalEntitySystem = IntervalEntitySystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=IntervalEntitySystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        var Aspect = artemis.Aspect;
        /**
        * This system has an empty aspect so it processes no entities, but it still gets invoked.
        * You can use this system if you need to execute some game logic and not have to concern
        * yourself about aspects or entities.
        *
        * @author Arni Arent
        *
        */
        var VoidEntitySystem = (function (_super) {
            __extends(VoidEntitySystem, _super);
            function VoidEntitySystem() {
                _super.call(this, Aspect.getEmpty());
            }
            VoidEntitySystem.prototype.processEntities = function (entities) {
                this.processSystem();
            };
            VoidEntitySystem.prototype.processSystem = function () { };
            VoidEntitySystem.prototype.checkProcessing = function () {
                return true;
            };
            return VoidEntitySystem;
        })(EntitySystem);
        systems.VoidEntitySystem = VoidEntitySystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=VoidEntitySystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var IntervalEntitySystem = artemis.systems.IntervalEntitySystem;
        /**
        * If you need to process entities at a certain interval then use this.
        * A typical usage would be to regenerate ammo or health at certain intervals, no need
        * to do that every game loop, but perhaps every 100 ms. or every second.
        *
        * @author Arni Arent
        *
        */
        var IntervalEntityProcessingSystem = (function (_super) {
            __extends(IntervalEntityProcessingSystem, _super);
            function IntervalEntityProcessingSystem(aspect, interval) {
                _super.call(this, aspect, interval);
            }
            /**
            * Process a entity this system is interested in.
            * @param e the entity to process.
            */
            IntervalEntityProcessingSystem.prototype.processEach = function (e) { };
            IntervalEntityProcessingSystem.prototype.processEntities = function (entities) {
                for (var i = 0, s = entities.size(); s > i; i++) {
                    this.processEach(entities.get(i));
                }
            };
            return IntervalEntityProcessingSystem;
        })(IntervalEntitySystem);
        systems.IntervalEntityProcessingSystem = IntervalEntityProcessingSystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=IntervalEntityProcessingSystem.js.map
var asteroids;
(function (asteroids) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.FRAME_WIDTH = 800;
        Constants.FRAME_HEIGHT = 450;
        Constants.Tags = {
            START: 'start',
            GAME: 'game',
            SPACESHIP: 'spaceship'
        };
        Constants.Groups = {
            BULLETS: 'bullets',
            ASTEROIDS: 'asteroids',
            SPACESHIP: 'spaceship'
        };
        return Constants;
    })();
    asteroids.Constants = Constants;
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Constants.js.map
var asteroids;
(function (asteroids) {
    var ui;
    (function (ui) {
        var KeyPoll = (function () {
            /**
             * @constructor
             * @param {Window} displayObj
             */
            function KeyPoll(displayObj) {
                var _this = this;
                /** @type {Object.<string, boolean>}*/
                this.states = null;
                /**
                 * @private
                 * @param {KeyboardEvent} event
                 */
                this.keyDownListener = function (event) {
                    _this.states[event.keyCode] = true;
                };
                /**
                 * @private
                 * @param {KeyboardEvent} event
                 */
                this.keyUpListener = function (event) {
                    if (_this.states[event.keyCode]) {
                        _this.states[event.keyCode] = false;
                    }
                };
                /**
                 * @param {string} keyCode
                 * @return {boolean}
                 */
                this.isDown = function (keyCode) {
                    return _this.states[keyCode];
                };
                /**
                 * @param {string} keyCode
                 * @return {boolean}
                 */
                this.isUp = function (keyCode) {
                    return !_this.states[keyCode];
                };
                this.states = {};
                displayObj.addEventListener('keydown', this.keyDownListener);
                displayObj.addEventListener('keyup', this.keyUpListener);
            }
            return KeyPoll;
        })();
        ui.KeyPoll = KeyPoll;
    })(ui = asteroids.ui || (asteroids.ui = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=KeyPoll.js.map
var asteroids;
(function (asteroids) {
    var ui;
    (function (ui) {
        var Point = (function () {
            /**
             * @constructor
             * @param x {number}
             * @param y {number}
            */
            function Point(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                this.x = x;
                this.y = y;
            }
            /**
             * @param {Point} point1
             * @param {Point} point2
            */
            Point.distance = function (point1, point2) {
                var dx, dy;
                dx = point1.x - point2.x;
                dy = point1.y - point2.y;
                return Math.sqrt(dx * dx + dy * dy);
            };
            /**
             * @param {Point} targetPoint
             * @return {number}
            */
            Point.prototype.distanceSquaredTo = function (targetPoint) {
                var dx, dy;
                dx = this.x - targetPoint.x;
                dy = this.y - targetPoint.y;
                return dx * dx + dy * dy;
            };
            /**
             * @param {Point} targetPoint
             * @return {number}
            */
            Point.prototype.distanceTo = function (targetPoint) {
                var dx, dy;
                dx = this.x - targetPoint.x;
                dy = this.y - targetPoint.y;
                return Math.sqrt(dx * dx + dy * dy);
            };
            return Point;
        })();
        ui.Point = Point;
    })(ui = asteroids.ui || (asteroids.ui = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Point.js.map
var asteroids;
(function (asteroids) {
    var graphics;
    (function (graphics) {
        var Tau = Math.PI * 2;
        var Point = asteroids.ui.Point;
        var AsteroidDeathView = (function () {
            /**
             * @constructor
             * @param {CanvasRenderingContext2D} graphic
             * @param {number} radius
             */
            function AsteroidDeathView(graphic, radius) {
                /** @type {Array<Dot>}*/
                this.dots = null;
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                /** @type {number}*/
                this.width = 0;
                /** @type {number}*/
                this.height = 0;
                /** @type {number}*/
                this.rotation = 0;
                /** @type {CanvasRenderingContext2D}*/
                this.graphic = null;
                /** @type {number}*/
                this.radius = 0;
                /** @type {asteroids.ui.Point}*/
                this.points = null;
                /** @type {number}*/
                this.count = 0;
                /** @type {boolean}*/
                this.first = true;
                this.graphic = graphic;
                this.radius = radius;
                this.dots = [];
            }
            /**
             * @param {number} time
             */
            AsteroidDeathView.prototype.animate = function (time) {
                var dot;
                if (this.first) {
                    this.first = false;
                    for (var i = 0; i < AsteroidDeathView.numDots; i++) {
                        dot = new Dot(this.graphic, this.radius, this.rotation);
                        this.dots.push(dot);
                    }
                }
                this.dots.forEach(function (dot) {
                    dot.x += dot.velocity.x * time;
                    return dot.y += dot.velocity.y * time;
                });
                return this.draw(this.graphic);
            };
            /**
             * draw the view
             * @param {CanvasRenderingContext2D} graphic
             */
            AsteroidDeathView.prototype.draw = function (graphic) {
                var _this = this;
                this.dots.map(function (dot) {
                    dot.draw(graphic, _this.x, _this.y);
                });
            };
            /** @const*/
            AsteroidDeathView.numDots = 8;
            return AsteroidDeathView;
        })();
        graphics.AsteroidDeathView = AsteroidDeathView;
        var Dot = (function () {
            /**
             * @constructor
             * @param {CanvasRenderingContext2D} graphic
             * @param {number} maxDistance
             * @param {number} rotation
             */
            function Dot(graphic, maxDistance, rotation) {
                /** @type {asteroids.ui.Point}*/
                this.velocity = null;
                /** @type {CanvasRenderingContext2D}*/
                this.graphic = null;
                /** @type {number}*/
                this.rotation = 0;
                /** @type {number}*/
                this.x1 = 0;
                /** @type {number}*/
                this.y1 = 0;
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                this.graphic = graphic;
                this.rotation = rotation;
                var angle = Math.random() * Tau;
                var distance = Math.random() * maxDistance;
                this.x = Math.cos(angle) * distance;
                this.y = Math.sin(angle) * distance;
                var speed = Math.random() * 10 + 10;
                this.velocity = new Point(Math.cos(angle) * speed, Math.sin(angle) * speed);
            }
            /**
             * @param {CanvasRenderingContext2D} graphic
             * @param {number} x
             * @param {number} y
             */
            Dot.prototype.draw = function (graphic, x, y) {
                graphic.save();
                graphic.beginPath();
                graphic.translate(~~x, ~~y);
                graphic.rotate(this.rotation);
                graphic.fillStyle = "#FFFFFF";
                graphic.arc(this.x, this.y, 2, 0, Tau, false);
                graphic.fill();
                graphic.restore();
            };
            return Dot;
        })();
    })(graphics = asteroids.graphics || (asteroids.graphics = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=AsteroidDeathView.js.map
var asteroids;
(function (asteroids) {
    var graphics;
    (function (graphics) {
        var Tau = Math.PI * 2;
        var Point = asteroids.ui.Point;
        var AsteroidView = (function () {
            /**
             * @constructor
             * @param {CanvasRenderingContext2D} graphic
             * @param {number} radius
             */
            function AsteroidView(graphic, radius) {
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                /** @type {number}*/
                this.width = 0;
                /** @type {number}*/
                this.height = 0;
                /** @type {number}*/
                this.rotation = 0;
                /** @type {CanvasRenderingContext2D}*/
                this.graphic = null;
                /** @type {number}*/
                this.radius = 0;
                /** @type {Array<asteroids.ui.Point>}*/
                this.points = null;
                /** @type {number}*/
                this.count = 0;
                var angle, length, posX, posY;
                this.graphic = graphic;
                this.radius = radius;
                this.width = this.radius;
                this.height = this.radius;
                this.points = [];
                angle = 0;
                while (angle < Tau) {
                    length = (0.75 + Math.random() * 0.25) * this.radius;
                    posX = ~~((Math.cos(angle) * length) + 0.5);
                    posY = ~~((Math.sin(angle) * length) + 0.5);
                    this.points.push(new Point(posX, posY));
                    angle += Math.random() * 0.5;
                }
                //this.image = document.createElement('canvas');
                //this.image.width = this.width*2;
                //this.image.height = this.height*2;
                //this.draw(this.image.getContext('2d'));
            }
            /**
             * draw the view
             * @param {CanvasRenderingContext2D} graphic
             */
            AsteroidView.prototype.draw = function (graphic) {
                graphic.save();
                graphic.beginPath();
                graphic.translate(this.x, this.y);
                graphic.rotate(this.rotation);
                graphic.fillStyle = "#FFFFFF";
                graphic.moveTo(this.radius, 0);
                var i = 0;
                while (i < this.points.length) {
                    graphic.lineTo(this.points[i].x, this.points[i].y);
                    ++i;
                }
                graphic.lineTo(this.radius, 0);
                graphic.fill();
                graphic.restore();
            };
            return AsteroidView;
        })();
        graphics.AsteroidView = AsteroidView;
    })(graphics = asteroids.graphics || (asteroids.graphics = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=AsteroidView.js.map
var asteroids;
(function (asteroids) {
    var graphics;
    (function (graphics) {
        var Tau = Math.PI * 2;
        var BulletView = (function () {
            /**
             * @constructor
             * @param {CanvasRenderingContext2D} graphic
             */
            function BulletView(graphic) {
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                /** @type {number}*/
                this.width = 4;
                /** @type {number}*/
                this.height = 4;
                /** @type {number}*/
                this.rotation = 0;
                /** @type {CanvasRenderingContext2D}*/
                this.graphic = null;
                this.graphic = graphic;
            }
            /**
             * draw the view
             * @param {CanvasRenderingContext2D} graphic
             */
            BulletView.prototype.draw = function (graphic) {
                graphic.save();
                graphic.beginPath();
                graphic.rotate(this.rotation);
                graphic.fillStyle = '#FFFFFF';
                graphic.arc(~~this.x, ~~this.y, 2, 0, Tau, false);
                graphic.fill();
                graphic.restore();
            };
            return BulletView;
        })();
        graphics.BulletView = BulletView;
    })(graphics = asteroids.graphics || (asteroids.graphics = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=BulletView.js.map
var asteroids;
(function (asteroids) {
    var graphics;
    (function (graphics) {
        var HudView = (function () {
            /**
             * @constructor
             * @param {CanvasRenderingContext2D} graphic
             */
            function HudView(graphic) {
                var _this = this;
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                /** @type {number}*/
                this.width = 4;
                /** @type {number}*/
                this.height = 4;
                /** @type {number}*/
                this.rotation = 0;
                /** @type {CanvasRenderingContext2D}*/
                this.graphic = null;
                /** @type {number}*/
                this.score = 0;
                /** @type {number}*/
                this.lives = 3;
                /** @type {Function}*/
                this.drawScore = null;
                /** @type {Function}*/
                this.drawLives = null;
                /**
                 * draw the view
                 * @param {CanvasRenderingContext2D} graphic
                 */
                this.draw = function (graphic) {
                    _this.drawScore(graphic);
                    _this.drawLives(graphic);
                };
                /**
                 * @param {number} lives
                 */
                this.setLives = function (lives) {
                    return _this.lives = lives;
                };
                /**
                 * @param {number} score
                 */
                this.setScore = function (score) {
                    return _this.score = score;
                };
                this.graphic = graphic;
                this.drawScore = this.createScore;
                this.drawLives = this.createLives;
            }
            /**
             * draw the lives display
             */
            HudView.prototype.createLives = function (graphic) {
                graphic.save();
                graphic.beginPath();
                graphic.font = "bold 18px Helvetica";
                graphic.fillStyle = "#FFFFFF"; //FFFFFF'
                graphic.textAlign = "center";
                var s = "LIVES: " + this.lives;
                var l = graphic.measureText(s);
                var x = l.width;
                var y = 20;
                graphic.fillText(s, ~~x, ~~y);
                graphic.fill();
                graphic.restore();
            };
            /**
             * draw the score display
             */
            HudView.prototype.createScore = function (graphic) {
                graphic.save();
                graphic.beginPath();
                graphic.font = "bold 18px Helvetica";
                graphic.fillStyle = "#FFFFFF"; //FFFFFF'
                graphic.textAlign = "center";
                var s = "SCORE: " + this.score;
                var l = graphic.measureText(s);
                var x = (window.window.innerWidth * window.devicePixelRatio) - l.width;
                var y = 20;
                graphic.fillText(s, ~~x, ~~y);
                graphic.fill();
                graphic.restore();
            };
            return HudView;
        })();
        graphics.HudView = HudView;
    })(graphics = asteroids.graphics || (asteroids.graphics = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=HudView.js.map
var asteroids;
(function (asteroids) {
    var graphics;
    (function (graphics) {
        var Point = asteroids.ui.Point;
        var SpaceshipDeathView = (function () {
            /**
             * @constructor
             * @param {CanvasRenderingContext2D} graphic
             */
            function SpaceshipDeathView(graphic) {
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                /** @type {number}*/
                this.width = 20;
                /** @type {number}*/
                this.height = 20;
                /** @type {number}*/
                this.rotation = 0;
                /** @type {number}*/
                this.r1 = 0;
                /** @type {number}*/
                this.r2 = 0;
                /** @type {CanvasRenderingContext2D}*/
                this.graphic = null;
                /** @type {asteroids.ui.Point}*/
                this.vel1 = null;
                /** @type {asteroids.ui.Point}*/
                this.vel2 = null;
                /** @type {number}*/
                this.rot1 = null;
                /** @type {number}*/
                this.rot2 = null;
                /** @type {number}*/
                this.x1 = 0;
                /** @type {number}*/
                this.x2 = 0;
                /** @type {number}*/
                this.y1 = 0;
                /** @type {number}*/
                this.y2 = 0;
                /** @type {boolean}*/
                this.first = true;
                this.graphic = graphic;
            }
            /**
             * @param {number} time
             */
            SpaceshipDeathView.prototype.animate = function (time) {
                if (this.first) {
                    this.first = false;
                    this.vel1 = new Point(Math.random() * 10 - 5, Math.random() * 10 + 10);
                    this.vel2 = new Point(Math.random() * 10 - 5, -(Math.random() * 10 + 10));
                    this.rot1 = Math.random() * 300 - 150;
                    this.rot2 = Math.random() * 300 - 150;
                    this.x1 = this.x2 = this.x;
                    this.y1 = this.y2 = this.y;
                    this.r1 = this.r2 = this.rotation;
                }
                this.x1 += this.vel1.x * time;
                this.y1 += this.vel1.y * time;
                this.r1 += this.rot1 * time;
                this.x2 += this.vel2.x * time;
                this.y2 += this.vel2.y * time;
                this.r2 += this.rot2 * time;
                return this.draw(this.graphic);
            };
            /**
             * draw the view
             * @param {CanvasRenderingContext2D} graphic
             */
            SpaceshipDeathView.prototype.draw = function (graphic) {
                // shape1
                graphic.save();
                graphic.beginPath();
                graphic.translate(~~(this.x + this.x1), ~~(this.y + this.y1));
                graphic.rotate(this.r1);
                graphic.fillStyle = "#FFFFFF";
                graphic.moveTo(10, 0);
                graphic.lineTo(-7, 7);
                graphic.lineTo(-4, 0);
                graphic.lineTo(10, 0);
                graphic.fill();
                graphic.restore();
                // shape2
                graphic.save();
                graphic.beginPath();
                graphic.translate(~~(this.x + this.x2), ~~(this.y + this.y2));
                graphic.rotate(this.r2);
                graphic.fillStyle = "#FFFFFF";
                graphic.moveTo(10, 0);
                graphic.lineTo(-7, 7);
                graphic.lineTo(-4, 0);
                graphic.lineTo(10, 0);
                graphic.fill();
                graphic.restore();
            };
            return SpaceshipDeathView;
        })();
        graphics.SpaceshipDeathView = SpaceshipDeathView;
    })(graphics = asteroids.graphics || (asteroids.graphics = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=SpaceshipDeathView.js.map
var asteroids;
(function (asteroids) {
    var graphics;
    (function (graphics) {
        var SpaceshipView = (function () {
            /**
             * @constructor
             * @param {CanvasRenderingContext2D} graphic
             */
            function SpaceshipView(graphic) {
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                /** @type {number}*/
                this.width = 20;
                /** @type {number}*/
                this.height = 20;
                /** @type {number}*/
                this.rotation = 0;
                /** @type {CanvasRenderingContext2D}*/
                this.graphic = null;
                this.graphic = graphic;
            }
            /**
             * draw the view
             * @param {CanvasRenderingContext2D} graphic
             */
            SpaceshipView.prototype.draw = function (graphic) {
                graphic.save();
                graphic.beginPath();
                graphic.translate(~~this.x, ~~this.y);
                graphic.rotate(this.rotation);
                graphic.fillStyle = "#FFFFFF";
                graphic.moveTo(10, 0);
                graphic.lineTo(-7, 7);
                graphic.lineTo(-4, 0);
                graphic.lineTo(-7, -7);
                graphic.lineTo(10, 0);
                graphic.fill();
                graphic.restore();
            };
            return SpaceshipView;
        })();
        graphics.SpaceshipView = SpaceshipView;
    })(graphics = asteroids.graphics || (asteroids.graphics = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=SpaceshipView.js.map
var asteroids;
(function (asteroids) {
    var graphics;
    (function (graphics) {
        var Signal0 = artemis.signals.Signal0;
        var WaitForStartView = (function () {
            /**
             * @constructor
             * @param {CanvasRenderingContext2D} graphic
             */
            function WaitForStartView(graphic) {
                var _this = this;
                /** @type {number}*/
                this.x = 0;
                /** @type {number}*/
                this.y = 0;
                /** @type {number}*/
                this.width = 4;
                /** @type {number}*/
                this.height = 4;
                /** @type {number}*/
                this.rotation = 0;
                /** @type {CanvasRenderingContext2D}*/
                this.graphic = null;
                /** @type {Function}*/
                this.gameOver = null;
                /** @type {Function}*/
                this.clickToStart = null;
                /** @type {Function}*/
                this.instructions = null;
                /** @type {artemis.signals.Signal0}*/
                this.click = null;
                this.graphic = graphic;
                this.click = new Signal0();
                this.gameOver = this.createGameOver;
                this.instructions = this.createInstructions;
                this.clickToStart = this.createClickToStart;
                this.graphic.canvas.addEventListener('click', function (event) { return _this.click.dispatch(); });
            }
            /**
             * draw the game over button
             * @param {CanvasRenderingContext2D} graphic
             */
            WaitForStartView.prototype.createGameOver = function (graphic) {
                graphic.save();
                graphic.beginPath();
                graphic.font = 'bold 32px Helvetica';
                graphic.fillStyle = '#FFFFFF';
                var s = 'ASTEROIDS';
                var l = graphic.measureText(s);
                var x = Math.floor(((window.innerWidth * window.devicePixelRatio) - l.width) / 2);
                var y = 175;
                graphic.fillText(s, ~~x, ~~y);
                graphic.fill();
                graphic.restore();
            };
            /**
             * draw the start button
             * @param {CanvasRenderingContext2D} graphic
             */
            WaitForStartView.prototype.createClickToStart = function (graphic) {
                graphic.save();
                graphic.beginPath();
                graphic.font = 'bold 18px Helvetica';
                graphic.fillStyle = '#FFFFFF';
                var s = 'CLICK TO START';
                var l = graphic.measureText(s);
                var x = Math.floor(((window.innerWidth * window.devicePixelRatio) - l.width) / 2);
                var y = 225;
                graphic.fillText(s, ~~x, ~~y);
                graphic.fill();
                graphic.restore();
            };
            /**
             * draw the instructions
             * @param {CanvasRenderingContext2D} graphic
             */
            WaitForStartView.prototype.createInstructions = function (graphic) {
                graphic.save();
                graphic.beginPath();
                graphic.font = 'bold 14px Helvetica';
                graphic.fillStyle = '#FFFFFF';
                var s = 'CTRL-Z to Fire  ~  Arrow Keys to Move';
                var x = 10;
                var y = window.innerHeight * window.devicePixelRatio - 20;
                graphic.fillText(s, ~~x, ~~y);
                graphic.fill();
                graphic.restore();
            };
            /**
             * draw the view
             */
            WaitForStartView.prototype.draw = function (graphic) {
                this.gameOver(graphic);
                this.clickToStart(graphic);
                this.instructions(graphic);
            };
            return WaitForStartView;
        })();
        graphics.WaitForStartView = WaitForStartView;
    })(graphics = asteroids.graphics || (asteroids.graphics = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=WaitForStartView.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Animation = (function (_super) {
            __extends(Animation, _super);
            function Animation() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param animation
             */
            Animation.prototype.initialize = function (animation) {
                this.animation = animation;
            };
            /** @type {string} */
            Animation.className = 'Animation';
            return Animation;
        })(Component);
        components.Animation = Animation;
        Animation.prototype.animation = null;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Animation.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Asteroid = (function (_super) {
            __extends(Asteroid, _super);
            function Asteroid() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param fsm
             */
            Asteroid.prototype.initialize = function (fsm) {
                if (fsm === void 0) { fsm = null; }
                this.fsm = fsm;
            };
            /** @type {string} */
            Asteroid.className = 'Asteroid';
            return Asteroid;
        })(Component);
        components.Asteroid = Asteroid;
        Asteroid.prototype.fsm = null;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Asteroid.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Audio = (function (_super) {
            __extends(Audio, _super);
            function Audio() {
                _super.call(this);
                this.toPlay = [];
            }
            /** @type {string} */
            Audio.className = 'Audio';
            return Audio;
        })(Component);
        components.Audio = Audio;
        Audio.prototype.toPlay = null;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Audio.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var PooledComponent = artemis.PooledComponent;
        var Pooled = artemis.annotations.Pooled;
        var Bullet = (function (_super) {
            __extends(Bullet, _super);
            function Bullet() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param lifeRemaining
             */
            Bullet.prototype.initialize = function (lifeRemaining) {
                if (lifeRemaining === void 0) { lifeRemaining = 0; }
                this.lifeRemaining = lifeRemaining;
            };
            /** @type {string} */
            Bullet.className = 'Bullet';
            Bullet = __decorate([
                Pooled()
            ], Bullet);
            return Bullet;
        })(PooledComponent);
        components.Bullet = Bullet;
        Bullet.prototype.lifeRemaining = 0;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Bullet.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var PooledComponent = artemis.PooledComponent;
        var Pooled = artemis.annotations.Pooled;
        var Collision = (function (_super) {
            __extends(Collision, _super);
            function Collision() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param radius
             */
            Collision.prototype.initialize = function (radius) {
                if (radius === void 0) { radius = 0; }
                this.radius = radius;
            };
            /** @type {string} */
            Collision.className = 'Collision';
            Collision = __decorate([
                Pooled()
            ], Collision);
            return Collision;
        })(PooledComponent);
        components.Collision = Collision;
        Collision.prototype.radius = 0;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Collision.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var DeathThroes = (function (_super) {
            __extends(DeathThroes, _super);
            function DeathThroes() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param duration
             * @param callback
             */
            DeathThroes.prototype.initialize = function (duration, callback) {
                if (duration === void 0) { duration = 0; }
                this.duration = duration;
                if (callback) {
                    this.callback = callback;
                }
            };
            /** @type {string} */
            DeathThroes.className = 'DeathThroes';
            return DeathThroes;
        })(Component);
        components.DeathThroes = DeathThroes;
        DeathThroes.prototype.duration = 0;
        DeathThroes.prototype.callback = null;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=DeathThroes.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var PooledComponent = artemis.PooledComponent;
        var Pooled = artemis.annotations.Pooled;
        var Display = (function (_super) {
            __extends(Display, _super);
            function Display() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param sprite
             */
            Display.prototype.initialize = function (sprite) {
                if (sprite === void 0) { sprite = null; }
                this.sprite = sprite;
            };
            /** @type {string} */
            Display.className = 'Display';
            Display = __decorate([
                Pooled()
            ], Display);
            return Display;
        })(PooledComponent);
        components.Display = Display;
        Display.prototype.sprite = null;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Display.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var GameState = (function (_super) {
            __extends(GameState, _super);
            function GameState() {
                _super.apply(this, arguments);
            }
            /**
             *
             * @param lives
             * @param level
             */
            GameState.prototype.initialize = function (lives, level) {
                if (lives === void 0) { lives = 0; }
                if (level === void 0) { level = 0; }
                this.lives = lives;
                this.level = level;
                this.hits = 0;
                this.playing = false;
            };
            GameState.prototype.setForStart = function () {
                this.lives = 3;
                this.level = 0;
                this.hits = 0;
                this.playing = true;
            };
            /** @type {string} */
            GameState.className = 'GameState';
            return GameState;
        })(Component);
        components.GameState = GameState;
        GameState.prototype.lives = 0;
        GameState.prototype.level = 0;
        GameState.prototype.hits = 0;
        GameState.prototype.playing = false;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=GameState.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Point = asteroids.ui.Point;
        var Gun = (function (_super) {
            __extends(Gun, _super);
            function Gun() {
                _super.apply(this, arguments);
            }
            /**
             *
             * @param offsetX
             * @param offsetY
             * @param minimumShotInterval
             * @param bulletLifetime
             */
            Gun.prototype.initialize = function (offsetX, offsetY, minimumShotInterval, bulletLifetime) {
                this.offsetFromParent = new Point(offsetX, offsetY);
                this.minimumShotInterval = minimumShotInterval;
                this.bulletLifetime = bulletLifetime;
                this.timeSinceLastShot = 0;
                this.shooting = false;
            };
            /** @type {string} */
            Gun.className = 'Gun';
            return Gun;
        })(Component);
        components.Gun = Gun;
        Gun.prototype.offsetFromParent = null;
        Gun.prototype.timeSinceLastShot = 0;
        Gun.prototype.minimumShotInterval = 0;
        Gun.prototype.bulletLifetime = 0;
        Gun.prototype.shooting = false;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Gun.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var GunControls = (function (_super) {
            __extends(GunControls, _super);
            function GunControls() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param trigger
             */
            GunControls.prototype.initialize = function (trigger) {
                if (trigger === void 0) { trigger = 0; }
                this.trigger = trigger;
            };
            /** @type {string} */
            GunControls.className = 'GunControls';
            return GunControls;
        })(Component);
        components.GunControls = GunControls;
        GunControls.prototype.trigger = 0;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=GunControls.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Hud = (function (_super) {
            __extends(Hud, _super);
            function Hud() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param view
             */
            Hud.prototype.initialize = function (view) {
                this.view = view;
            };
            /** @type {string} */
            Hud.className = 'Hud';
            return Hud;
        })(Component);
        components.Hud = Hud;
        Hud.prototype.view = null;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Hud.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Point = asteroids.ui.Point;
        var PooledComponent = artemis.PooledComponent;
        var Pooled = artemis.annotations.Pooled;
        var Motion = (function (_super) {
            __extends(Motion, _super);
            function Motion() {
                _super.apply(this, arguments);
            }
            /**
             *
             * @param velocityX
             * @param velocityY
             * @param angularVelocity
             * @param damping
             */
            Motion.prototype.initialize = function (velocityX, velocityY, angularVelocity, damping) {
                this.velocity = new Point(velocityX, velocityY);
                this.angularVelocity = angularVelocity;
                this.damping = damping;
            };
            /** @type {string} */
            Motion.className = 'Motion';
            Motion = __decorate([
                Pooled()
            ], Motion);
            return Motion;
        })(PooledComponent);
        components.Motion = Motion;
        Motion.prototype.velocity = null;
        Motion.prototype.angularVelocity = 0;
        Motion.prototype.damping = 0;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Motion.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var MotionControls = (function (_super) {
            __extends(MotionControls, _super);
            function MotionControls() {
                _super.apply(this, arguments);
            }
            /**
             *
             * @param left
             * @param right
             * @param accelerate
             * @param accelerationRate
             * @param rotationRate
             */
            MotionControls.prototype.initialize = function (left, right, accelerate, accelerationRate, rotationRate) {
                this.left = left;
                this.right = right;
                this.accelerate = accelerate;
                this.accelerationRate = accelerationRate;
                this.rotationRate = rotationRate;
            };
            /** @type {string} */
            MotionControls.className = 'MotionControls';
            return MotionControls;
        })(Component);
        components.MotionControls = MotionControls;
        MotionControls.prototype.left = 0;
        MotionControls.prototype.right = 0;
        MotionControls.prototype.accelerate = 0;
        MotionControls.prototype.accelerationRate = 0;
        MotionControls.prototype.rotationRate = 0;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=MotionControls.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Point = asteroids.ui.Point;
        var PooledComponent = artemis.PooledComponent;
        var Pooled = artemis.annotations.Pooled;
        var Position = (function (_super) {
            __extends(Position, _super);
            function Position() {
                _super.apply(this, arguments);
            }
            /**
             *
             * @param x
             * @param y
             * @param r
             */
            Position.prototype.initialize = function (x, y, r) {
                if (r === void 0) { r = 0; }
                this.position = new Point(x, y);
                this.rotation = r;
            };
            /** @type {string} */
            Position.className = 'Position';
            Position = __decorate([
                Pooled()
            ], Position);
            return Position;
        })(PooledComponent);
        components.Position = Position;
        Position.prototype.position = null;
        Position.prototype.rotation = 0;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Position.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Spaceship = (function (_super) {
            __extends(Spaceship, _super);
            function Spaceship() {
                _super.apply(this, arguments);
            }
            /**
             * initialize the component
             * @param fsm
             */
            Spaceship.prototype.initialize = function (fsm) {
                if (fsm === void 0) { fsm = null; }
                this.fsm = fsm;
            };
            /** @type {string} */
            Spaceship.className = 'Spaceship';
            return Spaceship;
        })(Component);
        components.Spaceship = Spaceship;
        Spaceship.prototype.fsm = null;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Spaceship.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var asteroids;
(function (asteroids) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var WaitForStart = (function (_super) {
            __extends(WaitForStart, _super);
            function WaitForStart() {
                var _this = this;
                _super.apply(this, arguments);
                this.setStartGame = function () {
                    _this.startGame = true;
                };
            }
            /**
             *
             * @param waitForStart
             */
            WaitForStart.prototype.initialize = function (waitForStart) {
                this.waitForStart = waitForStart;
                this.waitForStart.click.add(this.setStartGame);
            };
            /** @type {string} */
            WaitForStart.className = 'WaitForStart';
            return WaitForStart;
        })(Component);
        components.WaitForStart = WaitForStart;
        WaitForStart.prototype.waitForStart = null;
        WaitForStart.prototype.startGame = false;
    })(components = asteroids.components || (asteroids.components = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=WaitForStart.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var templates;
    (function (templates) {
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var EntitySystem = artemis.EntitySystem;
        var AsteroidDeathView = asteroids.graphics.AsteroidDeathView;
        var Asteroid = asteroids.components.Asteroid;
        var Display = asteroids.components.Display;
        var Animation = asteroids.components.Animation;
        var DeathThroes = asteroids.components.DeathThroes;
        var Position = asteroids.components.Position;
        var Audio = asteroids.components.Audio;
        var AsteroidDeathTemplate = (function () {
            function AsteroidDeathTemplate() {
            }
            AsteroidDeathTemplate.prototype.buildEntity = function (entity, world, radius, x, y) {
                var dying = new AsteroidDeathView(EntitySystem.blackBoard.getEntry('2d'), radius);
                entity.addComponent(Asteroid);
                entity.addComponent(Display, dying);
                entity.addComponent(Animation, dying);
                entity.addComponent(DeathThroes, 3);
                entity.addComponent(Position, x, y);
                entity.addComponent(Audio);
                return entity;
            };
            AsteroidDeathTemplate = __decorate([
                EntityTemplate('asteroid_death')
            ], AsteroidDeathTemplate);
            return AsteroidDeathTemplate;
        })();
        templates.AsteroidDeathTemplate = AsteroidDeathTemplate;
    })(templates = asteroids.templates || (asteroids.templates = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=AsteroidDeathTemplate.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var templates;
    (function (templates) {
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var EntitySystem = artemis.EntitySystem;
        var GroupManager = artemis.managers.GroupManager;
        var AsteroidView = asteroids.graphics.AsteroidView;
        var Constants = asteroids.Constants;
        var Asteroid = asteroids.components.Asteroid;
        var Display = asteroids.components.Display;
        var Position = asteroids.components.Position;
        var Motion = asteroids.components.Motion;
        var Collision = asteroids.components.Collision;
        var Audio = asteroids.components.Audio;
        var AsteroidTemplate = (function () {
            function AsteroidTemplate() {
            }
            AsteroidTemplate.prototype.buildEntity = function (entity, world, radius, x, y) {
                entity.addComponent(Asteroid);
                entity.addComponent(Display, new AsteroidView(EntitySystem.blackBoard.getEntry('2d'), radius));
                entity.addComponent(Position, x, y);
                entity.addComponent(Motion, (Math.random() - 0.5) * 4 * (50 - radius), (Math.random() - 0.5) * 4 * (50 - radius), Math.random() * 2 - 1, 0);
                entity.addComponent(Collision, radius);
                entity.addComponent(Audio);
                world.getManager(GroupManager).add(entity, Constants.Groups.ASTEROIDS);
                return entity;
            };
            AsteroidTemplate = __decorate([
                EntityTemplate('asteroid')
            ], AsteroidTemplate);
            return AsteroidTemplate;
        })();
        templates.AsteroidTemplate = AsteroidTemplate;
    })(templates = asteroids.templates || (asteroids.templates = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=AsteroidTemplate.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var templates;
    (function (templates) {
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var EntitySystem = artemis.EntitySystem;
        var GroupManager = artemis.managers.GroupManager;
        var BulletView = asteroids.graphics.BulletView;
        var Constants = asteroids.Constants;
        var Bullet = asteroids.components.Bullet;
        var Display = asteroids.components.Display;
        var Position = asteroids.components.Position;
        var Motion = asteroids.components.Motion;
        var Collision = asteroids.components.Collision;
        var BulletTemplate = (function () {
            function BulletTemplate() {
            }
            BulletTemplate.prototype.buildEntity = function (entity, world, gun, parentPosition) {
                var cos = Math.cos(parentPosition.rotation);
                var sin = Math.sin(parentPosition.rotation);
                var x = cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x;
                var y = sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y;
                entity.addComponent(Bullet, gun.bulletLifetime);
                entity.addComponent(Display, new BulletView(EntitySystem.blackBoard.getEntry('2d')));
                entity.addComponent(Position, x, y, 0);
                entity.addComponent(Motion, cos * 150, sin * 150, 0, 0);
                entity.addComponent(Collision, 0);
                world.getManager(GroupManager).add(entity, Constants.Groups.BULLETS);
                return entity;
            };
            BulletTemplate = __decorate([
                EntityTemplate('bullet')
            ], BulletTemplate);
            return BulletTemplate;
        })();
        templates.BulletTemplate = BulletTemplate;
    })(templates = asteroids.templates || (asteroids.templates = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=BulletTemplate.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var templates;
    (function (templates) {
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var EntitySystem = artemis.EntitySystem;
        var TagManager = artemis.managers.TagManager;
        var HudView = asteroids.graphics.HudView;
        var Display = asteroids.components.Display;
        var Position = asteroids.components.Position;
        var Hud = asteroids.components.Hud;
        var Constants = asteroids.Constants;
        var GameTemplate = (function () {
            function GameTemplate() {
            }
            GameTemplate.prototype.buildEntity = function (entity, world, state) {
                var hud = new HudView(EntitySystem.blackBoard.getEntry('2d'));
                entity.addComponent(state);
                entity.addComponent(Display, hud);
                entity.addComponent(Position, 0, 0);
                entity.addComponent(Hud, hud);
                world.getManager(TagManager).register(Constants.Tags.GAME, entity);
                return entity;
            };
            GameTemplate = __decorate([
                EntityTemplate('game')
            ], GameTemplate);
            return GameTemplate;
        })();
        templates.GameTemplate = GameTemplate;
    })(templates = asteroids.templates || (asteroids.templates = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=GameTemplate.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var templates;
    (function (templates) {
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var EntitySystem = artemis.EntitySystem;
        var TagManager = artemis.managers.TagManager;
        var SpaceshipDeathView = asteroids.graphics.SpaceshipDeathView;
        var Display = asteroids.components.Display;
        var Animation = asteroids.components.Animation;
        var DeathThroes = asteroids.components.DeathThroes;
        var Position = asteroids.components.Position;
        var Audio = asteroids.components.Audio;
        var Constants = asteroids.Constants;
        var SpaceshipDeathTemplate = (function () {
            function SpaceshipDeathTemplate() {
            }
            SpaceshipDeathTemplate.prototype.buildEntity = function (entity, world, x, y) {
                var dying = new SpaceshipDeathView(EntitySystem.blackBoard.getEntry('2d'));
                var death = new DeathThroes();
                death.initialize(5, function () {
                    world.getManager(TagManager).unregister(Constants.Tags.SPACESHIP);
                });
                //entity.addComponent(Spaceship);
                entity.addComponent(Display, dying);
                entity.addComponent(Animation, dying);
                entity.addComponent(death);
                entity.addComponent(Position, x, y);
                entity.addComponent(Audio);
                world.getManager(TagManager).register(Constants.Tags.SPACESHIP, entity);
                return entity;
            };
            SpaceshipDeathTemplate = __decorate([
                EntityTemplate('spaceship_death')
            ], SpaceshipDeathTemplate);
            return SpaceshipDeathTemplate;
        })();
        templates.SpaceshipDeathTemplate = SpaceshipDeathTemplate;
    })(templates = asteroids.templates || (asteroids.templates = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=SpaceshipDeathTemplate.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var templates;
    (function (templates) {
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var EntitySystem = artemis.EntitySystem;
        var GroupManager = artemis.managers.GroupManager;
        var SpaceshipView = asteroids.graphics.SpaceshipView;
        var Spaceship = asteroids.components.Spaceship;
        var Constants = asteroids.Constants;
        var Display = asteroids.components.Display;
        var Position = asteroids.components.Position;
        var Motion = asteroids.components.Motion;
        var MotionControls = asteroids.components.MotionControls;
        var Collision = asteroids.components.Collision;
        var Gun = asteroids.components.Gun;
        var GunControls = asteroids.components.GunControls;
        var Audio = asteroids.components.Audio;
        var KEY_LEFT = 37;
        var KEY_UP = 38;
        var KEY_RIGHT = 39;
        var KEY_Z = 90;
        var SpaceshipTemplate = (function () {
            function SpaceshipTemplate() {
            }
            SpaceshipTemplate.prototype.buildEntity = function (entity, world) {
                entity.addComponent(Spaceship);
                entity.addComponent(Display, new SpaceshipView(EntitySystem.blackBoard.getEntry('2d')));
                entity.addComponent(Position, 300, 225, 0);
                entity.addComponent(Motion, 0, 0, 0, 15);
                entity.addComponent(MotionControls, KEY_LEFT, KEY_RIGHT, KEY_UP, 100, 3);
                entity.addComponent(Gun, 8, 0, 0.3, 2);
                entity.addComponent(GunControls, KEY_Z);
                entity.addComponent(Collision, 9);
                entity.addComponent(Audio);
                world.getManager(GroupManager).add(entity, Constants.Groups.SPACESHIP);
                return entity;
            };
            SpaceshipTemplate = __decorate([
                EntityTemplate('spaceship')
            ], SpaceshipTemplate);
            return SpaceshipTemplate;
        })();
        templates.SpaceshipTemplate = SpaceshipTemplate;
    })(templates = asteroids.templates || (asteroids.templates = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=SpaceshipTemplate.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var templates;
    (function (templates) {
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var EntitySystem = artemis.EntitySystem;
        var TagManager = artemis.managers.TagManager;
        var WaitForStartView = asteroids.graphics.WaitForStartView;
        var WaitForStart = asteroids.components.WaitForStart;
        var Display = asteroids.components.Display;
        var Position = asteroids.components.Position;
        var WaitTemplate = (function () {
            function WaitTemplate() {
            }
            WaitTemplate.prototype.buildEntity = function (entity, world, state) {
                var waitView = new WaitForStartView(EntitySystem.blackBoard.getEntry('2d'));
                entity.addComponent(state);
                entity.addComponent(WaitForStart, waitView, false);
                entity.addComponent(Display, waitView);
                entity.addComponent(Position, 0, 0);
                world.getManager(TagManager).register(asteroids.Constants.Tags.START, entity);
                return entity;
            };
            WaitTemplate = __decorate([
                EntityTemplate('start_game')
            ], WaitTemplate);
            return WaitTemplate;
        })();
        templates.WaitTemplate = WaitTemplate;
    })(templates = asteroids.templates || (asteroids.templates = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=WaitTemplate.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Animation = asteroids.components.Animation;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var AnimationSystem = (function (_super) {
            __extends(AnimationSystem, _super);
            /**
             * @constructor
             */
            function AnimationSystem() {
                _super.call(this, Aspect.getAspectForAll(Animation));
            }
            AnimationSystem.prototype.processEach = function (e) {
                var animation = this.am.get(e).animation;
                animation.animate(this.world.getDelta());
            };
            __decorate([
                Mapper(Animation)
            ], AnimationSystem.prototype, "am");
            return AnimationSystem;
        })(EntityProcessingSystem);
        systems.AnimationSystem = AnimationSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=AnimationSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Audio = asteroids.components.Audio;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var AudioSystem = (function (_super) {
            __extends(AudioSystem, _super);
            /**
             * @constructor
             */
            function AudioSystem() {
                _super.call(this, Aspect.getAspectForAll(Audio));
            }
            AudioSystem.prototype.processEach = function (e) {
                var audio = this.am.get(e);
                for (var i in audio.toPlay) {
                    var Type = audio.toPlay[i];
                    var sound = new Type();
                    sound.play(0, 1);
                }
                audio.toPlay.length = 0;
            };
            __decorate([
                Mapper(Audio)
            ], AudioSystem.prototype, "am");
            return AudioSystem;
        })(EntityProcessingSystem);
        systems.AudioSystem = AudioSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=AudioSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Bullet = asteroids.components.Bullet;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var BulletAgeSystem = (function (_super) {
            __extends(BulletAgeSystem, _super);
            /**
             * @constructor
             */
            function BulletAgeSystem() {
                _super.call(this, Aspect.getAspectForAll(Bullet));
            }
            BulletAgeSystem.prototype.processEach = function (e) {
                var time = this.world.getDelta();
                var bullet = this.bm.get(e);
                bullet.lifeRemaining -= time;
                if (bullet.lifeRemaining <= 0) {
                    this.world.deleteEntity(e);
                }
            };
            __decorate([
                Mapper(Bullet)
            ], BulletAgeSystem.prototype, "bm");
            return BulletAgeSystem;
        })(EntityProcessingSystem);
        systems.BulletAgeSystem = BulletAgeSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=BulletAgeSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Collision = asteroids.components.Collision;
        var GameState = asteroids.components.GameState;
        var Position = asteroids.components.Position;
        var Aspect = artemis.Aspect;
        var Bag = artemis.utils.Bag;
        var EntitySystem = artemis.EntitySystem;
        var GroupManager = artemis.managers.GroupManager;
        var Mapper = artemis.annotations.Mapper;
        var CollisionSystem = (function (_super) {
            __extends(CollisionSystem, _super);
            function CollisionSystem() {
                _super.call(this, Aspect.getAspectForAll(GameState));
            }
            CollisionSystem.prototype.initialize = function () {
                var _this = this;
                this.collisionPairs = new Bag();
                this.collisionPairs.add(new CollisionPair(this, asteroids.Constants.Groups.BULLETS, asteroids.Constants.Groups.ASTEROIDS, {
                    /**
                     * Bullets collide with Asteroids
                     * @param game
                     * @param bullet
                     * @param asteroid
                     */
                    handleCollision: function (game, bullet, asteroid) {
                        var c1 = _this.cm.get(asteroid);
                        var p1 = _this.pm.get(asteroid).position;
                        if (c1.radius > 10) {
                            var r1 = c1.radius - 10;
                            var x1 = p1.x + Math.random() * 10 - 5;
                            var y1 = p1.y + Math.random() * 10 - 5;
                            _this.world.createEntityFromTemplate('asteroid', r1, x1, y1).addToWorld();
                            x1 = p1.x + Math.random() * 10 - 5;
                            y1 = p1.y + Math.random() * 10 - 5;
                            _this.world.createEntityFromTemplate('asteroid', r1, x1, y1).addToWorld();
                        }
                        bullet.deleteFromWorld();
                        asteroid.deleteFromWorld();
                        _this.gm.get(game).hits++;
                        _this.world.createEntityFromTemplate('asteroid_death', c1.radius, p1.x, p1.y).addToWorld();
                    }
                }));
                this.collisionPairs.add(new CollisionPair(this, asteroids.Constants.Groups.ASTEROIDS, asteroids.Constants.Groups.SPACESHIP, {
                    /**
                     * Asteroids collide with Spaceships
                     * @param game
                     * @param asteroid
                     * @param spaceship
                     */
                    handleCollision: function (game, asteroid, spaceship) {
                        var p = _this.pm.get(spaceship).position;
                        spaceship.deleteFromWorld();
                        var e = _this.world.createEntityFromTemplate('spaceship_death', p.x, p.y);
                        e.addToWorld();
                        _this.gm.get(game).lives--;
                    }
                }));
            };
            CollisionSystem.prototype.processEntities = function (entities) {
                var e = entities.get(0);
                for (var i = 0; this.collisionPairs.size() > i; i++) {
                    this.collisionPairs.get(i).checkForCollisions(e);
                }
            };
            CollisionSystem.prototype.checkProcessing = function () {
                return true;
            };
            __decorate([
                Mapper(GameState)
            ], CollisionSystem.prototype, "gm");
            __decorate([
                Mapper(Position)
            ], CollisionSystem.prototype, "pm");
            __decorate([
                Mapper(Collision)
            ], CollisionSystem.prototype, "cm");
            return CollisionSystem;
        })(EntitySystem);
        systems.CollisionSystem = CollisionSystem;
        /**
         * Collision Pair
         */
        var CollisionPair = (function () {
            /**
             *
             * @param parent
             * @param group1
             * @param group2
             * @param handler
             */
            function CollisionPair(parent, group1, group2, handler) {
                this.parent = parent;
                this.groupEntitiesA = parent.world.getManager(GroupManager).getEntities(group1);
                this.groupEntitiesB = parent.world.getManager(GroupManager).getEntities(group2);
                this.handler = handler;
            }
            /**
             *
             * @param e
             */
            CollisionPair.prototype.checkForCollisions = function (e) {
                for (var a = 0; this.groupEntitiesA.size() > a; a++) {
                    var entityA = this.groupEntitiesA.get(a);
                    for (var b = 0; this.groupEntitiesB.size() > b; b++) {
                        var entityB = this.groupEntitiesB.get(b);
                        if (this.collisionExists(entityA, entityB)) {
                            this.handler.handleCollision(e, entityA, entityB);
                        }
                    }
                }
            };
            /**
             *
             * @param e1
             * @param e2
             * @returns {boolean}
             */
            CollisionPair.prototype.collisionExists = function (e1, e2) {
                if (e1 === null || e2 === null)
                    return false;
                var p1 = this.parent.pm.get(e1).position;
                var p2 = this.parent.pm.get(e2).position;
                var b1 = this.parent.cm.get(e1);
                var b2 = this.parent.cm.get(e2);
                var a = p1.x - p2.x;
                var b = p1.y - p2.y;
                return Math.sqrt(a * a + b * b) - b1.radius < b2.radius;
            };
            return CollisionPair;
        })();
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=CollisionSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var DeathThroes = asteroids.components.DeathThroes;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var DeathThroesSystem = (function (_super) {
            __extends(DeathThroesSystem, _super);
            /**
             * @constructor
             */
            function DeathThroesSystem() {
                _super.call(this, Aspect.getAspectForAll(DeathThroes));
            }
            DeathThroesSystem.prototype.processEach = function (e) {
                var time = this.world.getDelta();
                var death = this.dm.get(e);
                death.duration -= time;
                if (death.duration <= 0) {
                    if (death.callback) {
                        death.callback(e);
                    }
                    this.world.deleteEntity(e);
                }
            };
            __decorate([
                Mapper(DeathThroes)
            ], DeathThroesSystem.prototype, "dm");
            return DeathThroesSystem;
        })(EntityProcessingSystem);
        systems.DeathThroesSystem = DeathThroesSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=DeathThroesSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids_1) {
    var systems;
    (function (systems) {
        var Mapper = artemis.annotations.Mapper;
        var GroupManager = artemis.managers.GroupManager;
        var TagManager = artemis.managers.TagManager;
        var EntitySystem = artemis.EntitySystem;
        var Aspect = artemis.Aspect;
        var Point = asteroids.ui.Point;
        var GameState = asteroids.components.GameState;
        var Position = asteroids.components.Position;
        var Collision = asteroids.components.Collision;
        var Constants = asteroids.Constants;
        var GameManager = (function (_super) {
            __extends(GameManager, _super);
            /**
             * @constructor
             */
            function GameManager(config) {
                //super(Aspect.getAspectForAll(GameState, Position, Spaceship, Asteroid, Bullet));
                _super.call(this, Aspect.getAspectForAll(GameState));
                //@Mapper(Position) pm:ComponentMapper<Position>;
                //@Mapper(Spaceship) sm:ComponentMapper<Spaceship>;
                //@Mapper(Asteroid) am:ComponentMapper<Asteroid>;
                //@Mapper(Bullet) bm:ComponentMapper<Bullet>;
                /** @type {asteroids.GameConfig}*/
                this.config = null;
                this.config = config;
            }
            GameManager.prototype.initialize = function () {
                this.tags = this.world.getManager(TagManager);
                this.groups = this.world.getManager(GroupManager);
            };
            GameManager.prototype.processEntities = function (entities) {
                for (var i = 0, k = entities.size(); i < k; i++) {
                    this.processEach(entities.get(i));
                }
            };
            GameManager.prototype.processEach = function (e) {
                if (this.tags.isRegistered(Constants.Tags.SPACESHIP)) {
                    return;
                }
                var game = this.gm.get(e);
                if (game.playing) {
                    var ships = this.groups.getEntities(Constants.Groups.SPACESHIP);
                    if (ships.isEmpty()) {
                        if (game.lives > 0) {
                            var newSpaceshipPosition = new Point(this.config.width * 0.5, this.config.height * 0.5);
                            var clearToAddSpaceship = true;
                            var asteroids = this.groups.getEntities(Constants.Groups.ASTEROIDS);
                            for (var i = 0, k = asteroids.size(); i < k; i++) {
                                var asteroid = asteroids.get(i);
                                var position = asteroid.getComponentByType(Position);
                                var collision = asteroid.getComponentByType(Collision);
                                if (Point.distance(position.position, newSpaceshipPosition) <= collision.radius + 50) {
                                    clearToAddSpaceship = false;
                                    break;
                                }
                            }
                            if (clearToAddSpaceship) {
                                this.world.createEntityFromTemplate('spaceship').addToWorld();
                            }
                        }
                    }
                    else {
                        var ship = ships.get(0);
                        var shipPos = ship.getComponentByType(Position);
                        var asteroids = this.groups.getEntities(Constants.Groups.ASTEROIDS);
                        var bullets = this.groups.getEntities(Constants.Groups.BULLETS);
                        // Level Over?
                        if (asteroids.isEmpty() && bullets.isEmpty()) {
                            game.level++;
                            var asteroidCount = 2 + game.level;
                            for (i = 0; i < asteroidCount; i++) {
                                while (true) {
                                    var p = new Point(Math.random() * this.config.width, Math.random() * this.config.height);
                                    if (!(Point.distance(p, shipPos.position) <= 80)) {
                                        break;
                                    }
                                }
                                this.world.createEntityFromTemplate('asteroid', 30, p.x, p.y).addToWorld();
                            }
                        }
                    }
                }
            };
            __decorate([
                Mapper(GameState)
            ], GameManager.prototype, "gm");
            return GameManager;
        })(EntitySystem);
        systems.GameManager = GameManager;
    })(systems = asteroids_1.systems || (asteroids_1.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=GameManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var Audio = asteroids.components.Audio;
        var GunControls = asteroids.components.GunControls;
        var Gun = asteroids.components.Gun;
        var Position = asteroids.components.Position;
        var GunControlSystem = (function (_super) {
            __extends(GunControlSystem, _super);
            /**
             * @constructor
             */
            function GunControlSystem(keyPoll) {
                _super.call(this, Aspect.getAspectForAll(GunControls, Gun, Position));
                this.keyPoll = keyPoll;
            }
            GunControlSystem.prototype.processEach = function (e) {
                var time = this.world.getDelta();
                var control = this.cm.get(e);
                var position = this.pm.get(e);
                var gun = this.gm.get(e);
                gun.shooting = this.keyPoll.isDown(control.trigger);
                gun.timeSinceLastShot += time;
                if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
                    this.world.createEntityFromTemplate('bullet', gun, position).addToWorld();
                    gun.timeSinceLastShot = 0;
                }
            };
            __decorate([
                Mapper(Audio)
            ], GunControlSystem.prototype, "am");
            __decorate([
                Mapper(GunControls)
            ], GunControlSystem.prototype, "cm");
            __decorate([
                Mapper(Gun)
            ], GunControlSystem.prototype, "gm");
            __decorate([
                Mapper(Position)
            ], GunControlSystem.prototype, "pm");
            return GunControlSystem;
        })(EntityProcessingSystem);
        systems.GunControlSystem = GunControlSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=GunControlSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var GameState = asteroids.components.GameState;
        var Hud = asteroids.components.Hud;
        var HudSystem = (function (_super) {
            __extends(HudSystem, _super);
            /**
             * @constructor
             */
            function HudSystem() {
                _super.call(this, Aspect.getAspectForAll(GameState, Hud));
            }
            HudSystem.prototype.processEach = function (e) {
                var state = this.gm.get(e);
                var hud = this.hm.get(e);
                hud.view.setLives(state.lives);
                hud.view.setScore(state.hits);
            };
            __decorate([
                Mapper(GameState)
            ], HudSystem.prototype, "gm");
            __decorate([
                Mapper(Hud)
            ], HudSystem.prototype, "hm");
            return HudSystem;
        })(EntityProcessingSystem);
        systems.HudSystem = HudSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=HudSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var MotionControls = asteroids.components.MotionControls;
        var Position = asteroids.components.Position;
        var Motion = asteroids.components.Motion;
        var MotionControlSystem = (function (_super) {
            __extends(MotionControlSystem, _super);
            function MotionControlSystem(keyPoll) {
                _super.call(this, Aspect.getAspectForAll(MotionControls, Position, Motion));
                this.keyPoll = keyPoll;
            }
            MotionControlSystem.prototype.processEach = function (e) {
                var time = this.world.getDelta();
                var control = this.cm.get(e);
                var position = this.pm.get(e);
                var motion = this.mm.get(e);
                var left = this.keyPoll.isDown(control.left);
                var right = this.keyPoll.isDown(control.right);
                if (left) {
                    position.rotation -= control.rotationRate * time;
                }
                if (right) {
                    position.rotation += control.rotationRate * time;
                }
                if (this.keyPoll.isDown(control.accelerate)) {
                    motion.velocity.x += Math.cos(position.rotation) * control.accelerationRate * time;
                    motion.velocity.y += Math.sin(position.rotation) * control.accelerationRate * time; // Void
                }
            };
            __decorate([
                Mapper(MotionControls)
            ], MotionControlSystem.prototype, "cm");
            __decorate([
                Mapper(Position)
            ], MotionControlSystem.prototype, "pm");
            __decorate([
                Mapper(Motion)
            ], MotionControlSystem.prototype, "mm");
            return MotionControlSystem;
        })(EntityProcessingSystem);
        systems.MotionControlSystem = MotionControlSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=MotionControlSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Position = asteroids.components.Position;
        var Motion = asteroids.components.Motion;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var MovementSystem = (function (_super) {
            __extends(MovementSystem, _super);
            /**
             * @constructor
             */
            function MovementSystem(config) {
                _super.call(this, Aspect.getAspectForAll(Position, Motion));
                /** @type {asteroids.GameConfig}*/
                this.config = null;
                this.config = config;
            }
            MovementSystem.prototype.processEach = function (e) {
                var time = this.world.getDelta();
                var position = this.pm.get(e);
                var motion = this.mm.get(e);
                position.position.x += motion.velocity.x * time;
                position.position.y += motion.velocity.y * time;
                // check boundaries
                if (position.position.x < 0) {
                    position.position.x += this.config.width;
                }
                if (position.position.x > this.config.width) {
                    position.position.x -= this.config.width;
                }
                if (position.position.y < 0) {
                    position.position.y += this.config.height;
                }
                if (position.position.y > this.config.height) {
                    position.position.y -= this.config.height;
                }
                position.rotation += motion.angularVelocity * time;
                if (motion.damping > 0) {
                    var xDamp = Math.abs(Math.cos(position.rotation) * motion.damping * time);
                    var yDamp = Math.abs(Math.sin(position.rotation) * motion.damping * time);
                    if (motion.velocity.x > xDamp) {
                        motion.velocity.x -= xDamp;
                    }
                    else if (motion.velocity.x < -xDamp) {
                        motion.velocity.x += xDamp;
                    }
                    else {
                        motion.velocity.x = 0;
                    }
                    if (motion.velocity.y > yDamp) {
                        motion.velocity.y -= yDamp;
                    }
                    else if (motion.velocity.y < -yDamp) {
                        motion.velocity.y += yDamp;
                    }
                    else {
                        motion.velocity.y = 0; // Void
                    }
                }
            };
            __decorate([
                Mapper(Position)
            ], MovementSystem.prototype, "pm");
            __decorate([
                Mapper(Motion)
            ], MovementSystem.prototype, "mm");
            return MovementSystem;
        })(EntityProcessingSystem);
        systems.MovementSystem = MovementSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=MovementSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var Position = asteroids.components.Position;
        var Display = asteroids.components.Display;
        var Mapper = artemis.annotations.Mapper;
        var EntitySystem = artemis.EntitySystem;
        var Aspect = artemis.Aspect;
        var DOUBLE_BUFFERING = (location.search === '?b=2');
        console.log('Using DOUBLE_BUFFERING', DOUBLE_BUFFERING);
        var RenderSystem = (function (_super) {
            __extends(RenderSystem, _super);
            /**
             * @constructor
             */
            function RenderSystem(graphic, config) {
                _super.call(this, Aspect.getAspectForAll(Position, Display));
                this.config = config;
                this.graphic = graphic;
                /**
                 * DOUBLE_BUFFERING?
                 * create an off screen canvas
                 */
                if (DOUBLE_BUFFERING) {
                    this.screen = graphic;
                    this.canvas = document.createElement("canvas");
                    this.graphic = this.canvas.getContext('2d');
                    this.canvas.width = config.width;
                    this.canvas.height = config.height;
                }
            }
            RenderSystem.prototype.processEntities = function (entities) {
                this.graphic.clearRect(0, 0, this.config.width, this.config.height);
                for (var i = 0, k = entities.size(); i < k; i++) {
                    this.processEach(entities.get(i));
                }
                /**
                 * DOUBLE_BUFFERING?
                 * copy to the off screen canvas
                 */
                if (DOUBLE_BUFFERING) {
                    this.screen.clearRect(0, 0, this.config.width, this.config.height);
                    this.screen.drawImage(this.canvas, 0, 0);
                }
            };
            RenderSystem.prototype.processEach = function (e) {
                var position = this.pm.get(e);
                var display = this.dm.get(e);
                var sprite = display.sprite;
                sprite.x = position.position.x;
                sprite.y = position.position.y;
                sprite.rotation = position.rotation;
                sprite.draw(this.graphic);
            };
            __decorate([
                Mapper(Position)
            ], RenderSystem.prototype, "pm");
            __decorate([
                Mapper(Display)
            ], RenderSystem.prototype, "dm");
            return RenderSystem;
        })(EntitySystem);
        systems.RenderSystem = RenderSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=RenderSystem.js.map
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        (function (SystemPriorities) {
            SystemPriorities[SystemPriorities["unknown"] = 0] = "unknown";
            SystemPriorities[SystemPriorities["preUpdate"] = 1] = "preUpdate";
            SystemPriorities[SystemPriorities["update"] = 2] = "update";
            SystemPriorities[SystemPriorities["move"] = 3] = "move";
            SystemPriorities[SystemPriorities["resolveCollisions"] = 4] = "resolveCollisions";
            SystemPriorities[SystemPriorities["stateMachines"] = 5] = "stateMachines";
            SystemPriorities[SystemPriorities["animate"] = 6] = "animate";
            SystemPriorities[SystemPriorities["render"] = 7] = "render";
        })(systems.SystemPriorities || (systems.SystemPriorities = {}));
        var SystemPriorities = systems.SystemPriorities;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=SystemPriorities.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var asteroids;
(function (asteroids) {
    var systems;
    (function (systems) {
        var WaitForStart = asteroids.components.WaitForStart;
        var GameState = asteroids.components.GameState;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var WaitForStartSystem = (function (_super) {
            __extends(WaitForStartSystem, _super);
            /**
             * @constructor
             */
            function WaitForStartSystem() {
                _super.call(this, Aspect.getAspectForAll(WaitForStart, GameState));
            }
            WaitForStartSystem.prototype.processEach = function (e) {
                var wait = this.wm.get(e);
                if (wait.startGame) {
                    var game = this.gm.get(e);
                    game.setForStart();
                    wait.startGame = false;
                    this.world.deleteEntity(e);
                }
                //var asteroid, game, node;
                //node = this.waitNodes.head;
                //game = this.gameNodes.head;
                //
                //if (node && node.wait.startGame && game) {
                //  asteroid = this.asteroids.head;
                //  while (asteroid) {
                //    this.creator.destroyEntity(asteroid.entity);
                //    asteroid = asteroid.next;
                //  }
                //
                //  game.state.setForStart();
                //  node.wait.startGame = false;
                //  this.engine.removeEntity(node.entity);  // Void
                //}
            };
            __decorate([
                Mapper(WaitForStart)
            ], WaitForStartSystem.prototype, "wm");
            __decorate([
                Mapper(GameState)
            ], WaitForStartSystem.prototype, "gm");
            return WaitForStartSystem;
        })(EntityProcessingSystem);
        systems.WaitForStartSystem = WaitForStartSystem;
    })(systems = asteroids.systems || (asteroids.systems = {}));
})(asteroids || (asteroids = {}));
//# sourceMappingURL=WaitForStartSystem.js.map
/*+--------------------------------------------------------------------+
| GameConfig.ts
+--------------------------------------------------------------------+
| Copyright DarkOverlordOfData (c) 2015
+--------------------------------------------------------------------+
|
| This file is a part of asteroids-ts
|
| asteroids-ts is free software; you can copy, modify, and distribute
| it under the terms of the MIT License
|
+--------------------------------------------------------------------+
*
* GameConfig
*/
var asteroids;
(function (asteroids) {
    /**
     * @constructor
     */
    var GameConfig = (function () {
        function GameConfig(width, height) {
            /** @type {number}*/
            this.width = 0;
            /** @type {number}*/
            this.height = 0;
            this.width = width;
            this.height = height;
        }
        return GameConfig;
    })();
    asteroids.GameConfig = GameConfig;
})(asteroids || (asteroids = {}));
//# sourceMappingURL=GameConfig.js.map
/*+--------------------------------------------------------------------+
| Asteroids.ts
+--------------------------------------------------------------------+
| Copyright DarkOverlordOfData (c) 2015
+--------------------------------------------------------------------+
|
| This file is a part of asteroids-ts
|
| asteroids-ts is free software; you can copy, modify, and distribute
| it under the terms of the MIT License
|
+--------------------------------------------------------------------+
*
* Asteroids
*/
var asteroids;
(function (asteroids) {
    var AnimationSystem = asteroids.systems.AnimationSystem;
    var AudioSystem = asteroids.systems.AudioSystem;
    var BulletAgeSystem = asteroids.systems.BulletAgeSystem;
    var CollisionSystem = asteroids.systems.CollisionSystem;
    var DeathThroesSystem = asteroids.systems.DeathThroesSystem;
    var GameManager = asteroids.systems.GameManager;
    var GunControlSystem = asteroids.systems.GunControlSystem;
    var HudSystem = asteroids.systems.HudSystem;
    var MotionControlSystem = asteroids.systems.MotionControlSystem;
    var MovementSystem = asteroids.systems.MovementSystem;
    var RenderSystem = asteroids.systems.RenderSystem;
    var WaitForStartSystem = asteroids.systems.WaitForStartSystem;
    var GameState = asteroids.components.GameState;
    var GameConfig = asteroids.GameConfig;
    var KeyPoll = asteroids.ui.KeyPoll;
    var TrigLUT = artemis.utils.TrigLUT;
    ;
    var World = artemis.World;
    var EntitySystem = artemis.EntitySystem;
    var GroupManager = artemis.managers.GroupManager;
    var TagManager = artemis.managers.TagManager;
    var Asteroids = (function () {
        /**
         * @constructor
         * @param {CanvasRenderingContext2D} graphic
         * @param {number} width
         * @param {number} height
         */
        function Asteroids(graphic, width, height) {
            TrigLUT.init(true);
            EntitySystem.blackBoard.setEntry('2d', graphic);
            this.graphic = graphic;
            this.prepare(width, height);
        }
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        Asteroids.prototype.prepare = function (width, height) {
            var world = this.world = new World();
            var state = this.state = new GameState();
            var keyPoll = this.keyPoll = new KeyPoll(window);
            var config = this.config = new GameConfig(width, height);
            world.setManager(new GroupManager());
            world.setManager(new TagManager());
            world.setSystem(new WaitForStartSystem());
            world.setSystem(new GameManager(config));
            world.setSystem(new MotionControlSystem(keyPoll));
            world.setSystem(new GunControlSystem(keyPoll));
            world.setSystem(new BulletAgeSystem());
            world.setSystem(new DeathThroesSystem());
            world.setSystem(new MovementSystem(config));
            world.setSystem(new CollisionSystem());
            world.setSystem(new AnimationSystem());
            world.setSystem(new HudSystem());
            this.renderSystem = world.setSystem(new RenderSystem(this.graphic, config), true);
            world.setSystem(new AudioSystem());
            world.initialize();
            world.createEntityFromTemplate('start_game', state).addToWorld();
            world.createEntityFromTemplate('game', state).addToWorld();
            state.initialize();
        };
        /**
         * Start animation
         */
        Asteroids.prototype.start = function () {
            var _this = this;
            var x, y;
            if (navigator['isCocoonJS']) {
                this.monitor = null;
            }
            else {
                x = Math.floor(this.config.width / 2) - 40;
                y = 0;
                this.monitor = new window["Stats"]();
                this.monitor["setMode"](0);
                this.monitor["domElement"].style.position = "absolute";
                this.monitor["domElement"].style.left = x + "px";
                this.monitor["domElement"].style.top = y + "px";
                document.body.appendChild(this.monitor["domElement"]);
            }
            var temp = 0;
            var previousTime = 0;
            var update = function (delta) {
                temp = previousTime || delta;
                previousTime = delta;
                _this.monitor.begin();
                _this.world.setDelta((delta - temp) * 0.001);
                _this.world.process();
                _this.renderSystem.process();
                requestAnimationFrame(update);
                _this.monitor.end();
            };
            requestAnimationFrame(update);
        };
        return Asteroids;
    })();
    asteroids.Asteroids = Asteroids;
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Asteroids.js.map
/*+--------------------------------------------------------------------+
| Main.ts
+--------------------------------------------------------------------+
| Copyright DarkOverlordOfData (c) 2015
+--------------------------------------------------------------------+
|
| This file is a part of asteroids-ts
|
| asteroids-ts is free software; you can copy, modify, and distribute
| it under the terms of the MIT License
|
+--------------------------------------------------------------------+
*
* Main entry point
*/
var asteroids;
(function (asteroids) {
    var Asteroids = asteroids.Asteroids;
    var Main = (function () {
        /**
         * Create a new game
         * @constructor
         */
        function Main() {
            var canvas = Main.createCanvas();
            new Asteroids(canvas.getContext('2d'), canvas.width, canvas.height).start();
        }
        /**
         * Create the canvas
         * @return {HTMLCanvasElement}
         */
        Main.createCanvas = function () {
            var canvas;
            canvas = document.createElement(navigator['isCocoonJS'] ? 'screencanvas' : 'canvas');
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.backgroundColor = '#000000';
            document.body.appendChild(canvas);
            return canvas;
        };
        return Main;
    })();
    asteroids.Main = Main;
})(asteroids || (asteroids = {}));
//# sourceMappingURL=Main.js.map
new asteroids.Main();