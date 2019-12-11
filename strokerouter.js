var keycodesForNames = require('./keycodes-for-names');

function StrokeRouter(sourceEl) {
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

  (function init() {
    sourceEl.addEventListener('keyup', onKeyUp);
    sourceEl.addEventListener('keydown', onKeyDown);
  })();

  return {
    routeKeyUp: routeKeyUp,
    routeKeyDown: routeKeyDown,
    unrouteKeyUp: unrouteKeyUp,
    unrouteKeyDown: unrouteKeyDown,
    setKeyDownAbsorbMode: setKeyDownAbsorbMode,
    setKeyUpAbsorbMode: setKeyUpAbsorbMode
  };
}

module.exports = StrokeRouter;
