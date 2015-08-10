DOCUMENTATION

Attributes:

1. Bar Graph:
	- data: Array, can just be numbers, or objects with number and string props
	- width & height: dimensions of grid
	- fcn: pass in a fcn to trigger on ng click. will receive element and index
	- options:
		-barcolor: Array of colors (strings)
		-textcolor: Array of colors
		-bg: url of bg image for grid
		-sideways: Boolean
		-labelfont: font size of label
		-labelmargin: space between labels and graph
		-datafont: font size of data;

2. Dot Graph:
	- data: Array
	- width & height
	- fcn: pass in a fcn to trigger on ng click. will receive element and index
	- options:
		-dotcolor: Array of colors
		-textcolor
		-bg
		-bg_dot: Object with icon (img url) and size props
		-labelfont
		-labelmargin
		-datafont

3. Circle Graph:
	- data: Array
	- width & height
	- fcn: pass in a fcn to trigger on ng click. will receive element and index
	- options:
		-barcolor
		-textcolor
		-inner: set radius of inner circle for labels
		-label: boolean to show labels
		-fontsize: number

4. Pie Chart:
	- data: Array
	- radius
	- fcn
	- options:
		-piecolor
		-textcolor
		-factor: amount to increase font by;