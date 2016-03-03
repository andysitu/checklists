// Don't know where to place this yet.
var loader = {};
var mainCPU, c;
var t1;
// Run start methods of objs on load.
function loadup() {
   c = mainCPU = new CPU("main");
   // cpu.start();
   each(ui, function(funct) {funct();});

   each(loader, function(funct){ 
      if (typeof funct == "function") funct(); 
   });

   t1 = new Data("test", "click");
   t1.make(2016, 2);
   console.log(t1._getData(2016, 2));
}

window.addEventListener("load", loadup);