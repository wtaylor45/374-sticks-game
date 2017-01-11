var moves;
var map;
function AI(){
    this.takingTurn = false;

    this.init = function(){
        /*
        map = [];
        var vals = [33, 33, 34];
        for(var i = 21; i > 0; i--){
            map[i] = vals;
        }*/
        map = {};
        var vals = [33, 33, 34];
        for(var i = 21; i > 0; i--){
            map[i.toString()] = vals;
        }
        console.log(map);
    }

    this.takeTurn = function(){
        this.takingTurn = true;

        setTimeout(function(){
          //Random pick from 1 to 3:
          var num = Math.floor((Math.random() * 3) + 1);          
          if(num > sticksLeft){
              num = sticksLeft;
          }
          moves[sticksLeft.toString()] = num;
          removeSticks(num);
          
          this.takingTurn = false;
        }, 1000);
    }

    this.updateAI = function(){
        var change = 6;
        if(playerWin){
            change *= -1;
        }
        for(var i = 21; i > 0; i--){
            console.log(i + ': ' + moves[i]);
            if(i.toString() in map){
                var cur_vals = map[i];
                console.log(cur_vals);
                var spot = moves[i];
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
}