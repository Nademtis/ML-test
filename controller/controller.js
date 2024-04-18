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
        this.MLmodel = await tf.loadLayersModel('/ML/model.json');
    }

    init() {
        const toPredict = tf.tensor2d(this.predictStuff())
        const prediction = this.MLmodel.predict(toPredict);
        prediction.print();
    }
    predictStuff(){
        //this model takes 7 input
        const xpredict = [[0.38, 0.51, 1, 0, 1, 0, 0]];
        return xpredict
    }

}