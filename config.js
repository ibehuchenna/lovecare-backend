const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "Y5X8u0vdTCaX2zZImo3AUQ",
    APISecret: "B7vnzBlL7Gz5S03Gp2EuhlJJcCJqZgjswMWt",
  },
  production: {
    APIKey: "Y5X8u0vdTCaX2zZImo3AUQ",
    APISecret: "B7vnzBlL7Gz5S03Gp2EuhlJJcCJqZgjswMWt",
  },
};

module.exports = config[env];
