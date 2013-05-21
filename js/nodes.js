var findNode = function(type, index) {
  for(var i = 0; i < window.nodes.length; i++) {
    var c = window.nodes[i];
    if(c.type == type && c.index == index) {
      return c;
    }
  };
  return false;
};

var optionsForNode = function(index) {
  options = [];
  for(var i = 0; i < window.nodes.length; i++) {
    var current = window.nodes[i];
    if((current.type == "question" && current.index > index) || current.type == "outcome") {
      options.push({
        key: current.type + current.index,
        title: current.type + current.index + "(" + current.title + ")"
      });
    }
  }
  return options;
};

var renderAll = function() {
  for(var i = 0; i < window.nodes.length; i++) {
    window.nodes[i].render();
  }
};
