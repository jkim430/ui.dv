var app = angular.module('ui.dv', [])

app.constant('MODULE_VERSION', '0.0.1')

app.directive('barGraph', function(Functions) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            options: '=',
            width: '=',
            height: '=',
            fcn: '='
        },
        link: function(scope, elem, attr) {
            if (typeof scope.fcn === 'function')
                scope.clickable = true;

            scope.length = scope.data.length;
            var options = scope.options;
            if (options) {
                scope.barcolor = Functions.lengthen(options.barcolor, scope.length);
                scope.textcolor = Functions.lengthen(options.textcolor, scope.length);
                scope.bg = options.bg;
                if (options.sideways) {
                    var hold = scope.width
                    scope.width = scope.height;
                    scope.height = hold;
                }
            }

            scope.graphData = Functions.format(scope.data);
            scope.max = Functions.getMax(scope.graphData);
        },
        template: barGraphTemplate
    }
})


app.directive('dotGraph', function(Functions) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            options: '=',
            width: '=',
            height: '=',
            fcn: '='
        },
        link: function(scope, elem, attr) {
            if (typeof scope.fcn === 'function')
                scope.clickable = true;

            scope.length = scope.data.length;
            scope.bg_dot_size = scope.width / scope.length * 0.25;

            var options = scope.options;
            if (options) {
                scope.dotcolor = Functions.lengthen(options.dotcolor, scope.length);
                scope.textcolor = Functions.lengthen(options.textcolor, scope.length);
                scope.bg = options.bg;

                if (options.bg_dot) {
                    scope.bg_dot_icon = options.bg_dot.icon;
                    scope.bg_dot_size = options.bg_dot.size || 10;
                }
            }

            scope.graphData = Functions.format(scope.data);
            scope.max = Functions.getMax(scope.graphData);
        },
        template: dotGraphTemplate
    }
})

app.directive('circleGraph', function(Functions) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            options: '=',
            width: '=',
            height: '=',
            fcn: '='
        },
        link: function(scope, elem, attr) {
            if (typeof scope.fcn === 'function')
                scope.clickable = true;

            scope.length = scope.data.length;
            var options = scope.options;
            if (options) {
                scope.barcolor = Functions.lengthen(options.barcolor, scope.length);
                scope.textcolor = Functions.lengthen(options.textcolor, scope.length);
                scope.bg = options.bg;
                scope.inner = options.inner;
                scope.label = options.label;
                scope.fontsize = options.fontsize;
            }

            scope.graphData = Functions.format(scope.data);
            scope.max = Functions.getMax(scope.graphData);
        },
        template: circleGraphTemplate
    }
})

app.directive('pieChart', function(Functions) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            options: '=',
            radius: '=',
            fcn: '='
        },
        link: function(scope, elem, attr) {
            if (typeof scope.fcn === 'function')
                scope.clickable = true;

            scope.length = scope.data.length;
            var options = scope.options;
            if (options) {
                scope.piecolor = Functions.lengthen(options.piecolor, scope.length);
                scope.textcolor = Functions.lengthen(options.textcolor, scope.length);
                scope.bg = options.bg;
                scope.inner = options.inner;
                scope.label = options.label;
                scope.fontsize = options.fontsize;
            }

            scope.graphData = Functions.format(scope.data);
            scope.max = Functions.getMax(scope.graphData);
            scope.partials = [0];
            scope.digits = [];
            scope.total = scope.graphData.reduce(function(a, b) {
                scope.digits.push(b.value.toString().length);
                scope.partials.push(a + b.value)
                return a + b.value;
            }, 0);
        },
        template: pieGraphTemplate
    }
})

app.factory('Functions', function() {
    return {
        lengthen: function(thing, length) {
            if (Array.isArray(thing)) {
                var copy = thing.slice()
                while (thing.length < length)
                    thing = thing.concat(copy)
            }
            return thing;
        },

        getMax: function(arr) {
            var max = arr[0].value;
            arr.forEach(function(obj) {
                if (obj.value > max) max = obj.value
            })
            return max;
        },

        format: function(arr) {
            var value, label;
            for (var key in arr[0]) {
                if (typeof arr[0][key] === 'number') value = key;
                if (typeof arr[0][key] === 'string') label = key;
            }

            return arr.map(function(elem) {
                if (typeof elem === 'number') return {
                    value: elem
                };
                if (typeof elem === 'object') {
                    return {
                        value: elem[value],
                        label: elem[label]
                    }
                }
            })
        }
    }
})

// TEMPLATES
// Repeated styling
var chart =
    `.chart {
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin: 60px auto;
    margin-bottom: 0px;
    position: relative;
}`,

    blue =
    `.blue {
    background: #337ab7;
    color: white;
}`,

    bar =
    `.bar {
    border-radius: 3px;
    position: relative;
}
.bar:hover {
    opacity: 0.8;
}`,

    angle =
    `.angle {
    transform: rotate(-45deg);
    transform-origin: center right;
}`,

    clickable =
    `.clickable {
    cursor: pointer;
}`;


// Templates
var barGraphTemplate =
    `<style type="text/css">

    ${chart}
    ${blue}
    ${bar}
    ${angle}
    ${clickable}

    .chart-size-bar {
        width: 100%; 
        height: {{height}}px; 
        background-image: url({{bg}});
    }

    .x-bar {
        width: {{width}}px; 
        height: {{width*0.2}}px
    }

    .col-bar {
      position: absolute;
      bottom: 0;
      padding-bottom: 0px;
      margin-bottom: 0px;
      font-family: inherit;
      width: {{width / length - width*0.00833}}px; 
    }
    .col-bar:hover {
        transform: scale(1.05) translateY(-2%);
    }

    .label-bar {
      position: absolute;
      bottom: {{width*0.15}}px;
      padding-bottom: 0px;
      margin-bottom: 0px;
      font-family: inherit;
      font-size: {{width*0.4/length}}px;
      color: black;
      width: {{width*0.2}}px; 
      text-align: right;
    }

    .right-angle-bar {
        position: absolute;
        bottom: {{height*0.0125}}px;
        left: {{width / (length*2)-width*0.00833/2}}px;
        transform: rotate(-90deg);
        transform-origin: center left;
        font-family: inherit;
        font-size: {{width*0.4/length}}px;
    }

    .container-bar {
        position: relative;
        padding: 0px;
        width: {{width}}px;
        margin: 0 auto;
    }
    .container-bar:before, .container-bar:after {
        display: table;
        content: " ";
    }
    .container-bar:after {
        clear: both;
    }

    .margin-normal {
        width: {{width}}px;
        margin: 0 auto;
    }

    .margin-sideways {
        width: {{width}}px;
        margin: 0 auto;
    }

    .extend {
        height: {{width+60}}px;
    }

    .side-angle {
        transform: rotate(-90deg);
        transform-origin: bottom right;
    }

    .sideways {
        transform: rotate(90deg) translateX({{-(height*1.2+60-width)/2}}px);
        transform-origin: center center;
    }

    .labelmargin-bar {
        bottom: {{width*0.2-options.labelmargin}}px;
    }

    </style>

    <div class="container-bar"
        ng-class="{extend: options.sideways}">
        <div ng-class="{sideways: options.sideways}">
            <div class="chart chart-size-bar">
                <div class="col-bar" 
                    style="left:{{$index / length * width}}px;" 
                    ng-repeat="bar in graphData"
                    ng-click="fcn(bar, $index)"
                    ng-class="{clickable: clickable}">
                    <div
                        class="bar blue"
                        style="height:{{bar.value / max * height}}px; background: {{barcolor[$index]}}; color: {{textcolor[$index]}};">
                        <div 
                            class="right-angle-bar"
                            style="font-size:{{options.datafont}}px"><span>{{bar.value}}</span></div>
                    </div>
                </div>
            </div>
            <div class="x-bar">
                <div class="label-bar"
                    ng-class="{angle: !options.sideways, 'side-angle': options.sideways, 'labelmargin-bar': options.labelmargin}" 
                    style="right:{{(length-1-$index) / length * width + width/(length*2.3)}}px; font-size:{{options.labelfont}}px;" 
                    ng-repeat="bar in graphData">
                    <span>{{bar.label}}</span>
                </div>
            </div>
        </div>
    </div>`





var dotGraphTemplate =
    `<style type="text/css">

    ${chart}
    ${blue}
    ${angle}
    ${clickable}

    .dot {
      background: #337ab7;
      background-image: url({{bg_dot_icon}});
      background-size: cover;
      width: {{bg_dot_size}}px; 
      height: {{bg_dot_size}}px;
      border-radius: 50%;
      position: absolute;
    }

    .dot:hover {
        transform: scale(1.4);
    }

    .chart-size-dot {
        width: 100%; 
        height: {{height}}px; 
        background-image: url({{bg}});
    }

    .x-dot {
        width: {{width}}px; 
        height: {{width*0.2}}px
    }

    .col-dot {
      position: absolute;
      bottom: 0;
      padding-bottom: 0px;
      margin-bottom: 0px;
      font-family: inherit;
      width: {{width / length - width*0.00833}}px; 
    }

    .label-dot {
      position: absolute;
      bottom: {{width*0.15}}px;
      padding-bottom: 0px;
      margin-bottom: 0px;
      font-family: inherit;
      font-size: {{width*0.4/length}}px;
      color: black;
      width: {{width*0.2}}px; 
      text-align: right;
    }

    .no-angle {
        position: absolute;
        font-family: inherit;
        font-size: {{width*0.3/length}}px;
    }

    .container-dot {
        position: relative;
        padding: 0px;
        width: {{width}}px;
        margin: 0 auto;
    }
    .container-dot:before, .container-dot:after {
        display: table;
        content: " ";
    }
    .container-dot:after {
        clear: both;
    }

    .line {
        border-left: 1px dashed #ccc; 
        margin-left: {{(width/length - width*0.00833)*0.105}}px;
    }

    .labelmargin-dot {
        bottom: {{width*0.2-options.labelmargin}}px;
    }
    </style>

    <div class="container-dot">
        <div class="chart chart-size-dot">
            <div class="col-dot" 
                ng-repeat="dot in graphData"
                style="left:{{($index+0.2) / length * width}}px;">
                <div 
                    class="no-angle" 
                    style="bottom:{{dot.value / max * height-height/80}}px; color: {{textcolor[$index]}}; font-size:{{options.datafont}}px"><span>{{dot.value}}</span></div>
                <div class="line" 
                    style="height:{{dot.value / max * height-height/40}}px;"></div>
                <div 
                    class="dot"
                    style="bottom:{{dot.value / max * height-height/40}}px; background: {{dotcolor[$index]}};"
                    ng-click="fcn(dot, $index)"
                    ng-class="{clickable: clickable}">
                </div>
            </div>
        </div>
        <div class="x-dot">
            <div class="label-dot angle" 
                style="right:{{(length-1-$index) / length * width + width/(length*2.3)}}px; font-size:{{options.labelfont}}px;" 
                ng-class="{'labelmargin-dot': options.labelmargin}"
                ng-repeat="dot in graphData">
                <span>{{dot.label}}</span>
            </div>
        </div>
    </div>`





var circleGraphTemplate =
    `<style type="text/css">

    ${blue}
    ${bar}
    ${clickable}

    .chart-size-circle {
        width: 100%; 
        height: {{height}}px;
    }

    .col-circle {
      position: absolute;
      bottom: {{height/2}}px;
      left: {{width/2-0.018*width}}px;
      padding-bottom: 0px;
      margin-bottom: 0px;
      font-family: inherit;
      width: {{width / length - width*0.00833}}px; 
    }

    .right-angle-circle {
        position: absolute;
        bottom: {{height*0.005}}px;
        left: {{width / (length*2)-width*0.00833/2}}px;
        transform: rotate(-90deg);
        transform-origin: center left;
        font-family: inherit;
        font-size: {{inner/length*1.6}}px;
    }

    .radius {
        width: {{inner*0.84}}px;
    }

    .container-circle {
        position: relative;
        padding: 0px;
        width: {{width}}px;
        margin: 0 auto;
    }
    .container-circle:before, .container-circle:after {
        display: table;
        content: " ";
    }
    .container-circle:after {
        clear: both;
    }

    .custom-font {
        font-size: {{fontsize}}px;
    }

    </style>

    <div class="container-circle">
        <div class="chart-size-circle">
            <div class="col-circle" 
                ng-repeat="bar in graphData"
                ng-click="fcn(bar, $index)"
                ng-class="{clickable: clickable}">
                <div class="bar blue"
                    style="height:{{bar.value / (2*max) * (width-inner)}}px; background: {{barcolor[$index]}}; color: {{textcolor[$index]}}; transform: rotate({{360/data.length * $index+360/(data.length*2)}}deg) translateY(-{{inner}}px); transform-origin: bottom center;">
                    <div class="right-angle-circle custom-font"><span>{{bar.value}}</span></div>
                </div>
            </div>
            <div class="col-circle" 
                ng-repeat="bar in graphData"
                ng-show="label">
                <div
                    style="transform: rotate({{360/data.length * $index+360/(data.length*2)}}deg); transform-origin: bottom center;">
                    <div class="right-angle-circle custom-font radius"><span style="float: right">{{bar.label}}</span></div>
                </div>
            </div>
        </div>
    </div>`

var pieGraphTemplate =
    `<style type="text/css">
    .pieBackground {
          background-color: black;
          position: absolute;
          width: {{radius}}px;
          height: {{radius}}px;
          border-radius: {{radius/2}}px;
     } 

    .pieContainer {
          position: relative;
          height: {{radius}}px;
          width: {{radius*1.5}}px;
          margin: 0 auto;
     }

    .pie {
          position: absolute;
          width: {{radius}}px;
          height: {{radius}}px;
          border-radius: {{radius/2}}px;
          clip: rect(0px, {{radius/2}}px, {{radius}}px, 0px);
          background-color: #337ab7;
     }
     .hold {
          position: absolute;
          width: {{radius}}px;
          height: {{radius}}px;
          border-radius: {{radius/2}}px;
          clip: rect(0px, {{radius}}px, {{radius}}px, {{radius/2}}px);
     }

     .slice180 {
          transform:rotate(180deg);
     }

     .pie-label {
        position: relative;
        text-align: right;
        color: black;
     }

     .legend {
        border: 1px solid #ccc;
        position: absolute;
        top: 0;
        right: 0;
        width: {{radius/3}}px;
        border-radius: 4px;
     }
     .boxcolor {
        position: relative;
        float: left;
        height: {{radius/30}}px;
        width: {{radius/30}}px;
        border-radius: 3px;
        background-color: #337ab7;
     }
     .legend-label {
        position: relative; 
        float: left;
        left: {{radius/40}}px;
     }
     .legend-row {
        padding: {{radius/60}}px;
     }
     .legend-row:hover {
        cursor: pointer;
        opacity: 0.8;
     }
     .legend-row:before, .legend-row:after {
        display: table;
        content: " ";
     }
     .legend-row:after {
        clear: both;
    }

    </style>
    <div class="pieContainer">
        <div class="pieBackground"></div>
         <div class="hold" 
            style="transform:rotate({{partials[$index]/total*360}}deg);"
            ng-repeat="slice in graphData">
            <div class="pie" 
                style="background-color: {{piecolor[$index]}}; transform:rotate({{slice.value/total*360}}deg);">
                <div class="pie-label" 
                    style = "transform: rotate(-90deg) translateY(-{{slice.value/total*400}}px) translateX(-{{radius/2}}px); transform-origin: center center; font-size: {{slice.value/total*1000/digits[$index]+options.factor}}px; color: {{textcolor[$index]}}" >
                    {{slice.value}}
                </div>
            </div>
         </div>
         <div class="legend">
            <div class="legend-row" 
                ng-repeat="slice in graphData"
                ng-click="fcn(slice, $index)">
                 <div class="boxcolor" style="background: {{piecolor[$index]}}"></div>
                 <div class="legend-label">{{slice.label}}</div>
            </div>
         </div>
    </div>`