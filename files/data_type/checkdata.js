var clickData = {
   makeData(year, month, name) {
      var i = 1, len = date.lastDayInMonth(year, month);
      var arr = [];
      for ( ; i <= len; i++) {
         arr.push(0);
      }
      return {
         name: name,
         type: "click",
         data: arr
      };
   },
   createInput(data) {
      var ele = document.createElement("div");
      if (data == 1)
         ele.classList.add("clicked");
      return ele;
   },
   clicked(value) {
      if (value == 0)
         return 1;
      else if (value == 1)
         return 0;
   }
};