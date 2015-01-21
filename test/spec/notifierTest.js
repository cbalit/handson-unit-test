describe("Notifier TesT Suite", function () {
    var notifier,
        listener,
        NOTIFICATION1 = "notification1",
        NOTIFICATION2 = "notification2",
        STRING_ARG1 = "stringArg1",
        STRING_ARG2 = "stringArg2";


    beforeEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL=100;

        notifier = new handson.Notifier();
        listener = {
            onNotify1: function () {
            },
            onNotify2: function () {
            }
        };


        spyOn(listener, 'onNotify1');
        spyOn(listener, 'onNotify2');

    });

    afterEach(function () {
        notifier = null;
    });


    describe("RegisterTest", function () {

        it("should listen to notification1", function (done) {
            var notify=function() {
                done();
            };
            notifier.register(NOTIFICATION1, notify);
            notifier.notify(NOTIFICATION1);
            //expect(listener.onNotify1).toHaveBeenCalled();
        });

        it("should see that all notification1 handlers are triggered", function () {
            notifier.register(NOTIFICATION1, listener.onNotify1);
            notifier.register(NOTIFICATION1, listener.onNotify2);
            notifier.notify(NOTIFICATION1);
            expect(listener.onNotify1).toHaveBeenCalled();
            expect(listener.onNotify2).toHaveBeenCalled();
        });

        it("should test that the arguments on notify are passing to the handler", function () {
            var objArg = {};
            notifier.register(NOTIFICATION1, listener.onNotify1);
            notifier.notify(NOTIFICATION1, [STRING_ARG1, STRING_ARG2, objArg]);
            //the any is the jquery event object
            expect(listener.onNotify1).toHaveBeenCalledWith(jasmine.any(Object), STRING_ARG1, STRING_ARG2, objArg);
        });

    });

    describe("UnregisterTest", function () {


        it("should unregister a handler", function () {
            notifier.register(NOTIFICATION1, listener.onNotify1);
            notifier.unregister(NOTIFICATION1, listener.onNotify1);
            notifier.notify(NOTIFICATION1);
            expect(listener.onNotify1).not.toHaveBeenCalled();
        });


        it("should unregister a handler bind with a $.proxy", function () {
            notifier.register(NOTIFICATION1, $.proxy(listener.onNotify1, listener));
            notifier.unregister(NOTIFICATION1, $.proxy(listener.onNotify1, listener));
            notifier.notify(NOTIFICATION1);
            expect(listener.onNotify1).not.toHaveBeenCalled();
        });


        it("should unregister all handler of  a specific notification", function () {
            notifier.register(NOTIFICATION1, listener.onNotify1);
            notifier.register(NOTIFICATION1, listener.onNotify2);
            notifier.unregister(NOTIFICATION1);
            notifier.notify(NOTIFICATION1);
            expect(listener.onNotify1).not.toHaveBeenCalled();
            expect(listener.onNotify2).not.toHaveBeenCalled();
        });

        it("should unregister the handler of a notification but not the others", function () {
            notifier.register(NOTIFICATION1, listener.onNotify1);
            notifier.register(NOTIFICATION1, listener.onNotify2);
            notifier.unregister(NOTIFICATION1, listener.onNotify1);
            notifier.notify(NOTIFICATION1);
            expect(listener.onNotify1).not.toHaveBeenCalled();
            expect(listener.onNotify2).toHaveBeenCalled();
        });

        it("should unregister notification1 handlers but not the others notification handlers", function () {
            notifier.register(NOTIFICATION1, listener.onNotify1, listener);
            notifier.register(NOTIFICATION2, listener.onNotify2, listener);
            notifier.unregister(NOTIFICATION1);
            notifier.notify(NOTIFICATION1);
            notifier.notify(NOTIFICATION2);
            expect(listener.onNotify1).not.toHaveBeenCalled();
            expect(listener.onNotify2).toHaveBeenCalled();
        });

        it("should unregister all notifications handlers", function () {
            notifier.register(NOTIFICATION1, listener.onNotify1);
            notifier.register(NOTIFICATION2, listener.onNotify2);
            notifier.unregisterAll();
            notifier.notify(NOTIFICATION1);
            notifier.notify(NOTIFICATION2);
            expect(listener.onNotify1).not.toHaveBeenCalled();
            expect(listener.onNotify2).not.toHaveBeenCalled();
        });

    });
});