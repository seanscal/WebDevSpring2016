(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("FormsController", FormsController);

    function FormsController($rootScope, FormService) {
        var vm = this;

        if(!main.currentUser){
            main.$location.url('/login');
        }

        FormService.findAllFormsForUser(main.currentUser._id).then(
            function(res) {
                console.log(res.data);
                vm.forms = res.data;
            },
            function(error) {
                console.log(error);
            }
        );

        vm.currentSelection = null;

        vm.addForm = function() {
            if (vm.formTitle === undefined) return;

            var form = {
                title: vm.formTitle
            };
            FormService.createFormForUser(main.currentUser._id, form).then(
                function(res) {
                    vm.forms.push(res.data);
                    vm.formTitle = null;
                },
                function(error) {
                    console.log(error);
                }
            )
        };

        vm.updateForm = function() {
            if ( vm.formTitle === undefined) return;
            var formId = vm.forms[vm.currentSelection]._id;
            var form = {
                _id: formId,
                title: vm.formTitle,
                userId: $rootScope.currentUser._id
            };

            FormService.updateForm(formId, form).then(
                function(res) {
                    vm.forms[vm.currentSelection] = res.data;
                    vm.formTitle = null;
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        vm.deleteForm = function(idx) {
            FormService.deleteForm(vm.forms[idx]._id).then(
                function() {
                    FormService.findAllFormsForUser(main.currentUser._id).then(
                        function(res) {
                            vm.forms = res.data;
                        },
                        function(error) {
                            console.log(error);
                        }
                    );
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        vm.selectForm = function(idx) {
            vm.currentSelection = idx;
            vm.formTitle = vm.forms[idx].title;
        };
    }
})();