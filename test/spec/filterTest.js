/**
 * Created by adzs637 on 13/01/2015.
 */
describe("Filter test suite", function () {

    var filter;
    var datas;

    var SUZ_FIRSTNAME = 'Suzanne';
    var SUZ_LASTNAME = 'Mcbride';


    beforeEach(function () {
        datas=[
            {
                "id": "1",
                "firstname": "Suzanne",
                "lastname": "Mcbride",
                "roles":["ADMIN"]
            },
            {
                "id": "2",
                "firstname": "Carroll",
                "lastname": "Humphrey",
                "roles":["ADMIN"]
            },
            {
                "id": "3",
                "firstname": "Terry",
                "lastname": "Mckinney",
                "roles":["READ","WRITE"]
            },
            {
                "id": "4",
                "firstname": "Maureen",
                "lastname": "Hobbs",
                "roles":["READ","WRITE"]
            }
        ];
        filter = new handson.Filter();
    });

    afterEach(function () {
        filter = null;
    });


    describe("Concerning the parameter", function () {

        it("it should return an empty array if the input data is null", function () {
            var datas=filter.filter(null,SUZ_FIRSTNAME);
            expect(datas.length).toEqual(0);
        });

        it("it should return an empty array if the input data is not an array", function () {
            var datas=filter.filter("NotANArray",SUZ_FIRSTNAME);
            expect(datas.length).toEqual(0);
        });

        it("it should return an empty array if the input data is empty", function () {
            var datas=filter.filter([], SUZ_FIRSTNAME);
            expect(datas.length).toEqual(0);
        });

        it("it should return the same data array if the filter  param is null", function () {
            var filterDatas=filter.filter(datas, null);
            expect(filterDatas).toEqual(datas);
        });

    });


    describe("Concerning the filter function on fistname", function () {
        it("it should return elements with name containing part of the value", function () {
            var filterDatas=filter.filter(datas, "Suz");
            expect(filterDatas.length).toEqual(1);
            expect(filterDatas[0]).toEqual(datas[0]);
        });

        it("it should return elements with name containing all the value", function () {
            var filterDatas=filter.filter(datas, SUZ_FIRSTNAME);
            expect(filterDatas.length).toEqual(1);
            expect(filterDatas[0]).toEqual(datas[0]);
        });


        it("it should not return elements if name doesn't match the all value", function () {
            var filterDatas=filter.filter(datas, SUZ_FIRSTNAME+"PlusSomeText");
            expect(filterDatas.length).toEqual(0);
        });

        it("it should return elements with name containing part of the value whatever the case is", function () {
            var filterDatas=filter.filter(datas, SUZ_FIRSTNAME.toUpperCase());
            expect(filterDatas.length).toEqual(1);
            expect(filterDatas[0]).toEqual(datas[0]);
        });

    });

    describe("Concerning the filter function on lastname", function () {
        it("it should return elements with name containing part of the value", function () {
            var filterDatas=filter.filter(datas, "Mcb");
            expect(filterDatas.length).toEqual(1);
            expect(filterDatas[0]).toEqual(datas[0]);
        });

        it("it should return elements with name containing all the value", function () {
            var filterDatas=filter.filter(datas, SUZ_LASTNAME);
            expect(filterDatas.length).toEqual(1);
            expect(filterDatas[0]).toEqual(datas[0]);
        });

        it("it should not return elements if name doesn't match the all value", function () {
            var filterDatas=filter.filter(datas, SUZ_LASTNAME+"PlusSomeText");
            expect(filterDatas.length).toEqual(0);
        });

        it("it should return elements with name containing part of the value whatever the case is", function () {
            var filterDatas=filter.filter(datas, SUZ_LASTNAME.toUpperCase());
            expect(filterDatas.length).toEqual(1);
            expect(filterDatas[0]).toEqual(datas[0]);
        });

    });
});