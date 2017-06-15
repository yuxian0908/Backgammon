var cvs,ctx;
function start() {
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
    document.getElementById("beforeGame").style.display="none";
    document.getElementById("controlmove").style.display="block";
    document.getElementById("reset").style.display="block";
    document.getElementById("start").style.display="none";
    document.getElementById("cvs").style.display="block";
}

function reset(){
    counter=0;   
    document.getElementById("showResult").style.position = "absolute";
    document.getElementById("showResult").style.top = "200px";
    document.getElementById("showResult").style.left = "100px";
    document.getElementById("turn").style.fontSize = "20px";
    document.getElementById("turn").style.color = "black";
    document.getElementById("turn").innerHTML=" ";
    start();
}

var counter=0;//判斷第幾次下棋的變數
var xPosition=[];
var yPosition=[];
var boardPos=[];
function chessPosition(){
    cvs = document.getElementById("cvs");
    var rect = cvs.getBoundingClientRect();
    var x=event.clientX-rect.left+20;
    var y=event.clientY-rect.top+20;
    xPosition[0]=50;
    yPosition[0]=50;

    for(var i=1;i<9;i++){//設定棋盤格的x像素
        xPosition[i]=xPosition[i-1]+64;
    }
    for(var j=1;j<9;j++){//設定棋盤格的x像素
        yPosition[j]=yPosition[j-1]+64;
    }

    //設定棋盤格序列
    var numberx;
    var numbery;
    for(numberx=0;numberx<9;numberx++){
        if(x-xPosition[numberx]>50){
        }
        else{
            x=xPosition[numberx];
            break;
        }
    }
    for(numbery=0;numbery<9;numbery++){
        if(y-yPosition[numbery]>50){
        }
        else{
            y=yPosition[numbery];
            break;
        }
    }
    var showX=document.getElementById("showMoveX");
    showX.innerHTML=numberx;
    var showY=document.getElementById("showMoveY");
    showY.innerHTML=numbery;

    //呼叫陣列函數
    if(counter==0){
        boardSet(boardPos,x,y);
    }
    else{
        ary(boardPos,x,y);
    }
}

//將棋盤存入陣列中，棋盤起始值
function boardSet(boardPos,x,y){
    //儲存一個棋盤陣列，每個交叉格的起始值都設定為0
    for(var i=0;i<9;i++){
        boardPos[i]=[];
        for(var j=0;j<9;j++){
            boardPos[i][j]=0;
        }
    }
    ary(boardPos,x,y);
}

//繪製棋子的樣子，判斷所下的是黑棋或白棋
function ary(Pos,x,y){    
    var showX=document.getElementById("showMoveX").innerHTML;//取得X位置
    var showY=document.getElementById("showMoveY").innerHTML;//取得Y位置
    counter++;
    //counter若是基數次為黑棋，將該交叉格設為1
    if(counter%2==1){
        if(Pos[showX][showY]==0){
            Pos[showX][showY]=1;
        }
        else if(Pos[showX][showY]!=0){
            counter--;
            alert("已經下過了");
        }    
    }
    //counter若是基數次為白棋，將該交叉格設為-1
    else if(counter%2==0){
        if(Pos[showX][showY]==0){
            Pos[showX][showY]=-1;
        }    
        else if(Pos[showX][showY]!=0){
            counter--;
            alert("已經下過了");
        }    
    }

    //繪製棋子
    if(Pos[showX][showY]==1){//counter若是基數次為黑棋
        cvs = document.getElementById("cvs");
        ctx = cvs.getContext("2d");
        ctx.beginPath();
        ctx.arc(x-4,y-4,30,0,2*Math.PI);
        ctx.fillStyle="black";
        ctx.fill();
        ctx.stroke();  
    }
    if(Pos[showX][showY]==-1){//counter若是偶數次為白棋
        cvs = document.getElementById("cvs");
        ctx = cvs.getContext("2d");
        ctx.beginPath();
        ctx.arc(x-4,y-4,30,0,2*Math.PI);
        ctx.fillStyle="white";
        ctx.fill();
        ctx.stroke();  
    }    
    decide(Pos);
}

//宣告結局
function decide(boardPos){
    var noChess=0;
    //判斷結局
    if(BorW(boardPos)==1){
        document.getElementById("showResult").style.position = "absolute";
        document.getElementById("showResult").style.top = "200px";
        document.getElementById("showResult").style.left = "10px";
        document.getElementById("turn").style.fontSize = "70px";
        document.getElementById("turn").style.color = "red";
        document.getElementById("turn").innerHTML="黑棋贏了!!";
    }
    else if(BorW(boardPos)==-1){
        document.getElementById("showResult").style.position = "absolute";
        document.getElementById("showResult").style.top = "200px";
        document.getElementById("showResult").style.left = "10px";
        document.getElementById("turn").style.fontSize = "70px";
        document.getElementById("turn").style.color = "red";
        document.getElementById("turn").innerHTML="白棋贏了!!";
    }
    else if(BorW(boardPos)==0){
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                if(boardPos[i][j]==0){
                    noChess++;
                }
            }
        }
        if(noChess==0){
            document.getElementById("turn").style.fontSize = "50px";
            document.getElementById("turn").style.color = "green";
            document.getElementById("turn").innerHTML="平手";
        }
        else{
            if(counter%2==1){
                document.getElementById("turn").innerHTML="換白棋下";
            }
            else if(counter%2==0) {
                document.getElementById("turn").innerHTML="換黑棋下";
            }   
        }
    }
}


//判斷輸贏
function BorW(ary){
    //黑贏
    var i,j;
    for(i=0;i<9;i++){   //判斷直的五個
        for(j=0;j<5;j++){  
            if(ary[i][j]+ary[i][j+1]+ary[i][j+2]+ary[i][j+3]+ary[i][j+4]==5){
                return 1;
            }
        }
    }
    for(j=0;j<9;j++){   //判斷橫的五個
        for(i=0;i<5;i++){  
            if(ary[i][j]+ary[i+1][j]+ary[i+2][j]+ary[i+3][j]+ary[i+4][j]==5){
                return 1;
            }
        }
    }
    for(i=0;i<5;i++){   //斜的五個
        for(j=0;j<5;j++){  
            if(ary[i][j]+ary[i+1][j+1]+ary[i+2][j+2]+ary[i+3][j+3]+ary[i+4][j+4]==5){
                return 1;
            }
        }
    }
    for(i=0;i<5;i++){   //斜的五個
        for(j=4;j<9;j++){  
            if(ary[i][j]+ary[i+1][j-1]+ary[i+2][j-2]+ary[i+3][j-3]+ary[i+4][j-4]==5){
                return 1;
            }
        }
    }

    //白贏
    for(i=0;i<9;i++){   //判斷直的五個
        for(j=0;j<5;j++){  
            if(ary[i][j]+ary[i][j+1]+ary[i][j+2]+ary[i][j+3]+ary[i][j+4]==-5){
                return -1;
            }
        }
    }
    for(j=0;j<9;j++){   //判斷橫的五個
        for(i=0;i<5;i++){  
            if(ary[i][j]+ary[i+1][j]+ary[i+2][j]+ary[i+3][j]+ary[i+4][j]==-5){
                return -1;
            }
        }
    }
    for(i=0;i<5;i++){   //斜的五個
        for(j=0;j<5;j++){  
            if(ary[i][j]+ary[i+1][j+1]+ary[i+2][j+2]+ary[i+3][j+3]+ary[i+4][j+4]==-5){
                return -1;
            }
        }
    }
    for(i=0;i<5;i++){   //斜的五個
        for(j=4;j<9;j++){  
            if(ary[i][j]+ary[i+1][j-1]+ary[i+2][j-2]+ary[i+3][j-3]+ary[i+4][j-4]==-5){
                return -1;
            }
        }
    }
    return 0; 
}




//移動棋盤 
var oDrag="";
var ox,oy,nx,ny,dx,dy;
function mouseDown(){
    ox=event.clientX;
    oy=event.clientY;
    oDrag=document.getElementById("moveBoard");
}
function mouseMove(){
    if (oDrag != "") {
        dx = parseInt(document.getElementById("cvsPos").style.left);
        dy = parseInt(document.getElementById("cvsPos").style.top);
        var e = e ? e : event;
        nx = e.clientX;
        ny = e.clientY;
        document.getElementById("cvsPos").style.position = "absolute";
        document.getElementById("cvsPos").style.left = (dx + (nx - ox)) + "px";
        document.getElementById("cvsPos").style.top = (dy + (ny - oy)) + "px";
        ox = nx;
        oy = ny;  
    } 
}
function mouseUp(){
    oDrag="";
}

//顯示移動區
var show=0;
function showMboard(){
    show++;
    if(show%2==1){
        document.getElementById("moveBoard").style.display = "block";
        document.getElementById("controlmove").innerHTML = "固定棋盤";
    }
    if(show%2==0){
        document.getElementById("moveBoard").style.display = "none";
        document.getElementById("controlmove").innerHTML = "移動棋盤";
    }
}

