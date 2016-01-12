var menu = {
   div: undefined,
   createMenu(menuType) {
   /* Uses "submenus" objects (ex. addrow_menu.js) &
      adds in table. Finally has submit & close button added at the end.
      Submit function depends on submenuObj.submitting 
   */
      var submenus = menuType.create(),
         table = makeElement("table", {id: "menuTable"});

      submenus.forEach(function(submenuObj, index) {
         for (var name in submenuObj) {
            var col1 = makeElement("td", {}, name),
                col2 = makeElement("td", {class: "submit_value"}, submenuObj[name]);
         }
         // append table -> tr - > col1, col2
         table.appendChild( makeElement("tr", {}, col1, col2) );
      });
      
      var menuDiv = makeElement("div", {id: "menu", class: "menu"}, 
            table,
            this.createSubmitButton(menuType),
            this.createCloseButton()
         );

      this.div = menuDiv;
      document.body.appendChild(menuDiv);
   },
   close() {
      if (this.div !== undefined) {
         var menu = document.getElementById("menu");
         document.body.removeChild(menu);
         this.div = undefined;
      }
   },
   createCloseButton() {
      var closeButton = makeElement("button");
      closeButton.addEventListener("click", this.close.bind(menu))
      closeButton.textContent = "close";
      return closeButton;
   },
   createSubmitButton(menuType) {
      var subBut = makeElement("input", {type:"submit", id: "submitMenu"});
      subBut.addEventListener("click", menuType.submitting);
      return subBut;
   }
};