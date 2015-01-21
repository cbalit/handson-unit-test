if(handson == undefined){
    var handson = {};
}

handson.Proxy = Class.extend({

    notifier: null,
    url:null,

    init : function(url) {
        this.url=url;
    },

    setNotifier : function(notifier){
        var _this=this;

        this.notifier= notifier;
        this.notifier.register(handson.NOTIFICATION.FILTER, function(notif,params){
            _this.filterHandler(params);
        })
    },

    filterHandler : function(params){
        var _this=this;

        $.ajax({
            url: this.url,
            dataType:'json',
            data:params,
            success: function (data) {
                _this.filterResult(data)
            }
        });
    },

    filterResult : function(data){
        if(data.status=='ok'){
            this.notifier.notify(handson.NOTIFICATION.FILTER_OK,data);
        }
    }


});