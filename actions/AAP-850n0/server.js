async function(properties, context) {
    const fetch = require("node-fetch");
    const sharp = require("sharp");
    const bufferToDataUrl = require("buffer-to-data-url");
    
    const resizeOptions = {
        width: await properties.width,
        height: await properties.height,
        fit: await properties.preserveAspectRatio ? 'outside' : 'cover'
    };
    
    return {
    	"resizedImage": bufferToDataUrl.default("image/jpeg", (await fetch('https:' + await properties.imageToResize)
            	    .then(response => response.arrayBuffer())
                    .then(input => sharp(input, { failOnError: false })
                        .resize(resizeOptions)
                        .toFormat('jpg')
                        .toBuffer()
					)                                         
    	))
    };
}