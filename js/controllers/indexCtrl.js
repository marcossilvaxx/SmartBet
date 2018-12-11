app.controller("indexCtrl", function($scope, $http){
    $scope.loading = 0;
    $scope.dados = {};
    var escudo;

    var carregarPartidas = function(c){
        $scope.loading++;
        $http.get("https://api.football-data.org/v2/competitions/"+ c +"/matches?status=SCHEDULED", {
            headers: {'X-Auth-Token': '4fb9f4ae0f5b414788d01798280a741d'}
        }).then(function(response){
            window.sessionStorage.setItem(c, JSON.stringify(response.data));
            $scope.dados[c] = response.data;
        }, function(erro){
            console.log(erro.data);
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
    var carregarEscudo = function(id){
        $http.get("http://api.football-data.org/v2/teams/" + id, {
            headers: {'X-Auth-Token': '4fb9f4ae0f5b414788d01798280a741d'}
        }).then(function(response){
            escudo = response.data.crestUrl;
            console.log(escudo);
        });
    }
    $scope.getEscudo = function(id){
        carregarEscudo(id);
        return escudo;
    }
    /*
    $scope.getDisplay = function($event){
        if($event.currentTarget.parentNode.style.display == "block"){
            return true;
        }
    }
    */
})