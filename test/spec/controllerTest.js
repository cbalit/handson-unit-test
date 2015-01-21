describe("Controller test suite", function () {

    var controller, notifier;
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

        controller = new handson.Controller(table);
        notifier = new handson.Notifier();
        controller.setNotifier(notifier);
        controller.setDatas(datas);
    });

    afterEach(function () {
        controller = null;
        notifier = null;
    });

    describe("Concerning button click", function () {


        beforeEach(function () {
            spyOn(controller, 'clickHandler').and.callThrough();
        });


        it("it should listen click on input with id filter-button", function () {
            $('#filter-button').click();
            expect(controller.clickHandler).toHaveBeenCalled();
        });

        it("it should not listen click on other element", function () {
            $('#other-button').click();
            expect(controller.clickHandler).not.toHaveBeenCalled();
        });

        it("it should call filterDatas with the input value as arguments", function () {
            spyOn(controller, 'filterDatas');
            $('#filter-input').val('value');
            $('#filter-button').click();
            expect(controller.filterDatas).toHaveBeenCalledWith('value');
        });

    });



    describe("Reset view", function () {


        it("it should restore all elements of the table", function () {
            //Let only one elements in the table
            controller.updateView([datas[0]]);
            expectTableHasNElements(1);
            controller.resetView();
            expectTableHasAllElements();
        });

    });

    describe("Update view", function () {


        it("it restore all elements table if there is no arguments", function () {
            controller.updateView();
            expectTableHasAllElements();
        });

        it("it should empty the table if called with an empty array", function () {
            controller.updateView([]);
            expectTableHasNElements(0);
        });

        it("it should empty the table if called with not an array", function () {
            controller.updateView("notnArray");
            expectTableHasNElements(0);
        });


        it("it should update view with the number of elements in the passing array", function () {
            controller.updateView([datas[0], datas[2]]);
            expectTableHasNElements(2);
        });

        it("it should add the id in the first cell", function () {
            var item = datas[0];
            controller.updateView([item]);
            var cellText = getTextAt(0, 0);
            expect(cellText).toBe(item.id);
        });

        it("it should add the firstname + lastname in the second cell", function () {
            var item = datas[0];
            controller.updateView([item]);
            var cellText = getTextAt(0, 1);
            expect(cellText).toBe(item.firstname + ' ' + item.lastname);
        });

        it("it should add the mail in the 3thd cell", function () {
            var item = datas[0];
            controller.updateView([item]);
            var cellText = getTextAt(0, 2);
            expect(cellText).toBe(item.mail);
        });


        it("it should add the company in the 4th cell", function () {
            var item = datas[0];
            controller.updateView([item]);
            var cellText = getTextAt(0, 3);
            expect(cellText).toBe(item.company);
        });

        it("it should add the roles in the last cell", function () {
            var item = datas[0];
            controller.updateView([item]);
            var cellText = getTextAt(0, 4);
            expect(cellText).toBe(item.roles.toString());
        });
    });

    describe("Concerning filter call and response", function () {


        beforeEach(function () {
            spyOn(controller, 'filterDatas').and.callThrough();
            spyOn(controller, 'updateView').and.callThrough();
            spyOn(controller, 'resetView').and.callThrough();
        });

        it("it should call the resetView function if there is no value", function () {
            controller.filterDatas();
            expect(controller.resetView).toHaveBeenCalled();
        });

        it("it should send notification FILTER with correct params", function () {

            var spy = jasmine.createSpy('listener');
            notifier.register(handson.NOTIFICATION.FILTER, spy);
            controller.filterDatas(SUZ_FIRSTNAME);
            expect(spy).toHaveBeenCalled();
        });


        it("it should not call the updateView function on notification FILTER_OK if the result have no filterDatas property", function () {
            notifier.notify(handson.NOTIFICATION.FILTER_OK, {});
            expect(controller.updateView).not.toHaveBeenCalled();
        });


        it("it should call the updateView function on notification FILTER_OK if the result have a filterDatas", function () {
            notifier.notify(handson.NOTIFICATION.FILTER_OK, {filterDatas: []});
            expect(controller.updateView).toHaveBeenCalled();
        });

    });

});