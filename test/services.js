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
            expect(markdownService().getHeader('# First \n ## Second \n ### Third')).to.be.equals('First');
            expect(markdownService().getHeader('# First \n ## Second \n ### Third', 2)).to.be.equals('Second');
            expect(markdownService().getHeader('# First \n ## Second \n ### Third', 3)).to.be.equals('Third');
        });
    });
});