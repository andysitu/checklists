function DataHandler(id, year, month, defaultNameIndex) {
   this.id = id;
   this.types = ["click", "date"];
   this.year = year;
   this.month = month;
   this.dataSet = {};
   this.nameIndex = [];
   this._index = [];
   this.loadNameIndex(defaultNameIndex);
   this.loadData();
}

DataHandler.prototype.add = function(name, type) {
   this._addIndex(name);
   this.addNameIndex(name, type);
   this._makeData(name, type);
};
DataHandler.prototype.save = function() {
   this.saveData();
   this.saveNameIndex();
};


// DATA VALUES SECTION
DataHandler.prototype._makeData = function(name, type) {
   if (this.dataSet[name] === undefined) {
      var data = new Data(name, type);
      this.dataSet[name] = data;
   }
   data.addMonth(this.year, this.month);
};

// DataHandler.prototype.addData = function(name, type) {
//    if (type === undefined) type = "check";
//    if (this.dataSet[name] === undefined) {
//       this.dataSet[name] = {type: type, data: {}};
//    }
//    if (this.dataSet[name]["data"][this.year + "_" + this.month] === undefined) {
//       var dataObj = this.getDataWrapper(type);
//       var data = dataObj.makeData(this.year, this.month, name);
//       this.dataSet[name]["data"][this.year + "_" + this.month] = data;
//    }
// };
DataHandler.prototype.saveData = function() {
   storage.save(this.id, this.dataSet);
};
DataHandler.prototype.loadData = function() {
   var data = storage.load(this.id);
   if (data !== null)
      this.dataSet = data;
   else {
      this.dataSet = {};
   }
};
DataHandler.prototype.getData = function(name, type) {
   // If type is unspecificed, then the data MUST exists.
   if (this.dataSet[name] == undefined)
      this.addData(name, type);   
   return this.dataSet[name]["data"][this.year + "_" + this.month];
};
DataHandler.prototype.changeData = function(name, index, value) {
   this.dataSet[name]["data"][this.year + "_" + this.month][index] = value;
};
DataHandler.prototype.getDataObj = function(name) {
   return {
      name: name,
      type: this.dataSet[name]["type"],
      data: this.dataSet[name]["data"][this.year + "_" + this.month]
   };
};


// INDEX SECTION
DataHandler.prototype._addIndex = function(name) {
   this._index.push(name);
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
DataHandler.prototype.inNameIndex = function(name, type) {
   var status = false;
   each(this.nameIndex, function(nameIndexElement) {
      if (nameIndexElement.name == name)
         status = true;
   });
   return status;
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

DataHandler.prototype.dataToEle = function(name, type, i, value) {
   var dataWrapper = this.getDataWrapper(type);
   var ele = dataWrapper.createInput(value);
   ele.id = name + "_" + i;
   return ele;
}

DataHandler.prototype.dataArrToEle = function(name, type) {
   var data = this.getData(name, type),
         dataWrapper = this.getDataWrapper(type);
   var eleArr = [], ele;
   each(data, function(dataValue, i) {
      ele = this.dataToEle(name, type, i, dataValue);
      eleArr.push(ele);
   }, this);

   return eleArr;
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