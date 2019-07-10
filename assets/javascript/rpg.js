class dude {
    constructor() {
        this.multiplier = 1;
        this.abilit_power = true;
        this.is_player = false;
        this.health = 0;
        this.attack = 0;
        this.counter_attack = 0;
        this.profession = "";
        this.area = "pool";
        this.pic = new Image();
        this.assignprofession();
    }
    assignprofession() {
        var list = ["fighter", "wizard", "rogue", "ranger", "warlock", "cleric"];
        this.profession = list[Math.floor(Math.random() * list.length)];

        switch (this.profession.toLowerCase()) {
            case "fighter": {
                this.health = 190;
                this.attack = 30;
                this.counter_attack = 30;
                this.pic.src = "assets/images/Tordek.jpg";
                break;
            }
            case "wizard": {
                this.health = 120;
                this.attack = 50;
                this.counter = 30;
                this.pic.src = "assets/images/dnd-wizard.jpg";
                break;
            }
            case "warlock": {
                this.health = 160;
                this.attack = 60;
                this.counter_attack = 60;
                this.pic.src = "assets/images/c1034.png";
                break;
            }
            case "rogue": {
                this.health = 140;
                this.attack = 30;
                this.counter_attack = 50;
                this.pic.src = "assets/images/Arcane_trickster_wand.jpg";
                break;
            }
            case "ranger": {
                this.health = 180;
                this.attack = 40;
                this.counter_attack = 40;
                this.pic.src = "assets/images/dnd-class-ranger-195x300.png";
                break;
            }
            case "cleric": {
                this.health = 220;
                this.attack = 10;
                this.counter_attack = 20;
                this.pic.src = "assets/images/Dnd-3.5-cleric-209x300.jpg";
                break;
            }
        }


    }

}



$(document).ready(function () {
    var toptext = $(".announcer");
    var heading = $("<h1>");
    var spawn = $(".player-area");
    var pool = $(".opponent-area");
    var playerselected = false;
    var opponent_in_zone = false;
    var dudelist = [];
    var characterlist = [];


    function player_selected(element) {

        element.data("stats").is_player = true;
        playerselected = true;
        element.removeClass("not-player");
        element.addClass("player-character");
        var opponent = $(".not-player").detach();
        opponent.appendTo(pool);
        heading.text("PLAYING AS: " + element.data("stats").profession + "! NOW CHOOSE AN OPPONENT!");

    }

    function opponent_selected(element) {
        if (element.data("stats").is_player === false) {
            element.addClass("picked");
            element.detach();
            element.appendTo($(".opponent-selected"));
            heading.text("ATTACKING : " + element.data("stats").profession);
            opponent_in_zone = true;
        }

    }

    function combat(a, b) {

        (b.data("stats").health) -= ((a.data("stats").attack) * (a.data("stats").multiplier));
        (a.data("stats").health) -= (b.data("stats").counter_attack);
        a.data("stats").multiplier++;
        
        if((a.data("stats").health <= 0) && (b.data("stats").health <= 0)){
            a.detach();
            b.detach();
            heading.text("YOU DIED");
        }
        else if(a.data("stats").health <= 0){
            a.detach();
            heading.text("YOU DIED");
        }
        else if(b.data("stats").health <= 0){
            b.detach();
            opponent_in_zone = false;
            heading.text("YOU WON SELECT A NEW OPPONENT");

        }
        

    }
    function update_health(a,b){
        console.log("yo");
        a.text("\uD83E\uDDE1 " + a.data("hp"));
        b.text("\uD83E\uDDE1 " + b.data("hp"));
    }
    


    for (let i = 0; i < 4; i++) {
        dudelist[i] = new dude(); //creates class values that stores character stats


        var characterholder = $("<div>"); //the container for character elements
        characterholder.addClass("characterholder not-player");
        characterholder.attr("id", i);
        characterholder.appendTo(spawn);
        characterholder.data("stats", dudelist[i]);

        var character = $('<img>'); //character images
        character.addClass("img-fluid ");
        character.attr("src", dudelist[i].pic.src);
        character.width(150);
        character.height(150);
        characterlist.push(character);
        character.appendTo(characterholder);

        //stat text
        var character_hp = $('<p class="health-text">');
        var character_attack = $('<p class="attack-text">');
        var character_counter = $('<p class="counter-text">');
        character_hp.appendTo(characterholder);
        character_hp.text("\uD83E\uDDE1 " + dudelist[i].health);
        character_hp.data("hp", dudelist[i].health);
        character_hp.addClass(i);
        character_attack.appendTo(characterholder);
        character_attack.text("\u2694 " + dudelist[i].attack);
        character_attack.data("attack", dudelist[i].attack);
        character_counter.appendTo(characterholder);
        character_counter.text("\u2638 " + dudelist[i].counter_attack);
        character_counter.data("attack", dudelist[i].counter_attack);
        

    }
    heading.text("CHOOSE YOUR CHARACTER");
    heading.appendTo(toptext);


    var character_zero = $("#0");
    var character_one = $("#1");
    var character_two = $("#2");
    var character_three = $("#3");
    var health_zero = $(".0");
    var health_one = $(".1");
    var health_two = $(".2");
    var health_three = $(".3");
    

    character_zero.click(function () {

        if (playerselected === false) {
            player_selected(character_zero);
            health_zero.addClass("player-health");
        }
        if ((playerselected === true) && (opponent_in_zone === false)) {
            opponent_selected(character_zero);
            health_zero.addClass("opponent-health");
        }
    })
    character_one.click(function () {

        if (playerselected === false) {
            player_selected(character_one);
            health_one.addClass("player-health");
        }
        if ((playerselected === true) && (opponent_in_zone === false)) {
            opponent_selected(character_one);
            health_one.addClass("opponent-health");
        }
    })
    character_two.click(function () {

        if (playerselected === false) {
            player_selected(character_two);
            health_two.addClass("player-health");
        }
        if ((playerselected === true) && (opponent_in_zone === false)) {
            opponent_selected(character_two);
            health_two.addClass("opponent-health");
        }
    })
    character_three.click(function () {

        if (playerselected === false) {
            player_selected(character_three);
            health_three.addClass("player-health");
        }
        if ((playerselected === true) && (opponent_in_zone === false)) {
            opponent_selected(character_three);
            health_three.addClass("opponent-health");
        }
    })

    $(".fightbutton").click(function () {
        let fighter_one = $(".player-character");
        let fighter_two = $(".picked");
        let health_fighter_one = $(".player-health");
        let health_fighter_two = $(".opponent-health");
        if (opponent_in_zone === true) {
            combat(fighter_one, fighter_two);
            update_health(health_fighter_one,health_fighter_two);
        }


    });

});



//mydude.assignprofession();