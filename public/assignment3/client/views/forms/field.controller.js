(function () {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("FieldController", FieldController);

    function FieldController($rootScope, $scope, $routeParams, FieldService) {
        //if(!$rootScope.currentUser){
        //    $scope.$location.url('/login');
        //}

        $scope.formId = $routeParams.formId;
        $scope.fieldType = "TEXT";
        refreshFields();
        jQuery("#sortable").sortable({
            handle: ".handle",
            update: function (event, ui) {
                var idsInOrder = [];
                jQuery("#sortable .form-group").each(function () {
                    var id = $(this).attr("id");
                    if (id) {
                        idsInOrder.push(parseInt(id));
                    }
                });
                updateAllFields(idsInOrder);
            }
        });

        function refreshFields() {
            FieldService.getFieldsForForm($scope.formId).then(
                function (res) {
                    $scope.fields = res.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        };

        $scope.addField = function (fieldType) {
            var field = {};
            field.type = fieldType;

            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                field.label = "New Text Field";
                field.placeholder = "New Field";
            } else if (fieldType === "DATE") {
                field.label = "New Date Field";
            } else if (fieldType === "OPTIONS") {
                field.label = "New Dropdown";
                field.options = [
                    {label: "Option 1", value: "OPTION_1"},
                    {label: "Option 2", value: "OPTION_2"},
                    {label: "Option 3", value: "OPTION_3"}
                ];
            } else if (fieldType === "CHECKBOXES") {
                field.label = "New Checkboxes";
                field.options = [
                    {label: "Option A", value: "OPTION_A"},
                    {label: "Option B", value: "OPTION_B"},
                    {label: "Option C", value: "OPTION_C"}
                ];
            } else if (fieldType === "RADIOS") {
                field.label = "New Radio Buttons";
                field.options = [
                    {label: "Option X", value: "OPTION_X"},
                    {label: "Option Y", value: "OPTION_Y"},
                    {label: "Option Z", value: "OPTION_Z"}
                ];
            } else {
                return;
            }

            FieldService.createFieldForForm($scope.formId, field).then(
                function (res) {
                    $scope.fields = res.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        };

        $scope.removeField = function (idx) {
            var field = $scope.fields[idx];
            FieldService.deleteFieldFromForm($scope.formId, field._id).then(
                function (res) {
                    refreshFields();
                },
                function (error) {
                    console.log(error);
                }
            );
        };

        $scope.createModal = function (fieldType, idx) {
            var field = $scope.fields[idx]
            var options = $scope.fields[idx].options;
            // set popups values to fields currently set values
            $scope[fieldType + "label"] = field.label;
            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                $scope[fieldType + "placeholder"] = field.placeholder;
            } else if (fieldType !== "DATE") {
                var optionsString="";

                for (var x = 0; x <options.length; x++) {
                    console.log(options[x]);
                    optionsString += (options[x].label + ":" + options[x].value + "\n");
                }
                $scope[fieldType + "options"] = optionsString;
                console.log($scope[fieldType + "options"]);
            }
            jQuery("#" + fieldType + "modal").dialog({
                resizeable: false,
                height: 300,
                modal: true,
                buttons: {
                    "Cancel": function () {
                        jQuery(this).dialog("close");
                    },
                    "Ok": function () {
                        updateField(fieldType, idx);
                        jQuery(this).dialog("close");
                    }
                }
            });
        };

        function updateField(fieldType, idx) {
            var field = $scope.fields[idx];
            field.label = $scope[fieldType + "label"];

            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                field.placeholder = $scope[fieldType + "placeholder"];
            } else if (fieldType !== "DATE") {
                var optionsString = $scope[fieldType + "options"];
                console.log(optionsString);
                var options = optionsString.split("\n");
                console.log(options);
                field.options = parseData(options);
            }

            FieldService.updateField($scope.formId, field._id, field);
        };

        function updateAllFields(order) {
            var newFields = [];
            for (var i in order) {
                newFields.push($scope.fields[order[i]]);
            }

            FieldService.updateAllFields($scope.formId, newFields).then(
                function (res) {
                    $scope.fields = res.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        };
        function parseData(options) {
            var newArr = [];
            var str;
            for (var x = 0; x < options.length-1; x++) {
                var helper = options[x].split(':');

                newArr.push(JSON.parse('{"value":"' + helper[1] + '","label":"' + helper[0] + '"}'));

                console.log(JSON.parse('{"value":"' + helper[1] + '","label":"' + helper[0] + '"}'));
            }
            return newArr;
        };
    }
})();