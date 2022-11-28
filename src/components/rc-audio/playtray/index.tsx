import React, { useState, useEffect, useRef } from 'react';
import { Slider, Dropdown, Tooltip, Popover, message } from 'antd';
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdSkipPrevious,
  MdSkipNext,
  MdRepeatOne,
  MdExpand,
  MdVolumeMute,
  MdVolumeDown,
  MdVolumeUp,
  MdVolumeOff,
  MdAddCircleOutline,
  MdOutlineFavoriteBorder,
} from 'react-icons/md';
import dayjs from 'dayjs';
import { playbackRates, EMPTY_IMG } from '@/constants';
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
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const audioElRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    if (song?.src) {
      audioElRef.current.src = song.src;
      audioElRef.current.controls = false;
      audioElRef.current.volume = volume;
      audioElRef.current.preload = 'metadata';
      audioElRef.current.crossOrigin = 'use-credentials';

      audioElRef.current.onloadedmetadata = () => {
        setDuration(Math.floor(audioElRef.current.duration));
      };

      audioElRef.current.ontimeupdate = () => {
        setCurrent(Math.floor(audioElRef.current.currentTime));
      };

      audioElRef.current.onplay = () => {
        setPaused(false);
      };

      audioElRef.current.onpause = () => {
        setPaused(true);
      };

      audioElRef.current.oncanplay = () => {
        audioElRef.current.play();
      };
    }

    return () => {
      // https://html.spec.whatwg.org/multipage/media.html#best-practices-for-authors-using-media-elements
      audioElRef.current.src = '';
    };
  }, [song?.src]);

  /**
   * 开始播放
   * 1. 当前播放歌曲被暂停
   * 2. 当前无播放歌曲，选择播放队列中第一首歌曲播放
   */
  const handlePlay = () => {
    if (song?.src && audioElRef.current) {
      audioElRef.current.play();
    } else {
      onPlay();
    }
  };

  const handlePause = () => {
    audioElRef.current.pause();
    setPaused(true);
  };

  const handleSeek = (value: number) => {
    setCurrent(value);
    audioElRef.current.currentTime = value;
  };

  const handleChangeVolume = (v: number) => {
    setVolume(v);
    audioElRef.current.volume = v;
  };

  const handleChangeRate = (v: number) => {
    setRate(v);
    audioElRef.current.playbackRate = v;
  };

  const toggleMuted = () => {
    audioElRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className='playtray'>
      <div className='playtray-left'>
        <div className='song-cover'>
          <img src={song?.pic || EMPTY_IMG} />
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
            min={0}
            max={duration}
            step={1}
            value={current}
            onChange={handleSeek}
            style={{ flex: 1 }}
            tooltip={{
              open: false
            }}
          />
          <span className='play-total-time'>
            {duration ? dayjs.duration(duration, 'seconds').format('mm:ss') : '00:00'}
          </span>
        </div>
      </div>
      <div className='playtray-right'>
        <span className='play-volume'>
          <a className='play-volume-toggle-mute' onClick={toggleMuted}>
            {muted ?
              <MdVolumeOff size={24} /> :
              volume === 0 ?
                <MdVolumeMute size={24} /> :
                volume < 0.5 ?
                  <MdVolumeDown size={24} /> :
                  <MdVolumeUp size={24} />
            }
          </a>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleChangeVolume}
            tooltip={{
              open: false
            }}
            style={{ width: 160 }}
          />
        </span>
        <a className='play-mode'><MdRepeatOne size={24}/></a>
        <a className='play-rate'>
          {/* <Popover content={(
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
          </Popover> */}
        </a>
        <a className='play-resize'><MdExpand size={18}/></a>
      </div>
    </div>
  );
};

export default PlayTray;
