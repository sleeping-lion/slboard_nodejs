
/*
 * GET home page.
 */

exports.list = function(req, res){
	  req.getConnection(function(err,connection){	    
		     connection.query('SELECT * FROM contacts',function(err,rows)     {
		        if(err)
		           console.log("Error Selecting : %s ",err );

		       res.render('contacts/index',{title:"Customers - Node.js",data:row});
		     });
	  });
};

exports.add = function(req, res){
    res.render('contacts/add',{title:"Customers"});
}

exports.save = function(req, res){
	
}
exports.edit = function(req, res){
    
	  var id = req.params.id;
	    
	  req.getConnection(function(err,connection){
	       
	     connection.query('SELECT * FROM guest_books WHERE id = ?',[id],function(err,rows)
	        {
	            
	            if(err)
	                console.log("Error Selecting : %s ",err );
	     
	            res.render('contacts/edit',{page_title:"Edit Customers - Node.js",data:rows});
	                           
	         });
	                 
	    }); 
	};

exports.save_edit = function(req, res){}

exports.delete_contact = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM guest_books  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/guest_books/index');
             
        });
        
     });
};