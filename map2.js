new myMap('123', JSON.parse(JSON.stringify(clean_map_data)), 'maps_place');

ymaps.ready(function(){
 //   init_yaMap(3, 5, 1, 1/1.0).then(ya_map_data => {
 //       new myMap('666', ya_map_data, 'maps_place');
 //   });
});

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
                        text_path += ('L' + (coordinates[Math.floor(j)][1] * scaleX) + ',' + (100 - coordinates[Math.floor(j)][0]) * scaleY + ' ');
                    }
                    text_path += ('L' + (coordinates[(coordinates.length - 1)][1] * scaleX) + ',' + (100 - coordinates[(coordinates.length - 1)][0]) * scaleY + ' ');
                    text_path += 'Z ';
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
        //html += '<div id="mapTip' + mapId + '" class="ToolTipClass"></div>'
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
        svg.getById(Y + '_text').toFront();
        svg.getById(Y + '_text').attr({
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
            svg.getById(Y + '_stext').toFront();
        }
        svg.getById(Y + '_text').toFront();
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
        if (svg.getById(Y) != null) {
            map_data[Y].color_map = E;
            svg.getById(Y).animate({
                fill: map_data[Y].color_map,
                stroke: borderColor
            }, overDelay);
        }
    }

    function rgbToHex (r, g, b)
    {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);

        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;

        return (r + g + b).toUpperCase();
    }

    function FSstateLabelModifyColor(Y, E, p) {
        svg.getById(Y + '_text').toFront();
        svg.getById(Y + '_text').animate({
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
            svg.getById(Y + '_stext').toFront();
        }
        svg.getById(Y + '_text').toFront();
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

        maxUnis = -1;
        minUnis = 99999;
        for (var region_name in map_data) {
            if (region_name == 'RU-MOW' || region_name == 'RU-SPE') {
             //   continue
            }

            var numberOfUnis = 0;
            currentData = map_data[region_name];
            for (city_id in currentData.unis) {
                numberOfUnis += currentData.unis[city_id].unis.length
            }
            currentData['comment'] += ""+numberOfUnis
            maxUnis = Math.max(maxUnis, numberOfUnis);
            minUnis = Math.min(minUnis, numberOfUnis);
        }

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

        for (var region_name in map_data) {
            if (region_name == 'RU-MOW' || region_name == 'RU-SPE') {
             //   continue;
            }
            var numberOfUnis = 0;
            currentData = map_data[region_name]
            for (city_id in currentData.unis) {
                numberOfUnis += currentData.unis[city_id].unis.length
            }
            cc = (numberOfUnis - minUnis)/(maxUnis - minUnis);
            t = Math.floor((numberOfUnis - minUnis)/(maxUnis - minUnis) * (color_gradient.length-1))
            pp = Math.floor(cc * 255)
            col = '#'+rgbToHex(Math.floor(pp/2)+1,Math.floor(pp/2)+1,pp)
            FSsetColor(region_name, color_gradient[t])
        }

    }


    function disco(reg) {

                r = Math.random() * (255) * 10000;
                g = Math.random() * (255) * 100;
                b = Math.random() * (255);
                i = parseInt((r + g + b), 16).toString()
                FSsetColor(reg, i.replace('0x', '#'));
        sleep(600).then(function(){disco(reg)})
    }

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function loadRegion(c) {

        var
            currentData = map_data[c],
            mapLayers = {
                main: 0,
                text: 1,
                shadow: 2,
                info: 3
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
            "cursor": "default",
        }));
     

        currentSet[mapLayers.main].id = currentData.shortname;
        currentSet[mapLayers.text].id = currentData.shortname + '_text';

        if (nameStroke) {
            currentSet.push(currentSet[mapLayers.text].clone().attr({
                fill: "#ffffff",
                transform: "t0,0",
                opacity: 0.6,
                stroke: "#000000",
                "stroke-width": "2",
                "stroke-linejoin": "round"
            }));
        } else {
            currentSet.push(svg.text())
        }
        currentSet[mapLayers.shadow].id = currentData.shortname + '_stext';

        /*                if ('outline' in currentData && 'center' in currentData.outline) {
                            currentSet.push(svg.text(currentData.outline.center.x, currentData.outline.center.y, currentData.shortname).attr({
                                fill: nameColor,
                                "font-weight": nameFontWeight,
                                "font-size":  "6px",
                                "cursor": "default"
                            }))
                        } else {
                            currentSet.push(svg.text())
                        }
                        currentSet[mapLayers.info].id = 'st' + currentData.id + 'info';*/


        currentSet[mapLayers.main].toBack();
        //           currentSet[mapLayers.info].toFront();
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
        for (var c in map_data) {
            loadRegion(c)
            
        }
       toolTip()
       svg_map.onmousemove = moveToolTip;
    };

    function stateHighlightIn(Y, E, p) {
        var n = 'stroke',
            R = 'fill';
        originalFill = svg.getById(Y).attr(R);
        originalStroke = svg.getById(Y).attr(n);
        svg.getById(Y).toFront();
        if (nameStroke) {
            svg.getById(Y + '_stext').toFront();
        }
        svg.getById(Y + '_text').toFront();
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


