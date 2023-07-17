// input = 14 45 6/ 5/ X 01 7/ 6/ X 2/6
function bowlingScore(frames) {
    let score = 0
    let bonus = 0;

    let frame = frames.split(' ');
        for (let i=0; i < frame.length; i++){
            //Last frame
            if (i === frame.length-1){
                //First roll is a number
               if (!isNaN(frame[i][0])){
                   // 1/X
                   if (frame[i][1] === '/'  && frame[i][2]=== 'X'){
                       score = score + 20;
                   }
                   // 1/1
                   else if (frame[i][1] === '/'  && !isNaN(frame[i][2])){
                       score = score + 10 + parseInt(frame[i][2]);
                   }
                   // 111
                   else {
                       score = score + parseInt(frame[i][0]) + parseInt(frame[i][1]);
                   }
               }
               //first roll is a strike
               else {
                   //XXX
                   if (frame[i][2]=== 'X'){
                       score = score + 30;
                   }
                   //XX1
                   else if (!isNaN(frame[i][2])){
                       score = score + 20 + parseInt(frame[i][2]);
                   }
                   //X1/
                   else if (frame[i][2]=== '/'){
                       score = score + 20;
                   }
                   //X1
                   else{
                       score = score + 10 + parseInt(frame[i][1]);
                   }
               }
            }
            //Frames 1 to 9
            else {
                //If both rolls are numbers in a frame
                if (!isNaN(frame[i])) {
                    score = score + parseInt(frame[i][0]) + parseInt(frame[i][1]);
                }
                //If Strike or a Spare
                else {
                    //Spare followed by number on next roll
                    if (frame[i].includes('/') && !isNaN(frame[i+1][0])){
                        score= score + 10 + parseInt(frame[i+1][0]);
                    }
                    //Spare followed by Strike
                    else if (frame[i].includes('/') && frame[i+1][0] === 'X'){
                        score= score + 20;
                    }
                    else if (frame[i] ==='X'){
                        //Strike followed by number on next roll- X 12
                        if (!isNaN(frame[i+1])){
                            score = score + 10 + parseInt(frame[i+1][0]) + parseInt(frame[i+1][1]);
                        }
                        //X 1/
                        else if (frame[i+1][1]==='/'){
                            score = score + 20;
                        }
                        else if (frame[i+1] === 'X' ){
                            //two consquetive strikes X X
                            bonus = 10;
                            //X X2
                            if (!isNaN(frame[i+2][0])){
                                bonus = parseInt(frame[i+2][0]);
                            }
                            score = score + 20 + bonus;
                        }
                        //for X XX_
                        else if (frame[i+1][0] === 'X' && frame[i+1][1] === 'X'){
                            score = score+ 30;
                        }
                        //handle strike on 9th frame-
                        else if(i== 8 && frame[i+1][0] === 'X'){
                            if (frame[i+1][1] === 'X'){
                                score = score+ 30;
                            }
                            else score= score + 20 + parseInt(frame[i+1][1]);
                        }
                    }
                }
            }
        }
    return score;
}

//gutter ball
console.log(bowlingScore('00 00 00 00 00 00 00 00 00 00'), 0);

//all one game
console.log(bowlingScore('11 11 11 11 11 11 11 11 11 11'), 20);

// Perfect Game
console.log(bowlingScore('X X X X X X X X X XXX'), 300);

//Example
console.log(bowlingScore('14 45 6/ 5/ X 01 7/ 6/ X 2/6'), 133);

console.log('A spare followed by a 3 should score 16');
console.log(bowlingScore('3/ 30 00 00 00 00 00 00 00 00'), 16);
console.log('A strike followed by a 3 and 4 should score 24');
console.log(bowlingScore('X 34 00 00 00 00 00 00 00 00'), 24);