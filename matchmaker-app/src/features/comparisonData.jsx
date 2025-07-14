// export function compareTwoArrays(array1 = [], array2 = []) {
//   if (array1.length !== array2.length) {
//     return false;
//   }
//   array1.sort();
//   array2.sort();

//   for (let i = 0; i < array1.length; ++i) {
//     if (array1[i] !== array2[i]) {
//       return false;
//     }
//   }

//   return true;
// }

// export function compareTwoObjects(object1 = {}, object2 = {}) {
//   const key1 = Object.keys(object1);
//   const key2 = Object.keys(object2);

//   if (compareTwoArrays(key1, key2) === false) {
//     return false;
//   }

//   for (let i = 0; i < key1.length; ++i) {
//     if (object1[key1[i]] !== object2[key1[i]]) {
//       return false;
//     }
//   }

//   return true;
// }
