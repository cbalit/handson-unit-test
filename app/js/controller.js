if(handson == undefined){
    var handson = {};
}


handson.Controller = Class.extend({

    datas:[],
    filters:[],
    table:null,

    init : function(table) {
        if(!table){
            throw new Error("missing required arguments");
        }
        this.table= table;
        this.addEvent();
    },

    setDatas : function(datas){
        this.datas= datas;
    },

    setFilter : function(filter){
        this.filter= filter;
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
            var filterDatas=this.filter.filterByName(this.datas,value);
            this.updateView(filterDatas);
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