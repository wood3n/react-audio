import React, { useState, useEffect, useRef } from 'react';
import { Slider, Dropdown, Tooltip, Popover, message } from 'antd';
import { SliderMarks } from 'antd/es/slider';
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
import { Howl, Howler } from 'howler';
import dayjs from 'dayjs';
import fallback from '@/assets/images/fallback.png';
import { playbackTates } from '@/constants';
import { Song } from '../types';
import './index.less';

interface Props {
  song?: Song;
  onPlay: VoidFunction;
  onPrev: () => void;
  onNext: () => void;
}

const PlayTray: React.FC<Props> = ({
  song,
  onPlay,
  onPrev,
  onNext
}) => {
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(0.2);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const audioIdRef = useRef<number>();
  const howlerRef = useRef<Howl | null>(null);

  useEffect(() => {
    howlerRef.current?.unload?.();

    if (song?.src) {
      howlerRef.current = new Howl({
        src: song.src,
        html5: true,
        volume,
        preload: 'metadata',
        xhr: {
          withCredentials: true
        }
      });

      howlerRef.current.once('load', function(id: number){
        audioIdRef.current = howlerRef.current?.play();
        const dur = howlerRef.current?.duration(id);
        if (dur) {
          setCurrent(0);
          setDuration(dur);
        }
        setPaused(false);
      });

      howlerRef.current.on('play', function handlePlaying(){
        if (howlerRef.current?.playing()){
          setCurrent(current => current + 1);
          setTimeout(handlePlaying, 1000); //adjust timeout to fit your needs
        }
      });

      howlerRef.current.on('end', function handlePlaying(){
        onNext();
      });

      howlerRef.current.once('loaderror', function(){
        console.log('loaderror');
        message.error('加载错误');
        setPaused(() => true);
      });
    }

    return () => {
      howlerRef.current?.unload();
      howlerRef.current = null;
    };
  }, [song?.src]);

  const handlePlay = () => {
    setPaused(false);
    if (audioIdRef.current) {
      howlerRef.current?.play(audioIdRef.current);
    } else {
      onPlay();
    }
  };

  const handlePause = () => {
    setPaused(true);
    howlerRef.current?.pause(audioIdRef.current);
  };

  const handleSeek = (value: number) => {
    setCurrent(value);
    howlerRef.current?.seek(value);
  };

  const handleChangeVolume = (v: number) => {
    setVolume(v);
    howlerRef.current?.volume(v);
  };

  const handleChangeRate = (v: number) => {
    setRate(v);
    howlerRef.current?.rate(v);
  };

  return (
    <div className='playtray'>
      <div className='playtray-left'>
        <div className='song-cover'>
          <img src={song?.pic || fallback} />
        </div>
        <div className='song-info'>
          <div className='song-name'>{song?.name}</div>
          <div className='arts'>
            {song?.arts?.map(n => n)}
          </div>
        </div>
        <div className='song-action'>
          <a className='play-add'><MdAddCircleOutline size={18}/></a>
          <a className='play-like'><MdOutlineFavoriteBorder size={18}/></a>
        </div>
      </div>
      <div className='playtray-center'>
        <div className='play-action'>
          <a className='play-prev' onClick={onPrev}><MdSkipPrevious size={24}/></a>
          {paused ? (
            <a className='play-play' onClick={handlePlay}>
              <MdPlayCircleFilled size={36} />
            </a>
          ) : (
            <a className='play-pause' onClick={handlePause}>
              <MdPauseCircleFilled size={36} />
            </a>
          )}
          <a className='play-next' onClick={onNext}><MdSkipNext size={24}/></a>
        </div>
        <div className='play-progress'>
          <span className='play-current-time'>{dayjs.duration(current, 'seconds').format('mm:ss')}</span>
          <Slider
            defaultValue={0}
            min={0}
            max={duration}
            step={1}
            value={current}
            onChange={handleSeek}
            tooltip={{ formatter: v => dayjs.duration(v!, 'seconds').format('mm:ss') }}
            style={{ width: '100%' }}
          />
          <span className='play-total-time'>
            {duration ? dayjs.duration(duration, 'seconds').format('mm:ss') : '00:00'}
          </span>
        </div>
      </div>
      <div className='playtray-right'>
        <a className='play-mode'><MdRepeatOne size={24}/></a>
        <a className='play-volume'>
          <Popover content={(
            <Slider
              defaultValue={40}
              min={0.1}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleChangeVolume}
              tooltip={{ open: false }}
              style={{ width: 160 }}
            />
          )}>
            <MdVolumeUp size={18}/>
          </Popover>
        </a>
        <a className='play-rate'>
          <Popover content={(
            <Slider
              step={null}
              dots
              marks={{
                0.5: '0.5 X',
                1: '1 X',
                1.5: '1.5 X',
                2: '2 X',
              } as SliderMarks}
              min={0.5}
              max={2}
              value={rate}
              onChange={handleChangeRate}
              tooltip={{ open: false }}
              style={{ width: 160 }}
            />
          )}>
            {`${rate} X`}
          </Popover>
        </a>
        <a className='play-resize'><MdExpand size={18}/></a>
      </div>
    </div>
  );
};

export default PlayTray;
