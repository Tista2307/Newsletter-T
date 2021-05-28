const ex=require("express")
const app=ex()
const bodyparser=require("body-parser")
//const request=require("request")// https is used to get from api like weather app but here we are posting to mail chimp so we are using request
const https=require("https")

app.use(bodyparser.urlencoded({extended:true}));
app.use(ex.static("public"));
app.get("/",function(req,res){
 res.sendFile(__dirname+"/signup1.html")
})
app.post("/",function(req,res){
    let fn=req.body.fname
    let ln=req.body.lname
    let em=req.body.email
    //data has to be in form of stringified json format for the mailchimp api to understand
    let data={
        members:[
            {
            email_address:em,
            status:"subscribed",
            merge_fields:{
                FNAME:fn,
                LNAME:ln
            }
        }
        ]
      
    }
    app.post("/fail", function(req,res){
        res.redirect("/");
    })
    let jsondata=JSON.stringify(data);
    let url="https://us6.api.mailchimp.com/3.0/lists/5483d7beb2"
    let options={
        method:"POST",
        auth:"tista123:33873dfe18dc3a46effb4d712dd1e109-us6"
    }
   // var b=true;
    const request=https.request(url,options,function(resp){
        if(resp.statusCode===200){
            res.sendFile(__dirname+"/successful.html")
        }
        else{

            res.sendFile(__dirname+"/fail.html")
            
        }
    })
    
    request.write(jsondata);
    request.end();
    
    
});



app.listen(process.env.PORT||8080,function(){
    console.log("listening at port 8080");
})
//893ece3ccd
//33873dfe18dc3a46effb4d712dd1e109-us6
//33873dfe18dc3a46effb4d712dd1e109-us6