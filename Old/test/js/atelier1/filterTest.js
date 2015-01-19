/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 10/07/12
 * Time: 09:43
 * To change this template use File | Settings | File Templates.
 */

describe("Filter test suite", function () {

    var filter;
    var NB_DIV = 7;
    var FILTER_A = 'filterA';
    var FILTER_B = 'filterB';
    var FILTER_AB = FILTER_A + ' ' + FILTER_B;

    function createDivBySandBox() {
        var div = sandbox({
            id:'div1',
            'data-role':FILTER_AB
        });
        setFixtures(div);

        div = sandbox({
            id:'div2',
            'data-role':FILTER_B
        });
        appendSetFixtures(div);
    }

    function createDivByFile() {
        loadFixtures('filterFixture.html');
    }

    function expectAllDivAreVisible(){
        for (var i = 1, ln = NB_DIV; i <= ln; i++) {
            expect($('#div' + i)).toBeVisible();
        }
    }

    function expectAllDivAreHidden(){
        for (var i = 1, ln = NB_DIV; i <= ln; i++) {
            expect($('#div' + i)).not.toBeVisible();
        }
    }

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        createDivByFile();
        filter = new handson.Filter($("#jasmine-fixtures"));
    });

    afterEach(function () {
        filter = null;
    });

    it("it ok with an empty test", function () {
        expect(true).toBeTruthy();
    });

    it("it should hide div that doesn't have the correct data-role", function () {
        filter.filter([FILTER_A]);
        expect($('#div1')).toBeVisible();
        expect($('#div2')).not.toBeVisible();
    });

    it("it should restore div that was hide", function () {
        filter.filter([FILTER_A,FILTER_B]);
        expect($('#div1')).not.toBeVisible();
        expect($('#div2')).not.toBeVisible();
        filter.filter([FILTER_A]);
        expect($('#div1')).toBeVisible();
        expect($('#div2')).not.toBeVisible();
    });



    it("it should restore div if no data-roles are passed after some div have been hide", function () {
        filter.filter([FILTER_A]);
        filter.filter();
        expect($('#div1')).toBeVisible();
        expect($('#div2')).toBeVisible();
    });

    it("it should keep div that have data-role with others roles", function () {
        createDivBySandBox;
        filter.filter([FILTER_A]);
        expect($('#div1')).toBeVisible();
    });

    //NEW IMPLEMENTATION
    it("it should restore div if an empty  array of filter is passed after some div have been hide", function () {
        filter.filter([FILTER_A]);
        filter.filter([]);

        expectAllDivAreVisible();
    });

    it("it should restore div if the parameter is not an array", function () {
        filter.filter(FILTER_A);

        expectAllDivAreVisible();
    });

    it("it should mask all div if the array contain non-exixting filter", function () {
        filter.filter(["UNKNOW_ROLE1","UNKNOW_ROLE2"]);

        expectAllDivAreHidden();
    });

    it("it should keep only div that have all the filter in the passed array", function () {
        filter.filter([FILTER_A,FILTER_B]);
        expect($('#div1')).not.toBeVisible();
        expect($('#div2')).not.toBeVisible();
        expect($('#div4')).toBeVisible();
        expect($('#div5')).toBeVisible();
    });
})