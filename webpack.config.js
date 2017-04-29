const webpack = require("webpack");
const path = require('path');

const isProduction = process.argv.indexOf("-p") > -1
const isClassic = process.argv.indexOf("-d") > -1

// ----------------------------------------------------------------------------- PLUGINS

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

var plugins = [
	new webpack.DefinePlugin({ isProduction: isProduction }),
	new webpack.ProvidePlugin({
		dat: "dat",
		isMobile: "isMobile",
		THREE: "THREE",
		WAGNER: "WAGNER",
		Projector: "Projector",
	}),
	new webpack.LoaderOptionsPlugin({
		minimize: isProduction,
		debug: !isProduction
	}),
	new webpack.optimize.CommonsChunkPlugin({children: true, async: true}),
	new webpack.LoaderOptionsPlugin({
		test:/\.(glsl|vs|fs)$/,
		options:{
			glsl: { chunkPath: path.resolve(__dirname,'src/glsl/chunks') }
		}
	})
]
if(isProduction){
	plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
	plugins.push(new webpack.optimize.UglifyJsPlugin({comments:false, screwIe8: true, compress:{warnings: false}, sourceMap: false }))
	plugins.push(new OptimizeJsPlugin({sourceMap: false}))
} else {
	if(!isClassic){
		plugins.push(new webpack.HotModuleReplacementPlugin())
	}else{
		plugins.push(new BrowserSyncPlugin({
			host: 'localhost',
			port: 9000,
			server: {
				baseDir: ['build','static']
			}
	  }, { reload: true } ) )
	}
}

// ----------------------------------------------------------------------------- CONFIG

const babelLoaderQuery = {
	presets: [ ["es2015", { loose:true, modules:false } ], ['stage-0']],
	cacheDirectory: true,
	retainLines: true
}
if( isProduction ) {
	babelLoaderQuery.plugins = ['transform-runtime']
}

module.exports = {
	devtool: isProduction ? false : 'source-map',
	entry: ['babel-polyfill',__dirname+"/src/js/Main"],
	output: {
		path: __dirname +'/build/bin/',
		filename: "main.js",
		publicPath: isProduction?'./bin/':'/bin/'
	},
	module: {
		loaders: [
			{ test: /\.json$/, exclude:[/node_modules|vendors/], loader: 'json-loader' },
			{ test: /\.(glsl|vs|fs)$/, exclude:[/node_modules|vendors/], loader: 'shader-loader' },
			{ test: /\.jsx?$/, exclude:[/node_modules|vendors/], loader:'babel-loader', query: babelLoaderQuery },
		],
	},
	resolve: {
		extensions: ['.json','.js','.glsl','.vs','.fs'],
		modules: [
			path.resolve(__dirname,'src/js'),
			path.resolve(__dirname,'src/glsl'),
			path.resolve(__dirname,'node_modules'),
			path.resolve(__dirname,'static/vendors'),
		],
		alias: {
			dat: 		__dirname+'/static/vendors/'+"dat.gui.js",
			isMobile: 	__dirname+'/static/vendors/'+"isMobile.js",
			THREE: 		__dirname+'/static/vendors/'+"three.js",
			WAGNER: 	__dirname+'/static/vendors/'+"Wagner.js",
			Projector: 	__dirname+'/static/vendors/'+"Projector.js"
		}
	},
	devServer: {
		open: true,
		compress: false,
		contentBase: ['./static','./build'],
		port: 9000,
		hot: true,
		inline: true,
		progress: true,
		historyApiFallback: true,
		noInfo: false,
		stats: { colors: true }
	},
	plugins:plugins
};
