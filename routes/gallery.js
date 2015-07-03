
/*
 * GET home page.
 */

exports.list = function(req, res){
  res.render('galleries/index', { title: 'Express' });
};