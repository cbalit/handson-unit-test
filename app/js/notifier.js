if(handson == undefined){
    var handson = {};
}

handson.Notifier = Class.extend({
    init : function(notificationName){
        this.delegate=$({});
    },

    notify : function(notificationName,args){
        this.delegate.trigger(notificationName,args);
    },

    register : function(notificationName,handler){
        this.delegate.on(notificationName,handler);
    },

    unregisterAll : function(){
        this.delegate.off();
    },

    unregister : function(notificationName,handler){
        this.delegate.off(notificationName,handler);
    }
});


handson.NOTIFICATION={
    FILTER:"filter",
    FILTER_OK:"filterOK"
};