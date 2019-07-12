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
                    this.attack = 40;
                    this.counter_attack = 30;
                    this.pic.src = "assets/images/Tordek.jpg";
                    break;
                }
                case "wizard": {
                    this.health = 120;
                    this.attack = 50;
                    this.counter_attack = 30;
                    this.pic.src = "assets/images/dnd-wizard.jpg";
                    break;
                }
                case "warlock": {
                    this.health = 140;
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
    var playerpicked = false;
    var opponent_in_zone = false;
    var dudelist = [];
    var combat_round = 0;
    var alive = true;
    var bested = 0;


    function player_selected(element) {                         //function for picking player character and opponents

        element.data("stats").is_player = true;
        playerpicked = true;
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
            (b.data("stats").health) -= Math.floor((a.data("stats").attack) * (a.data("stats").multiplier));
            (a.data("stats").health) -= (b.data("stats").counter_attack);

            if (a.data("stats").profession === "wizard") {
                a.data("stats").multiplier += 1.5;
            } else if(a.data("stats").profession == "warlock") {
                a.data("stats").multiplier += 0.5;
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
            } 
            if (b.data("stats").health <= 0) {
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
    function draw_after_reset(index, object, object_image, element){
        
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

    function createTooltip(obj){  
        let tooltip = $(".tool-box");
        console.log("textbox made");
        let helptext = definetoolbox(obj)
        tooltip.html(helptext);
       
        

    };
    function definetoolbox(obj){
        let box ="";
        let object_data = obj.data("stats");
        let name = object_data.profession;
        switch(name){
            case "fighter":{
                box="<strong>Fighter</strong><br>Health: " 
                + object_data.health + "<br>Attack: " + object_data.attack 
                + "<br>Counter: " + object_data.counter_attack + "<br><strong>Ability: Endurance</strong>"
                + "<br>Over a long career of battle the warrior has developed an almost supernatural endurance," 
                + "shrugging off blows that would kill a mortal man The first time the player's health reaches zero" 
                + "they drop to one health instead.<br> The"  
                + "fighters high base stats makes them well rounded with decent staying power. endurance lets you "
                +"take on higher damage classes like the wizard more safely later.";
                break;
            }
            case "wizard":{
                box="<strong>Wizard</strong><br>Health: " 
                + object_data.health + "<br>Attack: " + object_data.attack 
                + "<br>Counter: " + object_data.counter_attack + "<br><strong>Ability: Arcane Mastery</strong>"
                + "<br>The Wizard has devoted his life to the arcane arts, making his power all the more potent." 
                + "Players who select the wizard will have their damage multiplier increase fifty percent faster than other classes.<br> The"  
                + "wizard has high damage output, but low health. build your multiplier on higher health enemies like the cleric who cant "
                +"do serious damage in a few hits";
                break;
                
            }
            case "ranger":{
                box="<strong>Ranger</strong><br>Health: " 
                + object_data.health + "<br>Attack: " + object_data.attack 
                + "<br>Counter: " + object_data.counter_attack + "<br><strong>Ability: Marksman</strong>"
                + "<br>The Ranger is a master huntsman. capable of picking off targets from a sitance " 
                + "Players who pick the ranger will ignore counter damage on the first combat round<br> The"  
                + "ranger is great for picking off lower health classes like the wizard or warlock early.";
                break;
            }
            case "rogue":{
                box="<strong>Rogue</strong><br>Health: " 
                + object_data.health + "<br>Attack: " + object_data.attack 
                + "<br>Counter: " + object_data.counter_attack + "<br><strong>Ability: Backstab</strong>"
                + "<br>The Rogue is most at home in the shadows, waiting until their target least excpects them to deliver a " 
                + "final strike. Players who pick the rogue will deall three times their normal damage on the first attack of the game.<br>"  
                + "The rogue has low health but deals damage very quickly.";
                break;

            }
            case "cleric":{
                box="<strong>Cleric</strong><br>Health: " 
                + object_data.health + "<br>Attack: " + object_data.attack 
                + "<br>Counter: " + object_data.counter_attack + "<br><strong>Ability: Divine Shield</strong>"
                + "<br>The Cleric has devoted their life to their god. As a result they can channel their faith" 
                + " into a protective shield around themself. Players who pick the cleric will take half damage from enemy counter attacks<br>"  
                + "The cleric's ability allows them to take a lot of damage. Take advantage of this by building your multiplier on higher health classes like the warrior";
                break;

            }
            case "warlock":{
                box="<strong>Warlock</strong><br>Health: " 
                + object_data.health + "<br>Attack: " + object_data.attack 
                + "<br>Counter: " + object_data.counter_attack + "<br><strong>Ability: Infernal Pact</strong>"
                + "<br>Long ago the Warlock made a pact with an evil entity for power. Though their might is great they have little control over their abilities." 
                + "Players who pick warlock will have high base damage, but their damage multiplier is halved<br>"  
                + "due to the warlocks high stats you might want to pick them just so you dont have to fight one";
                break;
            }
        }
        return box;
    }


    function reset_game() {                                                             //resets the games values and characters
        $(".player-area").empty();
        $(".opponent-area").empty();
        heading.text("CHOOSE YOUR CHARACTER");
        character_zero.remove();
        character_one.remove();
        character_two.remove();
        character_three.remove();
        playerpicked = false;
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
       
        createTooltip(character_zero);

    }, function(){
        $('.tool-box').empty();
        
    });


    character_zero.click(function () {

        if (playerpicked === false) {
            player_selected(character_zero);

        }
        if ((playerpicked === true) && (opponent_in_zone === false)) {
            opponent_selected(character_zero);

        }
    });
    

    character_one.click(function () {

        if (playerpicked === false) {
            player_selected(character_one);

        }
        if ((playerpicked === true) && (opponent_in_zone === false)) {
            opponent_selected(character_one);

        }
    });
    character_one.hover(function(){
        createTooltip(character_one);

    }, function(){
        $('.tool-box').empty();
        
    });
    character_two.click(function () {

        if (playerpicked === false) {
            player_selected(character_two);

        }
        if ((playerpicked === true) && (opponent_in_zone === false)) {
            opponent_selected(character_two);

        }
    });
    character_two.hover(function(){
        createTooltip(character_two);

    }, function(){
        $('.tool-box').empty();
        
    });
    
    character_three.click(function () {

        if (playerpicked === false) {
            player_selected(character_three);

        }
        if ((playerpicked === true) && (opponent_in_zone === false)) {
            opponent_selected(character_three);

        }
    });
    character_three.hover(function(){
        createTooltip(character_three);

    }, function(){
        $('.tool-box').empty();
        
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