(function () {
    'use strict';

    angular.module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, $scope, FormService, FieldService) {

        if (!$rootScope.currentUser) {
            $rootScope.$location.url('/login')
        }

        $scope.forms = FormService.forms;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.displayFields = displayFields;

        function getAllForms(userId) {
            FormService.findAllFormsForUser(userId).then(function (res) {
                $scope.forms = res;
            });
        }

        getAllForms($rootScope.currentUser._id);

        function addForm() {
            FormService.createFormForUser($rootScope.currentUser._id, {title: $scope.formTitle}).then(function (res) {
                $scope.formTitle = null;
                getAllForms($rootScope.currentUser._id);
            });
        }

        function updateForm() {
            $scope.selectedForm.title = $scope.formTitle;

            FormService.updateFormById($scope.selectedForm._id, $scope.selectedForm).then(function (res) {
                $scope.selectedForm = null;
                $scope.formTitle = null;
                getAllForms($rootScope.currentUser._id);
            });
        }

        function deleteForm(id) {
            FormService.deleteFormById(id).then(function (res) {
                $scope.selectedForm = null;
                $scope.formTitle = null;
                getAllForms($rootScope.currentUser._id);
            });
        }

        function selectForm(id) {
            FormService.getFormById(id).then(function (res) {
                $scope.selectedForm = res;
                $scope.formTitle = $scope.selectedForm.title;
            });
        }

        function displayFields(id) {
            $rootScope.fields = true;
            $rootScope.$location.url('/form/' + id + '/fields');
        }
    }
})();