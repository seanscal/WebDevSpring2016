(function () {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("FieldController", FieldController);

    function FieldController($rootScope, $routeParams, FieldService) {
        var vm = this;

        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login');
        }

        vm.formId = $routeParams.formId;
        vm.fieldType = "TEXT";
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
            FieldService.getFieldsForForm(vm.formId).then(
                function (res) {
                    vm.fields = res.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        vm.addField = function (fieldType) {
            var field = {};
            field.type = fieldType;

            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                field.label = "New Text Field";
                field.placeholder = "New Field";
            } else if (fieldType === "DATE") {
                field.label = "New Date Field";
                field.placeholder = "MM/DD/YYYY";
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

            FieldService.createFieldForForm(vm.formId, field).then(
                function (res) {
                    vm.fields = res.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        vm.removeField = function (idx) {
            var field = vm.fields[idx];
            FieldService.deleteFieldFromForm(vm.formId, field._id).then(
                function (res) {
                    refreshFields();
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        vm.createModal = function (fieldType, idx) {
            var field = vm.fields[idx];
            var options = vm.fields[idx].options;
            console.log(field);
            console.log(options);
            // set popups values to fields currently set value
            var str = fieldType + "label";
            vm[fieldType + "label"] = field.label;

            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                vm[fieldType + "placeholder"] = field.placeholder;
            } else if (fieldType !== "DATE") {
                var optionsString="";

                for (var x = 0; x <options.length; x++) {
                    optionsString += (options[x].label + ":" + options[x].value + "\n");
                }
                vm[fieldType + "options"] = optionsString;
                console.log(vm[fieldType + "options"]);
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
        }

        function updateField(fieldType, idx) {
            var field = vm.fields[idx];
            field.label = vm[fieldType + "label"];

            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                field.placeholder = vm[fieldType + "placeholder"];
            } else if (fieldType !== "DATE") {
                var optionsString = vm[fieldType + "options"];
                var options = optionsString.split("\n");
                field.options = parseData(options);
            }

            FieldService.updateField(vm.formId, field._id, field);
        }
        function updateAllFields(order) {
            var newFields = [];
            for (var i in order) {
                newFields.push(vm.fields[order[i]]);
            }

            FieldService.updateAllFields(vm.formId, newFields).then(
                function (res) {
                    vm.fields = res.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        }
        function parseData(options) {
            var newArr = [];
            var str;
            for (var x = 0; x < options.length; x++) {
                var helper = options[x].split(':');
                if (helper[1] && helper[0]) {
                    newArr.push(JSON.parse('{"value":"' + helper[1] + '","label":"' + helper[0] + '"}'));
                }
            }
            return newArr;
        }
    }
})();