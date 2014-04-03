nimbleModule.factory("token", [function() {
    var tokenUrl = "/github/token",
        token = document.cookie.replace(
            /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    return {
        clear: function() {
            token = null;
        },

        get: function() {
            return token;
        }
    };
}]);