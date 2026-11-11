import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import {GratisOngkirEpisode} from './projects/001-gratis-ongkir/Composition';
import {GratisOngkirCover} from './projects/001-gratis-ongkir/Cover';
import {HookScene} from './projects/001-gratis-ongkir/scenes/HookScene';
import {InitialCheckoutScene} from './projects/001-gratis-ongkir/scenes/InitialCheckoutScene';
import {PromoTemptationScene} from './projects/001-gratis-ongkir/scenes/PromoTemptationScene';
import {DecisionScene} from './projects/001-gratis-ongkir/scenes/DecisionScene';
import {RevealScene} from './projects/001-gratis-ongkir/scenes/RevealScene';
import {ClosingScene} from './projects/001-gratis-ongkir/scenes/ClosingScene';
import {KulkasEpisode} from './projects/002-kulkas/Composition';
import {Harga99000Episode} from './projects/003-harga-99000/Composition';
import {LiftCloseEpisode} from './projects/004-lift-close/Composition';
import {ReturnTripEpisode} from './projects/005-perjalanan-pulang/Composition';
import {LaguActingProof} from './projects/006-lagu-masa-lalu/ActingProof';

export const RemotionRoot: React.FC = () => (
  <Folder name="Coba-Dipikir">
    <Folder name="Episode-001-Gratis-Ongkir">
      <Composition
        id="E001-Gratis-Ongkir"
        component={GratisOngkirEpisode}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />
      <Still id="E001-Cover" component={GratisOngkirCover} width={1080} height={1920} />
      <Folder name="Scenes">
        <Composition id="E001-S01-Hook" component={HookScene} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="E001-S02-Belanja-Awal" component={InitialCheckoutScene} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="E001-S03-Godaan-Promo" component={PromoTemptationScene} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="E001-S04-Keputusan" component={DecisionScene} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="E001-S05-Reveal" component={RevealScene} durationInFrames={240} fps={30} width={1080} height={1920} />
        <Composition id="E001-S06-Penutup" component={ClosingScene} durationInFrames={270} fps={30} width={1080} height={1920} />
      </Folder>
    </Folder>

    <Folder name="Episode-002-Kenapa-Buka-Kulkas">
      <Composition
        id="E002-Kenapa-Buka-Kulkas"
        component={KulkasEpisode}
        durationInFrames={1590}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>
    <Folder name="Episode-003-Harga-99000">
      <Composition
        id="E003-Harga-99000"
        component={Harga99000Episode}
        durationInFrames={1860}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>
    <Folder name="Episode-004-Close-Lift">
      <Composition
        id="E004-Close-Lift"
        component={LiftCloseEpisode}
        durationInFrames={2439}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>
    <Folder name="Episode-005-Perjalanan-Pulang">
      <Composition
        id="E005-Return-Trip"
        component={ReturnTripEpisode}
        durationInFrames={1950}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>
    <Folder name="Episode-006-Lagu-Masa-Lalu">
      <Composition
        id="E006-Lagu-Acting-Proof"
        component={LaguActingProof}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{showSafeOverlay: false}}
      />
      <Composition
        id="E006-Lagu-Acting-Proof-QA"
        component={LaguActingProof}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{showSafeOverlay: true}}
      />
    </Folder>
  </Folder>
);
