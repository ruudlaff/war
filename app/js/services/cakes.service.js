cakeApp.service("cakeService", function($http) {

    // Return public API.
    return({
        getAll: getAll,
        getOne: getOne,
        add: add
    });

    function baseUrl() {
        return "http://ec2-52-209-201-89.eu-west-1.compute.amazonaws.com:5000/api";
    }

    function getAll(g,e) {
        var request = $http({
            method: 'GET',
            url: baseUrl() + '/cakes'
        });
        return(request.then(g,e));
    }

    function getOne(d,g,e) {
        var request = $http({
            method: 'GET',
            url: baseUrl() + '/cakes/' + d
        });
        return(request.then(g,e));
    }

    function add(d,g,e) {
        var request = $http({
            method: 'POST',
            data: d,
            url: baseUrl() + '/cakes'
        });
        return(request.then(g,e));
    }

});