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
  report.textContent = 'Cmd, Opt (Alt), and Z pressed. Ctrl + Opt (Alt) + Z is now unrouted.';
});

var editSpaceRouter = StrokeRouter(document.querySelector('.editspace'));
editSpaceRouter.absorbAllKeyUpEvents = true;
editSpaceRouter.absorbAllKeyDownEvents = true;
editSpaceRouter.routeKeyDown('q', ['ctrl'], function leaveEditSpace() {
  report.textContent = 'Ctrl and Q pressed inside of edit space.';
  document.querySelector('.editspace').blur();
});
