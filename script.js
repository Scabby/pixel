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
})



document.addEventListener("keydown", (e) => {
    e.preventDefault()
    //
})

document.addEventListener("keyup", (e) => {
    e.preventDefault()
    //
})



canvas.addEventListener("mousedown", (e) => {
    drawing = true
    x       = e.offsetX
    y       = e.offsetY
    
    let is_black = ctx.getImageData(x, y. 1, 1).data[] < 1
    
    if(is_black)    { color = "#ffffff" }
    else            { color = "#000000" }
})

canvas.addEventListener("mousemove", (e) => {
    if(drawing) {
        draw_line(e.offsetX, e.offsetY)
    }
})

document.addEventListener("mouseup", (e) => {
    if(drawing) {
        draw_line(e.offsetX, e.offsetY)
    }
    drawing = false
})



canvas.addEventListener("touchstart", (e) => {
    e.preventDefault()
    drawing = true
}, { passive: false })

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault()
    draw = { x: e.layerX, y: e.layerY }
}, { passive: false })

document.addEventListener("touchend", (e) => {
    e.preventDefault()
    drawing = true
}, { passive: false })
