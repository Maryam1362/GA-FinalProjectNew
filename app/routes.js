module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	res.sendFile('./public/index.html');
	// 	// res.sendFile("./public/index.html");
	// });
app.get('*', function(req, res) {
		// res.sendFile('./public/index.html');
		 //res.sendFile( __dirname + "./public/" + "index.html" );
		 res.sendFile('index.html', { root: 'public'});
	});

};