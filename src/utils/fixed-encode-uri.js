function fixedEncodeURIComponent(str) {
  return encodeURI(str).replace(/%20/g, "+");
}

export { fixedEncodeURIComponent };
