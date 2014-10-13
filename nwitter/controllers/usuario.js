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
				}
	}

	return UsuarioController;
};