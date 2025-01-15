const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: "public_BQQKfrVAJZoFLkghsC5imOeZ0KE=", 
    privateKey: "private_NnV9XerSZ5WDc6XfY6YPhjMR01o=", 
    urlEndpoint: "https://ik.imagekit.io/6rzxxthsxp", 
});

module.exports = imagekit;
