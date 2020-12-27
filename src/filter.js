/**
 * Obscene words detector for russian language
 *
 * @name antimat;
 * @version 0.0.1;
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 * @see https://github.com/itlessons/js-antimat;
 *
 * Copyright (c) 2014, www.itlessons.info
 */

export default function filterWords(t) {
  const badPatterns = [
    "^(о|а)н(о|а)нист.*",
    "^лошар.*",
    "^к(а|о)злина$",
    "^к(о|а)зел$",
    "^сволоч(ь|ъ|и|уга|ам|ами).*",
    "^лох[уеыаоэяию].*",
    ".*урод(ы|у|ам|ина|ины).*",
    ".*бля(т|д).*",
    ".*гандо.*",
    "^м(а|о)нд(а|о).*",
    ".*сперма.*",
    ".*[уеыаоэяию]еб$",
    "^сучк(а|у|и|е|ой|ай).*",
    "^придур(ок|ки).*",
    "^д(е|и)би(л|лы).*",
    "^сос(ать|и|ешь|у)$",
    "^залуп.*",
    "^муд(е|ил|о|а|я|еб).*",
    ".*шалав(а|ы|ам|е|ами).*",
    ".*пр(а|о)ст(и|е)т(у|е)тк(а|и|ам|е|ами).*",
    ".*шлюх(а|и|ам|е|ами).*",
    ".*ху(й|и|я|е|л(и|е)).*",
    ".*п(и|е|ы)зд.*",
    "^бл(я|т|д).*",
    "(с|сц)ук(а|о|и|у).*",
    "^еб.*",
    ".*(д(о|а)лб(о|а)|разъ|разь|за|вы|по)ебы*.*",
    ".*пид(а|о|е)р.*",
    ".*хер.*",
  ];

  const goodPatterns = [
    ".*психу.*",
    ".*к(о|а)манд.*",
    ".*истр(е|и)блять.*",
    ".*л(о|а)х(о|а)трон.*",
    ".*(о|а)ск(о|а)рблять.*",
    "хул(е|и)ган",
    ".*м(а|о)нд(а|о)рин.*",
    ".*р(а|о)ссл(а|о)блять.*",
    ".*п(о|а)тр(е|и)блять.*",
    ".*@.*\\.(ру|сом|нет)$",
  ];

  const goodWords = [
    "дезмонда",
    "застрахуйте",
    "одномандатный",
    "подстрахуй",
    "психуй",
  ];

  const letters = {
    a: "а",
    b: "в",
    c: "с",
    e: "е",
    f: "ф",
    g: "д",
    h: "н",
    i: "и",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "р",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    x: "х",
    y: "у",
    w: "ш",
    z: "з",
    ё: "е",
    "6": "б",
    "9": "д",
  };

  const containsMat = function(text) {
    text = cleanBadSymbols(text.toLowerCase());

    var words = text.split(" ");

    for (var i = 0; i < words.length; i++) {
      var word = convertEngToRus(words[i]);

      if (isInGoodWords(word) && isInGoodPatterns(word)) continue;

      if (isInBadPatterns(word)) return true;
    }

    if (containsMatInSpaceWords(words)) return true;

    return false;
  };

  const convertEngToRus = function(word) {
    for (var j = 0; j < word.length; j++) {
      for (var key in letters) {
        if (word.charAt(j) === key)
          word =
            word.substring(0, j) +
            letters[key] +
            word.substring(j + 1, word.length);
      }
    }

    return word;
  };

  const cleanBadSymbols = function(text) {
    return text.replace(/[^a-zA-Zа-яА-Яё0-9\s]/g, "");
  };

  const isInGoodWords = function(word) {
    for (var i = 0; i < goodWords.length; i++) {
      if (word === goodWords[i]) return true;
    }

    return false;
  };

  const isInGoodPatterns = function(word) {
    for (var i = 0; i < goodPatterns.length; i++) {
      var pattern = new RegExp(goodPatterns[i]);
      if (pattern.test(word)) return true;
    }

    return false;
  };

  const isInBadPatterns = function(word) {
    for (var i = 0; i < badPatterns.length; i++) {
      var pattern = new RegExp(badPatterns[i]);
      if (pattern.test(word)) return true;
    }

    return false;
  };

  const containsMatInSpaceWords = function(words) {
    var spaceWords = findSpaceWords(words);

    for (var i = 0; i < spaceWords.length; i++) {
      var word = convertEngToRus(spaceWords[i]);

      if (isInBadPatterns(word)) return true;
    }

    return false;
  };

  const findSpaceWords = function(words) {
    var out = [];
    var spaceWord = "";

    for (var i = 0; i < words.length; i++) {
      var word = words[i];

      if (word.length <= 3) {
        spaceWord += word;
        continue;
      }

      if (spaceWord.length >= 3) {
        out.push(spaceWord);
        spaceWord = "";
      }
    }

    return out;
  };
  /**
  const addBadPattern = function(pattern) {
    badPatterns.push(pattern);
  };

  const addGoodPattern = function(pattern) {
    goodPatterns.push(pattern);
  };

  const addGoodWord = function(pattern) {
    goodWords.push(pattern);
  };
 */
  return containsMat(t);
}
