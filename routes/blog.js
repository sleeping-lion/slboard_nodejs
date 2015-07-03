
/*
 * GET home page.
 */

exports.list = function(req, res){
	  req.getConnection(function(err,connection){	    
		     connection.query('SELECT * FROM blogs',function(err,rows)     {
		        if(err)
		           console.log("Error Selecting : %s ",err );
		     
		       res.render('blogs/index',{title:"Customers - Node.js",data:rows});
		     });
	  });
};
exports.add = function(req, res){}
exports.save = function(req, res){}
exports.edit = function(req, res){
    
	  var id = req.params.id;
	    
	  req.getConnection(function(err,connection){
	       
	     connection.query('SELECT * FROM blogs WHERE id = ?',[id],function(err,rows)
	        {
	            
	            if(err)
	                console.log("Error Selecting : %s ",err );
	     
	            res.render('blogs/edit',{title:"Edit Customers - Node.js",data:rows});
	                           
	         });
	                 
	    }); 
	};
exports.save_edit = function(req, res){}

exports.delete_blog = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM blogs  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/blogs/index');
             
        });
        
     });
};