Nimble.ReposRoute = Ember.Route.extend({
    model: function() {
        var store = this.get("store"),
            loggedInUser = store.load("user"),
            userRepos = store.load("user/repos"),

            userOrgsUrl = function(user) {
                return "users/" + user.login + "/orgs";
            },

            orgReposUrl = function(org) {
                return "orgs/" + org.login + "/repos";
            },

            allRepos = function(reposArrays) {
                var repos = [];
                $.each(reposArrays, function(idx, reposArray) {
                    repos = repos.concat(reposArray);
                });
                return repos;
            };

        // Get all repos associated with this user,
        // including all repos associated with any orgs user belongs to.
        // TODO handle lookup errors by calling reject
        return new Ember.RSVP.Promise(function(resolve, reject) {
            loggedInUser.then(function(user) {
                var organizations = store.load(userOrgsUrl(user))
                    .then(function(userOrgs) {
                        var orgRepos = [];
                        $.each(userOrgs, function(idx, userOrg) {
                            orgRepos.push(store.load(orgReposUrl(userOrg)));
                        });

                        Ember.RSVP.Promise.all(orgRepos.concat(userRepos))
                            .then(function(reposArrays) {
                                resolve(allRepos(reposArrays));
                            });
                    });
            });
        });
    },

    renderTemplate: function() {
        this.render("repos", {
            outlet: "modalOutlet"
        });
    }
});