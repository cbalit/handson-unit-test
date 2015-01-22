/*global Backbone */
if(handson == undefined){
	var handson = {};
}

(function () {

	'use strict';




    handson.Users = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: handson.User,
        initialize: function () {
          this.initDatas=[];
        },
		filterByName: function (value) {
			if(value){
                this.restore();
                var datas=this.filter(function (item) {
                    return (item.get('lastname').toLowerCase().indexOf(value.toLowerCase()) != -1 || item.get('firstname').toLowerCase().indexOf(value.toLowerCase())!= -1);
                });
                this.reset(datas);
            }
		},
        setInitDatas: function (datas) {
            this.initDatas=datas;
            this.reset(datas);
        },
		restore: function () {
			this.reset(this.initDatas);
		}
	});

	// Create our global collection of **Todos**.
	handson.users = new handson.Users();

})();
