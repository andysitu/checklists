function DataHandler(id, year, month, defaultIndex) {
   this.id = id;
   this.types = ["click", "date"];
   this.year = year;
   this.month = month;
   this.dataSet = {};
   this.index = [];
   this.loadIndex(defaultIndex);
   this.loadData();
}

DataHandler.prototype.add = function(name, type) {
   this.addIndex(name, type);
   var data = this.addData(name, type);
   return data;
};
DataHandler.prototype.save = function() {
   this.saveData();
   this.saveIndex();
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
   if (this.dataSet[name] == undefined)
      this.addData(name, type);   
   return this.dataSet[name].data;
};

// INDEX SECTION
DataHandler.prototype.saveIndex = function() {
   storage.save("index_" + this.id, this.index);
};
DataHandler.prototype.loadIndex = function(defaultIndex) {
   if (this.index.length == 0) {
      var savedIndex = storage.load("index_" + this.id);
      if (savedIndex !== null) {
         this.index = savedIndex;
      } else if (defaultIndex !== undefined && Array.isArray(defaultIndex)) {
         this.index = defaultIndex;
      }
   }
};
DataHandler.prototype.addIndex = function(name, type) {
   if (this.inIndex(name, type) == false) {
      this.index.push( { name: name, type: type } );
   }
};
DataHandler.prototype.getIndex = function() {
   return this.index;
};
DataHandler.prototype.inIndex = function(name, type) {
   var status = false;
   each(this.index, function(indexElement) {
      if (indexElement.name == name)
         status = true;
   });
   return status;
};
DataHandler.prototype.dataFromIndex = function() {
   each(this.index, function(indexElement) {
      var name = indexElement.name,
            type = indexElement.type;
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

DataHandler.prototype.dataToEle = function(name, type) {
   var data = this.getData(name, type),
         dataWrapper = this.getDataWrapper(type);
   var eleArr = [], ele;

   each(data, function(dataValue) {
      ele = dataWrapper.createInput(dataValue);
      eleArr.push(ele);
   });

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