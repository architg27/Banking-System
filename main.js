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

//SELECT * FROM banking
//SELECT name FROM banking WHERE cb=67000
app.listen(9090);
/*app.get('/score', function(req, res)  {
  con.query(
    'SELECT caaa,isatc,bhraaw,sm,rp,cr,ba,ho,ka,bo,dsa,dsm,dbms,smda,tdm FROM quiz WHERE uid = (?)',[uname_1], function(error, results)  {
      res.render('previous_score.ejs', {quiz: results});
      console.log(uname_1);
      console.log(results[0]);
    }
  );
});*/
/*app.get('/loginreg', function(req, res)  {
  res.render('loginreg.ejs');
});
app.get('/topicpage', function(req, res)  {
  res.render('topicpage.ejs');
});
app.get('/topicpage_1', function(req, res)  {
  res.render('topicpage_1.ejs');
});
app.get('/Current_affairs', function(req, res)  {
  res.render('page1.ejs');
});
app.get('/Current_affairs_1', function(req, res)  {
  res.render('page1_1.ejs');
});
app.get('/Indian_states', function(req, res)  {
  res.render('page2.ejs');
});
app.get('/Indian_states_1', function(req, res)  {
  res.render('page2_1.ejs');
});
app.get('/Bharat_ratna', function(req, res)  {
  res.render('page3.ejs');
});
app.get('/Bharat_ratna_1', function(req, res)  {
  res.render('page3_1.ejs');
});
app.get('/Social_movements', function(req, res)  {
  res.render('page4.ejs');
});
app.get('/Social_movements_1', function(req, res)  {
  res.render('page4_1.ejs');
});
app.get('/Renowed_personalities', function(req, res)  {
  res.render('page5.ejs');
});
app.get('/Renowed_personalities_1', function(req, res)  {
  res.render('page5_1.ejs');
});
app.get('/Cricket', function(req, res)  {
  res.render('page6.ejs');
});
app.get('/Cricket_1', function(req, res)  {
  res.render('page6_1.ejs');
});
app.get('/Badminton', function(req, res)  {
  res.render('page7.ejs');
});
app.get('/Badminton_1', function(req, res)  {
  res.render('page7_1.ejs');
});
app.get('/Hockey', function(req, res)  {
  res.render('page8.ejs');
});
app.get('/Hockey_1', function(req, res)  {
  res.render('page8_1.ejs');
});
app.get('/Kabaddi', function(req, res)  {
  res.render('page9.ejs');
});
app.get('/Kabaddi_1', function(req, res)  {
  res.render('page9_1.ejs');
});
app.get('/Boxing', function(req, res)  {
  res.render('page10.ejs');
});
app.get('/Boxing_1', function(req, res)  {
  res.render('page10_1.ejs');
});
app.get('/dsa', function(req, res)  {
  res.render('page11.ejs');
});
app.get('/dsa_1', function(req, res)  {
  res.render('page11_1.ejs');
});
app.get('/dsm', function(req, res)  {
  res.render('page12.ejs');
});
app.get('/dsm_1', function(req, res)  {
  res.render('page12_1.ejs');
});
app.get('/dbms', function(req, res)  {
  res.render('page13.ejs');
});
app.get('/dbms_1', function(req, res)  {
  res.render('page13_1.ejs');
});
app.get('/smda', function(req, res)  {
  res.render('page14.ejs');
});
app.get('/smda_1', function(req, res)  {
  res.render('page14_1.ejs');
});
app.get('/tdm', function(req, res)  {
  res.render('page15.ejs');
});
app.get('/tdm_1', function(req, res)  {
  res.render('page15_1.ejs');
});
app.post('/create', function(req, res)  {
    var initial_marks=0;
    var uname=req.body.username;
    var pass=req.body.password;
    con.query('SELECT COUNT(*) AS cnt FROM quiz WHERE uid = ?', [uname], function(error, results) {
      if (results[0].cnt > 0) {
        alert("Username is already exits");
  	    res.redirect('/loginreg');}
      else{ 
        con.query('INSERT INTO quiz (uid,pass,caaa,isatc,bhraaw,sm,rp,cr,ba,ho,ka,bo,dsa,dsm,dbms,smda,tdm) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
         [uname,pass,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks,initial_marks], function(error, results) {
        alert("Sucessfully registered! Now you can Log In");
        res.redirect('/loginreg');
       });
			}
});
});
app.post('/index', function(req, res) {
	uname_1 = req.body.username_1;
	var pass_1 = req.body.password_1;
	if (uname_1 && pass_1) {
		con.query('SELECT * FROM quiz WHERE uid = ? AND pass = ?', [uname_1, pass_1], function(error, results) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username2 = uname_1;
        alert("Sucessfully logged in!");
				res.redirect('/topicpage');
			} else {
        alert('Incorrect Username and/or Password!');
				res.redirect('/loginreg');
			}			
		});
	}
});
app.post('/current', function(req, res)  {
  var a=req.body.stateun;
  var b=req.body.ccj;
  var c=req.body.cp;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "28 states and 8 union territories")
    {count=count+1;}
  if (b == "Justice Sharad Arvind Bobde")
    {count=count+1;}
  if (c == "Shri Ram Nath Kovind")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET caaa=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/indian', function(req, res)  {
  var a=req.body.capital;
  var b=req.body.capital_1;
  var c=req.body.capital_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "Bhopal")
    {count=count+1;}
  if (b == "Gandhinagar")
    {count=count+1;}
  if (c == "Mumbai")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET isatc=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/bharat', function(req, res)  {
  var a=req.body.oci;
  var b=req.body.rhc;
  var c=req.body.ofd;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "Sachin Tendulkar")
    {count=count+1;}
  if (b == "Ustad Bismillah")
    {count=count+1;}
  if (c == "Atal Bihari Vajpayee")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET bhraaw=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/social', function(req, res)  {
  var a=req.body.socialmovements;
  var b=req.body.socialmovements_1;
  var c=req.body.socialmovements_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "Derozians")
    {count=count+1;}
  if (b == "Gopal Hari Deshmukh")
    {count=count+1;}
  if (c == "Hindu Succession Act- 1956")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET sm=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/renowned', function(req, res)  {
  var a=req.body.renownedpersonalities;
  var b=req.body.renownedpersonalities_1;
  var c=req.body.renownedpersonalities_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "Sardar Vallabhbhai Patel")
    {count=count+1;}
  if (b == "Shakunthala Devi")
    {count=count+1;}
  if (c == "Kathak")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET rp=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/cri', function(req, res)  {
  var a=req.body.cricket;
  var b=req.body.cricket_1;
  var c=req.body.cricket_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == 1932)
    {count=count+1;}
  if (b == 1952)
    {count=count+1;}
  if (c == 1983)
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET cr=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/bad', function(req, res)  {
  var a=req.body.badminton;
  var b=req.body.badminton_1;
  var c=req.body.badminton_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "Pusarla Venkata Sindhu")
    {count=count+1;}
  if (b == 3)
    {count=count+1;}
  if (c == "Pusarla Venkata Sindhu")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET ba=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/hoc', function(req, res)  {
  var a=req.body.gm;
  var b=req.body.imt;
  var c=req.body.fog;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == 8)
    {count=count+1;}
  if (b == 1)
    {count=count+1;}
  if (c == 1928)
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET ho=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/kab', function(req, res)  {
  var a=req.body.Kabaddi;
  var b=req.body.Kabaddi_1;
  var c=req.body.Kabaddi_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == 6)
    {count=count+1;}
  if (b == "1936 Olympic Games in Berlin")
    {count=count+1;}
  if (c == 11)
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET ka=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/box', function(req, res)  {
  var a=req.body.boxing;
  var b=req.body.boxing_1;
  var c=req.body.boxing_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == 2020)
    {count=count+1;}
  if (b == "All of the above")
    {count=count+1;}
  if (c == "1 Bronze Medal")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET bo=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/datast', function(req, res)  {
  var a=req.body.data;
  var b=req.body.data_1;
  var c=req.body.data_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "stack")
    {count=count+1;}
  if (b == "O(n)")
    {count=count+1;}
  if (c == "Selection Sort")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET dsa=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/digitalsys', function(req, res)  {
  var a=req.body.digital;
  var b=req.body.digital_1;
  var c=req.body.digital_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "Single input, multiple outputs")
    {count=count+1;}
  if (b == "Select inputs")
    {count=count+1;}
  if (c == 2)
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET dsm=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/databasesys', function(req, res)  {
  var a=req.body.database;
  var b=req.body.database_1;
  var c=req.body.database_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "Query language")
    {count=count+1;}
  if (b == "ALTER TRIGGER")
    {count=count+1;}
  if (c == "DROP INDEX")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET dbms=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/statisticalmet', function(req, res)  {
  var a=req.body.statistical;
  var b=req.body.statistical_1;
  var c=req.body.statistical_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "+/- 2.33")
    {count=count+1;}
  if (b == "Confidence interval will increase with the introduction of outliers")
    {count=count+1;}
  if (c == "Significance level = 1- Confidence level")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET smda=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.post('/technique', function(req, res)  {
  var a=req.body.techniques;
  var b=req.body.techniques_1;
  var c=req.body.techniques_2;
  console.log(uname_1);
  var count=0;
  console.log(a);
  console.log(b);
  console.log(c);
  if (a == "Routine and non-complex")
    {count=count+1;}
  if (b == "Non-programmed decision")
    {count=count+1;}
  if (c == "Instinct")
    {count=count+1;}
  console.log(count);
  con.query('UPDATE quiz SET tdm=(?) WHERE uid=(?) ',[count,uname_1], function(error, results) {
  });
  res.redirect('/');
});
app.get('/score', function(req, res)  {
  con.query(
    'SELECT caaa,isatc,bhraaw,sm,rp,cr,ba,ho,ka,bo,dsa,dsm,dbms,smda,tdm FROM quiz WHERE uid = (?)',[uname_1], function(error, results)  {
      res.render('previous_score.ejs', {quiz: results});
      console.log(uname_1);
      console.log(results[0]);
    }
  );
});*/


