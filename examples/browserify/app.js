var d3 = require('d3-selection');
var StrokeRouter = require('./strokerouter');

var report = d3.select('#report');
var docStrokeRouter = StrokeRouter(d3.select(document));

// Single key routes.
docStrokeRouter.routeKeyUp('escape', null, function escape() {
  report.text('Escape pressed.');
});
docStrokeRouter.routeKeyUp('u', null, function u() {
  report.text('U pressed.');
});

// Routes that use modifier keys.
docStrokeRouter.routeKeyUp('equal', ['shift'], function plus() {
  report.text('Plus (= and shift) pressed.');
});
docStrokeRouter.routeKeyDown('backspace', ['meta'], function deleteCmd() {
  report.text('Delete and Cmd (on a Mac) pressed.');
});
docStrokeRouter.routeKeyDown('z', ['alt', 'ctrl'], function ctrlAltZ() {
  report.text('Ctrl, Opt (Alt), and Z pressed.');
});

docStrokeRouter.routeKeyDown('k', ['alt', 'meta'], function cmdAltU() {
  docStrokeRouter.unrouteKeyUp('u', null);
  report.text('Cmd, Opt (Alt), and U pressed. U is now unrouted.');
});
docStrokeRouter.routeKeyDown('z', ['alt', 'meta'], function cmdAltZ() {
  docStrokeRouter.unrouteKeyDown('z', ['alt', 'ctrl'], null);
  report.text('Cmd, Opt (Alt), and Z pressed. Ctrl + Opt (Alt) + Z is now unrouted.');
});

var editSpaceRouter = StrokeRouter(d3.select('.editspace'));
editSpaceRouter.absorbAllKeyUpEvents = true;
editSpaceRouter.absorbAllKeyDownEvents = true;
editSpaceRouter.routeKeyDown('q', ['ctrl'], function leaveEditSpace() {
  report.text('Ctrl and Q pressed inside of edit space.');
  document.querySelector('.editspace').blur();
});
