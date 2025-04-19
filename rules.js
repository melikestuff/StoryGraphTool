let bread = false;
let gateKey = false;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title: Done
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, "CastleBedroom"); // TODO: replace this text by the initial location of the story : Done?
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location :Done
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data :Done
        
        //Adds choices that have unique mechanisms.
        // Dininghall has bread that the player can take.
        // Balcony has a bird that the player can use their bread to get a key
        // GreatHall has an inaccessible door that the player must use their key on
        // CastleBedroom and Kitchen have dialouge that the player can read.
        // TLDR, the if statement logic here just add choices if players met the reqs, and then does something.
        if (key === "CastleBedroom") {
            //bread = true;
            this.engine.addChoice("Read the diary on the night stand", {
                Text: "You read the diary, and notice that you've been asleep for a long time, and that everyone left the castle.",
                action: "Read the diary on the night stand",
                Target: key
            });
        }

        if (key === "DiningHall" && !bread) {
            //bread = true;
            this.engine.addChoice("Take the bread", {
                Text: "You Took the bread!",
                action: "Take the bread",
                Target: key
            });
        }

        if (key === "Balcony" && bread === true && !gateKey) {
            //gateKey = true;
            this.engine.addChoice("Feed the flying pigeon", {
                Text: "You fed the pigeon, and notice a tied key to his feet. You take his keys and ponder if it will open anything",
                action: "Feed the flying pigeon",
                Target: key
            });
        }

        if (key === "GreatHall" && gateKey) {
            this.engine.addChoice("Attempt to open the locked Gate", {
                Text: "The gate opens, and you are now free",
                action: "Attempt to open the locked Gate",
                Target: "Gatehouse"
            });
        }
        
        if (key === "Kitchen") {
            this.engine.addChoice("Read kitchen note", {
                Text: "The kitchen note reads: Don't feed those pigeons on the balcony, were going to get swarmed!",
                action: "Read kitchen note",
                Target: "Kitchen"
            });
        }

        if(locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text , choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        //Logic to handle if player goes to certain scenes
        //1. makes bread true 
        //2. Makes gatekey true
        //3. Sees if player can bypass the gate
        //Some placeholders are here from a previous attempt of programming,


        if (choice.action === "Take the bread") {
            bread = true;
            //this.engine.show("You took the bread!");
        }

        if (choice.action === "Feed the flying pigeon") {
            gateKey = true;
            //this.engine.show("You fed the pigeon, and notice a tied key to his feet. You take his keys and ponder if it will open anything");
        }
        if (choice.action === "Attempt to open the locked Gate") {
            this.engine.gotoScene(End);

            //this.engine.show("Attempt to open the locked Gate");
        }
        
        //If none apply above, then handle the choice of player
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
            //
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');