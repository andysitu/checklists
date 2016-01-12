var checkData = {
   makeData(year, month, name) {
      var i = 1, len = date.lastDayInMonth(year, month);
      var arr = [];
      for ( ; i <= len; i++) {
         arr.push(0);
      }
      return {
         name: name,
         type: "check",
         data: arr
      };
   },
   createInput(data) {
      var ele = document.createElement("input");
      ele.type = "checkbox";
      if (data >= 1) ele.checked = true;
      return ele;
   },
   create(year, month, name) {
      var i = 1, len = date.lastDayInMonth(year, month);
      var arr = [];
      for ( ; i <= len; i++) {
         arr.push(0);
      }
      return {
         type: "check",
         data: arr
      };
   }
};