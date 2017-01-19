var moves;
var map;
function AI(){
    this.takingTurn = false;

    this.init = function(){
        map = {};
        for(var i = 21; i > 0; i--){
            map[i.toString()] = [i, 33, 33, 34];
        }
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
        var keys = Object.keys(moves);
        for(var i=1; i<keys.length; i++){
            var key = keys[i]
            if(key in map){
                console.log(key + ":" + moves[key]);
                var cur_vals = map[key];
                console.log(cur_vals);
                var spot = moves[key];
                for(var j=1; j<cur_vals.length; j++){
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
        $('#excelDataTable').empty();
        buildHtmlTable('#excelDataTable');

    }
}
