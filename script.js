const black = "#000000"
const white = "#ffffff"
let drawing = false


function get_canvas_coords(x, y) {
    return {
        x: Math.round(x / canvas.innerWidth),
        y: Math.round(y / canvas.innerHeight)
    }
}

function get_pixel(x, y) {
    let coords = get_canvas_coords(x, y)
    
    return ctx.getImageData(coords.x, coords.y, 1, 1).data
}

function draw(x, y) {
    if(drawing) {
        let coords = get_canvas_coords(x, y)
        
        ctx.fillStyle = color
        ctx.fillRect(coords.x, coords.y, 1, 1)
    }
}



onload = (e) => {
    canvas  = document.getElementsByTagName("canvas")[0]
    ctx     = canvas.getContext("2d")
    
    ctx.fillStyle = black
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    canvas.addEventListener("mousedown", (e) => {
        drawing = true
        
        let target = get_pixel(e.offsetX, e.offsetY)

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
}



document.addEventListener("keydown", (e) => {
    e.preventDefault()
    //
})

document.addEventListener("keyup", (e) => {
    e.preventDefault()
    //
})
