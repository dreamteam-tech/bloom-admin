import Chronosphere, { strToDigit } from '../src/chronosphere';

describe('Chronosphere nextWeekDay', () => {
  const chrono = new Chronosphere();

  it('should next Monday', () => {
    const sum = chrono.nextWeekDay(new Date('2017-03-09'), 1);
    expect(sum.getDay()).toBe(1);
  });

  it('should next Tuesday', () => {
    const sum = chrono.nextWeekDay(new Date('2017-03-08'), 2);
    expect(sum.getDay()).toBe(2);
  });

  it('should next Wednesday', () => {
    const sum = chrono.nextWeekDay(new Date('2017-03-08'), 3);
    expect(sum.getDay()).toBe(3);
  });

  it('should next Thursday', () => {
    const sum = chrono.nextWeekDay(new Date('2017-03-08'), 4);
    expect(sum.getDay()).toBe(4);
  });

  it('should next Friday', () => {
    const sum = chrono.nextWeekDay(new Date('2017-03-08'), 5);
    expect(sum.getDay()).toBe(5);
  });

  it('should next Saturday', () => {
    const sum = chrono.nextWeekDay(new Date('2017-03-08'), 6);
    expect(sum.getDay()).toBe(6);
  });

  it('should next Sunday', () => {
    const sum = chrono.nextWeekDay(new Date('2017-03-08'), 0);
    expect(sum.getDay()).toBe(0);
  });
});

describe('Chronosphere strToDigit', () => {
  const pairs = {
    'Через одну минуту': "1",
    'Через две минуты': "2",
    'Через три минуты': "3",
    'Через четыре минуты': "4",
    'Через пять минуты': "5",
    'Через шесть минуты': "6",
    'Через семь минуты': "7",
    'Через восемь минуты': "8",
    'Через девять минуты': "9",
    'Через десять минуты': "10",
    'Через одиннадцать минут': "11",
    'Через двенадцать минут': "12",
    'Через тринадцать минут': "13",
    'Через четырнадцать минут': "14",
    'Через пятнадцать минут': "15",
    'Через шестнадцать минут': "16",
    'Через семнадцать минут': "17",
    'Через восемнадцать минут': "18",
    'Через девятнадцать минут': "19",
    'Через двадцать минут': "20",
    'Через пятьдесят три минуты': "53",
    "одиннадцать": "11",
    "сорок одну": "41",
    "сорок четыре": "44",
    "тридцать две": "32",
    "двадцать три": "23",
    "пятьдесят восемь": "58"
  };
  for (let key in pairs) {
    it('should be correct digit: ' + key, () => {
      expect(strToDigit(key)).toBe(pairs[key]);
    })
  }
});

/*
todo
describe('Chronosphere parseRemind', () => {
    // noinspection JSNonASCIINames
    const provider = {
        'напомнить за час': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-13 11:00:00'
        },
        'напомнить утром': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-13 08:00:00'
        },
        'напомнить в два': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-13 14:00:00'
        },
        'напомнить в 12': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-13 12:00:00'
        },
        'напомнить за день': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-12 12:00:00'
        },
        'напомнить за два дня': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-11 12:00:00'
        },
        'напомнить за 2 недели': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-13 11:00:00'
        },
        'напомнить за 1 неденю': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-13 11:00:00'
        },
        'напомнить за 1 день до события в 8ч': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-12 08:00:00'
        },
        'напомнить за 1 день до события в 8 ч': {
            date: '2017-03-13 12:00:00',
            remind: '2017-03-12 08:00:00'
        },
    };

    for (let str in provider) {
        it(str, () => {
            let params = (new Chronosphere({
                mydate: new Date('2017-03-09 00:00:00'),
                newdate: new Date('2017-03-09 00:00:00')
            })).parseRemind(new Date(provider[str].date), str);

            expect(params.date.toString())
                .toBe((new Date(provider[str].remind)).toString());
        });
    }
});
 */

describe('Chronosphere parse', () => {
  // noinspection JSNonASCIINames
  const provider = {
    'Напомнить про ДР жены через 10 дней в 11:30': { date: '2017-03-19 11:30:00' },
    'Мыть машину через 2 дня в 11': { date: '2017-03-11 11:00:00' },
    'Поздравить с ДР через год в 12:30': { date: '2018-03-09 12:30:00' },
    'Записаться на пятницу': { date: '2017-03-10 00:00:00' },
    'Проснуться 2 января': { date: '2018-01-02 00:00:00' },
    'Через 50 лет купить котедж': { date: '2067-03-09 00:00:00' },
    'Сегодня в 16 позвонить жене': { date: '2017-03-09 16:00:00' },
    'Через пять дней в 14:00': { date: '2017-03-14 14:00:00' },
    'Поздравить всех с НГ 31 декабря в 23': { date: '2017-12-31 23:00:00' },
    'Получить письмо в 18': { date: '2017-03-09 18:00:00' },
    'Послезавтра в 11 приехать за зарплатой': { date: '2017-03-11 11:00:00' },
    'Сегодня в 21часов 30 минут выключить Дом2': { date: '2017-03-09 21:30:00' },
    'Купить браслет Jawbone Up через 2 дня в 20:00': { date: '2017-03-11 20:00' },
    'Напомнить сделать рефакторинг в субботу': { date: '2017-03-11 00:00:00' },
    'Перезагрузить сервер в воскресение в 2': { date: '2017-03-12 02:00:00' },
    'Перезагрузить сервер в воскресение в 2 дня': { date: '2017-03-12 14:00:00' },
    'Перезагрузить сервер в воскресение ночью в 2': { date: '2017-03-12 02:00:00' },
    'Перезагрузить сервер в воскресение ночью в 2:15': { date: '2017-03-12 02:15:00' },
    'Перезагрузить сервер в воскресение днем в 2': { date: '2017-03-12 14:00:00' },
    'Перезагрузить сервер в воскресение днем в 2:30': { date: '2017-03-12 14:30:00' },
    'в субботу в 7 вечера': { date: '2017-03-11 19:00:00' },
    'Через 1 минуту': { date: '2017-03-09 00:01:00' },
    'Через одну минуту': { date: '2017-03-09 00:01:00' },
    'Через две минуты': { date: '2017-03-09 00:02:00' },
    'Через три минуты': { date: '2017-03-09 00:03:00' },
    'Через четыре минуты': { date: '2017-03-09 00:04:00' },
    'Через пять минуты': { date: '2017-03-09 00:5:00' },
    'Через десять минут': { date: '2017-03-09 00:10:00' },
    'Через двадцать минут': { date: '2017-03-09 00:20:00' },
    'Через тридцать минут': { date: '2017-03-09 00:30:00' },
    'Через сорок минут': { date: '2017-03-09 00:40:00' },
    'Через пятьдесят минут': { date: '2017-03-09 00:50:00' },
    'Отправить документы в понедельник, напомнить за час': { date: '2017-03-13 00:00:00' }
  };

  for (let str in provider) {
    it(str, () => {
      let params = (new Chronosphere(new Date('2017-03-09 00:00:00'))).parse(str);

      expect(params.date.toString())
        .toBe((new Date(provider[str].date)).toString());
    });
  }
});
