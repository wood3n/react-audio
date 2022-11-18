import { useEffect } from 'react';
import { Howl, Howler } from 'howler';
import Audio1 from '@/assets/audio/1.wav';
import Audio2 from '@/assets/audio/2.flac';
import Audio3 from '@/assets/audio/3.ape';
import PlayTray from './playtray';
import './index.less';

const RCAudio = () => {
  useEffect(() => {
    const playlists = new Howl({
      src: [Audio1, Audio2, Audio3],
      html5: true,
      preload: 'metadata',
      xhr: {
        withCredentials: true
      }
    });
  }, []);

  return (
    <div className='rc-audio-container'>
      <div className='rc-audio-visualizer'>

      </div>
      <div className='rc-audio-playtray'>
        <PlayTray />
      </div>
    </div>
  );
};

export default RCAudio;
