// Handles which functions to run.
var t;

function CPU(name) {
   this.name = name;
   var today = date.today();
   t = this.dataHandler = new DataHandler(name, today.year, today.month, [{name: "Date", type: "date"}]);
   this.tableHandler = new TableHandler(this, name);
   this.changeDate(today.year, today.month);
   this.load();
}

CPU.prototype.load = function() {
   this.tableHandler.load();
   this.dataIntoTable();
};

CPU.prototype.dataIntoTable = function() {
   var elementsArrays = this.dataHandler.getAllElementsWithName(name);
   this.tableHandler.createRows(elementsArrays);
};

CPU.prototype.createAddRowMenu = function(name, type) {
   menu.createMenu(this, addRow_menu);
};

CPU.prototype.delRow = function() {
   console.log("Testing");
};

CPU.prototype.getTypes = function() {
   return this.dataHandler.getTypes();
};

CPU.prototype.addRow = function(name, type) {
   this.dataHandler.add(name, type);
   var elements = this.dataHandler.getElement(name);
   this.tableHandler.createRow(name, elements);
};

CPU.prototype.displayDate = function() {
   var date = this.dataHandler.getDate();
   display.date(date.year, date.month);
};

CPU.prototype.showData = function() {
   console.log(this.dataHandler.dataSet);
};

CPU.prototype.changeDate = function(year, month) {
   this.dataHandler.changeDate(year, month);
   this.displayDate();
   // this.load();
};

CPU.prototype.nextMonth = function(){this.changeDate(1);};
CPU.prototype.prevMonth = function(){this.changeDate(-1);};
CPU.prototype.today = function() {
   var today = date.today();
   this.changeDate(today.year, today.month);
};

CPU.prototype.clicked = function(name, cellNum) {
   var newElement = this.dataHandler.clicked(name, cellNum);
   this.tableHandler.changeCell(name, cellNum, newElement);
};