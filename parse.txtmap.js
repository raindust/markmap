module.exports = function(text) {
  var lines = text.split('\n');
  
  var entries = [];
  //let first line to be title defaultly
  entries.push({
    depth: 1,
    line: 0,
    name: lines[0]
  });

  var firstIndent = true;
  var indentLength = 1;

  for (var i = 1; i < lines.length; i++) {
    var match = /^(\s*)(.+)$/.exec(lines[i]);
    if (!match) {
      continue;
    }

    //to catch tab and other space situation
    var isSpaces = match[1].length > 0 && match[1][0] === ' ';
    var depth = match[1].length;
    if (isSpaces) {
      if (firstIndent) {
        //decide indent length by first spaces depth, so make sure you keep the same indent style
        indentLength = depth;
        firstIndent = false;
      }
      depth /= indentLength;
    }
    depth += 2; // ensure depth is min 2

    entries.push({
      depth: depth,
      line: i + 1,
      name: match[2]
    });
  }

  return entries;
};
