/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 10/07/12
 * Time: 10:36
 * To change this template use File | Settings | File Templates.
 */

if(handson == undefined){
    var handson = {};
}

handson.Filter = Class.extend({


    init : function() {
    },



    //Filter on a array of object
    //check that the object have the key
    filter : function(datas,filters) {
        var filterDatas=[];
        if(datas && datas instanceof Array && datas.length>0){
            if(filters && filters instanceof Array && filters.length>0){

                $(datas).each(function(index,data){
                    var hasAllRole=true;
                    $(filters).each(function(index,filter){
                        hasAllRole=hasAllRole && ($.inArray(filter,data.roles)!=-1);
                    });
                    if(hasAllRole){
                        filterDatas.push(data);
                    }
                });
            }
            else{
                filterDatas=datas;
            }
        }
        return filterDatas;
    }
});


