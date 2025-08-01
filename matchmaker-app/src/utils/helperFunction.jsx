function isSubString(t, s) {
  if (t.length > s.length) {
    return false;
  }

  if (t === s) {
    return true;
  }

  for (let i = 0; i < t.length; ++i) {
    if (t[i] !== s[i]) {
      return false;
    }
  }

  return true;
}

function getRandomString(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = 36;

  let randomString = "";

  for (let i = 0; i < length; ++i) {
    let idx = Math.floor(Math.random() * charLength);
    if (idx === 36) idx--;
    randomString += characters[idx];
  }

  return randomString;
}

export { isSubString, getRandomString };
