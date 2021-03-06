import GLOBALS from '../core/Globals';

export default class Utils {
  static formatClass(characterClass) {
    let classString;

    switch(characterClass) {
      case 1:
        classString = GLOBALS.SWORDSMAN;
        break;

      case 2:
        classString = GLOBALS.MAGE;
        break;

      case 3:
        classString = GLOBALS.ARCHER;
        break;
    }

    return classString;
  }

  static getTemplate(template, cb) {
    $.get('templates/'+template+'.html', (response) => {
      cb(response);
    });
  }

  static serializeObject(obj) {
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

  static humanize(str) {
    let frags = str.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join('');
  }

  static formatDate(timestamp) {
    const date = new Date(timestamp),
          day = date.getDate(),
          month = date.getMonth() + 1,
          year = date.getFullYear(),
          hours = date.getHours(),
          minutes = date.getMinutes();

    return month+'-'+day+'-'+year+' '+hours+':'+minutes;
  }

  static addZero(number) {
    return ('0' + Number(number).toFixed(0)).slice(-2);
  }

  static isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }
}
