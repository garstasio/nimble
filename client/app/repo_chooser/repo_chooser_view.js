Nimble.RepoChooserView = Ember.View.extend({
    didInsertElement: function() {
        $("#repos-modal").modal("show")
            .on("shown.bs.modal", function() {
                $(this).find(".nav li:first a").click();
            })
            .on("hidden.bs.modal", function() {
                return this.controller.send("close_modal");
            }.bind(this));
    },

    actions: {
        // TODO selected_repo should be the name, not the ID
        selected_repo: function(owner, name) {
            var repo = {owner: owner, name: name};

            this.controller.cache.set("selected_repo", repo);

            $("#repos-modal").modal("hide").on("hidden.bs.modal", function() {
                this.controller.transitionToRoute("issues", repo);
            }.bind(this));
        }
    }
});