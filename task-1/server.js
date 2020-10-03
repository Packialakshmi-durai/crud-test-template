var express=require('express')
var app=express()
var mysql=require('mysql')
var bodyParser=require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.set('view engine', 'ejs');
//mysql connection 
var connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*****',
    database: 'crud'
})

connection.connect(function(err){
    if(!err){
        console.log("database connected successfully")
    }
})

//get employee data

app.get("/employeetable",function(req,res){

	var data= "select * from employee_details"
 
    connection.query(data, function (err, rows, fields) {
    
      if (!err) {
        res.send(rows);
      }
      else
    	res.send("Error while performing Query.")
    });
})

//create new employee data

app.post("/employeetablePush",function(req,res){

	var data= "INSERT INTO employee_details(username,email,phone,question,answer) VALUES('"+req.body.username+"','"+req.body.email+"','"+req.body.phone+"','"+req.body.question+"','"+req.body.answer+"')"
  
    connection.query(data, function (err, rows, fields) {
    
      if (!err) {
        res.send(rows);
      }
      else
    	res.send("Error while performing Query.")
    });
})


// delete record based on username

app.post('/delete',function(req,res){
  
    var query_delete= "delete from employee_details where username='"+req.body.username+"'"
    connection.query(query_delete, function (err, rows, fields) {
    
      if (!err) {
        res.send("deleted");
      }
      else
        res.send('Error while performing Query.');
    });
  })


// update record based on username

app.post('/update',function(req,res){

    var query_update= "update employee_details set email='"+req.body.email+"',phone='"+req.body.phone+"'where username='"+req.body.username+"'"
   
    connection.query(query_update, function (err, rows, fields) {
    
      if (!err) {
        res.send("updated");
      }
      else
        console.log('Error while performing Query.');
    });
  })
  

app.post("/validateuser",function(req,res){

    var data= "select * from usertable where username='"+req.body.username+"'AND password='"+req.body.password+"'"
     console.log(data)
    connection.query(data, function (err, rows, fields) {
    
      if (!err) {
        res.send(rows);
      }
      else
      res.send("Error while performing Query.")
    });
})

app.get("/home",function(req,res){
    console.log("came")
    res.render("home", {});
})

//login page

app.get("/",function(req,res){
	res.render("login", {});
})

app.listen(4000,console.log("sever running"))