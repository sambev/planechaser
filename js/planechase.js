//DOM STUFF
$(function() {
    // create a deck
    App.PlanarDeck = new App.Collections.Deck([
        // Planes
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
        // Phenoms
        App.MorphicTide = new App.Models.PhenomCard({
            name: 'morphic-tide',
            phenomEvent: function(ev) {
                App.DeckView.render()
            },
        }),
        App.MutualEpiphany = new App.Models.PhenomCard({
            name: 'mutual-epiphany',
            phenomEvent: function(ev) {
                App.DeckView.render()
            },
        }),
        App.PlanewideDisaster = new App.Models.PhenomCard({
            name: 'planewide-disaster',
            phenomEvent: function(ev) {
                App.DeckView.render()
            },
        }),
        App.RealityShaping = new App.Models.PhenomCard({
            name: 'reality-shaping',
            phenomEvent: function(ev) {
                App.DeckView.render()
            },
        }),
        App.TimeDistortion = new App.Models.PhenomCard({
            name: 'time-distortion',
            phenomEvent: function(ev) {
                App.DeckView.render()
            },
        }),
        // Crazy phenoms
        //App.ChaoticAether = new App.Models.PhenomCard({ 
        //    name: 'chaotic-aether', 
        //    phenomEvent: function(ev) {
        //        App.GameDice.choatic = true;
        //    },
        //}),
    ]);

    // create a plane view
    App.DeckView = new App.Views.PlaneView({ collection: App.PlanarDeck })

    // create a dice model
    App.GameDice = new App.Models.PlanarDice();

    // create a view for the dice
    App.DiceView = new App.Views.DiceView({ model:App.GameDice });

    // watch a click on the planewalk button and planewalk if it is clicked
    $('.planeswalk').click(function(ev) {
        App.DeckView.render()
    });
});
