// Don't know where to place this yet.
var mainCPU, c;
var t1;
// Run start methods of objs on load.
function loadup() {
   c = mainCPU = new CPU("main");
   each(ui, function(funct) {funct();});

   mainCPU.addRow("test", "click");
}

window.addEventListener("load", loadup);