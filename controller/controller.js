"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"



export default class Controller {
    constructor() {
        this.model = new Model()
        this.view = new View(this)
        this.MLmodel = undefined
    }
    async initMLModel() {
        this.MLmodel = await tf.loadLayersModel('./ML/model.json');

        //tf.setBackend('webgl');       // change model to utilize GPU
        tf.setBackend('cpu');           // change model to unilize CPU
    }

    init() {
        //code below is for doing 1 prediction
        const toPredict = tf.tensor2d(this.predictStuff())
        const prediction = this.MLmodel.predict(toPredict);
        prediction.print();


        //code below returns the highest value class from the predict
        const predictionValues = prediction.dataSync(); // Retrieve values synchronously
        const predictedClasses = predictionValues.indexOf(Math.max(...predictionValues));
        console.log("the winner: " + predictedClasses);


        //code below is for getting the result in an array
        const predictedClassesInArray = prediction.arraySync()[0]
        console.log('3 Classes printed out:', predictedClassesInArray);


        //code below is for measuring 1000 predictions - write done in the console when done
        this.measurePredictionTime()
        console.log("done with 1000 predictions");
        console.log("running with: " + tf.getBackend())
    }
    predictStuff() {
        //this model takes 7 input

        const xpredict = [[0.38, 0.51, 1, 0, 1, 0, 0]];       //is 0
        //const xpredict = [[0.48,0.98,1,0,0,1,0]];             //is 1
        //const xpredict = [[0.30, 0.29, 0, 1, 0, 1, 0]];       //is 2


        return xpredict
    }
    measurePredictionTime() {
        const toPredict = tf.tensor2d(this.predictStuff());

        const amountOfPredictions = 1000

        // Perform 1000 predictions and measure time elapsed
        const startTime = performance.now();
        for (let i = 0; i < amountOfPredictions; i++) {
            const prediction = this.MLmodel.predict(toPredict);
            //prediction.print();
        }

        //dispose/destroy the tensor for memory
        toPredict.dispose();

        //print time
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        console.log("Total time for " + amountOfPredictions + " predictions:", totalTime, " in milliseconds my guy");
    }
}