/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 10/07/12
 * Time: 09:43
 * To change this template use File | Settings | File Templates.
 */

describe("Filter test suite", function () {

    var filter;
    var datas;

    var NB_DIV = 7;
    var FILTER_A = 'filterA';
    var FILTER_B = 'filterB';
    var FILTER_AB = FILTER_A + ' ' + FILTER_B;


    beforeEach(function () {
        filter = new handson.Filter();
    });

    afterEach(function () {
        filter = null;
    });

    it("it ok with an empty test", function () {
        expect(true).toBeTruthy();
    });

    describe("Concerning the parameter", function () {

        it("it should return an empty array if the input data is null", function () {
            var datas=filter.filter(null, []);
            expect(datas.length).toEqual(0);
        });

        it("it should return an empty array if the input data is not an array", function () {
            var datas=filter.filter(FILTER_A, []);
            expect(datas.length).toEqual(0);
        });

        it("it should return an empty array if the input data is empty", function () {
            var datas=filter.filter([], []);
            expect(datas.length).toEqual(0);
        });

        it("it should return the same data array if the filter  param is empty", function () {
            var datas=[{id:1},{id:2}];
            var filterDatas=filter.filter(datas, []);
            expect(filterDatas).toEqual(datas);
        });

        it("it should return the same data array if the filter  param is null", function () {
            var datas=[{id:1},{id:2}];
            var filterDatas=filter.filter(datas, null);
            expect(filterDatas).toEqual(datas);
        });

        it("it should return the same data array if the filter  param is not an array", function () {
            var datas=[{id:1},{id:2}];
            var filterDatas=filter.filter(datas, FILTER_A);
            expect(filterDatas).toEqual(datas);
        });
    });


    describe("Concerning the filter function", function () {
        it("it should return an objects that have in there roles all the filters", function () {
            var mod1={id:1,roles:[FILTER_A,FILTER_B]};
            var datas=[mod1];

            var filterDatas=filter.filter(datas, [FILTER_A,FILTER_B]);

            expect(filterDatas.length).toEqual(1);
            expect(filterDatas[0]).toEqual(mod1);

        });


        it("it should not return objects without roles", function () {
            var mod1={id:2,roles:[]};
            var datas=[mod1];

            var filterDatas=filter.filter(datas, [FILTER_A]);

            expect(filterDatas.length).toEqual(0);

        });

        it("it should return objects with other roles", function () {
            var mod1={id:2,roles:[FILTER_A,FILTER_B]};
            var datas=[mod1];

            var filterDatas=filter.filter(datas, [FILTER_A]);

            expect(filterDatas.length).toEqual(1);
            expect(filterDatas[0]).toEqual(mod1);

        });



    });


})