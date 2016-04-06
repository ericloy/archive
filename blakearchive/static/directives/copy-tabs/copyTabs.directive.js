/**
 * Created by lukeluke on 1/21/16.
 */
(function () {

    var controller = function ($scope, $localStorage, BlakeDataService,$routeParams) {

        var vm = this;

        vm.showTab = function (id) {
            vm.selectedTab = id;
        }

        vm.getHeader = function(){
            if(angular.isDefined(vm.copy)){
                if(vm.copy.virtual == true){
                    if(angular.isDefined(vm.work)){
                        return vm.work.title;
                    }
                } else {
                    return vm.copy.header.filedesc.titlestmt.title.main['#text'];
                }
            }
        }
        vm.getOicSubheader = function(){
            if(angular.isDefined(vm.copy)){
                if(vm.copy.virtual == true){
                    return '';
                } else {
                    var copyPhrase = vm.copy.archive_copy_id == null ? '' : 'Copy '+vm.copy.archive_copy_id+', ';
                    var printDate = angular.isDefined(vm.copy.source.objinfo.printdate) ? vm.copy.source.objinfo.printdate['#text'] + ' ' : '';
                    var instPhrase = vm.copy.institutuion == null ? '' : '('+vm.copy.institution+')';
                    return copyPhrase+printDate+instPhrase;
                }
            }
        }

        vm.getCopyOrGroup = function(){
            if(angular.isDefined(vm.copy)){
                if(vm.copy.virtual){
                    return 'Group';
                } else {
                    return 'Copy';
                }
            }
        }

        $scope.$on('copyCtrl::objectChanged',function(){
            vm.selectedTab = angular.isDefined($routeParams.tab) ? '#'+$routeParams.tab : '#objects-in-copy';
            vm.selectedTab = '#objects-in-copy';
        });

    }

    controller.$inject = ['$scope','$localStorage', 'BlakeDataService','$routeParams'];

    var copyTabs = function() {
        return {
            restrict: 'EA',
            templateUrl: "/blake/static/directives/copy-tabs/copyTabs.html",
            controller: controller,
            controllerAs: 'tabs',
            scope: {
                copy: '=copy',
                work: '=work',
                changeObject: '&',
                resetView: '&',
                resetCompare: '&'
            },
            /*link:function(scope,elem,attr){
                scope.changeObject({object: object});
            },*/
            bindToController: true
        }
    }

    angular.module('blake').directive('copyTabs', copyTabs);

}());