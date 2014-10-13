module.exports = function(app){
	var UsuarioController = {

		login: function(req, res){
			res.render('usuario/login');
		},

		loginAction: function(req, res){
		req.assert(['usuario', 'nickname'], 'Insira um apelido').notEmpty();
	    	req.assert(['usuario', 'senha'], 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);

	    	var errors = req.validationErrors();

	        if(!errors){
	        	var usuarioModel = app.models.usuario;
	        	var query = {nickname: req.body.usuario.nickname, senha: req.body.usuario.senha};

	        	usuarioModel.findOne(query).select('nome email nickname').exec(function(error, usuario){
	        		if(usuario){
	        			req.session.usuario = usuario;
		    			res.redirect('/');
	        		}else{
	        			res.render('usuario/login', {'errors': [{'msg': 'Nickname ou Senha inválida'}]})
	        		}
	        	});
		    }else{
		    	res.render('usuario/login', {'errors': errors});
		    }
	    },

	    logout: function(req, res){
			if(typeof(req.session.usuario) != "undefined"){
				req.session.destroy();
				res.redirect("/");
			}
		},

	    cadastro: function(req, res){
	    	res.render("usuario/cadastro");
	    },

	    cadastroAction: function(req, res){

	    	req.assert(['usuario', 'nome'], 'Insira seu nome completo').notEmpty();
	    	req.assert(['usuario', 'nickname'], 'Insira um apelido').notEmpty();
	    	req.assert(['usuario', 'email'], 'Insira uma conta de e-mail válida').len(10, 50).isEmail();
	    	req.assert(['usuario', 'senha'], 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);
	    	req.assert(['usuario', 'conf_senha'], 'Confira sua senha').len(6,20);
	    	req.assert(['usuario', 'conf_senha'], 'As senhas não são compatíveis').equals(req.body.usuario.senha);

	    	var errors = req.validationErrors();

	    	if(errors){
	    		res.render("usuario/cadastro", {'errors': errors});
	    	}else{
	    		var usuarioModel = app.models.usuario;
	    		usuarioModel.create(req.body.usuario, function(error, usuario){
	    			if(error){
	    				res.render("usuario/cadastro", {'errors': [{'msg': error.err}]});
	    			}else{
	    				res.redirect("/usuario/login");
	    			}
	    		});
	    	}
		}
	}

	return UsuarioController;
};