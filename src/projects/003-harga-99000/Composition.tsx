import React from 'react';
import {Series, useVideoConfig} from 'remotion';
import {EpisodeAudio} from './EpisodeAudio';
import {EpisodeCaptions} from './EpisodeCaptions';
import {scenePlan} from './timeline';
import {
  CompareScene, ChoiceScene, DifferenceScene, DistanceScene,
  LeftDigitScene, BrainScene,
} from './ScenesPartOne';
import {
  EffectScene, OtherPricesScene, CalculatorScene, ImpressionScene,
  EndingScene, BrandEndScene,
} from './ScenesPartTwo';

const frames=(duration:number,fps:number)=>Math.round(duration*fps);

export const Harga99000Episode:React.FC=()=>{
  const {fps}=useVideoConfig();
  return <>
    <Series>
      <Series.Sequence name="01 Dua Produk" durationInFrames={frames(scenePlan[0].end,fps)-frames(scenePlan[0].start,fps)} premountFor={fps}>
        <CompareScene/>
      </Series.Sequence>
      <Series.Sequence name="02 Pilihan Spontan" durationInFrames={frames(scenePlan[1].end,fps)-frames(scenePlan[1].start,fps)} premountFor={fps}>
        <ChoiceScene/>
      </Series.Sequence>
      <Series.Sequence name="03 Selisih Rp1.000" durationInFrames={frames(scenePlan[2].end,fps)-frames(scenePlan[2].start,fps)} premountFor={fps}>
        <DifferenceScene/>
      </Series.Sequence>
      <Series.Sequence name="04 Kok Jauh" durationInFrames={frames(scenePlan[3].end,fps)-frames(scenePlan[3].start,fps)} premountFor={fps}>
        <DistanceScene/>
      </Series.Sequence>
      <Series.Sequence name="05 Digit Paling Kiri" durationInFrames={frames(scenePlan[4].end,fps)-frames(scenePlan[4].start,fps)} premountFor={fps}>
        <LeftDigitScene/>
      </Series.Sequence>
      <Series.Sequence name="06 Otak Mengelompokkan" durationInFrames={frames(scenePlan[5].end,fps)-frames(scenePlan[5].start,fps)} premountFor={fps}>
        <BrainScene/>
      </Series.Sequence>
      <Series.Sequence name="07 Left-Digit Effect" durationInFrames={frames(scenePlan[6].end,fps)-frames(scenePlan[6].start,fps)} premountFor={fps}>
        <EffectScene/>
      </Series.Sequence>
      <Series.Sequence name="08 Harga Sebelum Bulat" durationInFrames={frames(scenePlan[7].end,fps)-frames(scenePlan[7].start,fps)} premountFor={fps}>
        <OtherPricesScene/>
      </Series.Sequence>
      <Series.Sequence name="09 Kalkulator" durationInFrames={frames(scenePlan[8].end,fps)-frames(scenePlan[8].start,fps)} premountFor={fps}>
        <CalculatorScene/>
      </Series.Sequence>
      <Series.Sequence name="10 Kesan Pertama" durationInFrames={frames(scenePlan[9].end,fps)-frames(scenePlan[9].start,fps)} premountFor={fps}>
        <ImpressionScene/>
      </Series.Sequence>
      <Series.Sequence name="11 Ending Jahil" durationInFrames={frames(scenePlan[10].end,fps)-frames(scenePlan[10].start,fps)} premountFor={fps}>
        <EndingScene/>
      </Series.Sequence>
      <Series.Sequence name="12 Final Card" durationInFrames={frames(scenePlan[11].end,fps)-frames(scenePlan[11].start,fps)} premountFor={fps}>
        <BrandEndScene/>
      </Series.Sequence>
    </Series>
    <EpisodeCaptions/>
    <EpisodeAudio/>
  </>;
};
