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
    My super advanced project:
        <all caps> particle split upon contact!! <end all caps>

 */
let font

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

// this vertex class just bounces on the edges. Really should be in a different
// file to this one, but it's ok for now.
class Vertex extends p5.Vector {
    constructor(x, y) {
        super(x, y);

        // how fast and in what direction is the object moving?
        this.vel = p5.Vector.random2D().mult(random(2, 6))
        // is the object accelerating, and in what direction and magnitude?
        this.acc = new p5.Vector();
    }

    // shows the particle as a point.
    show() {
        stroke(0, 0, 255)
        strokeWeight(10);
        point(this.x, this.y)
        strokeWeight(3)
    }

    // updates the particle's position, velocity, and acceleration.
    update() {
        this.add(this.vel)
        this.vel.add(this.acc)
        this.acc.mult(0) // otherwise the object will infinitely speed up!
    }

    // what happens if we apply a force? Features Newton's Second Law.
    applyForce(f) { // f is a p5.Vector
        // F = ma, but m = 1 so F = a
        this.acc.add(f)
    }

    // now we need to make them bounce! That's the whole point of the last
    // functions other than applyForce and it's our goal.
    edges() {
        // right edge
        if (this.x > width) {
            this.x = width
            this.vel.x *= -1
        }

        // left edge
        if (this.x < 0) {
            this.x = 0
            this.vel.x *= -1
        }

        // bottom edge
        if (this.y > height) {
            this.y = height
            this.vel.y *= -1
        }

        // top edge
        if (this.y < 0) {
            this.y = 0
            this.vel.y *= -1
        }
    }

}


// fully encapsulates an example of a quadratic bezier
class Quadratic_Bezier_Example {
    constructor() {
        this.a = new p5.Vector(0, height/2)
        this.c = new p5.Vector(400, 300)
        this.d = new p5.Vector(width, height/2)
        this.p1 = new p5.Vector(random(50, 100), random(height));
        this.p2 = new p5.Vector(random(width-100, width-50), random(height));
        this.t = 1
    }

    draw() {
        background(209, 80, 30)
        // we can get the beziers now!
        // bezier_example()

        this.t = map(constrain(mouseX, this.p1.x, this.p2.x),
            this.p1.x, this.p2.x,
            0, 1);

        stroke(0, 0, 100)

        // where are the lerp points?
        strokeWeight(8)
        point(this.p1.x, this.p1.y)
        point(this.p2.x, this.p2.y)

        // We should see a line between the two points so that
        // we can effectively test where our lerp should go.
        strokeWeight(1)
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)

        // Now we can draw the lerp in a different color, above
        // everything else.
        strokeWeight(8)
        stroke(0, 80, 80);
        let lerp_item = wlerp2D(this.p1, this.p2, this.t)
        point(lerp_item.x, lerp_item.y)

        // let's test wlerp! Print to the console whether
        // my lerp is the same as p5.js lerp functions.
        if (wlerp2D(this.p1, this.p2, this.t).x !== p5.Vector.lerp(this.p1, this.p2, this.t).x &&
            wlerp2D(this.p1, this.p2, this.t).y !== p5.Vector.lerp(this.p1, this.p2, this.t).y) {
            console.log("beep beep!")
        }
        // mouseX and mouseY doesn't exist before the program
        // starts, and even if it did, we would not
        // be able to update it every frame.
        let b = new p5.Vector(mouseX, mouseY)

        // Let's see what happens with the bezier example!
        strokeWeight(3)
        // The fill is way too bright!
        noFill()
        // where's the mouse?
        point(mouseX, mouseY)
        cubic_bezier(this.a, b, this.c, this.d)
    }


}


// encapsulates an example of a cubic bezier, except the vertices bounce!
class Cubic_Bezier_Example {
    constructor() {
        // don't forget the this dots ♪ ♫ ♬
        this.a = new Vertex(0, height/2)
        this.c = new Vertex(0, 0)
        this.d = new Vertex(width, height/2)
        this.t = 1
        this.b = new Vertex(10, 10)
        // How are we going to animate with sine waves? Using an angle!
    }

    // makes a cubic bezier drawing!
    cubic_bezier(p1, p2, p3, p4) { // all of these are PVectors!
        // we'll iterate using a certain t-value between
        // 0 and 1 using a for loop

        beginShape()
        for (let t = 0; t < 1.005; t += 0.0005) {
            // we lerp between the first two points, or
            // the first anchor point and the control point
            let l1 = wlerp2D(p1, p2, t);
            // then between the second two points, or
            // the control point and second control point
            let l2 = wlerp2D(p2, p3, t);
            // and now between p3 and p4.
            let l3 = wlerp2D(p3, p4, t);
            // and then between l1 and l2!
            let l4 = wlerp2D(l1, l2, t);
            // to stretch it further: go between l2 and l3! O.o
            let l5 = wlerp2D(l2, l3, t);
            // We are done! l4 and l5.
            let l6 = wlerp2D(l4, l5, t);

            // now we draw a point at l6! We'll also make lines from
            // each control point.
            strokeWeight(3)
            vertex(l6.x, l6.y)

        }
        endShape()
        strokeWeight(1)
        line(p1.x, p1.y, p2.x, p2.y)
        line(p2.x, p2.y, p3.x, p3.y)
        line(p3.x, p3.y, p4.x, p4.y)

    }

    draw() {
        background(209, 80, 30)

        // let's test wlerp! Print to the console whether
        // my lerp is the same as p5.js lerp functions.

        // mouseX and mouseY doesn't exist before the program
        // starts, and even if it did, we would not
        // be able to update it every frame.
        // Taking this out just for a test.
        // let b = new Vertex(mouseX, mouseY)

        // Let's see what happens with the bezier example!
        strokeWeight(3)
        // The fill is way too bright!
        noFill()
        // where's the mouse?
        // point(mouseX, mouseY)
        // where's the second control point, too?
        // point(this.c.x, this.c.y)

        // This was just a test to help me figure out why my function
        // was incorrect.
        // stroke(0, 100, 100)
        // bezier(this.a.x, this.a.y,
        //        b.x, b.y,
        //        this.c.x, this.c.y,
        //        this.d.x, this.d.y)
        stroke(0, 0, 100)
        this.a.update()
        this.b.update()
        this.c.update()
        this.d.update()

        this.a.show()
        this.b.show()
        this.c.show()
        this.d.show()

        // let gravity = new p5.Vector(0, 0.1);

        // A test. That was pretty amusing because the bezier fell!
        // this.a.applyForce(gravity)
        // this.b.applyForce(gravity)
        // this.c.applyForce(gravity)
        // this.d.applyForce(gravity)

        this.a.edges()
        this.b.edges()
        this.c.edges()
        this.d.edges()

        console.log(frameRate())


        this.cubic_bezier(this.a, this.b, this.c, this.d)


    }
}

let cubic_example

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    cubic_example = new Cubic_Bezier_Example()
}


function draw() {
    cubic_example.draw()
}


function bezier_example() {
    // control b with mouse!
    b = new p5.Vector(mouseX, mouseY)
    // bezier() tries to make a filled shape and I dislike it.
    noFill()
    // if (stroke == black) {you cannot see, and that's bad}
    stroke(0, 0, 100)
    strokeWeight(1)
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

// stands for winry's lerp
function wlerp(p1, p2, t) {
    // p1 is the start point. p2 is the end point.
    // t is the lerp percentage. Lerp around
    return (1 - t)*p1 + (t)*p2
}


// stands for winry's p5.vector lerp
function wlerp2D(p1, p2, t) { // first two arguments are vectors
    return new p5.Vector(wlerp(p1.x, p2.x, t),
                         wlerp(p1.y, p2.y, t))
}

// makes a quadratic lerp function
function quadratic_bezier(p1, p2, p3) {
    // we'll iterate using a certain t-value between
    // 0 and 1 using a for loop

    beginShape()
    for (let t = 0; t < 1.0; t += 0.005) {
        // we lerp between the first two points, or
        // the first anchor point and the control point
        let l1 = wlerp2D(p1, p2, t);
        // then between the second two points, or
        // the control point and second anchor point
        let l2 = wlerp2D(p2, p3, t);
        // and now between l1 and l2.
        let l3 = wlerp2D(l1, l2, t);
        // now we draw a point there!
        vertex(l3.x, l3.y)
    }
    endShape()

}
