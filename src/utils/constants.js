import pic1 from '../images/pic1.png';
import pic2 from '../images/pic2.png';
import pic3 from '../images/pic3.png';
import pic4 from '../images/pic4.png';
import pic5 from '../images/pic5.png';
import pic6 from '../images/pic6.png';
import pic7 from '../images/pic7.png';
import pic8 from '../images/pic8.png';

const inc = (() => {
    let i = 0;
    return () => {
      i += 1;
      return i;
    };
  })();

export const defaultCards = [
    {
      id: inc(),
      name: '33 слова о дизайне',
      duration: '1ч 42м',
      cover: pic1,
      saved: true,
    },
    {
      id: inc(),
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 42м',
      cover: pic2,
      saved: true,
    },
    {
      id: inc(),
      name: 'В погоне за Бенкси',
      duration: '1ч 42м',
      cover: pic3,
      saved: false,
    },
    {
      id: inc(),
      name: 'Баския: Взрыв реальности',
      duration: '1ч 42м',
      cover: pic4,
      saved: true,
    },
    {
      id: inc(),
      name: 'Бег это свобода',
      duration: '1ч 42м',
      cover: pic5,
      saved: false,
    },
    {
      id: inc(),
      name: 'Книготорговцы',
      duration: '1ч 42м',
      cover: pic6,
      saved: true,
    },
    {
      id: inc(),
      name: 'Когда я думаю о Германии ночью',
      duration: '1ч 42м',
      cover: pic7,
      saved: true,
    },
    {
      id: inc(),
      name: 'Gimme Danger: История Игги и The Stooges',
      duration: '1ч 42м',
      cover: pic8,
      saved: true,
    },
  ];

  export const defaultCards2 = [
    {
      id: inc(),
      name: '33 слова о дизайне',
      duration: '1ч 42м',
      cover: pic1,
      saved: true,
    },
    {
      id: inc(),
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 42м',
      cover: pic2,
      saved: true,
    },
    {
      id: inc(),
      name: 'В погоне за Бенкси',
      duration: '1ч 42м',
      cover: pic3,
      saved: false,
    },
    {
      id: inc(),
      name: 'Баския: Взрыв реальности',
      duration: '1ч 42м',
      cover: pic4,
      saved: true,
    },
    {
      id: inc(),
      name: 'Бег это свобода',
      duration: '1ч 42м',
      cover: pic5,
      saved: false,
    },
    {
      id: inc(),
      name: 'Книготорговцы',
      duration: '1ч 42м',
      cover: pic6,
      saved: true,
    },
    {
      id: inc(),
      name: 'Когда я думаю о Германии ночью',
      duration: '1ч 42м',
      cover: pic7,
      saved: true,
    },
    {
      id: inc(),
      name: 'Gimme Danger: История Игги и The Stooges',
      duration: '1ч 42м',
      cover: pic8,
      saved: true,
    },
  ];