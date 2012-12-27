// The Main App
var App = {
    Models: {},
    Views: {},
    Collections: {}
}

/*  Planar Deck Model
    - I consist of Plane cards and Phenom Cards... 
      perhaps I should be a collection
    Attr:
        - planes, list of Plane Cards
        - phenoms, list of Phenom Cards
*/
App.Models.PlanarDeck = Backbone.Model.extend({
    defaults: {
        planes: [],
        phenoms: [], 
    },
});

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
    
    initialize: function() {
        this.bind('error', function(model, error){
            alert(error);
        });
    },

    validate: function(attb) {
        var error_msg = ''
        if (attb.name == null || attb.name == '') {
            error_msg += 'Card must have a name. ';
        } 
        if (attb.description == null || attb.description == '') {
            error_msg += 'Card must have a description. ';
        }

        return error_msg;
    },
});

/*  Plane Card Model
    - I model a Plane card from planechase, I inherit from the Card Model
    Attr:
        - chaos: string, repr what happens with chaos is rolled
        - active: bool, whether or not I am on the board.
                  True if I am on the board. default is False.
*/
App.Models.PlaneCard = App.Models.Card.extend({
    defaults: {
        chaos: '',
        active: false,
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
