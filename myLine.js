class MyLine {
    constructor(penColour, penSize) {
        this.px = pwinMouseX-117
        this.py = pwinMouseY-150
        this.x = winMouseX-117
        this.y = winMouseY-150

        this.penColour = penColour
        this.penSize = penSize
    }
    show() {
        stroke(this.penColour)
        strokeWeight(this.penSize)
        line(this.px,this.py,this.x,this.y)
    }
}