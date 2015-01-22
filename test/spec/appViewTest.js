describe("AppView test suite", function () {

    var appview,users;
    var datas, table;

    var SUZ_FIRSTNAME = 'Suzanne';
    var SUZ_LASTNAME = 'Mcbride';


    function expectTableHasNElements(length) {
        var nbItems = table.find('tbody tr');
        expect(nbItems).toHaveLength(length);
    }


    function expectTableHasAllElements() {
        expectTableHasNElements(datas.length);
    }

    function getTextAt(li, ce) {
        var line = table.find('tbody tr').eq(li);
        var cell = line.find('td').eq(ce);
        return cell.text();
    }


    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/base/test/fixture';
        loadFixtures('filter.html');


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
        table = $('#users');
        users=handson.users;
        users.setInitDatas(datas);
        appview=new handson.AppView();
    });

    afterEach(function () {
        appview.undelegateEvents();
        appview = null;
    });


    describe("Initialisation", function () {

        it("it should save ref on #user-template if exist", function () {
            expect(appview.userTemplate).not.toBeNull();
        });

        it("it should save ref on input", function () {
            expect(appview.$input).not.toBeNull();
        });

        it("it should save ref on table", function () {
            expect(appview.$list).not.toBeNull();
        });

        it("it should save ref on body", function () {
            expect(appview.$tbody).not.toBeNull();
        });

        it("it should display all elements table", function () {
            expectTableHasAllElements();
        });

    });

    describe("Concerning button click", function () {


        beforeEach(function () {
            spyOn(appview, 'filter');
        });


        xit("it should filter on input with id filter-button click", function () {
            $('#filter-button').trigger('click');
            expect(appview.filter).toHaveBeenCalled();
        });

        xit("it should not filter on click on other element", function () {
            $('#other-button').click();
            expect(appview.filter).not.toHaveBeenCalled();
        });

        xit("it should filter on input with id filter-input change", function () {
            $('#filter-input').val('A value');
            expect(appview.filter).toHaveBeenCalled();
        });
    });



    describe("Filtering datas", function () {

        beforeEach(function () {
            spyOn(appview, 'render').and.callThrough();
            spyOn(users, 'filterByName').and.callThrough();
            spyOn(users, 'restore').and.callThrough();
        });



        describe("Filtering without value", function () {

            beforeEach(function () {
                appview.$input.val('');
            });

            it("it should call the users.restore", function () {
                appview.filter();
                expect(users.restore).toHaveBeenCalled();
            });

            it("it should always call the render function", function () {
                appview.filter();
                expect(appview.render).toHaveBeenCalled();
            });

            it("it should restore all elements of the table", function () {
                //Let only one elements in the table
                appview.$input.val(SUZ_FIRSTNAME);
                appview.filter();
                expectTableHasNElements(1);
                appview.$input.val('');
                appview.filter();
                expectTableHasAllElements();
            });

        });

        describe("Filtering with a value", function () {

            beforeEach(function () {
                appview.$input.val(SUZ_FIRSTNAME);
            });

            it("it should call the users.filterByName function if we pass a value", function () {
                appview.filter();
                expect(users.filterByName).toHaveBeenCalled();
            });

            it("it should always call the render function (value)", function () {
                appview.filter();
                expect(appview.render).toHaveBeenCalled();
            });

            it("it should update view with the number of elements in the passing array", function () {
                appview.filter();
                expectTableHasNElements(1);
            });


        });

    });

    describe("Rendering", function () {
        var item,cellText;

        beforeEach(function () {
            item=datas[0];
        });

        it("it should add the id in the first cell", function () {
            cellText=getTextAt(0,0);
            expect(cellText).toBe(item.id);
        });

        it("it should add the firstname + lastname in the second cell", function () {
            cellText=getTextAt(0,1);
            expect(cellText).toBe(item.firstname+' '+item.lastname);
        });

        it("it should add the mail in the 3thd cell", function () {
            cellText=getTextAt(0,2);
            expect(cellText).toBe(item.mail);
        });


        it("it should add the company in the 4th cell", function () {
            cellText=getTextAt(0,3);
            expect(cellText).toBe(item.company);
        });

        it("it should add the roles in the last cell", function () {
            cellText=getTextAt(0,4);
            expect(cellText).toBe(item.roles.toString());
        });
    });

});