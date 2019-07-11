$(document).ready(function () {
                        //main object
    class dude {
        constructor() {
            this.multiplier = 1;
            this.ability_power = true;
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
                    this.health = 140;
                    this.attack = 20;
                    this.counter_attack = 20;
                    this.pic.src = "assets/images/Dnd-3.5-cleric-209x300.jpg";
                    break;
                }
            }


        }

    }
                                        //vars used by majority of functions
    var toptext = $(".announcer");
    var heading = $("<h1>");
    var spawn = $(".player-area");
    var pool = $(".opponent-area");
    var playerselected = false;
    var opponent_in_zone = false;
    var dudelist = [];
    var combat_round = 0;
    var alive = true;
    var bested = 0;


    function player_selected(element) {                         //function for picking player character and opponents

        element.data("stats").is_player = true;
        playerselected = true;
        element.removeClass("not-player");
        element.addClass("player-character");
        var opponent = $(".not-player").detach();
        opponent.appendTo(pool);
        heading.text("PLAYING AS: " + element.data("stats").profession.toUpperCase() + "! NOW CHOOSE AN OPPONENT!");

    }

    function opponent_selected(element) {
        if (element.data("stats").is_player === false) {
            element.addClass("picked");
            element.detach();
            element.appendTo($(".opponent-selected"));
            heading.text("ATTACKING : " + element.data("stats").profession.toUpperCase());
            opponent_in_zone = true;
        }

    }
    function drawloop(){                                        //draws multiple characters
        for (let i = 0; i < 4; i++) {
            dudelist[i] = new dude(); //creates class values that stores character stats
            draw_characters(i, dudelist[i], dudelist[i].pic, spawn);
    
        }
    }

    function combat(a, b) {                                     //controls how two characters deal damage to each other and checks if a character's health reaches zero
        deal_damage(a, b);

        update_health(a);
        update_health(b);

        death_conditions(a, b);

    }

    function deal_damage(a, b) {
        if ((combat_round === 0) && (a.data("stats").profession === "ranger")) {
            (b.data("stats").health) -= ((a.data("stats").attack) * (a.data("stats").multiplier));
            a.data("stats").multiplier++;

        } else if ((a.data("stats").profession === "rogue") && (combat_round === 0) && (a.data("stats").ability_power === true)) {
            (b.data("stats").health) -= ((a.data("stats").attack) * (a.data("stats").multiplier * 3));
            (a.data("stats").health) -= (b.data("stats").counter_attack);
            a.data("stats").ability_power = false;
            a.data("stats").multiplier++;

        } else if (a.data("stats").profession === "cleric") {
            (b.data("stats").health) -= ((a.data("stats").attack) * (a.data("stats").multiplier));
            (a.data("stats").health) -= Math.floor(b.data("stats").counter_attack / 2);
            a.data("stats").multiplier++;
        } else {
            (b.data("stats").health) -= ((a.data("stats").attack) * (a.data("stats").multiplier));
            (a.data("stats").health) -= (b.data("stats").counter_attack);

            if (a.data("stats").profession === "wizard") {
                a.data("stats").multiplier += 2;
            } else {
                a.data("stats").multiplier++;
            }

        }

    }

    function update_health(character_object) {
        let co_hp = character_object.find(".health-text");
        co_hp.text("\uD83E\uDDE1 " + character_object.data("stats").health);

    }

    function death_conditions(a, b) {
        if ((a.data("stats").profession === "fighter") && (a.data("stats").ability_power === true)) {
            if (a.data("stats").health <= 0) {
                a.data("stats").health = 1;
                a.data("stats").ability_power = false;
                update_health(a);
                alive = false;
            } else if (b.data("stats").health <= 0) {
                b.detach();
                opponent_in_zone = false;
                heading.text("YOU WON SELECT A NEW OPPONENT");
                combat_round = 0;
                bested++;

            }
        } else {
            if ((a.data("stats").health <= 0) && (b.data("stats").health <= 0)) {
                a.detach();
                b.detach();
                heading.text("YOU DIED PRESS R TO RESTART");
                combat_round = 0;
                bested++;
                alive = false;
            } else if (a.data("stats").health <= 0) {
                a.detach();
                heading.text("YOU DIED PRESS R TO RESTART");
                combat_round = 0;
                alive = false;
            } else if (b.data("stats").health <= 0) {
                b.detach();
                opponent_in_zone = false;
                heading.text("YOU WON SELECT A NEW OPPONENT");
                combat_round = 0;
                bested++;

            }
        }
    }


    function draw_characters(index, object, object_image, element) {                    //draws a single character

        var characterholder = $("<div>"); //the container for character elements
        generate_container(characterholder, index, element, object);

        var character = $('<img>'); //character images
        generate_pic(object_image, characterholder, character);

        draw_stats(characterholder, object.health, object.attack, object.counter_attack);

    }

    function generate_container(holder, index, element, object) {
        holder.addClass("characterholder not-player");
        holder.attr("id", index);
        holder.appendTo(element);
        holder.data("stats", object);

    }

    function generate_pic(object_image, holder, character) {
        character.addClass("img-fluid ");
        character.attr("src", object_image.src);
        character.width(150);
        character.height(150);
        character.appendTo(holder);

    }

    function draw_stats(parent, health_stat, attack_stat, counter_stat) {
        var character_hp = $('<p class="health-text">');
        var character_attack = $('<p class="attack-text">');
        var character_counter = $('<p class="counter-text">');
        character_hp.appendTo(parent);
        character_hp.text("\uD83E\uDDE1 " + health_stat);
        character_hp.data("hp", health_stat);
        character_attack.appendTo(parent);
        character_attack.text("\u2694 " + attack_stat);
        character_attack.data("attack", attack_stat);
        character_counter.appendTo(parent);
        character_counter.text("\u2638 " + counter_stat);
        character_counter.data("attack", counter_stat);

    }

    function createTooltip(){  
        let tooltip = $(".tooltip");
        tooltip.text("Lorem ipsum dolor amet kitsch irony swag, tumblr cornhole food truck health goth. Paleo activated charcoal cliche flexitarian, chicharrones tacos pour-over man bun leggings mixtape chambray hammock sustainable cornhole. Marfa jianbing truffaut asymmetrical drinking vinegar. Hammock unicorn ramps salvia 3 wolf moon craft beer kitsch drinking vinegar selfies cardigan cray man bun selvage. Venmo shoreditch squid cornhole irony, hot chicken authentic offal organic sustainable distillery franzen yr chicharrones. Biodiesel banjo schlitz 90's cray vaporware pinterest.")
       
        

    };


    function reset_game() {                                                             //resets the games values and characters
        $(".player-area").empty();
        $(".opponent-area").empty();
        heading.text("CHOOSE YOUR CHARACTER");
        $("#0").remove();
        $("#1").remove();
        $("#2").remove();
        $("#3").remove();
        playerselected = false;
        opponent_in_zone = false;
        alive = true;
        dudelist = [];
        combat_round = 0;
        bested = 0;
        drawloop();

    }

    //*******************************************************************program starts****************************************************************************************** */
    drawloop();


    
    heading.text("CHOOSE YOUR CHARACTER");
    heading.appendTo(toptext);


    var character_zero = $("#0");
    var character_one = $("#1");
    var character_two = $("#2");
    var character_three = $("#3");

    
    character_zero.hover(function(){
        createTooltip();

    }, function(){
        $('.tooltip').remove();
        
    });


    character_zero.click(function () {

        if (playerselected === false) {
            player_selected(character_zero);

        }
        if ((playerselected === true) && (opponent_in_zone === false)) {
            opponent_selected(character_zero);

        }
    });
    

    character_one.click(function () {

        if (playerselected === false) {
            player_selected(character_one);

        }
        if ((playerselected === true) && (opponent_in_zone === false)) {
            opponent_selected(character_one);

        }
    });
    character_two.click(function () {

        if (playerselected === false) {
            player_selected(character_two);

        }
        if ((playerselected === true) && (opponent_in_zone === false)) {
            opponent_selected(character_two);

        }
    });
    character_three.click(function () {

        if (playerselected === false) {
            player_selected(character_three);

        }
        if ((playerselected === true) && (opponent_in_zone === false)) {
            opponent_selected(character_three);

        }
    });

    $(".fightbutton").click(function () {
        let fighter_one = $(".player-character");
        let fighter_two = $(".picked");

        if (opponent_in_zone === true) {
            combat(fighter_one, fighter_two);
            combat_round++;
            //console.log(combat_round);
        }
    });
    document.onkeypress = function(event){
        let key = event.key.toLowerCase();
        if((alive === false) && (key === 'r')){
            reset_game();
        }

    }


    
});