<template>
  <div>
    <AppButton :text="text" :type="type" @onClick="onClick" :block="block" />
    <input v-show="false" :ref="uploadRefName" type="file" :accept="accept" :multiple="multiple" @change="onUpload" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import AppButton from './AppButton.vue';
import { ButtonTypes } from './config';

const FILE_TYPES = 'image/png, image/jpeg, image/bmp, application/pdf, text/html';

@Component({ components: { AppButton } })
export default class AppFileInput extends Vue {
  @Prop({ default: FILE_TYPES }) accept: string;
  @Prop() multiple: boolean;
  @Prop() text: string;
  @Prop() block: boolean;
  @Prop() type: ButtonTypes;

  uploadRefName = 'uploadRefName';

  onClick() {
    const target = this.$refs[this.uploadRefName] as HTMLElement;
    target.click();
  }

  @Emit('onUpload')
  onUpload({ target: { files } }: { target: { files: Record<string, File> } }): File[] {
    return Object.values(files);
  }
}
</script>
