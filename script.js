function drawLine(new_x, new_y) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    stx.moveTo(x, y)
    ctx.lineTo(new_x, new_y)
    ctx.stroke()
    ctx.closePath()
}



document.addEventListener("load", (e) => {
    canvas  = document.getElementsByTagName("canvas")[0]
    ctx     = canvas.getContext("2d")
    
    canvas.addEventListener("mousedown", (e) => {
        drawing = true
        x       = e.offsetX
        y       = e.offsetY

        let target = ctx.getImageData(x, y, 1, 1).data

        let is_black =  target[0] < 128
                    &&  target[1] < 128
                    &&  target[2] < 128

        if(is_black)    { color = "#000000" }
        else            { color = "#ffffff" }
    })

    canvas.addEventListener("mousemove", (e) => {
        if(drawing) {
            draw_line(e.offsetX, e.offsetY)
        }
    })

    canvas.addEventListener("mouseup", (e) => {
        if(drawing) {
            draw_line(e.offsetX, e.offsetY)
            drawing = false
        }
    })
    
    canvas.addEventListener("mouseleave", (e) => {
        if(drawing) {
            draw_line(e.offsetX, e.offsetY)
            drawing = false
        }
    })
})



document.addEventListener("keydown", (e) => {
    e.preventDefault()
    //
})

document.addEventListener("keyup", (e) => {
    e.preventDefault()
    //
})
