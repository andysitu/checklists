var storage = {
   save(name, obj) {
      localStorage.setItem(name, JSON.stringify(obj));
   },
   load(name) {
      return JSON.parse(localStorage.getItem(name));
   },
   delete(name) {
      localStorage.removeItem(name);
   },
   clear() {
      localStorage.clear();
   },
};