const black = "#000000"
const white = "#ffffff"



function draw(x, y) {
    if(drawing) {
        ctx.fillStyle = color
        ctx.fillRect(Math.round(x), Math.round(y), 1, 1)
    }
}



document.addEventListener("load", (e) => {
    canvas  = document.getElementsByTagName("canvas")[0]
    ctx     = canvas.getContext("2d")
    
    ctx.fillStyle = black
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    canvas.addEventListener("mousedown", (e) => {
        drawing = true

        let target = ctx.getImageData(x, y, 1, 1).data

        let is_black =  target[0] < 128
                    &&  target[1] < 128
                    &&  target[2] < 128

        if(is_black)    { color = white }
        else            { color = black }
        
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
