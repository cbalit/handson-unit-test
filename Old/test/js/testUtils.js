/**
 * Created with IntelliJ IDEA.
 * User: balit
 * Date: 29/08/12
 * Time: 11:10
 * To change this template use File | Settings | File Templates.
 */

var testUtils = {
    NB_DIV : 7,

    createDivByFile : function() {
        loadFixtures('filterFixture.html');
    },

    clickChkFilter : function(index) {
        runs(function () {
            var chk = $('.filterChk').eq(index);
            chk.attr('checked',!chk.attr('checked'));
            chk.click();
        });
    },

    clickFirstChkFilter: function() {
        this.clickChkFilter(0);
    },


    expectAllDivAreVisible : function(){
        for (var i = 1, ln = this.NB_DIV; i <= ln; i++) {
            expect($('#div' + i)).toBeVisible();
        }
    },

    expectAllDivAreHidden : function(){
        for (var i = 1, ln = this.NB_DIV; i <= ln; i++) {
            expect($('#div' + i)).not.toBeVisible();
        }
    }
}