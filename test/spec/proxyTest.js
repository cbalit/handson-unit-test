describe("Proxy TesT Suite", function () {

    var OTHER_NOTIF = "otherNotif";

    var proxy;
    var notifier;


    function callServerAndRespond(server,response) {
        // Set how the fake server will respond
        // This reads: a GET request for proxy.url
        // will return a 200 response of type
        // application/json with the given JSON response body
        server.respondWith("GET", proxy.url,
            [200, {"Content-Type": "application/json"},
                JSON.stringify(response)]);

        // makes an ajax request to the server
        proxy.filterHandler();

        // Fake server responds to the request
        server.respond();
    }

    beforeEach(function () {
        proxy = new handson.Proxy();
        notifier = new handson.Notifier();
        proxy.setNotifier(notifier);
    });

    afterEach(function () {
        proxy = null;
        notifier = null;
    });


    describe("Notification handler", function () {
        it("it should listen to notification FILTER", function () {
            spyOn(proxy, 'filterHandler');
            notifier.notify(handson.NOTIFICATION.FILTER);
            expect(proxy.filterHandler).toHaveBeenCalled();
        });

        it("it should not listen to other notification", function () {
            spyOn(proxy, 'filterHandler');
            notifier.notify(OTHER_NOTIF);
            expect(proxy.filterHandler).not.toHaveBeenCalled();
        });
    });

    describe("AJAX call (with sinon spy)", function () {

        var spy;

        beforeEach(function () {
            // Spy on jQuery's ajax method
            spy = sinon.spy(jQuery, 'ajax');
        });

        afterEach(function () {
            jQuery.ajax.restore();
        });

        it("it should make an ajax call with the proxy url and params on notification FILTER", function () {
            var params = {};
            notifier.notify(handson.NOTIFICATION.FILTER, params);
            expect(spy.called).toBeTruthy();
            // Check url and data property of first argument
            expect(spy.getCall(0).args[0].url).toEqual(proxy.url);
            expect(spy.getCall(0).args[0].data).toEqual(params);
        });

    });
    describe("AJAX call (with jasmine spy)", function () {

        var spy;

        beforeEach(function () {
            // Spy on jQuery's ajax method
            spy = spyOn(jQuery, 'ajax');
        });

        afterEach(function () {
            //jQuery.ajax.restore();
        });

        it("it should make an ajax call with the proxy url and params on notification FILTER", function () {
            var params = {};
            notifier.notify(handson.NOTIFICATION.FILTER, params);
            expect(spy.calls.any()).toBeTruthy();
            // Check url and data property of first argument
            var args=spy.calls.argsFor(0);
            expect(args[0].url).toEqual(proxy.url);
            expect(args[0].data).toEqual(params);
        });

    });

    describe("SERVER response", function () {

        var server;
        var datas = {
            "status": "ok",
            "filterDatas": [{"id": "div1", "roles": ["admin"]}, {"id": "div2", "roles": ["read", "write"]}]
        };

        beforeEach(function () {
            spyOn(proxy, 'filterResult').and.callThrough();
            server = sinon.fakeServer.create();
        });

        afterEach(function () {
            server.restore();
        });

        it("it should make an ajax call and treat the server response in the filterResult function", function () {
            callServerAndRespond(server,datas);
            // Expect that the spy was called with the new model
            expect(proxy.filterResult).toHaveBeenCalled();
            expect(proxy.filterResult).toHaveBeenCalledWith(datas);
        });


        it("it should make an FILTER_OK notification if status is ok in the response", function () {
            var spy= jasmine.createSpy("listener");
            notifier.register(handson.NOTIFICATION.FILTER_OK, spy);
            proxy.filterResult(datas);
            expect(spy).toHaveBeenCalled();
        });

        it("it should not make an FILTER_OK notification if status is not ok in the response", function () {
            var spy= jasmine.createSpy("listener");
            notifier.register(handson.NOTIFICATION.FILTER_OK, spy);
            callServerAndRespond(server,{status: "ko"});
            expect(spy).not.toHaveBeenCalled();
        });


        it("it should not make an FILTER_OK notification if the server response is an error", function () {
            var spy= jasmine.createSpy("listener");
            notifier.register(handson.NOTIFICATION.FILTER_OK, spy);
            server.respondWith("GET", proxy.url,
                [500, {"Content-Type": "application/json"},""]);
            // makes an ajax request to the server
            proxy.filterHandler();
            // Fake server responds to the request
            server.respond();
            expect(spy).not.toHaveBeenCalled();
        });

    });
});



