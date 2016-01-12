var addRow_menu = {
   createName() {
      return makeElement("input", {id: "nameMenu"});
   },
   createType_select() {
      var types = cpu.getTypes();
      var typeSelect = makeElement("select", {id: "menuType"});
      types.forEach(function(type) {
         typeSelect.appendChild( makeElement("option", {}, type) );
      });

      return typeSelect;
   },
   submitting() {
      var m = menu;
      var nameBox = document.getElementById("nameMenu"),
            name = nameBox.value,
            type = document.getElementById("menuType").value;

      nameBox.value = "";
      // var submissions = document.querySelectorAll(".submit_value");

      cpu.addRow(type, name);
   },
   create() {
      return [
            {Name: this.createName()}, 
            {Type: this.createType_select()}
         ];
   }
};