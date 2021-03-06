var app = angular.module('sdk');

app.service('mainService', function($http, $q){

  this.getBirds = function(order, status){
    var category = status ? 'IUCNRedListCategory2014=' + status : '';
    var theOrder = order ? 'order=' + order : '';
    var and = status && order ? '&' : '';
    var url = 'http://bird-api.com/api/birds?' + theOrder + and + category
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: url
    }).then(function(res){
      dfd.resolve(res.data);
    }, function(err){
      dfd.reject(err);
    });
    return dfd.promise;
  };

  this.mySDK = function(order, status, cb){
    var category = status ? 'IUCNRedListCategory2014=' + status : '';
    var theOrder = order ? 'order=' + order : '';
    var and = status && order ? '&' : '';
    var url = 'http://bird-api.com/api/birds?' + theOrder + and + category
    $http({
      method: 'GET',
      url: url
    }).then(function(res){
      cb(null, res.data);
    }, function(err){
      cb(err, null);
    });
  };

  this.editBird = function(bird){
    var dfd = $q.defer();
    $http({
      method: 'PUT',
      url: 'http://bird-api.com/api/birds/' + bird._id,
      data: bird
    }).then(function(res){
      dfd.resolve(res.data);
    }, function(err){
      dfd.reject(err);
    });
    return dfd.promise;
  };

  this.deleteBird = function(id){
    console.log(id);
    return $http({
      method: 'DELETE',
      url: 'http://bird-api.com/api/birds/' + id
    });
  };

  this.createBird = function(bird){
    return $http({
      method: 'POST',
      url: 'http://bird-api.com/api/birds',
      data: bird
    })
  }

});
