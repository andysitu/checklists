function tester() {
   console.log("HI");
}

// loadup.js runs all methods with each function
var ui = {
   addRow() {
      var button = document.getElementById("addRow");
      button.addEventListener("click", cpu.addRow.bind(cpu));
   },
   delRow() {
      var b = document.getElementById("deleteRow");
      b.addEventListener("click", cpu.delRow.bind(cpu))
   },
   nextMonth() {
      var button = document.getElementById("nextMonth");
      button.addEventListener("click", cpu.nextMonth.bind(cpu));
   },
   prevMonth() {
      var button = document.getElementById("prevMonth");
      button.addEventListener("click", cpu.prevMonth.bind(cpu));
   },
   showData() {
      var b = document.getElementById("showData");
      b.addEventListener("click", cpu.showData.bind(cpu));
   },
   save() {
      var b = document.getElementById("save");
      b.addEventListener("click", cpu.save.bind(cpu));
   }
};