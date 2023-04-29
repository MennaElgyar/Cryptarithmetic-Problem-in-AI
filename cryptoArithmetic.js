let use = new Array(10).fill(0); //set 1, when one character is assigned previously

function isValid(nodeList, count, s1, s2, s3) {
  let val1 = 0,
    val2 = 0,
    val3 = 0,
    m = 1,
    j,
    i;

  for (i = s1.length - 1; i >= 0; i--) {
    //find number for first string
    let ch = s1.charAt(i);
    for (j = 0; j < count; j++) if (nodeList[j].letter == ch) break; //when ch is present, break the loop
    val1 += m * nodeList[j].value;
    m *= 10;
  }

  m = 1;
  for (i = s2.length - 1; i >= 0; i--) {
    //find number for second string
    let ch = s2.charAt(i);
    for (j = 0; j < count; j++) if (nodeList[j].letter == ch) break;
    val2 += m * nodeList[j].value;
    m *= 10;
  }

  m = 1;
  for (i = s3.length - 1; i >= 0; i--) {
    //find number for third string
    let ch = s3.charAt(i);
    for (j = 0; j < count; j++) if (nodeList[j].letter == ch) break;
    val3 += m * nodeList[j].value;
    m *= 10;
  }

  if (val3 == val1 + val2) return true; //check whether the sum is same as 3rd string or not
  return false;
}

function permutation(count, nodeList, n, s1, s2, s3) {
  if (n == count - 1) {
    //when values are assigned for all characters
    for (let i = 0; i < 10; i++) {
      if (use[i] == 0) {
        // for those numbers, which are not used
        nodeList[n].value = i; //assign value i
        if (isValid(nodeList, count, s1, s2, s3)) {
          //check validation

          return nodeList;
        }
      }
    }
    return false;
  }

  for (let i = 0; i < 10; i++) {
    if (use[i] == 0) {
      try {
        // for those numbers, which are not used
        nodeList[n].value = i; //assign value i and mark as not available for future use
        use[i] = 1;
        if (permutation(count, nodeList, n + 1, s1, s2, s3)) {
          //go for next characters
          return nodeList;
        }
        use[i] = 0; //when backtracks, make available again
      } catch (err) {
        return false;
      }
    }
  }
  return false;
}

function solvePuzzle(s1, s2, s3) {
  let uniqueChar = 0; //Number of unique characters
  let len1 = s1.length;
  let len2 = s2.length;
  let len3 = s3.length;

  const ALPHABET_LENGTH = 26; //There are 26 different characters

  let freq = new Array(ALPHABET_LENGTH).fill(0); //There are 26 different characters

  for (let i = 0; i < len1; i++) ++freq[s1.charCodeAt(i) - 65];
  for (let i = 0; i < len2; i++) ++freq[s2.charCodeAt(i) - 65];
  for (let i = 0; i < len3; i++) ++freq[s3.charCodeAt(i) - 65];

  for (let i = 0; i < ALPHABET_LENGTH; i++)
    if (freq[i] > 0)
      //whose frequency is > 0, they are present
      uniqueChar++;

  if (uniqueChar > 10) {
    //as there are 10 digits in decimal system
    console.log("Invalid strings");
    return false;
  }

  let nodeList = new Array(uniqueChar)
    .fill()
    .map(() => ({ letter: "", value: 0 }));
  for (let i = 0, j = 0; i < ALPHABET_LENGTH; i++) {
    //assign all characters found in three strings
    if (freq[i] > 0) {
      nodeList[j].letter = String.fromCharCode(i + 65);
      j++;
    }
  }
  const r = permutation(uniqueChar, nodeList, 0, s1, s2, s3);
  use = new Array(10).fill(0);
  return r;
}
