function DataHandler(id, year, month, defaultNameIndex) {
   this.id = id;
   this.types = ["click", "date"];
   this.year = year;
   this.month = month;
   this._dataSet = {};
   this.nameIndex = [];
   this._index = [];
   this.loadNameIndex(defaultNameIndex);
   this.loadData();
}

DataHandler.prototype.add = function(name, type) {
   if (this._inIndex(name) == -1) {
      this._addIndex(name, type);
      this._makeData(name, type);
   }
};

DataHandler.prototype.save = function() {
   this.saveData();
   this.saveNameIndex();
};

// DATA VALUES SECTION
DataHandler.prototype._makeData = function(name, type) {
   if (this._dataSet[name] === undefined) {
      var data = new Data(name, type);
      this._dataSet[name] = data;
   }
   this.checkMonth(name);
};

DataHandler.prototype.checkMonth = function(name) {
   this._dataSet[name].addMonth(this.year, this.month);
};
DataHandler.prototype._checkAllMonth = function() {
   each(this._dataSet, function(data) {
      data.addMonth(this.year, this.month);
   }, this);
};

// DataHandler.prototype.addData = function(name, type) {
//    if (type === undefined) type = "check";
//    if (this._dataSet[name] === undefined) {
//       this._dataSet[name] = {type: type, data: {}};
//    }
//    if (this._dataSet[name]["data"][this.year + "_" + this.month] === undefined) {
//       var dataObj = this.getDataWrapper(type);
//       var data = dataObj.makeData(this.year, this.month, name);
//       this._dataSet[name]["data"][this.year + "_" + this.month] = data;
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
   return this._dataSet[name]["data"][this.year + "_" + this.month];
};
DataHandler.prototype.changeData = function(name, index, value) {
   this._dataSet[name]["data"][this.year + "_" + this.month][index] = value;
};
DataHandler.prototype.getDataObj = function(name) {
   return {
      name: name,
      type: this._dataSet[name]["type"],
      data: this._dataSet[name]["data"][this.year + "_" + this.month]
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

DataHandler.prototype.getNIName = function() {
   return "nameIndex_" + this.id;
}
DataHandler.prototype.saveNameIndex = function() {
   storage.save( this.getNIName(), this.nameIndex); 
};
DataHandler.prototype.loadNameIndex = function(defaultNameIndex) {
   if (this.nameIndex.length == 0) {
      var savedNameIndex = storage.load( this.getNIName() );
      if (savedNameIndex !== null) {
         this.nameIndex = savedNameIndex;
      } else if (defaultNameIndex !== undefined && Array.isArray(defaultNameIndex)) {
         this.nameIndex = defaultNameIndex;
      }
   }
};
DataHandler.prototype.addNameIndex = function(name, type) {
   if (this.inNameIndex(name, type) == false) {
      this.nameIndex.push( { name: name, type: type } );
   }
};
DataHandler.prototype.getNameIndex = function() {
   return this.nameIndex;
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
      year: this.year,
      month: this.month
   };
};

DataHandler.prototype.getElement = function(name, i) {
   if (i === undefined) {
      return this._dataSet[name].getElements(this.year, this.month);
   } else {
      return this._dataSet[name].getElement(this.year, this.month, i);
   }
};

DataHandler.prototype.getElementsWithName = function(name) {
// Appends text node elements of the name to the front of the element array.
// Used by table handler as it adds everything into a table row.
   var elementsArray = this._dataSet[name].getElements(this.year, this.month);
   elementsArray.unshift(ele = document.createTextNode(name));
   return elementArrays;
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
      month = this.month + year;
      year = this.year;
   }
   var dates = date.monthConverter(year, month);
   this.month = dates.month;
   this.year = dates.year;
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