function ChartT(id, year, month) {
   this.data = undefined;
   this.id = id;
   this.data = null;
   this.start();
   this.year = year;
   this.month = month;
}

ChartT.prototype.start = function() {
   this.data = new Data(this.id, this.year, this.month);
};

ChartT.prototype.setToday = function() {
   var tObj = date.today();
   this.setup(tObj.year, tObj.month);
};

ChartT.prototype.makeTable = function() {
   var c = makeElement("table", {id: this.id});
   return c;
};

ChartT.prototype.getTypes = function() {
   return   this.data.getTypes();
};

ChartT.prototype.moveDate = function(year, month) {
   if (year === undefined) year = 0;
   var dates = date.monthConverter(this.year + year, this.month + month);
   this.changeDate(dates.year, dates.month);
};

ChartT.prototype.changeDate = function(year, month) {
   this.month = month;
   this.year = year;
   display.date(year, month);
};