import Audio1 from '@/assets/audio/温暖-李健.wav';
import Audio2 from '@/assets/audio/八十年代的歌-赵雷.flac';
import Audio3 from '@/assets/audio/青花瓷-周杰伦.ape';
import Audio4 from '@/assets/audio/flower dance-DJ Okawari.mp3';
import Pic1 from '@/assets/images/lijian.png';
import Pic2 from '@/assets/images/wufazhangda.png';
import Pic3 from '@/assets/images/qinghuaci.png';
import Pic4 from '@/assets/images/flower.png';

export const presets = [
  {
    pic: Pic1,
    src: Audio1,
    arts: ['李健']
  },
  {
    pic: Pic2,
    src: Audio2,
    arts: ['赵雷']
  },
  {
    pic: Pic3,
    src: Audio3,
    arts: ['周杰伦']
  },
  {
    pic: Pic4,
    src: Audio4,
    arts: ['DJ Okawari']
  },
];

export const playbackTates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];