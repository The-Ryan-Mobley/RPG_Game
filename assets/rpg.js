class dude{
    constructor(){
        this.multiplier =1;
        this.is_player = false;
        this.health = 100;
        this.attack = 20;
        this.counter_attack = 20;
        this.area = "pool";
        this.in_combat="false";
    }
    strong(){
        this.attack = Math.floor(Math.random() * 70) + 30;
    }
    weak(){
        this.attack = Math.floor(Math.random()* 40) + 10;
    }
    chonk(){
        this.health = Math.floor(Math.random() * 250) + 120;
    }
    soft(){
        this.health = Math.floor(Math.random() * 100) + 50;
    }
    parry(){
        this.counter_attack = Math.floor(Math.random() * 60) + 30;
    }
    distracted(){
        this.counter_attack = Math.floor(Math.random() * 45) + 5;
    }
    assign_attributes(){
        if(this.is_player === true){ //player needs better variations
            this.chonk();
            this.strong();
            this.parry();
        }
        else{
            let healthroll = Math.floor(Math.random() * 100);
            let counterroll = Math.floor(Math.random() * 100);
            if(healthroll >= 75){
                this.chonk();
            }
            else{
                this.soft();
            }
            if(counterroll >= 60){
                this.parry();
            }
            else{
                this.distracted();
            }

        }
    }
    
}
function attack(a,d){
    if(a.isplayer === true){
        let basepower = a.attack;
        d.health -= a.attack * a.multiplier;
        a.health -= d.counterattack;
        a.multiplier++;
    }
    
}
