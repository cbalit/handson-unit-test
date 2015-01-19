/**
 * Created by adzs637 on 13/01/2015.
 */
var users=filteredUser=[
        {
            "id": "54b525c472540a87",
            "firstname": "Suzanne",
            "lastname": "Mcbride",
            "mail": "suzannemcbride@accupharm.com",
            "company": "COMTEXT",
            "roles":["ADMIN"]
        },
        {
            "id": "54b525c4d48c5977",
            "firstname": "Carroll",
            "lastname": "Humphrey",
            "mail": "carrollhumphrey@comtext.com",
            "company": "DEVILTOE",
            "roles":["ADMIN"]
        },
        {
            "id": "54b525c4d7e55f2d",
            "firstname": "Terry",
            "lastname": "Mckinney",
            "mail": "terrymckinney@deviltoe.com",
            "company": "VIASIA",
            "roles":["READ","WRITE"]
        },
        {
            "id": "54b525c4d233cc5a",
            "firstname": "Maureen",
            "lastname": "Hobbs",
            "mail": "maureenhobbs@viasia.com",
            "company": "MAGNINA",
            "roles":["READ","WRITE"]
        },
        {
            "id": "54b525c4748ad8",
            "firstname": "Ida",
            "lastname": "Raymond",
            "mail": "idaraymond@magnina.com",
            "company": "PHARMEX",
            "roles":["READ"]
        },
        {
            "id": "54b525c456c8a1",
            "firstname": "Young",
            "lastname": "Jacobson",
            "mail": "youngjacobson@pharmex.com",
            "company": "XPLOR",
            "roles":["ANONYMOUS"]
        }
    ];

var render=function(){
    var body=$('#users tbody');
    body.empty();
    filteredUser.forEach(function(item){
        body.append('<tr>' +
        '<td>'+item.id+'</td>' +
        '<td>'+item.firstname+' '+item.lastname+'</td>' +
        '<td>'+item.mail+'</td>' +
        '<td>'+item.company+'</td>' +
        '<td>'+item.roles+'</td>' +
        '</tr>')
    });
};



$(function(){
    render();
});