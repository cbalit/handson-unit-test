/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 13/04/12
 * Time: 10:54
 * To change this template use File | Settings | File Templates.
 */

describe("Notifier TesT Suite", function () {
    var notifier,
        listener,
        notif1hasBeenTrigger = false,
        notif2hasBeenTrigger = false,
        NOTIFICATION1 = "notification1",
        NOTIFICATION2 = "notification2",
        STRING_ARG1 = "stringArg1",
        STRING_ARG2 = "stringArg2";


    beforeEach(function () {
        notifier = new handson.Notifier();
        listener = {
            onNotify1:function () {
            },
            onNotify2:function () {
            }
        }

        notif1hasBeenTrigger = false;
        notif2hasBeenTrigger = false;

        spyOn(listener, 'onNotify1').andCallFake(function () {
            notif1hasBeenTrigger = true
        });
        spyOn(listener, 'onNotify2').andCallFake(function () {
            notif2hasBeenTrigger = true
        });
        ;
    });

    afterEach(function () {
        notifier = null;
    });


    describe("RegisterTest", function () {
        it("should listen to notification1 using waitfunction", function () {

            runs(function () {
                notifier.register(NOTIFICATION1, listener.onNotify1);
                notifier.notify(NOTIFICATION1);
            });

            waitsFor(function () {
                return notif1hasBeenTrigger;
            }, "Notification never catched", 1000);

            runs(function () {
                expect(listener.onNotify1).toHaveBeenCalled();
            });


        });

        it("should listen to notification1 with empty spy", function () {

            runs(function () {
                this.callback= jasmine.createSpy("notifySpy");
                notifier.register(NOTIFICATION1, this.callback);
                notifier.notify(NOTIFICATION1);
            });

            waits(100);

            runs(function () {
                expect(this.callback).toHaveBeenCalled();
            });


        });

        it("should listen to notification1", function () {

            runs(function () {
                notifier.register(NOTIFICATION1, listener.onNotify1);
                notifier.notify(NOTIFICATION1);
            });

            waits(100);

            runs(function () {
                expect(listener.onNotify1).toHaveBeenCalled();
            });


        });

        it("should see that all notification1 handlers are triggered", function () {

            runs(function () {
                notifier.register(NOTIFICATION1, listener.onNotify1);
                notifier.register(NOTIFICATION1, listener.onNotify2);
                notifier.notify(NOTIFICATION1);
            });

            waits(100);

            runs(function () {
                expect(listener.onNotify1).toHaveBeenCalled();
                expect(listener.onNotify2).toHaveBeenCalled();
            });

        });

        /*it("should test that the arguments on notify are passing to the handler", function () {
         var objArg={};

         runs(function () {
         notifier.register(NOTIFICATION1, listener.onNotify1);
         notifier.notify(NOTIFICATION1,[STRING_ARG1,STRING_ARG2,objArg]);
         });

         waits(200);

         runs(function () {
         expect(listener.onNotify1).toHaveBeenCalledWith(NOTIFICATION1,STRING_ARG1,STRING_ARG2,objArg);
         });

         });*/

    });

    describe("UnregisterTest", function () {


        it("should unregister a handler", function () {

            runs(function () {
                notifier.register(NOTIFICATION1, listener.onNotify1);
                notifier.unregister(NOTIFICATION1, listener.onNotify1);
                notifier.notify(NOTIFICATION1);
            });

            waits(200);

            runs(function () {
                expect(listener.onNotify1).not.toHaveBeenCalled();
            });


        });


        it("should unregister a handler bind with a $.proxy", function () {

            runs(function () {
                notifier.register(NOTIFICATION1, $.proxy(listener.onNotify1,listener));
                notifier.unregister(NOTIFICATION1, $.proxy(listener.onNotify1,listener));
                notifier.notify(NOTIFICATION1);
            });

            waits(200);

            runs(function () {
                expect(listener.onNotify1).not.toHaveBeenCalled();
            });


        });


        /*it("should unregister all handler of  a specific notification", function () {

         runs(function () {
         notifier.register(NOTIFICATION1, listener.onNotify1);
         notifier.register(NOTIFICATION1, listener.onNotify2);
         notifier.unregister(NOTIFICATION1);
         notifier.notify(NOTIFICATION1);
         });

         waits(200);

         runs(function () {
         expect(listener.onNotify1).not.toHaveBeenCalled();
         expect(listener.onNotify2).not.toHaveBeenCalled();
         });


         });*/

        it("should unregister the handler of a notification but not the others", function () {

            runs(function () {
                notifier.register(NOTIFICATION1, listener.onNotify1);
                notifier.register(NOTIFICATION1, listener.onNotify2);
                notifier.unregister(NOTIFICATION1,listener.onNotify1);
                notifier.notify(NOTIFICATION1);
            });

            waits(200);

            runs(function () {
                expect(listener.onNotify1).not.toHaveBeenCalled();
                expect(listener.onNotify2).toHaveBeenCalled();
            });


        });

        /*     it("should unregister notification1 handlers but not the others notification handlers", function () {

         runs(function () {
         notifier.register(NOTIFICATION1, listener.onNotify1, listener);
         notifier.register(NOTIFICATION2, listener.onNotify2, listener);
         notifier.unregister(NOTIFICATION1);
         notifier.notify(NOTIFICATION1);
         notifier.notify(NOTIFICATION2);
         });

         waits(200);

         runs(function () {
         expect(listener.onNotify1).not.toHaveBeenCalled();
         expect(listener.onNotify2).toHaveBeenCalled();
         });


         });*/

        it("should unregister all notifications handlers", function () {

            runs(function () {
                notifier.register(NOTIFICATION1, listener.onNotify1);
                notifier.register(NOTIFICATION2, listener.onNotify2);
                notifier.unregisterAll();
                notifier.notify(NOTIFICATION1);
                notifier.notify(NOTIFICATION2);
            });

            waits(200);

            runs(function () {
                expect(listener.onNotify1).not.toHaveBeenCalled();
                expect(listener.onNotify2).not.toHaveBeenCalled();
            });


        });

    });
});

