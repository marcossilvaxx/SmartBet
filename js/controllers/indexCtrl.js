app.controller("indexCtrl", function($scope, $http){
    $scope.loading = 0;
    $scope.dados = {};

    var carregarPartidas = function(c){
        $scope.loading++;
        $http.get("https://api.football-data.org/v2/competitions/"+ c +"/matches", {
            headers: {'X-Auth-Token': '4fb9f4ae0f5b414788d01798280a741d'}
        }).then(function(response){
            window.sessionStorage.setItem(c, JSON.stringify(response.data));
            $scope.dados[c] = response.data;
        }, function(erro){
            console.log(erro);
        }).finally(function(){
            $scope.loading--;
        });
    }

    $scope.carregarDados = function(c){
        var g = window.sessionStorage.getItem(c);
        if(g == null){
            carregarPartidas(c);
        }else{
            $scope.dados[c] = JSON.parse(window.sessionStorage.getItem(c));
            console.log($scope.dados);
        }
    }
})