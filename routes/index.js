module.exports = function(app){
	app.get("/", isLoggedIn, function(req, res){
		var nweetModel = app.models.nweet;
		
		nweetModel.find().populate('autor').sort( [['data', 'descending']] ).limit(30).exec(function( error, nweets ){
			res.render('index', {'session': req.session, "nweets": nweets});
		});
	});
}


var isLoggedIn = function(req, res, next){
	if(typeof(req.session.usuario) == "undefined"){
		res.redirect("/usuario/login");	
	}
	next();
}