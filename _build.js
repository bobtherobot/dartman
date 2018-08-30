/*

cd /Volumes/Drives/projects/dartman/
node ./_build.js


 */


var pub = require('/Volumes/Drives/projects/_hub/publisher/index.js');

pub({

	name	: "Dartman",
    filename: "dartman.js",
    version : 2.0,
	root 	: "/Volumes/Drives/projects/dartman",
	header	: "%root%/_header.txt",
	out		: "%root%/dist",
	watch 	: false,
	env		: "prod", // prod  dev
	pwa 	: {
		description : "A simple cricket and 301 scorekeeper.",
		logo 		: "%root%/images/dartman-logo-2000.jpg",
		uuid 		: "com.gieson.dartman",
		htmlTarget  : "index.html"
		// optional values
		// --------------------
		// location 	: "us",
		// lang 		: "en",
		// short_name 	: "",	// (optional) uses shortend one-word build name
		// orientation : "any",  // any, natural,landscape, portrait, portrait-primary, portrait-secondary, landscape-primary, landscape-secondary
		// background_color : "black",
		// theme_color : "black",
		// screenshots : "",
		// categories 	: "",
	},
	
	buildWithSrc 	: false,
	closeWhenDone 	: false,
	makeDocs 		: true,
	skipArchive 	: false,
	sourceMap		: true,

	// All below can be array or string

	exts	: ["js"],
	
	copyZipTo : [],
	
	srcPrepend 	: [
					"%root%/src/navigo.min.js"
				],
	srcAppend 	: [
					"%root%/src/fastclick.js"
				],
	
	src			: [
					"%root%/src/storeset.js",
					"%root%/src/301.js",
					"%root%/src/cricket.js",
					"%root%/src/app.js"
				],
				
	css 		: [
					"%root%/css/301.css",
					"%root%/css/cricket.css",
					"%root%/css/app.css",
				],

	include		: [
					"%root%/fonts/dartman > fonts",
					"%root%/media",
					//"%root%/images/beer-1.png > images",
					//"%root%/images/beer-2.png > images",
					//"%root%/images/beer-3.png > images",
					//"%root%/images/beer-4.png > images",
					"%root%/index.html",
					//"%root%/301.html",
					//"%root%/cricket.html"
				],
	copyBuildTo : [
					'/Volumes/Drives/web/www.gieson.com/Library/projects/dartman/new'
				]
	
});


