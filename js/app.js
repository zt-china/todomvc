(function (angular) {
  'use strict';

  angular
    .module('todoApp', ['ngRoute', 'todoApp.service'])
    .config(['$routeProvider', function($routeProvider){
      $routeProvider.when('/:status?', {
        templateUrl: './views/app.html',
        controller: 'TodoController'
      })
      .otherwise({
        redirectTo: '/'
      });
    }])
    .controller('TodoController', ['$scope', '$location', '$routeParams', 'TodoService', TodoController]);

  function TodoController($scope, $location, $routeParams, TodoService) {
    var vm = $scope;
    
    // 展示任务列表
    vm.todoList = TodoService.getData();

    // 添加任务
    vm.taskName = '';
    vm.add = function () {
      // 判断如果添加任务输入框为空,则不进行添加
      if (vm.taskName.trim() === '') {
        return;
      }
      // 调用方法添加任务
      TodoService.addData(vm.taskName);
      // 清空输入框
      vm.taskName = '';
    };

    // 删除任务
    vm.del = TodoService.del;

    // 切换全选
    vm.isCheckAll = false;
    vm.checkAll = function(){
      TodoService.checkAll(vm.isCheckAll);
    };

    // 单个任务切换
    vm.saveSingleCbx = function() {
			TodoService.save();
		};

    // 编辑
    vm.editId = -1;
    vm.edit = function(id){
      vm.editId = id;
    };

    // 更新
    vm.update = function(){
      vm.editId = -1;
      // 修改数据,保存到localstorage中
      TodoService.save();
    };

    // 清除已完成任务
    vm.clearCompleted = TodoService.clearCompleted;

    // 清除任务按钮的显示隐藏
    vm.isShow = TodoService.isShow;

    // 显示未完成任务数
    vm.getUnCompletedCount = TodoService.getUnCompletedCount;

    // 显示不同状态的任务
    // 过滤器filter
    vm.status = undefined;
    // vm.showAll = function(){
    //   vm.status = undefined;
    // }
    // vm.showActive = function(){
    //   vm.status = false;
    // }
    // vm.showCompleted = function(){
    //   vm.status = true;
    // };

    // 根据URL变化显示相应任务
    // 通过$location.url()方法来获取hash值,通过hash值设置status的状态
    // vm.location = $location;
    // vm.$watch('location.url()',function(curVal){
    //   switch(curVal){
    //     case '/active':
    //       vm.status = false;
    //       break;
    //     case '/completed':
    //       vm.status = true;
    //       break;
    //     default:
    //       vm.status = undefined;
    //       break;
    //   }
    // });
    var routeObj = {
      active: false,
      completed: true
    };
    vm.status = routeObj[$routeParams.status];

  }

})(angular);
