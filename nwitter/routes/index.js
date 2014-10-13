module.exports = function(app){
	app.get("/", function(req, res){
		var nweetModel = app.models.nweet;
		
		nweetModel.find().populate('autor').sort( [['data', 'descending']] ).limit(30).exec(function( error, nweets ){
			res.render('index', {'session': req.session, "nweets": nweets});
		});
	});
}