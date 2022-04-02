function hideDomain(domain: string) {
  const arr = domain.split('');
  if (arr[4] === 's') {
    // https
    for (let i = 10; i < arr.length; i++) {
      arr[i] = '*';
    }
  } else {
    // http
    for (let i = 9; i < arr.length; i++) {
      arr[i] = '*';
    }
  }
  return arr.join('');
}

export function hideLink(link: string) {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)/; // only get origin
  const linkSplit = link.match(regex)[0].split('.');
  if (linkSplit[0].includes('www')) {
    linkSplit[1] = hideDomain(linkSplit[1]);
  } else {
    linkSplit[0] = hideDomain(linkSplit[0]);
  }
  return linkSplit.join('.').concat('/***');
}
