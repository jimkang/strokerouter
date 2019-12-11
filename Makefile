BROWSERIFY = browserify
UGLIFY = node_modules/.bin/uglifyjs
LASTSHA=$$(git rev-parse HEAD)

run-browserify-example:
	cd examples/browserify && wzrd app.js:index.js -- -d

run-basic-example:
	python -m SimpleHTTPServer

build:
	$(BROWSERIFY) window-exports.js | $(UGLIFY) -c -m -o strokerouter-dist.min.js

build-browserify-example:
	cd examples/browserify && $(BROWSERIFY) app.js > index.js

commit-build: build build-browserify-example
	git commit -a -m"Build for $(LASTSHA)."

pushall: commit-build
	git push origin gh-pages && npm publish

prettier:
	prettier --single-quote --write "**/*.js"
