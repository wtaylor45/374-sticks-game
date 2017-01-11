function Player(){
    this.takeTurn = function(choice){
        sticksLeft -= choice;
        if(sticksLeft <= 0){
            gameOver = true;
            humanLost = true;
        }
    }
}
