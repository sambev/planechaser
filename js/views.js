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
        this.model.rollDice();
        outcome = this.model.attributes.sides[this.model.attributes.active_side];
        alert(outcome);
        if (outcome == 'planeswalk') {
            App.DeckView.render();
        }
    },
});



//DOM STUFF
$(function() {
    // create a deck
    App.PlanarDeck = new App.Collections.Deck([
        App.Akoum = new App.Models.PlaneCard({ name: 'akoum', }),
        App.Aretopolis = new App.Models.PlaneCard({ name: 'aretopolis', }),
        App.AstralArena = new App.Models.PlaneCard({ name: 'astral-arena', }),
        App.Bloodhill = new App.Models.PlaneCard({ name: 'bloodhill-bastion', }),
        App.EdgeOfMalacol = new App.Models.PlaneCard({ name: 'edge-of-malacol', }),
        App.FurnaceLayer = new App.Models.PlaneCard({ name: 'furnace-layer', }),
        App.Gavony = new App.Models.PlaneCard({ name: 'gavony', }),
        App.GlenElendra = new App.Models.PlaneCard({ name: 'glen-elendra', }),
        App.GrandOssuary = new App.Models.PlaneCard({ name: 'grand-ossuary', }),
        App.GroveOfTheDreampods = new App.Models.PlaneCard({ name: 'grove-of-the-dreampods', }),
        App.HedronFields = new App.Models.PlaneCard({ name: 'hedron-fields-of-agadeem', }),
        App.Jund = new App.Models.PlaneCard({ name: 'jund', }),
        App.Kessig = new App.Models.PlaneCard({ name: 'kessig', }),
        App.KharashaFoothills = new App.Models.PlaneCard({ name: 'kharasha-foothills', }),
        App.KilnspireDistrict = new App.Models.PlaneCard({ name: 'kilnspire-district', }),
        App.LairOfTheAshenIdol = new App.Models.PlaneCard({ name: 'lair-of-the-ashen-idol', }),
        App.MountKeralia = new App.Models.PlaneCard({ name: 'mount-keralia', }),
        App.Nephalia = new App.Models.PlaneCard({ name: 'nephalia', }),
        App.NornsDominion = new App.Models.PlaneCard({ name: 'norns-dominion', }),
        App.OnakkeCatacomb = new App.Models.PlaneCard({ name: 'onakke-catacomb', }),
        App.Orochicolony = new App.Models.PlaneCard({ name: 'orochi-colony', }),
        App.Orzhova = new App.Models.PlaneCard({ name: 'orzhova', }),
        App.Prahv = new App.Models.PlaneCard({ name: 'prahv', }),
        App.QuicksilverSea = new App.Models.PlaneCard({ name: 'quicksilver-sea', }),
        App.SelesnyaGardens = new App.Models.PlaneCard({ name: 'selesnya-loft-gardens', }),
        App.StairsToInfinity = new App.Models.PlaneCard({ name: 'stairs-to-infinity', }),
        App.Stensia = new App.Models.PlaneCard({ name: 'stensia', }),
        App.Takenuma = new App.Models.PlaneCard({ name: 'takenuma', }),
        App.TalonGates = new App.Models.PlaneCard({ name: 'talon-gates', }),
        App.TheZephyrMaze = new App.Models.PlaneCard({ name: 'the-zephyr-maze', }),
        App.TrailOfTheMageRings = new App.Models.PlaneCard({ name: 'trail-of-the-mage-rings', }),
        App.TrugaJungle = new App.Models.PlaneCard({ name: 'truga-jungle', }),
        App.WindriddlePalaces = new App.Models.PlaneCard({ name: 'windriddle-palaces', }),
    ]);

    // create a plane view
    App.DeckView = new App.Views.PlaneView({ collection: App.PlanarDeck })

    // create a dice model
    App.GameDice = new App.Models.PlanarDice();

    // create a view for the dice
    App.DiceView = new App.Views.DiceView({ model:App.GameDice });
});
