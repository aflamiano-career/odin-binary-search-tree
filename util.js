export function mergeSort(array) {
  if (array.length <= 1) return array; // Base case

  // Split
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid)); // finish all recursions for this first before going down
  const right = mergeSort(array.slice(mid)); // finish all recursions for this first before going down

  // Merge (inside same function)
  let merged = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    merged.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }

  // Append remaining items
  return merged.concat(left.slice(i)).concat(right.slice(j)); // slice(0) copies the whole array
}

export function removeDuplicates(array) {
  return [...new Set(array)];
}
