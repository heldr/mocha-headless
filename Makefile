all: test
test:
	mocha --recursive --timeout 10000 --reporter spec test/
.PHONY: all test
