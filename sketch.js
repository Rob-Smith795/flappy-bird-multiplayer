jump=3;
gravity=1/8;
space=80;
speed=1;
projectile_speed=5;
projectile_size=10;
player1_score=0;
single_player_high_score=0;
player1_high_score=0;
player2_score=0;
player2_high_score=0;
multiplayer=true;
player1_y = 200;
player1_y_speed = 0;
player2_y = 200;
player2_y_speed = 0;
player1_projectile = [false,0,0];
player2_projectile = [false,0,0];
rectangle1_x = 200;
rectangle2_x = 400;
gap1=RandomInt(40,360-space);
gap2=RandomInt(40,360-space);
player1_game_over = false;
player2_game_over = false;
game_time=0;
screen="home"



function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (screen=="home") {
    background(0,255,255);
    fill(0,255,0);
    stroke(0,0,0)
    triangle(160,160,160,240,240,200);
    fill(0,0,0);
    noStroke()
    textSize(20);
    textAlign(RIGHT,CENTER);
    text("Single player",150,340);
    textAlign(LEFT,CENTER);
    text("Multiplayer",250,340);
    textAlign(LEFT,BOTTOM);
    circle(190,340,20);
    circle(210,340,20);
    rect(190,330,20,20);
    fill(0,255,0);
    if (multiplayer) {
      circle(210,340,16);
    } else {
      circle(190,340,16);
    }
  }
  if (screen=="game") {
    background(0,255,255);
    if (!multiplayer) {
      player2_game_over = true;
    }
    draw_obstacles();
    move_projectiles();
    draw_player1();
    draw_player2();
    noStroke();
    textSize(20);
    fill(0,0,0);
    if (!multiplayer) {
      text("Score: "+player1_score,20,20);
      text("High score: "+single_player_high_score,20,50);
    }
    else {
      text("Score: "+player2_score,200,20);
      text("High score: "+player2_high_score,200,50);
      text("Score: "+player1_score,20,20);
      text("High score: "+player1_high_score,20,50);
  }
  check_projectile_collision();
  check_game_end();
  game_time+=1
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player2_y_speed=-jump;
  }
  if (key === "w") {
    player1_y_speed=-jump;
  }
  if (multiplayer && !(player2_game_over) && game_time>30) {
    if (keyCode === LEFT_ARROW && !(player2_projectile[0])) {
      player2_projectile=[true,240-projectile_size,player2_y-15-(projectile_size/2)];
    }
  }
  if (multiplayer && !(player1_game_over) && game_time>30) {
    if (key === "d" && !(player1_projectile[0])) {
      player1_projectile=[true,91,player1_y-15-(projectile_size/2)];
    }
  }
}

function mousePressed() {
  if (screen=="home") {
    if ((get(mouseX,mouseY)[0]==0 && get(mouseX,mouseY)[1]==255 && get(mouseX,mouseY)[2]==0) || (get(mouseX,mouseY)[0]==0 && get(mouseX,mouseY)[1]==0 && get(mouseX,mouseY)[2]==0)) {
      if (mouseY<300) {
        screen="game";
        player1_score=0;
        player2_score=0;
        player1_y = 200;
        player1_y_speed = 0;
        player2_y = 200;
        player2_y_speed = 0;
        player1_projectile = [false,0,0];
        player2_projectile = [false,0,0];
        rectangle1_x = 200;
        rectangle2_x = 400;
        gap1=RandomInt(40,360-space);
        gap2=RandomInt(40,360-space);
        player1_game_over = false;
        player2_game_over = false;
        game_time=0;
      }
      else if (mouseX>160 && mouseX<240) {multiplayer=!multiplayer;}
    }
  }
  if (screen=="game" && player1_game_over && player2_game_over) {
    if (mouseX>=230 && mouseX<=270 && mouseY>=300 && mouseY<=340) {
      player1_score=0;
      player2_score=0;
      player1_y = 200;
      player1_y_speed = 0;
      player2_y = 200;
      player2_y_speed = 0;
      player1_projectile = [false,0,0];
      player2_projectile = [false,0,0];
      rectangle1_x = 200;
      rectangle2_x = 400;
      gap1=RandomInt(40,360-space);
      gap2=RandomInt(40,360-space);
      player1_game_over = false;
      player2_game_over = false;
      game_time=0;
    } else if (mouseX>=130 && mouseX<=170 && mouseY>=300 && mouseY<=340) {screen="home";}
  }
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw_player1() {
  textSize(30);
  if (!(player1_game_over)) {
    player1_y_speed+=gravity;
    player1_y+=player1_y_speed;
    text("🦅", 60, player1_y);
  } else if (!(multiplayer)) {
    text("🦅", 60, player1_y);
  }
}

function draw_player2() {
  textSize(30);
  if (!(player2_game_over)) {
    player2_y_speed+=gravity;
    player2_y+=player2_y_speed;
    text("🐖", 240, player2_y);
  }
}

function draw_obstacles() {
  fill(0,255,0);
  stroke(0,0,0);
  strokeWeight(1);
  rect(rectangle1_x, 0, 40, gap1);
  rect(rectangle1_x, gap1+space, 40, 400-(gap1+space));
  rect(rectangle2_x, 0, 40, gap2);
  rect(rectangle2_x, gap2+space, 40, 400-(gap2+space));
  if (!(player1_game_over && player2_game_over)) {
    rectangle1_x-=1;
    rectangle2_x-=1;
    if (rectangle1_x<=0) {
      rectangle1_x=400;
      gap1=RandomInt(40,360-space);
      if (!(player1_game_over)) {
        player1_score+=1;
      }
      if (!(player2_game_over)) {
        player2_score+=1;
      }
    }
    if (rectangle2_x<=0) {
      rectangle2_x=400;
      gap2=RandomInt(40,360-space);
      if (!(player1_game_over)) {
        player1_score+=1;
      }
      if (!(player2_game_over)) {
        player2_score+=1;
      }
    }
  }
}

function check_game_end() {
  img1 = get(rectangle1_x+1,1,38,gap1-2);
  img2 = get(rectangle2_x+1,1,38,gap2-2);
  img3 = get(rectangle1_x+1,gap1+space+1,38,398-(gap1+space));
  img4 = get(rectangle2_x+1,gap2+space+1,38,398-(gap2+space));
  if (player1_y>=400 || player1_y<=0 || player2_y>=400 || player2_y<=0 || check_overlap(img1,[[0,255,0],[255,0,0],[0,0,255]]) || check_overlap(img2,[[0,255,0],[255,0,0],[0,0,255]]) || check_overlap(img3,[[0,255,0],[255,0,0],[0,0,255]]) || check_overlap(img4,[[0,255,0],[255,0,0],[0,0,255]])) {
    if (player1_y>=400 || player1_y<=0) {
      player1_game_over=true
    }
    if (player2_y>=400 || player2_y<=0) {
      player2_game_over=true
    }
    if (check_overlap(img1,[[0,255,0],[255,0,0],[0,0,255]]) || check_overlap(img3,[[0,255,0],[255,0,0],[0,0,255]])) {
      if (rectangle1_x<150) {
        player1_game_over=true;
      } else {
        player2_game_over=true;
      }
    }
    if (check_overlap(img2,[[0,255,0],[255,0,0],[0,0,255]]) || check_overlap(img4,[[0,255,0],[255,0,0],[0,0,255]])) {
      if (rectangle2_x<150) {
        player1_game_over=true;
      } else {
        player2_game_over=true;
      }
    }
  }
  if (player1_game_over && player2_game_over) {
      textAlign(CENTER);
      fill(0,0,0);
      stroke(0,0,0);
      strokeWeight(1);
    if (!multiplayer) {
      textSize(100);
      text("GAME", 200, 180);
      text("OVER", 200, 300);
    } else {
      textSize(60);
      if (player1_score>player2_score) {
        text("PLAYER 1", 200, 180);
        text("WINS", 200, 260);
      }
      else if (player2_score>player1_score) {
        text("PLAYER 2", 200, 180);
        text("WINS", 200, 260);
      }
      else {text("TIE", 200, 200);}
    }
    if (!multiplayer) {
      if (player1_score>single_player_high_score) {
        single_player_high_score=player1_score
      }
    } else {
      if (player1_score>player1_high_score) {
        player1_high_score=player1_score
      }
      if (player2_score>player2_high_score) {
        player2_high_score=player2_score
      }
    }
    textAlign(CENTER,CENTER);
    textSize(40);
    fill(255,255,255);
    rect(130,300,40,40);
    fill(0,0,0);
    text("⌂",150,320);
    fill(255,255,255);
    rect(230,300,40,40);
    fill(0,0,0);
    textSize(35);
    text("↻",250,322);
    textAlign(LEFT,BOTTOM);
  }
}

function check_overlap(img,colour_list) {
  img.loadPixels()
  Overlapping=false;
  colours=0;
  for (let i=0; i<img.pixels.length;i+=4) {
    for (let j = 0; j < colour_list.length; j+=1) {
      if (img.pixels[i]==colour_list[j][0] && (img.pixels[i+1]==colour_list[j][1] || (colour_list[j][0]==0 && colour_list[j][1]==255 && colour_list[j][2]==0)) && img.pixels[i+2]==colour_list[j][2]) {
        colours=1;
        break;
      }
    }
    if (colours==0) {
      Overlapping=true
      break
    }
    colours=0
  }
  return Overlapping;
}

function move_projectiles() {
  if (player1_projectile[0]) {
    player1_projectile[1]+=projectile_speed
    if (player1_projectile[1]>=400-projectile_size) {
      player1_projectile[0]=false
    }
    fill(255,0,0);
    noStroke();
    rect(round(player1_projectile[1]), round(player1_projectile[2]), ceil(projectile_size), ceil(projectile_size));
  }
  if (player2_projectile[0]) {
    player2_projectile[1]-=projectile_speed;
    if (player2_projectile[1]<=0) {
      player2_projectile[0]=false;
    }
    fill(0,0,255);
    noStroke();
    rect(round(player2_projectile[1]), round(player2_projectile[2]), ceil(projectile_size), ceil(projectile_size));
  }
}

function check_projectile_collision() {
  if (player1_projectile[0]) {
    img1=get(round(player1_projectile[1]), round(player1_projectile[2]), ceil(projectile_size), ceil(projectile_size));
    if (check_overlap(img1,[[255,0,0],[0,0,255]])) {
      player2_score-=1;
      player2_y_speed+=1;
      player1_projectile[0]=false;
      if (player2_score<0) {
        player2_game_over=true;
        player2_score=0
      }
    }
  }
  if (player2_projectile[0]) {
    img2=get(round(player2_projectile[1]), round(player2_projectile[2]), ceil(projectile_size), ceil(projectile_size));
    if (check_overlap(img2,[[0,0,255]])) {
      player1_score-=1;
      player1_y_speed+=1;
      player2_projectile[0]=false;
      if (player1_score<0) {
        player1_game_over=true;
        player1_score=0
      }
    }
  }
}
