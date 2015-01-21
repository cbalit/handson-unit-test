if(handson == undefined){
    var handson = {};
}


handson.Controller = Class.extend({

    datas:[],
    filters:[],
    table:null,

    init : function(table) {
        this.table= table;
        this.addEvent();
    },

    setDatas : function(datas){
        this.datas= datas;
    },

    setNotifier:function (notifier) {
        var _this = this;
        this.notifier = notifier;
        this.notifier.register(handson.NOTIFICATION.FILTER_OK, function (notif, data) {
            if (data.filterDatas) {
                _this.updateView(data.filterDatas);
            }
        });
    },

    addEvent : function(){
        var _this=this;
        $('#filter-button').click(function (e) {
            _this.clickHandler();
        })
    },

    clickHandler : function(e){
        var value=$('#filter-input').val();
        this.filterDatas(value);
    },

    filterDatas : function(value){
        if(value){
            this.notifier.notify(handson.NOTIFICATION.FILTER, {datas:this.datas, filters:value});
        }
        else{
            this.resetView();
        }

    },

    updateView : function(datas){
        var datas = datas || this.datas;
        var body=this.table.find('tbody');
        body.empty();
        if(datas && datas instanceof Array) {
            datas.forEach(function(item){
                body.append('<tr>' +
                '<td>'+item.id+'</td>' +
                '<td>'+item.firstname+' '+item.lastname+'</td>' +
                '<td>'+item.mail+'</td>' +
                '<td>'+item.company+'</td>' +
                '<td>'+item.roles+'</td>' +
                '</tr>')
            });
        }
    },

    resetView : function(){
        this.updateView(this.datas);
    }
});