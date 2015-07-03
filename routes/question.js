
/*
 * GET home page.
 */

exports.list = function(req, res){
  res.render('questions/index', { title: 'Express' });
};