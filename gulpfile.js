// Desabilita as notificações
process.env.DISABLE_NOTIFIER = true;

var elixir = require('laravel-elixir');

// Configuração
elixir.config.sourcemaps                      = false;
elixir.config.css.autoprefix.options.browsers = ['> 1%', 'last 2 versions', 'ff >= 25', 'Opera >= 25', 'ie >= 9', 'iOS >= 7', 'Android >= 2.3'];
elixir.config.batchOptions.timeout            = 100;

// Como não estamos usando laravel, definimos onde está os "assets"
//elixir.config.assetsPath = 'assets'; // Laravel usa: resources/assets

var front_path = {
	css  : './dist/css/',
	js   : './dist/js/',
	img  : './dist/img/',
	fonts: './dist/fonts/'
};

var assets = {
	fonts	: './src/fonts',
	img		: './src/img',
	js		: './src/js',
	sass	: './src/sass'
};

elixir(function(mix)
{
	/* ================================
	 Frontend
	 ================================== */
	mix
		.sass([
			assets.sass + '/main.scss'
		], front_path.css + 'weather.min.css')

		.scripts([
			assets.js + "/fptempo.js"
		], front_path.js + "fptempo.min.js")

		.copy(assets.js + "/jquery.js", front_path.js)
		.copy(assets.fonts, front_path.fonts)

});
