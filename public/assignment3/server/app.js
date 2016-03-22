module.exports = function(app, db) {
    var formModel = require("./../../assignment3/server/models/form.model.js")(db);
    var userModel = require("./../../assignment3/server/models/user.model.js")(db);

    require("./services/field.service.server.js")(app, formModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/user.service.server.js")(app, userModel);
};