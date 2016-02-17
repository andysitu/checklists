function DataHandler(id, year, month, defaultNameIndex) {
   this.id = id;
   this.types = ["click", "date"];
   this.year = year;
   this.month = month;
   this.dataSet = {};
   this.nameNameIndex = [];
   this.loadNameIndex(defaultNameIndex);
   this.loadData();
}

DataHandler.prototype.add = function(name, type) {
   this.addNameIndex(name, type);
   var data = this.addData(name, type);
   return data;
};
DataHandler.prototype.save = function() {
   this.saveData();
   this.saveNameIndex();
};

// DATA VALUES SECTION
DataHandler.prototype.addData = function(name, type) {
   if (this.dataSet[name] === undefined) {
      var dataObj = this.getDataWrapper(type);
      var data = dataObj.makeData(this.year, this.month, name);
      this.dataSet[name] = data;
   }
   return this.dataSet[name].data;
};
DataHandler.prototype.saveData = function() {
   storage.save(this.year + "_" + this.month + "_" + this.id, this.dataSet);
};
DataHandler.prototype.loadData = function() {
   var data = storage.load(this.year + "_" + this.month + "_" + this.id);
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
   return this.dataSet[name].data;
};
DataHandler.prototype.changeData = function(name, index, value) {
   this.dataSet[name]["data"][index] = value;
}

// INDEX SECTION
DataHandler.prototype.saveNameIndex = function() {
   storage.save("nameNameIndex_" + this.id, this.nameNameIndex);
};
DataHandler.prototype.loadNameIndex = function(defaultNameIndex) {
   if (this.nameNameIndex.length == 0) {
      var savedNameIndex = storage.load("nameNameIndex_" + this.id);
      if (savedNameIndex !== null) {
         this.nameNameIndex = savedNameIndex;
      } else if (defaultNameIndex !== undefined && Array.isArray(defaultNameIndex)) {
         this.nameNameIndex = defaultNameIndex;
      }
   }
};
DataHandler.prototype.addNameIndex = function(name, type) {
   if (this.inNameIndex(name, type) == false) {
      this.nameNameIndex.push( { name: name, type: type } );
   }
};
DataHandler.prototype.getNameIndex = function() {
   return this.nameNameIndex;
};
DataHandler.prototype.inNameIndex = function(name, type) {
   var status = false;
   each(this.nameNameIndex, function(nameNameIndexElement) {
      if (nameNameIndexElement.name == name)
         status = true;
   });
   return status;
};
DataHandler.prototype.dataFromNameIndex = function() {
   each(this.nameNameIndex, function(nameNameIndexElement) {
      var name = nameNameIndexElement.name,
            type = nameNameIndexElement.type;
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

DataHandler.prototype.convertToElement = function(name, i) {
   var dataContainer = this.getDataWrapper(type),
         data = this.dataSet[name]["data"][i],
         type = this.dataSet[name].type;
   return dataContainer.createInput(data);
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
   } else {
   }
   var dates = date.monthConverter(year, month);
   this.month = dates.month;
   this.year = dates.year;
   this.loadData();
};

DataHandler.prototype.clicked = function(name, index) {
   // CPU runs this, specifying table location clicked.
   // Changes subsequent data values in data & then returns
   // the html element.
   var dataObj = this.dataSet[name];
   if (dataObj) {
      type = dataObj.type,
      value = dataObj.data[index];
   

      var dataW = this.getDataWrapper(type),
         newValue = dataW.clicked(value);

      this.changeData(name, index, newValue);
      return this.dataToEle(name, type, index, newValue);
   } else {
      console.error("DataHandler.clicked given undefined data with name & index: " + name + " " + index);
   }
};