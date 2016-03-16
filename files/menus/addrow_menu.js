var addRow_menu = {
   cpu: null,
   createName() {
      var types = this.cpu.getTypes();
      return makeElement("input", {id: "nameMenu"});
   },
   createType_select() {
      var types = this.cpu.getTypes();
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
      
      this.cpu.addRow(name, type);
   },
   create(cpuRef) {
      this.cpu = cpuRef;
      return [
            {Name: this.createName()}, 
            {Type: this.createType_select()}
         ];
   }
};