import React from 'react';
import { Slider } from 'antd';
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdSkipPrevious,
  MdSkipNext,
  MdRepeatOne,
  MdRepeat,
  MdShuffle,
  MdExpand,
  MdVolumeMute,
  MdVolumeDown,
  MdVolumeUp,
  MdVolumeOff,
  MdListAlt,
  MdAddCircleOutline,
  MdOutlineFavoriteBorder,
  MdOutlineFavorite
} from 'react-icons/md';
import fallback from '@/assets/images/fallback.png';
import './index.less';

interface Props {
  name?: string;
  arts: string[];
  pic?: string;
  status?: 0 | 1;
}

const PlayTray: React.FC<Props> = ({
  pic,
  status = 0
}) => {
  return (
    <div className='playtray'>
      <div className='playtray-left'>
        <div className='song-cover'>
          <img src={pic || fallback} />
        </div>
        <div className='song-info'>
          <div className='song-name'>xxxxxxxxx</div>
          <div className='arts'>xxxxxxxxxxxx</div>
        </div>
        <div className='song-action'>
          <a className='play-add'><MdAddCircleOutline size={18}/></a>
          <a className='play-like'><MdOutlineFavoriteBorder size={18}/></a>
        </div>
      </div>
      <div className='playtray-center'>
        <div className='play-action'>
          <a className='play-prev'><MdSkipPrevious size={24}/></a>
          <a className='play-play_pause'><MdPlayCircleFilled size={36} /></a>
          <a className='play-next'><MdSkipNext size={24}/></a>
        </div>
        <div className='play-progress'>
          <span className='play-current-time'>00:00</span>
          <Slider defaultValue={40} tooltip={{ open: false }} style={{ width: '100%' }}/>
          <span className='play-total-time'>00:00</span>
        </div>
      </div>
      <div className='playtray-right'>
        <a className='play-mode'><MdRepeatOne size={24}/></a>
        <a className='play-volume'><MdVolumeUp size={18}/></a>
        <a className='play-list'><MdListAlt size={18}/></a>
        <a className='play-resize'><MdExpand size={18}/></a>
      </div>
    </div>
  );
};

export default PlayTray;
