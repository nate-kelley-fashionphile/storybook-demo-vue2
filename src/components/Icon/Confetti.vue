<template>
  <div :class="{ animate }">
    <svg class="confetti-btn__icon" viewBox="0 0 16 16" aria-hidden="true">
      <!-- <circle
        class="conf-btn-svg-item-0"
        fill="currentColor"
        cx="8"
        cy="8"
        r="8"
      /> -->
      <polygon
        class="conf-btn-svg-item-1"
        fill="#f888c0"
        points="10.3 6.212 3.3 0.581 1 15.419 15 9.991 10.3 6.212"
      />
      <path
        class="conf-btn-svg-item-2"
        fill="#b656fa"
        d="M2,8a6,6,0,1,1,6,6A5.993,5.993,0,0,1,2,8Z"
      />
      <polygon
        class="conf-btn-svg-item-3"
        fill="#e300ff"
        points="7.52 0 5.001 5.898 1.888 13.184 8.48 16 14.112 2.816 7.52 0"
      />
      <path
        class="conf-btn-svg-item-4"
        fill="#c73ba5"
        d="M2,8a6,6,0,1,1,6,6A6,6,0,0,1,2,8Z"
      />
      <polygon
        class="conf-btn-svg-item-5"
        fill="#363636"
        points="14.164 9.474 14.723 0.507 8.578 3.562 1.277 7.192 13.789 15.493 14.164 9.474"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class Confetti extends Vue {
  @Prop({ default: true }) animate: boolean;
}
</script>

<style lang="scss" scoped>
.confetti-btn__icon {
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  top: calc(50% - 16px / 2);
  left: calc(50% - 16px / 2);
  pointer-events: none;
  overflow: visible;
}
.confetti-btn__icon * {
  transform-origin: calc(16px / 2);
}

.animate .confetti-btn__icon .conf-btn-svg-item-0 {
  animation: confetti-btn-item-0-anim 1s infinite ease;
}
.animate .confetti-btn__icon .conf-btn-svg-item-1 {
  animation: confetti-btn-item-1-anim 1s infinite ease;
}
.animate .confetti-btn__icon .conf-btn-svg-item-2 {
  animation: confetti-btn-item-2-anim 1s infinite ease;
}
.animate .confetti-btn__icon .conf-btn-svg-item-3 {
  animation: confetti-btn-item-3-anim 1s infinite ease;
}
.animate .confetti-btn__icon .conf-btn-svg-item-4 {
  animation: confetti-btn-item-4-anim 1s infinite ease;
}
.animate .confetti-btn__icon .conf-btn-svg-item-5 {
  animation: confetti-btn-item-5-anim 1s infinite ease;
}

@keyframes confetti-btn-item-0-anim {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(2);
    transform: scale(2);
  }
}
@keyframes confetti-btn-item-1-anim {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-50px) scale(0.8) rotate(-3deg);
    transform: translateY(-50px) scale(0.8) rotate(-3deg);
  }
}
@keyframes confetti-btn-item-2-anim {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-44px) translateX(20px) scale(0.7)
      rotate(5deg);
    transform: translateY(-44px) translateX(20px) scale(0.7) rotate(5deg);
  }
}
@keyframes confetti-btn-item-3-anim {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-36px) translateX(-20px) scale(0.6)
      rotate(-9deg);
    transform: translateY(-36px) translateX(-20px) scale(0.6) rotate(-9deg);
  }
}
@keyframes confetti-btn-item-4-anim {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-20px) translateX(10px) scale(0.8)
      rotate(-12deg);
    transform: translateY(-20px) translateX(10px) scale(0.8) rotate(-12deg);
  }
}
@keyframes confetti-btn-item-5-anim {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-12px) translateX(-10px) scale(0.9)
      rotate(7deg);
    transform: translateY(-12px) translateX(-10px) scale(0.9) rotate(7deg);
  }
}
</style>