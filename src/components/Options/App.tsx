import * as React from 'react';
import { useState } from 'react';
import Button from './Base/Button';
import Content from './Base/Content';
import ClosedCaption from './Items/ClosedCaption';
import PlayBackRate from './Items/PlayBackRate';
import WindowOverlay from './Items/WindowOverlay';
import ControlVideoVol from './Items/ControlVideoVol';
import ShowDisLike from '@/components/Options/Items/ShowDisLike';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setOptionRotate } from '@/store/Options';
import {
  onYtsPlayBackRate,
  onYtsOverlay,
  onYtsVolume,
  onYtsShowDisLike,
} from '@/store/YoutubeShorts';

const OptionApp = () => {
  const dispatch = useDispatch();
  const [cardOpen, setCardOpen] = useState(false);
  const { rotate, playBackRate, overlayState, volume, dislikeState } =
    useSelector((state: RootState) => state.options);

  React.useEffect(() => {
    dispatch(onYtsPlayBackRate(playBackRate));
    dispatch(onYtsOverlay(overlayState));
    dispatch(onYtsVolume(volume));
    dispatch(onYtsShowDisLike(dislikeState));
  }, []);

  React.useEffect(() => {
    dispatch(setOptionRotate(cardOpen ? 90 : 0));
  }, [cardOpen]);

  return (
    <div>
      <Button rotate={rotate} onClick={() => setCardOpen(!cardOpen)} />
      {cardOpen && (
        <Content
          onMouseLeave={() => {
            setCardOpen(!cardOpen);
          }}
        >
          <ClosedCaption />
          <PlayBackRate />
          <WindowOverlay />
          <ControlVideoVol />
          <ShowDisLike />
        </Content>
      )}
    </div>
  );
};

export default OptionApp;
