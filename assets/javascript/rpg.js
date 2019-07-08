class dude{
    constructor(){
        this.multiplier =1;
        this.is_player = false;
        this.health = 0;
        this.attack = 0;
        this.counter_attack = 0;
        this.profession="";
        this.area = "pool";
        this.in_combat="false";
        this.pic = new Image();
        this.assignprofession();
    }
    assignprofession(){
        var list =["fighter", "wizard", "rogue", "ranger", "warlock", "cleric"];
        this.profession= list[Math.floor(Math.random()* list.length)];
       
        switch(this.profession.toLowerCase()){
            case "fighter":{
                this.health = 90;
                this.attack=30;
                this.counter_attack=30;
                this.pic.src = "assets/images/Tordek.jpg";
                break;
            }
            case "wizard":{
                this.health=70;
                this.attack=50;
                this.counter=30;
                this.pic.src = "assets/images/dnd-wizard.jpg";
                break;
            }
            case "warlock":{
                this.health=60;
                this.attack=60;
                this.counter_attack=60;
                this.pic.src ="assets/images/c1034.png";
                break;
            }
            case "rogue":{
                this.health=70;
                this.attack=30;
                this.counter_attack=50;
                this.pic.src = "assets/images/Arcane_trickster_wand.jpg";
                break;
            }
            case "ranger":{
                this.health = 80;
                this.attack =40;
                this.counter_attack =40;
                this.pic.src = "assets/images/dnd-class-ranger-195x300.png";
                break;
            }
            case "cleric":{
                this.health = 120;
                this.attack = 10;
                this.counter_attack =20;
                this.pic.src = "assets/images/Dnd-3.5-cleric-209x300.jpg";
                break;
            }
        }


    }
    
}
function attack(a,d){
    if(a.isplayer === true){
        d.health -= a.attack * a.multiplier;
        a.health -= d.counterattack;
        a.multiplier++;
    }
    
}

$(document).ready(function(){
    var spawn = $(".player-area");
    var pool = $(".opponent-area");
    var playerselected = false;
    //var dudelist =[];
    
    for(let i=0; i < 4; i++){
        mydude = new dude();
        //dudelist.push(mydude);  
        var character = $('<img>');
        character.addClass("img-fluid generated");
        character.attr("src", mydude.pic.src);
        character.data(mydude);
        character.width(250);
        character.height(250);
        character.appendTo(spawn);
    }
    
    $(".generated").click(function(){
        if(playerselected === false){
            mydude.is_player = true;
            playerselected = true;
            console.log(mydude.profession + "selected");
        }

    })

    $(".fightbutton").click(function(){

    });

});



//mydude.assignprofession();
