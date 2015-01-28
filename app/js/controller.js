if (handson == undefined) {
    var handson = {};
}


handson.Controller = Class.extend({
    BY_NAME: "filter-name",
    BY_ROLES: "filter-roles",
    datas: [],
    filterParams: {},
    filters: [],
    table: null,

    init: function (table) {
        this.table = table;
        $('#chk-roles').hide();
        this.filterParams = {
            by: this.BY_NAME,
            value: '',
            roles: []
        };
        this.addEvent();
    },

    setDatas: function (datas) {
        this.datas = datas;
    },

    setFilter: function (filter) {
        this.filter = filter;
    },

    addEvent: function () {
        var _this = this;
        $('#filter-input').keyup(function (e) {
            _this.inputChangeHandler();
        });
        $('#filter-button').click(function (e) {
            _this.clickHandler();
        });
        $('#optionsRadios1').click(function (e) {
            _this.filterBy(_this.BY_NAME);
            $('#chk-roles').hide();
        });
        $('#optionsRadios2').click(function (e) {
            _this.filterBy(_this.BY_ROLES);
            $('#chk-roles').show();
        });
        $('#chk-roles input').click(function (e) {
            _this.toggleRoles(e.target.value);
        })
    },
    inputChangeHandler: function () {
        this.filterParams.value = $('#filter-input').val();
        this.filterDatas();
    },
    clickHandler: function (e) {
        this.filterDatas();
    },

    filterBy: function (filterName) {
        this.filterParams.by = filterName;
        this.filterDatas();
    },
    toggleRoles: function (role) {
        if(!this.filterParams.roles){
            this.filterParams.roles=[];
        }
        var ind = this.filterParams.roles.indexOf(role);
        if (ind == -1) {
            this.filterParams.roles.push(role);
        }
        else {
            this.filterParams.roles.splice(ind, 1);
        }
        this.filterDatas();
    },
    filterDatas: function () {
        var filterDatas=this.datas;

        if (this.filterParams.by == this.BY_NAME) {
            filterDatas = this.filter.filterByName(this.datas, this.filterParams.value);
        }
        else if (this.filterParams.by == this.BY_ROLES) {
            filterDatas = this.filter.filterByRoles(this.datas, this.filterParams.roles);
        }
        this.updateView(filterDatas);
    },

    updateView: function (datas) {
        var datas = datas || this.datas;
        var body = this.table.find('tbody');
        body.empty();
        if (datas && datas instanceof Array) {
            datas.forEach(function (item) {
                body.append('<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.firstname + ' ' + item.lastname + '</td>' +
                '<td>' + item.mail + '</td>' +
                '<td>' + item.company + '</td>' +
                '<td>' + item.roles + '</td>' +
                '</tr>')
            });
        }
    },

    resetView: function () {
        this.updateView(this.datas);
    }
});