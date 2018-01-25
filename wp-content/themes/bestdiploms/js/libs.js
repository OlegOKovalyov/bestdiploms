/* Owl Carousel */
jQuery(document).ready(function(){
  jQuery('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:1800,
    smartSpeed:900,
    responsiveClass:true,
    navText:["<i class='fa fa-angle-left fa-2x'></i>","<i class='fa fa-angle-right fa-2x'></i>"],
    responsive:{
        0:{
            items:1,
            nav:true,
            loop: true
        },
        575:{
            items:2,
            nav:true,
            loop: true
        },
        768:{
            items:3,
            nav:true,
            loop: true
        },
        992:{
            items:3,
            nav:true,
            loop:true
        },
        1200:{
            items:4,
            nav:true,
            loop:true
        }
    }
  });

  jQuery("#carousel").owlCarousel({
    navigation:true,
    navigationText : ["&#xe079;","&#xe080;"],
  });


  }); /* Завершение начальной функции $(document).ready(function(); *** Не удалять! *** */
/*! add jquery.js */
/*//= ../../bower_components/jquery/dist/jquery.js*/
/*! add popper.js */
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.9
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    if (element) {
      return element.ownerDocument.documentElement;
    }

    return document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function () {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE10$1() && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length - 1; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

return Popper;

})));
//# sourceMappingURL=popper.js.map
/*! add util.js */
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
  };function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $(selector);
        return $selector.length > 0 ? selector : null;
      } catch (error) {
        return null;
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);
//# sourceMappingURL=util.js.map
/*! add tab.js */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var active = $(container).find(Selector.ACTIVE)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && active && $(active).hasClass(ClassName.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);
//# sourceMappingURL=tab.js.map
/*! add button.js */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);
//# sourceMappingURL=button.js.map
/*! add collapse.js */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));
      var tabToggles = $(Selector.DATA_TOGGLE);
      for (var i = 0; i < tabToggles.length; i++) {
        var elem = tabToggles[i];
        var selector = Util.getSelectorFromElement(elem);
        if (selector !== null && $(selector).filter(element).length > 0) {
          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).children().children(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      if (this._triggerArray.length) {
        for (var i = 0; i < this._triggerArray.length; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);
          if (selector !== null) {
            var $elem = $(selector);
            if (!$elem.hasClass(ClassName.SHOW)) {
              $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);
        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this3 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    if (!/input|textarea/i.test(event.target.tagName)) {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    $(selector).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);
//# sourceMappingURL=collapse.js.map


/*! add owl.carousel.js через Bower */
/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
/**
 * Owl carousel
 * @version 2.1.6
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Proxied event handlers.
		 * @protected
		 */
		this._handlers = {};

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from beeing retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Widths of all items.
		 */
		this._widths = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		/**
		 * Current state information for the drag operation.
		 * @todo #261
		 * @protected
		 */
		this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		};

		/**
		 * Current state information and their tags.
		 * @type {Object}
		 * @protected
		 */
		this._states = {
			current: {},
			tags: {
				'initializing': [ 'busy' ],
				'animating': [ 'busy' ],
				'dragging': [ 'interacting' ]
			}
		};

		$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
			this._handlers[handler] = $.proxy(this[handler], this);
		}, this));

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Workers, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Enumeration for types.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Type = {
		Event: 'event',
		State: 'state'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * List of workers involved in the update process.
	 */
	Owl.Workers = [ {
		filter: [ 'width', 'settings' ],
		run: function() {
			this._width = this.$element.width();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			this.$stage.children('.cloned').remove();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var margin = this.settings.margin || '',
				grid = !this.settings.autoWidth,
				rtl = this.settings.rtl,
				css = {
					'width': 'auto',
					'margin-left': rtl ? margin : '',
					'margin-right': rtl ? '' : margin
				};

			!grid && this.$stage.children().css(css);

			cache.css = css;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				merge = null,
				iterator = this._items.length,
				grid = !this.settings.autoWidth,
				widths = [];

			cache.items = {
				merge: false,
				width: width
			};

			while (iterator--) {
				merge = this._mergers[iterator];
				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

				cache.items.merge = merge > 1 || cache.items.merge;

				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
			}

			this._widths = widths;
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var clones = [],
				items = this._items,
				settings = this.settings,
				// TODO: Should be computed from number of min width items in stage
				view = Math.max(settings.items * 2, 4),
				size = Math.ceil(items.length / 2) * 2,
				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
				append = '',
				prepend = '';

			repeat /= 2;

			while (repeat--) {
				// Switch to only using appended clones
				clones.push(this.normalize(clones.length / 2, true));
				append = append + items[clones[clones.length - 1]][0].outerHTML;
				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
			}

			this._clones = clones;

			$(append).addClass('cloned').appendTo(this.$stage);
			$(prepend).addClass('cloned').prependTo(this.$stage);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				size = this._clones.length + this._items.length,
				iterator = -1,
				previous = 0,
				current = 0,
				coordinates = [];

			while (++iterator < size) {
				previous = coordinates[iterator - 1] || 0;
				current = this._widths[this.relative(iterator)] + this.settings.margin;
				coordinates.push(previous + current * rtl);
			}

			this._coordinates = coordinates;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var padding = this.settings.stagePadding,
				coordinates = this._coordinates,
				css = {
					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
					'padding-left': padding || '',
					'padding-right': padding || ''
				};

			this.$stage.css(css);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var iterator = this._coordinates.length,
				grid = !this.settings.autoWidth,
				items = this.$stage.children();

			if (grid && cache.items.merge) {
				while (iterator--) {
					cache.css.width = this._widths[this.relative(iterator)];
					items.eq(iterator).css(cache.css);
				}
			} else if (grid) {
				cache.css.width = cache.items.width;
				items.css(cache.css);
			}
		}
	}, {
		filter: [ 'items' ],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr('style');
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
			this.reset(cache.current);
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.active').removeClass('active');
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

			if (this.settings.center) {
				this.$stage.children('.center').removeClass('center');
				this.$stage.children().eq(this.current()).addClass('center');
			}
		}
	} ];

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.enter('initializing');
		this.trigger('initialize');

		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

		if (this.settings.autoWidth && !this.is('pre-loading')) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
			}
		}

		this.$element.addClass(this.options.loadingClass);

		// create stage
		this.$stage = $('<' + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>')
			.wrap('<div class="' + this.settings.stageOuterClass + '"/>');

		// append stage
		this.$element.append(this.$stage.parent());

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// check visibility
		if (this.$element.is(':visible')) {
			// update view
			this.refresh();
		} else {
			// invalidate width
			this.invalidate('width');
		}

		this.$element
			.removeClass(this.options.loadingClass)
			.addClass(this.options.loadedClass);

		// register event handlers
		this.registerEventHandlers();

		this.leave('initializing');
		this.trigger('initialized');
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			if (typeof settings.stagePadding === 'function') {
				settings.stagePadding = settings.stagePadding();
			}
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class',
					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
				);
			}
		}

		this.trigger('change', { property: { name: 'settings', value: settings } });
		this._breakpoint = match;
		this.settings = settings;
		this.invalidate('settings');
		this.trigger('changed', { property: { name: 'settings', value: this.settings } });
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.options.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};

		!this.is('valid') && this.enter('valid');
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		this.enter('refreshing');
		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		this.$element.addClass(this.options.refreshClass);

		this.update();

		this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		this.trigger('refreshed');
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (!this.$element.is(':visible')) {
			return false;
		}

		this.enter('resizing');

		if (this.trigger('resize').isDefaultPrevented()) {
			this.leave('resizing');
			return false;
		}

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this.trigger('resized');
	};

	/**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
	Owl.prototype.registerEventHandlers = function() {
		if ($.support.transition) {
			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		}

		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onThrottledResize);
		}

		if (this.settings.mouseDrag) {
			this.$element.addClass(this.options.dragClass);
			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
		}

		if (this.settings.touchDrag){
			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		}
	};

	/**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var stage = null;

		if (event.which === 3) {
			return;
		}

		if ($.support.transform) {
			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
			stage = {
				x: stage[stage.length === 16 ? 12 : 4],
				y: stage[stage.length === 16 ? 13 : 5]
			};
		} else {
			stage = this.$stage.position();
			stage = {
				x: this.settings.rtl ?
					stage.left + this.$stage.width() - this.width() + this.settings.margin :
					stage.left,
				y: stage.top
			};
		}

		if (this.is('animating')) {
			$.support.transform ? this.animate(stage.x) : this.$stage.stop()
			this.invalidate('position');
		}

		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

		this.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = $(event.target);
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
		this._drag.pointer = this.pointer(event);

		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event));

			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
				return;
			}

			event.preventDefault();

			this.enter('dragging');
			this.trigger('drag');
		}, this));
	};

	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var minimum = null,
			maximum = null,
			pull = null,
			delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this.difference(this._drag.stage.start, delta);

		if (!this.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.settings.loop) {
			minimum = this.coordinates(this.minimum());
			maximum = this.coordinates(this.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;

		this.animate(stage.x);
	};

	/**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragEnd = function(event) {
		var delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this._drag.stage.current,
			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

		$(document).off('.owl.core');

		this.$element.removeClass(this.options.grabClass);

		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
			this.invalidate('position');
			this.update();

			this._drag.direction = direction;

			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
				this._drag.target.one('click.owl.core', function() { return false; });
			}
		}

		if (!this.is('dragging')) {
			return;
		}

		this.leave('dragging');
		this.trigger('dragged');
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate, direction) {
		var position = -1,
			pull = 30,
			width = this.width(),
			coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				// on a left pull, check on current index
				if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
					position = index;
				// on a right pull, check on previous index
				// to do so, subtract width from value and set position = index + 1
				} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
					position = index + 1;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
					position = direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		var animate = this.speed() > 0;

		this.is('animating') && this.onTransitionEnd();

		if (animate) {
			this.enter('animating');
			this.trigger('translate');
		}

		if ($.support.transform3d && $.support.transition) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
				transition: (this.speed() / 1000) + 's'
			});
		} else if (animate) {
			this.$stage.animate({
				left: coordinate + 'px'
			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
		} else {
			this.$stage.css({
				left: coordinate + 'px'
			});
		}
	};

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param {String} state - The state to check.
	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
	 */
	Owl.prototype.is = function(state) {
		return this._states.current[state] && this._states.current[state] > 0;
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} [part] - The part to invalidate.
	 * @returns {Array.<String>} - The invalidated parts.
	 */
	Owl.prototype.invalidate = function(part) {
		if ($.type(part) === 'string') {
			this._invalidated[part] = true;
			this.is('valid') && this.leave('valid');
		}
		return $.map(this._invalidated, function(v, i) { return i });
	};

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = this._items.length,
			m = relative ? 0 : this._clones.length;

		if (!this.isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	};

	/**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var settings = this.settings,
			maximum = this._coordinates.length,
			iterator,
			reciprocalItemsWidth,
			elementWidth;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			iterator = this._items.length;
			reciprocalItemsWidth = this._items[--iterator].width();
			elementWidth = this.$element.width();
			while (iterator--) {
				reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
				if (reciprocalItemsWidth > elementWidth) {
					break;
				}
			}
			maximum = iterator + 1;
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	};

	/**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		return relative ? 0 : this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var multiplier = 1,
			newPosition = position - 1,
			coordinate;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			if (this.settings.rtl) {
				multiplier = -1;
				newPosition = position + 1;
			}

			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
		} else {
			coordinate = this._coordinates[newPosition] || 0;
		}

		coordinate = Math.ceil(coordinate);

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		if (factor === 0) {
			return 0;
		}

		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		var current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			direction = (distance > 0) - (distance < 0),
			items = this._items.length,
			minimum = this.minimum(),
			maximum = this.maximum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		this.speed(this.duration(current, position, speed));
		this.current(position);

		if (this.$element.is(':visible')) {
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onTransitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.leave('animating');
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			console.warn('Can not detect viewport width.');
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		var current = this.relative(this._current);

		position = position === undefined ? this._items.length : this.normalize(position, true);
		content = content instanceof jQuery ? content : $(content);

		this.trigger('add', { content: content, position: position });

		content = this.prepare(content);

		if (this._items.length === 0 || position === this._items.length) {
			this._items.length === 0 && this.$stage.append(content);
			this._items.length !== 0 && this._items[position - 1].after(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this._items[current] && this.reset(this._items[current].index());

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @protected
	 */
	Owl.prototype.preloadAutoWidthImages = function(images) {
		images.each($.proxy(function(i, element) {
			this.enter('pre-loading');
			element = $(element);
			$(new Image()).one('load', $.proxy(function(e) {
				element.attr('src', e.target.src);
				element.css('opacity', 1);
				this.leave('pre-loading');
				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
		}, this));
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		this.$element.off('.owl.core');
		this.$stage.off('.owl.core');
		$(document).off('.owl.core');

		if (this.settings.responsive !== false) {
			window.clearTimeout(this.resizeTimer);
			this.off(window, 'resize', this._handlers.onThrottledResize);
		}

		for (var i in this._plugins) {
			this._plugins[i].destroy();
		}

		this.$stage.children('.cloned').remove();

		this.$stage.unwrap();
		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();

		this.$element
			.removeClass(this.options.refreshClass)
			.removeClass(this.options.loadingClass)
			.removeClass(this.options.loadedClass)
			.removeClass(this.options.rtlClass)
			.removeClass(this.options.dragClass)
			.removeClass(this.options.grabClass)
			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
			.removeData('owl.carousel');
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=carousel] - The event namespace.
	 * @param {String} [state] - The state which is associated with the event.
	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace, state, enter) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.register({ type: Owl.Type.Event, name: name });
			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	};

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
	Owl.prototype.enter = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			if (this._states.current[name] === undefined) {
				this._states.current[name] = 0;
			}

			this._states.current[name]++;
		}, this));
	};

	/**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	Owl.prototype.leave = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			this._states.current[name]--;
		}, this));
	};

	/**
	 * Registers an event or state.
	 * @public
	 * @param {Object} object - The event or state to register.
	 */
	Owl.prototype.register = function(object) {
		if (object.type === Owl.Type.Event) {
			if (!$.event.special[object.name]) {
				$.event.special[object.name] = {};
			}

			if (!$.event.special[object.name].owl) {
				var _default = $.event.special[object.name]._default;
				$.event.special[object.name]._default = function(e) {
					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
						return _default.apply(this, arguments);
					}
					return e.namespace && e.namespace.indexOf('owl') > -1;
				};
				$.event.special[object.name].owl = true;
			}
		} else if (object.type === Owl.Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
				return $.inArray(tag, this._states.tags[object.name]) === i;
			}, this));
		}
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	};

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	};

	/**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
	Owl.prototype.pointer = function(event) {
		var result = { x: null, y: null };

		event = event.originalEvent || event || window.event;

		event = event.touches && event.touches.length ?
			event.touches[0] : event.changedTouches && event.changedTouches.length ?
				event.changedTouches[0] : event;

		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}

		return result;
	};

	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @protected
	 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
	 */
	Owl.prototype.isNumeric = function(number) {
		return !isNaN(parseFloat(number));
	};

	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
	Owl.prototype.difference = function(first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	};

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @todo Navigation plugin `next` and `prev`
	 * @public
	 */
	$.fn.owlCarousel = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				data = $this.data('owl.carousel');

			if (!data) {
				data = new Owl(this, typeof option == 'object' && option);
				$this.data('owl.carousel', data);

				$.each([
					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
				], function(i, event) {
					data.register({ type: Owl.Type.Event, name: event });
					data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
						if (e.namespace && e.relatedTarget !== this) {
							this.suppress([ event ]);
							data[event].apply(this, [].slice.call(arguments, 1));
							this.release([ event ]);
						}
					}, data));
				});
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoRefresh = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Refresh interval.
		 * @protected
		 * @type {number}
		 */
		this._interval = null;

		/**
		 * Whether the element is currently visible or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._visible = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoRefresh) {
					this.watch();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoRefresh.Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

	/**
	 * Watches the element.
	 */
	AutoRefresh.prototype.watch = function() {
		if (this._interval) {
			return;
		}

		this._visible = this._core.$element.is(':visible');
		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	AutoRefresh.prototype.refresh = function() {
		if (this._core.$element.is(':visible') === this._visible) {
			return;
		}

		this._visible = !this._visible;

		this._core.$element.toggleClass('owl-hidden', !this._visible);

		this._visible && (this._core.invalidate('width') && this._core.refresh());
	};

	/**
	 * Destroys the plugin.
	 */
	AutoRefresh.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this._interval);

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position)), load);
						position++;
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false
	};

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
				url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url("' + url + '")',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight && e.property.name == 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight
					&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		var start = this._core._current,
			end = start + this._core.settings.items,
			visible = this._core.$stage.children().toArray().slice(start, end),
			heights = [],
			maxheight = 0;

		$.each(visible, function(index, item) {
			heights.push($(item).height());
		});

		maxheight = Math.max.apply(null, heights);

		this._core.$stage.parent()
			.height(maxheight)
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * All event handlers.
		 * @todo The cloned content removale is too late
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
				}
			}, this),
			'resize.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.is('resizing')) {
					this._core.$stage.find('.cloned .owl-video-frame').remove();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position' && this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				var $element = $(e.content).find('.owl-video');

				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {
			var type = (function() {
					if (target.attr('data-vimeo-id')) {
						return 'vimeo';
					} else if (target.attr('data-vzaar-id')) {
						return 'vzaar'
					} else {
						return 'youtube';
					}
				})(),
				id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
				width = target.attr('data-width') || this._core.settings.videoWidth,
				height = target.attr('data-height') || this._core.settings.videoHeight,
				url = target.attr('href');

		if (url) {

			/*
					Parses the id's out of the following urls (and probably more):
					https://www.youtube.com/watch?v=:id
					https://youtu.be/:id
					https://vimeo.com/:id
					https://vimeo.com/channels/:channel/:id
					https://vimeo.com/groups/:group/videos/:id
					https://app.vzaar.com/videos/:id

					Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
			*/

			id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else if (id[3].indexOf('vzaar') > -1) {
				type = 'vzaar';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {
		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
				} else {
					tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: '//vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		} else if (video.type === 'vzaar') {
			$.ajax({
				type: 'GET',
				url: '//vzaar.com/api/videos/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data.framegrab_url;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
		this._core.leave('playing');
		this._core.trigger('stopped', null, 'video');
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} event - The event arguments.
	 */
	Video.prototype.play = function(event) {
		var target = $(event.target),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html;

		if (this._playing) {
			return;
		}

		this._core.enter('playing');
		this._core.trigger('play', null, 'video');

		item = this._core.items(this._core.relative(item.index()));

		this._core.reset(item.index());

		if (video.type === 'youtube') {
			html = '<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' +
				video.id + '?autoplay=1&rel=0&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
		} else if (video.type === 'vimeo') {
			html = '<iframe src="//player.vimeo.com/video/' + video.id +
				'?autoplay=1" width="' + width + '" height="' + height +
				'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		} else if (video.type === 'vzaar') {
			html = '<iframe frameborder="0"' + 'height="' + height + '"' + 'width="' + width +
				'" allowfullscreen mozallowfullscreen webkitAllowFullScreen ' +
				'src="//view.vzaar.com/' + video.id + '/player?autoplay=true"></iframe>';
		}

		$('<div class="owl-video-frame">' + html + '</div>').insertAfter(item.find('.owl-video'));

		this._playing = item.addClass('owl-video-playing');
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {
		var element = document.fullscreenElement || document.mozFullScreenElement ||
				document.webkitFullscreenElement;

		return element && $(element).parent().hasClass('owl-video-frame');
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this.swapping = e.type == 'translated';
				}
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1) {
			return;
		}

		if (!$.support.animation || !$.support.transition) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.one($.support.animation.end, clear)
				.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing);
		}

		if (incoming) {
			next.one($.support.animation.end, clear)
				.addClass('animated owl-animated-in')
				.addClass(incoming);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.onTransitionEnd();
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay timeout.
		 * @type {Timeout}
		 */
		this._timeout = null;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = false;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				} else if (e.namespace && e.property.name === 'position') {
					//console.log('play?', e);
					if (this._core.settings.autoplay) {
						this._setAutoPlayInterval();
					}
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function(e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this),
			'touchstart.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'touchend.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		this._paused = false;

		if (this._core.is('rotating')) {
			return;
		}

		this._core.enter('rotating');

		this._setAutoPlayInterval();
	};

	/**
	 * Gets a new timeout
	 * @private
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 * @return {Timeout}
	 */
	Autoplay.prototype._getNextTimeout = function(timeout, speed) {
		if ( this._timeout ) {
			window.clearTimeout(this._timeout);
		}
		return window.setTimeout($.proxy(function() {
			if (this._paused || this._core.is('busy') || this._core.is('interacting') || document.hidden) {
				return;
			}
			this._core.next(speed || this._core.settings.autoplaySpeed);
		}, this), timeout || this._core.settings.autoplayTimeout);
	};

	/**
	 * Sets autoplay in motion.
	 * @private
	 */
	Autoplay.prototype._setAutoPlayInterval = function() {
		this._timeout = this._getNextTimeout();
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		if (!this._core.is('rotating')) {
			return;
		}

		window.clearTimeout(this._timeout);
		this._core.leave('rotating');
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		if (!this._core.is('rotating')) {
			return;
		}

		this._paused = true;
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		this.stop();

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
						$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
				}
			}, this),
			'added.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, this._templates.pop());
				}
			}, this),
			'remove.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && !this._initialized) {
					this._core.trigger('initialize', null, 'navigation');
					this.initialize();
					this.update();
					this.draw();
					this._initialized = true;
					this._core.trigger('initialized', null, 'navigation');
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._initialized) {
					this._core.trigger('refresh', null, 'navigation');
					this.update();
					this.draw();
					this._core.trigger('refreshed', null, 'navigation');
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navText: [ 'prev', 'next' ],
		navSpeed: false,
		navElement: 'div',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [ 'owl-prev', 'owl-next' ],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotsData: false,
		dotsSpeed: false,
		dotsContainer: false
	};

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var override,
			settings = this._core.settings;

		// create DOM structure for relative navigation
		this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
			: $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$previous = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[0])
			.html(settings.navText[0])
			.prependTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.prev(settings.navSpeed);
			}, this));
		this._controls.$next = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[1])
			.html(settings.navText[1])
			.appendTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.next(settings.navSpeed);
			}, this));

		// create DOM structure for absolute navigation
		if (!settings.dotsData) {
			this._templates = [ $('<div>')
				.addClass(settings.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
			: $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$absolute.on('click', 'div', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$absolute)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, settings.dotsSpeed);
		}, this));

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			this._controls[control].remove();
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			maximum = this._core.maximum(true),
			settings = this._core.settings,
			size = settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	};

	/**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference,
			settings = this._core.settings,
			disabled = this._core.items().length <= settings.items,
			index = this._core.relative(this._core.current()),
			loop = settings.loop || settings.rewind;

		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

		if (settings.nav) {
			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
		}

		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

		if (settings.dots) {
			difference = this._pages.length - this._controls.$absolute.children().length;

			if (settings.dotsData && difference !== 0) {
				this._controls.$absolute.html(this._templates.join(''));
			} else if (difference > 0) {
				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
			} else if (difference < 0) {
				this._controls.$absolute.children().slice(difference).remove();
			}

			this._controls.$absolute.find('.active').removeClass('active');
			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}
	};

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items)
		};
	};

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var current = this._core.relative(this._core.current());
		return $.grep(this._pages, $.proxy(function(page, index) {
			return page.start <= current && page.end >= current;
		}, this)).pop();
	};

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			settings = this._core.settings;

		if (settings.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += settings.slideBy : position -= settings.slideBy;
		}

		return position;
	};

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	};

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	};

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard && this._pages.length) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash index for the items.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

					if (!hash) {
						return;
					}

					this._hashes[hash] = e.content;
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position') {
					var current = this._core.items(this._core.relative(this._core.current())),
						hash = $.map(this._hashes, function(item, hash) {
							return item === current ? hash : null;
						}).join();

					if (!hash || window.location.hash.slice(1) === hash) {
						return;
					}

					window.location.hash = hash;
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]);

			if (position === undefined || position === this._core.current()) {
				return;
			}

			this._core.to(this._core.relative(position), false, true);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.1.0
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	var style = $('<support>').get(0).style,
		prefixes = 'Webkit Moz O ms'.split(' '),
		events = {
			transition: {
				end: {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd',
					transition: 'transitionend'
				}
			},
			animation: {
				end: {
					WebkitAnimation: 'webkitAnimationEnd',
					MozAnimation: 'animationend',
					OAnimation: 'oAnimationEnd',
					animation: 'animationend'
				}
			}
		},
		tests = {
			csstransforms: function() {
				return !!test('transform');
			},
			csstransforms3d: function() {
				return !!test('perspective');
			},
			csstransitions: function() {
				return !!test('transition');
			},
			cssanimations: function() {
				return !!test('animation');
			}
		};

	function test(property, prefixed) {
		var result = false,
			upper = property.charAt(0).toUpperCase() + property.slice(1);

		$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
			if (style[property] !== undefined) {
				result = prefixed ? property : true;
				return false;
			}
		});

		return result;
	}

	function prefixed(property) {
		return test(property, true);
	}

	if (tests.csstransitions()) {
		/* jshint -W053 */
		$.support.transition = new String(prefixed('transition'))
		$.support.transition.end = events.transition.end[ $.support.transition ];
	}

	if (tests.cssanimations()) {
		/* jshint -W053 */
		$.support.animation = new String(prefixed('animation'))
		$.support.animation.end = events.animation.end[ $.support.animation ];
	}

	if (tests.csstransforms()) {
		/* jshint -W053 */
		$.support.transform = new String(prefixed('transform'));
		$.support.transform3d = tests.csstransforms3d();
	}

})(window.Zepto || window.jQuery, window, document);

/*! add owl.carousel.js через скачанный комплект */
/*//= ../../owlcarousel/dist/owl.carousel.js*/

/*! add Bootstrap 4 DatePicker from Gijgo.com через Bower */
var gj={};gj.widget=function(){var a=this;a.xhr=null,a.generateGUID=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()},a.mouseX=function(a){if(a){if(a.pageX)return a.pageX;if(a.clientX)return a.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);if(a.touches&&a.touches.length)return a.touches[0].pageX;if(a.changedTouches&&a.changedTouches.length)return a.changedTouches[0].pageX;if(a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches.length)return a.originalEvent.touches[0].pageX;if(a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches.length)return a.originalEvent.touches[0].pageX}return null},a.mouseY=function(a){if(a){if(a.pageY)return a.pageY;if(a.clientY)return a.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);if(a.touches&&a.touches.length)return a.touches[0].pageY;if(a.changedTouches&&a.changedTouches.length)return a.changedTouches[0].pageY;if(a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches.length)return a.originalEvent.touches[0].pageY;if(a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches.length)return a.originalEvent.touches[0].pageY}return null}},gj.widget.prototype.init=function(a,b){var c,d,e;this.attr("data-type",b),d=$.extend(!0,{},this.getHTMLConfig()||{}),$.extend(!0,d,a||{}),e=this.getConfig(d,b),this.attr("data-guid",e.guid),this.data(e);for(c in e)gj[b].events.hasOwnProperty(c)&&(this.on(c,e[c]),delete e[c]);for(plugin in gj[b].plugins)gj[b].plugins.hasOwnProperty(plugin)&&gj[b].plugins[plugin].configure(this,e,d);return this},gj.widget.prototype.getConfig=function(a,b){var c,d,e,f;c=$.extend(!0,{},gj[b].config.base),d=a.hasOwnProperty("uiLibrary")?a.uiLibrary:c.uiLibrary,gj[b].config[d]&&$.extend(!0,c,gj[b].config[d]),e=a.hasOwnProperty("iconsLibrary")?a.iconsLibrary:c.iconsLibrary,gj[b].config[e]&&$.extend(!0,c,gj[b].config[e]);for(f in gj[b].plugins)gj[b].plugins.hasOwnProperty(f)&&($.extend(!0,c,gj[b].plugins[f].config.base),gj[b].plugins[f].config[d]&&$.extend(!0,c,gj[b].plugins[f].config[d]),gj[b].plugins[f].config[e]&&$.extend(!0,c,gj[b].plugins[f].config[e]));return $.extend(!0,c,a),c.guid||(c.guid=this.generateGUID()),c},gj.widget.prototype.getHTMLConfig=function(){var a=this.data(),b=this[0].attributes;return b.width&&(a.width=b.width.value),b.height&&(a.height=b.height.value),b.value&&(a.value=b.value.value),b.align&&(a.align=b.align.value),a&&a.source&&(a.dataSource=a.source,delete a.source),a},gj.widget.prototype.createDoneHandler=function(){var a=this;return function(b){"string"==typeof b&&JSON&&(b=JSON.parse(b)),gj[a.data("type")].methods.render(a,b)}},gj.widget.prototype.createErrorHandler=function(){return function(a){a&&a.statusText&&"abort"!==a.statusText&&alert(a.statusText)}},gj.widget.prototype.reload=function(a){var b,c,d=this.data(),e=this.data("type");return void 0===d.dataSource&&gj[e].methods.useHtmlDataSource(this,d),$.extend(d.params,a),$.isArray(d.dataSource)?(c=gj[e].methods.filter(this),gj[e].methods.render(this,c)):"string"==typeof d.dataSource?(b={url:d.dataSource,data:d.params},this.xhr&&this.xhr.abort(),this.xhr=$.ajax(b).done(this.createDoneHandler()).fail(this.createErrorHandler())):"object"==typeof d.dataSource&&(d.dataSource.data||(d.dataSource.data={}),$.extend(d.dataSource.data,d.params),b=$.extend(!0,{},d.dataSource),"json"===b.dataType&&"object"==typeof b.data&&(b.data=JSON.stringify(b.data)),b.success||(b.success=this.createDoneHandler()),b.error||(b.error=this.createErrorHandler()),this.xhr&&this.xhr.abort(),this.xhr=$.ajax(b)),this},gj.documentManager={events:{},subscribeForEvent:function(a,b,c){if(gj.documentManager.events[a]&&0!==gj.documentManager.events[a].length){if(gj.documentManager.events[a][b])throw"Event "+a+' for widget with guid="'+b+'" is already attached.';gj.documentManager.events[a].push({widgetId:b,callback:c})}else gj.documentManager.events[a]=[{widgetId:b,callback:c}],$(document).on(a,gj.documentManager.executeCallbacks)},executeCallbacks:function(a){var b=gj.documentManager.events[a.type];if(b)for(var c=0;c<b.length;c++)b[c].callback(a)},unsubscribeForEvent:function(a,b){var c=!1,d=gj.documentManager.events[a];if(d)for(var e=0;e<d.length;e++)d[e].widgetId===b&&(d.splice(e,1),c=!0,0===d.length&&($(document).off(a),delete gj.documentManager.events[a]));if(!c)throw'The "'+a+'" for widget with guid="'+b+"\" can't be removed."}},gj.core={messages:{"en-us":{monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthShortNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},parseDate:function(a,b,c){var d,e,f,g,h,i,j;if(a&&"string"==typeof a){if(/^\d+$/.test(a))j=new Date(a);else if(a.indexOf("/Date(")>-1)j=new Date(parseInt(a.substr(6),10));else if(a){for(h=a.split(/[\s,-\.\/\/\:]+/),i=b.split(/[\s,-\.\/\/\:]+/),d=0;d<i.length;d++)["d","dd"].indexOf(i[d])>-1?e=parseInt(h[d],10):["m","mm"].indexOf(i[d])>-1?f=parseInt(h[d],10)-1:"mmm"===i[d]?f=gj.core.messages[c||"en-us"].monthShortNames.indexOf(h[d]):"mmmm"===i[d]?f=gj.core.messages[c||"en-us"].monthNames.indexOf(h[d]):["yy","yyyy"].indexOf(i[d])>-1&&(g=parseInt(h[d],10),"yy"===i[d]&&(g+=2e3));j=new Date(g,f,e)}}else"number"==typeof a?j=new Date(a):a instanceof Date&&(j=a);return j},formatDate:function(a,b,c){var d,e,f="",g=b.split(/[\s,-\.\/\/\:]+/),h=b.replace(/[shtdmyHTDMY]/g,""),j=function(a,b){for(a=String(a),b=b||2;a.length<b;)a="0"+a;return a};for(i=0;i<g.length;i++)switch(d=h[i]||"",g[i]){case"s":f+=a.getSeconds()+d;break;case"ss":f+=j(a.getSeconds())+d;break;case"M":f+=a.getMinutes()+d;break;case"MM":f+=j(a.getMinutes())+d;break;case"H":f+=a.getHours()+d;break;case"HH":f+=j(a.getHours())+d;break;case"h":e=a.getHours()>12?a.getHours()%12:a.getHours(),f+=e+d;break;case"hh":e=a.getHours()>12?a.getHours()%12:a.getHours(),f+=j(e)+d;break;case"tt":f+=(a.getHours()>=12?"pm":"am")+d;break;case"TT":f+=(a.getHours()>=12?"PM":"AM")+d;break;case"d":f+=a.getDate()+d;break;case"dd":f+=j(a.getDate())+d;break;case"m":f+=a.getMonth()+1+d;break;case"mm":f+=j(a.getMonth()+1)+d;break;case"mmm":f+=gj.core.messages[c||"en-us"].monthShortNames[a.getMonth()]+d;break;case"mmmm":f+=gj.core.messages[c||"en-us"].monthNames[a.getMonth()]+d;break;case"yy":f+=a.getFullYear().toString().substr(2)+d;break;case"yyyy":f+=a.getFullYear()+d}return f},isIE:function(){return!!navigator.userAgent.match(/Trident/g)||!!navigator.userAgent.match(/MSIE/g)}},gj.dialog={plugins:{},messages:{}},gj.dialog.config={base:{autoOpen:!0,closeOnEscape:!0,closeButtonInHeader:!0,draggable:!0,height:"auto",locale:"en-us",minHeight:void 0,maxHeight:void 0,width:300,minWidth:void 0,maxWidth:void 0,modal:!1,resizable:!1,scrollable:!1,title:void 0,uiLibrary:void 0,style:{modal:"gj-modal",content:"gj-dialog-md",header:"gj-dialog-md-header gj-unselectable",headerTitle:"gj-dialog-md-title",headerCloseButton:"gj-dialog-md-close",body:"gj-dialog-md-body",footer:"gj-dialog-footer gj-dialog-md-footer"}},bootstrap:{style:{modal:"modal",content:"modal-content gj-dialog-bootstrap",header:"modal-header",headerTitle:"modal-title",headerCloseButton:"close",body:"modal-body",footer:"gj-dialog-footer modal-footer"}},bootstrap4:{style:{modal:"modal",content:"modal-content gj-dialog-bootstrap4",header:"modal-header",headerTitle:"modal-title",headerCloseButton:"close",body:"modal-body",footer:"gj-dialog-footer modal-footer"}}},gj.dialog.events={initialized:function(a){a.trigger("initialized")},opening:function(a){a.trigger("opening")},opened:function(a){a.trigger("opened")},closing:function(a){a.trigger("closing")},closed:function(a){a.trigger("closed")},drag:function(a){a.trigger("drag")},dragStart:function(a){a.trigger("dragStart")},dragStop:function(a){a.trigger("dragStop")},resize:function(a){a.trigger("resize")},resizeStart:function(a){a.trigger("resizeStart")},resizeStop:function(a){a.trigger("resizeStop")}},gj.dialog.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"dialog"),gj.dialog.methods.localization(this),gj.dialog.methods.initialize(this),gj.dialog.events.initialized(this),this},localization:function(a){var b=a.data();void 0===b.title&&(b.title=gj.dialog.messages[b.locale].DefaultTitle)},getHTMLConfig:function(){var a=gj.widget.prototype.getHTMLConfig.call(this),b=this[0].attributes;return b.title&&(a.title=b.title.value),a},initialize:function(a){var b,c,d,e=a.data();a.addClass(e.style.content),gj.dialog.methods.setSize(a),e.closeOnEscape&&$(document).keyup(function(b){27===b.keyCode&&a.close()}),c=a.children('div[data-role="body"]'),0===c.length?(c=$('<div data-role="body"/>').addClass(e.style.body),a.wrapInner(c)):c.addClass(e.style.body),b=gj.dialog.methods.renderHeader(a),d=a.children('div[data-role="footer"]').addClass(e.style.footer),a.find('[data-role="close"]').on("click",function(){a.close()}),gj.draggable&&(e.draggable&&gj.dialog.methods.draggable(a,b),e.resizable&&gj.dialog.methods.resizable(a)),e.scrollable&&e.height&&(a.addClass("gj-dialog-scrollable"),a.on("opened",function(){a.children('div[data-role="body"]').css("height",e.height-b.outerHeight()-(d.length?d.outerHeight():0))})),gj.dialog.methods.setPosition(a),e.modal&&a.wrapAll('<div data-role="modal" class="'+e.style.modal+'"/>'),e.autoOpen&&a.open()},setSize:function(a){var b=a.data();b.width&&a.css("width",b.width),b.height&&a.css("height",b.height)},renderHeader:function(a){var b,c,d,e=a.data();return b=a.children('div[data-role="header"]'),0===b.length&&(b=$('<div data-role="header" />'),a.prepend(b)),b.addClass(e.style.header),c=b.find('[data-role="title"]'),0===c.length&&(c=$('<h4 data-role="title">'+e.title+"</h4>"),b.append(c)),c.addClass(e.style.headerTitle),d=b.find('[data-role="close"]'),0===d.length&&e.closeButtonInHeader?(d=$('<button type="button" data-role="close" title="'+gj.dialog.messages[e.locale].Close+'"><span>×</span></button>'),d.addClass(e.style.headerCloseButton),b.append(d)):d.length>0&&!1===e.closeButtonInHeader?d.hide():d.addClass(e.style.headerCloseButton),b},setPosition:function(a){var b=$(window).width()/2-a.width()/2,c=$(window).height()/2-a.height()/2;a.css("position","absolute"),a.css("left",b>0?b:0),a.css("top",c>0?c:0)},draggable:function(a,b){a.appendTo("body"),b.addClass("gj-draggable"),a.draggable({handle:b,start:function(){a.addClass("gj-unselectable"),gj.dialog.events.dragStart(a)},stop:function(){a.removeClass("gj-unselectable"),gj.dialog.events.dragStop(a)}})},resizable:function(a){var b={drag:gj.dialog.methods.resize,start:function(){a.addClass("gj-unselectable"),gj.dialog.events.resizeStart(a)},stop:function(){this.removeAttribute("style"),a.removeClass("gj-unselectable"),gj.dialog.events.resizeStop(a)}};a.append($('<div class="gj-resizable-handle gj-resizable-n"></div>').draggable($.extend(!0,{horizontal:!1},b))),a.append($('<div class="gj-resizable-handle gj-resizable-e"></div>').draggable($.extend(!0,{vertical:!1},b))),a.append($('<div class="gj-resizable-handle gj-resizable-s"></div>').draggable($.extend(!0,{horizontal:!1},b))),a.append($('<div class="gj-resizable-handle gj-resizable-w"></div>').draggable($.extend(!0,{vertical:!1},b))),a.append($('<div class="gj-resizable-handle gj-resizable-ne"></div>').draggable($.extend(!0,{},b))),a.append($('<div class="gj-resizable-handle gj-resizable-nw"></div>').draggable($.extend(!0,{},b))),a.append($('<div class="gj-resizable-handle gj-resizable-sw"></div>').draggable($.extend(!0,{},b))),a.append($('<div class="gj-resizable-handle gj-resizable-se"></div>').draggable($.extend(!0,{},b)))},resize:function(a,b){var c,d,e,f,g,h,i,j=!1;return c=$(this),d=c.parent(),e=d.data(),c.hasClass("gj-resizable-n")?(f=d.height()-b.top,h=d.offset().top+b.top):c.hasClass("gj-resizable-e")?g=d.width()+b.left:c.hasClass("gj-resizable-s")?f=d.height()+b.top:c.hasClass("gj-resizable-w")?(g=d.width()-b.left,i=d.offset().left+b.left):c.hasClass("gj-resizable-ne")?(f=d.height()-b.top,h=d.offset().top+b.top,g=d.width()+b.left):c.hasClass("gj-resizable-nw")?(f=d.height()-b.top,h=d.offset().top+b.top,g=d.width()-b.left,i=d.offset().left+b.left):c.hasClass("gj-resizable-se")?(f=d.height()+b.top,g=d.width()+b.left):c.hasClass("gj-resizable-sw")&&(f=d.height()+b.top,g=d.width()-b.left,i=d.offset().left+b.left),f&&(!e.minHeight||f>=e.minHeight)&&(!e.maxHeight||f<=e.maxHeight)&&(d.height(f),h&&d.css("top",h),j=!0),g&&(!e.minWidth||g>=e.minWidth)&&(!e.maxWidth||g<=e.maxWidth)&&(d.width(g),i&&d.css("left",i),j=!0),j&&gj.dialog.events.resize(d),j},open:function(a,b){var c;return gj.dialog.events.opening(a),a.css("display","block"),a.closest('div[data-role="modal"]').css("display","block"),c=a.children('div[data-role="footer"]'),c.length&&c.outerHeight()&&a.children('div[data-role="body"]').css("margin-bottom",c.outerHeight()),void 0!==b&&a.find('[data-role="title"]').html(b),gj.dialog.events.opened(a),a},close:function(a){return a.is(":visible")&&(gj.dialog.events.closing(a),a.css("display","none"),a.closest('div[data-role="modal"]').css("display","none"),gj.dialog.events.closed(a)),a},isOpen:function(a){return a.is(":visible")},content:function(a,b){var c=a.children('div[data-role="body"]');return void 0===b?c.html():c.html(b)},destroy:function(a,b){var c=a.data();return c&&(!1===b?a.remove():(a.close(),a.off(),a.removeData(),a.removeAttr("data-type"),a.removeClass(c.style.content),a.find('[data-role="header"]').removeClass(c.style.header),a.find('[data-role="title"]').removeClass(c.style.headerTitle),a.find('[data-role="close"]').remove(),a.find('[data-role="body"]').removeClass(c.style.body),a.find('[data-role="footer"]').removeClass(c.style.footer))),a}},gj.dialog.widget=function(a,b){var c=this,d=gj.dialog.methods;return c.open=function(a){return d.open(this,a)},c.close=function(){return d.close(this)},c.isOpen=function(){return d.isOpen(this)},c.content=function(a){return d.content(this,a)},c.destroy=function(a){return d.destroy(this,a)},$.extend(a,c),"dialog"!==a.attr("data-type")&&d.init.call(a,b),a},gj.dialog.widget.prototype=new gj.widget,gj.dialog.widget.constructor=gj.dialog.widget,gj.dialog.widget.prototype.getHTMLConfig=gj.dialog.methods.getHTMLConfig,function(a){a.fn.dialog=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.dialog.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.dialog.widget(this,a)}}}(jQuery),gj.dialog.messages["en-us"]={Close:"Close",DefaultTitle:"Dialog"},gj.draggable={plugins:{}},gj.draggable.config={base:{handle:void 0,vertical:!0,horizontal:!0}},gj.draggable.methods={init:function(a){var b,c=this;return gj.widget.prototype.init.call(this,a,"draggable"),c.attr("data-draggable","true"),b=gj.draggable.methods.getHandleElement(c),b.on("touchstart mousedown",function(a){c.attr("data-draggable-dragging",!0),c.removeAttr("data-draggable-x").removeAttr("data-draggable-y"),c.css("position","absolute"),gj.documentManager.subscribeForEvent("touchmove",c.data("guid"),gj.draggable.methods.createMoveHandler(c)),gj.documentManager.subscribeForEvent("mousemove",c.data("guid"),gj.draggable.methods.createMoveHandler(c))}),gj.documentManager.subscribeForEvent("mouseup",c.data("guid"),gj.draggable.methods.createUpHandler(c)),gj.documentManager.subscribeForEvent("touchend",c.data("guid"),gj.draggable.methods.createUpHandler(c)),gj.documentManager.subscribeForEvent("touchcancel",c.data("guid"),gj.draggable.methods.createUpHandler(c)),c},getHandleElement:function(a){var b=a.data("handle");return b&&b.length?b:a},createUpHandler:function(a){return function(b){"true"===a.attr("data-draggable-dragging")&&(a.attr("data-draggable-dragging",!1),gj.documentManager.unsubscribeForEvent("mousemove",a.data("guid")),gj.documentManager.unsubscribeForEvent("touchmove",a.data("guid")),gj.draggable.events.stop(a,{left:a.mouseX(b),top:a.mouseY(b)}))}},createMoveHandler:function(a){return function(b){var c,d,e,f,g,h;"true"===a.attr("data-draggable-dragging")&&(c=a.mouseX(b),d=a.mouseY(b),g=a.attr("data-draggable-x"),h=a.attr("data-draggable-y"),g&&h?(e=a.data("horizontal")?c-parseInt(g,10):0,f=a.data("vertical")?d-parseInt(h,10):0,!1!==gj.draggable.events.drag(a,e,f,c,d)&&gj.draggable.methods.move(a,e,f)):gj.draggable.events.start(a,c,d),a.attr("data-draggable-x",c),a.attr("data-draggable-y",d))}},move:function(a,b,c){var d=a.get(0),e=d.style.top?parseInt(d.style.top):a.position().top,f=d.style.left?parseInt(d.style.left):a.position().left;d.style.top=e+c+"px",d.style.left=f+b+"px"},destroy:function(a){return"true"===a.attr("data-draggable")&&(gj.documentManager.unsubscribeForEvent("mouseup",a.data("guid")),a.removeData(),a.removeAttr("data-guid"),a.removeAttr("data-draggable"),a.off("drag").off("start").off("stop"),gj.draggable.methods.getHandleElement(a).off("mousedown")),a}},gj.draggable.events={drag:function(a,b,c,d,e){return a.triggerHandler("drag",[{top:c,left:b},{top:e,left:d}])},start:function(a,b,c){a.triggerHandler("start",[{top:c,left:b}])},stop:function(a,b){a.triggerHandler("stop",[b])}},gj.draggable.widget=function(a,b){var c=this,d=gj.draggable.methods;return a.destroy||(c.destroy=function(){return d.destroy(this)}),$.extend(a,c),"true"!==a.attr("data-draggable")&&d.init.call(a,b),a},gj.draggable.widget.prototype=new gj.widget,gj.draggable.widget.constructor=gj.draggable.widget,function(a){a.fn.draggable=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.draggable.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.draggable.widget(this,a)}}}(jQuery),gj.droppable={plugins:{}},gj.droppable.config={hoverClass:void 0},gj.droppable.methods={init:function(a){var b=this;return gj.widget.prototype.init.call(this,a,"droppable"),b.attr("data-droppable","true"),gj.documentManager.subscribeForEvent("mousedown",b.data("guid"),gj.droppable.methods.createMouseDownHandler(b)),gj.documentManager.subscribeForEvent("mousemove",b.data("guid"),gj.droppable.methods.createMouseMoveHandler(b)),gj.documentManager.subscribeForEvent("mouseup",b.data("guid"),gj.droppable.methods.createMouseUpHandler(b)),b},createMouseDownHandler:function(a){return function(b){a.isDragging=!0}},createMouseMoveHandler:function(a){return function(b){if(a.isDragging){var c=a.data("hoverClass"),d={left:a.mouseX(b),top:a.mouseY(b)},e=gj.droppable.methods.isOver(a,d);e!=a.isOver&&(e?(c&&a.addClass(c),gj.droppable.events.over(a,d)):(c&&a.removeClass(c),gj.droppable.events.out(a))),a.isOver=e}}},createMouseUpHandler:function(a){return function(b){var c={left:a.mouseX(b),top:a.mouseY(b)};a.isDragging=!1,gj.droppable.methods.isOver(a,c)&&gj.droppable.events.drop(a)}},isOver:function(a,b){var c=a.offset().top;return offsetLeft=a.offset().left,b.left>offsetLeft&&b.left<offsetLeft+a.outerWidth(!0)&&b.top>c&&b.top<c+a.outerHeight(!0)},destroy:function(a){return"true"===a.attr("data-droppable")&&(gj.documentManager.unsubscribeForEvent("mousedown",a.data("guid")),gj.documentManager.unsubscribeForEvent("mousemove",a.data("guid")),gj.documentManager.unsubscribeForEvent("mouseup",a.data("guid")),a.removeData(),a.removeAttr("data-guid"),a.removeAttr("data-droppable"),a.off("drop").off("over").off("out")),a}},gj.droppable.events={drop:function(a,b,c){a.trigger("drop",[{top:c,left:b}])},over:function(a,b){a.trigger("over",[b])},out:function(a){a.trigger("out")}},gj.droppable.widget=function(a,b){var c=this,d=gj.droppable.methods;return c.isOver=!1,c.isDragging=!1,c.destroy=function(){return d.destroy(this)},c.isOver=function(a){return d.isOver(this,a)},$.extend(a,c),"true"!==a.attr("data-droppable")&&d.init.call(a,b),a},gj.droppable.widget.prototype=new gj.widget,gj.droppable.widget.constructor=gj.droppable.widget,function(a){a.fn.droppable=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.droppable.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.droppable.widget(this,a)}}}(jQuery),gj.grid={plugins:{},messages:{}},gj.grid.config={base:{dataSource:void 0,columns:[],autoGenerateColumns:!1,defaultColumnSettings:{hidden:!1,width:void 0,sortable:!1,type:"text",title:void 0,field:void 0,align:void 0,cssClass:void 0,headerCssClass:void 0,tooltip:void 0,icon:void 0,events:void 0,format:"mm/dd/yyyy",decimalDigits:void 0,tmpl:void 0,stopPropagation:!1,renderer:void 0,filter:void 0},mapping:{dataField:"records",totalRecordsField:"total"},params:{},paramNames:{sortBy:"sortBy",direction:"direction"},uiLibrary:"materialdesign",iconsLibrary:"materialicons",selectionType:"single",selectionMethod:"basic",autoLoad:!0,notFoundText:void 0,width:void 0,minWidth:void 0,fontSize:void 0,primaryKey:void 0,locale:"en-us",defaultIconColumnWidth:70,defaultCheckBoxColumnWidth:70,style:{wrapper:"gj-grid-wrapper",table:"gj-grid gj-grid-md",loadingCover:"gj-grid-loading-cover",loadingText:"gj-grid-loading-text",header:{cell:void 0,sortable:"gj-cursor-pointer"},content:{rowSelected:"gj-grid-md-select"}},icons:{asc:"▲",desc:"▼"}},bootstrap:{style:{wrapper:"gj-grid-wrapper",table:"gj-grid gj-grid-bootstrap gj-grid-bootstrap-3 table table-bordered table-hover",content:{rowSelected:"active"}},iconsLibrary:"glyphicons",defaultIconColumnWidth:34,defaultCheckBoxColumnWidth:36},bootstrap4:{style:{wrapper:"gj-grid-wrapper",table:"gj-grid gj-grid-bootstrap gj-grid-bootstrap-4 table table-bordered table-hover",content:{rowSelected:"active"}},defaultIconColumnWidth:42,defaultCheckBoxColumnWidth:44},materialicons:{icons:{asc:'<i class="gj-icon arrow-upward" />',desc:'<i class="gj-icon arrow-downward" />'}},fontawesome:{icons:{asc:'<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>',desc:'<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>'}},glyphicons:{icons:{asc:'<span class="glyphicon glyphicon-sort-by-alphabet" />',desc:'<span class="glyphicon glyphicon-sort-by-alphabet-alt" />'}}},gj.grid.events={beforeEmptyRowInsert:function(a,b){return a.triggerHandler("beforeEmptyRowInsert",[b])},dataBinding:function(a,b){return a.triggerHandler("dataBinding",[b])},dataBound:function(a,b,c){return a.triggerHandler("dataBound",[b,c])},rowDataBound:function(a,b,c,d){return a.triggerHandler("rowDataBound",[b,c,d])},cellDataBound:function(a,b,c,d,e){return a.triggerHandler("cellDataBound",[b,c,d,e])},rowSelect:function(a,b,c,d){return a.triggerHandler("rowSelect",[b,c,d])},rowUnselect:function(a,b,c,d){return a.triggerHandler("rowUnselect",[b,c,d])},rowRemoving:function(a,b,c,d){return a.triggerHandler("rowRemoving",[b,c,d])},destroying:function(a){return a.triggerHandler("destroying")},columnHide:function(a,b){return a.triggerHandler("columnHide",[b])},columnShow:function(a,b){return a.triggerHandler("columnShow",[b])},initialized:function(a){return a.triggerHandler("initialized")},dataFiltered:function(a,b){return a.triggerHandler("dataFiltered",[b])}},gj.grid.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"grid"),gj.grid.methods.initialize(this),this.data("autoLoad")&&this.reload(),this},getConfig:function(a,b){var c=gj.widget.prototype.getConfig.call(this,a,b);return gj.grid.methods.setDefaultColumnConfig(c.columns,c.defaultColumnSettings),c},setDefaultColumnConfig:function(a,b){var c,d;if(a&&a.length)for(d=0;d<a.length;d++)c=$.extend(!0,{},b),$.extend(!0,c,a[d]),a[d]=c},getHTMLConfig:function(){var a=gj.widget.prototype.getHTMLConfig.call(this);return a.columns=[],this.find("thead > tr > th").each(function(){var b=$(this),c=b.text(),d=gj.widget.prototype.getHTMLConfig.call(b);d.title=c,d.field||(d.field=c),d.events&&(d.events=gj.grid.methods.eventsParser(d.events)),a.columns.push(d)}),a},eventsParser:function(events){var result={},list,i,key,func,position;for(list=events.split(","),i=0;i<list.length;i++)(position=list[i].indexOf(":"))>0&&(key=$.trim(list[i].substr(0,position)),func=$.trim(list[i].substr(position+1,list[i].length)),result[key]=eval("window."+func));return result},initialize:function(a){var b=a.data(),c=a.parent('div[data-role="wrapper"]');gj.grid.methods.localization(b),0===c.length?(c=$('<div data-role="wrapper" />').addClass(b.style.wrapper),a.wrap(c)):c.addClass(b.style.wrapper),b.width&&a.parent().css("width",b.width),b.minWidth&&a.css("min-width",b.minWidth),b.fontSize&&a.css("font-size",b.fontSize),a.addClass(b.style.table),"checkbox"===b.selectionMethod&&b.columns.splice(gj.grid.methods.getColumnPositionNotInRole(a),0,{title:"",width:b.defaultCheckBoxColumnWidth,align:"center",type:"checkbox",role:"selectRow",events:{click:function(b){gj.grid.methods.setSelected(a,b.data.id,$(this).closest("tr"))}},headerCssClass:"gj-grid-select-all",stopPropagation:!0}),0===a.children("tbody").length&&a.append($("<tbody/>")),gj.grid.methods.renderHeader(a),gj.grid.methods.appendEmptyRow(a,"&nbsp;"),gj.grid.events.initialized(a)},localization:function(a){a.notFoundText||(a.notFoundText=gj.grid.messages[a.locale].NoRecordsFound)},renderHeader:function(a){var b,c,d,e,f,g,h,i,j;for(b=a.data(),c=b.columns,d=b.style.header,e=a.children("thead"),0===e.length&&(e=$("<thead />"),a.prepend(e)),f=$('<tr data-role="caption" />'),i=0;i<c.length;i+=1)g=$('<th data-field="'+(c[i].field||"")+'" />'),c[i].width?g.attr("width",c[i].width):"checkbox"===c[i].type&&g.attr("width",b.defaultIconColumnWidth),g.addClass(d.cell),c[i].headerCssClass&&g.addClass(c[i].headerCssClass),g.css("text-align",c[i].align||"left"),"checkbox"===b.selectionMethod&&"multiple"===b.selectionType&&"checkbox"===c[i].type&&"selectRow"===c[i].role?(j=g.find('input[data-role="selectAll"]'),0===j.length&&(j=$('<input type="checkbox" data-role="selectAll" />'),g.append(j),j.checkbox({uiLibrary:b.uiLibrary})),j.off("click").on("click",function(){this.checked?a.selectAll():a.unSelectAll()})):(h=$('<div data-role="title"/>').html(void 0===c[i].title?c[i].field:c[i].title),g.append(h),c[i].sortable&&(h.addClass(d.sortable),h.on("click",gj.grid.methods.createSortHandler(a,c[i])))),c[i].hidden&&g.hide(),f.append(g);e.empty().append(f)},createSortHandler:function(a,b){return function(){var c,d={};a.count()>0&&(c=a.data(),d[c.paramNames.sortBy]=b.field,b.direction="asc"===b.direction?"desc":"asc",d[c.paramNames.direction]=b.direction,a.reload(d))}},updateHeader:function(a){var b,c,d=a.data(),e=d.params[d.paramNames.sortBy],f=d.params[d.paramNames.direction];a.find('thead tr th [data-role="sorticon"]').remove(),e&&(position=gj.grid.methods.getColumnPosition(a.data("columns"),e),position>-1&&(c=a.find("thead tr th:eq("+position+') div[data-role="title"]'),b=$('<div data-role="sorticon" class="gj-unselectable" />').append("desc"===f?d.icons.desc:d.icons.asc),c.after(b)))},useHtmlDataSource:function(a,b){var c,d,e,f,g=[],h=a.find('tbody tr[data-role != "empty"]');for(c=0;c<h.length;c++){for(e=$(h[c]).find("td"),f={},d=0;d<e.length;d++)f[b.columns[d].field]=$(e[d]).html();g.push(f)}b.dataSource=g},startLoading:function(a){var b,c,d,e,f,g,h;gj.grid.methods.stopLoading(a),h=a.data(),0!==a.outerHeight()&&(b=a.children("tbody"),e=b.outerWidth(!1),f=b.outerHeight(!1),g=Math.abs(a.parent().offset().top-b.offset().top),c=$('<div data-role="loading-cover" />').addClass(h.style.loadingCover).css({width:e,height:f,top:g}),d=$('<div data-role="loading-text">'+gj.grid.messages[h.locale].Loading+"</div>").addClass(h.style.loadingText),d.insertAfter(a),c.insertAfter(a),d.css({top:g+f/2-d.outerHeight(!1)/2,left:e/2-d.outerWidth(!1)/2}))},stopLoading:function(a){a.parent().find('div[data-role="loading-cover"]').remove(),a.parent().find('div[data-role="loading-text"]').remove()},appendEmptyRow:function(a,b){var c,d,e,f;c=a.data(),d=$('<tr data-role="empty"/>'),e=$("<td/>").css({width:"100%","text-align":"center"}),e.attr("colspan",gj.grid.methods.countVisibleColumns(a)),f=$("<div />").html(b||c.notFoundText),e.append(f),d.append(e),gj.grid.events.beforeEmptyRowInsert(a,d),a.append(d)},autoGenerateColumns:function(a,b){var c,d,e,f,g=a.data();if(g.columns=[],b.length>0){for(c=Object.getOwnPropertyNames(b[0]),f=0;f<c.length;f++)d=b[0][c[f]],e="text",d&&("number"==typeof d?e="number":d.indexOf("/Date(")>-1&&(e="date")),g.columns.push({field:c[f],type:e});gj.grid.methods.setDefaultColumnConfig(g.columns,g.defaultColumnSettings)}gj.grid.methods.renderHeader(a)},loadData:function(a){var b,c,d,e,f,g,h,i;for(b=a.data(),c=a.getAll(),gj.grid.events.dataBinding(a,c),e=c.length,gj.grid.methods.stopLoading(a),b.autoGenerateColumns&&gj.grid.methods.autoGenerateColumns(a,c),g=a.children("tbody"),"checkbox"===b.selectionMethod&&"multiple"===b.selectionType&&a.find('thead input[data-role="selectAll"]').prop("checked",!1),g.children("tr").not('[data-role="row"]').remove(),0===e&&(g.empty(),gj.grid.methods.appendEmptyRow(a)),h=g.children("tr"),f=h.length,d=0;d<f;d++){if(!(d<e)){g.find('tr[data-role="row"]:gt('+(d-1)+")").remove();break}i=h.eq(d),gj.grid.methods.renderRow(a,i,c[d],d)}for(d=f;d<e;d++)gj.grid.methods.renderRow(a,null,c[d],d);gj.grid.events.dataBound(a,c,b.totalRecords)},getId:function(a,b,c){return b&&a[b]?a[b]:c},renderRow:function(a,b,c,d){var e,f,g,h,i;for(h=a.data(),b&&0!==b.length?(i="update",b.removeClass(h.style.content.rowSelected).removeAttr("data-selected").off("click")):(i="create",b=$('<tr data-role="row"/>'),a.children("tbody").append(b)),e=gj.grid.methods.getId(c,h.primaryKey,d+1),b.attr("data-position",d+1),"checkbox"!==h.selectionMethod&&b.on("click",gj.grid.methods.createRowClickHandler(a,e)),g=0;g<h.columns.length;g++)"update"===i?(f=b.find("td:eq("+g+")"),gj.grid.methods.renderCell(a,f,h.columns[g],c,e)):(f=gj.grid.methods.renderCell(a,null,h.columns[g],c,e),b.append(f));gj.grid.events.rowDataBound(a,b,e,c)},renderCell:function(a,b,c,d,e,f){var g,h;if(b&&0!==b.length?(g=b.find('div[data-role="display"]'),f="update"):(b=$("<td/>"),g=$('<div data-role="display" />'),c.align&&b.css("text-align",c.align),c.cssClass&&b.addClass(c.cssClass),b.append(g),f="create"),gj.grid.methods.renderDisplayElement(a,g,c,d,e,f),"update"===f&&(b.off(),g.off()),c.events)for(h in c.events)c.events.hasOwnProperty(h)&&b.on(h,{id:e,field:c.field,record:d},gj.grid.methods.createCellEventHandler(c,c.events[h]));return c.hidden&&b.hide(),gj.grid.events.cellDataBound(a,g,e,c,d),b},createCellEventHandler:function(a,b){return function(c){a.stopPropagation&&c.stopPropagation(),b.call(this,c)}},renderDisplayElement:function(a,b,c,d,e,f){var g,h;"checkbox"===c.type&&gj.checkbox?"create"===f?(h=$('<input type="checkbox" />').val(e).prop("checked",!!d[c.field]),c.role&&h.attr("data-role",c.role),b.append(h),h.checkbox({uiLibrary:a.data("uiLibrary")}),"selectRow"===c.role?h.on("click",function(){return!1}):h.prop("disabled",!0)):b.find('input[type="checkbox"]').val(e).prop("checked",!!d[c.field]):"icon"===c.type?"create"===f&&(b.append($("<span/>").addClass(c.icon).css({cursor:"pointer"})),"bootstrap"===a.data().uiLibrary&&b.children("span").addClass("glyphicon"),c.stopPropagation=!0):c.tmpl?(g=c.tmpl,c.tmpl.replace(/\{(.+?)\}/g,function(a,b){g=g.replace(a,gj.grid.methods.formatText(d[b],c))}),b.html(g)):c.renderer&&"function"==typeof c.renderer?(g=c.renderer(d[c.field],d,b.parent(),b,e,a))&&b.html(g):(d[c.field]=gj.grid.methods.formatText(d[c.field],c),!c.tooltip&&d[c.field]&&b.attr("title",d[c.field]),b.html(d[c.field])),c.tooltip&&"create"===f&&b.attr("title",c.tooltip)},formatText:function(a,b){return a=a&&"date"===b.type?gj.core.formatDate(gj.core.parseDate(a,b.format),b.format):void 0===a||null===a?"":a.toString(),b.decimalDigits&&a&&(a=parseFloat(a).toFixed(b.decimalDigits)),a},setRecordsData:function(a,b){var c=[],d=0,e=a.data();return $.isArray(b)?(c=b,d=b.length):e&&e.mapping&&$.isArray(b[e.mapping.dataField])&&(c=b[e.mapping.dataField],(d=b[e.mapping.totalRecordsField])&&!isNaN(d)||(d=0)),a.data("records",c),a.data("totalRecords",d),c},createRowClickHandler:function(a,b){return function(){gj.grid.methods.setSelected(a,b,$(this))}},selectRow:function(a,b,c,d){var e;return c.addClass(b.style.content.rowSelected),c.attr("data-selected","true"),"checkbox"===b.selectionMethod&&(e=c.find('input[type="checkbox"][data-role="selectRow"]'),e.length&&!e.prop("checked")&&e.prop("checked",!0),"multiple"===b.selectionType&&a.getSelections().length===a.count(!1)&&a.find('thead input[data-role="selectAll"]').prop("checked",!0)),gj.grid.events.rowSelect(a,c,d,a.getById(d))},unselectRow:function(a,b,c,d){var e;if("true"===c.attr("data-selected"))return c.removeClass(b.style.content.rowSelected),"checkbox"===b.selectionMethod&&(e=c.find('td input[type="checkbox"][data-role="selectRow"]'),e.length&&e.prop("checked")&&e.prop("checked",!1),"multiple"===b.selectionType&&a.find('thead input[data-role="selectAll"]').prop("checked",!1)),c.removeAttr("data-selected"),gj.grid.events.rowUnselect(a,c,d,a.getById(d))},setSelected:function(a,b,c){var d=a.data();return c&&c.length||(c=gj.grid.methods.getRowById(a,b)),c&&("true"===c.attr("data-selected")?gj.grid.methods.unselectRow(a,d,c,b):("single"===d.selectionType&&c.siblings('[data-selected="true"]').each(function(){var b=$(this),c=gj.grid.methods.getId(b,d.primaryKey,b.data("position"));gj.grid.methods.unselectRow(a,d,b,c)}),gj.grid.methods.selectRow(a,d,c,b))),a},selectAll:function(a){var b=a.data();return a.find('tbody tr[data-role="row"]').each(function(){var c=$(this),d=c.data("position"),e=a.get(d),f=gj.grid.methods.getId(e,b.primaryKey,d);gj.grid.methods.selectRow(a,b,c,f)}),a.find('thead input[data-role="selectAll"]').prop("checked",!0),a},unSelectAll:function(a){var b=a.data();return a.find("tbody tr").each(function(){var c=$(this),d=c.data("position"),e=a.get(d),f=gj.grid.methods.getId(e,b.primaryKey,d);gj.grid.methods.unselectRow(a,b,c,f),c.find('input[type="checkbox"][data-role="selectRow"]').prop("checked",!1)}),a.find('thead input[data-role="selectAll"]').prop("checked",!1),a},getSelected:function(a){var b,c,d,e=null;return b=a.find('tbody>tr[data-selected="true"]'),b.length>0&&(d=$(b[0]).data("position"),c=a.get(d),e=gj.grid.methods.getId(c,a.data().primaryKey,d)),e},getSelectedRows:function(a){a.data();return a.find('tbody>tr[data-selected="true"]')},getSelections:function(a){var b,c,d=[],e=a.data(),f=gj.grid.methods.getSelectedRows(a);return 0<f.length&&f.each(function(){b=$(this).data("position"),c=a.get(b),d.push(gj.grid.methods.getId(c,e.primaryKey,b))}),d},getById:function(a,b){var c,d=null,e=a.data("primaryKey"),f=a.data("records");if(e){for(c=0;c<f.length;c++)if(f[c][e]==b){d=f[c];break}}else d=a.get(b);return d},getRecVPosById:function(a,b){var c,d=b,e=a.data();if(e.primaryKey)for(c=0;c<e.dataSource.length;c++)if(e.dataSource[c][e.primaryKey]==b){d=c;break}return d},getRowById:function(a,b){var c,d,e=a.getAll(!1),f=a.data("primaryKey"),g=void 0;if(f){for(d=0;d<e.length;d++)if(e[d][f]==b){c=d+1;break}}else c=b;return c&&(g=a.find('tbody > tr[data-position="'+c+'"]')),g},getByPosition:function(a,b){return a.getAll(!1)[b-1]},getColumnPosition:function(a,b){var c,d=-1;for(c=0;c<a.length;c++)if(a[c].field===b){d=c;break}return d},getColumnInfo:function(a,b){var c,d={},e=a.data();for(c=0;c<e.columns.length;c+=1)if(e.columns[c].field===b){d=e.columns[c];break}return d},getCell:function(a,b,c){var d,e,f=null;return d=gj.grid.methods.getColumnPosition(a.data("columns"),c),d>-1&&(e=gj.grid.methods.getRowById(a,b),f=e.find("td:eq("+d+') div[data-role="display"]')),f},setCellContent:function(a,b,c,d){var e,f=gj.grid.methods.getCell(a,b,c);f&&(f.empty(),"object"==typeof d?f.append(d):(e=gj.grid.methods.getColumnInfo(a,c),gj.grid.methods.renderDisplayElement(a,f,e,a.getById(b),b,"update")))},clone:function(a){var b=[];return $.each(a,function(){b.push(this.clone())}),b},getAll:function(a){return a.data("records")},countVisibleColumns:function(a){var b,c,d;for(b=a.data().columns,c=0,d=0;d<b.length;d++)!0!==b[d].hidden&&c++;return c},clear:function(a,b){var c=a.data();return a.xhr&&a.xhr.abort(),a.children("tbody").empty(),c.records=[],gj.grid.methods.stopLoading(a),gj.grid.methods.appendEmptyRow(a,b?c.notFoundText:"&nbsp;"),gj.grid.events.dataBound(a,[],0),a},render:function(a,b){return b&&(gj.grid.methods.setRecordsData(a,b),gj.grid.methods.updateHeader(a),gj.grid.methods.loadData(a)),a},filter:function(a){var b,c,d=a.data(),e=d.dataSource.slice();d.params[d.paramNames.sortBy]&&(c=gj.grid.methods.getColumnInfo(a,d.params[d.paramNames.sortBy]),e.sort(c.sortable.sorter?c.sortable.sorter(c.direction,c):gj.grid.methods.createDefaultSorter(c.direction,c.field)));for(b in d.params)d.params[b]&&!d.paramNames[b]&&(c=gj.grid.methods.getColumnInfo(a,b),e=$.grep(e,function(a){var e=a[b]||"",f=d.params[b]||"";return c&&"function"==typeof c.filter?c.filter(e,f):e.toUpperCase().indexOf(f.toUpperCase())>-1}));return gj.grid.events.dataFiltered(a,e),e},createDefaultSorter:function(a,b){return function(c,d){var e=(c[b]||"").toString(),f=(d[b]||"").toString();return"asc"===a?e.localeCompare(f):f.localeCompare(e)}},destroy:function(a,b,c){return a.data()&&(gj.grid.events.destroying(a),gj.grid.methods.stopLoading(a),a.xhr&&a.xhr.abort(),a.off(),!1===c&&a.parent('div[data-role="wrapper"]').length>0&&a.unwrap(),a.removeData(),!1===b?a.remove():a.removeClass().empty(),a.removeAttr("data-type")),a},showColumn:function(a,b){var c,d=a.data(),e=gj.grid.methods.getColumnPosition(d.columns,b);return e>-1&&(a.find("thead>tr").each(function(){$(this).children("th").eq(e).show()}),$.each(a.find("tbody>tr"),function(){$(this).children("td").eq(e).show()}),d.columns[e].hidden=!1,c=a.find('tbody > tr[data-role="empty"] > td'),c&&c.length&&c.attr("colspan",gj.grid.methods.countVisibleColumns(a)),gj.grid.events.columnShow(a,d.columns[e])),a},hideColumn:function(a,b){var c,d=a.data(),e=gj.grid.methods.getColumnPosition(d.columns,b);return e>-1&&(a.find("thead>tr").each(function(){$(this).children("th").eq(e).hide()}),$.each(a.find("tbody>tr"),function(){$(this).children("td").eq(e).hide()}),d.columns[e].hidden=!0,c=a.find('tbody > tr[data-role="empty"] > td'),c&&c.length&&c.attr("colspan",gj.grid.methods.countVisibleColumns(a)),gj.grid.events.columnHide(a,d.columns[e])),a},isLastRecordVisible:function(){return!0},addRow:function(a,b){var c=a.data();return c.totalRecords=a.data("totalRecords")+1,gj.grid.events.dataBinding(a,[b]),c.records.push(b),$.isArray(c.dataSource)&&c.dataSource.push(b),1===c.totalRecords&&a.children("tbody").empty(),gj.grid.methods.isLastRecordVisible(a)&&gj.grid.methods.renderRow(a,null,b,a.count()-1),gj.grid.events.dataBound(a,[b],c.totalRecords),a},updateRow:function(a,b,c){var d,e=gj.grid.methods.getRowById(a,b),f=a.data();return f.records[e.data("position")-1]=c,$.isArray(f.dataSource)&&(d=gj.grid.methods.getRecVPosById(a,b),f.dataSource[d]=c),gj.grid.methods.renderRow(a,e,c,e.index()),a},removeRow:function(a,b){var c,d=a.data(),e=gj.grid.methods.getRowById(a,b);return gj.grid.events.rowRemoving(a,e,b,a.getById(b)),$.isArray(d.dataSource)&&(c=gj.grid.methods.getRecVPosById(a,b),d.dataSource.splice(c,1)),a.reload(),a},count:function(a,b){return b?a.data().totalRecords:a.getAll().length},getColumnPositionByRole:function(a,b){var c,d,e=a.data("columns");for(c=0;c<e.length;c++)if(e[c].role===b){d=c;break}return d},getColumnPositionNotInRole:function(a){var b,c=0,d=a.data("columns");for(b=0;b<d.length;b++)if(!d[b].role){c=b;break}return c}},gj.grid.widget=function(a,b){var c=this,d=gj.grid.methods;return c.reload=function(a){return d.startLoading(this),gj.widget.prototype.reload.call(this,a)},c.clear=function(a){return d.clear(this,a)},c.count=function(a){return d.count(this,a)},c.render=function(b){return d.render(a,b)},c.destroy=function(a,b){return d.destroy(this,a,b)},c.setSelected=function(a){return d.setSelected(this,a)},c.getSelected=function(){return d.getSelected(this)},c.getSelections=function(){return d.getSelections(this)},c.selectAll=function(){return d.selectAll(this)},c.unSelectAll=function(){return d.unSelectAll(this)},c.getById=function(a){return d.getById(this,a)},c.get=function(a){return d.getByPosition(this,a)},c.getAll=function(a){return d.getAll(this,a)},c.showColumn=function(a){return d.showColumn(this,a)},c.hideColumn=function(a){return d.hideColumn(this,a)},c.addRow=function(a){return d.addRow(this,a)},c.updateRow=function(a,b){return d.updateRow(this,a,b)},c.setCellContent=function(a,b,c){d.setCellContent(this,a,b,c)},c.removeRow=function(a){return d.removeRow(this,a)},$.extend(a,c),"grid"!==a.attr("data-type")&&d.init.call(a,b),a},gj.grid.widget.prototype=new gj.widget,gj.grid.widget.constructor=gj.grid.widget,gj.grid.widget.prototype.getConfig=gj.grid.methods.getConfig,gj.grid.widget.prototype.getHTMLConfig=gj.grid.methods.getHTMLConfig,function(a){a.fn.grid=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.grid.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.grid.widget(this,a)}}}(jQuery),gj.grid.plugins.expandCollapseRows={config:{base:{detailTemplate:void 0,keepExpandedRows:!0,expandedRows:[],icons:{expandRow:'<i class="gj-icon chevron-right" />',collapseRow:'<i class="gj-icon chevron-down" />'}},fontawesome:{icons:{expandRow:'<i class="fa fa-angle-right" aria-hidden="true"></i>',collapseRow:'<i class="fa fa-angle-down" aria-hidden="true"></i>'}},glyphicons:{icons:{expandRow:'<span class="glyphicon glyphicon-chevron-right" />',collapseRow:'<span class="glyphicon glyphicon-chevron-down" />'}}},private:{detailExpand:function(a,b){var c=b.closest("tr"),d=$('<tr data-role="details" />'),e=$('<td colspan="'+gj.grid.methods.countVisibleColumns(a)+'" />'),f=$('<div data-role="display" />'),g=a.data(),h=c.data("position"),i=a.get(h),j=gj.grid.methods.getId(i,g.primaryKey,i);d.append(e.append(f.append(c.data("details")))),d.insertAfter(c),b.children('div[data-role="display"]').empty().append(g.icons.collapseRow),a.updateDetails(c),gj.grid.plugins.expandCollapseRows.events.detailExpand(a,d.find("td>div"),j)},detailCollapse:function(a,b){var c=b.closest("tr"),d=c.next('tr[data-role="details"]'),e=a.data(),f=gj.grid.methods.getId(c,e.primaryKey,c.data("position"));d.remove(),b.children('div[data-role="display"]').empty().append(e.icons.expandRow),gj.grid.plugins.expandCollapseRows.events.detailCollapse(a,d.find("td>div"),f)},keepSelection:function(a,b){var c=a.data();c.keepExpandedRows&&($.isArray(c.expandedRows)?-1==c.expandedRows.indexOf(b)&&c.expandedRows.push(b):c.expandedRows=[b])},removeSelection:function(a,b){var c=a.data();c.keepExpandedRows&&$.isArray(c.expandedRows)&&c.expandedRows.indexOf(b)>-1&&c.expandedRows.splice(c.expandedRows.indexOf(b),1)},updateDetailsColSpan:function(a){var b=a.find('tbody > tr[data-role="details"] > td');b&&b.length&&b.attr("colspan",gj.grid.methods.countVisibleColumns(a))}},public:{collapseAll:function(){var a=this,b=gj.grid.methods.getColumnPositionByRole(a,"expander");a.find('tbody tr[data-role="row"]').each(function(){gj.grid.plugins.expandCollapseRows.private.detailCollapse(a,$(this).find("td:eq("+b+")"))})},expandAll:function(){var a=this,b=gj.grid.methods.getColumnPositionByRole(a,"expander");a.find('tbody tr[data-role="row"]').each(function(){gj.grid.plugins.expandCollapseRows.private.detailExpand(a,$(this).find("td:eq("+b+")"))})},updateDetails:function(a){var b=this,c=a.data("details"),d=c.html(),e=b.get(a.data("position"));e&&d&&(c.html().replace(/\{(.+?)\}/g,function(a,c){var f=gj.grid.methods.getColumnInfo(b,c);d=d.replace(a,gj.grid.methods.formatText(e[c],f))}),c.html(d))}},events:{detailExpand:function(a,b,c){a.triggerHandler("detailExpand",[b,c])},detailCollapse:function(a,b,c){a.triggerHandler("detailCollapse",[b,c])}},configure:function(a){var b,c=a.data();$.extend(!0,a,gj.grid.plugins.expandCollapseRows.public),void 0!==c.detailTemplate&&(b={title:"",width:c.defaultIconColumnWidth,align:"center",stopPropagation:!0,cssClass:"gj-cursor-pointer gj-unselectable",tmpl:c.icons.expandRow,role:"expander",events:{click:function(b){var c=$(this),d=gj.grid.plugins.expandCollapseRows.private;"details"===c.closest("tr").next().attr("data-role")?(d.detailCollapse(a,c),d.removeSelection(a,b.data.id)):(d.detailExpand(a,$(this)),d.keepSelection(a,b.data.id))}}},c.columns=[b].concat(c.columns),a.on("rowDataBound",function(a,b,d,e){b.data("details",$(c.detailTemplate))}),a.on("columnShow",function(b,c){gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan(a)}),a.on("columnHide",function(b,c){gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan(a)}),a.on("rowRemoving",function(b,c,d,e){gj.grid.plugins.expandCollapseRows.private.detailCollapse(a,c.children("td").first())}),a.on("dataBinding",function(){a.collapseAll()}),a.on("pageChanging",function(){a.collapseAll()}),a.on("dataBound",function(){var b,c,d,e,f=a.data();if(f.keepExpandedRows&&$.isArray(f.expandedRows))for(b=0;b<f.expandedRows.length;b++)(d=gj.grid.methods.getRowById(a,f.expandedRows[b]))&&d.length&&(e=gj.grid.methods.getColumnPositionByRole(a,"expander"),(c=d.children("td:eq("+e+")"))&&c.length&&gj.grid.plugins.expandCollapseRows.private.detailExpand(a,c))}))}},gj.grid.plugins.inlineEditing={renderers:{editManager:function(a,b,c,d,e,f){var g=f.data(),h=$(g.inlineEditing.editButton).attr("data-key",e),i=$(g.inlineEditing.deleteButton).attr("data-key",e),j=$(g.inlineEditing.updateButton).attr("data-key",e).hide(),k=$(g.inlineEditing.cancelButton).attr("data-key",e).hide();h.on("click",function(a){f.edit($(this).data("key")),h.hide(),i.hide(),j.show(),k.show()}),i.on("click",function(a){f.removeRow($(this).data("key"))}),j.on("click",function(a){f.update($(this).data("key")),h.show(),i.show(),j.hide(),k.hide()}),k.on("click",function(a){f.cancel($(this).data("key")),h.show(),i.show(),j.hide(),k.hide()}),d.empty().append(h).append(i).append(j).append(k)}}},gj.grid.plugins.inlineEditing.config={base:{defaultColumnSettings:{editor:void 0,mode:"readEdit"},inlineEditing:{mode:"click",managementColumn:!0,managementColumnConfig:{width:300,align:"center",renderer:gj.grid.plugins.inlineEditing.renderers.editManager,cssClass:"gj-grid-management-column"}}},bootstrap:{inlineEditing:{managementColumnConfig:{width:200,align:"center",renderer:gj.grid.plugins.inlineEditing.renderers.editManager,cssClass:"gj-grid-management-column"}}},bootstrap4:{inlineEditing:{managementColumnConfig:{width:280,align:"center",renderer:gj.grid.plugins.inlineEditing.renderers.editManager,cssClass:"gj-grid-management-column"}}}},gj.grid.plugins.inlineEditing.private={localization:function(a){"bootstrap"===a.uiLibrary?(a.inlineEditing.editButton='<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> '+gj.grid.messages[a.locale].Edit+"</button>",a.inlineEditing.deleteButton='<button type="button" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> '+gj.grid.messages[a.locale].Delete+"</button>",a.inlineEditing.updateButton='<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> '+gj.grid.messages[a.locale].Update+"</button>",a.inlineEditing.cancelButton='<button type="button" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> '+gj.grid.messages[a.locale].Cancel+"</button>"):(a.inlineEditing.editButton='<button class="gj-button-md"><i class="gj-icon pencil" /> '+gj.grid.messages[a.locale].Edit.toUpperCase()+"</button>",a.inlineEditing.deleteButton='<button class="gj-button-md"><i class="gj-icon delete" /> '+gj.grid.messages[a.locale].Delete.toUpperCase()+"</button>",a.inlineEditing.updateButton='<button class="gj-button-md"><i class="gj-icon check-circle" /> '+gj.grid.messages[a.locale].Update.toUpperCase()+"</button>",a.inlineEditing.cancelButton='<button class="gj-button-md"><i class="gj-icon cancel" /> '+gj.grid.messages[a.locale].Cancel.toUpperCase()+"</button>")},editMode:function(a,b,c,d){var e,f,g,h,i,j=a.data();"edit"!==b.attr("data-mode")&&c.editor&&(gj.grid.plugins.inlineEditing.private.updateOtherCells(a,c.mode),e=b.find('div[data-role="display"]').hide(),f=b.find('div[data-role="edit"]').show(),0===f.length&&(f=$('<div data-role="edit" />'),b.append(f)),h="checkbox"===c.type?d[c.field]:e.html(),g=f.find("input, select, textarea").first(),g.length?"checkbox"===c.type?g.prop("checked",h):g.val(h):("function"==typeof c.editor?c.editor(f,h,d):(i="object"==typeof c.editor?c.editor:{},i.uiLibrary=j.uiLibrary,i.iconsLibrary=j.iconsLibrary,i.fontSize=a.css("font-size"),"checkbox"===c.type&&gj.checkbox?(g=$('<input type="checkbox" />').prop("checked",h),f.append(g),g.checkbox(i)):"date"===c.type&&gj.datepicker?(g=$('<input type="text" width="100%"/>'),f.append(g),g=g.datepicker(i),g.value&&g.value(e.html())):"dropdown"===c.type&&gj.dropdown?(g=$('<select type="text" width="100%"/>'),f.append(g),g=g.dropdown(i),g.value&&g.value(e.html())):(g=$('<input type="text" value="'+h+'" class="gj-width-full"/>'),"materialdesign"===j.uiLibrary&&g.addClass("gj-textbox-md").css("font-size",a.css("font-size")),f.append(g))),"command"!==j.inlineEditing.mode&&"editOnly"!==c.mode&&(g=f.find("input, select, textarea").first(),g.on("keyup",function(d){13!==d.keyCode&&27!==d.keyCode||gj.grid.plugins.inlineEditing.private.displayMode(a,b,c)}))),"INPUT"===g.prop("tagName").toUpperCase()&&"TEXT"===g.prop("type").toUpperCase()?gj.grid.plugins.inlineEditing.private.setCaretAtEnd(g[0]):g.focus(),b.attr("data-mode","edit"))},setCaretAtEnd:function(a){var b;if(a)if(b=a.value.length,document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-b),c.moveStart("character",b),c.moveEnd("character",0),c.select()}else(a.selectionStart||"0"==a.selectionStart)&&(a.selectionStart=b,a.selectionEnd=b,a.focus())},displayMode:function(a,b,c,d){var e,f,g,h,i,j,k;"edit"===b.attr("data-mode")&&"editOnly"!==c.mode&&(e=b.find('div[data-role="edit"]'),f=b.find('div[data-role="display"]'),g=e.find("input, select, textarea").first(),h="checkbox"===c.type?g.prop("checked"):g.val(),k=b.parent().data("position"),j=a.get(k),i="checkbox"===c.type?j[c.field]:f.html(),!0!==d&&h!==i&&(j[c.field]="date"===c.type?gj.core.parseDate(h,c.format):h,"editOnly"!==c.mode&&(gj.grid.methods.renderDisplayElement(a,f,c,j,gj.grid.methods.getId(j,a.data("primaryKey"),k),"update"),0===b.find("span.gj-dirty").length&&b.prepend($('<span class="gj-dirty" />'))),gj.grid.plugins.inlineEditing.events.cellDataChanged(a,b,c,j,i,h),gj.grid.plugins.inlineEditing.private.updateChanges(a,c,j,h)),e.hide(),f.show(),b.attr("data-mode","display"))},updateOtherCells:function(a,b){var c=a.data();"command"!==c.inlineEditing.mode&&"editOnly"!==b&&a.find('div[data-role="edit"]:visible').parent("td").each(function(){var b=$(this),d=c.columns[b.index()];gj.grid.plugins.inlineEditing.private.displayMode(a,b,d)})},updateChanges:function(a,b,c,d){var e,f,g,h=a.data();h.guid||(h.guid=gj.grid.plugins.inlineEditing.private.generateGUID()),h.primaryKey&&(e=JSON.parse(sessionStorage.getItem("gj.grid."+h.guid)),e?f=e.filter(function(a){return a[h.primaryKey]===c[h.primaryKey]}):e=[],f&&1===f.length?f[0][b.field]=d:(g={},g[h.primaryKey]=c[h.primaryKey],h.primaryKey!==b.field&&(g[b.field]=d),e.push(g)),sessionStorage.setItem("gj.grid."+h.guid,JSON.stringify(e)))},generateGUID:function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}},gj.grid.plugins.inlineEditing.public={getChanges:function(){return JSON.parse(sessionStorage.getItem("gj.grid."+this.data().guid))},edit:function(a){var b,c=this.getById(a),d=gj.grid.methods.getRowById(this,a).find("td"),e=this.data("columns");for(b=0;b<d.length;b++)gj.grid.plugins.inlineEditing.private.editMode(this,$(d[b]),e[b],c);return this},update:function(a){var b,c=this.getById(a),d=gj.grid.methods.getRowById(this,a).find("td"),e=this.data("columns");for(b=0;b<d.length;b++)gj.grid.plugins.inlineEditing.private.displayMode(this,$(d[b]),e[b],!1);return gj.grid.plugins.inlineEditing.events.rowDataChanged(this,a,c),this},cancel:function(a){var b,c=(this.getById(a),gj.grid.methods.getRowById(this,a).find("td")),d=this.data("columns");for(b=0;b<c.length;b++)gj.grid.plugins.inlineEditing.private.displayMode(this,$(c[b]),d[b],!0);return this}},gj.grid.plugins.inlineEditing.events={cellDataChanged:function(a,b,c,d,e,f){a.triggerHandler("cellDataChanged",[b,c,d,e,f])},rowDataChanged:function(a,b,c){a.triggerHandler("rowDataChanged",[b,c])}},gj.grid.plugins.inlineEditing.configure=function(a,b,c){var d=a.data();$.extend(!0,a,gj.grid.plugins.inlineEditing.public),c.inlineEditing&&(a.on("dataBound",function(){a.find("span.gj-dirty").remove()}),a.on("rowDataBound",function(b,c,d,e){a.cancel(d)})),"command"===d.inlineEditing.mode?(gj.grid.plugins.inlineEditing.private.localization(d),b.inlineEditing.managementColumn&&d.columns.push(b.inlineEditing.managementColumnConfig)):a.on("cellDataBound",function(b,c,e,f,g){f.editor&&("editOnly"===f.mode?gj.grid.plugins.inlineEditing.private.editMode(a,c.parent(),f,g):c.parent("td").on("dblclick"===d.inlineEditing.mode?"dblclick":"click",function(){gj.grid.plugins.inlineEditing.private.editMode(a,c.parent(),f,g)}))})},gj.grid.plugins.optimisticPersistence={config:{base:{optimisticPersistence:{localStorage:void 0,sessionStorage:void 0}}},private:{applyParams:function(a){var b,c=a.data(),d={};b=JSON.parse(sessionStorage.getItem("gj.grid."+c.guid)),b&&b.optimisticPersistence&&$.extend(d,b.optimisticPersistence),b=JSON.parse(localStorage.getItem("gj.grid."+c.guid)),b&&b.optimisticPersistence&&$.extend(d,b.optimisticPersistence),$.extend(c.params,d)},saveParams:function(a){var b,c,d=a.data(),e={optimisticPersistence:{}};if(d.optimisticPersistence.sessionStorage){for(b=0;b<d.optimisticPersistence.sessionStorage.length;b++)c=d.optimisticPersistence.sessionStorage[b],e.optimisticPersistence[c]=d.params[c];e=$.extend(!0,JSON.parse(sessionStorage.getItem("gj.grid."+d.guid)),e),sessionStorage.setItem("gj.grid."+d.guid,JSON.stringify(e))}if(d.optimisticPersistence.localStorage){for(e={optimisticPersistence:{}},b=0;b<d.optimisticPersistence.localStorage.length;b++)c=d.optimisticPersistence.localStorage[b],e.optimisticPersistence[c]=d.params[c];e=$.extend(!0,JSON.parse(localStorage.getItem("gj.grid."+d.guid)),e),localStorage.setItem("gj.grid."+d.guid,JSON.stringify(e))}}},configure:function(a,b,c){b.guid&&(b.optimisticPersistence.localStorage||b.optimisticPersistence.sessionStorage)&&(gj.grid.plugins.optimisticPersistence.private.applyParams(a),a.on("dataBound",function(b){gj.grid.plugins.optimisticPersistence.private.saveParams(a)}))}},gj.grid.plugins.pagination={config:{base:{style:{pager:{panel:"",stateDisabled:"",activeButton:""}},paramNames:{page:"page",limit:"limit"},pager:{limit:10,sizes:[5,10,20,100],leftControls:void 0,rightControls:void 0}},bootstrap:{style:{pager:{panel:"",stateDisabled:""}}},bootstrap4:{style:{pager:{panel:"btn-toolbar",stateDisabled:""}}},glyphicons:{icons:{first:'<span class="glyphicon glyphicon-step-backward"></span>',previous:'<span class="glyphicon glyphicon-backward"></span>',next:'<span class="glyphicon glyphicon-forward"></span>',last:'<span class="glyphicon glyphicon-step-forward"></span>',refresh:'<span class="glyphicon glyphicon-refresh"></span>'}},materialicons:{icons:{first:'<i class="gj-icon first-page" />',previous:'<i class="gj-icon chevron-left" />',next:'<i class="gj-icon chevron-right" />',last:'<i class="gj-icon last-page" />',refresh:'<i class="gj-icon refresh" />'}},fontawesome:{icons:{first:'<i class="fa fa-fast-backward" aria-hidden="true"></i>',previous:'<i class="fa fa-backward" aria-hidden="true"></i>',next:'<i class="fa fa-forward" aria-hidden="true"></i>',last:'<i class="fa fa-fast-forward" aria-hidden="true"></i>',refresh:'<i class="fa fa-refresh" aria-hidden="true"></i>'}}},private:{init:function(a){var b,c,d,e,f,g,h,i,j,k;if(d=a.data(),d.pager)for(d.params[d.paramNames.page]||(d.params[d.paramNames.page]=1),d.params[d.paramNames.limit]||(d.params[d.paramNames.limit]=d.pager.limit),gj.grid.plugins.pagination.private.localization(d),b=$('<tr data-role="pager"/>'),c=$("<th/>"),b.append(c),f=$('<div data-role="display" />').addClass(d.style.pager.panel).css({float:"left"}),g=$('<div data-role="display" />').addClass(d.style.pager.panel).css({float:"right"}),c.append(f).append(g),h=$("<tfoot />").append(b),a.append(h),gj.grid.plugins.pagination.private.updatePagerColSpan(a),i=gj.grid.methods.clone(d.pager.leftControls),$.each(i,function(){f.append(this)}),j=gj.grid.methods.clone(d.pager.rightControls),$.each(j,function(){g.append(this)}),e=a.find("tfoot [data-role]"),k=0;k<e.length;k++)gj.grid.plugins.pagination.private.initPagerControl($(e[k]),a)},localization:function(a){"bootstrap"===a.uiLibrary?gj.grid.plugins.pagination.private.localizationBootstrap(a):"bootstrap4"===a.uiLibrary?gj.grid.plugins.pagination.private.localizationBootstrap4(a):gj.grid.plugins.pagination.private.localizationMaterialDesign(a)},localizationBootstrap:function(a){var b=gj.grid.messages[a.locale];void 0===a.pager.leftControls&&(a.pager.leftControls=[$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.first||b.First)+"</button>").attr("title",b.FirstPageTooltip).attr("data-role","page-first"),$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.previous||b.Previous)+"</button>").attr("title",b.PreviousPageTooltip).attr("data-role","page-previous"),$("<div>"+b.Page+"</div>"),$('<input data-role="page-number" class="form-control input-sm" type="text" value="0">'),$("<div>"+b.Of+"</div>"),$('<div data-role="page-label-last">0</div>'),$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.next||b.Next)+"</button>").attr("title",b.NextPageTooltip).attr("data-role","page-next"),$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.last||b.Last)+"</button>").attr("title",b.LastPageTooltip).attr("data-role","page-last"),$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.refresh||b.Refresh)+"</button>").attr("title",b.Refresh).attr("data-role","page-refresh"),$('<select data-role="page-size" class="form-control input-sm" width="60"></select>')]),void 0===a.pager.rightControls&&(a.pager.rightControls=[$("<div>"+b.DisplayingRecords+"</div>"),$('<div data-role="record-first">0</div>'),$("<div>-</div>"),$('<div data-role="record-last">0</div>'),$("<div>"+b.Of+"</div>"),$('<div data-role="record-total">0</div>')])},localizationBootstrap4:function(a){var b=gj.grid.messages[a.locale];void 0===a.pager.leftControls&&(a.pager.leftControls=[$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.first||b.First)+"</button>").attr("title",b.FirstPageTooltip).attr("data-role","page-first"),$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.previous||b.Previous)+"</button>").attr("title",b.PreviousPageTooltip).attr("data-role","page-previous"),$("<div>"+b.Page+"</div>"),$('<div class="input-group"><input data-role="page-number" class="form-control form-control-sm" type="text" value="0"></div>'),$("<div>"+b.Of+"</div>"),$('<div data-role="page-label-last">0</div>'),$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.next||b.Next)+"</button>").attr("title",b.NextPageTooltip).attr("data-role","page-next"),$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.last||b.Last)+"</button>").attr("title",b.LastPageTooltip).attr("data-role","page-last"),$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.refresh||b.Refresh)+"</button>").attr("title",b.Refresh).attr("data-role","page-refresh"),$('<select data-role="page-size" class="form-control input-sm" width="60"></select>')]),void 0===a.pager.rightControls&&(a.pager.rightControls=[$("<div>"+b.DisplayingRecords+"&nbsp;</div>"),$('<div data-role="record-first">0</div>'),$("<div>-</div>"),$('<div data-role="record-last">0</div>'),$("<div>"+b.Of+"</div>"),$('<div data-role="record-total">0</div>')])},localizationMaterialDesign:function(a){var b=gj.grid.messages[a.locale];void 0===a.pager.leftControls&&(a.pager.leftControls=[]),void 0===a.pager.rightControls&&(a.pager.rightControls=[$('<span class="">'+b.RowsPerPage+"</span>"),$('<select data-role="page-size" class="gj-grid-md-limit-select" width="52"></select></div>'),$('<span class="gj-md-spacer-32">&nbsp;</span>'),$('<span data-role="record-first" class="">0</span>'),$('<span class="">-</span>'),$('<span data-role="record-last" class="">0</span>'),$('<span class="gj-grid-mdl-pager-label">'+b.Of+"</span>"),$('<span data-role="record-total" class="">0</span>'),$('<span class="gj-md-spacer-32">&nbsp;</span>'),$('<button class="gj-button-md">'+(a.icons.previous||b.Previous)+"</button>").attr("title",b.PreviousPageTooltip).attr("data-role","page-previous").addClass(a.icons.first?"gj-button-md-icon":""),$('<span class="gj-md-spacer-24">&nbsp;</span>'),$('<button class="gj-button-md">'+(a.icons.next||b.Next)+"</button>").attr("title",b.NextPageTooltip).attr("data-role","page-next").addClass(a.icons.first?"gj-button-md-icon":"")])},initPagerControl:function(a,b){var c=b.data();switch(a.data("role")){case"page-size":c.pager.sizes&&0<c.pager.sizes.length?(a.show(),$.each(c.pager.sizes,function(){a.append($("<option/>").attr("value",this.toString()).text(this.toString()))}),a.change(function(){var a=parseInt(this.value,10);c.params[c.paramNames.limit]=a,gj.grid.plugins.pagination.private.changePage(b,1),gj.grid.plugins.pagination.events.pageSizeChange(b,a)}),a.val(c.params[c.paramNames.limit]),gj.dropdown&&a.dropdown({uiLibrary:c.uiLibrary,iconsLibrary:c.iconsLibrary,fontSize:a.css("font-size"),style:{presenter:"btn btn-default btn-sm"}})):a.hide();break;case"page-refresh":a.on("click",function(){b.reload()})}},reloadPager:function(a,b){var c,d,e,f,g,h,i,j;if(h=a.data(),h.pager){for(c=0===b?0:parseInt(h.params[h.paramNames.page],10),d=parseInt(h.params[h.paramNames.limit],10),e=Math.ceil(b/d),f=0===c?0:d*(c-1)+1,g=f+d>b?b:f+d-1,i=a.find("TFOOT [data-role]"),j=0;j<i.length;j++)gj.grid.plugins.pagination.private.reloadPagerControl($(i[j]),a,c,e,f,g,b);gj.grid.plugins.pagination.private.updatePagerColSpan(a)}},reloadPagerControl:function(a,b,c,d,e,f,g){var h;switch(a.data("role")){case"page-first":gj.grid.plugins.pagination.private.assignPageHandler(b,a,1,c<2);break;case"page-previous":gj.grid.plugins.pagination.private.assignPageHandler(b,a,c-1,c<2);break;case"page-number":a.val(c).off("change").on("change",gj.grid.plugins.pagination.private.createChangePageHandler(b,c));break;case"page-label-last":a.text(d);break;case"page-next":gj.grid.plugins.pagination.private.assignPageHandler(b,a,c+1,d===c);break;case"page-last":gj.grid.plugins.pagination.private.assignPageHandler(b,a,d,d===c);break;case"page-button-one":h=1===c?1:c==d?c-2:c-1,gj.grid.plugins.pagination.private.assignButtonHandler(b,a,c,h,d);break;case"page-button-two":h=1===c?2:c==d?d-1:c,gj.grid.plugins.pagination.private.assignButtonHandler(b,a,c,h,d);break;case"page-button-three":h=1===c?c+2:c==d?c:c+1,gj.grid.plugins.pagination.private.assignButtonHandler(b,a,c,h,d);break;case"record-first":a.text(e);break;case"record-last":a.text(f);break;case"record-total":a.text(g)}},assignPageHandler:function(a,b,c,d){var e=a.data().style.pager;d?b.addClass(e.stateDisabled).prop("disabled",!0).off("click"):b.removeClass(e.stateDisabled).prop("disabled",!1).off("click").on("click",function(){gj.grid.plugins.pagination.private.changePage(a,c)})},assignButtonHandler:function(a,b,c,d,e){var f=a.data().style.pager;d<1||d>e?b.hide():(b.show().off("click").text(d),d===c?b.addClass(f.activeButton):b.removeClass(f.activeButton).on("click",function(){gj.grid.plugins.pagination.private.changePage(a,d)}))},createChangePageHandler:function(a,b){return function(){var b=(a.data(),parseInt(this.value,10));gj.grid.plugins.pagination.private.changePage(a,b)}},changePage:function(a,b){var c=a.data();!1===gj.grid.plugins.pagination.events.pageChanging(a,b)||isNaN(b)||(a.find('TFOOT [data-role="page-number"]').val(b),c.params[c.paramNames.page]=b),a.reload()},updatePagerColSpan:function(a){var b=a.find('tfoot > tr[data-role="pager"] > th');b&&b.length&&b.attr("colspan",gj.grid.methods.countVisibleColumns(a))},isLastRecordVisible:function(a){var b=!0,c=a.data(),d=parseInt(c.params[c.paramNames.limit],10),e=parseInt(c.params[c.paramNames.page],10),f=a.count();return d&&e&&(b=(e-1)*d+f===c.totalRecords),b}},public:{getAll:function(a){var b,c,d,e=this.data();return $.isArray(e.dataSource)?a?e.dataSource:e.params[e.paramNames.limit]&&e.params[e.paramNames.page]?(b=parseInt(e.params[e.paramNames.limit],10),c=parseInt(e.params[e.paramNames.page],10),d=(c-1)*b,e.records.slice(d,d+b)):e.records:e.records}},events:{pageSizeChange:function(a,b){a.triggerHandler("pageSizeChange",[b])},pageChanging:function(a,b){a.triggerHandler("pageChanging",[b])}},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.pagination.public);a.data();c.pager&&(gj.grid.methods.isLastRecordVisible=gj.grid.plugins.pagination.private.isLastRecordVisible,a.on("initialized",function(){gj.grid.plugins.pagination.private.init(a)}),a.on("dataBound",function(b,c,d){gj.grid.plugins.pagination.private.reloadPager(a,d)}),a.on("columnShow",function(){gj.grid.plugins.pagination.private.updatePagerColSpan(a)}),a.on("columnHide",function(){gj.grid.plugins.pagination.private.updatePagerColSpan(a)}))}},gj.grid.plugins.responsiveDesign={config:{base:{resizeCheckInterval:500,responsive:!1,showHiddenColumnsAsDetails:!1,defaultColumn:{priority:void 0,minWidth:250},style:{rowDetailItem:""}},bootstrap:{style:{rowDetailItem:"col-lg-4"}}},private:{orderColumns:function(a){var b=[];if(a.columns&&a.columns.length){for(i=0;i<a.columns.length;i++)b.push({position:i,field:a.columns[i].field,minWidth:a.columns[i].width||a.columns[i].minWidth||a.defaultColumn.minWidth,priority:a.columns[i].priority||0});b.sort(function(a,b){var c=0;return a.priority<b.priority?c=-1:a.priority>b.priority&&(c=1),c})}return b},updateDetails:function(a){var b,c,d,e,f,g,h,i,j;for(b=a.find('tbody > tr[data-role="row"]'),c=a.data(),d=0;d<b.length;d++){for(f=$(b[d]),g=f.data("details"),e=0;e<c.columns.length;e++)i=c.columns[e],h=g&&g.find('div[data-id="'+i.field+'"]'),c.columns[e].hidden?(j="<b>"+(i.title||i.field)+"</b>: {"+i.field+"}",h&&h.length?h.empty().html(j):(h=$('<div data-id="'+i.field+'"/>').html(j),h.addClass(c.style.rowDetailItem),g&&g.length||(g=$('<div class="row"/>')),g.append(h))):h&&h.length&&h.remove();a.updateDetails(f)}}},public:{oldWidth:void 0,resizeCheckIntervalId:void 0,makeResponsive:function(){var a,b,c=0,d=this.data(),e=gj.grid.plugins.responsiveDesign.private.orderColumns(d);for(a=0;a<e.length;a++)b=this.find("thead>tr>th:eq("+e[a].position+")"),b.is(":visible")&&e[a].minWidth<b.width()&&(c+=b.width()-e[a].minWidth);if(c)for(a=0;a<e.length;a++)b=this.find("thead>tr>th:eq("+e[a].position+")"),!b.is(":visible")&&e[a].minWidth<=c&&(this.showColumn(e[a].field),c-=b.width());for(a=e.length-1;a>=0;a--)b=this.find("thead>tr>th:eq("+e[a].position+")"),b.is(":visible")&&e[a].priority&&e[a].minWidth>b.outerWidth()&&this.hideColumn(e[a].field)}},events:{resize:function(a,b,c){a.triggerHandler("resize",[b,c])}},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.responsiveDesign.public),b.responsive&&(a.on("initialized",function(){a.makeResponsive(),a.oldWidth=a.width(),a.resizeCheckIntervalId=setInterval(function(){var b=a.width();b!==a.oldWidth&&gj.grid.plugins.responsiveDesign.events.resize(a,b,a.oldWidth),a.oldWidth=b},b.resizeCheckInterval)}),a.on("destroy",function(){a.resizeCheckIntervalId&&clearInterval(a.resizeCheckIntervalId)}),a.on("resize",function(){a.makeResponsive()})),b.showHiddenColumnsAsDetails&&gj.grid.plugins.expandCollapseRows&&(a.on("dataBound",function(){gj.grid.plugins.responsiveDesign.private.updateDetails(a)}),a.on("columnHide",function(){gj.grid.plugins.responsiveDesign.private.updateDetails(a)}),a.on("columnShow",function(){gj.grid.plugins.responsiveDesign.private.updateDetails(a)}),a.on("rowDataBound",function(){gj.grid.plugins.responsiveDesign.private.updateDetails(a)}))}},gj.grid.plugins.toolbar={config:{base:{toolbarTemplate:void 0,title:void 0,style:{toolbar:"gj-grid-md-toolbar"}},bootstrap:{style:{toolbar:"gj-grid-bootstrap-toolbar"}},bootstrap4:{style:{toolbar:"gj-grid-bootstrap-4-toolbar"}}},private:{init:function(a){var b,c,d;b=a.data(),c=a.prev('div[data-role="toolbar"]'),(void 0!==b.toolbarTemplate||void 0!==b.title||c.length>0)&&(0===c.length&&(c=$('<div data-role="toolbar"></div>'),a.before(c)),c.addClass(b.style.toolbar),0===c.children().length&&b.toolbarTemplate&&c.append(b.toolbarTemplate),d=c.find('[data-role="title"]'),0===d.length&&(d=$('<div data-role="title"/>'),c.prepend(d)),b.title&&d.text(b.title),b.minWidth&&c.css("min-width",b.minWidth))}},public:{title:function(a){var b=this.parent().find('div[data-role="toolbar"] [data-role="title"]');return void 0!==a?(b.text(a),this):b.text()}},configure:function(a){$.extend(!0,a,gj.grid.plugins.toolbar.public),a.on("initialized",function(){gj.grid.plugins.toolbar.private.init(a)}),a.on("destroying",function(){a.prev('[data-role="toolbar"]').remove()})}},gj.grid.plugins.resizableColumns={config:{base:{resizableColumns:!1}},private:{init:function(a,b){var c,d,e,f,g,h;if(c=a.find('thead tr[data-role="caption"] th'),c.length)for(e=0;e<c.length-1;e++)d=$(c[e]),f=$('<div class="gj-grid-column-resizer-wrapper" />'),h=parseInt(d.css("padding-right"),10)+3,g=$('<span class="gj-grid-column-resizer" />').css("margin-right","-"+h+"px"),g.draggable({start:function(){a.addClass("gj-unselectable"),a.addClass("gj-grid-resize-cursor")},stop:function(){a.removeClass("gj-unselectable"),a.removeClass("gj-grid-resize-cursor"),this.style.removeProperty("top"),this.style.removeProperty("left"),this.style.removeProperty("position")},drag:gj.grid.plugins.resizableColumns.private.createResizeHandle(a,d,b.columns[e])}),d.append(f.append(g))},createResizeHandle:function(a,b,c){return function(a,d){var e,f=parseInt(b.attr("width"),10);f||(f=b.outerWidth()),d&&d.left&&(e=f+d.left,c.width=e,b.attr("width",e))}}},public:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.resizableColumns.public),b.resizableColumns&&gj.draggable&&a.on("initialized",function(){gj.grid.plugins.resizableColumns.private.init(a,b)})}},gj.grid.plugins.rowReorder={config:{base:{rowReorder:!1,rowReorderColumn:void 0,orderNumberField:void 0,style:{targetRowIndicatorTop:"gj-grid-row-reorder-indicator-top",targetRowIndicatorBottom:"gj-grid-row-reorder-indicator-bottom"}}},private:{init:function(a){var b,c,d,e=a.find('tbody tr[data-role="row"]');for(a.data("rowReorderColumn")&&(c=gj.grid.methods.getColumnPosition(a.data("columns"),a.data("rowReorderColumn"))),b=0;b<e.length;b++)d=$(e[b]),void 0!==c?d.find("td:eq("+c+")").on("mousedown",gj.grid.plugins.rowReorder.private.createRowMouseDownHandler(a,d)):d.on("mousedown",gj.grid.plugins.rowReorder.private.createRowMouseDownHandler(a,d))},createRowMouseDownHandler:function(a,b){return function(c){var d,e,f=a.clone(),g=a.data("columns");for(a.addClass("gj-unselectable"),$("body").append(f),f.attr("data-role","draggable-clone").css("cursor","move"),f.children("thead").remove().children("tfoot").remove(),f.find('tbody tr:not([data-position="'+b.data("position")+'"])').remove(),e=f.find("tbody tr td"),d=0;d<e.length;d++)g[d].width&&e[d].setAttribute("width",g[d].width);f.draggable({stop:gj.grid.plugins.rowReorder.private.createDragStopHandler(a,b)}),f.css({position:"absolute",top:b.offset().top,left:b.offset().left,width:b.width(),zIndex:1}),"true"===b.attr("data-droppable")&&b.droppable("destroy"),b.siblings('tr[data-role="row"]').each(function(){var a=$(this);"true"===a.attr("data-droppable")&&a.droppable("destroy"),a.droppable({over:gj.grid.plugins.rowReorder.private.createDroppableOverHandler(b),out:gj.grid.plugins.rowReorder.private.droppableOut})}),f.trigger("mousedown")}},createDragStopHandler:function(a,b){return function(c,d){$('table[data-role="draggable-clone"]').draggable("destroy").remove(),a.removeClass("gj-unselectable"),b.siblings('tr[data-role="row"]').each(function(){var c,e,f,g,h,i=$(this),j=i.data("position"),k=b.data("position"),l=a.data();if(i.droppable("isOver",d)){for(j<k?i.before(b):i.after(b),l.records.splice(j-1,0,l.records.splice(k-1,1)[0]),c=i.parent().find('tr[data-role="row"]'),f=0;f<c.length;f++)$(c[f]).attr("data-position",f+1);if(l.orderNumberField){for(f=0;f<l.records.length;f++)l.records[f][l.orderNumberField]=f+1;for(f=0;f<c.length;f++)e=$(c[f]),h=gj.grid.methods.getId(e,l.primaryKey,e.attr("data-position")),g=gj.grid.methods.getByPosition(a,e.attr("data-position")),a.setCellContent(h,l.orderNumberField,g[l.orderNumberField])}}i.removeClass("gj-grid-top-border"),i.removeClass("gj-grid-bottom-border"),i.droppable("destroy")})}},createDroppableOverHandler:function(a){return function(b){var c=$(this);c.data("position")<a.data("position")?c.addClass("gj-grid-top-border"):c.addClass("gj-grid-bottom-border")}},droppableOut:function(){$(this).removeClass("gj-grid-top-border"),$(this).removeClass("gj-grid-bottom-border")}},public:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.rowReorder.public),b.rowReorder&&gj.draggable&&gj.droppable&&a.on("dataBound",function(){gj.grid.plugins.rowReorder.private.init(a)})}},gj.grid.plugins.columnReorder={config:{base:{columnReorder:!1,style:{targetRowIndicatorTop:"gj-grid-row-reorder-indicator-top",targetRowIndicatorBottom:"gj-grid-row-reorder-indicator-bottom"}}},private:{init:function(a){var b,c,d=a.find("thead tr th");for(b=0;b<d.length;b++)c=$(d[b]),c.on("mousedown",gj.grid.plugins.columnReorder.private.createMouseDownHandler(a,c))},createMouseDownHandler:function(a,b){return function(c){var d=a.clone(),e=b.index();a.addClass("gj-unselectable"),$("body").append(d),d.attr("data-role","draggable-clone").css("cursor","move"),d.find("thead tr th:eq("+e+")").siblings().remove(),d.find('tbody tr[data-role != "row"]').remove(),d.find("tbody tr td:nth-child("+(e+1)+")").siblings().remove(),d.find("tfoot").remove(),d.draggable({stop:gj.grid.plugins.columnReorder.private.createDragStopHandler(a,b)}),d.css({position:"absolute",top:b.offset().top,left:b.offset().left,width:b.width(),zIndex:1}),"true"===b.attr("data-droppable")&&b.droppable("destroy"),b.siblings("th").each(function(){var c=$(this);"true"===c.attr("data-droppable")&&c.droppable("destroy"),c.droppable({over:gj.grid.plugins.columnReorder.private.createDroppableOverHandler(a,b),out:gj.grid.plugins.columnReorder.private.droppableOut})}),d.trigger("mousedown")}},createDragStopHandler:function(a,b){return function(c,d){$('table[data-role="draggable-clone"]').draggable("destroy").remove(),a.removeClass("gj-unselectable"),b.siblings("th").each(function(){var c=$(this),e=a.data(),f=gj.grid.methods.getColumnPosition(e.columns,c.data("field")),g=gj.grid.methods.getColumnPosition(e.columns,b.data("field"));c.removeClass("gj-grid-left-border").removeClass("gj-grid-right-border"),c.closest("table").find('tbody tr[data-role="row"] td:nth-child('+(c.index()+1)+")").removeClass("gj-grid-left-border").removeClass("gj-grid-right-border"),c.droppable("isOver",d)&&(f<g?c.before(b):c.after(b),gj.grid.plugins.columnReorder.private.moveRowCells(a,g,f),e.columns.splice(f,0,e.columns.splice(g,1)[0])),c.droppable("destroy")})}},moveRowCells:function(a,b,c){var d,e,f=a.find('tbody tr[data-role="row"]');for(d=0;d<f.length;d++)e=$(f[d]),c<b?e.find("td:eq("+c+")").before(e.find("td:eq("+b+")")):e.find("td:eq("+c+")").after(e.find("td:eq("+b+")"))},createDroppableOverHandler:function(a,b){return function(c){var d=$(this),e=a.data();gj.grid.methods.getColumnPosition(e.columns,d.data("field"))<gj.grid.methods.getColumnPosition(e.columns,b.data("field"))?(d.addClass("gj-grid-left-border"),a.find('tbody tr[data-role="row"] td:nth-child('+(d.index()+1)+")").addClass("gj-grid-left-border")):(d.addClass("gj-grid-right-border"),a.find('tbody tr[data-role="row"] td:nth-child('+(d.index()+1)+")").addClass("gj-grid-right-border"))}},droppableOut:function(){var a=$(this);a.removeClass("gj-grid-left-border").removeClass("gj-grid-right-border"),a.closest("table").find('tbody tr[data-role="row"] td:nth-child('+(a.index()+1)+")").removeClass("gj-grid-left-border").removeClass("gj-grid-right-border")}},public:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.columnReorder.public),b.columnReorder&&a.on("initialized",function(){gj.grid.plugins.columnReorder.private.init(a)})}},gj.grid.plugins.headerFilter={config:{base:{defaultColumnSettings:{filterable:!0},headerFilter:{type:"onenterkeypress"}}},private:{init:function(a){var b,c,d,e=a.data(),f=$('<tr data-role="filter"/>');for(b=0;b<e.columns.length;b++)c=$("<th/>"),e.columns[b].filterable&&(d=$('<input data-field="'+e.columns[b].field+'" class="gj-width-full" />'),"onchange"===e.headerFilter.type?d.on("input propertychange",function(b){gj.grid.plugins.headerFilter.private.reload(a,$(this))}):(d.on("keypress",function(b){13==b.which&&gj.grid.plugins.headerFilter.private.reload(a,$(this))}),d.on("blur",function(b){gj.grid.plugins.headerFilter.private.reload(a,$(this))})),c.append(d)),e.columns[b].hidden&&c.hide(),f.append(c);a.children("thead").append(f)},reload:function(a,b){var c={};c[b.data("field")]=b.val(),a.reload(c)}},public:{},events:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.headerFilter.public);a.data();c.headerFilter&&a.on("initialized",function(){gj.grid.plugins.headerFilter.private.init(a)})}},gj.grid.plugins.grouping={config:{base:{paramNames:{groupBy:"groupBy",groupByDirection:"groupByDirection"},grouping:{groupBy:void 0,direction:"asc"},icons:{expandGroup:'<i class="gj-icon plus" />',collapseGroup:'<i class="gj-icon minus" />'}},fontawesome:{icons:{expandGroup:'<i class="fa fa-plus" aria-hidden="true"></i>',collapseGroup:'<i class="fa fa-minus" aria-hidden="true"></i>'}},glyphicons:{icons:{expandGroup:'<span class="glyphicon glyphicon-plus" />',collapseGroup:'<span class="glyphicon glyphicon-minus" />'}}},private:{init:function(a){var b,c=a.data();b=void 0,a.on("rowDataBound",function(d,e,f,g){if(b!==g[c.grouping.groupBy]){var h=gj.grid.methods.countVisibleColumns(a)-1,i=$('<tr data-role="group" />'),j=$('<td class="gj-text-align-center gj-unselectable gj-cursor-pointer" />');j.append('<div data-role="display">'+c.icons.collapseGroup+"</div>"),j.on("click",gj.grid.plugins.grouping.private.createExpandCollapseHandler(c)),i.append(j),i.append('<td colspan="'+h+'"><div data-role="display">'+c.grouping.groupBy+": "+g[c.grouping.groupBy]+"</div></td>"),i.insertBefore(e),b=g[c.grouping.groupBy]}e.show()}),c.params[c.paramNames.groupBy]=c.grouping.groupBy,c.params[c.paramNames.groupByDirection]=c.grouping.direction},grouping:function(a,b){var c=a.data();b.sort(gj.grid.methods.createDefaultSorter(c.grouping.direction,c.grouping.groupBy))},createExpandCollapseHandler:function(a){return function(b){var c=$(this),d=c.children('div[data-role="display"]'),e=c.closest("tr");"row"===e.next(":visible").data("role")?(e.nextUntil('[data-role="group"]').hide(),d.empty().append(a.icons.expandGroup)):(e.nextUntil('[data-role="group"]').show(),d.empty().append(a.icons.collapseGroup))}}},public:{},configure:function(a){var b,c=a.data();$.extend(!0,a,gj.grid.plugins.grouping.public),c.grouping&&c.grouping.groupBy&&(b={title:"",width:c.defaultIconColumnWidth,align:"center",stopPropagation:!0,cssClass:"gj-cursor-pointer gj-unselectable"},c.columns=[b].concat(c.columns),a.on("initialized",function(){gj.grid.plugins.grouping.private.init(a)}),a.on("dataFiltered",function(b,c){gj.grid.plugins.grouping.private.grouping(a,c)}))}},gj.grid.plugins.fixedHeader={config:{base:{fixedHeader:!1,height:300}},private:{init:function(a){var b=a.data(),c=a.children("tbody"),d=a.children("thead"),e=b.height-d.outerHeight()-(a.children("tfoot").outerHeight()||0);a.addClass("gj-grid-scrollable"),c.css("width",d.outerWidth()),c.height(e)},refresh:function(a){var b,c,d=(a.data(),a.children("tbody")),e=a.children("thead"),f=a.find('tbody tr[data-role="row"] td'),g=a.find('thead tr[data-role="caption"] th');for(a.children("tbody").height()<gj.grid.plugins.fixedHeader.private.getRowsHeight(a)?d.css("width",e.outerWidth()+gj.grid.plugins.fixedHeader.private.getScrollBarWidth()+(navigator.userAgent.toLowerCase().indexOf("firefox")>-1?1:0)):d.css("width",e.outerWidth()),b=0;b<g.length;b++)c=$(g[b]).outerWidth(),0===b&&gj.core.isIE()&&(c-=1),$(f[b]).attr("width",c)},getRowsHeight:function(a){var b=0;return a.find("tbody tr").each(function(){b+=$(this).height()}),b},getScrollBarWidth:function(){var a=document.createElement("p");a.style.width="100%",a.style.height="200px";var b=document.createElement("div");b.style.position="absolute",b.style.top="0px",b.style.left="0px",b.style.visibility="hidden",b.style.width="200px",b.style.height="150px",b.style.overflow="hidden",b.appendChild(a),document.body.appendChild(b);var c=a.offsetWidth;b.style.overflow="scroll";var d=a.offsetWidth;return c==d&&(d=b.clientWidth),document.body.removeChild(b),c-d}},public:{},events:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.fixedHeader.public);a.data();c.fixedHeader&&(a.on("initialized",function(){gj.grid.plugins.fixedHeader.private.init(a)}),a.on("dataBound",function(){gj.grid.plugins.fixedHeader.private.refresh(a)}),a.on("resize",function(){gj.grid.plugins.fixedHeader.private.refresh(a)}))}},gj.grid.messages["en-us"]={First:"First",Previous:"Previous",Next:"Next",Last:"Last",Page:"Page",FirstPageTooltip:"First Page",PreviousPageTooltip:"Previous Page",NextPageTooltip:"Next Page",LastPageTooltip:"Last Page",Refresh:"Refresh",Of:"of",DisplayingRecords:"Displaying records",RowsPerPage:"Rows per page:",Edit:"Edit",Delete:"Delete",Update:"Update",Cancel:"Cancel",NoRecordsFound:"No records found.",Loading:"Loading..."},gj.tree={plugins:{}},gj.tree.config={base:{params:{},autoLoad:!0,selectionType:"single",cascadeSelection:!1,dataSource:void 0,primaryKey:void 0,textField:"text",childrenField:"children",hasChildrenField:"hasChildren",imageCssClassField:"imageCssClass",imageUrlField:"imageUrl",imageHtmlField:"imageHtml",disabledField:"disabled",width:void 0,border:!1,uiLibrary:"materialdesign",iconsLibrary:"materialicons",autoGenId:1,indentation:24,style:{wrapper:"gj-unselectable",list:"gj-list gj-list-md",item:void 0,active:"gj-list-md-active",leafIcon:void 0,border:"gj-tree-md-border"},icons:{expand:'<i class="gj-icon chevron-right" />',collapse:'<i class="gj-icon chevron-down" />'}},bootstrap:{style:{wrapper:"gj-unselectable gj-tree-bootstrap-3",list:"gj-list gj-list-bootstrap list-group",item:"list-group-item",active:"active",border:"gj-tree-bootstrap-border"},iconsLibrary:"glyphicons"},bootstrap4:{style:{wrapper:"gj-unselectable gj-tree-bootstrap-4",list:"gj-list gj-list-bootstrap",item:"list-group-item",active:"active",border:"gj-tree-bootstrap-border"},icons:{expand:'<i class="gj-icon plus" />',collapse:'<i class="gj-icon minus" />'}},materialicons:{style:{expander:"gj-tree-material-icons-expander"}},fontawesome:{style:{expander:"gj-tree-font-awesome-expander"},icons:{expand:'<i class="fa fa-plus" aria-hidden="true"></i>',collapse:'<i class="fa fa-minus" aria-hidden="true"></i>'}},glyphicons:{style:{expander:"gj-tree-glyphicons-expander"},icons:{expand:'<span class="glyphicon glyphicon-plus" />',collapse:'<span class="glyphicon glyphicon-minus" />'}}},gj.tree.events={initialized:function(a){a.triggerHandler("initialized")},dataBinding:function(a){a.triggerHandler("dataBinding")},dataBound:function(a){a.triggerHandler("dataBound")},select:function(a,b,c){return a.triggerHandler("select",[b,c])},unselect:function(a,b,c){return a.triggerHandler("unselect",[b,c])},expand:function(a,b,c){return a.triggerHandler("expand",[b,c])},collapse:function(a,b,c){return a.triggerHandler("collapse",[b,c])},enable:function(a,b){return a.triggerHandler("enable",[b])},disable:function(a,b){return a.triggerHandler("disable",[b])},destroying:function(a){return a.triggerHandler("destroying")},nodeDataBound:function(a,b,c,d){return a.triggerHandler("nodeDataBound",[b,c,d])}},gj.tree.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"tree"),gj.tree.methods.initialize.call(this),this.data("autoLoad")&&this.reload(),this},initialize:function(){var a=this.data(),b=$('<ul class="'+a.style.list+'"/>');this.empty().addClass(a.style.wrapper).append(b),a.width&&this.width(a.width),a.border&&this.addClass(a.style.border),gj.tree.events.initialized(this)},useHtmlDataSource:function(a,b){b.dataSource=[]},render:function(a,b){return b&&("string"==typeof b&&JSON&&(b=JSON.parse(b)),a.data("records",gj.tree.methods.getRecords(a,b)),gj.tree.methods.loadData(a)),a},filter:function(a){return a.data().dataSource},getRecords:function(a,b){var c,d,e,f=[],g=a.data();for(c=0;c<b.length;c++)d=g.primaryKey?b[c][g.primaryKey]:g.autoGenId++,e={id:d,data:b[c]},b[c][g.childrenField]&&b[c][g.childrenField].length?(e.children=gj.tree.methods.getRecords(a,b[c][g.childrenField]),delete b[c][g.childrenField]):e.children=[],f.push(e);return f},loadData:function(a){var b,c=a.data("records"),d=a.children("ul");for(gj.tree.events.dataBinding(a),d.off().empty(),b=0;b<c.length;b++)gj.tree.methods.appendNode(a,d,c[b],1);gj.tree.events.dataBound(a)},appendNode:function(a,b,c,d,e){var f,g,h,i,j,k=a.data(),g=$('<li data-id="'+c.id+'" data-role="node" />').addClass(k.style.item),l=$('<div data-role="wrapper" />'),m=$('<span data-role="expander" data-mode="close"></span>').addClass(k.style.expander),n=$('<span data-role="display">'+c.data[k.textField]+"</span>"),o=void 0!==c.data[k.hasChildrenField]&&"true"===c.data[k.hasChildrenField].toString().toLowerCase(),p=void 0!==c.data[k.disabledField]&&"true"===c.data[k.disabledField].toString().toLowerCase();if(k.indentation&&l.append('<span data-role="spacer" style="width: '+k.indentation*(d-1)+'px;"></span>'),p?gj.tree.methods.disableNode(a,g):(m.on("click",gj.tree.methods.expanderClickHandler(a)),n.on("click",gj.tree.methods.displayClickHandler(a))),l.append(m),l.append(n),g.append(l),e?b.find("li:eq("+(e-1)+")").before(g):b.append(g),c.children.length||o)for(m.empty().append(k.icons.expand),h=$("<ul />").addClass(k.style.list).addClass("gj-hidden"),g.append(h),f=0;f<c.children.length;f++)gj.tree.methods.appendNode(a,h,c.children[f],d+1);else k.style.leafIcon?m.addClass(k.style.leafIcon):m.html("&nbsp;");k.imageCssClassField&&c.data[k.imageCssClassField]?$('<span data-role="image"><span class="'+c.data[k.imageCssClassField]+'"></span></span>').insertBefore(n):k.imageUrlField&&c.data[k.imageUrlField]?(i=$('<span data-role="image"></span>'),i.insertBefore(n),j=$('<img src="'+c.data[k.imageUrlField]+'"></img>'),j.attr("width",i.width()).attr("height",i.height()),i.append(j)):k.imageHtmlField&&c.data[k.imageHtmlField]&&(i=$('<span data-role="image">'+c.data[k.imageHtmlField]+"</span>"),i.insertBefore(n)),gj.tree.events.nodeDataBound(a,g,c.id,c.data)},expanderClickHandler:function(a){return function(b){var c=$(this),d=c.closest("li");"close"===c.attr("data-mode")?a.expand(d):a.collapse(d)}},expand:function(a,b,c){var d,e,f=b.find('>[data-role="wrapper"]>[data-role="expander"]'),g=a.data(),h=b.attr("data-id"),i=b.children("ul");if(!1!==gj.tree.events.expand(a,b,h)&&i&&i.length&&(i.show(),f.attr("data-mode","open"),f.empty().append(g.icons.collapse),c))for(d=b.find("ul>li"),e=0;e<d.length;e++)gj.tree.methods.expand(a,$(d[e]),c);return a},collapse:function(a,b,c){var d,e,f=b.find('>[data-role="wrapper"]>[data-role="expander"]'),g=a.data(),h=b.attr("data-id"),i=b.children("ul");if(!1!==gj.tree.events.collapse(a,b,h)&&i&&i.length&&(i.hide(),f.attr("data-mode","close"),f.empty().append(g.icons.expand),c))for(d=b.find("ul>li"),e=0;e<d.length;e++)gj.tree.methods.collapse(a,$(d[e]),c);return a},expandAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.expand(a,$(c[b]),!0);return a},collapseAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.collapse(a,$(c[b]),!0);return a},displayClickHandler:function(a){return function(b){var c=$(this),d=c.closest("li"),e=a.data().cascadeSelection;"true"===d.attr("data-selected")?gj.tree.methods.unselect(a,d,e):("single"===a.data("selectionType")&&gj.tree.methods.unselectAll(a),gj.tree.methods.select(a,d,e))}},selectAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.select(a,$(c[b]),!0);return a},select:function(a,b,c){var d,e,f=a.data();if("true"!==b.attr("data-selected")&&!1!==gj.tree.events.select(a,b,b.attr("data-id"))&&(b.addClass(f.style.active).attr("data-selected","true"),c))for(e=b.find("ul>li"),d=0;d<e.length;d++)gj.tree.methods.select(a,$(e[d]),c)},unselectAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.unselect(a,$(c[b]),!0);return a},unselect:function(a,b,c){var d,e;a.data();if("true"===b.attr("data-selected")&&!1!==gj.tree.events.unselect(a,b,b.attr("data-id"))&&(b.removeClass(a.data().style.active).removeAttr("data-selected"),c))for(e=b.find("ul>li"),d=0;d<e.length;d++)gj.tree.methods.unselect(a,$(e[d]),c)},getSelections:function(a){var b,c,d,e=[],f=a.children("li");if(f&&f.length)for(b=0;b<f.length;b++)c=$(f[b]),"true"===c.attr("data-selected")?e.push(c.attr("data-id")):c.has("ul")&&(d=gj.tree.methods.getSelections(c.children("ul")),d.length&&(e=e.concat(d)));return e},getById:function(a,b,c){var d,e=void 0;for(d=0;d<c.length;d++){if(b==c[d].id){e=c[d];break}if(c[d].children&&c[d].children.length&&(e=gj.tree.methods.getById(a,b,c[d].children)))break}return e},getDataById:function(a,b,c){var d=gj.tree.methods.getById(a,b,c);return d?d.data:d},getDataByText:function(a,b,c){var d,e=void 0,f=a.data();for(d=0;d<c.length;d++){if(b===c[d].data[f.textField]){e=c[d].data;break}if(c[d].children&&c[d].children.length&&(e=gj.tree.methods.getDataByText(a,b,c[d].children)))break}return e},getNodeById:function(a,b){var c,d,e=void 0,f=a.children("li");if(f&&f.length)for(c=0;c<f.length;c++){if(d=$(f[c]),b==d.attr("data-id")){e=d;break}if(d.has("ul")&&(e=gj.tree.methods.getNodeById(d.children("ul"),b)))break}return e},getNodeByText:function(a,b){var c,d,e=void 0,f=a.children("li");if(f&&f.length)for(c=0;c<f.length;c++){if(d=$(f[c]),b===d.find('>[data-role="wrapper"]>[data-role="display"]').text()){e=d;break}if(d.has("ul")&&(e=gj.tree.methods.getNodeByText(d.children("ul"),b)))break}return e},addNode:function(a,b,c,d){var e,f=gj.tree.methods.getRecords(a,[b])[0];return c&&c.length?("li"===c[0].tagName.toLowerCase()&&(c=c.children("ul")),gj.tree.methods.getById(a,c.parent().data("id"),a.data("records")).children.push(f)):(c=a.children("ul"),a.data("records").push(f)),e=c.parentsUntil('[data-type="tree"]',"ul").length+1,gj.tree.methods.appendNode(a,c,f,e,d),a},remove:function(a,b){return gj.tree.methods.removeDataById(a,b.attr("data-id"),a.data("records")),b.remove(),a},removeDataById:function(a,b,c){var d;for(d=0;d<c.length;d++){if(b==c[d].id){c.splice(d,1);break}c[d].children&&c[d].children.length&&gj.tree.methods.removeDataById(a,b,c[d].children)}},getChildren:function(a,b,c){var d,e,f=[],c=void 0===c||c;for(e=c?b.find("ul li"):b.find(">ul>li"),d=0;d<e.length;d++)f.push($(e[d]).data("id"));return f},enableAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.enableNode(a,$(c[b]),!0);return a},enableNode:function(a,b,c){var d,e,f=b.find('>[data-role="wrapper"]>[data-role="expander"]'),g=b.find('>[data-role="wrapper"]>[data-role="display"]'),c=void 0===c||c;if(b.removeClass("disabled"),f.on("click",gj.tree.methods.expanderClickHandler(a)),g.on("click",gj.tree.methods.displayClickHandler(a)),gj.tree.events.enable(a,b),c)for(e=b.find("ul>li"),d=0;d<e.length;d++)gj.tree.methods.enableNode(a,$(e[d]),c)},disableAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.disableNode(a,$(c[b]),!0);return a},disableNode:function(a,b,c){var d,e,f=b.find('>[data-role="wrapper"]>[data-role="expander"]'),g=b.find('>[data-role="wrapper"]>[data-role="display"]'),c=void 0===c||c;if(b.addClass("disabled"),f.off("click"),g.off("click"),gj.tree.events.disable(a,b),c)for(e=b.find("ul>li"),d=0;d<e.length;d++)gj.tree.methods.disableNode(a,$(e[d]),c)},destroy:function(a){return a.data()&&(gj.tree.events.destroying(a),a.xhr&&a.xhr.abort(),a.off(),a.removeData(),a.removeAttr("data-type"),a.removeClass().empty()),a}},gj.tree.widget=function(a,b){var c=this,d=gj.tree.methods;return c.reload=function(a){return gj.widget.prototype.reload.call(this,a)},c.render=function(a){return d.render(this,a)},c.addNode=function(a,b,c){return d.addNode(this,a,b,c)},c.removeNode=function(a){return d.remove(this,a)},c.destroy=function(){return d.destroy(this)},c.expand=function(a,b){return d.expand(this,a,b)},c.collapse=function(a,b){return d.collapse(this,a,b)},c.expandAll=function(){return d.expandAll(this)},c.collapseAll=function(){return d.collapseAll(this)},c.getDataById=function(a){return d.getDataById(this,a,this.data("records"))},c.getDataByText=function(a){return d.getDataByText(this,a,this.data("records"))},c.getNodeById=function(a){return d.getNodeById(this.children("ul"),a)},c.getNodeByText=function(a){return d.getNodeByText(this.children("ul"),a)},c.select=function(a){return d.select(this,a)},c.unselect=function(a){return d.unselect(this,a)},c.selectAll=function(){return d.selectAll(this)},c.unselectAll=function(){return d.unselectAll(this)},c.getSelections=function(){return d.getSelections(this.children("ul"))},c.getChildren=function(a,b){return d.getChildren(this,a,b)},c.enable=function(a,b){return d.enableNode(this,a,b)},c.enableAll=function(){return d.enableAll(this)},c.disable=function(a,b){return d.disableNode(this,a,b)},c.disableAll=function(){return d.disableAll(this)},$.extend(a,c),"tree"!==a.attr("data-type")&&d.init.call(a,b),a},gj.tree.widget.prototype=new gj.widget,gj.tree.widget.constructor=gj.tree.widget,function(a){a.fn.tree=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.tree.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.tree.widget(this,a)}}}(jQuery),gj.tree.plugins.checkboxes={config:{base:{checkboxes:void 0,checkedField:"checked",cascadeCheck:!0}},private:{dataBound:function(a){var b;a.data("cascadeCheck")&&(b=a.find('li[data-role="node"]'),$.each(b,function(){var a=$(this),b=a.find('[data-role="checkbox"] input[type="checkbox"]').checkbox("state");"checked"===b&&(gj.tree.plugins.checkboxes.private.updateChildrenState(a,b),gj.tree.plugins.checkboxes.private.updateParentState(a,b))}))},nodeDataBound:function(a,b,c,d){var e=a.data(),f=b.find('> [data-role="wrapper"] > [data-role="expander"]'),g=$('<input type="checkbox"/>'),h=$('<span data-role="checkbox"></span>').append(g),i=void 0!==d[e.disabledField]&&"true"===d[e.disabledField].toString().toLowerCase();g=g.checkbox({uiLibrary:e.uiLibrary,iconsLibrary:e.iconsLibrary,change:function(c,e){gj.tree.plugins.checkboxes.events.checkboxChange(a,b,d,g.state())}}),i&&g.prop("disabled",!0),d[e.checkedField]&&g.state("checked"),g.on("click",function(a){var b=g.closest("li"),c=g.state();e.cascadeCheck&&(gj.tree.plugins.checkboxes.private.updateChildrenState(b,c),gj.tree.plugins.checkboxes.private.updateParentState(b,c))}),f.after(h)},updateParentState:function(a,b){var c,d,e,f,g,h;c=a.parent("ul").parent("li"),1===c.length&&(d=a.parent("ul").parent("li").find('> [data-role="wrapper"] > [data-role="checkbox"] input[type="checkbox"]'),e=a.siblings().find('> [data-role="wrapper"] > span[data-role="checkbox"] input[type="checkbox"]'),f="checked"===b,g="unchecked"===b,h="indeterminate",$.each(e,function(){var a=$(this).checkbox("state");f&&"checked"!==a&&(f=!1),g&&"unchecked"!==a&&(g=!1)}),f&&!g&&(h="checked"),!f&&g&&(h="unchecked"),d.checkbox("state",h),gj.tree.plugins.checkboxes.private.updateParentState(c,d.checkbox("state")))},updateChildrenState:function(a,b){var c=a.find('ul li [data-role="wrapper"] [data-role="checkbox"] input[type="checkbox"]');c.length>0&&$.each(c,function(){$(this).checkbox("state",b)})},update:function(a,b,c){var d=b.find('[data-role="checkbox"] input[type="checkbox"]').first();$(d).checkbox("state",c),a.data().cascadeCheck&&(gj.tree.plugins.checkboxes.private.updateChildrenState(b,c),gj.tree.plugins.checkboxes.private.updateParentState(b,c))}},public:{getCheckedNodes:function(){var a=[],b=this.find('li [data-role="checkbox"] input[type="checkbox"]');return $.each(b,function(){var b=$(this);"checked"===b.checkbox("state")&&a.push(b.closest("li").data("id"))}),a},checkAll:function(){var a=this.find('li [data-role="checkbox"] input[type="checkbox"]');return $.each(a,function(){$(this).checkbox("state","checked")}),this},uncheckAll:function(){var a=this.find('li [data-role="checkbox"] input[type="checkbox"]');return $.each(a,function(){$(this).checkbox("state","unchecked")}),this},check:function(a){return gj.tree.plugins.checkboxes.private.update(this,a,"checked"),this},uncheck:function(a){return gj.tree.plugins.checkboxes.private.update(this,a,"unchecked"),this}},events:{checkboxChange:function(a,b,c,d){return a.triggerHandler("checkboxChange",[b,c,d])}},configure:function(a){a.data("checkboxes")&&gj.checkbox&&($.extend(!0,a,gj.tree.plugins.checkboxes.public),a.on("nodeDataBound",function(b,c,d,e){gj.tree.plugins.checkboxes.private.nodeDataBound(a,c,d,e)}),a.on("dataBound",function(){gj.tree.plugins.checkboxes.private.dataBound(a)}),a.on("enable",function(a,b){b.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop("disabled",!1)}),a.on("disable",function(a,b){b.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop("disabled",!0)}))}},gj.tree.plugins.dragAndDrop={config:{base:{dragAndDrop:void 0,style:{dragEl:"gj-tree-drag-el gj-tree-md-drag-el",dropAsChildIcon:"gj-cursor-pointer gj-icon plus",dropAbove:"gj-tree-drop-above",dropBelow:"gj-tree-drop-below"}},bootstrap:{style:{dragEl:"gj-tree-drag-el gj-tree-bootstrap-drag-el",dropAsChildIcon:"glyphicon glyphicon-plus",dropAbove:"drop-above",dropBelow:"drop-below"}},bootstrap4:{style:{dragEl:"gj-tree-drag-el gj-tree-bootstrap-drag-el",dropAsChildIcon:"gj-cursor-pointer gj-icon plus",dropAbove:"drop-above",dropBelow:"drop-below"}}},private:{nodeDataBound:function(a,b){var c=b.children('[data-role="wrapper"]'),d=b.find('>[data-role="wrapper"]>[data-role="display"]');c.length&&d.length&&d.on("mousedown",gj.tree.plugins.dragAndDrop.private.createNodeMouseDownHandler(a,b,d))},createNodeMouseDownHandler:function(a,b,c){return function(d){var e,f,g,h,i=a.data();e=c.clone().wrap('<div data-role="wrapper"/>').closest("div").wrap('<li class="'+i.style.item+'" />').closest("li").wrap('<ul class="'+i.style.list+'" />').closest("ul"),$("body").append(e),e.attr("data-role","draggable-clone").addClass("gj-unselectable").addClass(i.style.dragEl),e.find('[data-role="wrapper"]').prepend('<span data-role="indicator" />'),e.draggable({drag:gj.tree.plugins.dragAndDrop.private.createDragHandler(a,b,c),stop:gj.tree.plugins.dragAndDrop.private.createDragStopHandler(a,b,c)}),f=c.parent(),g=c.offset().top,g-=parseInt(f.css("border-top-width"))+parseInt(f.css("margin-top"))+parseInt(f.css("padding-top")),h=c.offset().left,h-=parseInt(f.css("border-left-width"))+parseInt(f.css("margin-left"))+parseInt(f.css("padding-left")),h-=e.find('[data-role="indicator"]').outerWidth(!0),e.css({position:"absolute",top:g,left:h,width:c.outerWidth(!0)}),"true"===c.attr("data-droppable")&&c.droppable("destroy"),gj.tree.plugins.dragAndDrop.private.getTargetDisplays(a,b,c).each(function(){var a=$(this);"true"===a.attr("data-droppable")&&a.droppable("destroy"),a.droppable()}),gj.tree.plugins.dragAndDrop.private.getTargetDisplays(a,b).each(function(){var a=$(this);"true"===a.attr("data-droppable")&&a.droppable("destroy"),a.droppable()}),e.trigger("mousedown")}},getTargetDisplays:function(a,b,c){return a.find('[data-role="display"]').not(c).not(b.find('[data-role="display"]'))},getTargetWrappers:function(a,b){return a.find('[data-role="wrapper"]').not(b.find('[data-role="wrapper"]'))},createDragHandler:function(a,b,c){var d=gj.tree.plugins.dragAndDrop.private.getTargetDisplays(a,b,c),e=gj.tree.plugins.dragAndDrop.private.getTargetWrappers(a,b),f=a.data();return function(a,b,c){var g=$(this),h=!1;d.each(function(){var a,b=$(this);if(b.droppable("isOver",c))return a=g.find('[data-role="indicator"]'),f.style.dropAsChildIcon?a.addClass(f.style.dropAsChildIcon):a.text("+"),h=!0,!1;g.find('[data-role="indicator"]').removeClass(f.style.dropAsChildIcon).empty()}),e.each(function(){var a,b=$(this);!h&&b.droppable("isOver",c)?(a=b.position().top+b.outerHeight()/2,c.top<a?b.addClass(f.style.dropAbove).removeClass(f.style.dropBelow):b.addClass(f.style.dropBelow).removeClass(f.style.dropAbove)):b.removeClass(f.style.dropAbove).removeClass(f.style.dropBelow)})}},createDragStopHandler:function(a,b,c){var d=gj.tree.plugins.dragAndDrop.private.getTargetDisplays(a,b,c),e=gj.tree.plugins.dragAndDrop.private.getTargetWrappers(a,b),f=a.data();return function(c,g){var h=!1;$(this).draggable("destroy").remove(),d.each(function(){var c,d,e,i=$(this);if(i.droppable("isOver",g))return c=i.closest("li"),d=b.parent("ul").parent("li"),e=c.children("ul"),0===e.length&&(e=$("<ul />").addClass(f.style.list),c.append(e)),!1!==gj.tree.plugins.dragAndDrop.events.nodeDrop(a,b.data("id"),c.data("id"),e.children("li").length+1)&&(e.append(b),gj.tree.plugins.dragAndDrop.private.refresh(a,b,c,d)),h=!0,!1;i.droppable("destroy")}),h||e.each(function(){var c,d,e,f,h,i=$(this);if(i.droppable("isOver",g))return c=i.closest("li"),d=b.parent("ul").parent("li"),e=g.top<i.position().top+i.outerHeight()/2,h=b.data("id"),f=c.prevAll('li:not([data-id="'+h+'"])').length+(e?1:2),!1!==gj.tree.plugins.dragAndDrop.events.nodeDrop(a,h,c.parent("ul").parent("li").data("id"),f)&&(e?b.insertBefore(c):b.insertAfter(c),gj.tree.plugins.dragAndDrop.private.refresh(a,b,c,d)),!1;i.droppable("destroy")})}},refresh:function(a,b,c,d){var e=a.data();gj.tree.plugins.dragAndDrop.private.refreshNode(a,c),gj.tree.plugins.dragAndDrop.private.refreshNode(a,d),gj.tree.plugins.dragAndDrop.private.refreshNode(a,b),b.find('li[data-role="node"]').each(function(){gj.tree.plugins.dragAndDrop.private.refreshNode(a,$(this))}),c.children('[data-role="wrapper"]').removeClass(e.style.dropAbove).removeClass(e.style.dropBelow)},refreshNode:function(a,b){var c=b.children('[data-role="wrapper"]'),d=c.children('[data-role="expander"]'),e=c.children('[data-role="spacer"]'),f=b.children("ul"),g=a.data(),h=b.parentsUntil('[data-type="tree"]',"ul").length;f.length&&f.children().length?f.is(":visible")?d.empty().append(g.icons.collapse):d.empty().append(g.icons.expand):d.empty(),c.removeClass(g.style.dropAbove).removeClass(g.style.dropBelow),e.css("width",g.indentation*(h-1))}},public:{},events:{nodeDrop:function(a,b,c,d){return a.triggerHandler("nodeDrop",[b,c,d])}},configure:function(a){$.extend(!0,a,gj.tree.plugins.dragAndDrop.public),a.data("dragAndDrop")&&gj.draggable&&gj.droppable&&a.on("nodeDataBound",function(b,c){gj.tree.plugins.dragAndDrop.private.nodeDataBound(a,c)})}},gj.tree.plugins.lazyLoading={config:{base:{paramNames:{parentId:"parentId"},lazyLoading:!1}},private:{nodeDataBound:function(a,b,c,d){var e=a.data(),f=b.find('> [data-role="wrapper"] > [data-role="expander"]');d.hasChildren&&f.empty().append(e.icons.expand)},createDoneHandler:function(a,b){return function(c){var d,e,f,g=a.data();if("string"==typeof c&&JSON&&(c=JSON.parse(c)),c&&c.length){for(f=$("<ul />").addClass(g.style.list),b.append(f),d=0;d<c.length;d++)a.addNode(c[d],f);e=b.find('>[data-role="wrapper"]>[data-role="expander"]'),e.attr("data-mode","open"),e.empty().append(g.icons.collapse)}}},expand:function(a,b,c){var d,e=a.data(),f={},g=b.find(">ul>li");g&&g.length||"string"==typeof e.dataSource&&(f[e.paramNames.parentId]=c,d={url:e.dataSource,data:f},a.xhr&&a.xhr.abort(),a.xhr=$.ajax(d).done(gj.tree.plugins.lazyLoading.private.createDoneHandler(a,b)).fail(a.createErrorHandler()))}},public:{},events:{},configure:function(a,b,c){c.lazyLoading&&(a.on("nodeDataBound",function(b,c,d,e){gj.tree.plugins.lazyLoading.private.nodeDataBound(a,c,d,e)}),a.on("expand",function(b,c,d){gj.tree.plugins.lazyLoading.private.expand(a,c,d)}))}},gj.checkbox={plugins:{}},gj.checkbox.config={base:{uiLibrary:"materialdesign",iconsLibrary:"materialicons",style:{wrapperCssClass:"gj-checkbox-md",spanCssClass:void 0}},bootstrap:{style:{wrapperCssClass:"gj-checkbox-bootstrap"},iconsLibrary:"glyphicons"},bootstrap4:{style:{wrapperCssClass:"gj-checkbox-bootstrap gj-checkbox-bootstrap-4"},iconsLibrary:"materialicons"},materialicons:{style:{iconsCssClass:"gj-checkbox-material-icons",spanCssClass:"gj-icon"}},glyphicons:{style:{iconsCssClass:"gj-checkbox-glyphicons",spanCssClass:""}},fontawesome:{style:{iconsCssClass:"gj-checkbox-fontawesome",spanCssClass:"fa"}}},gj.checkbox.methods={init:function(a){var b=this;return gj.widget.prototype.init.call(this,a,"checkbox"),b.attr("data-checkbox","true"),gj.checkbox.methods.initialize(b),b},initialize:function(a){var b,c,d=a.data();d.style.wrapperCssClass&&(b=$('<label class="'+d.style.wrapperCssClass+" "+d.style.iconsCssClass+'"></label>'),a.attr("id")&&b.attr("for",a.attr("id")),a.wrap(b),c=$("<span />"),d.style.spanCssClass&&c.addClass(d.style.spanCssClass),a.parent().append(c))},state:function(a,b){return b?("checked"===b?(a.prop("indeterminate",!1),a.prop("checked",!0)):"unchecked"===b?(a.prop("indeterminate",!1),a.prop("checked",!1)):"indeterminate"===b&&(a.prop("checked",!0),a.prop("indeterminate",!0)),gj.checkbox.events.change(a,b),a):b=a.prop("indeterminate")?"indeterminate":a.prop("checked")?"checked":"unchecked"},toggle:function(a){return"checked"==a.state()?a.state("unchecked"):a.state("checked"),a},destroy:function(a){return"true"===a.attr("data-checkbox")&&(a.removeData(),a.removeAttr("data-guid"),a.removeAttr("data-checkbox"),a.off(),a.next("span").remove(),a.unwrap()),a}},gj.checkbox.events={change:function(a,b){return a.triggerHandler("change",[b])}},gj.checkbox.widget=function(a,b){var c=this,d=gj.checkbox.methods;return c.toggle=function(){return d.toggle(this)},c.state=function(a){return d.state(this,a)},c.destroy=function(){return d.destroy(this)},$.extend(a,c),"true"!==a.attr("data-checkbox")&&d.init.call(a,b),a},gj.checkbox.widget.prototype=new gj.widget,gj.checkbox.widget.constructor=gj.checkbox.widget,function(a){a.fn.checkbox=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.checkbox.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.checkbox.widget(this,a)}}}(jQuery),gj.editor={plugins:{},messages:{}},gj.editor.config={base:{height:300,width:void 0,uiLibrary:"materialdesign",iconsLibrary:"materialicons",locale:"en-us",buttons:void 0,style:{wrapper:"gj-editor-md",buttonsGroup:"gj-button-md-group",button:"gj-button-md",buttonActive:"active"}},bootstrap:{style:{wrapper:"gj-editor-bootstrap",buttonsGroup:"btn-group",button:"btn btn-default gj-cursor-pointer",buttonActive:"active"}},bootstrap4:{style:{wrapper:"gj-editor-bootstrap",buttonsGroup:"btn-group",button:"btn btn-outline-secondary gj-cursor-pointer",buttonActive:"active"}},materialicons:{icons:{bold:'<i class="gj-icon bold" />',italic:'<i class="gj-icon italic" />',strikethrough:'<i class="gj-icon strikethrough" />',underline:'<i class="gj-icon underlined" />',listBulleted:'<i class="gj-icon list-bulleted" />',listNumbered:'<i class="gj-icon list-numbered" />',indentDecrease:'<i class="gj-icon indent-decrease" />',indentIncrease:'<i class="gj-icon indent-increase" />',alignLeft:'<i class="gj-icon align-left" />',alignCenter:'<i class="gj-icon align-center" />',alignRight:'<i class="gj-icon align-right" />',alignJustify:'<i class="gj-icon align-justify" />',undo:'<i class="gj-icon undo" />',redo:'<i class="gj-icon redo" />'}},fontawesome:{icons:{bold:'<i class="fa fa-bold" aria-hidden="true"></i>',italic:'<i class="fa fa-italic" aria-hidden="true"></i>',strikethrough:'<i class="fa fa-strikethrough" aria-hidden="true"></i>',underline:'<i class="fa fa-underline" aria-hidden="true"></i>',listBulleted:'<i class="fa fa-list-ul" aria-hidden="true"></i>',listNumbered:'<i class="fa fa-list-ol" aria-hidden="true"></i>',indentDecrease:'<i class="fa fa-indent" aria-hidden="true"></i>',indentIncrease:'<i class="fa fa-outdent" aria-hidden="true"></i>',alignLeft:'<i class="fa fa-align-left" aria-hidden="true"></i>',alignCenter:'<i class="fa fa-align-center" aria-hidden="true"></i>',alignRight:'<i class="fa fa-align-right" aria-hidden="true"></i>',alignJustify:'<i class="fa fa-align-justify" aria-hidden="true"></i>',undo:'<i class="fa fa-undo" aria-hidden="true"></i>',redo:'<i class="fa fa-repeat" aria-hidden="true"></i>'}}},gj.editor.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"editor"),this.attr("data-editor","true"),gj.editor.methods.initialize(this),this},initialize:function(a){var b,c,d=this,e=a.data(),f=a.children('div[data-role="body"]'),g=a.children('div[data-role="toolbar"]');if(gj.editor.methods.localization(e),a.addClass(e.style.wrapper),e.width&&a.width(e.width),0===f.length&&(a.wrapInner('<div data-role="body"></div>'),f=a.children('div[data-role="body"]')),f.attr("contenteditable",!0),f.on("mouseup keyup mouseout",function(){d.updateToolbar(a,g)}),0===g.length){g=$('<div data-role="toolbar"></div>'),f.before(g);for(var h in e.buttons){b=$("<div />").addClass(e.style.buttonsGroup);for(var i in e.buttons[h])c=$(e.buttons[h][i]),c.on("click",function(){gj.editor.methods.executeCmd(a,f,g,$(this))}),b.append(c);g.append(b)}}f.height(e.height-g.outerHeight())},localization:function(a){var b=gj.editor.messages[a.locale];void 0===a.buttons&&(a.buttons=[['<button type="button" class="'+a.style.button+'" title="'+b.bold+'" data-role="bold">'+a.icons.bold+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.italic+'" data-role="italic">'+a.icons.italic+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.strikethrough+'" data-role="strikethrough">'+a.icons.strikethrough+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.underline+'" data-role="underline">'+a.icons.underline+"</button>"],['<button type="button" class="'+a.style.button+'" title="'+b.listBulleted+'" data-role="insertunorderedlist">'+a.icons.listBulleted+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.listNumbered+'" data-role="insertorderedlist">'+a.icons.listNumbered+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.indentDecrease+'" data-role="outdent">'+a.icons.indentDecrease+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.indentIncrease+'" data-role="indent">'+a.icons.indentIncrease+"</button>"],['<button type="button" class="'+a.style.button+'" title="'+b.alignLeft+'" data-role="justifyleft">'+a.icons.alignLeft+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.alignCenter+'" data-role="justifycenter">'+a.icons.alignCenter+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.alignRight+'" data-role="justifyright">'+a.icons.alignRight+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.alignJustify+'" data-role="justifyfull">'+a.icons.alignJustify+"</button>"],['<button type="button" class="'+a.style.button+'" title="'+b.undo+'" data-role="undo">'+a.icons.undo+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.redo+'" data-role="redo">'+a.icons.redo+"</button>"]])},updateToolbar:function(a,b){var c=a.data();$buttons=b.find("[data-role]").each(function(){var a=$(this),b=a.attr("data-role");b&&document.queryCommandEnabled(b)&&"true"===document.queryCommandValue(b)?a.addClass(c.style.buttonActive):a.removeClass(c.style.buttonActive)}),gj.editor.events.change(a)},executeCmd:function(a,b,c,d){b.focus(),document.execCommand(d.attr("data-role"),!1),gj.editor.methods.updateToolbar(a,c)},content:function(a,b){var c=a.children('div[data-role="body"]');return void 0===b?c.html():c.html(b)},destroy:function(a){return"true"===a.attr("data-editor")&&(a.removeClass(a.data().style.wrapper),a.removeData(),a.removeAttr("data-guid"),a.removeAttr("data-editor"),a.off(),a.empty()),a}},gj.editor.events={change:function(a){return a.triggerHandler("change")}},gj.editor.widget=function(a,b){var c=this,d=gj.editor.methods;return c.content=function(a){return d.content(this,a)},c.destroy=function(){return d.destroy(this)},$.extend(a,c),"true"!==a.attr("data-editor")&&d.init.call(a,b),a},gj.editor.widget.prototype=new gj.widget,gj.editor.widget.constructor=gj.editor.widget,function(a){a.fn.editor=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.editor.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.editor.widget(this,a)}}}(jQuery),gj.editor.messages["en-us"]={bold:"Bold",italic:"Italic",strikethrough:"Strikethrough",underline:"Underline",listBulleted:"List Bulleted",listNumbered:"List Numbered",indentDecrease:"Indent Decrease",indentIncrease:"Indent Increase",alignLeft:"Align Left",alignCenter:"Align Center",alignRight:"Align Right",alignJustify:"Align Justify",undo:"Undo",redo:"Redo"},gj.dropdown={plugins:{}},gj.dropdown.config={base:{dataSource:void 0,textField:"text",valueField:"value",selectedField:"selected",width:void 0,optionsDisplay:"materialdesign",fontSize:void 0,uiLibrary:"materialdesign",iconsLibrary:"materialicons",icons:{dropdown:'<i class="gj-icon arrow-dropdown" />'},style:{wrapper:"gj-dropdown gj-dropdown-md gj-unselectable",list:"gj-list gj-list-md gj-dropdown-list-md",active:"gj-list-md-active"}},bootstrap:{style:{wrapper:"gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-3 gj-unselectable",presenter:"btn btn-default",list:"gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group",item:"list-group-item",active:"active"},iconsLibrary:"glyphicons",optionsDisplay:"standard"},bootstrap4:{style:{wrapper:"gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable",presenter:"btn btn-outline-secondary",list:"gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group",item:"list-group-item",active:"active"},optionsDisplay:"standard"},materialicons:{style:{expander:"gj-dropdown-expander-mi"}},fontawesome:{icons:{dropdown:'<i class="fa fa-caret-down" aria-hidden="true"></i>'},style:{expander:"gj-dropdown-expander-fa"}},glyphicons:{icons:{dropdown:'<span class="caret"></span>'},style:{expander:"gj-dropdown-expander-glyphicons"}}},gj.dropdown.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"dropdown"),this.attr("data-dropdown","true"),gj.dropdown.methods.initialize(this),this},initialize:function(a){var b=a.data(),c=a.parent('div[role="wrapper"]'),d=$('<span role="display"></span>'),e=$('<span role="expander">'+b.icons.dropdown+"</span>").addClass(b.style.expander),f=$('<button role="presenter" type="button"></button>').addClass(b.style.presenter),g=$('<ul role="list" class="'+b.style.list+'"></ul>').attr("guid",a.attr("data-guid"));0===c.length?(c=$('<div role="wrapper" />').addClass(b.style.wrapper),a.wrap(c)):c.addClass(b.style.wrapper),b.fontSize&&f.css("font-size",b.fontSize),f.on("click",function(a){g.is(":visible")?g.hide():(gj.dropdown.methods.setListPosition(f,g,b),g.show(),gj.dropdown.methods.setListPosition(f,g,b))}),f.on("blur",function(a){setTimeout(function(){g.hide()},500)}),f.append(d).append(e),a.hide(),a.after(f),$("body").append(g),g.hide(),a.reload()},setListPosition:function(a,b,c){var d=a.offset();b.css("left",d.left).css("width",a.outerWidth(!0)),"standard"===c.optionsDisplay?b.css("top",d.top+a.outerHeight(!0)+2):b.css("top",d.top)},useHtmlDataSource:function(a,b){var c,d,e,f=[],g=a.find("option");for(c=0;c<g.length;c++)d=$(g[c]),e={},e[b.valueField]=d.val(),e[b.textField]=d.html(),e[b.selectedField]=d.prop("selected"),f.push(e);b.dataSource=f},filter:function(a){var b,c,d=a.data();if(d.dataSource){if("string"==typeof d.dataSource[0])for(b=0;b<d.dataSource.length;b++)c={},c[d.valueField]=d.dataSource[b],c[d.textField]=d.dataSource[b],d.dataSource[b]=c}else d.dataSource=[];return d.dataSource},render:function(a,b){var c=!1,d=a.data(),e=a.parent(),f=$("body").children('[role="list"][guid="'+a.attr("data-guid")+'"]'),g=e.children('[role="presenter"]');g.children('[role="expander"]'),g.children('[role="display"]');return a.data("records",b),a.empty(),f.empty(),b&&b.length&&($.each(b,function(){var b,e,g=this[d.valueField],h=this[d.textField],i=this[d.selectedField]&&"true"===this[d.selectedField].toString().toLowerCase();b=$('<li value="'+g+'"><div data-role="wrapper"><span data-role="display">'+h+"</span></div></li>"),b.addClass(d.style.item),b.on("click",function(b){gj.dropdown.methods.select(a,g),gj.dropdown.events.change(a)}),f.append(b),e=$('<option value="'+g+'">'+h+"</option>"),a.append(e),i&&(gj.dropdown.methods.select(a,g),c=!0)}),!1===c&&gj.dropdown.methods.select(a,b[0][d.valueField])),d.width&&(e.css("width",d.width),f.css("width",d.width),g.css("width",d.width)),d.fontSize&&f.children("li").css("font-size",d.fontSize),gj.dropdown.events.dataBound(a),a},select:function(a,b){var c=a.data(),d=$("body").children('[role="list"][guid="'+a.attr("data-guid")+'"]'),e=d.children('li[value="'+b+'"]'),f=gj.dropdown.methods.getRecordByValue(a,b);return d.children("li").removeClass(c.style.active),e.addClass(c.style.active),a.val(b),a.next('[role="presenter"]').find('[role="display"]').html(f[c.textField]),d.hide(),a},getRecordByValue:function(a,b){var c,d=a.data(),e=void 0;for(c=0;c<d.records.length;c++)if(d.records[c][d.valueField]===b){e=d.records[c];break}return e},value:function(a,b){return void 0===b?a.val():(gj.dropdown.methods.select(a,b),gj.dropdown.events.change(a),a)},destroy:function(a){var b=a.data(),c=a.parent('div[role="wrapper"]');return b&&(a.xhr&&a.xhr.abort(),a.off(),a.removeData(),a.removeAttr("data-type").removeAttr("data-guid").removeAttr("data-dropdown"),a.removeClass(),c.length>0&&(c.children('[role="presenter"]').remove(),c.children('[role="list"]').remove(),a.unwrap()),a.show()),$tree}},gj.dropdown.events={change:function(a){return a.triggerHandler("change")},dataBound:function(a){return a.triggerHandler("dataBound")}},gj.dropdown.widget=function(a,b){var c=this,d=gj.dropdown.methods;return c.value=function(a){return d.value(this,a)},c.enable=function(){return d.enable(this)},c.disable=function(){return d.disable(this)},c.destroy=function(){return d.destroy(this)},$.extend(a,c),"true"!==a.attr("data-dropdown")&&d.init.call(a,b),a},gj.dropdown.widget.prototype=new gj.widget,gj.dropdown.widget.constructor=gj.dropdown.widget,function(a){a.fn.dropdown=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.dropdown.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.dropdown.widget(this,a)}}}(jQuery),gj.datepicker={plugins:{},messages:{"en-us":{weekDays:["S","M","T","W","T","F","S"]}}},gj.datepicker.config={base:{showOtherMonths:!1,selectOtherMonths:!0,width:void 0,minDate:void 0,maxDate:void 0,format:"mm/dd/yyyy",uiLibrary:"materialdesign",iconsLibrary:"materialicons",value:void 0,weekStartDay:0,disableDates:void 0,disableDaysOfWeek:void 0,calendarWeeks:!1,keyboardNavigation:!0,locale:"en-us",icons:{rightIcon:'<i class="gj-icon event" />',previousMonth:'<i class="gj-icon chevron-left" />',nextMonth:'<i class="gj-icon chevron-right" />'},fontSize:void 0,style:{wrapper:"gj-datepicker gj-datepicker-md gj-unselectable",input:"gj-textbox-md",calendar:"gj-calendar gj-calendar-md"}},bootstrap:{style:{wrapper:"gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group",input:"form-control",calendar:"gj-calendar gj-calendar-bootstrap"},iconsLibrary:"glyphicons",showOtherMonths:!0},bootstrap4:{style:{wrapper:"gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group",input:"form-control",calendar:"gj-calendar gj-calendar-bootstrap"},showOtherMonths:!0},fontawesome:{icons:{rightIcon:'<i class="fa fa-calendar" aria-hidden="true"></i>',previousMonth:'<i class="fa fa-chevron-left" aria-hidden="true"></i>',nextMonth:'<i class="fa fa-chevron-right" aria-hidden="true"></i>'}},glyphicons:{icons:{rightIcon:'<span class="glyphicon glyphicon-calendar"></span>',previousMonth:'<span class="glyphicon glyphicon-chevron-left"></span>',nextMonth:'<span class="glyphicon glyphicon-chevron-right"></span>'}}},gj.datepicker.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"datepicker"),this.attr("data-datepicker","true"),gj.datepicker.methods.initialize(this),this},initialize:function(a){var b,c,d=a.data(),e=a.parent('div[role="wrapper"]');c="bootstrap"===d.uiLibrary?$('<span class="input-group-addon">'+d.icons.rightIcon+"</span>"):"bootstrap4"===d.uiLibrary?$('<span class="input-group-append"><span class="input-group-text">'+d.icons.rightIcon+"</span></span>"):$(d.icons.rightIcon),c.attr("role","right-icon"),0===e.length?(e=$('<div role="wrapper" />').addClass(d.style.wrapper),a.wrap(e)):e.addClass(d.style.wrapper),e=a.parent('div[role="wrapper"]'),d.width&&e.css("width",d.width),a.val(d.value).addClass(d.style.input).attr("role","input"),d.fontSize&&a.css("font-size",d.fontSize),c.on("click",function(b){$("body").children('[role="calendar"][guid="'+a.attr("data-guid")+'"]').is(":visible")?gj.datepicker.methods.hide(a):gj.datepicker.methods.show(a)}),a.on("blur",function(){a.timeout=setTimeout(function(){gj.datepicker.methods.hide(a)},500)}),e.append(c),b=gj.datepicker.methods.createCalendar(a),d.keyboardNavigation&&a.on("keydown",gj.datepicker.methods.createKeyDownHandler(a,b))},createCalendar:function(a){var b,c=a.data(),d=$('<div role="calendar" />').addClass(c.style.calendar).attr("guid",a.attr("data-guid")),e=$("<table/>"),f=$("<thead/>");for(c.fontSize&&d.css("font-size",c.fontSize),b=gj.core.parseDate(c.value,c.format,c.locale),!b||isNaN(b.getTime())?b=new Date:a.attr("day",b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate()),a.attr("month",b.getMonth()),a.attr("year",b.getFullYear()),$row=$('<tr role="month-manager" />'),$row.append($("<th><div>"+c.icons.previousMonth+"</div></th>").on("click",gj.datepicker.methods.prevMonth(a))),$row.append('<th colspan="'+(c.calendarWeeks?6:5)+'"><div role="month"></div></th>'),$row.append($("<th><div>"+c.icons.nextMonth+"</div></th>").on("click",gj.datepicker.methods.nextMonth(a))),f.append($row),$row=$('<tr role="week-days" />'),c.calendarWeeks&&$row.append("<th><div>&nbsp;</div></th>"),i=c.weekStartDay;i<gj.datepicker.messages[c.locale].weekDays.length;i++)$row.append("<th><div>"+gj.datepicker.messages[c.locale].weekDays[i]+"</div></th>");for(i=0;i<c.weekStartDay;i++)$row.append("<th><div>"+gj.datepicker.messages[c.locale].weekDays[i]+"</div></th>");return f.append($row),e.append(f),e.append("<tbody/>"),d.append(e),d.hide(),$("body").append(d),d},renderCalendar:function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q=a.data(),r=$("body").children('[role="calendar"][guid="'+a.attr("data-guid")+'"]'),s=r.children("table"),t=s.children("tbody");for(clearTimeout(a.timeout),a.attr("day")?(c=a.attr("day").split("-"),c=new Date(c[0],c[1],c[2])):c=new Date(void 0),e=parseInt(a.attr("month"),10),f=parseInt(a.attr("year"),10),s.find('thead [role="month"]').text(gj.core.messages[q.locale].monthNames[e]+" "+f),g=new Array(31,28,31,30,31,30,31,31,30,31,30,31),f%4==0&&1900!=f&&(g[1]=29),h=g[e],i=(new Date(f,e,1).getDay()+7-q.weekStartDay)%7,t.empty(),b=0,$row=$("<tr />"),l=gj.datepicker.methods.getPrevMonth(e,f),j=1;j<=i;j++)d=g[l.month]-i+j,p=new Date(l.year,l.month,d),q.calendarWeeks&&1===j&&$row.append("<td><div>"+gj.datepicker.methods.getWeekNumber(p)+"</div></td>"),n=l.year===c.getFullYear()&&l.month===c.getMonth()&&d===c.getDate()?$('<td class="selected" />'):$('<td class="other-month" />'),q.showOtherMonths&&(o=$("<div>"+d+"</div>"),n.append(o),q.selectOtherMonths&&gj.datepicker.methods.isSelectable(q,p)?(n.addClass("gj-cursor-pointer"),o.on("click",gj.datepicker.methods.select(a,r,p))):n.addClass("disabled")),$row.append(n),b++;for(j>1&&t.append($row),k=new Date,j=1;j<=h;j++)p=new Date(f,e,j),0==b&&($row=$("<tr>"),q.calendarWeeks&&$row.append("<td><div>"+gj.datepicker.methods.getWeekNumber(p)+"</div></td>")),n=$('<td day="'+j+'" />'),f===c.getFullYear()&&e===c.getMonth()&&j===c.getDate()?n.addClass("selected"):f===k.getFullYear()&&e===k.getMonth()&&j===k.getDate()?n.addClass("today"):n.addClass("current-month"),o=$("<div>"+j+"</div>"),gj.datepicker.methods.isSelectable(q,p)?(n.addClass("gj-cursor-pointer"),o.on("click",gj.datepicker.methods.select(a,r,p))):n.addClass("disabled"),n.append(o),$row.append(n),7==++b&&(t.append($row),b=0);for(m=gj.datepicker.methods.getNextMonth(e,f),j=1;0!=b;j++)p=new Date(m.year,m.month,j),n=m.year===c.getFullYear()&&m.month===c.getMonth()&&j===c.getDate()?$('<td class="selected" />'):$('<td class="other-month" />'),q.showOtherMonths&&(o=$("<div>"+j+"</div>"),n.append(o),q.selectOtherMonths&&gj.datepicker.methods.isSelectable(q,p)?(n.addClass("gj-cursor-pointer"),o.on("click",gj.datepicker.methods.select(a,r,p))):n.addClass("disabled")),$row.append(n),7==++b&&(t.append($row),b=0)},getWeekNumber:function(a){var b=new Date(a.valueOf());b.setDate(b.getDate()+6),b=new Date(Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())),b.setUTCDate(b.getUTCDate()+4-(b.getUTCDay()||7));var c=new Date(Date.UTC(b.getUTCFullYear(),0,1));return Math.ceil(((b-c)/864e5+1)/7)},getMinDate:function(a){var b;return a.minDate&&("string"==typeof a.minDate?b=gj.core.parseDate(a.minDate,a.format,a.locale):"function"==typeof a.minDate?"string"==typeof(b=a.minDate())&&(b=gj.core.parseDate(b,a.format,a.locale)):"function"==typeof a.minDate.getMonth&&(b=a.minDate)),b},getMaxDate:function(a){var b;return a.maxDate&&("string"==typeof a.maxDate?b=gj.core.parseDate(a.maxDate,a.format,a.locale):"function"==typeof a.maxDate?"string"==typeof(b=a.maxDate())&&(b=gj.core.parseDate(b,a.format,a.locale)):"function"==typeof a.maxDate.getMonth&&(b=a.maxDate)),b},isSelectable:function(a,b){var c,d=!0,e=gj.datepicker.methods.getMinDate(a),f=gj.datepicker.methods.getMaxDate(a);if(e&&b<e?d=!1:f&&b>f&&(d=!1),d){if(a.disableDates)if($.isArray(a.disableDates))for(c=0;c<a.disableDates.length;c++)a.disableDates[c]instanceof Date&&a.disableDates[c].getTime()===b.getTime()?d=!1:"string"==typeof a.disableDates[c]&&gj.core.parseDate(a.disableDates[c],a.format,a.locale).getTime()===b.getTime()&&(d=!1);else a.disableDates instanceof Function&&(d=a.disableDates(b));$.isArray(a.disableDaysOfWeek)&&a.disableDaysOfWeek.indexOf(b.getDay())>-1&&(d=!1)}return d},getPrevMonth:function(a,b){return date=new Date(b,a,1),date.setMonth(date.getMonth()-1),{month:date.getMonth(),year:date.getFullYear()}},getNextMonth:function(a,b){return date=new Date(b,a,1),date.setMonth(date.getMonth()+1),{month:date.getMonth(),year:date.getFullYear()}},prevMonth:function(a){return function(){var b,c=parseInt(a.attr("month"),10),d=parseInt(a.attr("year"),10);b=gj.datepicker.methods.getPrevMonth(c,d),a.attr("month",b.month),a.attr("year",b.year),gj.datepicker.methods.renderCalendar(a),a.focus()}},nextMonth:function(a){return function(){var b,c=parseInt(a.attr("month"),10),d=parseInt(a.attr("year"),10);b=gj.datepicker.methods.getNextMonth(c,d),a.attr("month",b.month),a.attr("year",b.year),gj.datepicker.methods.renderCalendar(a),a.focus()}},select:function(a,b,c){return function(b){var d,e=c.getMonth(),f=c.getFullYear(),g=a.data();return d=gj.core.formatDate(c,g.format,g.locale),a.val(d),gj.datepicker.events.change(a),a.attr("day",f+"-"+e+"-"+c.getDate()),a.attr("month",e),a.attr("year",f),gj.datepicker.methods.hide(a),a}},show:function(a){var b=(a.data(),a.offset()),c=$("body").children('[role="calendar"][guid="'+a.attr("data-guid")+'"]');gj.datepicker.methods.renderCalendar(a),c.css("left",b.left).css("top",b.top+a.outerHeight(!0)+3),c.show(),a.focus(),gj.datepicker.events.show(a)},hide:function(a){$("body").children('[role="calendar"][guid="'+a.attr("data-guid")+'"]').hide(),gj.datepicker.events.hide(a)},createKeyDownHandler:function(a,b){return function(c){var d,e,f,g,h,i=gj.datepicker.methods.getActiveCell(b);c=c||window.event,"38"==c.keyCode?(g=i.index(),h=i.closest("tr").prev("tr").find("td:eq("+g+")"),h.is("[day]")||(gj.datepicker.methods.prevMonth(a)(),h=b.find("tbody tr").last().find("td:eq("+g+")")),h.is("[day]")&&(h.addClass("focused"),i.removeClass("focused"))):"40"==c.keyCode?(g=i.index(),h=i.closest("tr").next("tr").find("td:eq("+g+")"),h.is("[day]")||(gj.datepicker.methods.nextMonth(a)(),h=b.find("tbody tr").first().find("td:eq("+g+")"),h.is("[day]")||(h=b.find("tbody tr:eq(1)").find("td:eq("+g+")"))),h.is("[day]")&&(h.addClass("focused"),i.removeClass("focused"))):"37"==c.keyCode?(h=i.prev("td[day]:not(.disabled)"),0===h.length&&(h=i.closest("tr").prev("tr").find("td[day]").last()),0===h.length&&(gj.datepicker.methods.prevMonth(a)(),h=b.find("tbody tr").last().find("td[day]").last()),h.length>0&&(h.addClass("focused"),i.removeClass("focused"))):"39"==c.keyCode||"9"==c.keyCode?(h=i.next("[day]:not(.disabled)"),0===h.length&&(h=i.closest("tr").next("tr").find("td[day]").first()),0===h.length&&(gj.datepicker.methods.nextMonth(a)(),h=b.find("tbody tr").first().find("td[day]").first()),h.length>0&&(h.addClass("focused"),i.removeClass("focused"))):"13"==c.keyCode?(f=parseInt(i.attr("day"),10),d=parseInt(a.attr("month"),10),e=parseInt(a.attr("year"),10),gj.datepicker.methods.select(a,b,new Date(e,d,f))()):"27"==c.keyCode&&a.hide()}},getActiveCell:function(a){var b=a.find("td[day].focused");return 0===b.length&&(b=a.find("td[day].selected"),0===b.length&&(b=a.find("td[day].today"),0===b.length&&(b=a.find("td[day]:not(.disabled)").first()))),b},value:function(a,b){var c,d,e=a.data();return void 0===b?a.val():(d=gj.core.parseDate(b,e.format,e.locale),d?(c=$("body").children('[role="calendar"][guid="'+a.attr("data-guid")+'"]'),gj.datepicker.methods.select(a,c,d)()):a.val(""),a)},destroy:function(a){var b=a.data(),c=a.parent();return b&&(a.off(),$("body").children('[role="calendar"][guid="'+a.attr("data-guid")+'"]').remove(),a.removeData(),a.removeAttr("data-type").removeAttr("data-guid").removeAttr("data-datepicker"),a.removeClass(),c.children('[role="right-icon"]').remove(),a.unwrap()),a}},gj.datepicker.events={change:function(a){return a.triggerHandler("change")},show:function(a){return a.triggerHandler("show")},hide:function(a){return a.triggerHandler("hide")}},gj.datepicker.widget=function(a,b){var c=this,d=gj.datepicker.methods;return c.value=function(a){return d.value(this,a)},c.destroy=function(){return d.destroy(this)},c.show=function(){gj.datepicker.methods.show(this)},c.hide=function(){gj.datepicker.methods.hide(this)},c.disableDates=function(a){},c.disableWeekDay=function(){},c.setMinDate=function(){},c.setMaxDate=function(){},$.extend(a,c),"true"!==a.attr("data-datepicker")&&d.init.call(a,b),a},gj.datepicker.widget.prototype=new gj.widget,gj.datepicker.widget.constructor=gj.datepicker.widget,function(a){a.fn.datepicker=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.datepicker.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.datepicker.widget(this,a)}}}(jQuery),gj.timepicker={plugins:{},messages:{"en-us":{am:"AM",pm:"PM"}}},gj.timepicker.config={base:{width:void 0,format:"MM:HH",uiLibrary:"materialdesign",value:void 0,locale:"en-us",icons:{rightIcon:'<i class="gj-icon clock" />'},style:{wrapper:"gj-timepicker gj-timepicker-md gj-unselectable",input:"gj-textbox-md",clock:"gj-clock gj-clock-md"}},bootstrap:{style:{wrapper:"gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group",input:"form-control",calendar:"gj-calendar gj-calendar-bootstrap"},iconsLibrary:"glyphicons",showOtherMonths:!0},bootstrap4:{style:{wrapper:"gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group",input:"form-control",calendar:"gj-calendar gj-calendar-bootstrap"},showOtherMonths:!0}},gj.timepicker.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"timepicker"),this.attr("data-timepicker","true"),gj.timepicker.methods.initialize(this),this},initialize:function(a){var b,c=a.data(),d=a.parent('div[role="wrapper"]'),e="materialdesign"!==c.uiLibrary&&"materialicons"===c.iconsLibrary?$('<span class="input-group-addon">'+c.icons.rightIcon+"</span>"):$(c.icons.rightIcon);e.attr("role","right-icon"),0===d.length?(d=$('<div role="wrapper" />').addClass(c.style.wrapper),a.wrap(d)):d.addClass(c.style.wrapper),d=a.parent('div[role="wrapper"]'),c.width&&d.css("width",c.width),a.val(c.value).addClass(c.style.input).attr("role","input"),e.on("click",function(b){$("body").children('[role="clock"][guid="'+a.attr("data-guid")+'"]').is(":visible")?gj.timepicker.methods.hide(a):gj.timepicker.methods.show(a)}),a.on("blur",function(){console.log("blur"),a.timeout=setTimeout(function(){a.mouseMove||(gj.timepicker.methods.hide(a),console.log("blur-aftertimeout"))},500)}),d.append(e),b=gj.timepicker.methods.createClock(a),c.keyboardNavigation&&a.on("keydown",gj.timepicker.methods.createKeyDownHandler(a,b))},createClock:function(a){var b,c=a.data(),d=$('<div role="clock" />').addClass(c.style.clock).attr("guid",a.attr("data-guid")),e=$('<div role="body" />');return $dial=$('<div role="dial"></div>'),b=gj.core.parseDate(c.value,c.format,c.locale),!b||isNaN(b.getTime())?b=new Date:a.attr("hours",b.getHours()),$dial.on("mousedown",gj.timepicker.methods.mouseDownHandler(a,d)),$dial.on("mousemove",gj.timepicker.methods.mouseMoveHandler(a,d)),$dial.on("mouseup",gj.timepicker.methods.mouseUpHandler(a)),e.append($dial),d.append(e),d.hide(),$("body").append(d),d},mouseDownHandler:function(a,b){return function(c){var d=b.find('[role="arrow"]');a.mouseMove=!0,d.show(),console.log("mousedown")}},mouseMoveHandler:function(a,b){return function(c){var d,e,f,g,h,i;a.mouseMove&&(f=b.find('[role="dial"]'),g=b.find('[role="arrow"]'),h=f.offset(),i=f.height(),d=a.mouseX(c)-h.left,e=a.mouseY(c)-h.top,console.log("mousemove x="+d+" y="+(e/i*180-90)),g.css("transform","rotate("+(e/i*180-90)+"deg);"))}},mouseUpHandler:function(a){return function(b){a.mouseMove=!1,a.focus(),clearTimeout(a.timeout),console.log("mouseup")}},renderHours:function(a,b){var c=b.find('[role="dial"]');clearTimeout(a.timeout),c.empty(),c.append('<div role="arrow" style="transform: rotate(60deg); display: none;"><div class="c296"></div><div class="c297"></div></div>'),c.append('<span class="c291" style="transform: translate(54px, -93.5307px);">1</span>'),c.append('<span class="c291" style="transform: translate(93.5307px, -54px);">2</span>'),c.append('<span class="c291" style="transform: translate(108px, 0px);">3</span>'),c.append('<span class="c291" style="transform: translate(93.5307px, 54px);">4</span>'),c.append('<span class="c291" style="transform: translate(54px, 93.5307px);">5</span>'),c.append('<span class="c291" style="transform: translate(6.61309e-15px, 108px);">6</span>'),c.append('<span class="c291" style="transform: translate(-54px, 93.5307px);">7</span>'),c.append('<span class="c291" style="transform: translate(-93.5307px, 54px);">8</span>'),c.append('<span class="c291" style="transform: translate(-108px, 1.32262e-14px);">9</span>'),c.append('<span class="c291" style="transform: translate(-93.5307px, -54px);">10</span>'),c.append('<span class="c291" style="transform: translate(-54px, -93.5307px);">11</span>'),c.append('<span class="c291" style="transform: translate(-1.98393e-14px, -108px);">12</span>'),c.append('<span class="c291 c292" style="transform: translate(38px, -65.8179px);">13</span>'),c.append('<span class="c291 c292" style="transform: translate(65.8179px, -38px);">14</span>'),c.append('<span class="c291 c292" style="transform: translate(76px, 0px);">15</span>'),c.append('<span class="c291 c292" style="transform: translate(65.8179px, 38px);">16</span>'),c.append('<span class="c291 c292 selected" style="transform: translate(38px, 65.8179px);">17</span>'),c.append('<span class="c291 c292" style="transform: translate(4.65366e-15px, 76px);">18</span>'),c.append('<span class="c291 c292" style="transform: translate(-38px, 65.8179px);">19</span>'),c.append('<span class="c291 c292" style="transform: translate(-65.8179px, 38px);">20</span>'),c.append('<span class="c291 c292" style="transform: translate(-76px, 9.30732e-15px);">21</span>'),c.append('<span class="c291 c292" style="transform: translate(-65.8179px, -38px);">22</span>'),c.append('<span class="c291 c292" style="transform: translate(-38px, -65.8179px);">23</span>'),c.append('<span class="c291 c292" style="transform: translate(-1.3961e-14px, -76px);">00</span>')},select:function(a,b,c){return function(b){return a}},show:function(a){var b=(a.data(),a.offset()),c=$("body").children('[role="clock"][guid="'+a.attr("data-guid")+'"]');gj.timepicker.methods.renderHours(a,c),c.css("left",b.left).css("top",b.top+a.outerHeight(!0)+3),c.show(),a.focus(),gj.timepicker.events.show(a)},hide:function(a){$("body").children('[role="clock"][guid="'+a.attr("data-guid")+'"]').hide(),gj.timepicker.events.hide(a)},value:function(a,b){var c,d,e=a.data();return void 0===b?a.val():(d=gj.core.parseDate(b,e.format,e.locale),d?(c=$("body").children('[role="clock"][guid="'+a.attr("data-guid")+'"]'),gj.timepicker.methods.select(a,c,d)()):a.val(""),a)},destroy:function(a){var b=a.data(),c=a.parent();return b&&(a.off(),$("body").children('[role="clock"][guid="'+a.attr("data-guid")+'"]').remove(),a.removeData(),a.removeAttr("data-type").removeAttr("data-guid").removeAttr("data-timepicker"),a.removeClass(),c.children('[role="right-icon"]').remove(),a.unwrap()),a}},gj.timepicker.events={change:function(a){return a.triggerHandler("change")},show:function(a){return a.triggerHandler("show")},hide:function(a){return a.triggerHandler("hide")}},gj.timepicker.widget=function(a,b){var c=this,d=gj.timepicker.methods;return c.value=function(a){return d.value(this,a)},c.destroy=function(){return d.destroy(this)},c.show=function(){gj.timepicker.methods.show(this)},c.hide=function(){gj.timepicker.methods.hide(this)},$.extend(a,c),"true"!==a.attr("data-timepicker")&&d.init.call(a,b),a},gj.timepicker.widget.prototype=new gj.widget,gj.timepicker.widget.constructor=gj.timepicker.widget,function(a){a.fn.timepicker=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.timepicker.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.timepicker.widget(this,a)}}}(jQuery);

/*! add common.js */
/* Owl Carousel */
jQuery(document).ready(function(){
  jQuery('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:1800,
    smartSpeed:900,
    responsiveClass:true,
    navText:["<i class='fa fa-angle-left fa-2x'></i>","<i class='fa fa-angle-right fa-2x'></i>"],
    responsive:{
        0:{
            items:1,
            nav:true,
            loop: true
        },
        575:{
            items:2,
            nav:true,
            loop: true
        },
        768:{
            items:3,
            nav:true,
            loop: true
        },
        992:{
            items:3,
            nav:true,
            loop:true
        },
        1200:{
            items:4,
            nav:true,
            loop:true
        }
    }
  });

  jQuery("#carousel").owlCarousel({
    navigation:true,
    navigationText : ["&#xe079;","&#xe080;"],
  });


  }); /* Завершение начальной функции $(document).ready(function(); *** Не удалять! *** */