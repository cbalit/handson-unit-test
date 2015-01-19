/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 10/07/12
 * Time: 10:36
 * To change this template use File | Settings | File Templates.
 */

var handson = {};

handson.Filter = Class.extend({

    container:null,

    init : function(container) {
        this.container=$(container);
    },


    filter2 : function(filter) {
        if(filter){
            var divs = this.container.find('div:not([data-role*='+filter+'])').hide();
        }
        else{
            var divs = this.container.find('div').show();
        }
    },

    filter : function(filters) {
        this.container.find('div').show();
        if(filters && filters instanceof Array && filters.length>0){
            for (var i = 0, ln = filters.length; i < ln; i++) {
                var filter = filters[i];
                if(filter){
                    var divs = this.container.find('div:not([data-role*='+filter+'])').hide();
                }
            }
        }
    }
});


$(function(){
    var filter=new handson.Filter($('.main'));
    $('.filterChk').click(function (e){
        //get all checkbox cliked
        var chks= $('.filterChk:checked');
        var filters=[];
        chks.each(function(index,chk){
            filters.push($(chk).val());
        });

        filter.filter(filters);


        /*if(this.checked){
         filter.filter($('.main'), this.value);
         }
         else{
         filter.filter($('.main'));
         }*/

    });

});