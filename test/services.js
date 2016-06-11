/**
 * Unit-tests for Catality services
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 05.06.16
 */

describe('Services', function () {
	describe('Markdown Service', function () {
		it('Should be an object', function () {
			expect(markdownService()).to.be.a('Object');
		});

		it('Should convert markdown to html via toHtml() method', function () {
			var md = '[GitHub!](www.github.com)',
				html = '<p><a href="www.github.com">GitHub!</a></p>';

			markdownService().toHtml(md).should.equal(html);
		});

		it('Should get header from markdown', function () {
			expect(markdownService().getHeader('# Cats!')).to.be.equals('Cats!');
			expect(markdownService().getHeader('#Header without space')).to.be.equals('Header without space');
			expect(markdownService().getHeader('#')).to.be.equals('');
		});

		it('Should get header from markdown filtered by level', function () {
			expect(markdownService().getHeader('# First \n ## Second \n ### Third', 2)).to.be.equals('Second');
			expect(markdownService().getHeader('# First \n ## Second \n ### Third', 3)).to.be.equals('Third');
		});

		it('Should get document body from markdown without top-level header', function () {
			expect(markdownService().getBody('#First \nBody')).to.be.equals('Body');
			expect(markdownService().getBody('# First \nBody')).to.be.equals('Body');
		});
	});

	describe('Link Service', function () {
		var location;

		beforeEach(inject(function($location) {
			location = $location;
		}));

		it('Should be an object', function () {
			expect(linkService(location)).to.be.a('Object');
		});

		it('Should detect external link', function() {
			expect(linkService(location).isExternalLink('https://google.com')).to.be.true;
		});

		it('Should detect internal link', function() {
			expect(linkService(location).isExternalLink('localhost')).to.be.true;
		});

		it('Should detect internal link with protocol', function() {
			expect(linkService(location).isExternalLink('http://localhost/')).to.be.true;
		});

		it('Should detect internal link with port', function() {
			expect(linkService(location).isExternalLink('http://localhost:9876/')).to.be.true;
		});

		it('Should detect empty url as a local', function() {
			expect(linkService(location).isLocalLink('')).to.be.true;
		});

		it('Should detect hash as a local URL', function() {
			expect(linkService(location).isLocalLink('#top')).to.be.true;
		});

		it('Should detect relative path as a local URL', function() {
			expect(linkService(location).isLocalLink('/articles/popular')).to.be.true;
		});
	})
});