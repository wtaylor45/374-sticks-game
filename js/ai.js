var moves;
var map;
function AI(){
    this.takingTurn = false;
    this.floor = 1;
    this.ceiling = 98;

    this.init = function(){
        map = {};
        for(var i = 21; i > 0; i--){
            map[i.toString()] = [33, 33, 34];
        }
        //Hard code rules, cannot choose more sticks than are available
        map['2'] = [50, 50, 0];
        map['1'] = [100, 0, 0];
    }

    this.takeTurn = function(){
        this.takingTurn = true;
        /*
        //Random pick from 1 to 3:
        var num = Math.floor((Math.random() * 3) + 1);
        if(num > sticksLeft){
            num = sticksLeft;
        }
        */

        //Random pick from weighted map of choices
        var weighted = map[sticksLeft.toString()];
        var randNum = Math.floor((Math.random() * 100) + 1);
        var num;
        if(randNum < weighted[0]){
            num = 1;
        }
        else if(weighted[0] < randNum < weighted[1]){
            num = 2;
        }
        else{
            num = 3;
        }

        if(num > sticksLeft){
            num = sticksLeft;
            console.log('ERROR: Impossible move chosen, changed');
        }

        //Create a lag time if this is not simulation mode
        var lag = 0;
        if(!simulation){
            lag = 1000
        }
        setTimeout(function(){
          moves[sticksLeft.toString()] = num;
          removeSticks(num);

          this.takingTurn = false;
        }, lag);
    }

    this.updateAI = function(){
        var change = 6;
        if(playerWin){
            change *= -1; //Decrement values for chosen moves
        }

        var keys = Object.keys(moves);

        //Iterate through all the keys
        for(var i in keys){
            var key = keys[i]
            //If key is in map (should always be true) update map values
            if(key in map){
                console.log(key + ":" + moves[key]);
                var cur_vals = map[key];
                console.log(cur_vals);
                var spot = moves[key];
                
                for(var j in cur_vals){
                    var val = cur_vals[j];
                    if (j == spot-1){
                        cur_vals[j] = val + change;
                    }
                    else{
                        cur_vals[j] = val - change/2;
                    }
                }
                map[i] = cur_vals;
                cur_vals = [];
                console.log(map[i]);
            }
        }
        console.log(map);
    }

    this.trainAI = function(num){
        for(var i = 0; i < num; i++){
            this.simulateGame();
            //Reset variables
            initVars();
        }
    }

    this.simulateGame = function(){

        while(sticksLeft > 0){
            //AI takes turn
            this.takeTurn();

            //Next turn is random number between 1 and 3 if not game over
            if(sticksLeft > 0){
                var num = Math.floor((Math.random() * 3) + 1);
                if(num > sticksLeft){
                    num = sticksLeft;
                }
                removeSticks(num);
            }
        }

        this.updateAI();
    }
}
