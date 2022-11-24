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

export const playbackRates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];

export const EMPTY_IMG = 'data:image/svg+xml,%3Csvg t=\'1669261418473\' class=\'icon\' viewBox=\'0 0 1024 1024\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' p-id=\'2766\' width=\'200\' height=\'200\'%3E%3Cpath d=\'M960 0l64 0 0 736c0 88.352-100.288 160-224 160s-224-71.648-224-160c0-88.352 100.288-160 224-160 62.688 0 119.328 18.4 160 48.032l0-368.032-512 113.792 0 494.208c0 88.352-100.288 160-224 160s-224-71.648-224-160c0-88.352 100.288-160 224-160 62.688 0 119.328 18.4 160 48.032l0-624.032 576-128z\' p-id=\'2767\' fill=\'%23ffffff\'%3E%3C/path%3E%3C/svg%3E';