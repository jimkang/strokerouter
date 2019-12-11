(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var StrokeRouter = require('./strokerouter');

var report = document.querySelector('#report');
var docStrokeRouter = StrokeRouter(document);

// Single key routes.
docStrokeRouter.routeKeyUp('escape', null, function escape() {
  report.textContent = 'Escape pressed.';
});
docStrokeRouter.routeKeyUp('u', null, function u() {
  report.textContent = 'U pressed.';
});

// Routes that use modifier keys.
docStrokeRouter.routeKeyUp('equal', ['shift'], function plus() {
  report.textContent = 'Plus (= and shift) pressed.';
});
docStrokeRouter.routeKeyDown('backspace', ['meta'], function deleteCmd() {
  report.textContent = 'Delete and Cmd (on a Mac) pressed.';
});
docStrokeRouter.routeKeyDown('z', ['alt', 'ctrl'], function ctrlAltZ() {
  report.textContent = 'Ctrl, Opt (Alt), and Z pressed.';
});

docStrokeRouter.routeKeyDown('k', ['alt', 'meta'], function cmdAltU() {
  docStrokeRouter.unrouteKeyUp('u', null);
  report.textContent = 'Cmd, Opt (Alt), and U pressed. U is now unrouted.';
});
docStrokeRouter.routeKeyDown('z', ['alt', 'meta'], function cmdAltZ() {
  docStrokeRouter.unrouteKeyDown('z', ['alt', 'ctrl'], null);
  report.textContent =
    'Cmd, Opt (Alt), and Z pressed. Ctrl + Opt (Alt) + Z is now unrouted.';
});

document.addEventListener('keyup', docStrokeRouter.onKeyUp);
document.addEventListener('keydown', docStrokeRouter.onKeyDown);

var editSpaceEl = document.querySelector('.editspace');
var editSpaceRouter = StrokeRouter(editSpaceEl);

editSpaceRouter.setKeyUpAbsorbMode(true);
editSpaceRouter.setKeyDownAbsorbMode(true);
editSpaceRouter.routeKeyDown('q', ['ctrl'], function leaveEditSpace() {
  report.textContent = 'Ctrl and Q pressed inside of edit space.';
  document.querySelector('.editspace').blur();
});

editSpaceEl.addEventListener('keyup', editSpaceRouter.onKeyUp);
editSpaceEl.addEventListener('keydown', editSpaceRouter.onKeyDown);

},{"./strokerouter":3}],2:[function(require,module,exports){
var keyCodesForNames = {
  backspace: 8,
  tab: 9,
  enter: 13,
  escape: 27,
  space: 32,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36,
  leftArrow: 37,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  insert: 45,
  delete: 46,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  semicolon: 186,
  equal: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardSlash: 191,
  graveAccent: 192,
  openBracket: 219,
  backslash: 220,
  closeBracket: 221,
  singleQuote: 222
};

module.exports = keyCodesForNames;

},{}],3:[function(require,module,exports){
var keycodesForNames = require('./keycodes-for-names');

function StrokeRouter(sourceEl, d3) {
  var keyUpRespondersForKeyIds = {};
  var keyDownRespondersForKeyIds = {};
  var enable = true;
  var stopPropIfResponderFound = true;
  var absorbAllKeyUpEvents = false;
  var absorbAllKeyDownEvents = false;

  function routeKeyUp(keyName, modifiers, responder) {
    var keyId = getKeyId(keycodesForNames[keyName], modifiers);
    keyUpRespondersForKeyIds[keyId] = responder;
  }

  function routeKeyDown(keyName, modifiers, responder) {
    var keyId = getKeyId(keycodesForNames[keyName], modifiers);
    keyDownRespondersForKeyIds[keyId] = responder;
  }

  function unrouteKeyUp(keyName, modifiers) {
    var keyId = getKeyId(keycodesForNames[keyName], modifiers);
    delete keyUpRespondersForKeyIds[keyId];
  }

  function unrouteKeyDown(keyName, modifiers) {
    var keyId = getKeyId(keycodesForNames[keyName], modifiers);
    delete keyDownRespondersForKeyIds[keyId];
  }

  function getKeyId(keyCode, modifiers) {
    var keyId = keyCode;
    if (modifiers) {
      keyId = modifiers.reduce(addModifierMask, keyCode);
    }
    return keyId;
  }

  function listModifiersInEvent(event) {
    var modifiers = [];
    if (event.metaKey) {
      modifiers.push('meta');
    }
    if (event.ctrlKey) {
      modifiers.push('ctrl');
    }
    if (event.shiftKey) {
      modifiers.push('shift');
    }
    if (event.altKey) {
      modifiers.push('alt');
    }
    return modifiers;
  }

  function addModifierMask(currentValue, modifierString) {
    var newValue = currentValue;
    switch (modifierString) {
    case 'meta':
      newValue += 1000;
      break;
    case 'ctrl':
      newValue += 10000;
      break;
    case 'shift':
      newValue += 100000;
      break;
    case 'alt':
      newValue += 1000000;
      break;
    }
    return newValue;
  }

  function onKeyUpD3() {
    if (d3) {
      onKeyUp(d3.event);
    }
  }

  function onKeyDownD3() {
    if (d3) {
      onKeyDown(d3.event);
    }
  }

  function onKeyUp(e) {
    if (enable) {
      if (absorbAllKeyUpEvents) {
        e.stopPropagation();
      }
      var keyId = getKeyId(e.which, listModifiersInEvent(e));
      if (keyId in keyUpRespondersForKeyIds) {
        if (stopPropIfResponderFound) {
          e.stopPropagation();
        }
        keyUpRespondersForKeyIds[keyId]();
      }
    }
  }

  function onKeyDown(e) {
    if (enable) {
      if (absorbAllKeyDownEvents) {
        e.stopPropagation();
      }
      var keyId = getKeyId(e.which, listModifiersInEvent(e));
      if (keyId in keyDownRespondersForKeyIds) {
        if (stopPropIfResponderFound) {
          e.stopPropagation();
        }
        keyDownRespondersForKeyIds[keyId]();
      }
    }
  }

  function setKeyDownAbsorbMode(newMode) {
    absorbAllKeyDownEvents = newMode;
  }

  function setKeyUpAbsorbMode(newMode) {
    absorbAllKeyUpEvents = newMode;
  }

  return {
    routeKeyUp: routeKeyUp,
    routeKeyDown: routeKeyDown,
    unrouteKeyUp: unrouteKeyUp,
    unrouteKeyDown: unrouteKeyDown,
    setKeyDownAbsorbMode: setKeyDownAbsorbMode,
    setKeyUpAbsorbMode: setKeyUpAbsorbMode,
    onKeyUp: onKeyUp,
    onKeyDown: onKeyDown,
    onKeyUpD3: onKeyUpD3,
    onKeyDownD3: onKeyDownD3
  };
}

module.exports = StrokeRouter;

},{"./keycodes-for-names":2}]},{},[1]);
