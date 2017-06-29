(function (angular) {

  // 创建服务模块,用于处理任务列表里所有数据的操作
  angular
    .module('todoApp.service', [])
    .service('TodoService', ['$window', TodoService]);

  function TodoService($window) {
    var todoList;
    var that = this;

    // 通过服务获取到 localStorage
    var storage = $window.localStorage;
    todoList = JSON.parse(storage.getItem('todo')) || [];

    // 保存数据的方法
    this.save = function () {
      storage.setItem('todo', JSON.stringify(todoList));
    };

    // 暴露获取数据的方法
    this.getData = function(){
      return todoList;
    };

    // 暴露添加数据的方法
    this.addData = function (taskName) {
      var id;
      if (todoList.length === 0) {
        // 如果数组中没有数据，id为1
        id = 1;
      } else {
        // 获取到数组最后一项的id，再加1
        id = todoList[todoList.length - 1].id + 1;
      }
      todoList.push({ id: id, name: taskName, isCompleted: false });

      // 调用保存数据的方法
      this.save();
    };

    // 暴露删除数据的方法
    this.del = function (id){
      for(var i = 0;i<todoList.length;i++){
        if(todoList[i].id === id){
          todoList.splice(i,1);
          break;
        }
      }
      that.save();
    };

    // 切换全选
    this.checkAll = function(isCheckAll){
      todoList.forEach(function(item){
        item.isCompleted = isCheckAll;
      })
      that.save();
    };

    // 清除任务
    this.clearCompleted = function(){
      var tempArr = [];
      for(var i=0;i<todoList.length;i++){
        var todo = todoList[i];
        // 将未完成的项写入新数组
        if(!todo.isCompleted){
          tempArr.push(todo);
        }
      }
      // 若直接将新数组赋值给vm.todoList会修改它的指向
      // 修改后todoList和vm.todoList就不是同一个数组,再执行添加任务操作会失效
      // 将原数组清空,再借用push写入新数组,此法不会改变指向
      todoList.length = 0;
      [].push.apply(todoList,tempArr);
      that.save();
    };

    // 清除任务按钮的显示隐藏
    this.isShow = function(){
      return todoList.some(function(todo){
        // 遍历,若有已完成项,则返回true
        if(todo.isCompleted){
          return true;
        }
      })
    };

    // 显示未完成任务数
    this.getUnCompletedCount = function(){
      var count = 0;
      todoList.forEach(function(todo){
        // 每有一项未完成,计数+1
        todo.isCompleted ? 1 :count++;
      });
      return count;
    };


  }

})(angular)