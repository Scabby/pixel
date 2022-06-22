function draw(x, y) {
    if(drawing) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, 1, 1)
    }
}

document.addEventListener("load", (e) => {
    canvas  = document.getElementsByTagName("canvas")[0]
    ctx     = canvas.getContext("2d")
    
    canvas.addEventListener("mousedown", (e) => {
        drawing = true

        let target = ctx.getImageData(x, y, 1, 1).data

        let is_black =  target[0] < 128
                    &&  target[1] < 128
                    &&  target[2] < 128

        if(is_black)    { color = "#ffffff" }
        else            { color = "#000000" }
        
        draw(e.offsetX, e.offsetY)
    })

    canvas.addEventListener("mousemove", (e) => {
        draw(e.offsetX, e.offsetY)
    })

    canvas.addEventListener("mouseup", (e) => {
        draw(e.offsetX, e.offsetY)
        drawing = false
    })
    
    canvas.addEventListener("mouseleave", (e) => {
        draw(e.offsetX, e.offsetY)
        drawing = false
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
