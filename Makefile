all: test
test:
	./node_modules/.bin/mocha --recursive --timeout 10000 --reporter spec test/
.PHONY: all test