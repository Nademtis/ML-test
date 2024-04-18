"use strict"

import Controller from "./controller/controller.js";

window.addEventListener("load", start);

const controller = new Controller()
async function start() {
    await controller.initMLModel(); // Wait for the model to be initialized
    controller.init(); // Then initialize the controller
}
