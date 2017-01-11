function AI(){
    this.takingTurn = false;

    this.takeTurn = function(){
        if(sticksLeft <= 0){
            gameOver = true;
        }

        this.takingTurn = true;

        setTimeout(function(){
          //Random pick from 1 to 3:
          var num = Math.floor((Math.random() * 3) + 1);
          removeStick(num);
          this.takingTurn = false;
        }, 1000);
    }
}
