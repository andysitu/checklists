// loadup.js runs start methods of each obj first.
var ui = {
   addRow() {
      var button = document.getElementById("addRow");
      button.addEventListener("click", mainCPU.createAddRowMenu.bind(mainCPU));
   },
   delRow() {
      var b = document.getElementById("deleteRow");
      b.addEventListener("click", mainCPU.delRow)
   },
   nextMonth() {
      var button = document.getElementById("nextMonth");
      button.addEventListener("click", mainCPU.nextMonth.bind(mainCPU));
   },
   prevMonth() {
      var button = document.getElementById("prevMonth");
      button.addEventListener("click", mainCPU.prevMonth.bind(mainCPU));
   },
   today() {
      var button = document.getElementById("today");
      button.addEventListener("click", mainCPU.today.bind(mainCPU));
   },
   showData() {
      var b = document.getElementById("showData");
      b.addEventListener("click", mainCPU.showData.bind(mainCPU));
   },
   save() {
      var b = document.getElementById("save");
      b.addEventListener("click", mainCPU.save);
   }
};