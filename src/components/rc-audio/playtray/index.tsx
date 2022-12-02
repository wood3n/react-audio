import React, { useState, useEffect, useRef } from 'react';
import { Slider, Dropdown, Tooltip, Popover, message, Drawer } from 'antd';
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdSkipPrevious,
  MdSkipNext,
  MdRepeatOne,
  MdClose,
  MdShuffle,
  MdExpand,
  MdVolumeMute,
  MdVolumeDown,
  MdVolumeUp,
  MdVolumeOff,
  MdAddCircleOutline,
  MdOutlineFavoriteBorder,
  MdOutlineMusicNote
} from 'react-icons/md';
import { BsArrowsCollapse } from 'react-icons/bs';
import dayjs from 'dayjs';
import Lyric from '../lyric';
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
  const [expanded, setExpanded] = useState(false);
  const audioElRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    if (song?.src) {
      audioElRef.current.src = song.src;
      audioElRef.current.controls = false;
      audioElRef.current.volume = volume;
      audioElRef.current.preload = 'metadata';
      audioElRef.current.crossOrigin = 'use-credentials';
      audioElRef.current.playbackRate = rate;

      audioElRef.current.onloadedmetadata = () => {
        setDuration(Math.floor(audioElRef.current.duration));
      };

      audioElRef.current.ontimeupdate = () => {
        console.log(audioElRef.current.currentTime);
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

  const handleChangeRate = (v: string) => {
    setRate(Number(v));
    if (audioElRef.current) {
      audioElRef.current.playbackRate = Number(v);
    }
  };

  const toggleMuted = () => {
    audioElRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleResize = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='playtray'>
      <div className='playtray-left'>
        <div className='song-cover'>
          {song?.pic ? <img src={song.pic} /> : (
            <div className='song-cover-fallback'>
              <MdOutlineMusicNote size={24} color='#fff'/>
            </div>
          )}
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
        <Dropdown
          menu={{
            items: [
              { key: '0.5', label: '0.5x' },
              { key: '1', label: '1x' },
              { key: '1.5', label: '1.5x' },
              { key: '2', label: '2x' },
            ],
            selectedKeys: [String(rate)],
            onClick: ({ key }) => handleChangeRate(key)
          }}
          placement='top'
        >
          <a className='play-rate'>{`${rate}x`}</a>
        </Dropdown>
        <a className='play-resize' onClick={handleResize}>
          {expanded ? <BsArrowsCollapse size={18} /> : <MdExpand size={18} />}
        </a>
      </div>
      <Drawer
        open={expanded}
        placement='bottom'
        height='100vh'
        headerStyle={{ display: 'none' }}
        bodyStyle={{
          padding: 0
        }}
        className='rc-audio-drawer'
      >
        <div className='drawer-title'>
          <a onClick={() => setExpanded(false)}><MdClose size={24}/></a>
        </div>
        <div className='drawer-content'>
          <div className='lyric'>
            <Lyric currentTime={current}/>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PlayTray;
