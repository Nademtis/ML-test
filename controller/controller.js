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
        this.MLmodel = await tf.loadLayersModel('../ML/model.json');
    }

    init() {
        const toPredict = tf.tensor2d(this.predictStuff())
        const prediction = this.MLmodel.predict(toPredict);
        prediction.print();
        this.measurePredictionTime()
    }
    predictStuff(){
        //this model takes 7 input
        const xpredict = [[0.38, 0.51, 1, 0, 1, 0, 0]];
        return xpredict
    }
    async measurePredictionTime() {
        //await this.initMLModel(); // Ensure the model is loaded before proceeding

        const toPredict = tf.tensor2d(this.predictStuff());

        // Perform 1000 predictions and measure the time
        //const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            const prediction = this.MLmodel.predict(toPredict);
            // Note: You may want to do something with each prediction to ensure realistic timing.
            // For the sake of measuring, printing is enough.
            prediction.print();
        }
        //const endTime = performance.now();
        //const totalTime = endTime - startTime;
        //console.log("Total time for 1000 predictions:", totalTime, "milliseconds");
    }

}