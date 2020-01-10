var main_content = document.getElementById('main_content');
var set_id_add = document.getElementsByClassName('set-add');
var set_id_remove = document.getElementsByClassName('set-remove');
var inputAdd = document.getElementsByName('add');
var inputRemove = document.getElementsByName('remove');
var btn_add = document.getElementsByName('btn-add');
var btn_remove = document.getElementsByName('btn-remove');

var ctxNode;

var stateAdd = false;
var stateRemove = false;

var nodes = new Array();
var idsNodes = new Array();

window.onload = init();

function init() {
    inputAdd[0].value = "";
    inputRemove[0].value = "";
}

function validateField (inputRta) {
    if (inputRta[0].value.length != 0) return true; 
    else return false;
}

function addNodeView () {
    if (validateField(inputAdd)) {
        addNode(inputAdd[0].value);
        inputAdd[0].value = "";
    } else {
        console.log("Error vacio");
    }
}

function animateRemoveNodes(canvas, beforeCanvas) {
    if (beforeCanvas !== 'undefined') {
        return new Promise(resolve => {
            console.log('Funciona');
            canvas.style.animation ='removeNode .5s ease-out';
            canvas.style.opacity = '0';
            canvas.style.transform = 'scale(0) rotate(0deg)';
            beforeCanvas.style.animation = 'moveNode .5s ease-out';
            setTimeout(function() {
                beforeCanvas.style.animation = null;
                resolve();
            }, 500);
        });
    } else {
        return new Promise(resolve => {
            canvas.style.animation ='removeNode .5s ease-out';
            setTimeout(function() {
                canvas.style.opacity = '0';
                canvas.style.transform = 'scale(0) rotate(0deg)';
                resolve();
            }, 500);
        });
    }
}

function searchIds() {
    return new Promise(resolve => {
        
    });
}

async function removeNodeView () {
    if (validateField(inputRemove)) {
        var index = idsNodes.findIndex(idx => idx === inputRemove[0].value);
        if (index != -1) {
            idsNodes.splice(index, 1);
            if (typeof nodes[index+1] !== 'undefined') await animateRemoveNodes(nodes[index], nodes[index+1]);
            else await animateRemoveNodes(nodes[index], 'undefined');
            nodes[index].parentNode.removeChild(nodes[index]);
            nodes.splice(index, 1);
        } else {
            console.log('not found => ' + index);
        }
    } else {
        console.log("Error vacio");   
    }
}

async function stateBoxs (currentBtn) {
    if (currentBtn == 0) {
        if (!stateAdd) {
            try {
                stateBoxsAnims(OPEN, set_id_add, btn_add, currentBtn);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                stateBoxsAnims(CLOSE, set_id_add, btn_add, currentBtn);
            } catch (e) {
                console.log(e);
            }
        }
    } else {
        if (!stateRemove) {
            try {
                stateBoxsAnims(OPEN, set_id_remove, btn_remove, currentBtn);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                stateBoxsAnims(CLOSE, set_id_remove, btn_remove, currentBtn);
            } catch (e) {
                console.log(e);
            }
        }
    }
}

function drawNode (canvas, idNode) {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.fillStyle = "#00a8ff";
        ctx.arc(50, 50, 48, 0, 360 * Math.PI, false);
        ctx.fill();
        ctx.save();
        ctx.closePath();

        ctx.textAlign="center";
        ctx.font = "2em Verdana";
        ctx.fillStyle = "white";
        ctx.save();
        ctx.fillText(idNode, 50, 55);

        canvas.style.opacity = '0';
        canvas.style.transform = 'scale(0,0) rotation(0deg)';

        return ctx;
    }
}

function initCanvas(obj_canvas) {
    obj_canvas.width = 100;
    obj_canvas.height = 100;
}

function animateNodes(canvas) {
    return new Promise(resolve => {
        canvas.style.animation = 'addNode .5s ease-out';
        canvas.style.opacity = '1';
        canvas.style.transform = 'scale(1,1) rotate(360deg)';
        setTimeout(function() {
            canvas.style.animation = null;
            resolve();
        }, 500);
    });
}

async function addNode (id) {
    var obj_canvas = document.createElement('canvas');
    idsNodes.push(id);

    initCanvas(obj_canvas);
    ctxNode = drawNode(obj_canvas, id);

    main_content.appendChild(obj_canvas);
    
    nodes.push(obj_canvas);

    for (var i = 0; i <= nodes.length-1; i++) {
        await animateNodes(nodes[i]);
        console.log(nodes[i]);
    }
}