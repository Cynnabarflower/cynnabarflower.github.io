var
    mapHeight		= 360;

shadowWidth		= 2;
shadowOpacity		= 0.3;
shadowColor		= "black";
shadowX			= 1;
shadowY			= 2;
    isNewWindow		= false,

    borderColor		= "#ffffff",
    borderColorOver		= "#ffffff",

    nameColor		= "#ffffff",
    nameFontSize		= "11px",
    nameFontWeight		= "bold",
    nameStroke = false,
    overDelay		= 100,
    color_gradient = [
      "#5AABF6",
      "#51A0EA",
      "#4896DE",
      "#3F8BD2",
      "#3681C6",
      "#2D76BB",
      "#246CAF",
      "#1B61A3",
      "#125797",
      "#094C8B",
      "#004280"
    ],

    no_data_color = "#555555"

map_values = {
    "max_val": 1,
    "min_val": 0,
    "RU-ALT" : {
        "values" : [
        {"from": 0,
        "to": 24*60*60,
        "val": 0.99}
        ]
    },
    "default" : {
        "values" : [ {
        "from": 0,
        "to": 6*60*60,
        "val": 0
        },
        {
        "from": 6*60*60+1,
        "to": 24*60*60,
        "val": 0.5
        }
        ]
    }
}
