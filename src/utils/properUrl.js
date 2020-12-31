import { replace, kebabCase } from 'lodash';

const properUrl = (str) => {
  let newStr = replace(str, '&', 'and');
  newStr = kebabCase(newStr);
  return newStr;
};

export default properUrl;
