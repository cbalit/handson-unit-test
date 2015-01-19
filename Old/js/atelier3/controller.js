/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 10/07/12
 * Time: 10:36
 * To change this template use File | Settings | File Templates.
 */

if (handson == undefined) {
    var handson = {};
}


handson.Controller = Class.extend({

    notifier:null,
    datas:[],
    filters:[],
    elements:null,

    init:function (options) {
        this.elements = $('div[data-role]');
        this.addEvent();
    },

    addEvent:function () {
        var _this = this;
        $('.filterChk').click(function (e) {
            _this.clickHandler(e)
        });
    },

    clickHandler:function (e) {
        this.datas = this.getDatas();
        this.filters = this.getFilters();
        this.filterData(this.datas, this.filters);
    },

    filterData:function (datas, filters) {
        if (filters && filters instanceof Array && filters.length > 0) {
            this.notifier.notify(handson.NOTIFICATION.FILTER, {datas:datas, filters:filters});
        }
        else {
            this.resetView();
        }

    },

    updateView:function (filterDatas) {
        this.elements.hide();
        if (filterDatas && filterDatas instanceof Array && filterDatas.length > 0) {
            $(filterDatas).each(function (index, model) {
                $('#' + model.id).show();
            });
        }
    },

    resetView:function () {
        this.elements.show();
    },

    getDatas:function () {
        var datas = [];

        for (var i = 0, ln = this.elements.length; i < ln; i++) {
            var div = this.elements.eq(i);
            var model = {
                id:div.attr('id'),
                roles:div.attr('data-role').split(' ')
            };
            datas.push(model);
        }

        return datas;
    },

    getFilters:function () {
        var filters = [];
        var chks = $('.filterChk:checked');
        chks.each(function (index, chk) {
            filters.push($(chk).val());
        });
        return filters;
    },

    setNotifier:function (notifier) {
        var _this = this;
        this.notifier = notifier;
        this.notifier.register(handson.NOTIFICATION.FILTER_OK, function (notif, data) {
            if (data.filterDatas) {
                _this.updateView(data.filterDatas);
            }
        });
    }
});


