/**
* Util functions
*
**/
export default class Utils {
  constructor() {}

  formatClass(characterClass) {
    let classString;

    switch(characterClass) {
      case 1:
        classString = "SwordsMan";
        break;

      case 2:
        classString = "Mage";
        break;

      case 3:
        classString = "Archer";
        break;
    }

    return classString;
  }

  getTemplate(template, cb) {
    $.get('templates/'+template+'.html', (response) => {
      cb(response);
    });
  }

  serializeObject(obj) {
    let o = {},
        a = obj.serializeArray();

    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });

    return o;
  };

}