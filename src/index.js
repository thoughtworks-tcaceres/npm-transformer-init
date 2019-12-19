const newTransform = (
  arrObj,
  transformer,
  newFields,
  oldFields,
  renameFields
) => {
  let newArr = arrObj.map(record => {
    const newObj = {};
    for (const i in record) {
      if (transformer[i]) {
        newObj[i] = transformer[i](record);
      } else {
        newObj[i] = record[i];
      }
    }

    for (const i in newFields) {
      newObj[i] = newFields[i](record);
    }

    for (const i of oldFields) {
      delete newObj[i];
    }

    for (const i in renameFields) {
      if (newObj[i]) {
        let temp = newObj[i];
        newObj[renameFields[i]] = temp;
        delete newObj[i];
      }
    }
    return newObj;
  });

  return newArr;
};

const arrObj = [
  {
    x: [1, 2, 3],
    y: 2,
    z: 3,
    a: 25
  },
  { x: [2, 1, 3], y: 4, z: 6 },
  {
    x: [0, 0, 0],
    y: 0,
    z: 0
  }
];

const transformer = {
  x: row => row.x.map(a => a + 1),
  y: row => row.y * 1,
  z: row => row.z + row.x[0],
  a: () => "hello there"
};

const newFields = {
  r: row => row.y + row.z
};

const oldFields = ["x"];

const renameFields = {
  a: "greeting"
};

console.log(
  newTransform(arrObj, transformer, newFields, oldFields, renameFields)
);
