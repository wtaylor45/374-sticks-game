

function AI(){
    this.floor = 0;
    this.ceiling = 100;
    this.smartMap;

    this.init = function(){
        map = {};
        this.smartMap = {};
        var weight;
        for(var i = startingSticks; i > 0; i--){
            map[i.toString()] = [i, 33.33, 33.33, 33.34];

            if(i < 5){
                weight = 100;
            }
            else if(i < 9){
                weight = 90;
            }
            else if(i < 13){
                weight = 80;
            }
            else if(i < 17){
                weight = 70;
            }
            else{
                weight = 60;
            }

            if(i%4 == 1){
                this.smartMap[i.toString()] = [i, weight, (100-weight)/2, (100-weight)/2];
            }
            else if(i%4 == 2){ 
                this.smartMap[i.toString()] = [i, (100-weight)/2, weight, (100-weight)/2];
            }
            else if(i%4 == 3){
                this.smartMap[i.toString()] = [i, (100-weight)/2, (100-weight)/2, weight];
            }
            else{
                this.smartMap[i.toString()] = [i, 33.33, 33.33, 33.34];
            }

        }
        //Hard code rules, cannot choose more sticks than are available
        map['2'] = [2, 50, 50, 0];
        map['1'] = [1, 100, 0, 0];
        this.smartMap['2'] = [2, 0, 100, 0];
        this.smartMap['1'] = [1, 100, 0, 0];

        Logger.debug(JSON.stringify(this.smartMap));


    }

    this.takeTurn = function(){
      quit_btn.inputEnabled = false;
      Logger.debug('AI taking turn: ', sticksLeft);

        //Random pick from weighted map of choices
        var weighted = map[sticksLeft.toString()];
        var randNum = Math.floor((Math.random() * 100) + 1);
        var num;

        Logger.debug('ranges: ', weighted[1], ', ', (weighted[1]+weighted[2]), ', ', (weighted[1]+weighted[2]+weighted[3]), ', num is:', randNum);
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
            Logger.error('ERROR: Rand num not in range of percentiles')
        }
        stickschosen = num;
        if(num > sticksLeft){
            num = sticksLeft;
            Logger.warn('ERROR: Impossible move chosen, changed');
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

    }

    this.updateAI = function(){
        var change = slider_arrow.x/7;
        if(playerWin){
            change *= -1; //Decrement values for chosen moves
        }

        var keys = Object.keys(moves);
        for(var i in keys){
            var key = keys[i]
            //If key is in map (should always be true) update map values
            if(key in map){
                Logger.debug(key + ":" + moves[key]);
                var cur_vals = map[key];
                var spot = moves[key];

                map[key] = this.calculateVals(cur_vals, spot, change);
                cur_vals = [];
            }
        }
        $('#excelDataTable').empty();
        buildHtmlTable('#excelDataTable');

        gamesPlayed++;

        if(simulation){
           this.trainAI(--simGames);
        }
    }

    //start_vals is array from map for a specific sticksLeft values
    //move is the number (1, 2, or 3) that was chosen by the AI
    //change is the max change value
    this.calculateVals = function(start_vals, move, change){
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

    /**
     * This function is called in order to simulate a given number of games against an
     * intelligent model. It is called recursively, decrementing the input value by one
     * each time until the input value is 0.
     *
     * @param {int} num    The number of simulations left to perform
     *
     */
    this.trainAI = function(num){
        Logger.debug('Simulations left: ', num);
        
        if(num <= 0){
            quit_btn.inputEnabled = true;
            simulation = false;
        }
        else{
            initVars();
            this.simulateGame();
        }
    }

    /**
     * This function simulates one game for our AI against an intelligent model. When
     * one game is complete, the updateAI function is called to update our AI's neural
     * net.
     */
    this.simulateGame = function(){
        //While statement continues until either the AI or the model wins
        while(sticksLeft > 0){
            //AI takes turn, same as in regular game
            this.takeTurn();

            if(sticksLeft <= 0){
                //If AI picked up last stick, AI won
                playerWin = false;
                break;
            }

            //Model takes turn based on random pick from weighted smart map of choices
            var num = this.chooseNum(this.smartMap[sticksLeft.toString()]);
            Logger.debug('NUMBER CHOSEN BY SIM: ', num)

            /*var weighted = this.smartMap[sticksLeft.toString()];
            var randNum = Math.floor((Math.random() * 100) + 1);
            var num;

            Logger.debug('ranges: ', weighted[1], ', ', (weighted[1]+weighted[2]), ', ', (weighted[1]+weighted[2]+weighted[3]), ', num is:', randNum);
            if(randNum <= weighted[1]){
                num = 1;
            }
            else if((weighted[1] < randNum) && (randNum <= (weighted[1]+weighted[2]))){
                num = 2;
            }
            else if(((weighted[1]+weighted[2]) < randNum) && (randNum <= 100)){
                num = 3;
            }

            Logger.debug('RNG Turn');
            /*var limit = (sticksLeft < 3) ? sticksLeft : 3;
            var num = Math.floor((Math.random() * limit) + 1);*/

            removeSticks(num);

            if(sticksLeft<=0) playerWin = true;
        }


        this.updateAI();
    }

    /**
     * This function determines the 
     *
     */
    this.chooseNum = function(weighted_map){
        var randNum = Math.floor((Math.random() * 10000) + 100)/100;
        var num;

        if(randNum <= weighted_map[1]){
            num = 1;
        }
        else if((weighted_map[1] < randNum) && (randNum <= (weighted_map[1]+weighted_map[2]))){
            num = 2;
        }
        else if(((weighted_map[1]+weighted_map[2]) < randNum) && (randNum <= 100)){
            num = 3;
        }

        return num;
    }
}
