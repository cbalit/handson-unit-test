/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 13/04/12
 * Time: 10:54
 * To change this template use File | Settings | File Templates.
 */

describe("Proxy TesT Suite", function () {

    var OTHER_NOTIF="otherNotif";

    var proxy;
    var notifier;
    var notifTriggered;


    function waitForNotif(){
        waitsFor(function () {
            return notifTriggered;
        }, "Notification never catched", 1000);
    }

    function mockServer(server){
        // Set how the fake server will respond
        // This reads: a GET request for proxy.url
        // will return a 200 response of type
        // application/json with the given JSON response body
        server.respondWith("GET", proxy.url,
            [200, {"Content-Type": "application/json"},
                '{"status":"ok","filterDatas":[{"id":"div1","roles":["filterA"]},{"id":"div2","roles":["filterA", "filterB"]}]}']);

        // makes an ajax request to the server
        proxy.filterHandler();

        // Fake server responds to the request
        server.respond();
    }

    beforeEach(function () {
        proxy = new handson.Proxy();
        notifier = new handson.Notifier();
        proxy.setNotifier(notifier);
        //listen to notif
        notifier.register(handson.NOTIFICATION.FILTER,function () {
            notifTriggered = true;
        });

        notifier.register(handson.NOTIFICATION.FILTER_OK,function () {
            notifTriggered = true;
        });

        notifier.register(OTHER_NOTIF,function () {
            notifTriggered = true;
        });


    });

    afterEach(function () {
        proxy = null;
        notifier=null;
        notifTriggered=false;
    });


    it("it ok with an empty test", function () {
        expect(true).toBeTruthy();
    });

    describe("Notification handler", function () {
        it("it should listen to notification FILTER", function () {
            runs(function(){
                spyOn(proxy,'filterHandler')
                notifier.notify(handson.NOTIFICATION.FILTER);
            });

            waitForNotif();

            runs(function(){
                expect(proxy.filterHandler).toHaveBeenCalled();
            });
        });

        it("it should not listen to other notification", function () {
            runs(function(){
                spyOn(proxy,'filterHandler')
                notifier.notify(OTHER_NOTIF);
            });

            waitForNotif();

            runs(function(){
                expect(proxy.filterHandler).not.toHaveBeenCalled();
            });
        });
    });

    describe("AJAX call", function () {

        var spy;

        beforeEach(function(){
            // Spy on jQuery's ajax method
            spy = sinon.spy(jQuery, 'ajax');
        })

        afterEach(function(){
            jQuery.ajax.restore();
        })

        it("it should make an ajax call with the proxy url and params on notification FILTER", function () {

            var params={datas:['data1','data2'],filters:['filterA','filterB']};

            runs(function(){
                notifier.notify(handson.NOTIFICATION.FILTER,params);
            });

            waitForNotif();

            runs(function(){
                expect(spy.called).toBeTruthy();
                // Check url and data property of first argument
                expect(spy.getCall(0).args[0].url).toEqual(proxy.url);
                expect(spy.getCall(0).args[0].data).toEqual(params);
            })
        });



    });

    describe("SERVER response", function () {

        var server;
        var data={"status":"ok","filterDatas":[{"id":"div1","roles":["filterA"]},{"id":"div2","roles":["filterA", "filterB"]}]};

        beforeEach(function(){
            spyOn(proxy,'filterResult').andCallThrough();
            server = sinon.fakeServer.create();
        })

        afterEach(function(){
            server.restore();
        })

        it("it should make an ajax call and treat the server response in the filterResult function", function () {

            mockServer(server);

            // Expect that the spy was called with the new model
            expect(proxy.filterResult).toHaveBeenCalled();
            expect(proxy.filterResult).toHaveBeenCalledWith(data);
        });


        it("it should make an FILTER_OK notification if status is ok in the response", function () {

            var spy;

            runs(function(){
                spy= jasmine.createSpy("listener");
                notifier.register(handson.NOTIFICATION.FILTER_OK,spy);
                proxy.filterResult(data);
            })

            waitForNotif();


            runs(function(){
                expect(spy).toHaveBeenCalled();
            })

        });

        it("it should not make an FILTER_OK notification if status is not ok in the response", function () {

            var spy;

            runs(function(){
                spy= jasmine.createSpy("listener");
                notifier.register(handson.NOTIFICATION.FILTER_OK,spy);
                proxy.filterResult({status:"ko"});
            })

            waits(100);


            runs(function(){
                expect(spy).not.toHaveBeenCalled();
            })

        });



    });

    describe("test mock-ajax", function(){
        var TestResponses = {
            filter: {
                success: {
                    status: 200,
                    responseText: '{"status":"ok","filterDatas":[{"id":"div1","roles":["filterA"]},{"id":"div2","roles":["filterA", "filterB"]}]}'
                }
            }
        };

        var data={"status":"ok","filterDatas":[{"id":"div1","roles":["filterA"]},{"id":"div2","roles":["filterA", "filterB"]}]};

        var request;

        beforeEach(function(){
            spyOn(proxy,'filterResult').andCallThrough();
            jasmine.Ajax.useMock();
        })

        it("it should make an ajax call and treat the server response in the filterResult function", function () {

            // makes an ajax request to the server
            proxy.filterHandler();

            request = mostRecentAjaxRequest();
            request.response(TestResponses.filter.success);

            // Expect that the spy was called with the new model
            expect(proxy.filterResult).toHaveBeenCalled();
            expect(proxy.filterResult).toHaveBeenCalledWith(data);
        });

    });


});

