import React from 'react';
import {brand} from '../../brand/tokens';

type FridgeProps = {
  readonly left?: number;
  readonly top?: number;
  readonly width?: number;
  readonly open?: number;
  readonly opacity?: number;
};

export const Fridge: React.FC<FridgeProps> = ({
  left = 620,
  top = 430,
  width = 350,
  open = 0,
  opacity = 1,
}) => {
  const height = width * 1.62;
  const doorAngle = 72 * open;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        opacity,
        perspective: 1200,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 34,
          border: `7px solid ${brand.colors.ink}`,
          backgroundColor: '#D6DBD4',
          boxShadow: '0 26px 0 rgba(0,0,0,.17)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 25,
            right: 25,
            top: 30,
            bottom: 30,
            borderRadius: 24,
            background:
              'linear-gradient(180deg, #FFF7D8 0%, #F7F0D5 52%, #EAEDE0 100%)',
            opacity: Math.min(1, open * 1.8),
            boxShadow: `inset 0 0 ${28 + open * 42}px rgba(255,229,151,${0.18 + open * 0.28})`,
          }}
        >
          {[160, 335, 505].map((y) => (
            <div
              key={y}
              style={{
                position: 'absolute',
                left: 24,
                right: 24,
                top: y,
                height: 5,
                borderRadius: 5,
                backgroundColor: '#AFB7AD',
              }}
            />
          ))}

          <div
            style={{
              position: 'absolute',
              left: 48,
              top: 54,
              width: 48,
              height: 92,
              borderRadius: '17px 17px 14px 14px',
              border: `4px solid ${brand.colors.ink}`,
              backgroundColor: '#B9D4DF',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 48,
              top: 82,
              width: 62,
              height: 43,
              borderRadius: 13,
              border: `4px solid ${brand.colors.ink}`,
              backgroundColor: '#C96036',
            }}
          />

          <div style={{position: 'absolute', left: 55, top: 205, display: 'flex', gap: 11}}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 43,
                  borderRadius: '50% 50% 42% 42%',
                  border: `4px solid ${brand.colors.ink}`,
                  backgroundColor: '#F0E2B5',
                  rotate: i % 2 === 0 ? '-5deg' : '4deg',
                }}
              />
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              right: 44,
              top: 194,
              width: 43,
              height: 112,
              borderRadius: '17px 17px 10px 10px',
              border: `4px solid ${brand.colors.ink}`,
              backgroundColor: brand.colors.orange,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 10,
                right: 10,
                top: 11,
                height: 20,
                borderRadius: 5,
                backgroundColor: brand.colors.paper,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 54,
              top: 386,
              width: 98,
              height: 66,
              borderRadius: '50% 50% 15px 15px',
              border: `4px solid ${brand.colors.ink}`,
              backgroundColor: '#E7B74C',
              overflow: 'hidden',
            }}
          >
            <div style={{height: 17, backgroundColor: brand.colors.paper}} />
          </div>

          <div
            style={{
              position: 'absolute',
              right: 45,
              top: 378,
              width: 136,
              height: 95,
              borderRadius: 17,
              border: `4px solid ${brand.colors.ink}`,
              backgroundColor: '#C5B49C',
            }}
          >
            <div
              style={{
                height: 26,
                borderBottom: `4px solid ${brand.colors.ink}`,
                backgroundColor: '#8E7F6D',
                borderRadius: '13px 13px 0 0',
              }}
            />
            <div
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontWeight: 900,
                color: brand.colors.ink,
                marginTop: 17,
              }}
            >
              ???
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: '100% 50%',
          transform: `perspective(1200px) rotateY(${doorAngle}deg)`,
          borderRadius: 34,
          border: `7px solid ${brand.colors.ink}`,
          backgroundColor: '#ECEDE7',
          boxShadow: open > 0.03 ? '-18px 20px 30px rgba(0,0,0,.18)' : '0 0 0 rgba(0,0,0,0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Slight bevel so the door reads as a solid object, not a blank rectangle. */}
        <div
          style={{
            position: 'absolute',
            inset: '18px 18px 20px 18px',
            borderRadius: 22,
            border: '2px solid rgba(255,255,255,.64)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 34,
            top: 48,
            width: 138,
            height: 100,
            borderRadius: 13,
            border: `3px solid ${brand.colors.ink}`,
            backgroundColor: '#FFF8EA',
            rotate: '6deg',
            boxShadow: '3px 5px 0 rgba(32,37,31,.12)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -13,
              left: 51,
              width: 28,
              height: 28,
              borderRadius: 999,
              border: `3px solid ${brand.colors.ink}`,
              backgroundColor: brand.colors.orange,
            }}
          />
          <div style={{position:'absolute',left:21,right:21,top:33,height:5,borderRadius:9,backgroundColor:'#A3A99E'}} />
          <div style={{position:'absolute',left:21,right:44,top:52,height:5,borderRadius:9,backgroundColor:'#C1C7BA'}} />
          <div style={{position:'absolute',left:21,right:60,top:71,height:5,borderRadius:9,backgroundColor:'#C1C7BA'}} />
        </div>
        <div
          style={{
            position:'absolute',
            right:40,
            top:'66%',
            width:44,
            height:44,
            borderRadius:999,
            border:`3px solid ${brand.colors.ink}`,
            backgroundColor:brand.colors.orange,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '58%',
            height: 6,
            backgroundColor: '#B8BDB7',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 25,
            top: 118,
            width: 18,
            height: 190,
            borderRadius: 999,
            backgroundColor: brand.colors.ink,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 25,
            bottom: 124,
            width: 18,
            height: 150,
            borderRadius: 999,
            backgroundColor: brand.colors.ink,
          }}
        />
      </div>
      {/* Low-profile feet anchor the refrigerator to the shared floor plane. */}
      <div style={{position:'absolute',left:28,bottom:-13,width:72,height:18,borderRadius:8,backgroundColor:brand.colors.ink}} />
      <div style={{position:'absolute',right:28,bottom:-13,width:72,height:18,borderRadius:8,backgroundColor:brand.colors.ink}} />
    </div>
  );
};
