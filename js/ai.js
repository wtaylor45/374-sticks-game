function AI(){
    this.takeTurn = function(){
        if(sticksLeft <= 0){
            gameOver = true;
            humanLost = false;
        }

        setTimeout(function(){
          //Random pick from 1 to 3:
          var num = Math.floor((Math.random() * 3) + 1);
          removeStick(num);
        }, 1000);

        turn = 1;
    }
}
