module.exports = function(app, db, mongoose) {
    var formModel = require("./../../assignment4/server/models/form.model.js")(mongoose, db);
    var fieldModel = require("./../../assignment4/server/models/field.model.js")(mongoose, db, formModel);
    var userModel = require("./../../assignment4/server/models/user.model.js")(mongoose, db);

    require("./services/field.service.server.js")(app, formModel, fieldModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/user.service.server.js")(app, userModel);
};