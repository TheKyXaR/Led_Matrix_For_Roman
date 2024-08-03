const
	win = document.getElementById('window');
	draw_window = document.getElementById('draw');
	input_hor_count = document.getElementById('h_count');
	input_ver_count = document.getElementById('v_count');
	left_panel = document.getElementById('left_panel');
	dropZone = document.getElementById('drop-zone');
	fileContent = document.getElementById('file-content');

var
	win_height = 10;
	win_width = 10;

// create field of divs and set pixel status
var pixels_status = [];
function create_field(win_height, win_width) {
	pixels_status = [];
	let elements = '';
	for (let x = 0; x < win_width; x++) {
		pixels_status[x] = [];
		for (let y = 0; y < win_height; y++) {
			elements += `<div class="pixel" id="pixel"  x="${x}" y="${y}"></div>`;
			pixels_status[x][y] = 0x000000;
		}
	}
	draw_window.innerHTML = elements;
}
create_field(win_height, win_width);

// function cleat widow
function clear_win() {
	create_field(win_height, win_width);
}

// function download file
function export_file() {
	const
		dataString = '[\n' + pixels_status.map(subArray => '	[' + subArray.map(num => '0x' + num.toString(16).toUpperCase().padStart(6, '0')).join(', ') + ']').join(',\n') + '\n]';
		date = new Date();
		blob = new Blob([dataString], { type: 'text/plain' });
		link = document.createElement('a');

	link.href = URL.createObjectURL(blob);
	link.download = `matrix_conf_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
	link.click();
	URL.revokeObjectURL(link.href);
}

// check change window settings
document.addEventListener('DOMContentLoaded', (event) => {
	input_hor_count.addEventListener('input', (event) => {
		win_width = event.target.value > 0 ? event.target.value : 10;
		create_field(win_height, win_width);
		draw_window.style.gridTemplateRows = `repeat(${win_width}, 1fr)`;
	});

	input_ver_count.addEventListener('input', (event) => {
		win_height = event.target.value > 0 ? event.target.value : 10;
		create_field(win_height, win_width);
		draw_window.style.gridTemplateColumns = `repeat(${win_height}, 1fr)`;
	});
});

// slide event
let
	isDragging = false;
	target_elem = false;
	color_slide = false;

addEventListener("mousedown", (event) => {
	const target = event.target;

	if (target && target.attributes && target.attributes.id && target.attributes.id.value === 'pixel') {
		isDragging = true;
		target_elem = target;
		let x = target.attributes.x.value;
		let y = target.attributes.y.value;
		pixels_status[x][y] = pixels_status[x][y] == 0x000000 ? 0xFFFFFF : 0x000000;
		color_slide = pixels_status[x][y];
		target.style.backgroundColor = pixels_status[x][y] ? "white" : "black";
	}
});

addEventListener("mousemove", (event) => {
	const target = event.target;

	if (isDragging && target_elem != target) {
		if (target && target.attributes && target.attributes.id && target.attributes.id.value === 'pixel') {
			target_elem = target;
			let x = event.srcElement.attributes.x.value;
			let y = event.srcElement.attributes.y.value;
			if (pixels_status[x][y] != color_slide) {
				pixels_status[x][y] = pixels_status[x][y] == 0x000000 ? 0xFFFFFF : 0x000000;  // change status pixels
				event.srcElement.style.backgroundColor = pixels_status[x][y] ? "white" : "black";	
			}
		}
	}
});

addEventListener("mouseup", () => {
	isDragging = false;
});

// load file
dropZone.addEventListener("dragover", (event) => {
	event.preventDefault();
	dropZone.style.opacity = '100%';
	dropZone.style.zIndex = '2';
});

dropZone.addEventListener("dragleave", () => {
	dropZone.style.opacity = '0%';
	dropZone.style.zIndex = '0';
});

dropZone.addEventListener("drop", (event) => {
	event.preventDefault();
	dropZone.style.opacity = '0%';
	dropZone.style.zIndex = '0';

	const files = event.dataTransfer.files;
	if (files.length) {
		const file = files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			const
				str = e.target.result;
				validJSON = str.replace(/0x([0-9A-Fa-f]+)/g, '"0x$1"');
				array = JSON.parse(validJSON);
				numericArray = array.map(row => row.map(item => parseInt(item, 16)));
				hexArray = numericArray.map(row => row.map(item => '0x' + item.toString(16).padStart(6, '0')));

			win_width = hexArray[0].length;
			win_height = hexArray.length;

			create_field(hexArray.length, hexArray[0].length);
			draw_window.style.gridTemplateRows = `repeat(${hexArray.length}, 1fr)`;
			draw_window.style.gridTemplateColumns = `repeat(${hexArray[0].length}, 1fr)`;

			pixels = document.getElementsByClassName('pixel');
			for (var y = 0; y < hexArray.length; y++) {
				for (var x = 0; x < hexArray[y].length; x++) {
					console.log(pixels[hexArray.length * y + x].style.backgroundColor = hexArray[y][x] == "0x000000" ? "black" : "white");
				}
			}
			pixels_status = hexArray;
		}
		reader.readAsText(file);
	}
});