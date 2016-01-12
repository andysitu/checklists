function Data(year, month, id) {
   this.id = id;
   this.year = year;
   this.month = month;
   this.dataSet = {};
   this.nameIndex = [];
   this.start(year, month);
}

Data.prototype.start = function() {
   this.load(this.year, this.month);
};

Data.prototype.add = function(type, name) {
   this.addData(type, name);
   this.addIndex(type, name);
};
Data.prototype.save = function() {
   this.saveData();
   this.saveIndex();
};
Data.prototype.load = function() {
   this.loadData();
   this.loadIndex();
   if (Object.keys(this.dataSet).length == 0) {
      this.add("date", "Date");
   }
   else {
      console.log("load");
   }
};

Data.prototype.saveIndex = function() {
   storage.save("nameIndex_" + this.id, this.nameIndex);
};
Data.prototype.loadIndex = function() {
   var nameIn = storage.load("nameIndex_" + this.id);

   if (nameIn !== null) {
      this.nameIndex = nameIn;
   }
};
Data.prototype.addIndex = function(type, name) {
   if (this.nameIndex.indexOf(name) == -1) {
      this.nameIndex.push(name);
      return true;
   } else { return false;}
};

Data.prototype.addData = function(type, name) {
   if (this.dataSet[name] === undefined) {
      var dataObj = this.typeSwitch(type);
      var data = dataObj.makeData(this.year, this.month, name);
      this.dataSet[name] = data;
      return true;
   } else { return false; }
};
Data.prototype.saveData = function() {
   storage.save(this.year + "_" + this.month + "_" + this.id, this.dataSet);
};
Data.prototype.loadData = function() {
   var data = storage.load(this.year + "_" + this.month + "_" + this.id);
   if (data !== null)
      this.dataSet = data;
};

Data.prototype.typeSwitch = function(type) {
   switch(type) {
      case "check": return checkData;
      case "date": return dateData;
   }
};

var t;
window.addEventListener("load", function() {
   var today = date.today();
   t = new Data(today.year, today.month, "test");
});