
/*
 This circle handles drag and drop. Whenever the mouse clicks within our
  area, an offset vector is created. It points from the center of our vertex
  to our mouseX, mouseY point.

  When dragging, we use this offset to calculate how the vertex's show
   method displays it.
 */
// if we press our mouse, check all Vertices on the canvas with our current
// (mouseX, mouseY) to see if they've been pressed.
// TODO if there are lots of objects on screen, we can use a quadtree to
//  reduce the number of checks, but since this is O(n) time, it's likely
//  unnecessary.


/*
 This circle handles drag and drop. Whenever the mouse clicks within our
  area, an offset vector is created. It points from the center of our vertex
  to our mouseX, mouseY point.

  When dragging, we use this offset to calculate how the vertex's show
   method displays it.
 */
class draggableVertex {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r

        // offsets help us calculate where to display our vertex while
        // we're dragging it, since our mouse coordinates constantly update.
        // we want the difference vector between the center of our circle and
        // and the point where our mouse clicked to start dragging
        this.offsetX = 0
        this.offsetY = 0
        this.dragging = false

        this.hovering = false
    }

    // (x, y) refers to pointer_x and pointer_y, the coordinates of the
    // mouse dragging; this method will be called as show(mouseX, mouseY)
    show(x, y) {
        fill(209, 80, 30)
        stroke(255)

        // have I been clicked? /scared
        if (this.dragging) {
            // we need an offset so we can display where we
            // really were earlier and where the mouse really is. So, we
            // can't absolutely set this.x to x, we have to have a modifier
            // to help us detect where we were originally.
            // see comment where the offsets are for explanation

            this.x = x - this.offsetX
            this.y = y - this.offsetY
        }

        if (this.hovering) {
            fill(209, 80, 60)
        }

        circle(this.x, this.y, this.r*2)
    }

    // this is called on every Vertex on the canvas. we want to check if the
    // mouse is within our vertex, and if so, update our offsets. the offset
    // is the vector from the origin to the point where the mouse clicked.
    pressed(x, y) {
        this.offsetY = y - this.y
        this.offsetX = x - this.x
        this.dragging = true
    }

    // this should be called for every Vertex on the canvas whenever the
    // mouseReleased() event fires. we set our dragging flag to false :)
    notPressed(x, y) {
        this.dragging = false
    }
    // a simple "does our Vertex area contain the point where the mouse
    // clicked" boolean function
    contains(x, y) {
        // don't forget the this dots!
        let d = dist(x, y, this.x, this.y)
        return d < this.r
    }
}
