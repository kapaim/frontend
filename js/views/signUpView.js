var SignUpView = Backbone.View.extend({
    el: "#content", 
    render: function(){
        var template = _.template($("#sign-up-form").html()); 
        this.$el.html(template);
    }, 
    events: {
        'click #sign-up-button': 'signUp', 
        'change #type': 'typeChange'
    }, 
    signUp: function(event){

        //load form variables -- need to automate this
        var user = {} 
        user.type = document.getElementById("type").value;
        user.username = document.getElementById("username").value; 
        user.firstname = document.getElementById("firstname").value; 
        user.lastname = document.getElementById("lastname").value; 
        user.email = document.getElementById("email").value; 
        user.password = document.getElementById("password").value;

        if(user.type == "student"){
            user.yearsAtCollege = document.getElementById("yearsAtCollege").value; 
            user.yearsOffCampus = document.getElementById("yearsOffCampus").value; 
            user.currentlyOffCampus = document.getElementById("currentlyOffCampus").value;
        }

        if(user.type == "landlord"){
            user.companyname = document.getElementById("companyname").value; 
            user.yearsInService = document.getElementById("yearsInService").value; 
            user.phone = document.getElementById("phone").value; 
        }

        //validate data
        var userKeys = Object.keys(user);
        for(key in userKeys){
            if(user[userKeys[key]] == undefined || user[userKeys[key]].length == 0){
                alert("Must enter a " + userKeys[key]);
                break; 
            }
        }

        var path = "/" + user.type + "s/register";
        var userRoute = "/" + user.type + "s/" + user.username;

        $.ajax({
            url: path, 
            type: "POST",
            dataType: "json", 
            data: user, 
            success: function(body){
                router.navigate(userRoute, {trigger: true});
            }
        });

        return false; 
    },
    typeChange: function(event){
        console.log(event.currentTarget.value);
        var type = event.currentTarget.value; 

        if(type == "student"){
            document.getElementById("yearsOffCampus").style.display = "";
            document.getElementById("yearsAtCollege").style.display = "";
            document.getElementById("yearsOffCampus-label").style.display = "";
            document.getElementById("yearsAtCollege-label").style.display = "";
            document.getElementById("currentlyOffCampus-label").style.display = "";
            document.getElementById("currentlyOffCampus").style.display = "";
            document.getElementById("yearsInService").style.display = "none";
            document.getElementById("companyname").style.display = "none";
            document.getElementById("phone").style.display = "none";
        }
        else if(type == "landlord"){
            document.getElementById("yearsOffCampus").style.display = "none";
            document.getElementById("yearsAtCollege").style.display = "none";
            document.getElementById("yearsOffCampus-label").style.display = "none";
            document.getElementById("yearsAtCollege-label").style.display = "none";
            document.getElementById("currentlyOffCampus-label").style.display = "none";
            document.getElementById("currentlyOffCampus").style.display = "none";
            document.getElementById("yearsInService").style.display = "";
            document.getElementById("companyname").style.display = "";
            document.getElementById("phone").style.display = "";
        }
        else{
            //do nothing 
            return false; 
        }
    }
})

var signUpView = new SignUpView();  