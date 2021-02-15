const express = require('express');
const moment = require('moment');
const mysql = require('mysql');
const alert = require('alert');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'architg27'
});

con.connect(function(err) {
  con.query("CREATE DATABASE IF NOT EXISTS banksystem", function (err, result) {
  });
  con.query("USE banksystem", function (err, result) {
  });
  const sql = "CREATE TABLE IF NOT EXISTS banking(name VARCHAR(50), email VARCHAR(60),cb varchar(30),PRIMARY KEY(name,email,cb))";
  con.query(sql, function (err, result) {
  });
  const sql2 = "CREATE TABLE IF NOT EXISTS transaction(Sname VARCHAR(50), Rname VARCHAR(50),amount varchar(30),date varchar(50))";
  con.query(sql2, function (err, result) {
  });
  const sql1="insert into banking(name,email,cb) values('Shivam Kapoor','shivamk@gmail.com',46000),('Atishay Shrivastav','shrivastavatishay@gmail.com',180000),('Ukti Sharma','sharmaji04@gmail.com',15200),('Zeeshan','zeeshansaif@gmail.com',80900),('Abhinav Gujjar','gujjar26@gmail.com',67000),('Ram Prasad Yadav','yadavram7@gmail.com',10100),('Harsh Singh','harshsin99@gmail.com',45000),('Aniket Jain','aniketjain12@gmail.com',5600),('Sarthak Dubey','sarthakd412@gmail.com',126789),('Kaif Khan','kaifkhan56@gmail.com',23000)";
  con.query(sql1,function(err,result){
  });
});

var name="0";
var name1="0";
var am=0;
app.get('/', function(req, res)  {
    res.render('homepage.ejs');
});
app.get('/customers', function(req, res)  {
    con.query('SELECT * FROM banking', function(error, results)  {
    res.render('view_customer.ejs',{banking: results});
    });
});
app.get('/user_select', function(req, res)  {
    res.render('selectuser.ejs');
});
app.get('/money_transfer', function(req, res)  {
	con.query('SELECT * FROM banking WHERE name=?',[name], function(error, results){
		res.render('transfer_money.ejs',{banking:results});
	});
});
app.get('/transaction', function(req, res)  {
	con.query('SELECT * FROM transaction', function(error, results){
		res.render('transaction.ejs',{transaction:results});
	});
});
app.get('/successfull', function(req, res)  {
	con.query('select * from transaction order by date desc limit 1;',function(error,results){
    res.render('successfull.ejs',{transaction:results});});
});
app.post('/create', function(req, res)  {
	name=req.body.subject;
	if(name=="-Select-"){
		alert("Select any user");
		res.redirect('/user_select');
	}
	else{
		res.redirect('/money_transfer');
	}
});
app.post('/index', function(req, res)  {
	name1=req.body.subject;
	am=req.body.amount;
	con.query('SELECT cb FROM banking WHERE name=?',[name],function(error,results){
		var a=results[0].cb;
		a=parseInt(a);
		am=parseInt(am);
	    if(name1=="-Select-"){
			alert("Select any user");
			res.redirect('/money_transfer');
		}
		else if(name==name1){
			alert("Sender and Recipient cannot be same. Please select another recipient");
			res.redirect('/money_transfer');
		}
		else if(am > a){
			alert("Insuffcient Amount");
			res.redirect('/money_transfer');
		}
		else{
			con.query('SELECT cb FROM banking WHERE name=?',[name1],function(err,result){
				var b=result[0].cb;
				am=parseInt(am);
				b=parseInt(b);
				var c=a-am;
				var d=b+am;
				var date_time = moment(Date.now()).format('DD-MM-YYYY HH:mm:ss');
				con.query('UPDATE banking SET cb=? WHERE name=?',[c,name],function(error,results){});
				con.query('UPDATE banking SET cb=? WHERE name=?',[d,name1],function(error,results){});
				con.query('INSERT INTO transaction (Sname,Rname,amount,date) VALUES (?,?,?,?)',
					[name,name1,am,date_time],function(error,results){});
			    });
			res.redirect('/successfull');
		}
	});
});

app.listen(9090);
