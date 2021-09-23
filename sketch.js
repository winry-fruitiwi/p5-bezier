/*
author Winry
@date 2021.09.23

version comments draft
    initial commit, blank project
    version comments, here
    use bezier function with mouse-controlled point
    make wlerp
    make wlerp 2D
    bezier function to make mouse-controllable control point, cubic
    implementing lerp from scratch: one dimension (number line)
    quadratic lerp method: 3 lerp calls between 3 points
    cubic lerp method
        begin +end shape
    bezier lerp mesh with t
    refactor code for p5.Vector.lerp
    make each vertex a particle with velocity, edges
    advanced project:
        drag and drop demo
        add hover effect
        transfer drag and drop code into p5-bezier
    Cody's super advanced project:
        <all caps> particle split upon contact!! <end all caps>

 */
let font
let a
let b
let c
let d

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    a = new p5.Vector(0, height/2)
    c = new p5.Vector(400, 300)
    d = new p5.Vector(width, height/2)
}

function draw() {
    background(209, 80, 30)
    // we can get the beziers now!
    bezier_example()
}


function bezier_example() {
    // control b with mouse!
    b = new p5.Vector(mouseX, mouseY)
    // bezier() tries to make a filled shape and I dislike it.
    noFill()
    // if (stroke == black) {you cannot see, and that's bad}
    stroke(0, 0, 100)
    // this is where we actually draw the bezier!
    bezier(a.x, a.y,
           b.x, b.y,
           c.x, c.y,
           d.x, d.y)
    // we can also visualize the points!
    circle(a.x, a.y, 8)
    circle(b.x, b.y, 8)
    circle(c.x, c.y, 8)
    circle(d.x, d.y, 8)
}
