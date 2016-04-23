module.exports = function(app, db, mongoose) {
    var formModel = require("./../../assignment5/server/models/form.model.js")(mongoose, db);
    var fieldModel = require("./../../assignment5/server/models/field.model.js")(mongoose, db, formModel);
    var userModel = require("./../../assignment5/server/models/user.model.js")(mongoose, db);

    require("./services/field.service.server.js")(app, formModel, fieldModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/user.service.server.js")(app, userModel);
};