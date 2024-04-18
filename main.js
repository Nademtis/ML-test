"use strict"

import Controller from "./controller/controller.js";

window.addEventListener("load", start);

const controller = new Controller()
async function start() {
    await controller.initMLModel(); // init ML model
    controller.init();              // controller init
}
