var display = {
   msg(text) {
      var msgDiv = document.getElementById("msgDiv");
      msgDiv.textContent = text;
   },
   date(year, month) {
      var dateDiv = document.getElementById("dateDiv");
      dateDiv.textContent = date.numToText(month) + " " + year;
   }
};