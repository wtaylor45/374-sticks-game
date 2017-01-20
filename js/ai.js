var moves;
var map;
function AI(){
    this.takingTurn = false;
    this.floor = 1;
    this.ceiling = 98;

    this.init = function(){
        map = {};
        for(var i = 21; i > 0; i--){
            map[i.toString()] = [i, 33, 33, 34];
        }
        //Hard code rules, cannot choose more sticks than are available
        map['2'] = [2, 50, 50, 0];
        map['1'] = [1, 100, 0, 0];
    }

    this.takeTurn = function(){
      quit_btn.inputEnabled = false;
      console.log('AI taking turn: ', sticksLeft);

        //Random pick from weighted map of choices
        var weighted = map[sticksLeft.toString()];
        var randNum = Math.floor((Math.random() * 100) + 1);
        var num;

        console.log('ranges: ', weighted[1], ', ', (weighted[1]+weighted[2]), ', ', (weighted[1]+weighted[2]+weighted[3]), ', num is:', randNum);
        if(randNum <= weighted[1]){
            num = 1;
        }
        else if((weighted[1] <= randNum) && (randNum < (weighted[1]+weighted[2]))){
            num = 2;
        }
        else if(((weighted[1]+weighted[2]) <= randNum) && (randNum < (weighted[1]+weighted[2]+weighted[3]))){
            num = 3;
        }
        else{
            console.log('ERROR: Rand num not in range of percentiles')
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

          quit_btn.inputEnabled = true;
        }, lag);
    }

    this.updateAI = function(){
        var change = 6;
        if(playerWin){
            change *= -1; //Decrement values for chosen moves
        }

        var keys = Object.keys(moves);
        for(var i in keys){
            var key = keys[i]
            //If key is in map (should always be true) update map values
            if(key in map){
                console.log(key + ":" + moves[key]);
                var cur_vals = map[key];
                console.log(cur_vals);
                var spot = moves[key];
                for(var j=1; j<cur_vals.length; j++){
                    var val = cur_vals[j];
                    if (j == spot){
                        cur_vals[j] = val + change;
                    }
                    else{
                        cur_vals[j] = val - change/2;
                    }
                }
                map[key] = cur_vals;
                cur_vals = [];
                console.log(map[key]);
            }
        }
        console.log(map);
        $('#excelDataTable').empty();
        buildHtmlTable('#excelDataTable');

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
