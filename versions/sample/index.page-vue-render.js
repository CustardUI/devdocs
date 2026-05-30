
    const renderFn = new Function("const { createElementVNode: _createElementVNode, openBlock: _openBlock, createElementBlock: _createElementBlock } = Vue\n\nconst _hoisted_1 = { id: \"flex-body\" }\nconst _hoisted_2 = /*#__PURE__*/_createElementVNode(\"div\", { id: \"content-wrapper\" }, null, -1 /* HOISTED */)\nconst _hoisted_3 = [\n  _hoisted_2\n]\n\nreturn function render(_ctx, _cache) {\n  return (_openBlock(), _createElementBlock(\"div\", _hoisted_1, [..._hoisted_3]))\n}");
    var render = renderFn();
  