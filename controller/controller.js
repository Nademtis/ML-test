"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"



export default class Controller {
    constructor() {
        this.model = new Model()
        this.view = new View(this)
        this.MLmodel = undefined
    }
    async initMLModel(){
        this.MLmodel = await tf.loadLayersModel('./ML/model.json');
    }

    init() {
        //code below is for 1 prediction
        const toPredict = tf.tensor2d(this.predictStuff())
        const prediction = this.MLmodel.predict(toPredict);
        prediction.print();

        //code below is for measuring 1000 predictions - write done when done
        this.measurePredictionTime()
        console.log("done with 1000 predictions");
    }
    predictStuff(){
        //this model takes 7 input
        const xpredict = [[0.38, 0.51, 1, 0, 1, 0, 0]];
        return xpredict
    }
    async measurePredictionTime() {
        const toPredict = tf.tensor2d(this.predictStuff());

        // Perform 1000 predictions and measure the time
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            const prediction = this.MLmodel.predict(toPredict);
            //prediction.print();
        }
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        console.log("Total time for 1000 predictions:", totalTime, " in milliseconds my guy");
    }

}