function TableHandler(cpuRef, id) {
  this.cpu = cpuRef;
  this.id = id;
  this.tableId = id + "Table";
  this.tableDivId = id + "Div";
  this.table = undefined;
  this.rowsIndex = undefined;
}

TableHandler.prototype.load = function() {
  // If there is a previous table, this will remove it.
  if (this.table !== undefined) {
    this.deleteTable();
  }
  this.table = this.createTable();
  this.rowsIndex = [];
  this.appendTable();
};

TableHandler.prototype.deleteTable = function() {
  this.table.removeEventListener("click", this.clicked);
  var containerDiv = document.getElementById(this.id + "TableDiv");
  containerDiv.removeChild(this.table);
};
TableHandler.prototype.createTable = function() {
  var table = makeElement("table", {id: this.tableId});
  table.addEventListener("click", this.clicked.bind(this))
  return table;
};

TableHandler.prototype.clicked =function(e) {
  var id = e.target.id;
  if ( /\w+_\d+/.test(id) ) {
    var idArr = id.match(/(\w+)_(\d+)/);
    if (idArr !== null) {
      var name = idArr[1], cellNum = idArr[2];

      this.cpu.clicked(name, cellNum);
    }
  }
};

TableHandler.prototype.appendTable = function() {
  var containerDiv = document.getElementById(this.id + "TableDiv");
  containerDiv.appendChild(this.table);
};

TableHandler.prototype.createRow = function(name, type, eleArr) {
  if (this.rowsIndex.indexOf(name) == -1) {
    var tr = document.createElement("tr"),
      td = document.createElement("td"),
      ele = document.createTextNode(name);

    tr.appendChild(td).appendChild(ele);

    each(eleArr, function(element, i) {
      td = makeElement("td", {id: name + "_" + i})
      tr.appendChild(td).appendChild(element);  
    });

    this.table.appendChild(tr);

    this.rowsIndex.push(name)
  }
};

TableHandler.prototype.changeCell = function(name, cellNum, newElement) {
  var ele = document.getElementById(name + "_" + cellNum);
  ele.replaceChild(newElement, ele.firstChild)
}