/**
 * Created by adzs637 on 13/01/2015.
 */
describe("Users Collection test suite", function () {

    var users;
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
        users = new handson.Users();
    });

    afterEach(function () {
        users = null;
    });


    describe("Initialization", function () {
        it("it should create an empty array on iniDatas", function () {
            expect(users.initDatas).toBeDefined();
            expect(users.initDatas.length).toBe(0);
        });
    });

    describe("set Init Datas", function () {
        it("it should reccord the array in initDatas", function () {
            users.setInitDatas(datas);
            expect(users.initDatas).toBe(datas);
        });

        it("it should reset the collection with this datas", function () {
            spyOn(users,'reset');
            users.setInitDatas(datas);
            expect(users.reset).toHaveBeenCalledWith(datas);
        });
    });


    describe("Concerning the parameter", function () {

        it("it should return an empty array if the input data is null", function () {
            users.setInitDatas([]);
            users.filterByName(SUZ_FIRSTNAME);
            expect(users.length).toEqual(0);
        });

        it("it should return the same data array if the users  param is null", function () {
            users.setInitDatas(datas);
            users.filterByName(null);
            expect(users.length).toEqual(datas.length);
        });

        it("it should return the same data array if the users  param is null even if the array was filtered", function () {
            users.setInitDatas(datas);
            users.filterByName(SUZ_FIRSTNAME);
            expect(users.length).toEqual(1);
            users.filterByName(null);
            expect(users.length).toEqual(1);
        });

    });


    describe("Concerning the filtering on fistname", function () {

        var isFirstOfinitialDatas= function(){
            expect(users.at(0).get('id')).toEqual(datas[0].id);
        };

        beforeEach(function () {
            users.setInitDatas(datas);
        });

        it("it should return elements with name containing part of the value", function () {
            users.filterByName("Suz");
            expect(users.length).toEqual(1);
            isFirstOfinitialDatas();
        });

        it("it should return elements with name containing all the value", function () {
            var filterDatas=users.filterByName(SUZ_FIRSTNAME);
            expect(users.length).toEqual(1);
            isFirstOfinitialDatas();
        });


        it("it should not return elements if name doesn't match the all value", function () {
            users.filterByName(SUZ_FIRSTNAME+"PlusSomeText");
            expect(users.length).toEqual(0);
        });

        it("it should return elements with name containing part of the value whatever the case is", function () {
            users.filterByName(SUZ_FIRSTNAME.toUpperCase());
            expect(users.length).toEqual(1);
            isFirstOfinitialDatas();
        });

    });

    describe("Concerning filtering on lastname", function () {
        var isFirstOfinitialDatas= function(){
            expect(users.at(0).get('id')).toEqual(datas[0].id);
        };

        beforeEach(function () {
            users.setInitDatas(datas);
        });

        it("it should return elements with name containing part of the value", function () {
            users.filterByName("Mcb");
            expect(users.length).toEqual(1);
            isFirstOfinitialDatas();
        });

        it("it should return elements with name containing all the value", function () {
            var filterDatas=users.filterByName(SUZ_LASTNAME);
            expect(users.length).toEqual(1);
            isFirstOfinitialDatas();
        });


        it("it should not return elements if name doesn't match the all value", function () {
            users.filterByName(SUZ_LASTNAME+"PlusSomeText");
            expect(users.length).toEqual(0);
        });

        it("it should return elements with name containing part of the value whatever the case is", function () {
            users.filterByName(SUZ_LASTNAME.toUpperCase());
            expect(users.length).toEqual(1);
            isFirstOfinitialDatas();
        });
    });
});