import React, { useMemo } from 'react';
import classNames from 'classnames';
import './index.less';

interface Props {
  lyric?: string;
  /**
   * 当前播放进度（秒）
   */
  currentTime: number;
}

const lyep = '[00:00.000] 作词 : 赵雷\n[00:01.000] 作曲 : 赵雷\n[00:02.09]编曲：赵雷 / 柳森\n[00:05.42]制作人：赵雷 / 喜子 / 姜北生\n[00:08.35]BASS：张岭\n[00:10.18]钢琴：柳森\n[00:11.34]箱琴：赵雷\n[00:13.16]鼓：关菲\n[00:14.70]MIDI：柳森\n[00:16.31]和声：孙嫣然\n[00:34.00]香烟请再为我点一颗\n[00:39.39]火车上的情侣也不多\n[00:45.30]你推荐的歌我都听过\n[00:50.87]听过后和你一样寂寞\n[00:56.71]忘不了红色背心的你\n[01:02.28]抹不去我多情的思绪\n[01:08.08]我无法拉近你我的距离\n[01:13.81]这距离就像飞鸟和鱼\n[01:19.77]时间请你快一点的过\n[01:25.11]别让我一个人守日落\n[01:30.92]我想过平常人的生活\n[01:36.58]欲望请放过脆弱的我\n[02:05.30]想念你的我却没话说\n[02:10.89]想着想着就要到站了\n[02:16.61]我的耳旁还在回荡着\n[02:22.26]那一首八十年代的歌\n[02:28.07]我知道我的故事太多\n[02:33.74]我知道我只停留片刻\n[02:39.46]别在拥挤的人群找寻我\n[02:45.12]感谢你成为我的过客\n[02:51.16]忘不了暮色中回眸的你\n[02:56.63]躲不掉命运下过的雨\n[03:02.33]我无法追寻你的足迹\n[03:07.98]就让我在孤独中远去\n[03:17.01]有没有你还是那个我\n[03:22.36]有没有你还一样的过\n[03:28.15]你一定要像晨曦一样活\n[03:33.89]不必在意我的哀与乐\n[03:39.92]\n';

const timeExp = /\[(\d{2,}):(\d{2})[.0-9]*]/g;

interface LyArr {
  time: number;
  text: string;
}

const Lyric: React.FC<Props> = ({
  lyric = lyep,
  currentTime
}) => {
  const lyricArr = useMemo(() => lyric.split('\n').reduce<LyArr[]>((ret, ly) => {
    const text = ly.replace(timeExp, '');

    if (text.trim()) {
      const time = timeExp.exec(ly)?.slice(1)?.reverse()?.reduce((acc, t, index) => {
        return acc + Number(t) * Math.pow(60, index);
      }, 0) ?? 0;

      ret.push({
        time,
        text
      });
    }

    return ret;
  }, []), [lyric]);

  return (
    <div className='lyric-list'>
      {lyricArr?.map(({ time, text }, index) => (
        <div
          key={String(index)}
          className={classNames('lyric-list-item', {
            'lyric-list-item-active': currentTime >= time
          })}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default Lyric;
