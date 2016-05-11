/**
 * Slidebox Directive
 *
 * version 0.9
 * http://github.com/keithjgrant/slidebox
 *
 * by Keith J Grant
 * http://elucidblue.com
 */

(function(){

    var controller = function($scope,$element,$attrs,$timeout){

        var vm = this;

        vm.scrollBarWidths = 40;
        vm.viewport = $element.children('.slide-box-viewport');
        vm.wrapper = vm.viewport.children('.slide-box-wrapper');
        vm.items = vm.wrapper.children();
        vm.scrollerLeft = false;
        vm.scrollerRight = false;
        vm.leftOffset = 0;
        vm.scrollBy = 660;
        vm.windowWidth = 0;


        var widthOfList = function(){
            var itemsWidth = 0;
            angular.forEach(vm.items,function(child){
                var itemWidth = angular.element(child).outerWidth();
                itemsWidth+=itemWidth;
            })
            return itemsWidth;
        };

        var widthOfHidden = function(){
            vm.viewport = $element.children('.slide-box-viewport');
            return ((vm.viewport.outerWidth())-widthOfList()-vm.leftOffset)-vm.scrollBarWidths;
        };

        var reAdjust = function(){
            if (widthOfHidden() > 0) {
                vm.scrollerRight = false;
            }
            else {
                vm.scrollerRight = true;
            }

            if (vm.leftOffset<0) {
                vm.scrollerLeft = true;
            } else {
                //$('.item').animate({left:"-="+getLeftPosi()+"px"},'slow');
                vm.scrollerLeft = false;
            }
        }

        $scope.$on('resize::resize', function (e, w) {
            vm.windowWidth = w.width;
            reAdjust();
        });

        $scope.$on('searchCtrl::newSearch', function (e, w) {
            $timeout(function() {
                reAdjust();
            }, 0);
        });

        vm.scrollRight = function(){
            var newOffset = vm.leftOffset - vm.scrollBy;
            var maxOffset = vm.viewport.outerWidth() - widthOfList() - (vm.scrollBarWidths * 2);
            if(newOffset < maxOffset){
                vm.leftOffset = maxOffset;
            } else {
                vm.leftOffset = newOffset;
            }
            reAdjust();
        }

        vm.scrollLeft = function(){
            var newOffset = vm.leftOffset + vm.scrollBy;
            if(newOffset > 0){
                vm.leftOffset = 0;
            } else {
                vm.leftOffset = newOffset;
            }
            reAdjust();
        }

        vm.scrollToResult = function(objectIndex){
            vm.leftOffset = objectIndex * -220;
            /*console.log(vm.leftOffset);
            console.log(objectIndex * 220);
            console.log(vm.windowWidth);
            var newOffset = (objectIndex * 220);
            if(newOffset > (vm.windowWidth - 220)){
                vm.leftOffset = newOffset * -1;
            }
            if((newOffset * -1) > vm.leftOffset){
                newOffset = (newOffset - 660) * -1;
                newOffset = newOffset > 0 ? 0 : newOffset;
                vm.leftOffset = newOffset;
            }*/
            reAdjust();
        }

    }

    var link = function (scope, element, attrs) {

    }

    var slideBox = function(){
            return {
                //replace: true,
                transclude: true,
                restrict: 'AE',
                scope: false,
                controller: controller,
                controllerAs: 'slideBox',
                bindToController: true,
                templateUrl: '/blake/static/directives/slide-box/slideBox.html',
                link: link
            }
    }

    angular.module('blake').directive("slideBox", slideBox);

}());