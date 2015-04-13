describe("Controller test suite", function () {

    var controller,filter;
    var datas,table;

    var SUZ_FIRSTNAME = 'Suzanne';


    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/base/test/fixture';
        loadFixtures('filter.html');

        datas=[
            {
                "id": "54b525c472540a87",
                "firstname": "Suzanne",
                "lastname": "Mcbride",
                "mail": "suzannemcbride@accupharm.com",
                "company": "COMTEXT",
                "roles":["ADMIN"]
            },
            {
                "id": "54b525c4d48c5977",
                "firstname": "Carroll",
                "lastname": "Humphrey",
                "mail": "carrollhumphrey@comtext.com",
                "company": "DEVILTOE",
                "roles":["ADMIN"]
            },
            {
                "id": "54b525c4d7e55f2d",
                "firstname": "Terry",
                "lastname": "Mckinney",
                "mail": "terrymckinney@deviltoe.com",
                "company": "VIASIA",
                "roles":["READ","WRITE"]
            },
            {
                "id": "54b525c4d233cc5a",
                "firstname": "Maureen",
                "lastname": "Hobbs",
                "mail": "maureenhobbs@viasia.com",
                "company": "MAGNINA",
                "roles":["READ","WRITE"]
            },
            {
                "id": "54b525c4748ad8",
                "firstname": "Ida",
                "lastname": "Raymond",
                "mail": "idaraymond@magnina.com",
                "company": "PHARMEX",
                "roles":["READ"]
            },
            {
                "id": "54b525c456c8a1",
                "firstname": "Young",
                "lastname": "Jacobson",
                "mail": "youngjacobson@pharmex.com",
                "company": "XPLOR",
                "roles":["ANONYMOUS"]
            }
        ];

        controller = new handson.Controller(table);
    });

    afterEach(function () {
        controller = null;
    });


});