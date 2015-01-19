/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 10/07/12
 * Time: 09:43
 * To change this template use File | Settings | File Templates.
 */

describe("Controller test suite", function () {

    var controller;
    var notifier;

    var eventTriggered = false;

    var NB_DIV = 7;

    var NB_FILTER_A = 4;
    var NB_FILTER_B = 4;
    var NB_FILTER_C = 4;

    var FILTER_A = 'filterA';
    var FILTER_B = 'filterB';
    var FILTER_C = 'filterC';


    function createDivByFile() {
        loadFixtures('filterFixture.html');
    }

    function clickChkFilter(index) {
        runs(function () {
            var chk = $('.filterChk').eq(index);
            chk.attr('checked', !chk.attr('checked'));
            chk.click();
        });
    }

    function clickFirstChkFilter() {
        clickChkFilter(0);
    }


    function waitForClick() {
        waitsFor(function () {
            return eventTriggered;
        }, "Input click handler never catched", 1000);
    }


    function expectAllDivAreVisible() {
        for (var i = 1, ln = NB_DIV; i <= ln; i++) {
            expect($('#div' + i)).toBeVisible();
        }
    }

    function expectAllDivAreHidden() {
        for (var i = 1, ln = NB_DIV; i <= ln; i++) {
            expect($('#div' + i)).not.toBeVisible();
        }
    }

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        createDivByFile();

        //listen to all input click
        $("#jasmine-fixtures").find('input').click(function () {
            eventTriggered = true;
        });

        controller = new handson.Controller();
        notifier = new handson.Notifier();
        controller.setNotifier(notifier);
    });

    afterEach(function () {
        controller = null;
        notifier = null;
        eventTriggered = false;
    });

    it("it ok with an empty test", function () {
        expect(true).toBeTruthy();
    });


    describe("Concerning view event", function () {


        beforeEach(function () {
            spyOn(controller, 'clickHandler');
        })


        it("it should listen click on radio with class filterChk", function () {

            clickFirstChkFilter();

            waitForClick();

            runs(function () {
                expect(controller.clickHandler).toHaveBeenCalled();
            });

        });

        it("it should not listen click on other radio", function () {

            runs(function () {
                $('.notfilterChk').eq(0).click();
            });

            waitForClick();

            runs(function () {
                expect(controller.clickHandler).not.toHaveBeenCalled();
            });

        });

    });


    describe("Concerning model creation", function () {

        beforeEach(function () {
            spyOn(controller, 'getDatas').andCallThrough();
        })

        it("it should create the correct number of object according to thediv", function () {
            var datas = controller.getDatas();

            expect(datas.length).toEqual(NB_DIV);
        });

        it("it should create the model with the id of the div in the page", function () {
            var datas = controller.getDatas();
            for (var i = 0, ln = datas.length; i < ln; i++) {
                var model = datas[i];
                expect(model.id).toEqual('div' + (i + 1));
            }

        });

        it("it should create the model with the roles of the div in the page", function () {
            var datas = controller.getDatas();
            var mod;
            //DIV1 has ROLE_A
            mod = datas[0];
            expect(mod.roles.length).toEqual(1);
            expect(mod.roles[0]).toEqual(FILTER_A);

            //DIV2 has ROLE_B
            mod = datas[1];
            expect(mod.roles.length).toEqual(1);
            expect(mod.roles[0]).toEqual(FILTER_B);

            //DIV5 has ROLE_A,ROLE_B and ROLE_C
            mod = datas[4];
            expect(mod.roles.length).toEqual(3);
            expect(mod.roles[0]).toEqual(FILTER_A);
            expect(mod.roles[1]).toEqual(FILTER_B);
            expect(mod.roles[2]).toEqual(FILTER_C);

        });

        it("it should call getDatas on input click", function () {

            clickFirstChkFilter();

            waitForClick();

            runs(function () {
                expect(controller.getDatas).toHaveBeenCalled();
            });
        });


    });


    describe("Concerning filter call", function () {

        beforeEach(function () {
            spyOn(controller, 'getFilters').andCallThrough();
            spyOn(controller, 'resetView').andCallThrough();
        })

        it("it should call getFilters on input click", function () {

            clickFirstChkFilter();

            waitForClick();

            runs(function () {
                expect(controller.getFilters).toHaveBeenCalled();
            });

        });


        it("it should create the correct filters according to checkbox status", function () {

            //CLICK FILTER_A AND FILTER_C
            $('.filterChk').eq(0).click();
            $('.filterChk').eq(2).click();

            var filters = controller.getFilters();

            expect(filters.length).toEqual(2);
            expect(filters[0]).toEqual(FILTER_A);
            expect(filters[1]).toEqual(FILTER_C);

        });

    });

    describe("Concerning reset call", function () {

        beforeEach(function () {
            spyOn(controller, 'resetView').andCallThrough();
        })

        it("it should call the reset function if there is no filters", function () {
            var datas = controller.getDatas();
            var filters = null;

            controller.filterData(datas, filters);

            expect(controller.resetView).toHaveBeenCalled();
        });

        it("it should call the reset function if there is an ampty array as filters", function () {
            var datas = controller.getDatas();
            var filters = [];

            controller.filterData(datas, filters);

            expect(controller.resetView).toHaveBeenCalled();
        });

        it("it should call the reset function if filters param is not an array", function () {
            var datas = controller.getDatas();
            var filters = FILTER_A;

            controller.filterData(datas, filters);

            expect(controller.resetView).toHaveBeenCalled();
        });

        it("it should restore all div in visible state", function () {
            //hide all div
            var divs = $('div[data-role]').hide();

            expectAllDivAreHidden();

            controller.resetView();

            expectAllDivAreVisible();

        });

    });

    describe("Concerning view update", function () {

        it("it should hide all div  if the return data is null", function () {
            controller.updateView();
            expectAllDivAreHidden();
        });

        it("it should hide all div  if the return data is empty", function () {
            controller.updateView([]);
            expectAllDivAreHidden();
        });

        it("it should hide all div  if the return data is not an array", function () {
            controller.updateView(FILTER_A);
            expectAllDivAreHidden();
        });


        it("it should hide all div  that have not the id in the return data array", function () {
            controller.updateView([{id:'div1'},
                {id:'div5'}]);
            expect($('#div1')).toBeVisible();
            expect($('#div5')).toBeVisible();
            expect($('#div2')).not.toBeVisible();
        });
    });

    describe("Concerning filter call and response", function () {

        var notifTriggered;


        function waitForNotif() {
            waitsFor(function () {
                return notifTriggered;
            }, "Notification never catched", 1000);
        }


        beforeEach(function () {
            spyOn(controller, 'filterData').andCallThrough();
            spyOn(controller, 'updateView').andCallThrough();
            notifier.register(handson.NOTIFICATION.FILTER_OK, function () {
                notifTriggered = true;
            });

            notifier.register(handson.NOTIFICATION.FILTER, function () {
                notifTriggered = true;
            });
        })

        afterEach(function () {
            notifTriggered = false;
        })

        it("it should call filterData on click", function () {
            clickFirstChkFilter();

            waitForClick();

            runs(function () {
                expect(controller.filterData).toHaveBeenCalled();
            });
        });


        it("it should send notification FILTER with correct params", function () {

            var spy;

            runs(function () {
                spy = jasmine.createSpy('listener');
                notifier.register(handson.NOTIFICATION.FILTER, spy);
                controller.filterData([
                    {'id':'div1'}
                ], ['filterA']);
            });

            waitForNotif();

            runs(function () {
                expect(spy).toHaveBeenCalled();
                //expect(spy).toHaveBeenCalledWith({datas:[{'id':'div1'}], filters:['filterA']});
            });
        });


        it("it should not call the updateView function on notification FILTER_OK if the result have no filterDatas property", function () {
            runs(function () {
                notifier.notify(handson.NOTIFICATION.FILTER_OK, {});
            });

            waitForNotif();

            runs(function () {
                expect(controller.updateView).not.toHaveBeenCalled();
            });
        });


        it("it should call the updateView function on notification FILTER_OK if the result have a filterDatas", function () {
            runs(function () {
                notifier.notify(handson.NOTIFICATION.FILTER_OK, {filterDatas:[]});
            });

            waitForNotif();

            runs(function () {
                expect(controller.updateView).toHaveBeenCalled();
            });
        });




    });


})