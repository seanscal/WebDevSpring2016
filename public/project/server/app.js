module.exports = function(app, db) {
    var rosterModel = require("./models/roster.model.js")(db);
    var userModel = require("./models/user.model.js")(db);

    require("./services/roster.service.server.js")(app, rosterModel);
    require("./services/user.service.server.js")(app, userModel);
};