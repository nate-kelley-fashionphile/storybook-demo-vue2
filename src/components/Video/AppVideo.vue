<template>
  <VideoPlayer
    ref="videoPlayer"
    class="app-video-player"
    :options="playerOptions"
    :playsinline="playsinline"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ended="onPlayerEnded($event)"
    @loadeddata="onPlayerLoadeddata($event)"
    @waiting="onPlayerWaiting($event)"
    @playing="onPlayerPlaying($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @ready="playerReadied"
    @statechanged="playerStateChanged($event)"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { videoPlayer as VideoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

//@ts-ignore
@Component({ components: { VideoPlayer } })
export default class AppVideo extends Vue {
  @Prop() source: string;
  @Prop({ default: 'video/mp4' }) type?: 'video/mp4' | 'video/webm';
  @Prop({ default: true }) autoplay?: boolean;
  @Prop({ default: true }) muted?: boolean;
  @Prop({ default: true }) playsinline: boolean;
  @Prop({ default: false }) loop: boolean;
  @Prop() poster?: string;
  @Prop({ default: false }) controls: boolean;
  @Prop() fitToDiv: boolean;

  player() {
    //@ts-ignore
    return this.$refs.videoPlayer.player;
  }

  // videojs options
  get playerOptions() {
    return {
      controls: this.controls,
      autoplay: this.autoplay,
      loop: this.loop,
      muted: this.muted,
      language: 'en',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [
        {
          type: this.type,
          src: this.source,
        },
      ],
      poster: this.poster,
    };
  }

  @Emit('onPlayerPlay')
  onPlayerPlay(player) {
    return;
  }
  @Emit('onPlayerPause')
  onPlayerPause(player) {
    return;
  }
  @Emit('onPlayerEnded')
  onPlayerEnded(player) {
    return;
  }
  @Emit('onPlayerLoadeddata')
  onPlayerLoadeddata(player) {
    return;
  }
  @Emit('onPlayerWaiting')
  onPlayerWaiting(player) {
    return;
  }
  @Emit('onPlayerPlaying')
  onPlayerPlaying(player) {
    return;
  }
  @Emit('onPlayerTimeupdate')
  onPlayerTimeupdate(player) {
    return;
  }
  @Emit('onPlayerCanplay')
  onPlayerCanplay(player) {
    return;
  }
  @Emit('onPlayerCanplaythrough')
  onPlayerCanplaythrough(player) {
    return;
  }

  // or listen state event
  @Emit('playerStateChanged')
  playerStateChanged(playerCurrentState) {
    return;
  }
  // player is ready
  @Emit('playerReadied')
  playerReadied(player) {
    return;
  }
}
</script>

<style lang="scss">
//unscoped to try and target video js classes
//TODO try ::v-deep selector if possible
.app-video-player {
  background: var(--black-color);
  height: 100%;
  width: 100%;
  position: absolute;

  .video-js {
    height: 100%;
    width: 100%;

    .vjs-tech {
      width: auto;
      height: auto;
    }
  }
}
</style>
