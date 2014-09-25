// Class Prima - implementation of Prim algorithm
function Prima(ctx) {
    this.model = new Array();
    this.ctx = ctx;
    this.painter = new Painter(this.ctx);
    this.pathWeight = 0;

    // shows full Graph
    this.showGraph = function() {
        var model = this.model;

        for(var k in model) {
            for(var kk in model) {
                if(model[k][kk] && model[k][k]) {
                    if(model[k][kk].weight == 0) {
                        this.painter.drawPoint(model[k][k].x, model[k][k].y);
                        this.painter.drawText(model[k][k].x, model[k][k].y, k);
                    }
                    this.painter.drawLine(model[k][kk].x, model[k][kk].y, model[k][k].x, model[k][k].y, '', '', model[k][kk].weight);
                }
            }
        }
    };

    // finds min weight
    this.findMinWeight = function(model, completeStack) {
        var v = 999999;
        var minWeightPathCity = null;
        for(var k in model) {
            if(v > model[k].weight && model[k].weight != 0 && completeStack.indexOf(k) == -1) {
                v = model[k].weight;
                minWeightPathCity = k;
            }
        }
        return minWeightPathCity;
    }

    // finds and shows shorter path from start city "startCity" by all cities
    this.showAllPath = function(startCity, completeStack) {
        var model = this.model;
        var minWeightPathCity = this.findMinWeight(model[startCity], completeStack);
        this.painter.drawText(model[startCity][minWeightPathCity].x, model[startCity][minWeightPathCity].y, minWeightPathCity);
        if(model[startCity][minWeightPathCity]) {

            this.painter.drawLine(model[startCity][minWeightPathCity].x, model[startCity][minWeightPathCity].y, model[startCity][startCity].x, model[startCity][startCity].y, '', '', model[startCity][minWeightPathCity].weight);
            completeStack.push(startCity);
            this.showAllPath(minWeightPathCity, completeStack);
        }
    };

    // finds and shows shorter path from start city "startCity" by all cities
    this.showPathByCities = function(startCity, endCity, completeStack) {
        var model = this.model;

        // tries to find direct link
         if(model[startCity][endCity]) {
            this.painter.drawLine(model[startCity][endCity].x, model[startCity][endCity].y, model[endCity][startCity].x, model[endCity][startCity].y, '', '', model[endCity][startCity].weight);
            this.pathWeight = model[startCity][endCity].weight;
            console.log('pathWeight: ' + this.pathWeight);
            return;
         }

        var minWeightPathCity = this.findMinWeight(model[startCity], completeStack);
        this.painter.drawText(model[startCity][minWeightPathCity].x, model[startCity][minWeightPathCity].y, minWeightPathCity);
        if(model[startCity][minWeightPathCity]) {
            if(minWeightPathCity != endCity) {
                this.painter.drawLine(model[startCity][minWeightPathCity].x, model[startCity][minWeightPathCity].y, model[startCity][startCity].x, model[startCity][startCity].y, '', '', model[startCity][minWeightPathCity].weight);
                this.pathWeight += model[startCity][minWeightPathCity].weight;
                completeStack.push(startCity);
                this.showPathByCities(minWeightPathCity, endCity, completeStack);
            } else {
                this.painter.drawLine(model[startCity][minWeightPathCity].x, model[startCity][minWeightPathCity].y, model[startCity][startCity].x, model[startCity][startCity].y, '', '', model[startCity][minWeightPathCity].weight);
            }
            this.pathWeight += model[startCity][minWeightPathCity].weight;
        }


    };

}
