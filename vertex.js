
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