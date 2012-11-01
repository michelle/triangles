/** Constants */
BLUECHANCE = .05;
ROWS = 8;
COLUMNS = 20;
GREYMAXCHANCE = 85;
GREYMINCHANCE = 30;


/** Populates page with triangles based on the following: 
  *  Chance of a blue = 5%.
  *  Chance of a grey is between GREYMAXCHANCE and GREYMINCHANCE depending on 
  *    column.
  */
function populate(div) {
  for (var i = 0; i < COLUMNS; i += 1) {
    div.append(createColumn(i));
  }
}

/** Creates column N. */
function createColumn(n) {
  var greyChance = genRand(GREYMINCHANCE, GREYMAXCHANCE) / 100;
  var col = $('<div></div>').addClass('col').attr('id', n);

  for (var i = 0; i < ROWS; i += 1) {
    var chance = Math.random();
    var el = $('<div></div>');
    if (chance < greyChance) {
      el.addClass('triangle');
      if (chance < BLUECHANCE) {
        el.addClass('blue');
      }
    } else {
      el.addClass('empty');
    }
    col.append(el);

  }
  return col;
}

/** Hides column N. */
function hideColumn(n) {
  if (n >= COLUMNS) {
    return;
  }

  var colName = '#' + n;
  $(colName).stop().animate({ 'opacity': '0' }, 100,
      function() { hideColumn(n + 1); });
}

/** Shows column N. */
function showColumn(n) {
  if (n >= COLUMNS) {
    return;
  }

  var colName = '#' + n;
  $(colName).stop().animate({ 'opacity': '1' }, 100,
      function() { showColumn(n + 1); });

}

/** Generates a random number between MIN and MAX */
function genRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


$(document).ready(function(){
  var div = $('#triangles');
  populate(div);;
  
});
