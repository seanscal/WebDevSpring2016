module.exports = function(app, db) {
    var formModel = require("./models/form.model.js")(db);
    var userModel = require("./models/user.model.js")(db);

    require("./services/field.service.server.js")(app, formModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/user.service.server.js")(app, userModel);
};