BROWSERIFY = browserify
LASTSHA=$$(git rev-parse HEAD)

run-browserify-example:
	cd examples/browserify && wzrd app.js:index.js -- -d

build:
	cd examples/browserify && $(BROWSERIFY) app.js | $(UGLIFY) -c -m -o index.js

commit-build: build
	git commit -a -m"Build for $(LASTSHA)."

pushall: commit-build
	git push origin gh-pages
