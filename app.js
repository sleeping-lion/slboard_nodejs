
/**
 * Module dependencies.
 */

var express = require('express')
	, session = require('express-session')
	, engine = require('ejs-locals')
  , routes = require('./routes')
  , i18n = require('i18n-abide')
  , connection  = require('express-myconnection')
  , mysql = require('mysql')
  , user = require('./routes/user')
  , notice = require('./routes/notice')
  , question = require('./routes/question')
  , faq = require('./routes/faq')
  , portfolio = require('./routes/portfolio')
  , gallery = require('./routes/gallery')
  , contact = require('./routes/contact')
  , guest_book = require('./routes/guest_book')
  , blog = require('./routes/blog')  
  , http = require('http')
  , path = require('path');

var app = express();
app.engine('ejs', engine);

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(i18n.abide({
	  supported_languages: ['ko'],
	  default_lang: "ko",
	  translation_type: "json",	  
	  translation_directory: "static/i18n",
	  locale_on_url: true
	}));
app.use(
	    connection(mysql,{
	        host: 'localhost',
	        user: 'toughjjh',
	        password : 'jjh7479',
	        port : 3306, //port mysql
	        database:'slboard_development'
	    },'request')
	);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(session({
	  secret: 'keyboard cat',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: false }
}));
	

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
  });

	
// development only
if (app.get('env') == 'development') {
  app.use(express.errorHandler());
}

if (app.get('env') == 'production') {
	 app.set('trust proxy', 1) // trust first proxy
	  sess.cookie.secure = true // serve secure cookies
}

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));





app.get('/', routes.index);
app.get('/users', user.list);
app.get('/users/agree', user.agree);
app.get('/users/add', user.add);

app.get('/notices', notice.list);
app.get('/notices/add', notice.add);
app.post('/notices/add', notice.save);//route delete customer
app.get('/notices/delete/:id', notice.delete_notice);//edit customer route , get n post
app.get('/notices/edit/:id', notice.edit); 
app.post('/notices/edit/:id',notice.save_edit);

app.get('/questions', question.list);
app.get('/faqs', faq.list);
app.get('/portfolios', portfolio.list);
app.get('/galleries', gallery.list);


app.get('/guest_books', guest_book.list);
app.get('/guest_books/add', guest_book.add);
app.post('/guest_books/add', guest_book.save);//route delete customer
app.get('/guest_books/delete/:id', guest_book.delete_notice);//edit customer route , get n post
app.get('/guest_books/edit/:id', guest_book.edit); 
app.post('/guest_books/edit/:id',guest_book.save_edit);

app.get('/contacts', contact.list);
app.get('/contacts/add', contact.add);
app.post('/contacts/add', contact.save);//route delete customer
app.get('/contacts/delete/:id', contact.delete_contact);//edit customer route , get n post
app.get('/contacts/edit/:id', contact.edit); 
app.post('/contacts/edit/:id',contact.save_edit);

app.get('/blogs', blog.list);
app.get('/blogs/add', blog.add);
app.post('/blogs/add', blog.save);//route delete customer
app.get('/blogs/delete/:id', blog.delete_blog);//edit customer route , get n post
app.get('/blogs/edit/:id', blog.edit); 
app.post('/blogs/edit/:id',blog.save_edit);

app.get('/login',user.login);
app.post('/login',user.login_s);
app.get('/logout', user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
