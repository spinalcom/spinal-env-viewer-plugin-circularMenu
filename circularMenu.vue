<template>
    <div>
    <div  :style="getStyle()">
      <md-button  v-for="(button, index) in buttonTab" :key="index"  @click="button.myClick()" :style="getButtonStyle(index)" style="margin: unset;pointer-events: auto;background: red; height: 40px" class="md-icon-button slice">
        <md-icon>{{button.icon}}</md-icon>
      </md-button>
    </div>
      <md-button @click="activateMode" :style="color" class="activeButton md-icon-button slice">
      </md-button>

    </div>
</template>


<script>
var spinalSystem;
var viewer;
// import event from "./event.vue";

export default {
  name: "newFile",
  data() {
    return {
      buttonTab: [],
      _viewport: undefined,
      data: {},
      color: {
        background: "red"
      },
      activateModeBool: false
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
        this.color.background = "red";
        this.data = {};
      } else {
        this.activateModeBool = true;
        this.color.background = "green";
      }
    },
    onSelectionChange: function(data) {
      if (this.activateModeBool) this.data = data;
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
            "pointer-events": "none"
          };
          return obj;
        } else {
          return {
            display: "none",
            position: "absolute",
            top: "0%",
            left: "0%"
          };
        }
      } else {
        return {
          display: "none",
          position: "absolute",
          top: "0%",
          left: "0%"
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
      console.log(axeX, axeY);
      myStyle.left = "calc(50% + " + (axeX - 20) + "px)";
      myStyle.top = "calc(50% + " + (axeY - 20) + "px)";
      // console.log(myStyle);

      return myStyle;
    },
    onMouseDown: function(e) {
      var viewport = { x: e.canvasX, y: e.clientY };
      this._viewport = viewport;
    },
    file: function(button) {
      console.log("file");
      // console.log(button);
      // event.$emit("openResumePanel", this.data.dbIdArray[0], 2);
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                  Register Button                                                       //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addButton: function(func, icon) {
      var obj = {
        myClick: func,
        icon: icon
      };
      this.buttonTab.push(obj);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    // this.addButton(this.file, "attach_file");
    spinal.circularMenu = {};
    spinal.circularMenu.addButton = this.addButton;
    spinal.circularMenu.addButton(this.file, "attach_file");
    // this.buttonTab.push({ myClick: this.file, icon: "attach_file" });

    this.getEvent();
  }
};
</script>

<style>
.activeButton {
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
</style>
