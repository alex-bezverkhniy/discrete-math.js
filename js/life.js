Life = function(contextId, model) {
    var canvas = document.getElementById(contextId);
    var context = canvas.getContext('2d');

    this.model = model;
    this.cellWidth = 10;

    this.cellColor = 'green';
    this.cellLineColor = '#000';
    this.cellLineWidth = 1;
    this.isLife = true;
    this.iterationCount = 0;

    var self = this;
    canvas.addEventListener('mouseup', function(evt) {
       var mousePos = getMousePos(canvas, evt);
       var j = Math.ceil(mousePos.x / self.cellWidth) - 1;
       var i = Math.ceil(mousePos.y / self.cellWidth) - 1;
       console.log('Mouse position: ' + i + ',' + j);

       self.model[i][j] = self.model[i][j] == 0 ? 1 : 0;
       //console.log('Model: ' + self.model);
       self.fillCellsByModel();

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
        for(i = 0; i <= this.model[0].length; i++) {
            // Horizontal line
            this.drawLine(i*10+0.5, 0, i*10+0.5, this.model.length * this.cellWidth+0.1, 1, '#ccc;');
        }
        for(i = 0; i <= this.model.length; i++) {
            // Vertical line
            this.drawLine(0, i*10+0.5, this.model[0].length * this.cellWidth, i*10+0.5, 0.5, '#ccc');
        }
    }

    this.fillCell = function(x, y) {
        this.drawCircle((x * this.cellWidth) - (this.cellWidth / 2) -  + 0.25, (y * this.cellWidth) - (this.cellWidth / 2) + 0.25, this.cellWidth / 2, this.cellLineColor, this.cellLineWidth, this.cellColor)
    }

    this.fillCellsByModel = function() {
        for(i = 0; i < this.model.length; i++) {
            for(j = 0; j < this.model[0].length; j++) {
                if(model[i][j] && model[i][j] > 0) {
                    this.fillCell(j+1, i+1);
                }
            }
        }
    }

    this.start = function() {
        this.fillCellsByModel();
        window.setInterval(function () {
            if(self.isLife) {
                self.fillCellsByModel();
                self.iterationCount++
                console.log('num of iteration: ' + self.iterationCount);
            }
        }, 3000); // repeat forever, polling every 3 seconds
    }

    this.stop = function() {
        this.isLife = false;
    }
}