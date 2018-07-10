
<script>
import Vue from "vue";
import { circularMenu } from "./circularMenuClass.js";
// import circularMenu from "./circularMenu";
// const ComponentCtor = Vue.extend(appsManager);

const ClassName = "spinalcircularMenu";
const PanelTitle = "spinalcircularMenu";
const ButtonLabel = "spinalcircularMenu";
const ButtonIcon = "playlist_add";

const classExtention = class {
  constructor(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    this.viewer = viewer;
    this.panel = null;
  }

  load() {
    this.initialize();
    return true;
  }

  unload() {
    // this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
  }
  // This function is to create your button on viewer, it used autodesk forge api

  initialize() {
    let hideOrShow = new circularMenu(document.body, this.viewer);
    hideOrShow.mount();
  }
};

export default new class {
  constructor() {
    Autodesk.Viewing.theExtensionManager.registerExtension(
      ClassName,
      classExtention
    ); // this is the register of your class
    window.spinal.ForgeExtentionManager.addExtention(ClassName);
  }
}();
</script>
<style>
.spinalColorButton {
  background-color: rgba(17, 48, 223, 0.644);
}
</style>