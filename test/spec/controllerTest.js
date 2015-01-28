describe("Controller test suite", function () {

    var controller,filter;
    var datas,table;

    var SUZ_FIRSTNAME = 'Suzanne';
    var SUZ_LASTNAME = 'Mcbride';
    var ROLE_ADMIN = 'ADMIN';
    var ROLE_READ = 'READ';


    function expectTableHasNElements(length) {
        var nbItems = table.find('tbody tr');
        expect(nbItems).toHaveLength(length);
    }


    function expectTableHasAllElements() {
        expectTableHasNElements(datas.length);
    }

    function getTextAt(li,ce) {
        var line = table.find('tbody tr').eq(li);
        var cell = line.find('td').eq(ce);
        return cell.text();
    }


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
                "roles":["WRITE"]
            }
        ];
        table=$('#users');

        controller = new handson.Controller(table);
        filter = jasmine.createSpyObj('filter',['filterByName','filterByRoles']);

        controller.setFilter(filter);
        controller.setDatas(datas);
    });

    afterEach(function () {
        controller = null;
    });

    describe("Initialisation", function () {
        it("it should have a filterParams object", function () {
            expect(controller.filterParams).toBeDefined();
        });

        it("it should have a filterParams object with an '' value", function () {
            expect(controller.filterParams.value).toBe('');
        });

        it("it should have a filterParams object with an empty array in roles", function () {
            expect(controller.filterParams.roles).toEqual([]);
        });

        it("it should have a filterParams object with an BY_NAME by", function () {
            expect(controller.filterParams.by).toBe(controller.BY_NAME);
        });
    });


    describe("Concerning view event", function () {


        beforeEach(function () {
            spyOn(controller, 'clickHandler').and.callThrough();
            spyOn(controller, 'inputChangeHandler').and.callThrough();
            spyOn(controller, 'filterBy').and.callThrough();
            spyOn(controller, 'toggleRoles').and.callThrough();
            spyOn(controller, 'filterDatas');
        });


        it("it should call clickHandler on filter-button click", function () {
            $('#filter-button').click();
            expect(controller.clickHandler).toHaveBeenCalled();
        });


        it("it should call filterBy with BY_ROLES on optionsRadios1 click", function () {
            $('#optionsRadios1').click();
            expect(controller.filterBy).toHaveBeenCalledWith(controller.BY_NAME);
        });


        it("it should hide #chk-role when optionsRadios1 click", function () {
            var chkCont=$('#chk-roles');
            chkCont.show();
            expect($('#chk-roles')).toBeVisible();
            $('#optionsRadios1').click();
            expect(chkCont).toBeHidden();
        });

        it("it should call filterBy with BY_ROLES on optionsRadios2 click", function () {
            $('#optionsRadios2').click();
            expect(controller.filterBy).toHaveBeenCalledWith(controller.BY_ROLES);
        });

        it("it should show #chk-role when optionsRadios2 click", function () {
            var chkCont=$('#chk-roles');
            chkCont.hide();
            expect(chkCont).toBeHidden();
            $('#optionsRadios2').click();
            expect(chkCont).toBeVisible();
        });

        it("it should call toggleRoles on checkbox click", function () {
            var check=$('#chk-roles input').eq(0);
            check.click();
            expect(controller.toggleRoles).toHaveBeenCalledWith(check.val());
        });

        it("it should call inputChangeHandler on input keyup", function () {
            var input=$('#filter-input');
            input.trigger('keyup');
            expect(controller.inputChangeHandler).toHaveBeenCalled();
        });

    });

    describe("Concerning handler", function () {


        beforeEach(function () {
            spyOn(controller, 'filterDatas');
        });


        it("it should call filterDatas on clickHandler", function () {
            controller.clickHandler();
            expect(controller.filterDatas).toHaveBeenCalled();
        });

        it("it should call filterDatas on filterBy", function () {
            controller.filterBy();
            expect(controller.filterDatas).toHaveBeenCalled();
        });

        it("it should call filterDatas on toggleRoles", function () {
            controller.toggleRoles();
            expect(controller.filterDatas).toHaveBeenCalled();
        });

        it("it should call filterDatas on inputChangeHandler", function () {
            controller.inputChangeHandler();
            expect(controller.filterDatas).toHaveBeenCalled();
        });

        it("filterBy should reccord the parameter in by property of filterParams", function () {
            controller.filterParams.by=null;
            controller.filterBy(controller.BY_NAME);
            expect(controller.filterParams.by).toBe(controller.BY_NAME);
        });

        it("toggleRoles should add the role in the filter list if not already in", function () {
            controller.filterParams.roles=[];
            controller.toggleRoles("ROLE1");
            expect(controller.filterParams.roles.length).toBe(1);
            expect(controller.filterParams.roles[0]).toBe("ROLE1");
        });

        it("toggleRoles should remove the role from the filter list if already in", function () {
            controller.filterParams.roles=["ROLE1"];
            controller.toggleRoles("ROLE1");
            expect(controller.filterParams.roles.length).toBe(0);
        });

    });

    describe("Filtering datas", function () {

        beforeEach(function () {
            var filterDatas=["FILTERED"];
            spyOn(controller, 'updateView').and.callThrough();
        });


        it("it should not call the Filter if we don't have by in params", function () {
            controller.filterParams.by=null;
            controller.filterDatas();
            expect(filter.filterByRoles).not.toHaveBeenCalled();
            expect(filter.filterByName).not.toHaveBeenCalled();
        });

        it("it should call the filterByName function of the Filter if filter BY_NAME", function () {
            controller.filterParams.by=controller.BY_NAME;
            controller.filterDatas();
            expect(filter.filterByName).toHaveBeenCalled();
        });

        it("it should call the filterByRoles function of the Filter if filter BY_ROLES", function () {
            controller.filterParams.by=controller.BY_ROLES;
            controller.filterDatas();
            expect(filter.filterByRoles).toHaveBeenCalled();
        });

        it("it should call the updateView function with the results of filtering", function () {
            controller.filterParams.by=controller.BY_NAME;
            var filterDatas=["FILTERED"];
            filter.filterByName.and.returnValue(filterDatas);
            controller.filterDatas();
            expect(controller.updateView).toHaveBeenCalledWith(filterDatas);
        });

        it("it should call the updateView function with the results of filtering", function () {
            controller.filterParams.by=controller.BY_ROLES;
            var filterDatas=["FILTERED"];
            filter.filterByRoles.and.returnValue(filterDatas);
            controller.filterDatas();
            expect(controller.updateView).toHaveBeenCalledWith(filterDatas);
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
            controller.updateView([datas[0],datas[2]]);
            expectTableHasNElements(2);
        });

        it("it should add the id in the first cell", function () {
            var item=datas[0];
            controller.updateView([item]);
            var cellText=getTextAt(0,0);
            expect(cellText).toBe(item.id);
        });

        it("it should add the firstname + lastname in the second cell", function () {
            var item=datas[0];
            controller.updateView([item]);
            var cellText=getTextAt(0,1);
            expect(cellText).toBe(item.firstname+' '+item.lastname);
        });

        it("it should add the mail in the 3thd cell", function () {
            var item=datas[0];
            controller.updateView([item]);
            var cellText=getTextAt(0,2);
            expect(cellText).toBe(item.mail);
        });


        it("it should add the company in the 4th cell", function () {
            var item=datas[0];
            controller.updateView([item]);
            var cellText=getTextAt(0,3);
            expect(cellText).toBe(item.company);
        });

        it("it should add the roles in the last cell", function () {
            var item=datas[0];
            controller.updateView([item]);
            var cellText=getTextAt(0,4);
            expect(cellText).toBe(item.roles.toString());
        });
    });


});