// The Main App
var App = {
    Models: {},
    Views: {},
    Collections: {}
}

// random number generator for various methods
var randomNumber = function(min, max) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number
};


/*  Card Model
    - I model a Card
    Attr:
        - name: string, repr the name of the card
        - description: string, repr the cards description
*/
App.Models.Card = Backbone.Model.extend({
    defaults: {
        name: '',
        description: '',
    },
});

/*  Plane Card Model
    - I model a Plane card from planechase, I inherit from the Card Model
    Attr:
        - chaos: string, repr what happens with chaos is rolled
        - card_status: the status of the card.  Currently, it can be
          'active', 'inactive', or 'used'.  'used' cards are cards
          that have been active, but no longer are
*/
App.Models.PlaneCard = App.Models.Card.extend({
    defaults: {
        chaos: '',
        card_status: 'inactive'
    }
});


/*  Phenominon Card Model
    - I model a Phenominon card from planechase. I inherit from Card,
    Methods:
        - phenomEvent: my effect on the game.  This is a custom method that is
          passed on creation.
*/
App.Models.PhenomCard = App.Models.Card.extend({
    defualts: {
        phenomEvent: function() { return null; }, 
    }
});

/* Deck
    - I am a collection of PhenomCards and PlaneCards
*/
App.Collections.Deck = Backbone.Collection.extend({
    model: App.Models.Card,
    // Set one of the cards as active and return it
    planesWalk: function() {
        var inactive_cards = [];
        // get all the active cards
        _.each(this.models, function(card) {
            if(card.attributes.card_status == 'inactive') {
                inactive_cards.push(card);
            }
        });
        max = inactive_cards.length - 1;
        index = randomNumber(0, max);
        inactive_cards[index].set({ card_status: 'active' });
        return inactive_cards[index];
    },
});

/* Planar Dice
    - I model a Planar dice.  I have six sides, one of which is planeswalk, 
      the other is choas
    Attributes:
        active_side: the active side I am showing
        chaotic: if I am using chaos sides or not, defaults to false
        sides: the sides I use normaly
        choas_sides: the sides I use when chaotic
*/
App.Models.PlanarDice = Backbone.Model.extend({
    defaults: {
        active_side: randomNumber(1, 6),
        chaotic: false,
        sides: {
            1: 'planeswalk',
            2: 'try again',
            3: 'blank',
            4: 'choas',
            5: 'sorry',
            6: 'missed',
        },
        // used for the chaos event when all blank sides are chaos
        choas_sides: {
            1: 'planeswalk',
            2: 'chaos',
            3: 'chaos',
            4: 'chaos',
            5: 'chaos',
            6: 'chaos',
        },
    },

    // roll the dice and set active side to the result
    rollDice: function() {
        this.set({active_side: randomNumber(1, 6)});
        if(this.attributes.chaotic) {
            return this.attributes.choas_sides[this.attributes.active_side];
        } else {
            return this.attributes.sides[this.attributes.active_side];
        }
    }
});






















