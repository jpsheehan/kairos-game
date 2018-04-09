var current_scene;
var state = {};
var inventory = [];
var oldInventory = [];

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var sceneRoot = './images/scenes/';
var imageRoot = './images/objects/';

var debug = false;

// changes the scene to the current_scene
function change_scene(scene_name=null) {

    if (scene_name !== null)
        current_scene = scenes.scenes[scene_name];

    $('#scene-name').text(current_scene.name);
    $('#scene-desc').text(current_scene.desc);

    location.hash = scene_name;

    ctx.clearRect(0, 0, 640, 480);

    loadImageBitmap(sceneRoot + current_scene.back, 640, 480, (image) => {

        // draw the background
        ctx.drawImage(image, 0, 0);

        if (current_scene.items) {

            for (var item of current_scene.items) {
                if (item.draw && !existsInInventory(item.item)) {

                    (function(x, y) {
                        loadImageBitmap(imageRoot + scenes.items[item.item].image, 128, 128, (itemImage) => {

                            ctx.drawImage(itemImage, x - 64, y - 64);
    
                        });
                    })(item.x, item.y);
                    
                }
            }
        }

        // draw doors and items
        if (debug) {

            if (current_scene.doors) {
                for (var door of current_scene.doors) {

                    ctx.strokeStyle = 'red';
                    ctx.beginPath();
                    ctx.arc(door.x, door.y, door.r, 0, 2*Math.PI);
                    ctx.stroke();

                }
            }

            if (current_scene.items) {
                for (var item of current_scene.items) {

                    if (!existsInInventory(item.item)) {

                        ctx.strokeStyle = 'blue';
                        ctx.beginPath();
                        ctx.arc(item.x, item.y, item.r, 0, 2*Math.PI);
                        ctx.stroke();

                    }
                    
                }
            }

        }

        
        

    });

}

function addToInventory(item) {
    inventory.push(item);

    displayMessage('You got a ' + scenes.items[item].name + '!');

    triggerEvent('item collected');

    refreshInventory();
}

function triggerEvent(event) {
    for (var ev of scenes.events) {
        if (ev.triggers.includes(event)) {

            for (var condition of ev.conditions) {

                if (condition.type === 'inventory contains') {

                    for (var item of condition.items) {
                        if (!inventory.includes(item)) {
                            return;
                        }
                    }

                }
            }

            for (var action of ev.actions) {

                if (action.type === 'take items') {

                    for (var item of action.items) {

                        removeFromInventory(item);

                    }

                }

                if (action.type === 'give items') {

                    for (var item of action.items) {

                        addToInventory(item);

                    }
                }
            }

        }
    }
}

function refreshInventory() {

    var html = '';

    for (var item of inventory) {

        var imgUrl = './images/objects/' + scenes.items[item].image;
        var name = scenes.items[item].name;

        html += '<div><img src="' + imgUrl + '" alt="' + name + '" />' + name + '</div>';

    }

    $('#inventory').html(html);

}

function removeFromInventory(item) {
    if (inventory.indexOf(item) !== -1) {
        oldInventory.push(item);
        inventory = inventory.filter((i) => {
            return i !== item;
        });
    }
}

function existsInInventory(item) {
    return inventory.includes(item) || oldInventory.includes(item);
}

function intersects(point, circle) {
    return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.r; 
}

function loadImageBitmap(filename, width, height, callback) {
    var img = document.createElement('img');

    img.onload = function() {

        Promise.all([
            createImageBitmap(this, 0, 0, width, height)
        ]).then((sprites) => {
            document.body.removeChild(img);
            callback(sprites[0]);
        });

    };

    img.className = 'hidden';
    img.src = filename;

    document.body.appendChild(img);
}

function getCursorStyle(orientation) {
    switch (orientation) {
        case 'north': return 'n-resize';
        case 'south': return 's-resize';
        case 'west': return 'w-resize';
        case 'east': return 'e-resize';
        case 'north-west': return 'nw-resize';
        case 'north-east': return 'ne-resize';
        case 'south-west': return 'sw-resize';
        case 'south-east': return 'se-resize';
        default: return 'default';
    }
}

function displayMessage(message) {
    alert(message);
}

$(document).ready(() => {

    // change the mouse cursor if over a door or collectible
    $('#canvas').on('mousemove', function(event) {
        
        var point = {
            x: event.clientX - this.offsetLeft,
            y: event.clientY - this.offsetTop
        };

        // check for doors
        for (var door of current_scene.doors) {

            if (intersects(point, door)) {

                return this.style.cursor = getCursorStyle(door.orientation);

            }

        }

        // check for items
        if (current_scene.items) {
            for (var item of current_scene.items) {

                if (intersects(point, item) && !existsInInventory(item.item)) {

                    return this.style.cursor = 'pointer';

                }
            }
        }

        // nothing was found!
        this.style.cursor = 'default';

    });

    $('#canvas').on('click', function(event) {

        var point = {
            x: event.clientX - this.offsetLeft,
            y: event.clientY - this.offsetTop
        };

        // check through doors
        for (var door of current_scene.doors) {

            if (intersects(point, door)) {

                if (door.requires && !existsInInventory(door.requires)) {
                    if (door.message)
                        displayMessage(door.message);
                    return;
                }

                this.style.cursor = 'default';
                return change_scene(door.scene);

            }

        }

        // check through collectibles
        if (current_scene.items) {
            for (var item of current_scene.items) {
                if (intersects(point, item)) {

                    if (item.requires && !existsInInventory(item.requires)) {
                        if (item.message)
                            displayMessage(item.message);
                        return;
                    }

                    if (item.message && !item.item) {
                        return displayMessage(item.message);
                    }


                    if (item.item && !existsInInventory(item.item)) {

                        addToInventory(item.item);

                        change_scene();

                        return;

                    }
                }
            }
        }

        if (debug)
            alert(`${point.x}, ${point.y}`);

    });

    change_scene((location.hash ? location.hash.substr(1) : scenes.root));

});