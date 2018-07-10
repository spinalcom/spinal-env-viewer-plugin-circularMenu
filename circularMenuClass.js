import Vue from "vue";
import circularMenuPanel from "./circularMenu.vue";
const circularComponentCtor = Vue.extend(circularMenuPanel);

var circularMenu = class circularMenu {
  constructor(container, viewer) {
    this.viewer = viewer;
    this._container = document.createElement("div");

    container.append(this._container);
    //position abolut
  }
  mount() {
    new circularComponentCtor().$mount(this._container);
  }
};
exports.circularMenu = circularMenu;
