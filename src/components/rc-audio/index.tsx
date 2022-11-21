import { useEffect, useState, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { Drawer, List, Image } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import PlayTray from './playtray';
import { presets } from '@/constants';
import { Song } from './types';
import './index.less';

const RCAudio = () => {
  const [list, setList] = useState(presets);
  const [song, setSong] = useState<Song>();
  const [openList, setOpenList] = useState(false);

  const handlePlay = (id?: number) => {
    setSong(id ? list.find(item => item.id === id) : list[0]);
  };

  const handlePrev = () => {
    const currentIndex = list.findIndex(s => s === song);
    setSong(list[Math.max(0, currentIndex - 1)]);
  };

  const handleNext = () => {
    const currentIndex = list.findIndex(s => s === song);
    setSong(list[Math.min(list.length, currentIndex + 1)]);
  };

  return (
    <div className='rc-audio-container'>
      <div className='rc-audio-playlist'>
        <List
          itemLayout='horizontal'
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[<a key='play' onClick={() => handlePlay(item.id)}>播放</a>]}
            >
              <List.Item.Meta
                avatar={<Image preview={false} width={40} height={40} src={item.pic} />}
                title={item.name}
                description={item.arts}
              />
            </List.Item>
          )}
        />
        {/* <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={false}
          modules={[EffectCoverflow]}
        >
          {list.map(({ pic, src, arts }, index) => (
            <SwiperSlide key={index}>
              <div className='play-card'>
                <div className='cover'><img src={pic} /></div>
                <div className='card-meta'>
                  <span className='arts'>{arts.map(name => name)}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
      <div className='rc-audio-playtray'>
        <PlayTray
          song={song}
          onPlay={handlePlay}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default RCAudio;
