function DataHandler(id, year, month, defaultIndex) {
   this.id = id;
   this.types = ["click", "date"];
   this._year = year;
   this._month = month;
   this._dataSet = {};
   this._indexName = id + "_index";
   this._defaultIndex = defaultIndex;
   this._index = [];
   this.loadData();
}

DataHandler.prototype.add = function(name, type) {
   if (this._inIndex(name) == -1) {
      this._addIndex(name, type);
      var dataObj = this._makeData(name, type);
      this._addData(dataObj);
   }
};

DataHandler.prototype.save = function() {
   this.saveData();
   this.saveNameIndex();
};

// DATA VALUES SECTION
DataHandler.prototype._makeData = function(name, type) {
   if (this._dataSet[name] === undefined) {
      return new Data(name, type);
   } else {
      return undefined;
   }
};
DataHandler.prototype._addData = function(dataObj) {
  if (dataObj !== undefined) {
      var name = dataObj.getName();
      this._dataSet[name] = dataObj;
   }
};

// DataHandler.prototype.checkMonth = function(name) {
//    this._dataSet[name].addMonth(this._year, this._month);
// };
// DataHandler.prototype._checkAllMonth = function() {
//    each(this._dataSet, function(data) {
//       data.addMonth(this._year, this._month);
//    }, this);
// };

// DataHandler.prototype.addData = function(name, type) {
//    if (type === undefined) type = "check";
//    if (this._dataSet[name] === undefined) {
//       this._dataSet[name] = {type: type, data: {}};
//    }
//    if (this._dataSet[name]["data"][this._year + "_" + this._month] === undefined) {
//       var dataObj = this.getDataWrapper(type);
//       var data = dataObj.makeData(this._year, this._month, name);
//       this._dataSet[name]["data"][this._year + "_" + this._month] = data;
//    }
// };
DataHandler.prototype.saveData = function() {
   storage.save(this.id, this._dataSet);
};
DataHandler.prototype.loadData = function() {
   var data = storage.load(this.id);
   if (data !== null)
      this._dataSet = data;
   else {
      this._dataSet = {};
   }
};
DataHandler.prototype.getData = function(name, type) {
   // If type is unspecificed, then the data MUST exists.
   if (this._dataSet[name] == undefined)
      this.addData(name, type);   
   return this._dataSet[name]["data"][this._year + "_" + this._month];
};
DataHandler.prototype.changeData = function(name, index, value) {
   this._dataSet[name]["data"][this._year + "_" + this._month][index] = value;
};
DataHandler.prototype.getDataObj = function(name) {
   return {
      name: name,
      type: this._dataSet[name]["type"],
      data: this._dataSet[name]["data"][this._year + "_" + this._month]
   };
};

// INDEX SECTION
DataHandler.prototype._addIndex = function(name) {
   if ( !(this._index.indexOf(name)) ) {
      this._index.push(name);
      return true;
   } else
      return false;
};
DataHandler.prototype._getIndex = function() {
   return this._index;
};
DataHandler.prototype._saveIndex = function() {
   storage.save( this.indexName(), this.index); 
};
DataHandler.prototype._loadIndex = function() {
   var loadedIndex = storage.load(this.indexName);
   if (loadedIndex !== null) {
      this.index = loadedIndex;
   } else if (this._defaultIndex !== undefined) {
      this.index = this._defaultIndex;
   } else {
      this.index = [];
   }
};

DataHandler.prototype._inIndex = function(name, type) {
   return this._index.indexOf(name);
};
DataHandler.prototype.dataFromNameIndex = function() {
   each(this.nameIndex, function(nameIndexElement) {
      var name = nameIndexElement.name,
            type = nameIndexElement.type;
      var eleArr = this.addData(name, type);
   }, this);
};

DataHandler.prototype.getDataWrapper = function(type) {
   switch(type) {
      case "click": return clickData;
      case "date": return dateData;
   }
};
DataHandler.prototype.getTypes = function() {
   var arr = [];
   this.types.forEach(function(type){
      if (type !== "date") arr.push(type);
   });
   return arr;
};

DataHandler.prototype.getDate = function() {
   return {
      year: this._year,
      month: this._month
   };
};

DataHandler.prototype.getElement = function(name, i) {
   if (i === undefined) {
      return this._dataSet[name].getElements(this._year, this._month);
   } else {
      return this._dataSet[name].getElement(this._year, this._month, i);
   }
};


DataHandler.prototype.getElementsWithName = function(name) {
// Appends text node elements of the name to the front of the element array.
// Used by table handler as it adds everything into a table row.
   var elementsArray = this._dataSet[name].getElements(this._year, this._month);
   elementsArray.unshift(ele = document.createTextNode(name));
   return elementsArray;
};

DataHandler.prototype.getAllElementsWithName = function() {
   var elementArrays = [];
   var index = this._getIndex();
   each(index, function(name) {
      elementArrays.push(this.getElementsWithName(name));
   }, this);
   return elementArrays;
};

DataHandler.prototype.changeDate = function(year, month) {
   if (month === undefined) {
      month = this._month + year;
      year = this._year;
   }
   var dates = date.monthConverter(year, month);
   this._month = dates.month;
   this._year = dates.year;
   // this.loadData();
};

DataHandler.prototype.clicked = function(name, index) {
   // CPU runs this, specifying table location clicked.
   // Changes subsequent data values in data & then returns
   // the html element.
   var dataObj = this.getDataObj(name);
   if (dataObj) {
      var type = dataObj.type,
      value = dataObj.data[index];
   
      var dataW = this.getDataWrapper(type),
         newValue = dataW.clicked(value);

      this.changeData(name, index, newValue);
      return this.dataToEle(name, type, index, newValue);
   } else {
      console.error("DataHandler.clicked given undefined data with name & index: " + name + " " + index);
   }
};