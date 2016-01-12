// Handles which functions to run.

var cpu = {
   _mainChart: null,
   menuStatus: false,
   start() {
      this._mainChart = new Chart("mainChartDiv", "mainChart");
      this._mainChart.start();
   },
   proc(procFunction) {
   // cpu methods go thru this to run necessary functions
   // beforehand (ex. close menu);
      menu.close();

      var arg = [];
      for (var i = 1, len = arguments.length; i < len; i++)
         arg.push(arguments[i]);
      return procFunction.apply(undefined, arg);
   },
   addRow(type, name) {
      if (name === undefined) menu.createMenu(addRow_menu);
      else cpu._mainChart.newRow(type, name);
   },
   delRow() {
      this.proc(display.msg, "Need to delete the row selected by user");
   },
   nextMonth() {
      this.proc(display.msg, "Need to move to next Month");
   },
   prevMonth() {
      this.proc(display.msg, "Need to move to prev Month");
   },
   getTypes() {
      return this.proc(function(){ return cpu._mainChart.getTypes(); });
   },
   save() {
      this.proc(display.msg, "Need to add save feature.");
   },
   showData() {
      var t = cpu;
      var mC = cpu._mainChart;
      console.log("Year: " + mC.year + " Month: " + mC.month +
         "\nChart: " + mC.chart +
         "\nDate Names: " + mC.dataNameIndex +
         "\nData Types: " + mC.dataTypeIndex);
   }
};