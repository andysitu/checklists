var dateData = {
   makeData(year, month, name) {
      var dateArr = [];
      var lastDate = date.lastDayInMonth(year, month);
      for (var i = 1; i <= lastDate; i++) {
         dateArr.push(i);
      }

      return {
         name: "Date",
         type: "date",
         data: dateArr
      };
   },
   createInput(date) {
      return makeElement("div", {}, document.createTextNode(date)); 
   },
   clicked(date) {
      // Does nothing.
      return date;
   }
};