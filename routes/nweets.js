module.exports = function(app){
	var nweet = app.controllers.nweet;
	app.post("/nweet/submit", nweet.submit);
}