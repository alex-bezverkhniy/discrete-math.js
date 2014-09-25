// Class Painter - helper for draw graphical primitives
function Painter(ctx, font, color){
    this.ctx = ctx;
    this.font = font ? font : "12px Arial";
    this.color = color ? color : "#000000";
    this.fillColor = '#000000';

    this.drawRectangle = function(startX, startY, endX, endY, fillColor, lineColor) {
          this.ctx.beginPath();
          this.ctx.rect(startX, startY, endX, endY);
          this.ctx.fillStyle = fillColor;
          this.ctx.fill();
          this.ctx.lineWidth = 1;
          this.ctx.strokeStyle = lineColor;
          this.ctx.stroke();
    }

    this.drawLine = function(startX, startY, endX, endY, startText, endText, text){
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.stroke();
        var length = this.lineLength(startX, startY, endX, endY);
        var midC = this.middleCoordinate(startX, startY, endX, endY);
        var quaC = this.quarterCoordinate(startX, startY, endX, endY);

        if(startText && endText) {
            this.drawPoint(startX, startY, startText);
            this.drawPoint(endX, endY, endText);
        }
        if(text){

            this.drawPoint(startX, startY);
            this.drawPoint(endX, endY);
            if(typeof text == 'string' || typeof text ==  'number') {
                this.ctx.fillText(text, midC.x, midC.y);
            } else if(typeof text == 'boolean' ) {
                this.ctx.fillText(length, midC.x, midC.y);
            }

        }

        console.log(length);
        console.log(midC);
    };

    this.drawText = function(x, y, text){
        this.ctx.strokeStyle = this.color;;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillText(text, x + 2, y - 2);
        this.ctx.stroke();
    }

    this.drawPoint = function(x, y, text){
        this.drawCircle(x, y, 1);
        if(text) {
            this.drawText(text, x + 2, y - 2);
        }
    };

    this.drawCircle = function(x,y,r) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2*Math.PI);
        this.ctx.strokeStyle = this.color;;
        this.ctx.stroke();
    };

    this.lineLength = function( x, y, x0, y0 ){
        return Math.sqrt( ( x -= x0 ) * x + ( y -= y0 ) * y );
    };

    this.middleCoordinate = function (startX, startY, endX, endY) {
        var x = ((startX  * 0.5) + (endX * 0.5));
        var y = ((startY * 0.5) + (endY * 0.5));
        return {x: ((startX  * 0.5) + (x * 0.5)), y: ((startY * 0.5) + (y * 0.5))}
    }

    this.quarterCoordinate = function (startX, startY, endX, endY) {
        return {x: ((startX  * 0.5) + (endX * 0.25)) / 2, y: ((startY * 0.5) + (endY * 0.5)) / 2}
    }
}
