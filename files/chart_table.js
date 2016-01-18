function ChartTable(id) {
   this.id = id;
   this.table = null;
}

ChartTable.prototype.createTable = function() {
   this.table = makeElement("table", {id: this.id});
};

ChartTable.prototype.createRow = function(name, rowData) {
   var dataTypeObj = this.dataSwitch(type);
   var tr = document.createElement("tr"),
       td = document.createElement("td"),
       ele = document.createTextNode(name);

   tr.appendChild(td).appendChild(ele);

   each(rowData, function(cellData) {
      td = document.createElement("td");
      ele = dataTypeObj.createInput(cellData);
      tr.appendChild(td).appendChild(ele);
   });
};