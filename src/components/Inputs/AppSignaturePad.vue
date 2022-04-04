<template>
  <div class="app-signature">
    <VueSignaturePad :ref="signaturePadRefName" :options="options" />
    <AppIconButton
      v-if="useUndo && !lockPad"
      class="app-signature__undo"
      type="white"
      icon="undo"
      :round="true"
      :shadow="true"
      @onClick="undo"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import VueSignaturePad from 'vue-signature-pad';
import { AppIconButton } from '../Button';

Vue.use(VueSignaturePad);

@Component({ components: { AppIconButton } })
export default class AppSignaturePad extends Vue {
  @Prop() value: ImageData;
  @Prop({ default: 'black' }) color: string;
  @Prop() lockPad: boolean;
  @Prop({ default: true }) useUndo: boolean;

  signaturePadRefName = 'signaturePadRefName';

  get options() {
    return {
      penColor: this.color,
      onBegin: this.onBegin,
      onEnd: this.onEnd,
    };
  }

  undo() {
    (this.$refs[this.signaturePadRefName] as VueSignaturePad).undoSignature();
  }

  @Emit('onBegin')
  onBegin() {
    return;
  }

  @Emit('onEnd')
  onEnd() {
    this.input();
    return;
  }

  @Emit('input')
  input() {
    const { data } = (this.$refs[this.signaturePadRefName] as VueSignaturePad).saveSignature();
    return data;
  }

  @Watch('lockPad')
  onLockPad() {
    if (this.lockPad) {
      this.input();
      (this.$refs[this.signaturePadRefName] as VueSignaturePad).lockSignaturePad();
    } else {
      (this.$refs[this.signaturePadRefName] as VueSignaturePad).openSignaturePad();
    }
  }
}
</script>

<style lang="scss" scoped>
.app-signature {
  position: relative;
  padding: 10px;
  &__pad {
    height: 100%;
    width: 100%;
  }
  &__undo {
    transform: scale(0.7);
    position: absolute;
    top: 3px;
    right: 3px;
    z-index: 1;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
