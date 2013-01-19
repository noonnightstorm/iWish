
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get("/register",routes.register);
app.get("/login",routes.login);
app.post("/insertUser",routes.insertUser);
/*app.get('/users', user.list);*/
app.get("/pro_list",routes.projectList);
app.get("/Mypro_list",routes.myProjectList);
app.get("/create_pro",routes.createProject);
app.post("/insert_pro",routes.insertsProject);
app.get("/wish_tree/:project_id",routes.wishTree);
app.get("/update_wish_list/:project_id",routes.updateWishList);
app.post("/add_comment/:project_id",routes.insertComment);
app.get("/detele_comment/:project_id",routes.deteleComment);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
