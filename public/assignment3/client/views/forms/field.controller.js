(function () {
    'use strict';

    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope, $scope, $routeParams, FieldService) {

        $scope.fields = [];
        $scope.title = "";
        $scope.model = {
            _id: "",
            label: "",
            placeholder: "",
            fieldType: "",
            options: "",
            addOrEdit: "add"
        };

        $scope.field = {
            type: "",
            label: "",
            options: [],
            placeholder: ""
        };

        if (!$rootScope.currentUser) {
            $rootScope.$location.url('/login')
        }

        $scope.addField = addField;
        $scope.updateField = updateField;
        $scope.deleteField = deleteField;
        $scope.selectField = selectField;
        $scope.displayForms = displayForms;
        $scope.cancel = cancel;
        $scope.edit = edit;

        function getAllFields(formId) {
            FieldService.getFieldsForForm(formId).then(function (res) {
                $scope.fields = res;
            });
        }

        getAllFields($routeParams.formId);

        function addField(fieldType) {
            $scope.field.type = fieldType;
            if ($scope.field.type == "DATE") {
                $scope.field.placeholder = "DD/MM/YYYY"
            }

            if ($scope.field.options != "" || $scope.field.options != null) {
                $scope.field.options = parseData($scope.field.options);
            }
            var newField = $scope.field;
            FieldService.createFieldForForm($routeParams.formId, newField).then(function (res) {
                cancel();
                $scope.fields= res;
            });
        }

        function updateField(fieldId, field) {
            if (field.options){
                field.options = parseData(field.options);
            }
            console.log(field.options);
            console.log(field)

            FieldService.updateField($routeParams.formId, fieldId, field).then(function (res) {
                cancel();
                getAllFields($routeParams.formId);
            });
        }

        function deleteField(id) {
            FieldService.deleteFieldFromForm($routeParams.formId, id).then(function (res) {
                $scope.selectedField = null;
                $scope.fieldTitle = null;
                getAllFields($routeParams.formId);
            });
        }

        function selectField(id) {
            FieldService.getFieldById(id).then(function (res) {
                $scope.selectedField = res;
                $scope.fieldTitle = $scope.selectedField.title;
            });
        }

        function cancel() {
            $scope.model._id = "";
            $scope.model.label = "";
            $scope.model.placeholder = "";
            $scope.model.options = "";
            $scope.model.addOrEdit = "add";
            $scope.field = $scope.model;
        }

        function edit(field) {

            var str ="";
            if (field.options != "" || field.options!=null){
                for (var x = 0; x<field.options.length; x++){
                    str = str + "value:" + field.options[x].value + ",label:"+field.options[x].label+"\n";
                }
            }

            $scope.model._id = field._id;
            $scope.model.fieldType = field.type;
            $scope.model.label = field.label;
            $scope.model.placeholder = field.placeholder;
            $scope.model.options = str;
            $scope.model.addOrEdit = "edit";

            $scope.field = $scope.model;
        }

        function displayForms() {
            $rootScope.$location.url('/forms');
        }

        function parseData(options){
            var newArr =[];
            var str;
            var helper = [];
            var opt = options.split("\n");
            for (var x = 0; x < opt.length; x++) {
                var vals = opt[x].split(",");
                for (var z = 0; z < vals.length; z++) {
                    var help = vals[z].split(':');
                    helper.push(help[0]);
                    helper.push(help[1]);
                }

                str = '{"';
                for (var y = 0; y < helper.length; y++) {
                    if (y + 1 == helper.length) {
                        str = str + helper[y] + '"}';
                    }
                    else if (y % 2 == 0) {
                        str = str + helper[y] + '":"';
                    }
                    else {
                        str = str + helper[y] + '","';
                    }
                }
                var newstr = JSON.parse(str)
                console.log(JSON.parse(str));
                newArr.push(newstr);
            }
            return newArr;
        }
    }
})();