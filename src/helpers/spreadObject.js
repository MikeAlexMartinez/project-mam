// creates a new object with all the properties of the two objects passed to it.
const spreadObject = (obj1, obj2) => {
  const newObj = {};

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  obj1Keys.forEach((v) => {
    newObj[v] = obj1[v];
  });

  obj2Keys.forEach((v) => {
    newObj[v] = obj2[v];
  });

  return newObj;
};

export default spreadObject;
