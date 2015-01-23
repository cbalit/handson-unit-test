'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('handsOnUnitTestApp'));

    var MainCtrl, mockUserService,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(function () {

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });
        })
    });


    describe('initialisation', function () {
        it("should have a loader flag set to false", function () {
            expect(scope.loaded).toBeFalsy();
        });

        it("should have a loader flag set to false", function () {
            expect(scope.loaded).toBeFalsy();
        });
    });
});
