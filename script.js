const black = "#000000"
const white = "#ffffff"
let drawing = false


function get_canvas_coords(x, y) {
    return {
        x: Math.floor(canvas.width * x / canvas.offsetWidth),
        y: Math.floor(canvas.height * y / canvas.offsetHeight)
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

onresize = (e) => {
    if(window.offsetHeight / canvas.height > window.offsetWidth / canvas.width) {
        canvas.style.width  = "100vw"
        canvas.style.height = "calc(" + canvas.height + "px * 100vh / " + canvas.width + "px)"
    } else {
        canvas.style.height = "100vh"
        canvas.style.width  = "calc(" + canvas.width + "px * 100vw / " + canvas.height + "px)"
    }
}



document.addEventListener("keydown", (e) => {
    e.preventDefault()
    //
})

document.addEventListener("keyup", (e) => {
    e.preventDefault()
    //
})
