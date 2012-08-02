var expect = require('expect.js'),
    browser = require('zombie'),
    baseUrl = 'http://heldr.com';

describe('Home page', function() {

    var dom, window, cookies, $, pageContent, headers;

    beforeEach( function(done) {

        browser.visit( baseUrl, function( err, data ) {
            if (err) throw err;

            var statusCode = data.response[0];

            if( statusCode === 200 ) {

                // emulate window object
                window = data.window;

                // catch the page content
                pageContent = data.response[2];

                // request headers
                headers = data.response[1];

                // window.document.cookie alternative
                cookies = data._cookies._cookies;

                // to run its jQuery
                $ = window.jQuery;

                // dom as a zombie callback ( The Walking Dead =] )
                dom = data;

                done();

            } else {
                throw "Request error: " + statusCode;
            }

        });

    });

    describe('-html5 compatibility', function() {

        it('should have html5 doctype', function() {

            var doctypeRE = new RegExp('^\<\!doctype html\>');

            expect( pageContent ).to.match( doctypeRE );

        });

        it('should have Modernizr html5shiv ', function() {

            expect( window.html5 ).to.be.an('object');

        });

    });

    describe('-jQuery', function() {

        it('should have jQuery object', function() {

            expect( window.jQuery ).to.be.an('function');

        });

        it('should be associated with $ global variable', function() {

            expect( window.$ ).to.be.eql( window.jQuery );

        });

        it('should be jQuery 1.7.2', function() {

            expect( window.jQuery().jquery ).to.be.eql('1.7.2');

        });

    });

});