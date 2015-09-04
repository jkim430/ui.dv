##UI-DV

####What is it?
UI-DV is an angular data visualization library. It has pre-set directives that are extensive and configurable for easy injection into your app.

####Installation & Setup
Run ````npm install ui-dv```` and inject "ui-dv" as a dependency into your angular app. Don't forget to include the script tag for ui.dv.js in your html.

####Documentation
Every directive has the following basic attributes: data, fcn, and options.  
- Data is an array - the elements can be simply numbers, or they can be objects with number and string properties. It does not matter what you call the keys for the objects, but one value has to be a string and the other a number. The strings will be used as labels on the graph.  
```javascript
data = [1,2,3,4] || [{name: 'one', value: 1}, {name: 'two', value: 2}]
```  
- Fcn is a function - this function will be wired as an ng-click for each data element. It will receive the element itself as well as its index in the array.  
- Options is an object - the available options slightly vary depending on the directive. Refer to the table below for details.
- Bar, dot, and circle graphs take a width and height, while the pie chart takes a radius.

Example directive:  
```javascript
$scope.data = [1,2,3,4];  
$scope.running = function() {  
	console.log('running');  
}  
$scope.options = {sideways: true};  
<bar-graph width="100" height="100" data="data" fcn="running" options="options"></bar-graph>
```

#####Options
Options are optional - if not provided then default settings will apply. The following table provides a detailed description of what each option does and the type of data it receives:

|Option | Description |
|--------| :------------- |
| barcolor, dotcolor, piecolor, textcolor| Receives an array of hex color codes as strings. It can be any length - if shorter than the data set, it will automatically be repeated over. If not provided, the default blue color will be applied |
| bg | Receives an image url to be used as the background of the graph |
| bg_dot | Receives an object with icon and size properties to set the background of the dots in the dot graph. Example: {icon: (url), size: (number)} |
| datafont, fontsize, labelfont | Receives a number to set the font size |
| factor | Receives a number to scale the font up by |
| inner| Receives a number to set the inner circle radius where the labels are |
| label | Receives a boolean to display or hide the labels |
| labelmargin | Receives a number to set the margin between the labels and the graph |

The following table details out exactly what options each graph type takes:

|Graph Type| Options |
|--------| :------------- |
| Bar  | barcolor, textcolor, bg, sideways, labelfont, labelmargin, datafont |
| Dot | dotcolor, textcolor, bg, bg_dot, labelfont, labelmargin, datafont  |
| Circle | barcolor, textcolor, inner, label, fontsize |
| Pie | piecolor, textcolor, factor |

Include script tag with link to file in html. Angular must also be included.
Inject as dependency into angular app.

Attributes:

1. Bar Graph:
	- data: Array, can just be numbers, or objects with number and string props
	- width & height: dimensions of grid
	- fcn: pass in a fcn to trigger on ng click. will receive element and index
	- options:
		- barcolor: Array of colors (strings)
		- textcolor: Array of colors
		- bg: url of bg image for grid
		- sideways: Boolean
		- labelfont: font size of label
		- labelmargin: space between labels and graph
		- datafont: font size of data;

2. Dot Graph:
	- data: Array
	- width & height
	- fcn: pass in a fcn to trigger on ng click. will receive element and index
	- options:
		- dotcolor: Array of colors
		- textcolor
		- bg
		- bg_dot: Object with icon (img url) and size props
		- labelfont
		- labelmargin
		- datafont

3. Circle Graph:
	- data: Array
	- width & height
	- fcn: pass in a fcn to trigger on ng click. will receive element and index
	- options:
		- barcolor
		- textcolor
		- inner: set radius of inner circle for labels
		- label: boolean to show labels
		- fontsize: number

4. Pie Chart:
	- data: Array
	- radius
	- fcn
	- options:
		- piecolor
		- textcolor
		- factor: amount to increase font by;