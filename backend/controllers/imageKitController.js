const imagekit = require("../middlewares/imagekit");

exports.getAuthenticationDetails = (req, res) => {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
  } catch (error) {
    console.error("Error generating authentication details:", error);
    res.status(500).json({ error: "Failed to generate authentication details" });
  }
};
