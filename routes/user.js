
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.agree =function(req,res) {
	res.render('users/agree',{title:"Edit Customers - Node.js"});
};

exports.add =function(req,res) {
	res.render('users/add',{title:"Edit Customers - Node.js"});	
};


exports.login =function(req,res) {
	res.render('users/login',{title:"Edit Customers - Node.js"});
};

exports.login_s =function(req,res) {
	  req.getConnection(function(err,connection){	    
		     connection.query('SELECT * FROM users',function(err,rows)     {
		        if(err)
		           console.log("Error Selecting : %s ",err );
		     
		    	res.redirect('/');	
		     });
	  });
	
	req.session.user_id = 1;

};

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
};