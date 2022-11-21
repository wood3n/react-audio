import Audio1 from '@/assets/audio/温暖-李健.wav';
import Audio2 from '@/assets/audio/八十年代的歌-赵雷.flac';
import Audio4 from '@/assets/audio/flower dance-DJ Okawari.mp3';
import Pic1 from '@/assets/images/lijian.png';
import Pic2 from '@/assets/images/wufazhangda.png';
import Pic4 from '@/assets/images/flower.png';

export const presets = [
  {
    id: 1,
    name: '温暖',
    pic: Pic1,
    src: Audio1,
    arts: ['李健']
  },
  {
    id: 2,
    name: '八十年代的歌',
    pic: Pic2,
    src: Audio2,
    arts: ['赵雷']
  },
  {
    id: 4,
    name: 'flower dance',
    pic: Pic4,
    src: Audio4,
    arts: ['DJ Okawari']
  },
];

export const playbackTates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];