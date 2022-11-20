import { useEffect, useState, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { Drawer } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import PlayTray from './playtray';
import { presets } from '@/constants';
import './index.less';

const RCAudio = () => {
  const [list, setList] = useState(presets);
  const [openList, setOpenList] = useState(false);
  const howlerRef = useRef<Howl>();

  useEffect(() => {
    howlerRef.current = new Howl({
      src: list.map(({ src }) => src),
      html5: true,
      preload: 'metadata',
      xhr: {
        withCredentials: true
      }
    });
  }, []);

  return (
    <div className='rc-audio-container'>
      <div className='rc-audio-playlist'>
        <Swiper
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
        </Swiper>
      </div>
      <div className='rc-audio-playtray'>
        <PlayTray
          onPlay={() => howlerRef.current?.play?.()}
          onPause={() => howlerRef.current?.pause?.()}
          openPlayList={() => setOpenList(true)}
        />
      </div>
    </div>
  );
};

export default RCAudio;
