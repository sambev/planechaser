// A close prototype for views so we can clean them up
Backbone.View.prototype.close = function() {
    this.undelegateEvents();
    this.empty;
    this.unbind();
}

/* PlaneView
    - I represent a view of the current Plane
*/
App.Views.PlaneView = Backbone.View.extend({
    el:'#planeview',

    template: _.template($('#plane-view-template').html()),

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    }
});

/* DiceView
    - I represent a view of the Dice
*/
App.Views.DiceView = Backbone.View.extend({
    el:'#diceview',

    template: _.template($('#dice-view-template').html()),

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    }
});

//DOM STUFF
$(function() {
    // create a plane model
    var PlaneModel = new App.Models.PlaneCard({ 
        name: 'First Plane', 
        description: 'populate stuff and such', 
        chaos: 'populate more and stuff and even more such'
    });

    // create a plane view
    var FirstPlane = new App.Views.PlaneView({ model: PlaneModel })

    // create a dice model
    var GameDice = new App.Models.PlanarDice();

    // create a view for the dice
    var DiceView = new App.Views.DiceView({ model:GameDice });
});
