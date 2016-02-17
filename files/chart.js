// chartDiv is id of container.
// id will be appointed to the created table.
function Chart(chartDivId, id) {
   this.id = id;
   this.containerId = chartDivId;
   this.chart = null;
   this.dataTypes = ["check", "date"];
   this.dataObj = {};
   this.month;
   this.year;

   this.dataHandler = null;
   this.tableHandler = null;
}

Chart.prototype.getTypes = function() {
   return this.data.getTypes();
};

Chart.prototype.fillDataObj = function() {
   var types = this.dataTypes; // Array
   types.forEach(function(type) {
      this.dataObj[type] = {};
   }, this);
};

Chart.prototype.createRow = function(name, type) {
   var dataTypeObj = this.dataSwitch(type);
   var data = dataTypeObj.makeData(this.year, this.month, name);

   var tr = document.createElement("tr"),
       td = document.createElement("td"),
       ele = document.createTextNode(data.name);

   tr.appendChild(td).appendChild(ele);

   each(data.data, function(data) {
      td = document.createElement("td");
      ele = dataTypeObj.createInput(data);
      tr.appendChild(td).appendChild(ele);
   });
   return tr;
};

Chart.prototype.addRow = function(name, type) {
   var data = this.dataHandler.add(name, type);

};

Chart.prototype.newRow = function(name, type) {
   var row = this.createRow(name, type);
   this.addData(name, type);
   
   this.chart.appendChild(row);
};

Chart.prototype.setup = function(year, month) {
   this.changeDate(year, month);
   if (this.dataHandler === null)
      this.dataHandler = new DataHandler(this.id, this.year, this.month);
   if (this.tableHandler === null)
      this.tableHandler = new TableHandler(this.id, this.containerId);
};

Chart.prototype.start = function() {
   // this.fillDataObj();
   var tObj = date.today();
   this.setup(tObj.year, tObj.month);
};

Chart.prototype.moveDate = function(year, month) {
   if (year === undefined) year = 0;
   var dates = date.monthConverter(this.year + year, this.month + month);
   this.changeDate(dates.year, dates.month);
};

Chart.prototype.changeDate = function(year, month) {
   this.month = month;
   this.year = year;
   display.date(year, month);
};