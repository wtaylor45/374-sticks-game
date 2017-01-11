var moves;
var map;
function AI(){
    this.takingTurn = false;

    this.init = function(){
        map = [];
        var vals = [33, 33, 34];
        for(var i = 21; i > 0; i--){
            map[i] = vals;
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
          removeSticks(num);
          moves[sticksLeft] = num;
          
          this.takingTurn = false;
        }, 1000);
    }

    this.updateAI = function(){
        var change = 6;
        if(playerWin){
            change *= -1;
        }
        for(var i = 21; i > 0; i--){
            if(typeof moves[i] == 'object'){
                var vals = map[i];
                var spot = moves[i];
                for(var j in vals){
                    if (j == spot-1){
                        vals[j]+=change;
                    }
                    else{
                        vals[j]-=change/2;
                    }
                }
                map[i] = vals;
            }
        }
        console.log(map);
    }
}