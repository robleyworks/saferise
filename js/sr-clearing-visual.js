/* SafeRise — meditation player visual
   Breath-paced sediment, water light, sky arc from night violet to pre-dawn blue.
   SRClearing.mount(stageEl, audioEl, { warm:[[r,g,b],...], cool:[[r,g,b],...] })
   No dependencies. One rAF loop; pauses when the tab is hidden. */
(function(root){

function build(stage, audio, opts){
  const gc=stage.querySelector('.sr-glow'), g=gc.getContext('2d');
  const fc=stage.querySelector('.sr-field'), x=fc.getContext('2d');
  let W,H,DPR,horizon,motes=[],blooms=[];
  const PERIOD=10000, IN=4000, t0=performance.now();
  const WARM=(opts&&opts.warm)||[[240,200,120],[206,146,142],[226,186,96]];
  const COOL=(opts&&opts.cool)||[[96,196,208],[124,178,196],[162,146,220],[110,162,190]];

  function size(){
    DPR=Math.min(devicePixelRatio||1,2);
    W=fc.clientWidth; H=fc.clientHeight; horizon=H*0.68;
    [gc,fc].forEach(c=>{c.width=W*DPR;c.height=H*DPR});
    x.setTransform(DPR,0,0,DPR,0,0); g.setTransform(DPR,0,0,DPR,0,0);
  }
  function seed(){
    const N=Math.min(360,Math.round(W*H/2500));
    motes=[];
    for(let i=0;i<N;i++){
      const d=Math.random();
      motes.push({x:Math.random()*W,y:Math.random()*horizon,
        r:(0.3+Math.random()*1.0)*(0.5+d*1.3),
        v:(0.014+Math.random()*0.060)*(0.35+d),
        drift:(Math.random()-0.5)*0.045,
        a:(0.09+Math.random()*0.26)*(0.40+d*1.0),
        col:COOL[(Math.random()*COOL.length)|0],
        phase:Math.random()*6.283, depth:d, held:i===0});
    }
    blooms=[];
    for(let i=0;i<4;i++)
      blooms.push({x:Math.random(),y:.20+Math.random()*.40,
        r:.36+Math.random()*.30,col:(i%2?COOL:WARM)[i%3],
        sx:(Math.random()-.5)*2e-5,phase:Math.random()*6.283,
        amp:.062+Math.random()*.040});
  }
  const DUR=480000;
  const au0=audio;
  function prog(){
    if(au0&&au0.duration&&!isNaN(au0.duration)&&au0.currentTime>0)
      return Math.min(1,au0.currentTime/au0.duration);
    return Math.min(1,((performance.now()-t0)%DUR)/DUR);
  }
  const breath=ms=>{const p=ms%PERIOD;
    return p<IN? .5-.5*Math.cos(Math.PI*(p/IN)) : .5+.5*Math.cos(Math.PI*((p-IN)/(PERIOD-IN)));};

  function frame(now){
    const ms=now-t0, b=breath(ms);
    g.clearRect(0,0,W,H); g.globalCompositeOperation='lighter';
    for(const bl of blooms){
      bl.x+=bl.sx*16; if(bl.x<-.3)bl.x=1.3; if(bl.x>1.3)bl.x=-.3;
      const p=bl.amp*(.55+b*.45)*(.82+.18*Math.sin(ms/PERIOD*6.283+bl.phase));
      const R=bl.r*Math.min(W,H)*(.95+b*.1);
      const gr=g.createRadialGradient(bl.x*W,bl.y*H,0,bl.x*W,bl.y*H,R);
      gr.addColorStop(0,'rgba('+bl.col.join(',')+','+p.toFixed(4)+')');
      gr.addColorStop(1,'rgba('+bl.col.join(',')+',0)');
      g.fillStyle=gr; g.beginPath(); g.arc(bl.x*W,bl.y*H,R,0,6.283); g.fill();
    }
    g.globalCompositeOperation='source-over';

    x.clearRect(0,0,W,H);
    const gy=horizon+b*5;

    // ---- sky: night violet -> 5am pre-dawn blue, across the piece ----
    const L=(a,c,k)=>[a[0]+(c[0]-a[0])*k, a[1]+(c[1]-a[1])*k, a[2]+(c[2]-a[2])*k].map(Math.round);
    const k=prog(), ek=k*k*(3-2*k);              // eased
    const hiA=[ 78, 58,132], hiB=[ 96,150,206];  // zenith
    const mdA=[124, 86,186], mdB=[110,178,220];  // mid sky
    const loA=[168,124,214], loB=[168,214,232];  // just above the horizon
    const hi=L(hiA,hiB,ek), md=L(mdA,mdB,ek), lo=L(loA,loB,ek);
    const up=x.createLinearGradient(0,0,0,gy);
    up.addColorStop(0,  'rgba('+hi.join(',')+','+(.030+b*.016).toFixed(4)+')');
    up.addColorStop(.52,'rgba('+md.join(',')+','+(.062+b*.030).toFixed(4)+')');
    up.addColorStop(1,  'rgba('+lo.join(',')+','+(.115+b*.048).toFixed(4)+')');
    x.fillStyle=up; x.fillRect(0,0,W,gy);

    x.globalCompositeOperation='lighter';
    for(let i=0;i<5;i++){
      const yy=gy-(i+1)*(gy/6)+Math.sin(ms/9000+i*1.7)*11;
      const amp=(.024+b*.017)*(1-i*.15);
      const cg=x.createLinearGradient(0,yy-28,0,yy+28);
      cg.addColorStop(0,'rgba('+lo.join(',')+',0)');
      cg.addColorStop(.5,'rgba('+lo.join(',')+','+amp.toFixed(4)+')');
      cg.addColorStop(1,'rgba('+lo.join(',')+',0)');
      x.fillStyle=cg; x.fillRect(0,yy-28,W,56);
    }
    x.globalCompositeOperation='source-over';

    const dn=x.createLinearGradient(0,gy,0,H);
    dn.addColorStop(0,'rgba(240,200,120,'+(.150+b*.054).toFixed(4)+')');
    dn.addColorStop(.42,'rgba(206,146,142,'+(.076+b*.028).toFixed(4)+')');
    dn.addColorStop(1,'rgba(146,104,168,'+(.024+b*.011).toFixed(4)+')');
    x.fillStyle=dn; x.fillRect(0,gy,W,H-gy);

    const lg=x.createLinearGradient(0,0,W,0);
    lg.addColorStop(0,'rgba(248,214,140,0)');
    lg.addColorStop(.5,'rgba(248,214,140,'+(.29+b*.13).toFixed(3)+')');
    lg.addColorStop(1,'rgba(248,214,140,0)');
    x.strokeStyle=lg; x.lineWidth=1;
    x.beginPath(); x.moveTo(0,gy); x.lineTo(W,gy); x.stroke();


    // ---- central presence: ebbs with the breath ----
    (function(){
      const cx=W*0.5, cy=gy-(H*0.30);
      const base=Math.min(W,H)*0.20;
      const R=base*(0.80+b*0.42);              // expands on the in-breath
      const core=(0.050+b*0.075);
      x.globalCompositeOperation='lighter';
      // outer halo
      const h=x.createRadialGradient(cx,cy,0,cx,cy,R*2.5);
      h.addColorStop(0,   'rgba(236,206,150,'+(core*0.50).toFixed(4)+')');
      h.addColorStop(0.35,'rgba(178,158,214,'+(core*0.30).toFixed(4)+')');
      h.addColorStop(1,   'rgba(120,180,204,0)');
      x.fillStyle=h; x.beginPath(); x.arc(cx,cy,R*2.5,0,6.283); x.fill();
      // body
      const o=x.createRadialGradient(cx,cy,0,cx,cy,R);
      o.addColorStop(0,   'rgba(252,236,198,'+(core*1.25).toFixed(4)+')');
      o.addColorStop(0.30,'rgba(240,206,146,'+(core*0.80).toFixed(4)+')');
      o.addColorStop(0.62,'rgba(186,158,210,'+(core*0.38).toFixed(4)+')');
      o.addColorStop(1,   'rgba(140,196,212,0)');
      x.fillStyle=o; x.beginPath(); x.arc(cx,cy,R,0,6.283); x.fill();
      // faint reflection on the settled ground
      const rf=x.createRadialGradient(cx,gy+base*0.30,0,cx,gy+base*0.30,R*1.15);
      rf.addColorStop(0,'rgba(240,206,146,'+(core*0.26).toFixed(4)+')');
      rf.addColorStop(1,'rgba(240,206,146,0)');
      x.save(); x.beginPath(); x.rect(0,gy,W,H-gy); x.clip();
      x.fillStyle=rf; x.beginPath(); x.arc(cx,gy+base*0.30,R*1.15,0,6.283); x.fill();
      x.restore();
      x.globalCompositeOperation='source-over';
    })();

    x.globalCompositeOperation='lighter';
    for(const m of motes){
      if(m.held){
        m.y=horizon*.27+Math.sin(ms/PERIOD*6.283+m.phase)*8;
        m.x+=m.drift*.2; if(Math.abs(m.x-W*0.5)<W*0.16) m.x+=W*0.0006; if(m.x<0)m.x=W; if(m.x>W)m.x=0;
        const gr=x.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r*10);
        gr.addColorStop(0,'rgba(250,222,150,'+(.44+b*.19).toFixed(3)+')');
        gr.addColorStop(1,'rgba(250,222,150,0)');
        x.fillStyle=gr; x.beginPath(); x.arc(m.x,m.y,m.r*10,0,6.283); x.fill();
        continue;
      }
      m.y+=m.v*(.40+b*.60);
      m.x+=m.drift+Math.sin(ms/8000+m.phase)*.05;
      if(m.y>gy-1){m.y=-5-Math.random()*42;m.x=Math.random()*W;}
      if(m.x<0)m.x=W; if(m.x>W)m.x=0;
      const fade=1-Math.min(1,Math.max(0,(m.y-(gy-90))/90));
      const al=(m.a*fade*(.65+b*.35)).toFixed(3);
      if(m.depth>.74){
        const gr=x.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r*5);
        gr.addColorStop(0,'rgba('+m.col.join(',')+','+al+')');
        gr.addColorStop(1,'rgba('+m.col.join(',')+',0)');
        x.fillStyle=gr; x.beginPath(); x.arc(m.x,m.y,m.r*5,0,6.283); x.fill();
      }else{
        x.fillStyle='rgba('+m.col.join(',')+','+al+')';
        x.beginPath(); x.arc(m.x,m.y,m.r,0,6.283); x.fill();
      }
    }
    x.globalCompositeOperation='source-over';
    requestAnimationFrame(frame);
  }
  addEventListener('resize',()=>{size();seed()});
  size(); seed(); requestAnimationFrame(frame);
}
  root.SRClearing={ mount:build };
})(window);
