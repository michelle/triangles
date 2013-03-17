/** Populates page with triangles based on the following:
  *  Chance of a blue = 5%.
  *  Chance of a grey is between GREYMAXCHANCE and GREYMINCHANCE depending on 
  *    column.
  */
function Triangles(div, width, height) {
  this._GREYMAXCHANCE = 85;
  this._GREYMINCHANCE = 30;
  this._BLUECHANCE = .06;
  this._WHITECHANCE = .01;
  this._TRIANGLEHEIGHT = 42;

  this._div = div;

  this._columns = Math.floor(width / this._TRIANGLEHEIGHT);
  this._rows = Math.ceil(height / this._TRIANGLEHEIGHT);
  for (var i = 0; i < this._columns; i += 1) {
    this._createColumn();
  }
};

/** Creates column N. */
Triangles.prototype._createColumn = function() {
  var greyChance = genRand(this._GREYMINCHANCE, this._GREYMAXCHANCE) / 100;
  var col = $('<div></div>').addClass('col');

  for (var i = 0; i < this._rows; i += 1) {
    var chance = Math.random();
    var el = $('<div></div>');
    if (chance < greyChance) {
      el.addClass('triangle');
      if (chance < this._WHITECHANCE) {
        el.addClass('white');
      } else if (chance < this._BLUECHANCE) {
        el.addClass('blue');
      }
    } else {
      el.addClass('empty');
    }
    col.append(el);

  }
  this._div.append(col);
};

Triangles.prototype.hide = function() {
  var activeRow = $(this._div.children(':first'));

  function hideNext() {
    if (!activeRow) {
      return;
    }
    row = activeRow;
    nextRow = activeRow.next();
    activeRow = nextRow.length > 0 ? $(nextRow[0]) : null;
    row.animate({ opacity: 0 }, 100, hideNext);
  }

  hideNext();
};

Triangles.prototype.show = function() {
  var activeRow = $(this._div.children(':first'));

  function showNext() {
    if (!activeRow) {
      return;
    }
    row = activeRow;
    nextRow = activeRow.next();
    activeRow = nextRow.length > 0 ? $(nextRow[0]) : null;
    row.animate({ opacity: 1 }, 100, showNext);
  }

  showNext();
};

/** Generates a random number between MIN and MAX */
function genRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


$(document).ready(function(){
  var div = $('#container');
  var triangles;

  generate = function() {
    div.empty();
    triangles = new Triangles(div, $(window).width(), $(window).height());
  }
  generate();

  $(window).resize(generate);
  $('#sidebar').hover(function() {
    if (triangles) {
      triangles.hide();
    }
  }, function() {
    if (triangles) {
      triangles.show();
    }
  });

  // Lightly mobile
  document.getElementById('sidebar').addEventListener('touchstart', function(e) {
    if (triangles) {
      triangles.hide();
    }
  });
  document.getElementById('sidebar').addEventListener('touchend', function(e) {
    if (triangles) {
      triangles.show();
    }
  });
});
