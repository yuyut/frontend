<template>
  <v-card
    class="d-flex black"
    width="100%"
    height="100%"
    :style="{backgroundColor: backgroundColor, borderRadius: 0, overflow:'hidden'}"
    ref="card"
  >
    <img
      v-show="false"
      ref="wb-image"
      class="wb-image"
      :src="imgUrl"
      alt="img"
      @load="loadCompleted();"
    />
    <svg id="svg-webim" ref="svg-webim" class="wb-svg" :width="svgWidth" :height="svgHeight">
      <image
        ref="image-svg"
        class="wb-image-svg"
        :xlink:href="imgUrl"
        :x="offsetX"
        :y="offsetY"
        :width="imgWidth"
        :height="imgHeight"
      />

      <image
        v-for="markup in annotationData.Markup"
        :key="markup.id"
        :xlink:href="markup.url"
        :x="offsetX"
        :y="offsetY"
        :width="imgWidth"
        :height="imgHeight"
      />
    </svg>
    <v-progress-circular
      v-show="loading"
      class="wb-loader"
      :width="8"
      :size="60"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <div class="toolbar-editor" v-if="!loading">
      <div class="toolbar-body">
        <zoom-and-pan
          :imageSvg="$refs['svg-webim']"
          :imageData="imageData"
          :containerData="containerData"
          :markupsLength="annotationData.Markup.length"
        ></zoom-and-pan>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import create from "@/mixins/create";
import ZoomAndPan from "@/components/annotation-tools/ZoomAndPan.vue";

export default {
  name: "Viewer",
  mixins: [create],
  components: {
    ZoomAndPan,
  },
  props: {
    imageUrl: {
      type: String,
    },
    markups: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      imgId: null,
      imgWidth: 0,
      imgHeight: 0,
      imageRatio: null,
      svgWidth: 0,
      svgHeight: 0,
      containerData: {
        width: 0,
        height: 0,
        ratio: 0,
      },
      offsetX: 0,
      offsetY: 0,
    };
  },
  computed: {
    ...mapState("SyncoBoxMarkupStoreModule", [
      "globalUid",
      "loading",
      "backgroundColor",
      "annotationData",
      "imgUrl",
    ]),
    parentRatio() {
      return window.innerWidth / window.innerHeight;
    },
    imageData() {
      return {
        width: this.imgWidth,
        height: this.imgHeight,
        ratio: this.imageRatio,
      };
    },
  },
  methods: {
    ...mapActions("SyncoBoxMarkupStoreModule", [
      "setGlobalUid",
      "leaveEditMode",
      "setLoading",
      "setImgUrl",
    ]),
    ...mapMutations("SyncoBoxMarkupStoreModule", ["SET_ANNOTATOR_MARKUP"]),
    loadCompleted() {
      this.imgWidth = this.$refs["wb-image"].naturalWidth;
      this.imgHeight = this.$refs["wb-image"].naturalHeight;

      this.imageRatio =
        this.$refs["wb-image"].naturalWidth /
        this.$refs["wb-image"].naturalHeight;

      this.svgWidth = this.$refs["card"].$el.clientWidth; // window.innerWidth;
      this.svgHeight = this.$refs["card"].$el.clientHeight; // window.innerHeight;

      this.setLoading(false);

      this.containerData.width = this.$refs["card"].$el.clientWidth;
      this.containerData.height = this.$refs["card"].$el.clientHeight;
      this.containerData.ratio =
        this.$refs["card"].$el.clientWidth /
        this.$refs["card"].$el.clientHeight;
    },
    onWindowResized() {
      this.svgWidth = window.innerWidth;
      this.svgHeight = window.innerHeight;
      this.containerData.width = this.$refs["card"].$el.clientWidth;
      this.containerData.height = this.$refs["card"].$el.clientHeight;
      this.containerData.ratio =
        this.$refs["card"].$el.clientWidth /
        this.$refs["card"].$el.clientHeight;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onWindowResized);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResized);
  },
  watch: {
    imageUrl: {
      handler(imageUrl) {
        if (imageUrl) {
          this.setImgUrl(imageUrl);
          this.SET_ANNOTATOR_MARKUP(this.markups);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/information.scss";
@import "@/assets/scss/main.scss";
.v-window__container {
  height: 100% !important;
}

.button-edit {
  z-index: 1000;
}
</style>
