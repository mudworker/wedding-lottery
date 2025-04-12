import { defineStore } from 'pinia';
import { Howl } from 'howler';

type SoundOptions = {
  volume?: number;
  loop?: boolean;
};

type SoundMap = Record<string, Howl>;

export const useSoundStore = defineStore('sound', {
  state: () => ({
    sounds: {} as SoundMap,
    muted: false,
  }),

  actions: {
    register(name: string, src: string | string[], options: SoundOptions = {}) {
      if (this.sounds[name]) return;

      const sound = new Howl({
        src: Array.isArray(src) ? src : [src],
        volume: options.volume ?? 1.0,
        loop: options.loop ?? false,
        // html5: true,
        mute: this.muted,
      });

      this.sounds[name] = sound;
    },

    play(name: string) {
      const sound = this.sounds[name];
      console.log(sound.playing())
      if (sound) sound.play();
      sound.once('play', () => {
        console.log(`[${name}] 播放成功`);
      });
    
      sound.once('end', () => {
        console.log(`[${name}] 播放结束`);
      });
    },

    stop(name: string) {
      const sound = this.sounds[name];
      if (sound) sound.stop();
    },

    replay(name: string) {
      const sound = this.sounds[name];
      if (sound) {
        sound.stop();
        sound.play();
      }
    },

    setVolume(name: string, volume: number) {
      const sound = this.sounds[name];
      if (sound) sound.volume(volume);
    },

    muteAll(mute: boolean) {
      this.muted = mute;
      Object.values(this.sounds).forEach((sound: any) => sound.mute(mute));
    },

    unload(name: string) {
      if (this.sounds[name]) {
        this.sounds[name].unload();
        delete this.sounds[name];
      }
    }
  }
});
