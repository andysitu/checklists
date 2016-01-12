// chartDiv is id of container.
// id will be appointed to the created table.
function Chart(chartDivId, id) {
   this.id = id;
   this.containerId = chartDivId;
   this.container = document.getElementById(this.containerId);
   this.chart = null;
   this.dataTypes = ["check", "date"];
   this.dataNameIndex = [];
   this.dataTypeIndex = [];
   this.dataObj = {};
   this.month;
   this.year;
}
Chart.prototype.fillDataObj = function() {
   var types = this.dataTypes; // Array
   types.forEach(function(type) {
      this.dataObj[type] = {};
   }, this);
};

Chart.prototype.getTypes = function() {
   var arr = [];
   this.dataTypes.forEach(function(type){
      if (type !== "date") arr.push(type);
   });
   return arr;
};
Chart.prototype.dataSwitch = function(type) {
   switch(type) {
      case "check": return checkData;
      case "date": return dateData;
   }
};

Chart.prototype.createRow = function(type, name) {
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

Chart.prototype.addData = function(type, name) {
   var dataObj = this.dataSwitch(type),
         data = dataObj.makeData(this.year, this.month, name);

   if (!(name in this.dataObj[type])) { 
      this.dataObj[type][name] = {};
   }
   this.dataObj[type][name][this.year + "_" + this.month] = data;

   this.dataNameIndex.push(data.name);
   this.dataTypeIndex.push(data.type);
};

Chart.prototype.newRow = function(type, name) {
   var row = this.createRow(type, name);
   this.addData(type, name);
   
   this.chart.appendChild(row);
};

Chart.prototype.createTable = function() {
   var c = makeElement("table", {id: this.id});
   return c;
};

Chart.prototype.setup = function(year, month) {
   this.changeDate(year, month);
   this.chart = this.createTable();
   this.container.appendChild(this.chart);
   this.newRow("date");
}

Chart.prototype.start = function() {
   this.fillDataObj();
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