/**
 * Created by adzs637 on 19/01/2015.
 */
if (handson == undefined) {
    var handson = {};
}

handson.Filter = Class.extend({
    //Filter on a array of object
    //check that the object have the key
    filterByName: function (datas, value) {
        var filterDatas = [];
        if (datas && datas instanceof Array && datas.length > 0) {
            if (value) {
                filterDatas = datas.filter(function (item) {
                    return (item.lastname.toLowerCase().indexOf(value.toLowerCase()) != -1 || item.firstname.toLowerCase().indexOf(value.toLowerCase()) != -1);
                });
            }
            else {
                filterDatas = datas
            }
        }
        return filterDatas;
    },
    filterByRoles: function (datas, roles) {
        var filterDatas = [];
        if (datas && datas instanceof Array && datas.length > 0) {
            if (roles && roles instanceof Array && roles.length > 0) {
                $(datas).each(function(index,data) {
                    var hasAllRole = true;
                    $(roles).each(function (index, role) {
                        hasAllRole = hasAllRole && ($.inArray(role, data.roles) != -1);
                    });
                    if (hasAllRole) {
                        filterDatas.push(data);
                    }
                });
            }
            else {
                filterDatas = datas
            }
        }
        return filterDatas;
    }
});