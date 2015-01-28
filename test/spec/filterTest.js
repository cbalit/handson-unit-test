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

    describe("Concerning filterByName", function () {
        describe("Concerning the parameter", function () {

            it("it should return an empty array if the input data is null", function () {
                var datas=filter.filterByName(null,SUZ_FIRSTNAME);
                expect(datas.length).toEqual(0);
            });

            it("it should return an empty array if the input data is not an array", function () {
                var datas=filter.filterByName("NotANArray",SUZ_FIRSTNAME);
                expect(datas.length).toEqual(0);
            });

            it("it should return an empty array if the input data is empty", function () {
                var datas=filter.filterByName([], SUZ_FIRSTNAME);
                expect(datas.length).toEqual(0);
            });

            it("it should return the same data array if the filter  param is null", function () {
                var filterDatas=filter.filterByName(datas, null);
                expect(filterDatas).toEqual(datas);
            });

        });


        describe("Concerning the filter function on fistname", function () {
            it("it should return elements with name containing part of the value", function () {
                var filterDatas=filter.filterByName(datas, "Suz");
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

            it("it should return elements with name containing all the value", function () {
                var filterDatas=filter.filterByName(datas, SUZ_FIRSTNAME);
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });


            it("it should not return elements if name doesn't match the all value", function () {
                var filterDatas=filter.filterByName(datas, SUZ_FIRSTNAME+"PlusSomeText");
                expect(filterDatas.length).toEqual(0);
            });

            it("it should return elements with name containing part of the value whatever the case is", function () {
                var filterDatas=filter.filterByName(datas, SUZ_FIRSTNAME.toUpperCase());
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

        });

        describe("Concerning the filter function on lastname", function () {
            it("it should return elements with name containing part of the value", function () {
                var filterDatas=filter.filterByName(datas, "Mcb");
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

            it("it should return elements with name containing all the value", function () {
                var filterDatas=filter.filterByName(datas, SUZ_LASTNAME);
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

            it("it should not return elements if name doesn't match the all value", function () {
                var filterDatas=filter.filterByName(datas, SUZ_LASTNAME+"PlusSomeText");
                expect(filterDatas.length).toEqual(0);
            });

            it("it should return elements with name containing part of the value whatever the case is", function () {
                var filterDatas=filter.filterByName(datas, SUZ_LASTNAME.toUpperCase());
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

        });
    });

    describe("Concerning filterByRoles", function () {
        var FILTER_ADMIN = 'ADMIN';
        var FILTER_READ = 'READ';
        var FILTER_WRITE='WRITE';

        describe("Concerning the parameter", function () {

            it("it should return an empty array if the input data is null", function () {
                var datas=filter.filterByRoles(null, []);
                expect(datas.length).toEqual(0);
            });

            it("it should return an empty array if the input data is not an array", function () {
                var datas=filter.filterByRoles("NotANArray", []);
                expect(datas.length).toEqual(0);
            });

            it("it should return an empty array if the input data is empty", function () {
                var datas=filter.filterByRoles([], []);
                expect(datas.length).toEqual(0);
            });

            it("it should return the same data array if the roles  param is empty", function () {
                var datas=[{id:1},{id:2}];
                var filterDatas=filter.filterByRoles(datas, []);
                expect(filterDatas).toEqual(datas);
            });

            it("it should return the same data array if the roles  param is null", function () {
                var datas=[{id:1},{id:2}];
                var filterDatas=filter.filterByRoles(datas, null);
                expect(filterDatas).toEqual(datas);
            });

            it("it should return the same data array if the roles  param is not an array", function () {
                var datas=[{id:1},{id:2}];
                var filterDatas=filter.filterByRoles(datas, FILTER_ADMIN);
                expect(filterDatas).toEqual(datas);
            });
        });


        describe("Concerning the filter function", function () {

            var item1,item2,item3,datas;

            beforeEach(function () {
                item1={roles:[FILTER_ADMIN,FILTER_READ]};
                item2={roles:[FILTER_ADMIN]};
                item3={roles:[FILTER_READ]};
                datas=[item1,item2,item3];
            });

            it("it should return elements that have in there roles all the filters", function () {
                var filterDatas=filter.filterByRoles(datas, [FILTER_ADMIN,FILTER_READ]);
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(item1);
            });


            it("it should not return objects that doesn't have the roles", function () {
                var filterDatas=filter.filterByRoles(datas, [FILTER_WRITE]);
                expect(filterDatas.length).toEqual(0);

            });

            it("it should return objects with other roles", function () {
                var filterDatas=filter.filterByRoles(datas, [FILTER_ADMIN]);
                expect(filterDatas.length).toEqual(2);
            });

        });

    });
});