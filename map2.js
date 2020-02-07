new myMap('123', map_data, 'maps_place');

ymaps.ready(function(){
    init_yaMap().then(ya_map_data => {
        new myMap('666', ya_map_data, 'maps_place');
    });
});

function init_yaMap() {
    ya_map_data = {};
    return ymaps.borders.load('RU', {
        lang: 'ru',
        quality: 1
    }).then(function (result) {

        var scaleX = 3;
        var scaleY = 5;
        for (var i = 0; i < result.features.length; i++) {
            var text_path = '';
            for (var coord = 0; coord < result.features[i].geometry.coordinates.length; coord++) {
                var coordinates = result.features[i].geometry.coordinates[coord];
                text_path += ('M ' + coordinates[0][1] * scaleX + ',' + (100 - coordinates[0][0]) * scaleY) + '';
                for (var j = 1; j < coordinates.length; j+=2) {
                    text_path += ('L' + (coordinates[j][1] * scaleX) + ',' + (100 - coordinates[j][0]) * scaleY + ' ');
                }
                text_path += 'Z ';
            }
            ya_map_data[result.features[i].properties.iso3166] = {
                id: i,
                shortname: result.features[i].properties.iso3166,
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
                    path: text_path
                }
            };

        }
        return ya_map_data;
    });
}


function myMap(mapId, map_data, parent_id) {
    var
        svg, originalWidth = 620,
        originalHeight = 360,
        mapRatio = originalWidth / originalHeight,
        xSize, ySize, scale,
        originalFill, originalStroke, originalGlow, Glow = [];
    var
        svg_map,
        toolTipElement,
        toolTipFrame,
        toolTipComment,
        toolTipImage,
        toolTipName;


    function setSvgMapHTML(isWidthUndefined) {
        var html =  '<div id="svg_map' + mapId + '" style="position: relative;';
        if (isWidthUndefined) {
            html += ' width: 100%; height: 100%;';
        }
        html += '"><div id="toolTip' + mapId + '" class="ToolTipClass"><table id="ToolTipFrame' + mapId + '" class="ToolTipFrameClass"><tr id="ToolTipFrame' + mapId + '" class="ToolTipFrameClass" valign="top"><td id="toolTipImage' + mapId + '"></td><td id="toolTipComment' + mapId + '" class="toolTipCommentClass"></td></tr></table><div id="toolTipName' + mapId + '" class="ToolTipNameClass"></div></div></div>';
        //document.writeln(html);
        let div = document.createElement('div');
        div.innerHTML = html;
        if (parent_id === undefined || document.getElementById(parent_id) == null)
            document.body.append(div);
        else
            document.getElementById(parent_id).append(div);

        svg_map = document.getElementById('svg_map'+mapId);
        toolTipElement = document.getElementById('toolTip' + mapId);
        toolTipName = document.getElementById('toolTipName' + mapId);
        toolTipComment =  document.getElementById('toolTipComment' + mapId);
        toolTipFrame =  document.getElementById('ToolTipFrame' + mapId);
        toolTipImage = document.getElementById('toolTipImage' + mapId);
    }

    function FSstateHighlightOff(Y) {

        svg.getById(Y).animate({
            fill: map_data[Y].color_map,
            stroke: borderColor
        }, overDelay);
        Glow[Y].remove();

        svg.getById(Y).toBack();
    }

    function FSstateLabelModifyText(Y, E) {
        svg.getById(Y + 'text').toFront();
        svg.getById(Y + 'text').attr({
            text: E
        });
    }

    function moveToolTip(Y) {

        var style = toolTipElement.style;
        style.position = 'absolute';
        if (Y.layerX + Y.layerY > 0) {
            style.left = Y.layerX + 'px';
            style.top = Y.layerY + 20 + 'px';
        }
    }

    function FSenableState(Y) {
        var E = "show";
        svg.getById(Y)[E]();
        svg.getById(Y).toBack();
    }

    function FSreloadMap() {
        svg.remove();
        map_init();
    }

    function FSgetParentWidth() {
        return svg_map.parentNode.offsetWidth;
    }

    function FSstateModify(Y, E, p) {

        svg.getById(Y).toFront();
        if (nameStroke) {
            svg.getById(Y + 'stext').toFront();
        }
        svg.getById(Y + 'text').toFront();
        svg.getById(Y).animate({
            fill: E,
            stroke: p
        }, overDelay);
    }

    function FSaddText(Y, E, p, n, R, X) {
        svg.text(E, p, Y).attr({
            'fill': n,
            'font-weight': R,
            'font-size': X
        });
    }

    function FSsetColor(Y, E) {

        map_data[Y].color_map = E;
        svg.getById(Y).animate({
            fill: map_data[Y].color_map,
            stroke: borderColor
        }, overDelay);
    }

    function FSstateLabelModifyColor(Y, E, p) {
        svg.getById(Y + 'text').toFront();
        svg.getById(Y + 'text').animate({
            fill: E,
            stroke: p
        }, overDelay);
    }

    function FSregionHighlight(Y) {
        for (var E in regions[Y].states) {
            var p = regions[Y].states[E];
            FSstateHighlightOn(p);
        }
    }

    function toolTip(image, comment, name, link) {

        var u = toolTipElement.style;
        if (comment || name) {
            if (name) {
               toolTipName.innerHTML = name;
                toolTipName.style.display = 'block';
            } else {
               toolTipName.style.display = 'none';
            }
            ;
            if (comment) {
                toolTipComment.innerHTML = comment;
                toolTipFrame.style.display = 'block';
            } else {
                toolTipFrame.style.display = 'none';
            }
            ;
            if (image) {
                toolTipImage.innerHTML = '<img src=\'' + image + '\'>';
            } else {
                toolTipImage.innerHTML = '';
            }
            ;
            u.display = 'block';
        } else {
            u.display = 'none';
        }
    }

    function FSdisableState(Y) {
        svg.getById(Y).hide();
    }

    function FSresizeMap() {
        xSize = Math.round(FSgetParentWidth());
        ySize = Math.round(xSize / mapRatio);
        scale = xSize / originalWidth;
        svg_map.style.width = xSize + 'px';
        svg_map.style.height = ySize + 'px';
    }

    function FSsetColorOver(Y, E) {
        map_data[Y].color_map_over = E;
        svg.getById(Y).animate({
            fill: map_data[Y].color_map,
            stroke: borderColor
        }, overDelay);
    }

    function FSfetchStateAttr(Y, E) {
        return map_data[Y][E];
    }

    function FSregionUnhighlight(Y) {
        for (var E in regions[Y].states) {
            var p = regions[Y].states[E];
            FSstateHighlightOff(p);
        }
    }

    function FSstateHighlightOn(Y) {
        svg.getById(Y).toFront();
        if (nameStroke) {
            svg.getById(Y + 'stext').toFront();
        }
        svg.getById(Y + 'text').toFront();
        svg.getById(Y).animate({
            fill: map_data[Y].color_map_over,
            stroke: borderColorOver
        }, overDelay);
        Glow[Y] = svg.getById(Y).glow({
            "width": shadowWidth,
            "opacity": shadowOpacity,
            "color": shadowColor
        }).transform("t" + shadowX + "," + shadowY);
    }

    function main() {
        setSvgMapHTML(typeof mapWidth === "undefined");
        if (typeof mapWidth === "undefined") {
            xSize = Math.round(FSgetParentWidth()),
            ySize = Math.round(xSize / mapRatio);
            scale = xSize / originalWidth;
        } else {
            xSize = originalWidth,
                ySize = originalHeight;
            if ((mapWidth / xSize) > (mapHeight / ySize)) {
                scale = mapHeight / ySize;
            } else {
                scale = mapWidth / xSize;
            }
            ;
        }

            map_init();

        if (typeof mapWidth === "undefined") {
            window.onresize = function (Y) {
                FSresizeMap();
            };
        }
    }

    function map_init() {

        if (typeof mapWidth === 'undefined') {
           svg_map.style.width = xSize + 'px';
            svg_map.style.height = ySize + 'px';
            svg = new Raphael("svg_map" + mapId, xSize, ySize);
            svg.setViewBox(0, 0, xSize, ySize, true);
/*            var e = document.querySelector("svg");
            e.setAttribute('width', '100%');
            e.setAttribute('height', '100%');*/

        } else {
            svg = new Raphael("svg_map" + mapId, xSize * scale, ySize * scale);
        }
        toolTip();
        for (var c in map_data) {
            (function (X) {
                var
                    currentData = map_data[c],
                    mapLayers = {
                        main: 0,
                        text: 1,
                        shadow: 2
                    },
                    currentSet = svg.set();
                currentSet.push(svg.path(currentData.outline.path).attr({
                    fill: currentData.color_map,
                    stroke: borderColor,
                    "stroke-width": 1.01
                }));
                currentSet.push(svg.text(currentData.outline.label.x, currentData.outline.label.y, currentData.shortname).attr({
                    fill: nameColor,
                    "font-weight": nameFontWeight,
                    "font-size": nameFontSize,
                    "cursor": "default"
                }));
                currentSet[mapLayers.main].id = 'st' + currentData.id;
                currentSet[mapLayers.text].id = 'st' + currentData.id + 'text';
                if (nameStroke) {
                    currentSet.push(currentSet[mapLayers.text].clone().attr({
                        fill: "#ffffff",
                        transform: "t0,0",
                        opacity: 0.6,
                        stroke: "#000000",
                        "stroke-width": "2",
                        "stroke-linejoin": "round"
                    }));
                    currentSet[mapLayers.shadow].id = 'st' + currentData.data.id + 'stext';
                }
                currentSet[mapLayers.main].toBack();
                currentSet[mapLayers.text].toFront();
                if (currentData.link) {
                    currentSet.attr({
                        cursor: "pointer"
                    });
                    currentSet.click(function () {
                        if (isNewWindow) {
                            window.open(currentData.link);
                        } else {
                            window.location.assign(currentData.link);
                        }
                    });
                }
                ;
                currentSet.scale(scale, scale, scale, scale);
                var O;
                currentSet.hover(function (Y) {
                    currentSet[mapLayers.main].toFront();
                    if (nameStroke) {
                        currentSet[mapLayers.shadow].toFront();
                    }
                    currentSet[mapLayers.text].toFront();
                    O = currentSet[mapLayers.main].animate({
                        fill: currentData.color_map_over,
                        stroke: borderColorOver
                    }, overDelay).glow({
                        "width": shadowWidth,
                        "opacity": shadowOpacity,
                        "color": shadowColor
                    }).transform("t" + shadowX + "," + shadowY);
                    toolTip(currentData.image, currentData.comment, currentData.name, currentData.link);
                }, function (Y) {
                    currentSet[mapLayers.main].animate({
                        fill: currentData.color_map,
                        stroke: borderColor
                    }, overDelay);
                    O.hide();
                    currentSet[mapLayers.main].toBack();
                    toolTip();
                });
            })(c);
        }
        ;
        svg_map.onmousemove = moveToolTip;
    };

    function stateHighlightIn(Y, E, p) {
        var n = 'stroke',
            R = 'fill';
        originalFill = svg.getById(Y).attr(R);
        originalStroke = svg.getById(Y).attr(n);
        svg.getById(Y).toFront();
        if (nameStroke) {
            svg.getById(Y + 'stext').toFront();
        }
        svg.getById(Y + 'text').toFront();
        svg.getById(Y).animate({
            fill: E,
            stroke: p
        }, overDelay);
        originalGlow = svg.getById(Y).glow({
            "width": shadowWidth,
            "opacity": shadowOpacity,
            "color": shadowColor
        }).transform("t" + shadowX + "," + shadowY);
    };

    function stateHighlightOut(Y) {
        svg.getById(Y).animate({
            fill: originalFill,
            stroke: originalStroke
        }, overDelay);
        originalGlow.remove();
        svg.getById(Y).toBack();
    };


    main();
}


