var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//var flash = require('express-flash-notification');

function toString(a){
    if(typeof a === "string")
    return true;
    else
    return false;
}

app.use(bodyParser.urlencoded({extended:true}));

//app.use(session({...}));

app.use(express.static("public"));
//app.use(flash(app));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost/travelAgency", {useNewUrlParser: true});

var AccountInfo = [];
var Tourdata = [];
var tourNumbers = 0;

//var textSchema = new mongoose.Schema({});

var toursSchmema = new mongoose.Schema({
    name:String,
    date:String,
    disp_text:String,
    disp_img:String,
    destination:String,
    dep_city:String,
    tour_duration:Number,
    price:Number,
});

var accountSchema = new mongoose.Schema({
    email:String,
    userName:String,
    password:String,
    city:String,
    province:String
});
/////////////////////////////
var Tour = mongoose.model("Tour",toursSchmema);

var Account = mongoose.model("Account",accountSchema);


Tour.findOneAndDelete({ _id: '5d6814ecaa364011340c28be'},function(error,obj){

    if(error){
        console.log("Error in deleting"+error);
    }else{
        console.log("deleted successfuly");
    }
})



//var AdminSchema = new mongoose.Schema({ email:String,password:String});

app.get("/signup",function(req,res){
    res.render("signup")
})
app.get("/addtour",function(req,res){
    res.render("addtour");
})
app.get("/alltours",function(req,res){});

app.post("/addtour",function(req,res){

    Tourdata.push(req.body.tour_name);
    Tourdata.push(req.body.tour_date);
    Tourdata.push(req.body.tour_disp_text);
    Tourdata.push(req.body.tour_disp_img);
    Tourdata.push(req.body.tour_destination);
    Tourdata.push(req.body.tour_dep_city);
    Tourdata.push(parseInt(req.body.tour_duration));
    Tourdata.push(parseInt(req.body.tour_price));
   

    Tour.create({ 
        name :        Tourdata[0], 
        date :        Tourdata[1],
        disp_text :   Tourdata[2],
        disp_img :    Tourdata[3],
        destination:  Tourdata[4],
        dep_city:     Tourdata[5],
        tour_duration : Tourdata[6],
        price:         Tourdata[7],
    }
        ,function(error,obj)
        {if(error)
            {console.log(error);}
            else{
                console.log("Saved to the data base");
                console.log(obj);
                res.redirect("/admin");
            }
    });

})
app.get("/displayTours",function(req,res){
    
    var temp = 0;
    Tour.find({},function(error,obj){
        if(error){
            console.log("error in displaying tours:" + error);
            return;
        }
        else{
            console.log("Tour find search successful!!");
            tourNumbers = obj.length;
            temp = obj;
            obj.forEach(function(x){
                console.log(x);
                
            });
            console.log("Tour find over");
            return res.render("display_tour",{
                obj:obj,
                tourNumbers:tourNumbers
            });
            
        }
    });
  
});





app.get("/admin",function(req,res){
  res.render("admin");
})

app.get("/login",function(req,res){
    AccountInfo.push();
    Account.create();
    res.render("login");

})
/////////////////////////////////////////////////////////////////////////////

//////////////////////////////  LOGIN ROUTE  //////////////////////////////////////

////////////////////////////////////////////////////////////////////////////




app.post("/login",function(req,res){

    if(req.body.login.password == req.body.login.password2){
        
    }
    else{
        //req.flash('info', 'invalid username or password');

    }

    AccountInfo.push(req.body.login.email);
    AccountInfo.push(req.body.login.userName);
    AccountInfo.push(req.body.login.password);
    AccountInfo.push(req.body.login.city);
    AccountInfo.push(req.body.login.province);

    Account.create({
        email:AccountInfo[0],
        userName:AccountInfo[1],
        password:AccountInfo[2],
        city:AccountInfo[3],
        province:AccountInfo[4]
    }
    ,function(err,obj){
        if(err){
            console.log("error in saving login info to the DB" + err);
        }
        else{
            console.log("saved to the DB successfully");
            console.log(obj);
            res.redirect("login");
        }
    })
});

app.get("/getusers",function(req,res){
    Account.find({},function(err,obj){
        if(err){
            console.log("Error in display users ",err);
        }
        else{
            console.log(obj);
            console.log("users display over");
        }
    });
});

app.post("/viewTour",function(req,res){
    console.log(req.body.card_post.title);
});
app.get("/",function(req,res){
    
    Tour.find({},function(error,obj){
        if(error){
            console.log("error in displaying tours:" + error);
            return;
        }else{
            console.log("Tour find search successful!!");
            tourNumbers = obj.length;
            temp = obj;
            obj.forEach(function(x){
                console.log(x);
                
            });
            console.log("Tour find over");
            return res.render("home",{
                obj:obj,
                tourNumbers:tourNumbers
            });
            
        }
    });
    Tour.findOneAndDelete({name :'Naanga Parbat'},function(error,obj){

        if(error){
            console.log("Error in deleting"+error);
        }else{
            console.log("deleted successfuly");
        }
    })
    
});

//app.get("");

app.listen(3000,function(){
    console.log("Sever started at port 3000");
});
