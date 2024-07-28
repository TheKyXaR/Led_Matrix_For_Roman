const
	win = document.getElementById('window');
	draw_window = document.getElementById('draw');
	input_hor_count = document.getElementById('h_count');
	input_ver_count = document.getElementById('v_count');
	input_ver_win = document.getElementById('v_win');
	input_hor_win = document.getElementById('h_win');
	left_panel = document.getElementById('left_panel');

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

// function for create and download file
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

	input_ver_win.addEventListener('input', (event) => {
		draw_window.style.height = `${event.target.value}vh`;
	});

	input_hor_win.addEventListener('input', (event) => {
		draw_window.style.width = `${event.target.value}vw`;
	});

	input_hor_win.addEventListener('mouseup', (event) => {
		win.style.width = `${draw_window.offsetWidth + left_panel.offsetWidth * 2 + 10}px`;
	});
});

// click event
addEventListener("click", (event) => {
	const target = event.target;

	if (target && target.attributes && target.attributes.id && target.attributes.id.value === 'pixel') {  // check atribute id
		let x = event.srcElement.attributes.x.value;
		let y = event.srcElement.attributes.y.value;
		pixels_status[x][y] = pixels_status[x][y] == 0x000000 ? 0xFFFFFF : 0x000000;  // change status pixels
		event.srcElement.style.backgroundColor = pixels_status[x][y] ? "white" : "black";
	}
});