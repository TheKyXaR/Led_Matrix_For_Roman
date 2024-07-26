var draw_window = document.getElementById('draw');
var side = (draw_window.offsetHeight + draw_window.offsetWidth) / 2;

var win_height = 10;
var win_width = 10;

draw_window.style.display = "grid";
draw_window.style.gridTemplateColumns = `repeat(${win_width}, 1fr)`;
draw_window.style.gridTemplateRows = `repeat(${win_height}, 1fr)`;

// create field of divs and set pixel status
var pixels_status = [];
for (let x = 0; x < win_width; x++) {
	pixels_status[x] = [];
	for (let y = 0; y < win_height; y++) {
		draw_window.innerHTML += `<div class="pixel" id="pixel"  x="${x}" y="${y}"></div>`;
		pixels_status[x][y] = false;
	}
}

// click event
addEventListener("click", (event) => {
	if (event.srcElement.attributes.id.value = 'pixel') {
		let x = event.srcElement.attributes.x.value;
		let y = event.srcElement.attributes.y.value;
		pixels_status[x][y] = !pixels_status[x][y];
		event.srcElement.style.backgroundColor = pixels_status[x][y] ? "white" : "black";
	}
});

// addEventListener("mousemove", (event) => {
// 	console.log(event);
// });

// addEventListener("", (event) => {
// 	console.log(event);
// });