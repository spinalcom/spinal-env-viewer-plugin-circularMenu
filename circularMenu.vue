<template>
    <div>
    <div :style="getStyle()">
      <md-button  v-for="(button, index) in buttonTab" :key="index"  @click="button.myClick()" :style="getButtonStyle(index)" style="margin: unset;pointer-events: auto;background: #2D3D93; height: 40px" class="md-icon-button">
        <md-icon>{{button.icon}}</md-icon>
      </md-button>
    </div>
      <md-button @click="activateMode" :style="color" class="myButton md-icon-button">
      </md-button>

    </div>
</template>


<script>
var spinalSystem;
var viewer;

export default {
  name: "newFile",
  data() {
    return {
      buttonTab: [],
      _viewport: undefined,
      data: {},
      color: {
        background: "#2D3D93"
      },
      activateModeBool: true,
      styleContener: {},
      positionX: "",
      positionY: "",
      node: {},
      appsList: {}
    };
  },
  components: {},
  props: [],
  methods: {
    getEvent: function() {
      var _container = viewer.canvas.parentElement;
      _container.addEventListener("mousedown", this.onMouseDown);

      viewer.addEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        this.onSelectionChange
      );
    },
    activateMode: function() {
      if (this.activateModeBool) {
        this.activateModeBool = false;
        this.color.background = "#F68204";
        this.data = {};
      } else {
        this.activateModeBool = true;
        this.color.background = "#2D3D93";
      }
    },
    onSelectionChange: function(data) {
      if (this.activateModeBool) {
        if (data.dbIdArray.length == 1) {
          this.data = data;
          console.log("DEPLACEMENT DU CIRCULAR MENU");
          this.positionX = this._viewport.x;
          this.positionY = this._viewport.y;
          this.getNode();
        }
      }
    },
    getStyle: function() {
      if (typeof this.data.dbIdArray != "undefined" && this.data.dbIdArray) {
        if (this.data.dbIdArray.length > 0) {
          let obj = {
            position: "absolute",
            left: this._viewport.x - 75 + "px",
            top: this._viewport.y - 75 + "px",
            height: "150px",
            width: "150px",
            "pointer-events": "none",
            opacity: 1,

            "-webkit-transform": "scale(1)",
            "-moz-transform": "scale(1)",
            transform: "scale(1)",

            "-webkit-transition": "all 0.4s ease-out",
            "-moz-transition": "all 0.4s ease-out",
            transition: "all 0.4s ease-out"
          };
          // this.circleClass = ".opencircle";

          return obj;
        } else {
          return {
            position: "absolute",
            opacity: 0,

            "-webkit-transform": "scale(0)",
            "-moz-transform": "scale(0)",
            transform: "scale(0)"
          };
        }
      } else {
        // this.circleClass = "circle";

        return {
          position: "absolute",
          opacity: 0,

          "-webkit-transform": "scale(0)",
          "-moz-transform": "scale(0)",
          transform: "scale(0)"
        };
      }
    },
    getButtonStyle: function(index) {
      let myStyle = {
        left: "",
        top: "",
        position: "absolute"
      };

      let nbrElement = this.buttonTab.length;
      // console.log(index);
      let rayon = 60;
      let nbr = 2 * Math.PI / nbrElement;
      if (nbrElement >= 7) {
        let result = nbrElement * 2 * 25;
        rayon = result / (2 * Math.PI);
      }
      let axeX = (rayon * Math.cos(nbr * index)).toFixed(1);
      let axeY = (rayon * Math.sin(nbr * index)).toFixed(1);
      // console.log(axeX, axeY);
      myStyle.left = "calc(50% + " + (axeX - 20) + "px)";
      myStyle.top = "calc(50% + " + (axeY - 20) + "px)";
      // console.log(myStyle);

      return myStyle;
    },
    onMouseDown: function(e) {
      var viewport = { x: e.canvasX, y: e.clientY };
      this._viewport = viewport;
    },
    getNode: function() {
      spinal.contextStudio.graph
        .getNodeBydbId(this.data.dbIdArray[0])
        .then(node => {
          this.node = node;
          console.log("SEND GET NODE CLICK EVENT");
          spinal.eventBus.$emit("getNodeClick", node);
        });
    },

    drive: function() {
      console.log("drive");
      spinal.eventBus.$emit("openDrivePanel", this.node);
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                  Register Button                                                       //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addButton: function(func, icon) {
      // console.log(func.name);
      var obj = {
        myClick: func,
        icon: icon
      };
      this.buttonTab.push(obj);
    },
    removeButton: function() {}
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    // this.addButton(this.file, "attach_file");
    spinal.circularMenu = {};
    spinal.circularMenu.addButton = this.addButton;

    // spinal.circularMenu.addButton(this.drive, "attach_file");

    // spinalSystem.getModel().then(forgeFile => {
    //   if (forgeFile) {
    //     if (forgeFile.apps) {
    //       // console.log(forgeFile.apps);
    //       if (typeof forgeFile.apps.appsList !== "undefined") {
    //         forgeFile.apps.appsList.load(appsList => {
    //           this.appsList = appsList;
    //           // this.allComments.bind(this.onModelChange);
    //         });
    //       } else {
    //         var list = new Lst();
    //         forgeFile.apps.add_attr({
    //           appsList: new Ptr(list)
    //         });
    //         forgeFile.apps.appsList.load(appsList => {
    //           this.appsList = appsList;
    //           // this.allComments.bind(this.onModelChange);
    //         });
    //       }
    //     }
    //   }
    // });

    // this.buttonTab.push({ myClick: this.file, icon: "attach_file" });

    this.getEvent();
  }
};
</script>

<style>
.myButton {
  margin: unset;
  pointer-events: auto;
  background: red;
  height: 20px;
  right: 38px;
  min-width: 20px;
  width: 20px;
  position: absolute;
  top: 68px;
}

.circle {
  opacity: 0;

  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  transform: scale(0);

  -webkit-transition: all 0.4s ease-out;
  -moz-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;
}

.opencircle {
  opacity: 1;

  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  transform: scale(1);
}
</style>
