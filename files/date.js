var date = {
   testDay(year, month, day) {
   // Test if that date actually exists [boolean].
      var date = new Date(year, month, day);
      if (  day === date.getDate() &&
            month == date.getMonth() &&
            year == date.getYear() )
         return true;
      else
         return false;
   },
   lastDayInMonth(year, month) {
   // Returns the last date [int] of the month.
   // Uses monthConverter to have months >= 0 & <= 11.
      var day = 28;
      var date = new Date(year, month, day);

      var monthObj = this.monthConverter(year, month);
      month = monthObj.month;
         
      while (day < 32) {
         date.setDate(day + 1);
         if (date.getMonth() != month)
            break;
         day++;
      }
      return day;
   },
   monthConverter(year, month) {
   // Formats months to have values between 0 & 11
   //  and updates years from that change.
   // Returns obj {month: [int], year: [int]}
      var years_changed = 0;
      if (month > 11) {
         return this.monthConverter(year+1, month - 12);
      } else if (month < 0) {
         return this.monthConverter(year-1, month + 12); 
      } else {
         return {
            "month": month,
            "year": year
         };
      }
   },
   today() {
      var d = new Date();
      return {
         year: d.getFullYear(),
         month: d.getMonth(),
         date: d.getDate(),
         day: d.getDay()
      }
   },
   create(year, month, date) {
   // creates a date Obj.
      return {
         year: year,
         month: month,
         date: date
      }
   },
   numToText(month) {
      switch(month) {
         case 0: return "January";
         case 1: return "February";
         case 2: return "March";
         case 3: return "April";
         case 4: return "May";
         case 5: return "June";
         case 6: return "July";
         case 7: return "August";
         case 8: return "September";
         case 9: return "October";
         case 10: return "November";
         case 11: return "December";
         default: console.error("Error in numtoText. Got Month: " + month); break;
      }
   }
};