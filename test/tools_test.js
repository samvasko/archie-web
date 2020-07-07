const test = require("ava");
const tools = require("../src/tools");
const model = require("../src/model").model;

test("scope", (t) => {
  t.deepEqual(tools.getScopeIndices(model.elements, ["sound-system"]), [1]);
  t.deepEqual(tools.getScopeIndices(model.elements, ["sound-systesm"]), []);
  t.deepEqual(tools.getScopeIndices(model.elements, []), []);
  t.deepEqual(tools.getScopeIndices(model.elements, [""]), []);
  t.deepEqual(
    tools.getScopeIndices(model.elements, ["sound-system", "ue"]),
    []
  );
  t.deepEqual(
    tools.getScopeIndices(model.elements, [
      "sound-system",
      "speaker",
      "connector",
    ]),
    [1, 0, 2]
  );
});
