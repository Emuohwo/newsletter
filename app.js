const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    // res.send("Hey!, what are you looking for?");
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    // console.log(firstName, lastName, email);
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:  firstName,
                    LNANE:  lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/859175bacd",
        method: "POST",
        headers: {
            "Authorization": "Warri1 791af1b457ea34751ec624f41039f0d0-us20"
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error) {
            // console.log(error);
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html");   
            }
            // console.log(response.statusCode);
            // res.send("You have successfully subscribed. Thank you! You will hear from s soon")
        }
    });

});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("You are listening to port 3000");
});  


// API Key
// 791af1b457ea34751ec624f41039f0d0-us20

//  859175bacd