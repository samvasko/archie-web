function getScopeIndices(elements, scope) {
  if (!elements) {
    return [];
  }

  const needle = scope.shift();
  const index = elements.findIndex((el) => el.name == needle || el == needle);
  if (index == -1) {
    return [];
  }

  if (scope.length == 0) {
    return [index];
  }

  const childIndices = getScopeIndices(elements[index].children, scope);

  if (childIndices.length == 0) {
    return [];
  }

  return [index].concat(childIndices);
}

module.exports = {
  getScopeIndices,
};
