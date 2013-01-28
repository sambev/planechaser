// A close prototype for views so we can clean them up
Backbone.View.prototype.close = function() {
    this.undelegateEvents();
    this.empty;
    this.unbind();
    // If I have an onClose method, call me as well
    if (this.onClose) {
        this.onClose();
    }
}

/* PlaneView
    - I represent a view of the current Plane
*/
App.Views.PlaneView = Backbone.View.extend({
    el:'#planeview',

    template: _.template($('#plane-view-template').html()),

    initialize: function() {
        // get a random active card, then render the view with that model
        _.each(this.collection.models, function(model) {
            model.on('change', this.render, this);
        });
        this.render();
    },

    render: function() {
        var active_card = this.collection.planesWalk()
        this.$el.html(this.template(active_card.toJSON()));
    }
});

/* DiceView
    - I represent a view of the Dice
*/
App.Views.DiceView = Backbone.View.extend({
    el:'#diceview',

    template: _.template($('#dice-view-template').html()),

    initialize: function() {
        this.model.on('change', this.render, this);
        this.render();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    },
    
    // Close me correctly, called with view.close() see top of this file
    onClose: function() {
        this.model.unbind('change', this.render); 
    },

    events: {
        'click div[class=dice]': 'rollDice',
    },

    // rollDice method, rolls the dice
    rollDice: function (event) {
        outcome = this.model.rollDice();
        alert(outcome);
        if (outcome == 'planeswalk') {
            App.DeckView.render();
        }
    },
});

