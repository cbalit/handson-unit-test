/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 10/07/12
 * Time: 09:43
 * To change this template use File | Settings | File Templates.
 */

describe("Filter test suite", function () {

    var filter;



    beforeEach(function () {
        filter = new handson.Filter($());
    });

    afterEach(function () {
        filter = null;
    });

    it("it ok with an empty test", function () {
        expect(true).toBeTruthy();
    });

})