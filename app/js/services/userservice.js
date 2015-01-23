'use strict';

/**
 * @ngdoc service
 * @name handsOnUnitTestApp.usersService
 * @description
 * # usersService
 * Factory in the handsOnUnitTestApp.
 */
angular.module('handsOnUnitTestApp')
    .factory('userService', function ($http) {

        return {
            intialUsers: null,
            users: null,
            getUsers: function () {
                var _this = this;
                return $http.get('mocks/users.json').then(function (response) {
                    _this.setUsers(response.data);
                });
            },
            setUsers: function (datas) {
                this.users = this.intialUsers = datas;
            },
            filterByName: function (value) {
                var filterDatas = [];
                if (value) {
                    filterDatas = this.intialUsers.filter(function (item) {
                        return (item.lastname.toLowerCase().indexOf(value.toLowerCase()) != -1 || item.firstname.toLowerCase().indexOf(value.toLowerCase()) != -1);
                    });
                }
                else {
                    filterDatas = this.intialUsers
                }
                this.users=filterDatas;
            }
        };
    });
