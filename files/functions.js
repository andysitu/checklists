function each(obj, callback, context) {
   var type = Object.prototype.toString.call(obj);

   if (context === null)
      context = window;

   if (type === "[object Object]") {
      for (var key in obj) {
         callback.call(context, obj[key], key, obj);
      }
   } else if (type == "[object Array]") {
      obj.forEach(callback, context);
   } else {
      throw("each error with Object " + obj + " and type " + type);
   }
}

function map(obj, callback, context) {
   var type = Object.prototype.toString.call(obj);

   if (type === "[object Object]") {
      var mapped = {};

      each(obj, function(value, k, o) {
         mapped[k] = callback.call(context, value, k, o);
      }, context);
   } else if (type == "[object Array]") {
      return obj.map(callback, context);
   }

   return mapped;
}

function makeElement(type, attributes) {
   // Makes an element with type & attributes (if defined).
   // Will append elements in parameters after attributes.
   var element = document.createElement(type);

   if (attributes !== undefined) {
      for (var attr in attributes) {
         if (attributes.hasOwnProperty(attr)) {
            element.setAttribute(attr, attributes[attr]);
         }
      }
   }

   for (var i = 2, len = arguments.length; i < len; i++) {
      var child = arguments[i];
      if (typeof child === "string" || typeof child === "number")
         child = document.createTextNode(child);
      element.appendChild(child);
   }
   return element;
}

// function createTable(tableArr) {
//    var table = document.createElement("table"),
//             tr, td;

//    tableArr.forEach(function(innerArr) {
//       tr = document.createElement("tr");
//       innerArr.forEach(function(cell) {
//          if (cell.nodeType !== undefined) {

//          } else if (typeof cell == "string" || typeof cell == "number") {
//             document.createTextNode(cell);
//             tr.appendChild()
//          }
//       })
//    });
// }