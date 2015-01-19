/**
 * Created by adzs637 on 13/01/2015.
 */
var users=filteredUser=[
        {
            "id": "54b525c472540a87ce06f0ae",
            "firstname": "Suzanne",
            "lastname": "Mcbride",
            "mail": "suzannemcbride@accupharm.com",
            "company": "COMTEXT"
        },
        {
            "id": "54b525c4d48c59770408f37e",
            "firstname": "Carroll",
            "lastname": "Humphrey",
            "mail": "carrollhumphrey@comtext.com",
            "company": "DEVILTOE"
        },
        {
            "id": "54b525c4d7e55f2daef2be15",
            "firstname": "Terry",
            "lastname": "Mckinney",
            "mail": "terrymckinney@deviltoe.com",
            "company": "VIASIA"
        },
        {
            "id": "54b525c4d233cc5ae9d81443",
            "firstname": "Maureen",
            "lastname": "Hobbs",
            "mail": "maureenhobbs@viasia.com",
            "company": "MAGNINA"
        },
        {
            "id": "54b525c4748ad81682126c79",
            "firstname": "Ida",
            "lastname": "Raymond",
            "mail": "idaraymond@magnina.com",
            "company": "PHARMEX"
        },
        {
            "id": "54b525c456c8a10f67891f07",
            "firstname": "Young",
            "lastname": "Jacobson",
            "mail": "youngjacobson@pharmex.com",
            "company": "XPLOR"
        }
    ];

var render=function(){
    var body=$('#users tbody');
    body.empty();
    filteredUser.forEach(function(item){
        body.append('<tr>' +
        '<td>'+item.id+'</td>' +
        '<td>'+item.firstname+'</td>' +
        '<td>'+item.lastname+'</td>' +
        '<td>'+item.mail+'</td>' +
        '<td>'+item.company+'</td>' +
        '</tr>')
    });
};


var filter= function (filter) {
    if(!filter){
        filteredUser=users
    }
    else {
        filteredUser = users.filter(function (item) {
            return (item.lastname.toLowerCase().indexOf(filter.toLowerCase()) != -1 || item.firstname.toLowerCase().indexOf(filter.toLowerCase())!= -1);
        });
    }
};

$(function(){
    render();
    $('#filter-input').keyup(function (e) {
        console.log('change');
        filter($('#filter-input').val());
        render();
    });

    $('#filter-button').click(function (e) {
        filter($('#filter-input').val());
        render();
    })

});