'use strict';

describe('Service: userService', function () {

    // load the service's module
    beforeEach(module('handsOnUnitTestApp'));

    // instantiate service
    var userService, datas;
    var SUZ_FIRSTNAME = 'Suzanne';
    var SUZ_LASTNAME = 'Mcbride';

    beforeEach(inject(function (_userService_) {
        datas = [
            {
                "id": "54b525c472540a87",
                "firstname": "Suzanne",
                "lastname": "Mcbride",
                "mail": "suzannemcbride@accupharm.com",
                "company": "COMTEXT",
                "roles": ["ADMIN"]
            },
            {
                "id": "54b525c4d48c5977",
                "firstname": "Carroll",
                "lastname": "Humphrey",
                "mail": "carrollhumphrey@comtext.com",
                "company": "DEVILTOE",
                "roles": ["ADMIN"]
            },
            {
                "id": "54b525c4d7e55f2d",
                "firstname": "Terry",
                "lastname": "Mckinney",
                "mail": "terrymckinney@deviltoe.com",
                "company": "VIASIA",
                "roles": ["READ", "WRITE"]
            },
            {
                "id": "54b525c4d233cc5a",
                "firstname": "Maureen",
                "lastname": "Hobbs",
                "mail": "maureenhobbs@viasia.com",
                "company": "MAGNINA",
                "roles": ["READ", "WRITE"]
            },
            {
                "id": "54b525c4748ad8",
                "firstname": "Ida",
                "lastname": "Raymond",
                "mail": "idaraymond@magnina.com",
                "company": "PHARMEX",
                "roles": ["READ"]
            },
            {
                "id": "54b525c456c8a1",
                "firstname": "Young",
                "lastname": "Jacobson",
                "mail": "youngjacobson@pharmex.com",
                "company": "XPLOR",
                "roles": ["ANONYMOUS"]
            }
        ];
        userService = _userService_;
        userService.setUsers(datas);
    }));

    describe('getUsers', function () {
        it('should', function () {

        });
    });

    describe('filterByName', function () {
        var filterDatas;

        it("it should store the init data array if the value  param is null", function () {
            userService.filterByName();
            filterDatas = userService.users;
            expect(filterDatas.length).toEqual(datas.length);
        });

        describe("Concerning the filter function on fistname", function () {

            it("it should return elements with name containing part of the value", function () {
                userService.filterByName("Suz");
                filterDatas = userService.users;
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

            it("it should return elements with name containing all the value", function () {
                userService.filterByName(SUZ_FIRSTNAME);
                filterDatas=userService.users;
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });


            it("it should not return elements if name doesn't match the all value", function () {
                userService.filterByName(SUZ_FIRSTNAME + "PlusSomeText");
                filterDatas=userService.users;
                expect(filterDatas.length).toEqual(0);
            });

            it("it should return elements with name containing part of the value whatever the case is", function () {
                userService.filterByName(SUZ_FIRSTNAME.toUpperCase());
                filterDatas=userService.users;
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

        });

        describe("Concerning the filter function on lastname", function () {
            it("it should return elements with name containing part of the value", function () {
                userService.filterByName("Mcb");
                filterDatas=userService.users;
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

            it("it should return elements with name containing all the value", function () {
                userService.filterByName(SUZ_LASTNAME);
                filterDatas=userService.users;
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

            it("it should not return elements if name doesn't match the all value", function () {
                userService.filterByName(SUZ_LASTNAME + "PlusSomeText");
                filterDatas=userService.users;
                expect(filterDatas.length).toEqual(0);
            });

            it("it should return elements with name containing part of the value whatever the case is", function () {
                userService.filterByName(SUZ_LASTNAME.toUpperCase());
                filterDatas=userService.users;
                expect(filterDatas.length).toEqual(1);
                expect(filterDatas[0]).toEqual(datas[0]);
            });

        });
    });

});
