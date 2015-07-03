
/*
 * GET home page.
 */

exports.list = function(req, res){
	  req.getConnection(function(err,connection){	    
		     connection.query('SELECT * FROM faqs',function(err,rows)     {
		        if(err)
		           console.log("Error Selecting : %s ",err );
		     
		       res.render('faqs/index',{title:"Customers - Node.js",data:rows});
		     });
	  });
};
exports.add = function(req, res){}
exports.save = function(req, res){}
exports.edit = function(req, res){
    
	  var id = req.params.id;
	    
	  req.getConnection(function(err,connection){
	       
	     connection.query('SELECT * FROM faqs WHERE id = ?',[id],function(err,rows)
	        {
	            
	            if(err)
	                console.log("Error Selecting : %s ",err );
	     
	            res.render('faqs/edit',{page_title:"Edit Customers - Node.js",data:rows});
	                           
	         });
	                 
	    }); 
	};
exports.save_edit = function(req, res){}

exports.delete_notice = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM faqs  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/faqs/index');
             
        });
        
     });
};