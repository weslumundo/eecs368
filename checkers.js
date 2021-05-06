let board = [
    ["X","B","X","B","X","B","X","B"],
    ["B","X","B","X","B","X","B","X"],
    ["X","B","X","B","X","B","X","B"],
    ["O","X","O","X","O","X","O","X"],
    ["X","O","X","O","X","O","X","O"],
    ["R","X","R","X","R","X","R","X"],
    ["X","R","X","R","X","R","X","R"],
    ["R","X","R","X","R","X","R","X"]
];

/*test boards
let board = [
    ["Q","O","X","O","X","O","X","Q"],
    ["O","O","O","X","B","X","B","X"],
    ["X","O","O","O","X","O","X","O"],
    ["O","X","B","X","B","X","O","X"],
    ["X","O","X","Q","X","O","X","O"],
    ["O","X","B","X","B","O","O","O"],
    ["X","O","X","O","X","O","Q","O"],
    ["Q","X","O","O","O","X","R","K"]
];

let board = [
    ["X","O","X","O","X","O","X","O"],
    ["O","X","O","X","O","X","O","X"],
    ["X","O","X","O","X","O","X","O"],
    ["O","X","O","X","O","X","O","X"],
    ["X","O","X","O","X","O","X","O"],
    ["O","X","O","X","O","X","O","O"],
    ["X","O","X","O","X","O","X","O"],
    ["O","X","O","O","O","X","O","X"]
];
*/

let its = [//int to string
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7"
];

//initiate elements array
let space = [[],[],[],[],[],[],[],[]];

//start reds turn
function run(){
    draw();
    redTurnSetup();
}

//function to update the front end to reflect the board
function draw(){
    for(let i=0;i<=7;i++){
        for(let j=0;j<=7;j++){
            if(board[i][j]=="B"){
                space[i][j].firstChild.src="assets/blackChecker.png";
            }
            else if(board[i][j]=="R"){
                space[i][j].firstChild.src="assets/redChecker.png";
            }
            else if(board[i][j]=="K"){
                space[i][j].firstChild.src="assets/blackKing.png";
            }
            else if(board[i][j]=="Q"){
                space[i][j].firstChild.src="assets/redKing.png";
            }
            else if(board[i][j]=="O"){
                space[i][j].firstChild.src="assets/empty.png";
            }
        }
    }
}

//remove all hover highlights and set all divs to do nothing on click
function clear(){
    for(let i=0;i<=7;i++){
        for(let j=0;j<=7;j++){
            space[i][j].classList.remove("active");
            space[i][j].onclick = ()=> function(){};
        }
    }
}

//set all pieces to start their turn when clicked
function redTurnSetup(){
    for(let i=0;i<=7;i++){
        for(let j=0;j<=7;j++){
            if(board[i][j]=="R"){
                space[i][j].classList.add("active");
                space[i][j].onclick = ()=> redTurn(i,j);
            }
            else if(board[i][j]=="Q"){
                space[i][j].classList.add("active");
                space[i][j].onclick = ()=> redKingTurn(i,j);
            }
        }
    }
}

function blackTurnSetup(){
    for(let i=0;i<=7;i++){
        for(let j=0;j<=7;j++){
            if(board[i][j]=="B"){
                space[i][j].classList.add("active");
                space[i][j].onclick = ()=> blackTurn(i,j);
            }
            else if(board[i][j]=="K"){
                space[i][j].classList.add("active");
                space[i][j].onclick = ()=> blackKingTurn(i,j);
            }
        }
    }
}

//set piece to show its moves and set the buttons, also set your self to go back to turnsetup and cancel this move
function redTurn(i,j){
    clear();
    space[i][j].classList.add("active");
    space[i][j].firstChild.src = "assets/redChecker2.png";
    space[i][j].onclick = ()=> {
        space[i][j].firstChild.src = "assets/redChecker.png";
        clear();
        redTurnSetup();
    }
    if(j>0){
        if(i>0){
            if(board[i-1][j-1]=="O"){
                space[i-1][j-1].classList.add("active");
                space[i-1][j-1].onclick = ()=> redMove(i,j,i-1,j-1);
            }
            else if(board[i-1][j-1]=="B"||board[i-1][j-1]=="K"){
                if(i-1>0){
                    if(j-1>0){
                        if(board[i-2][j-2]=="O"){
                            space[i-2][j-2].classList.add("active");
                            space[i-2][j-2].onclick = ()=> redKillMove(i,j,i-1,j-1,i-2,j-2);
                        }
                    }
                }
            }
        }
    }
    if(j<7){
        if(i>0){
            if(board[i-1][j+1]=="O"){
                space[i-1][j+1].classList.add("active");
                space[i-1][j+1].onclick = ()=> redMove(i,j,i-1,j+1);
            }
            else if(board[i-1][j+1]=="B"||board[i-1][j+1]=="K"){          
                if(j+1<7){
                    if(i-1>0){
                        if(board[i-2][j+2]=="O"){
                            space[i-2][j+2].classList.add("active");
                            space[i-2][j+2].onclick = ()=> redKillMove(i,j,i-1,j+1,i-2,j+2);
                        }
                    }
                }
            }
        }
    }
}

function blackTurn(i,j){
    clear();
    space[i][j].classList.add("active");
    space[i][j].firstChild.src = "assets/blackChecker2.png";
    space[i][j].onclick = ()=> {
        space[i][j].firstChild.src = "assets/blackChecker.png";
        clear();
        blackTurnSetup();
    }
    if(j>0){
        if(i<7){
            if(board[i+1][j-1]=="O"){
                space[i+1][j-1].classList.add("active");
                space[i+1][j-1].onclick = ()=> blackMove(i,j,i+1,j-1);
            }
            else if(board[i+1][j-1]=="R"||board[i+1][j-1]=="Q"){
                if(i+1<7){
                    if(j-1>0){
                        if(board[i+2][j-2]=="O"){
                            space[i+2][j-2].classList.add("active");
                            space[i+2][j-2].onclick = ()=> blackKillMove(i,j,i+1,j-1,i+2,j-2);
                        }
                    }
                }
            }
        }
    }
    if(j<7){
        if(i<7){
            if(board[i+1][j+1]=="O"){
                space[i+1][j+1].classList.add("active");
                space[i+1][j+1].onclick = ()=> blackMove(i,j,i+1,j+1);
            }
            else if(board[i+1][j+1]=="R"||board[i+1][j+1]=="Q"){          
                if(j+1<7){
                    if(i+1<7){
                        if(board[i+2][j+2]=="O"){
                            space[i+2][j+2].classList.add("active");
                            space[i+2][j+2].onclick = ()=> blackKillMove(i,j,i+1,j+1,i+2,j+2);
                        }
                    }
                }
            }
        }
    }
}

function redKingTurn(i,j){
    clear();
    space[i][j].classList.add("active");
    space[i][j].firstChild.src = "assets/redKing2.png";
    space[i][j].onclick = ()=> {
        space[i][j].firstChild.src = "assets/redKing.png";
        clear();
        redTurnSetup();
    }
    if(j>0){
        if(i>0){
            if(board[i-1][j-1]=="O"){
                space[i-1][j-1].classList.add("active");
                space[i-1][j-1].onclick = ()=> redKingMove(i,j,i-1,j-1);
            }
            else if(board[i-1][j-1]=="B"||board[i-1][j-1]=="K"){
                if(i-1>0){
                    if(j-1>0){
                        if(board[i-2][j-2]=="O"){
                            space[i-2][j-2].classList.add("active");
                            space[i-2][j-2].onclick = ()=> redKingKillMove(i,j,i-1,j-1,i-2,j-2);
                        }
                    }
                }
            }
        }
        if(i<7){
            if(board[i+1][j-1]=="O"){
                space[i+1][j-1].classList.add("active");
                space[i+1][j-1].onclick = ()=> redKingMove(i,j,i+1,j-1);
            }
            else if(board[i+1][j-1]=="B"||board[i+1][j-1]=="K"){
                if(i+1<7){
                    if(j-1>0){
                        if(board[i+2][j-2]=="O"){
                            space[i+2][j-2].classList.add("active");
                            space[i+2][j-2].onclick = ()=> redKingKillMove(i,j,i+1,j-1,i+2,j-2);
                        }
                    }
                }
            }
        }
    }
    if(j<7){
        if(i>0){
            if(board[i-1][j+1]=="O"){
                space[i-1][j+1].classList.add("active");
                space[i-1][j+1].onclick = ()=> redKingMove(i,j,i-1,j+1);
            }
            else if(board[i-1][j+1]=="B"||board[i-1][j+1]=="K"){          
                if(i-1>0){
                    if(j+1<7){
                        if(board[i-2][j+2]=="O"){
                            space[i-2][j+2].classList.add("active");
                            space[i-2][j+2].onclick = ()=> redKingKillMove(i,j,i-1,j+1,i-2,j+2);
                        }
                    }
                }
            }
        }
        if(i<7){
            if(board[i+1][j+1]=="O"){
                space[i+1][j+1].classList.add("active");
                space[i+1][j+1].onclick = ()=> redKingMove(i,j,i+1,j+1);
            }
            else if(board[i+1][j+1]=="B"||board[i+1][j+1]=="K"){          
                if(i+1<7){
                    if(j+1<7){
                        if(board[i+2][j+2]=="O"){
                            space[i+2][j+2].classList.add("active");
                            space[i+2][j+2].onclick = ()=> redKingKillMove(i,j,i+1,j+1,i+2,j+2);
                        }
                    }
                }
            }
        }
    }
}

function blackKingTurn(i,j){
    clear();
    space[i][j].classList.add("active");
    space[i][j].firstChild.src = "assets/blackKing2.png";
    space[i][j].onclick = ()=> {
        space[i][j].firstChild.src = "assets/blackKing.png";
        clear();
        blackTurnSetup();
    }
    if(j>0){
        if(i>0){
            if(board[i-1][j-1]=="O"){
                space[i-1][j-1].classList.add("active");
                space[i-1][j-1].onclick = ()=> blackKingMove(i,j,i-1,j-1);
            }
            else if(board[i-1][j-1]=="R"||board[i-1][j-1]=="Q"){
                if(i-1>0){
                    if(j-1>0){
                        if(board[i-2][j-2]=="O"){
                            space[i-2][j-2].classList.add("active");
                            space[i-2][j-2].onclick = ()=> blackKingKillMove(i,j,i-1,j-1,i-2,j-2);
                        }
                    }
                }
            }
        }
        if(i<7){
            if(board[i+1][j-1]=="O"){
                space[i+1][j-1].classList.add("active");
                space[i+1][j-1].onclick = ()=> blackKingMove(i,j,i+1,j-1);
            }
            else if(board[i+1][j-1]=="R"||board[i+1][j-1]=="Q"){
                if(i+1<7){
                    if(j-1>0){
                        if(board[i+2][j-2]=="O"){
                            space[i+2][j-2].classList.add("active");
                            space[i+2][j-2].onclick = ()=> blackKingKillMove(i,j,i+1,j-1,i+2,j-2);
                        }
                    }
                }
            }
        }
    }
    if(j<7){
        if(i>0){
            if(board[i-1][j+1]=="O"){
                space[i-1][j+1].classList.add("active");
                space[i-1][j+1].onclick = ()=> blackKingMove(i,j,i-1,j+1);
            }
            else if(board[i-1][j+1]=="R"||board[i-1][j+1]=="Q"){          
                if(i-1>0){
                    if(j+1<7){
                        if(board[i-2][j+2]=="O"){
                            space[i-2][j+2].classList.add("active");
                            space[i-2][j+2].onclick = ()=> blackKingKillMove(i,j,i-1,j+1,i-2,j+2);
                        }
                    }
                }
            }
        }
        if(i<7){
            if(board[i+1][j+1]=="O"){
                space[i+1][j+1].classList.add("active");
                space[i+1][j+1].onclick = ()=> blackKingMove(i,j,i+1,j+1);
            }
            else if(board[i+1][j+1]=="R"||board[i+1][j+1]=="Q"){          
                if(i+1<7){
                    if(j+1<7){
                        if(board[i+2][j+2]=="O"){
                            space[i+2][j+2].classList.add("active");
                            space[i+2][j+2].onclick = ()=> blackKingKillMove(i,j,i+1,j+1,i+2,j+2);
                        }
                    }
                }
            }
        }
    }
}

//move piece from 1st position to second position, also handels kinging and winning
function redMove(i1,j1,i2,j2){
    clear();
    board[i1][j1] = "O";
    board[i2][j2] = "R";
    if(i2==0){
        board[i2][j2] = "Q";
    }
    draw();
    if(checkBlack()){
        winner(1);
    }
    else{
        blackTurnSetup();
    }
}

function blackMove(i1,j1,i2,j2){
    clear();
    board[i1][j1] = "O";
    board[i2][j2] = "B";
    if(i2==7){
        board[i2][j2] = "K";
    }
    draw();
    if(checkRed()){
        winner(0);
    }
    else{
        redTurnSetup();
    }
}

function redKingMove(i1, j1, i2, j2){
    clear();
    board[i1][j1] = "O";
    board[i2][j2] = "Q";
    draw();
    if(checkBlack()){
        winner(1);
    }
    else{
        blackTurnSetup();
    }
}

function blackKingMove(i1, j1, i2, j2){
    clear();
    board[i1][j1] = "O";
    board[i2][j2] = "K";
    draw();
    if(checkRed()){
        winner(0);
    }
    else{
        redTurnSetup();
    }
}

//jump over a piece and kill it, handels kinging and winning
function redKillMove(i1,j1,i2,j2,i3,j3){
    clear();
    board[i1][j1]="O"
    board[i2][j2]="O"
    board[i3][j3]="R"
    if(checkBlack()){
        draw();
        winner(1);
    }
    else{
        if(i3==0){
            board[i3][j3]="Q"
            draw();
            redKingRefix(i3,j3);
        }
        else{
            draw();
            redRefix(i3,j3);
        }
    } 
}

function blackKillMove(i1,j1,i2,j2,i3,j3){
    clear();
    board[i1][j1]="O"
    board[i2][j2]="O"
    board[i3][j3]="B"
    if(checkRed()){
        draw();
        winner(0);
    }
    else{
        if(i3==7){
            board[i3][j3]="K"
            draw();
            blackKingRefix(i3,j3);
        }
        else{
            draw();
            blackRefix(i3,j3);
        }
    } 
}

function redKingKillMove(i1,j1,i2,j2,i3,j3){
    clear();
    board[i1][j1]="O"
    board[i2][j2]="O"
    board[i3][j3]="Q"
    draw();
    if(checkBlack()){
        winner(1);
    }
    else{
        redRefix(i3,j3);
    } 
}

function blackKingKillMove(i1,j1,i2,j2,i3,j3){
    clear();
    board[i1][j1]="O"
    board[i2][j2]="O"
    board[i3][j3]="K"
    draw();
    if(checkRed()){
        winner(0);
    }
    else{
        blackKingRefix(i3,j3);
    } 
}

//code for double triple jumps ect.
function redRefix(i,j){
	let check = true;
    if(j>0){
        if(i>0){
			if(board[i-1][j-1]=="B"||board[i-1][j-1]=="K"){
				if(i-1>0){
					if(j-1>0){
						if(board[i-2][j-2]=="O"){
                            check=false;
							space[i-2][j-2].classList.add("active");
							space[i-2][j-2].onclick = ()=> redKillMove(i,j,i-1,j-1,i-2,j-2);
						}
					}
				}
			}
		}
	}
    if(j<7){
        if(i>0){
            if(board[i-1][j+1]=="B"||board[i-1][j+1]=="K"){          
                if(i-1>0){
                    if(j+1<7){
                        if(board[i-2][j+2]=="O"){
                            check=false;
                            space[i-2][j+2].classList.add("active");
                            space[i-2][j+2].onclick = ()=> redKillMove(i,j,i-1,j+1,i-2,j+2);
                        }
                    }
                }
            }
        }
    }
    if(check){
        clear();
        blackTurnSetup();
    }
    else{
        space[i][j].classList.add("active");
        space[i][j].firstChild.src = "assets/redChecker2.png";
        space[i][j].onclick = ()=> {
            space[i][j].firstChild.src = "assets/redChecker.png";
            clear();
            blackTurnSetup();
        }
    }
}

function blackRefix(i,j){
    let check = true;
    if(j>0){
        if(i<7){
			if(board[i+1][j-1]=="R"||board[i+1][j-1]=="Q"){
				if(i+1<7){
					if(j-1>0){
						if(board[i+2][j-2]=="O"){
                            check=false;
							space[i+2][j-2].classList.add("active");
							space[i+2][j-2].onclick = ()=> blackKillMove(i,j,i+1,j-1,i+2,j-2);
						}
					}
				}
			}
		}
	}
    if(j<7){
        if(i<7){
            if(board[i+1][j+1]=="R"||board[i+1][j+1]=="Q"){          
                if(i+1<7){
                    if(j+1<7){
                        if(board[i+2][j+2]=="O"){
                            check=false;
                            space[i+2][j+2].classList.add("active");
                            space[i+2][j+2].onclick = ()=> blackKillMove(i,j,i+1,j+1,i+2,j+2);
                        }
                    }
                }
            }
        }
    }
    if(check){
        clear();
        redTurnSetup();
    }
    else{
        space[i][j].classList.add("active");
        space[i][j].firstChild.src = "assets/blackChecker2.png";
        space[i][j].onclick = ()=> {
            space[i][j].firstChild.src = "assets/blackChecker.png";
            clear();
            redTurnSetup();
        }
    }
}

function redKingRefix(i,j){
    let check = true;
    if(j>0){
        if(i>0){
			if(board[i-1][j-1]=="B"||board[i-1][j-1]=="K"){
				if(i-1>0){
					if(j-1>0){
						if(board[i-2][j-2]=="O"){
                            check=false;
							space[i-2][j-2].classList.add("active");
							space[i-2][j-2].onclick = ()=> redKingKillMove(i,j,i-1,j-1,i-2,j-2);
						}
					}
				}
			}
		}
        if(i<7){
			if(board[i+1][j-1]=="B"||board[i+1][j-1]=="K"){
				if(i+1<7){
					if(j-1>0){
						if(board[i+2][j-2]=="O"){
                            check=false;
							space[i+2][j-2].classList.add("active");
							space[i+2][j-2].onclick = ()=> redKingKillMove(i,j,i+1,j-1,i+2,j-2);
						}
					}
				}
			}
		}
	}
    if(j<7){
        if(i>0){
            if(board[i-1][j+1]=="B"||board[i-1][j+1]=="K"){          
                if(i-1>0){
                    if(j+1<7){
                        if(board[i-2][j+2]=="O"){
                            check=false;
                            space[i-2][j+2].classList.add("active");
                            space[i-2][j+2].onclick = ()=> redKingKillMove(i,j,i-1,j+1,i-2,j+2);
                        }
                    }
                }
            }
        }
        if(i<7){
            if(board[i+1][j+1]=="B"||board[i+1][j+1]=="K"){          
                if(i+1<7){
                    if(j+1<7){
                        if(board[i+2][j+2]=="O"){
                            check=false;
                            space[i+2][j+2].classList.add("active");
                            space[i+2][j+2].onclick = ()=> redKingKillMove(i,j,i+1,j+1,i+2,j+2);
                        }
                    }
                }
            }
        }
    }
    if(check){
        clear();
        blackTurnSetup();
    }
    else{
        space[i][j].classList.add("active");
        space[i][j].firstChild.src = "assets/redKing2.png";
        space[i][j].onclick = ()=> {
            space[i][j].firstChild.src = "assets/redKing.png";
            clear();
            blackTurnSetup();
        }
    }
}

function blackKingRefix(i,j){
    let check = true;
    if(j>0){
        if(i<7){
			if(board[i+1][j-1]=="R"||board[i+1][j-1]=="Q"){
				if(i+1<7){
					if(j-1>0){
						if(board[i+2][j-2]=="O"){
                            check=false;
							space[i+2][j-2].classList.add("active");
							space[i+2][j-2].onclick = ()=> blackKingKillMove(i,j,i+1,j-1,i+2,j-2);
						}
					}
				}
			}
		}
        if(i>0){
			if(board[i-1][j-1]=="R"||board[i-1][j-1]=="Q"){
				if(i-1>0){
					if(j-1>0){
						if(board[i-2][j-2]=="O"){
                            check=false;
							space[i-2][j-2].classList.add("active");
							space[i-2][j-2].onclick = ()=> blackKingKillMove(i,j,i-1,j-1,i-2,j-2);
						}
					}
				}
			}
		}
	}
    if(j<7){
        if(i<7){
            if(board[i+1][j+1]=="R"||board[i+1][j+1]=="Q"){          
                if(i+1<7){
                    if(j+1<7){
                        if(board[i+2][j+2]=="O"){
                            check=false;
                            space[i+2][j+2].classList.add("active");
                            space[i+2][j+2].onclick = ()=> blackKingKillMove(i,j,i+1,j+1,i+2,j+2);
                        }
                    }
                }
            }
        }
        if(i>0){
            if(board[i-1][j+1]=="R"||board[i-1][j+1]=="Q"){          
                if(i-1>0){
                    if(j+1<7){
                        if(board[i-2][j+2]=="O"){
                            check=false;
                            space[i-2][j+2].classList.add("active");
                            space[i-2][j+2].onclick = ()=> blackKingKillMove(i,j,i-1,j+1,i-2,j+2);
                        }
                    }
                }
            }
        }
    }
    if(check){
        clear();
        redTurnSetup();
    }
    else{
        space[i][j].classList.add("active");
        space[i][j].firstChild.src = "assets/blackKing2.png";
        space[i][j].onclick = ()=> {
            space[i][j].firstChild.src = "assets/blackKing.png";
            clear();
            redTurnSetup();
        }
    }
}

//returns true if all blacks are dead
function checkRed(){
    let check = true;
    for(let i=0;i<=7;i++){
        for(let j=0;j<=7;j++){
            if(board[i][j]=="R"||board[i][j]=="Q"){
                check = false;
            }
        }
    }
    return check;
}

//returns true if all blacks are dead
function checkBlack(){
    let check = true;
    for(let i=0;i<=7;i++){
        for(let j=0;j<=7;j++){
            if(board[i][j]=="B"||board[i][j]=="K"){
                check = false;
            }
        }
    }
    return check;
}

//shows winner elements
function winner(team){
    document.getElementById("win").style.visibility = "visible";
    if(team==1){
        document.getElementById("red").style.visibility = "visible";
    }
    else if(team==0){
        document.getElementById("black").style.visibility = "visible";
    }
}

//wait untill dom is loaded, fill element array, start the game.
document.addEventListener("DOMContentLoaded", ()=> {
    console.log("DOM loaded");
    for(let i=0;i<=7;i++){//y
        for(let j=0;j<=7;j++){//x
            let temp = ["c",its[j],its[i]].join('');
            space[i][j]=document.getElementById(temp);
        }
    }
    run();
})