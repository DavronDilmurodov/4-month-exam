let mergeString = (word1, word2) => {
  if (word1.length < word2.length) {
    var c = "";
    for (let i = 0; i < word1.length; i++) {
      c += word1[i] + word2[i];
    }
    c += word2.slice(word1.length);
    console.log(c);
  } else {
    var c = "";
    for (let i = 0; i < word2.length; i++) {
      c += word1[i] + word2[i];
    }
    c += word1.slice(word2.length);
    console.log(c);
  }
};

mergeString("abc", "qwer");
