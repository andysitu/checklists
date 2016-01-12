var chart_func = {
   getChart() {
      return document.getElementById("chart");
   },
   makeDateArr(dateObj) {
      var dateArr = ["Dates"];
      var lastDate = date.lastDayInMonth(dateObj.year, dateObj.month);
      for (var i = 1; i <= lastDate; i++) {
         dateArr.push(i);
      }
      return dateArr;
   },
   makeCheckArr(dateArr) {
      var len = dateArr.length, i = 1;
      var arr = ["Basic"];
      for ( ; i < len; i++) {
         arr.push(0);
      }
      return arr;
   }
};