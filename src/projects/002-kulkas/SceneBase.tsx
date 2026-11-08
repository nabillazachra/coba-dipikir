import type React from 'react';
import {brand} from '../../brand/tokens';

type SceneBaseProps = {
  readonly children: React.ReactNode;
  readonly mode?: 'night' | 'paper';
};

// One shared canvas across the kitchen sequence. The night is communicated by
// the window and clock, not by hiding a black-outline character on a black wall.
export const SceneBase: React.FC<SceneBaseProps> = ({children, mode = 'night'}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      fontFamily: brand.fontFamily,
      backgroundColor: brand.colors.paper,
      color: brand.colors.ink,
    }}
  >
    {mode === 'night' ? (
      <>
        <div
          style={{
            position: 'absolute',
            left: 88,
            top: 89,
            color: brand.colors.orange,
            fontSize: 24,
            fontWeight: 950,
            letterSpacing: 3.5,
          }}
        >
          COBA DIPIKIR
        </div>
        <div
          style={{
            position: 'absolute',
            right: 112,
            top: 90,
            fontSize: 23,
            fontWeight: 850,
            letterSpacing: 2.2,
            color: brand.colors.muted,
          }}
        >
          002 / KEBIASAAN
        </div>
        <div
          style={{
            position: 'absolute',
            left: 88,
            right: 112,
            top: 143,
            height: 3,
            backgroundColor: brand.colors.rule,
          }}
        />

        {/* Illustrated kitchen is a single, substantial visual stage. */}
        <div
          style={{
            position: 'absolute',
            left: 58,
            top: 330,
            width: 964,
            height: 1150,
            borderRadius: 46,
            border: `5px solid ${brand.colors.ink}`,
            overflow: 'hidden',
            backgroundColor: '#EDE4D6',
            boxShadow: '0 18px 0 rgba(32,37,31,.09)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '0 0 240px',
              background: 'linear-gradient(125deg, #F0E8DC 0%, #E6DCCB 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 75,
              top: 104,
              width: 372,
              height: 286,
              borderRadius: 30,
              border: `10px solid ${brand.colors.ink}`,
              backgroundColor: '#263A35',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 0 6px rgba(246,240,229,.11)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: 62,
                top: 43,
                width: 102,
                height: 102,
                borderRadius: 999,
                backgroundColor: '#F9C57D',
                boxShadow: '0 0 55px rgba(249,197,125,.26)',
              }}
            />
            {[[72,59],[114,153],[208,66],[271,196]].map(([x,y],i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: 11,
                  height: 11,
                  borderRadius: 999,
                  backgroundColor: '#F6F0E5',
                  opacity: .65,
                }}
              />
            ))}
            <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 7, backgroundColor: '#20251F'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 7, backgroundColor: '#20251F'}} />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 95,
              top: 485,
              width: 290,
              height: 22,
              borderRadius: 12,
              backgroundColor: brand.colors.ink,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 121,
              top: 507,
              width: 232,
              height: 190,
              borderRadius: '0 0 26px 26px',
              backgroundColor: '#D4C2AD',
              border: `5px solid ${brand.colors.ink}`,
              borderTop: 0,
            }}
          >
            <div style={{position:'absolute',left:'50%',top:13,bottom:12,width:4,backgroundColor:'#20251F',opacity:.38}} />
            <div style={{position:'absolute',left:69,top:64,width:8,height:42,borderRadius:6,backgroundColor:'#20251F'}} />
            <div style={{position:'absolute',right:69,top:64,width:8,height:42,borderRadius:6,backgroundColor:'#20251F'}} />
          </div>

          <div style={{position:'absolute',right:78,top:70,width:160,height:25,borderRadius:10,backgroundColor:'rgba(32,37,31,.08)'}} />
          <div style={{position:'absolute',right:78,top:113,width:112,height:18,borderRadius:10,backgroundColor:'rgba(32,37,31,.06)'}} />

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 240,
              backgroundColor: '#D5C5B2',
              borderTop: `5px solid ${brand.colors.ink}`,
            }}
          >
            <div style={{position:'absolute',left:0,right:0,top:83,height:3,backgroundColor:'rgba(32,37,31,.12)'}} />
            <div style={{position:'absolute',left:290,top:0,bottom:0,width:3,backgroundColor:'rgba(32,37,31,.09)'}} />
            <div style={{position:'absolute',left:680,top:0,bottom:0,width:3,backgroundColor:'rgba(32,37,31,.09)'}} />
          </div>
        </div>
      </>
    ) : (
      <>
        <div
          style={{
            position: 'absolute',
            left: 88,
            top: 91,
            fontSize: 23,
            fontWeight: 950,
            letterSpacing: 3,
            color: brand.colors.orange,
          }}
        >
          COBA DIPIKIR / 002
        </div>
        <div
          style={{
            position: 'absolute',
            left: 88,
            right: 112,
            top: 147,
            height: 3,
            backgroundColor: brand.colors.rule,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: .12,
            backgroundImage: 'linear-gradient(rgba(32,37,31,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(32,37,31,.03) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
            pointerEvents: 'none',
          }}
        />
      </>
    )}
    {children}
  </div>
);
