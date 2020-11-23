<template>
  <div class="d-flex">
    <v-tooltip top>
      <template #activator="{on}">
        <v-btn v-on="on" class="tool-btn markup-icon" type="button" icon @click="reset">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </template>
      <span>重置</span>
    </v-tooltip>

    <v-tooltip top>
      <template #activator="{on}">
        <v-btn v-on="on" class="tool-btn markup-icon" type="button" icon @click="zoomIn">
          <v-icon>mdi-magnify-plus</v-icon>
        </v-btn>
      </template>
      <span>放大</span>
    </v-tooltip>

    <v-tooltip top>
      <template #activator="{on}">
        <v-btn v-on="on" class="tool-btn markup-icon" type="button" icon @click="zoomOut">
          <v-icon>mdi-magnify-minus</v-icon>
        </v-btn>
      </template>
      <span>縮小</span>
    </v-tooltip>

    <v-tooltip top>
      <template #activator="{on}">
        <button
          v-show="false"
          v-on="on"
          ref="toolButton"
          :id="componentName"
          class="tool-btn markup-icon markup-icon-zoomAndPan"
          :class="{'active':isActive}"
          type="button"
          @click.prevent="handleClickBtn"
        ></button>
      </template>
      <span>縮放與平移</span>
    </v-tooltip>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  props: {
    imageSvg: {
      require: true,
    },
    imageData: {
      type: Object,
    },
    containerData: {
      type: Object,
    },
    imageUrl: {
      type: String,
    },
  },
  data() {
    return {
      markupAmount: 0,
      componentName: "ZoomAndPan",
      editNodeData: [],
      isActive: false,
      minScale: 0.1,
      maxScale: 40,
      zoomInScale: 2,
      zoomOutScale: 0.5,
      zoom: null,
      width: null,
      height: null,
      transform: null,
      defaultScale: null,
      transitionTime: 750,
    };
  },

  methods: {
    handleClickBtn() {
      this.isActive = !this.isActive;
    },
    markupSvgInit() {
      let svgs = Array.from(document.querySelectorAll(".svg-wrap svg"));
      this.editNodeData = [];
      this.imageSvg = document.getElementById(`svg-${this.svgId}`);
      svgs.forEach((svgDOM) => {
        svgDOM.removeAttribute("preserveAspectRatio");
        svgDOM.removeAttribute("viewBox");
        let DomsInSvg = Array.from(svgDOM.children);
        let individualSvgNodeData = DomsInSvg.map((item) => {
          let matrix = item.transform.baseVal[0]
            ? item.transform.baseVal[0].matrix
            : { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

          return {
            id: item.id,
            transform: item.getAttribute("transform"),
            matrix: matrix,
          };
        });
        this.editNodeData = this.editNodeData.concat(individualSvgNodeData);
      });
    },
    bindZoomAndPanEvents() {
      let width = this.containerData.width;
      let height = this.containerData.height;
      let svg = d3.select(this.imageSvg);
      let imgWidth = this.imageData.width;
      let imgHeight = this.imageData.height;
      let imgRatio = this.imageData.ratio;
      this.zoom = d3
        .zoom()
        .scaleExtent([this.minScale, this.maxScale])
        .translateExtent([
          [0, 0],
          [imgWidth, imgHeight],
        ])
        .on("zoom", this.zoomed);
      this.transform = d3.zoomIdentity;
      svg.call(this.zoom, this.transform);

      if (imgRatio >= this.containerData.ratio) {
        this.defaultScale = width / imgWidth >= 1 ? 1 : width / imgWidth;
      } else {
        this.defaultScale = height / imgHeight >= 1 ? 1 : height / imgHeight;
      }

      this.zoom.scaleTo(svg, this.defaultScale);
    },
    unbindZoomAndPanEvents() {
      let svg = d3.select(this.imageSvg);
      svg.select("image").attr("transform", undefined);
      svg.call(this.zoom.transform, d3.zoomIdentity).on(".zoom", null);
    },
    zoomed() {
      let svg = d3.select(this.imageSvg);
      let transform = d3.event ? d3.event.transform : this.transform;
      svg.selectAll("image").attr("transform", transform);
    },
    zoomIn() {
      let svg = d3.select(this.imageSvg);
      this.zoom.scaleBy(svg.transition().duration(300), this.zoomInScale);
    },
    zoomOut() {
      let svg = d3.select(this.imageSvg);
      this.zoom.scaleBy(svg.transition().duration(300), this.zoomOutScale);
    },
    onWindowResize() {
      let svg = d3.select(this.imageSvg);
      this.zoom.scaleBy(svg, 1);
    },
    reset(duration) {
      let svg = d3.select(this.imageSvg);
      let width =
        window.innerWidth < this.containerData.width
          ? window.innerWidth
          : this.containerData.width;
      let height =
        window.innerHeight < this.containerData.height
          ? window.innerHeight
          : this.containerData.height;
      let imgWidth = this.imageData.width;
      let imgHeight = this.imageData.height;
      let imgRatio = this.imageData.ratio;
      let scale = 1;
      if (imgRatio >= this.containerData.ratio) {
        scale = width / imgWidth >= 1 ? 1 : width / imgWidth;
      } else {
        scale = height / imgHeight >= 1 ? 1 : height / imgHeight;
      }
      var offsetX =
        (width - imgWidth * scale) / 2 > 0 ? (width - imgWidth * scale) / 2 : 0;
      var offsetY =
        (height - imgHeight * scale) / 2 > 0
          ? (height - imgHeight * scale) / 2
          : 0;
      this.zoom.translateTo(
        svg.transition().duration(this.transitionTime),
        offsetX,
        offsetY
      );
      this.zoom.scaleTo(svg.transition().duration(this.transitionTime), scale);
      let time = typeof duration === "number" ? duration : this.transitionTime;
      svg
        .transition()
        .duration(time)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(offsetX, offsetY).scale(scale)
        );
    },
  },
  mounted() {
    this.bindZoomAndPanEvents();
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    this.unbindZoomAndPanEvents();
    window.removeEventListener("resize", this.onWindowResize);
  },
  watch: {
    imageData(imageData) {
      if (imageData) {
        this.unbindZoomAndPanEvents();
        this.bindZoomAndPanEvents();
      }
    },
  },
};
</script>