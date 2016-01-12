var display = {
   msg(text) {
      var msgDiv = document.getElementById("msgDiv");
      msgDiv.textContent = text;
   },
   date(year, month) {
      var dateDiv = document.getElementById("dateDiv");
      dateDiv.textContent = "Month: " + date.numToText(month) + " Year: " + year;
   }
};