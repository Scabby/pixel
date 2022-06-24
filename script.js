const board         = []
const black         = [0, 0, 0, 255]
const white         = [255, 255, 255, 255]
const transparent   = [255, 255, 255, 0]
let color           = 1
let drawing         = false



function get_canvas_coords(x, y) {
    return {
        x: Math.floor(canvas.width * x / canvas.offsetWidth),
        y: Math.floor(canvas.height * y / canvas.offsetHeight)
    }
}

function draw() {
    let drawing = ctx.createImageData(canvas.width, canvas.height)
    
    for(let i = 0; i < drawing.data.length; i += 4) {
        let x = (i / 4) % canvas.width
        let y = Math.floor((i / 4) / canvas.width)
        let target_color
        
        switch(board[x][y]) {
            case 1:     target_color = white; break
            case 2:     target_color = black; break
            default:    target_color = transparent
        }
    
        drawing.data[i + 0] = target_color[0]
        drawing.data[i + 1] = target_color[1]
        drawing.data[i + 2] = target_color[2]
        drawing.data[i + 3] = target_color[4]
    }

    ctx.putImageData(drawing, 0, 0)
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



function mousedown(e) {
    e.preventDefault()
    let pos = convert_mouse(e)

    drawing = true

    board[pos.x][pos.y] = color
    draw()
}

function mousemove(e) {
    e.preventDefault()
    let pos = convert_mouse(e)

    if(drawing) {
        board[pos.x][pos.y] = color
        draw()
    }
}

function mouseup(e) {
    e.preventDefault()
    let pos = convert_mouse(e)

    if(drawing) {
        board[pos.x][pos.y] = color
        draw()
        drawing = false
    }
}



function touchstart(e) {
    e.preventDefault()
    
    let rect = e.target.getBoundingClientRect()
    
    let pos = get_canvas_coords(
        e.targetTouches[0].pageX - rect.left,
        e.targetTouches[0].pageY - rect.top
    )
    
    drawing = true
    
    board[pos.x][pos.y] = color
    draw()
}

function touchmove(e) {
    e.preventDefault()
    
    let rect = e.target.getBoundingClientRect()
    
    let pos = get_canvas_coords(
        e.targetTouches[0].pageX - rect.left,
        e.targetTouches[0].pageY - rect.top
    )
    
    if(drawing) {
        board[pos.x][pos.y] = color
        draw()
    }
}

function touchend(e) {
    e.preventDefault()
    
    let rect = e.target.getBoundingClientRect()
    
    let pos = get_canvas_coords(
        e.changedTouches[0].pageX - rect.left,
        e.changedTouches[0].pageY - rect.top
    )
    
    if(drawing) {
        board[pos.x][pos.y] = color
        draw()
        drawing = false
    }
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
    
    for(let i = 0; i < canvas.width; i++) {
        let filler = []

        for(let j = 0; j < canvas.height; j++) {
            filler.push(2)
        }
        
        board.push(filler)
    }

    resize()
}

onresize = resize



document.addEventListener("keydown", e => {
    e.preventDefault()

    switch(e.key) {
        case "1": color = 1; break
        case "2": color = 2; break
        case "3": color = 3
    }
})

document.addEventListener("keyup", e => {
    e.preventDefault()
})
