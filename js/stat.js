'use strict';

window.cloudOfResutls = function (ctx, x, y, width, height) {
  var offset = 10;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + offset, y + height / 2);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width / 2, y + height - offset);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width - offset, y + height / 2);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width / 2, y + offset);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

window.renderStatistics = function (ctx, names, times) {

  var getMaxElementOfArray = function (array) {
    var max = -1;

    for (var i = 0; i < array.length; i++) {
      var time = array[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  };
  // ------- Results Shadow -------
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  window.cloudOfResutls(ctx, 120, 20, 420, 270);
  // -----

  ctx.fillStyle = 'white';
  window.cloudOfResutls(ctx, 110, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var histogramHeight = 150;
  var histogramWidth = 40;
  var indent = 50;
  var initialX = 150;
  var step = histogramHeight / (getMaxElementOfArray(times) - 0);

  var randomizeBlueColor = function () {
    return 'rgba(0, 0, 255, ' + +Math.random().toFixed(1) || 0.1 + ')';
  };

  for (var i = 0; i < times.length; i++) {
    var name = names[i];
    var height = step * (times[i] - 0);

    ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomizeBlueColor();

    ctx.fillText(parseInt(times[i], 10), initialX + (histogramWidth + indent) * i, 90 + histogramHeight - height);
    ctx.fillText(name, initialX + (histogramWidth + indent) * i, 100 + histogramHeight + 20);
    ctx.fillRect(initialX + (histogramWidth + indent) * i, 100 + histogramHeight - height, histogramWidth, height);
  }
};
