const
	win = document.getElementById('window');
	draw_window = document.getElementById('draw');
	input_hor_count = document.getElementById('h_count');
	input_ver_count = document.getElementById('v_count');

var
	win_height = 10;
	win_width = 10;

draw_window.style.gridTemplateColumns = `repeat(${win_width}, 1fr)`;
draw_window.style.gridTemplateRows = `repeat(${win_height}, 1fr)`;

// create field of divs and set pixel status
var pixels_status = [];
function create_field(win_height, win_width) {
	let elements = '';
	for (let x = 0; x < win_width; x++) {
		pixels_status[x] = [];
		for (let y = 0; y < win_height; y++) {
			elements += `<div class="pixel" id="pixel"  x="${x}" y="${y}"></div>`;
			pixels_status[x][y] = false;
		}
	}
	draw_window.innerHTML = elements;
}

create_field(win_height, win_width);

// check change window settings
document.addEventListener('DOMContentLoaded', (event) => {
	input_hor_count.addEventListener('input', (event) => {
		win_width = event.target.value;
		create_field(win_height, win_width);
		draw_window.style.gridTemplateRows = `repeat(${win_width}, 1fr)`;
	});
	input_ver_count.addEventListener('input', (event) => {
		win_height = event.target.value;
		create_field(win_height, win_width);
		draw_window.style.gridTemplateColumns = `repeat(${win_height}, 1fr)`;
	});
});

// click event
addEventListener("click", (event) => {
	const target = event.target;

	if (target && target.attributes && target.attributes.id && target.attributes.id.value === 'pixel') {  // check atribute id
		let x = event.srcElement.attributes.x.value;
		let y = event.srcElement.attributes.y.value;
		pixels_status[x][y] = !pixels_status[x][y];  // change pixel status
		event.srcElement.style.backgroundColor = pixels_status[x][y] ? "white" : "black";
	}
});