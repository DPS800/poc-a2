class MyLine {
    constructor(penColour, penSize) {
        this.px = pwinMouseX
        this.py = pwinMouseY
        this.x = winMouseX
        this.y = winMouseY

        this.penColour = penColour
        this.penSize = penSize
    }
    show() {
        stroke(this.penColour)
        strokeWeight(this.penSize)
        line(this.px,this.py,this.x,this.y)
    }
}