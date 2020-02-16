
var config = {
    type: Phaser.AUTO,
    parent: 'maps_place',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NO_CENTER
    },
    transparent: false,
    //backgroundColor: 'rgba(0,0,0,0)',
    dom: {
        createContainer: true
    },
    scene: {
        create: create,
        update: update
    }
};

var map_data;
var light;

ymaps.ready(function(){
init_yaMap2(2, 3, 1, 1/1.0).then(ya_map_data => {
    map_data = ya_map_data;
    var game = new Phaser.Game(config);
});
});




function create() {
    //map_data  = JSON.parse(JSON.stringify(clean_map_data))

    /*ymaps.ready(function(){
    init_yaMap(3, 5, 1, 1/1.0).then(ya_map_data => {
        new myMap('666', ya_map_data, 'maps_place');
    });
});*/
    light = this.lights.addLight(0, 0, 200);
    light = this.lights.addLight(0, 100, 200);
    light = this.lights.addLight(100, 0, 200);
    light = this.lights.addLight(200, 200, 200);

    this.lights.enable().setAmbientColor(0x555555).setIntensity(2);

    this.input.on('pointermove', function (pointer) {

        light.x = pointer.x;
        light.y = pointer.y;
        console.log(light.x, light.y)
    });

    for (var c in map_data) {
        loadRegion(this, c)
    }

}

function update() {

}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "0x" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


function loadRegion(context, c) {

    var
        currentData = map_data[c],
        mapLayers = {
            main: 0,
            text: 1,
            shadow: 2,
            info: 3
        },

        path = currentData.outline.path;
    /*    pathArr = path.split(/[ ,]+/);
        polygons = []
        var currentPoly = []
        var lastX = 0;
        var lastY = 0;
        var gotX = false;
        var rel = 0;*/
    graphics = context.add.graphics();
    graphics.clear();
    graphics.lineStyle(1, 0xff0000, 1);
    var pathArr = JSON.parse(path);
    currentPoly = [];
    polygons = [];
    col = rgb2hex('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')')
    for (var litArr of pathArr) {

        currentPoly = [];
        var minX = 999999999999,
            minY = 999999999999,
            maxX = -99999999999,
            maxY = -99999999999;

        var path = null;
        for (var step of litArr) {
            if (!step)
                continue;
            if (step === 'm') {
                if (currentPoly.length)
                    polygons.push(currentPoly);
                currentPoly = [];
                rel = 1;
                gotX = false;
            } else if (step === 'M') {
                if (currentPoly.length)
                    polygons.push(currentPoly);
                currentPoly = [];
                lastX = 0;
                lastY = 0;
                rel = 0;
                gotX = false;
            } else if (step === 'c' || step === 'z' || step === 'l') {
                rel = 1;
            } else if (step === 'C' || step === 'Z' || step === 'L') {
                rel = 0;
            } else {
                if ("x" in step) {
                    if (!path)
                        path = new Phaser.Curves.Path(step.x, step.y);
                    else
                        path.lineTo(step.x, step.y);

                    currentPoly.push(step.x);
                    currentPoly.push(step.y);
                    maxX = Math.max(maxX, step.x);
                    maxY = Math.max(maxY, step.y);
                    minX = Math.min(minX, step.x);
                    minY = Math.min(minY, step.y);
                    continue;
                }
                var num = (Number.parseFloat(step));
                if (!isNaN(num)) {
                    if (gotX) {
                        lastY = rel ? lastY + num : num;
                        currentPoly.push(lastY);
                        gotX = false;
                    } else {
                        lastX = rel ? lastX + num : num;
                        currentPoly.push(lastX);
                        gotX = true;
                    }
                } else {
                    console.log('nan ' + step)
                }
            }
        }
/*        if (path)
            path.draw(graphics)*/
        path = null;

        polygons.push(currentPoly);
        for (var polygon of polygons)
            if (polygon.length > 1) {
               gpl = new Phaser.Geom.Polygon(polygon);
/*                graphics.fillPoints(pl.points, true);
                graphics.lineStyle(2, col, 1);   // color: 0xRRGGBB
                graphics.strokePoints(pl.points, true);*/
                pl=  context.add.polygon(0, 0, polygon, col).setOrigin(0,0);
                pl.setPipeline('Light2D');
            }
    }
}


function init_yaMap(scaleX, scaleY, quality, step) {
    ya_map_data =  JSON.parse(JSON.stringify(clean_map_data));
    return ymaps.borders.load('RU', {
        lang: 'ru',
        quality: quality
    }).then(function (result) {

        for (var i = 0; i < result.features.length; i++) {
            var shortname = result.features[i].properties.iso3166;

            var text_path = '';
            var minX = 999999999999,
                minY = 999999999999,
                maxX = -99999999999,
                maxY = -99999999999;
            for (var coord = 0; coord < result.features[i].geometry.coordinates.length; coord++) {
                var coordinates = result.features[i].geometry.coordinates[coord];
                text_path += ('M ' + coordinates[0][1] * scaleX + ',' + (100 - coordinates[0][0]) * scaleY) + '';
                for (var j = 1; j < coordinates.length; j += step) {
                    if (coord === 0) {
                        maxX = Math.max(maxX, (coordinates[Math.floor(j)][1] * scaleX));
                        maxY = Math.max(maxY, (100 - coordinates[Math.floor(j)][0]) * scaleY);
                        minX = Math.min(minX, (coordinates[Math.floor(j)][1] * scaleX));
                        minY = Math.min(minY, (100 - coordinates[Math.floor(j)][0]) * scaleY);
                    }
                    text_path += ('L ' + (coordinates[Math.floor(j)][1] * scaleX) + ',' + (100 - coordinates[Math.floor(j)][0]) * scaleY + ' ');
                }
                text_path += ('L ' + (coordinates[(coordinates.length - 1)][1] * scaleX) + ',' + (100 - coordinates[(coordinates.length - 1)][0]) * scaleY + ' ');
                text_path += ' Z ';
            }

            if (shortname in ya_map_data) {
                ya_map_data[shortname].outline.path = text_path;
                ya_map_data[shortname].outline.center = {
                    x: (maxX+minX)/2,
                    y: (maxY+minY)/2
                }
            } else
                ya_map_data[shortname] = {
                    id: i,
                    shortname: shortname,
                    link: "",
                    comment: "",
                    image: "",
                    color_map: "#569956",
                    color_map_over: "#107710",
                    name: result.features[i].properties.name,
                    outline: {
                        label: {
                            x: 0,
                            y: 0
                        },
                        path: text_path,
                        center: {
                            x: (maxX+minX)/2,
                            y: (maxY+minY)/2
                        }
                    }
                };

        }
        return ya_map_data;
    });
}


function init_yaMap2(scaleX, scaleY, quality, step) {
    ya_map_data =  JSON.parse(JSON.stringify(clean_map_data));
    return ymaps.borders.load('RU', {
        lang: 'ru',
        quality: quality
    }).then(function (result) {

        for (var i = 0; i < result.features.length; i++) {
            var shortname = result.features[i].properties.iso3166;

            var text_path = '[';
            var minX = 999999999999,
                minY = 999999999999,
                maxX = -99999999999,
                maxY = -99999999999;
            for (var coord = 0; coord < result.features[i].geometry.coordinates.length; coord++) {
                var coordinates = result.features[i].geometry.coordinates[coord];
                text_path += ('[ {"x": ' + coordinates[0][1] * scaleX + ', "y": ' + (100 - coordinates[0][0]) * scaleY) + '}, ';
                for (var j = 1; j < coordinates.length; j += step) {
                    if (coord === 0) {
                        maxX = Math.max(maxX, (coordinates[Math.floor(j)][1] * scaleX));
                        maxY = Math.max(maxY, (100 - coordinates[Math.floor(j)][0]) * scaleY);
                        minX = Math.min(minX, (coordinates[Math.floor(j)][1] * scaleX));
                        minY = Math.min(minY, (100 - coordinates[Math.floor(j)][0]) * scaleY);
                    }
                    text_path += (' {"x": ' + (coordinates[Math.floor(j)][1] * scaleX) + ', "y": ' + (100 - coordinates[Math.floor(j)][0]) * scaleY + '}, ');
                }
                text_path += (' {"x":' + (coordinates[(coordinates.length - 1)][1] * scaleX) + ', "y": ' + (100 - coordinates[(coordinates.length - 1)][0]) * scaleY + '} ');
                text_path += '], ';
            }
            text_path += '[] ]';

            if (shortname in ya_map_data) {
                ya_map_data[shortname].outline.path = text_path;
                ya_map_data[shortname].outline.center = {
                    x: (maxX+minX)/2,
                    y: (maxY+minY)/2
                }
            } else
                ya_map_data[shortname] = {
                    id: i,
                    shortname: shortname,
                    link: "",
                    comment: "",
                    image: "",
                    color_map: "#569956",
                    color_map_over: "#107710",
                    name: result.features[i].properties.name,
                    outline: {
                        label: {
                            x: 0,
                            y: 0
                        },
                        path: text_path,
                        center: {
                            x: (maxX+minX)/2,
                            y: (maxY+minY)/2
                        }
                    }
                };

        }
        return ya_map_data;
    });
}
