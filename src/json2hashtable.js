const isSimple = (v) =>
  ['string', 'bugint', 'number', 'boolean', 'undefined'].includes(typeof v) || v instanceof Date || v === null;

const json2hashtable = (obj) => {
  if (typeof obj === 'string') {
    try {
      obj = JSON.parse(obj);
    } catch {
      throw new Error('String passed to json2hashtable is not valid JSON');
    }
  } else if (typeof obj === 'object') {
    try {
      JSON.stringify(obj);
    } catch {
      throw new Error('Object passed to json2hashtable is not serializable');
    }
  } else {
    throw new Error('Value passed to json2hashtable is not an object or string');
  }

  const hashTable = {};

  const getPathsFromObject = (obj, jsonPath = '') => {
    const objIsArray = Array.isArray(obj);

    for (const key in obj) {
      const value = obj[key];
      const currentJsonPath = jsonPath.length === 0 ? key : objIsArray ? `${jsonPath}[${key}]` : `${jsonPath}.${key}`;

      if (isSimple(value)) {
        hashTable[currentJsonPath] = value;
      } else if (typeof value === 'object') {
        getPathsFromObject(value, currentJsonPath);
      } else {
        hashTable[currentJsonPath] = value.toString();
      }
    }
  };

  getPathsFromObject(obj);
  return hashTable;
};

module.exports = json2hashtable;
