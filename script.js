const black         = [0, 0, 0, 255]
const white         = [255, 255, 255, 255]
const transparent   = [255, 255, 255, 0]
let drawing         = false
let shifting        = false



function get_canvas_coords(x, y) {
    return {
        x: Math.floor(canvas.width * x / canvas.offsetWidth),
        y: Math.floor(canvas.height * y / canvas.offsetHeight)
    }
}

function get_pixel(x, y) {
    return ctx.getImageData(x, y, 1, 1).data
}

function draw(x, y) {
    if(drawing) {
        let update  = ctx.createImageData(1, 1)

        update.data[0] = color[0]
        update.data[1] = color[1]
        update.data[2] = color[2]
        update.data[3] = color[3]

        ctx.putImageData(update, x, y)
    }
}

function resize(e) {
    if(window.innerHeight / canvas.height > window.innerWidth / canvas.width) {
        canvas.style.width  = window.innerWidth + "px"
        canvas.style.height = "auto"
    } else {
        canvas.style.height = window.innerHeight + "px"
        canvas.style.width  = "auto"
    }
}



function convert_mouse(e) {
    return get_canvas_coords(
        e.offsetX,
        e.offsetY
    )
}

function set_color(x, y) {
    if(shifting) {
        color = transparent
    } else {
        let target = get_pixel(x, y)

        let is_black =  target[0] < 128
                    &&  target[1] < 128
                    &&  target[2] < 128

        if(is_black)    { color = white }
        else            { color = black }
    }
}



function mousedown(e) {
    e.preventDefault()
    let pos = convert_mouse(e)

    drawing = true

    set_color(pos.x, pos.y)
    draw(pos.x, pos.y)
}

function mousemove(e) {
    e.preventDefault()
    let pos = convert_mouse(e)

    draw(pos.x, pos.y)
}

function mouseup(e) {
    e.preventDefault()
    let pos = convert_mouse(e)

    draw(pos.x, pos.y)
    drawing = false
}



function touchstart(e) {
    e.preventDefault()
    
    let rect = e.target.getBoundingClientRect()
    
    let pos = get_canvas_coords(
        e.targetTouches[0].pageX - rect.left,
        e.targetTouches[0].pageY - rect.top
    )
    
    drawing = true
    
    set_color(pos.x, pos.y)
    draw(pos.x, pos.y)
}

function touchmove(e) {
    e.preventDefault()
    
    let rect = e.target.getBoundingClientRect()
    
    let pos = get_canvas_coords(
        e.targetTouches[0].pageX - rect.left,
        e.targetTouches[0].pageY - rect.top
    )
    
    draw(pos.x, pos.y)
}

function touchend(e) {
    e.preventDefault()
    
    let rect = e.target.getBoundingClientRect()
    
    let pos = get_canvas_coords(
        e.changedTouches[0].pageX - rect.left,
        e.changedTouches[0].pageY - rect.top
    )
    
    draw(pos.x, pos.y)
    drawing = false
}



onload = e => {
    canvas  = document.getElementsByTagName("canvas")[0]
    ctx     = canvas.getContext("2d")

    ctx.fillStyle = black
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    canvas.addEventListener("mousedown",    mousedown)
    canvas.addEventListener("mousemove",    mousemove)
    document.addEventListener("mouseup",    mouseup)

    canvas.addEventListener("touchstart",   touchstart, { passive: false })
    canvas.addEventListener("touchmove",    touchmove,  { passive: false })
    document.addEventListener("touchend",   touchend,   { passive: false })

    resize()
}

onresize = resize



document.addEventListener("keydown", e => {
    e.preventDefault()

    switch(e.key) {
        case "Shift": shifting = true
    }
})

document.addEventListener("keyup", e => {
    e.preventDefault()

    switch(e.key) {
        case "Shift": shifting = false
    }
})
