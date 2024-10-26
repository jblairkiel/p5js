p5.disableFriendlyErrors = true // disables FES jperformance increase

var CANVAS_SIZE_W = 600
var CANVAS_SIZE_H = 500
var custom_fps = 0

class Ellipse {
  constructor () {
    this.rand_x = Math.random() * (CANVAS_SIZE_W - 0)
    this.rand_y = Math.random() * (CANVAS_SIZE_H - 0)
    this.rand_dia = Math.random() * (80 - 0)
    this.dia_offset = Math.random() * (40 - 0)
    var col_r = Math.floor(Math.random() * (255 - 0))
    var col_g = Math.floor(Math.random() * (255 - 0))
    var col_b = Math.floor(Math.random() * (255 - 0))
    this.base_col = [col_r, col_g, col_b];

    var rand_color_range = Math.floor(Math.random() * 2)
    var new_col = 0;
    this.el_color = [];
    for (let i = 0; i < 15; i++){
      this.base_col[rand_color_range] = Math.ceil(this.base_col[rand_color_range] + 1, 255)
      new_col = [this.base_col[0], this.base_col[1], this.base_col[2]]
      this.el_color.push(new_col)
    }
  }

  get_attrs () {
    return [rand_x, rand_y, rand_dia, dia_offset]
  }

  draw () {
    var frame_picker = Math.ceil((frameCount) % 15)
    fill(color(this.el_color[frame_picker][0], this.el_color[frame_picker][1], this.el_color[frame_picker][2]))
    var diameter = Math.sin(frameCount / 20 + this.dia_offset) * this.rand_dia + this.rand_dia
    //ellipse(this.rand_x, this.rand_y, diameter, diameter)
    ellipse(this.rand_x, this.rand_y, diameter, diameter)
  }
}

class EllispeContainer {
  constructor (num_gen) {
    this.ellipses = []
    for (let index = 0; index < num_gen; index++) {
      var cur_el = new Ellipse()
      this.ellipses.push(cur_el)
    }
  }

  draw_elipse_list () {
    this.ellipses.forEach(elip => {
      elip.draw()
    })
  }
}

let rand_elipse = new EllispeContainer(400); //Still 60
//let rand_elipse = new EllispeContainer(800); //pushing it
//let rand_elipse = generate_rand_elipse(CANVAS_SIZE_W, CANVAS_SIZE_H, 1000); // 20 fps
function windowResized() {
  resizeCanvas(CANVAS_SIZE_W, CANVAS_SIZE_H);
}
function draw_fps () {
  // Display the value of
  // frameCount.
  fill(10)
  rect(1650, 40, 200, 50)
  let fps = frameRate()
  fill(0, 250, 0)
  textSize(30)
  textAlign(CENTER, CENTER)
  if (frameCount % 2 === 0){
    custom_fps = Math.floor(fps.toFixed(2))
  } 
  
  text('FPS: ' + custom_fps, 1750, 60)
}

function setup () {
  createCanvas(CANVAS_SIZE_W, CANVAS_SIZE_H)
  frameRate(60)
}

function draw () {
  background(220)
  rand_elipse.draw_elipse_list()
  draw_fps()
}
