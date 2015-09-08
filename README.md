##UI-DV

####What is it?

UI-DV is an angular data visualization library. It has pre-set directives that are extensive and configurable for easy injection into your app.

####Installation & Setup:

Run ````npm install ui-dv```` and inject "ui-dv" as a dependency into your angular app. Don't forget to include the script tag for ui.dv.js in your html.

####Documentation:

Every directive has the following basic attributes: data, fcn, and options.  
- Data is an array - the elements can be simply numbers, or they can be objects with number and string properties. It does not matter what you call the keys for the objects, but one value has to be a string and the other a number. The strings will be used as labels on the graph.  
```javascript
data = [1,2,3,4] || [{name: 'one', value: 1}, {name: 'two', value: 2}]
```  
- Fcn is a function - this function will be wired as an ng-click for each data element. It will receive the element itself as well as its index in the array.  
- Options is an object - the available options slightly vary depending on the directive. Refer to the options section below for details.
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

#####Options:

Options are optional - if not provided then default settings will apply. The following table provides a detailed description of what each option does and the type of data it receives:

|Option | Description |
|--------| :------------- |
| barcolor, dotcolor, piecolor, textcolor| Receives an array of colors/hex codes as strings. It can be any length - if shorter than the data set, it will automatically be repeated over. If not provided, the default blue color will be applied |
| bg | Receives an image url (string) to be used as the background of the graph |
| bg_dot | Receives an object with icon and size properties to set the background of the dots in the dot graph. Example: {icon: (url), size: (number)} |
| datafont, fontsize, labelfont | Receives a number to set the font size |
| factor | Receives a number to scale the font up by |
| inner| Receives a number to set the inner circle radius where the labels are |
| label | Receives a boolean to display or hide the labels |
| labelmargin | Receives a number to set the margin between the labels and the graph |
| sideways | Receives a boolean to set the graph sideways or normal |

Example:
```javascript
options = {
	barcolor: ['black', '#fff', 'blue'],
	bg_dot: {
		icon: 'http://myimage.png',
		size: 10
	},
	datafont: 20,
	sideways: true
};
```

The following table details out exactly what options each graph type takes:

|Graph Type| Options | Image |
|--------| :------------- | :-------------: |
| Bar <bar-graph>  | barcolor, textcolor, bg, sideways, labelfont, labelmargin, datafont | ![](http://s27.postimg.org/e5f7ln9cj/Screen_Shot_2015_09_03_at_12_18_25_PM.png) |
| Dot <dot-graph> | dotcolor, textcolor, bg, bg_dot, labelfont, labelmargin, datafont  | ![](http://s27.postimg.org/gqpdmwo43/Screen_Shot_2015_09_03_at_12_07_39_PM.png) |
| Circle <circle-graph> | barcolor, textcolor, inner, label, fontsize | ![](http://s27.postimg.org/74vt6lwyb/Screen_Shot_2015_09_03_at_12_10_47_PM.png) |
| Pie <pie-chart> | piecolor, textcolor, factor | ![](http://s27.postimg.org/wz5lwdwyb/Screen_Shot_2015_09_03_at_12_13_32_PM.png) |

####Author:

[Justin Kim](https://github.com/jkim430)

