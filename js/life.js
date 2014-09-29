Life = function(contextId, model) {
    var canvas = document.getElementById(contextId);
    var context = canvas.getContext('2d');

    this.model = model;
    this.cellWidth = 10;

    this.backgroundColor = '#fff';

    this.cellColor = 'green';
    this.cellLineColor = '#ccc';
    this.cellLineWidth = 1;
    this.isLife = true;
    this.iterationCount = 0;
    this.iterationPause = 1000;

    var self = this;
    canvas.addEventListener('mouseup', function(evt) {
       var mousePos = getMousePos(canvas, evt);
       var j = Math.ceil(mousePos.x / self.cellWidth) - 1;
       var i = Math.ceil(mousePos.y / self.cellWidth) - 1;
       console.log('Mouse position: ' + i + ',' + j);
       if(i <= self.model.length && j <= self.model[0].length) {
           self.model[i][j] = self.model[i][j] == 0 ? 1 : 0;
           //console.log('Model: ' + self.model);
           self.fillCellsByModel();
       }

    }, false);

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    this.drawLine = function(startX, startY, endX, endY, width, color){
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.lineWidth = width;
        context.lineCap = 'butt';
        context.strokeStyle = color;
        context.stroke();
    }

    this.drawCircle = function(x, y, radius, lineColor, lineWidth, fillColor){
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = fillColor;
        context.fill();
        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;
        context.stroke();
    }

    this.showGrid = function() {
        canvas.width = canvas.width;
        for(i = 0; i <= this.model[0].length; i++) {
            // Horizontal line
            this.drawLine(i*10+0.5, 0, i*10+0.5, this.model.length * this.cellWidth+0.1, 1, this.cellLineColor);
        }
        for(i = 0; i <= this.model.length; i++) {
            // Vertical line
            this.drawLine(0, i*10+0.5, this.model[0].length * this.cellWidth, i*10+0.5, 0.5, this.cellLineColor);
        }
    }

    this.fillCell = function(x, y) {
        this.drawCircle((x * this.cellWidth) - (this.cellWidth / 2) + 0.5, (y * this.cellWidth) - (this.cellWidth / 2) + 0.5, this.cellWidth / 2, this.cellLineColor, this.cellLineWidth, this.cellColor);
    }

    this.cleanCell = function(x, y) {
        context.beginPath();
        context.lineWidth = this.cellLineWidth;
        context.strokeStyle = this.cellLineColor;
        //context.rect((x * this.cellWidth) + 0.5, (y * this.cellWidth) + 0.5, (x * this.cellWidth) + 0.25 + this.cellWidth, (y * this.cellWidth)  + 0.25 + this.cellWidth);
        context.rect(
            (x * this.cellWidth) + 0.5,
            (y * this.cellWidth) + 0.5,
            this.cellWidth,
            this.cellWidth
            //(x * this.cellWidth) + 0.5 + this.cellWidth,
            //(y * this.cellWidth) + 0.5 + this.cellWidth
            );

        context.fillStyle = this.backgroundColor;
        context.fill();
        context.stroke();
        //this.drawCircle((x * this.cellWidth) - (this.cellWidth / 2) -  + 0.25, (y * this.cellWidth) - (this.cellWidth / 2) + 0.25, this.cellWidth / 2, this.backgroundColor, this.cellLineWidth, this.backgroundColor);
    }

    this.fillCellsByModel = function() {
        canvas.width = canvas.width;
        for(i = 0; i < this.model.length; i++) {
            for(j = 0; j < this.model[0].length; j++) {
                if(model[i][j] && model[i][j] > 0) {
                    this.fillCell(j+1, i+1);
                } else {
                    this.cleanCell(j, i);
                }
            }
        }
    }

    getAliveCount = function(i, j) {
        // finds count of live cells
        var countLiveCells = 0;

        var nextJ = (j+1 > self.model[0].length)? self.model[0].length : j+1;
        var prevJ = (j-1 < 0) ? 0 : j-1;
        var nextI = (i+1 > self.model.length)? self.model.length : i+1;
        var prevI = (i-1 < 0) ? 0 : i-1;

        //if(i - 1 > 0 && j -1 > 0 && i + 1 < self.model.length && j + 1 < self.model[0].length) {

            if(self.model[nextI][nextJ] > 0) {
                countLiveCells++;
            }
            if(self.model[nextI][prevJ] > 0) {
                countLiveCells++;
            }

            if(self.model[nextI][j] > 0) {
                countLiveCells++;
            }
            if(self.model[prevI][j] > 0) {
                countLiveCells++;
            }

            if(self.model[i][j] > 0) {
            //    countLiveCells++;
            }

            if(self.model[i][nextJ] > 0) {
                countLiveCells++;
            }
            if(self.model[i][prevJ] > 0) {
                countLiveCells++;
            }

            if(self.model[prevI][nextJ] > 0) {
                countLiveCells++;
            }
            if(self.model[prevI][prevJ] > 0) {
                countLiveCells++;
            }
        //}
        return countLiveCells;
    }

    this.start = function() {
        this.fillCellsByModel();
        window.setInterval(function () {
            if(self.isLife) {

                for(i = 0; i < self.model.length; i++) {
                    for(j = 0; j < self.model[0].length; j++) {
                        var countLiveCells = getAliveCount(i, j);
                        if(self.model[i][j] > 0){
                            //console.log('countLiveCells: ' + countLiveCells);
                            if(countLiveCells > 3) {
                                self.model[i][j] = 0;
                            }

                            if(countLiveCells < 2) {
                                self.model[i][j] = 0;
                            }
                        } else {
                            //console.log('countLiveCells: ' + countLiveCells);
                            if(countLiveCells == 3) {
                                self.model[i][j] = 1;
                            }
                        }
                    }
                }
                self.fillCellsByModel();
                self.iterationCount++
                console.log('num of iteration: ' + self.iterationCount);
            }
        }, this.iterationPause ); // repeat forever, polling every 3 seconds
    }

    this.stop = function() {
        this.isLife = false;
    }
}