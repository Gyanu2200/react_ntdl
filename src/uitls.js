const lenght = 6;
const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";

export const reandomStr = () => {
  let _id = "";

  for (let i = 0; i < lenght; i++) {
    _id += str[Math.floor(Math.random() * str.length)];
  }

  return _id;
};
