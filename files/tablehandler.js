function TableHandler(cpuRef, id) {
  this.cpu = cpuRef;
  this.id = id;
  this.tableId = id + "Table";
  this.tableDivId = id + "Div";
  this.table_element = undefined;
  this.rowsIndex = undefined;
}

TableHandler.prototype.newTable = function() {
  // If there is a previous table, this will remove it.
  if (this.table_element !== undefined) {
    this._deleteTable();
  }
  this.table_element = this._createTable();
  this.rowsIndex = [];
  this.appendTable();
};

TableHandler.prototype._deleteTable = function() {
  this.table_element.removeEventListener("click", this.clicked);
  var containerDiv = document.getElementById(this.id + "TableDiv");
  containerDiv.removeChild(this.table_element);
};
TableHandler.prototype._createTable = function() {
  var table = makeElement("table", {id: this.tableId});
  table.addEventListener("click", this.clicked.bind(this))
  return table;
};

TableHandler.prototype.clicked =function(e) {
  var id = e.target.id;
  if ( /\w+_\d+/.test(id) ) {
    var idArr = id.match(/(\w+)_(\d+)/);
    if (idArr !== null && !(/_/.test(idArr[1])) ) {
      var name = idArr[1], cellNum = idArr[2];

      this.cpu.clicked(name, cellNum);
    }
  }
};

TableHandler.prototype.appendTable = function() {
  var containerDiv = document.getElementById(this.id + "TableDiv");
  containerDiv.appendChild(this.table_element);
};

TableHandler.prototype.createRow = function(name, elementArray) {
  if (this.rowsIndex.indexOf(name) == -1) {
    var tr = document.createElement("tr"),
      td;

    each(elementArray, function(element, i) {
      td = makeElement("td", {id: name + "_Cell_" + (i -1)});
      tr.appendChild(td).appendChild(element);  
    });

    this.table_element.appendChild(tr);

    this.rowsIndex.push(name)
  }
};

TableHandler.prototype.createRows = function(elementArrays) {
  each(elementArrays, function(elementArray) {
    this.createRow(elementArray);
  }, this)
};

TableHandler.prototype.changeCell = function(name, cellNum, newElement) {
  var ele = document.getElementById(name + "_" + cellNum),
      td = document.getElementById(name + "_Cell_" + cellNum);
  td.replaceChild(newElement, ele);
};