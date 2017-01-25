

function AI(){
    this.takingTurn = false;
    this.floor = 0;
    this.ceiling = 100;

    this.init = function(){
        map = {};
        for(var i = 21; i > 0; i--){
            map[i.toString()] = [i, 33.33, 33.33, 33.34];
        }
        //Hard code rules, cannot choose more sticks than are available
        map['2'] = [2, 50, 50, 0];
        map['1'] = [1, 100, 0, 0];

    }

    this.takeTurn = function(){
      quit_btn.inputEnabled = false;
      if(simulation){
        console.log('Simulation mode');
      }
      console.log('AI taking turn: ', sticksLeft);

        //Random pick from weighted map of choices
        var weighted = map[sticksLeft.toString()];
        var randNum = Math.floor((Math.random() * 100) + 1);
        var num;

        //console.log('ranges: ', weighted[1], ', ', (weighted[1]+weighted[2]), ', ', (weighted[1]+weighted[2]+weighted[3]), ', num is:', randNum);
        if(randNum <= weighted[1]){
            num = 1;
        }
        else if((weighted[1] < randNum) && (randNum <= (weighted[1]+weighted[2]))){
            num = 2;
        }
        else if(((weighted[1]+weighted[2]) < randNum) && (randNum <= 100)){
            num = 3;
        }
        else{
            //console.log('ERROR: Rand num not in range of percentiles')
        }
        stickschosen = num;
        if(num > sticksLeft){
            num = sticksLeft;
            //console.log('ERROR: Impossible move chosen, changed');
        }

        if(!simulation){
            lag = 1500;
            setTimeout(function(){
                moves[sticksLeft.toString()] = num;
                removeSticks(num);
                quit_btn.inputEnabled = true;
            }, lag)
        }
        else{
            moves[sticksLeft.toString()] = num;
            removeSticks(num);
        }

        this.takingTurn = false;
    }

    this.updateAI = function(){
        var change = 5;
        if(playerWin){
            change *= -1; //Decrement values for chosen moves
        }

        var keys = Object.keys(moves);
        console.log(keys);
        for(var i in keys){
            var key = keys[i]
            //If key is in map (should always be true) update map values
            if(key in map){
                console.log(key + ":" + moves[key]);
                var cur_vals = map[key];
                console.log(cur_vals);
                var spot = moves[key];

                map[key] = this.calculateVals(cur_vals, spot, change);
                cur_vals = [];
                console.log(map[key]);
            }
        }
        //console.log(map);
        $('#excelDataTable').empty();
        buildHtmlTable('#excelDataTable');

        if(simulation){
           this.trainAI(simGames--);
        }
    }

    //start_vals is array from map for a specific sticksLeft values
    //move is the number (1, 2, or 3) that was chosen by the AI
    //change is the max change value
    this.calculateVals = function(start_vals, move, change){
        //console.log('inside function');
        var new_vals = start_vals;

        //Calculate actual change
        //If the AI won, check against the ceiling, otherwise against the floor

        var check = (change > 0) ? this.ceiling : this.floor;


        //The change is the lower of either the set change value or the maximum that
        //can be added or subtracted without making the percentage outside of the floor:ceiling bounds
        var r_change = (Math.abs(change) < Math.abs(check - start_vals[move])) ? change : (check - start_vals[move]);
        var total = 0;
        var length = start_vals.length;
        var div = 2;
        //Check special case rules
        if(start_vals[0] == 1){
            length = 1;
        }
        else if(start_vals[0] == 2){
            length = 3;
            div = 1;
        }

        for(var count = 1; count < length; count++){
            if(count == move) {
                continue;
            }

            //If the change puts the percentage outside of the bounds, set the percentage equal to the bound
            if( (start_vals[count] - r_change/div) > this.floor){
                if( (start_vals[count] - r_change/div) < this.ceiling){
                    new_vals[count] = Math.floor((start_vals[count] - r_change/div)*100)/100;
                    //console.log('Value at ', count, ' is: ', new_vals[count]);
                }
                else{
                    new_vals[count] = this.ceiling;
                }
            }
            else{
                new_vals[count] = this.floor;
            }
            total += new_vals[count];
        }

        //Make sure move percentages add up to 100
        new_vals[move] = Math.floor((100 - total)*100)/100;
        return new_vals;
    }

    this.trainAI = function(num){
        //console.log('Simulations left: ', num);
        initVars();
        if(num <= 0){
            simulation = false;
        }
        else{
            this.simulateGame();
        }

        /*for(var i = 0; i < num; i++){
            console.log('SIMULATION #', i+1);
            this.simulateGame();
            //Reset variables
            initVars();
        }*/
    }

    this.simulateGame = function(){

        while(sticksLeft > 0){
            //AI takes turn
            this.takingTurn = true;
            this.takeTurn();

            //Next turn is random number between 1 and 3 if not game over
            if(sticksLeft > 0){
                console.log('RNG Turn');
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
