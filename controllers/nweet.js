module.exports = function(app){
	var NweetController = {

		submit: function(req,res){

			req.assert(['nweet', 'texto'], 'Insira o conteúdo do seu nweet').len(1,140);

			var errors = req.validationErrors();

			if(errors || typeof(req.session.usuario) == "undefined"){
	    		res.render("index", {'errors': errors});
	    	}else{
	    		var nweetModel = app.models.nweet;

	    		req.body.nweet.autor = req.session.usuario._id;

	    		nweetModel.create(req.body.nweet, function(error, nweet){
	    			console.log(error);
	    			res.redirect("/");
	    		});
	    	}
		}
	}

	return NweetController;
};