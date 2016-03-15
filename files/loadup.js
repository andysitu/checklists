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

   // t1 = new Data("test", "click");
   // t1.addMonth(2016, 2);
   // var da = t1._getDataArray(2016, 2);
   // var eleArr = t1.getElements(2016, 2);
   // console.log("Data Array : ", da);
   // console.log("Element Array: ", eleArr);
   // var ele = t1.clicked(2016, 2, 0);
   // console.log("Clicked Data Array :", da);
   // console.log("Returned element:", ele);
}

window.addEventListener("load", loadup);