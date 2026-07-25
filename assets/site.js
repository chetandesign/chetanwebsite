// Chetan Hegde — Story Flow 2.0 · shared interactions
(function(){
  // smooth inertia scrolling
  var reducedSS=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reducedSS&&matchMedia('(pointer:fine)').matches){
    document.documentElement.style.scrollBehavior='auto';
    var t=scrollY,c=scrollY,raf=null,anim=false;
    var maxS=function(){return document.documentElement.scrollHeight-innerHeight};
    var step=function(){
      anim=true;
      c+=(t-c)*0.085;
      if(Math.abs(t-c)<0.5){c=t;window.scrollTo(0,c);raf=null;anim=false;return;}
      window.scrollTo(0,c);
      raf=requestAnimationFrame(step);
    };
    addEventListener('wheel',function(e){
      if(e.ctrlKey)return;
      e.preventDefault();
      var d=e.deltaMode===1?e.deltaY*40:e.deltaY;
      t=Math.max(0,Math.min(t+d,maxS()));
      if(!raf)raf=requestAnimationFrame(step);
    },{passive:false});
    addEventListener('scroll',function(){if(!anim){t=c=scrollY;}},{passive:true});
  }

  var nav=document.getElementById('nav');
  addEventListener('scroll',function(){
    if(nav)nav.classList.toggle('scrolled',document.documentElement.scrollTop>40);
  },{passive:true});

  var menuBtn=document.getElementById('menuBtn');
  var navLinks=document.getElementById('navLinks');
  if(menuBtn&&navLinks){
    menuBtn.addEventListener('click',function(){
      var open=navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded',open);
      menuBtn.textContent=open?'Close':'Menu';
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded','false');
        menuBtn.textContent='Menu';
      });
    });
  }

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting)e.target.classList.add('in');
      else if(e.intersectionRatio===0)e.target.classList.remove('in');
    });
  },{threshold:[0,0.2]});
  document.querySelectorAll('.obs').forEach(function(el){io.observe(el);});

  // scroll-linked presence for hero sections
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced){
    var scenes=[].slice.call(document.querySelectorAll('.page-hero,.cs-hero')).map(function(s){
      return {el:s,target:s};
    });
    var ease=function(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2};
    var present=function(){
      var vh=innerHeight;
      scenes.forEach(function(sc){
        var r=sc.el.getBoundingClientRect();
        if(r.bottom<-100||r.top>vh+100)return;
        var center=r.top+r.height/2;
        var dist=Math.abs(center-vh/2);
        var range=(r.height+vh)/2;
        var f=1-Math.min(dist/range,1);
        f=ease(Math.min(f*2.8,1));
        sc.el.style.opacity=f;
      });
      requestAnimationFrame(present);
    };
    requestAnimationFrame(present);
  }

  // ---------- page transitions ----------
  requestAnimationFrame(function(){document.body.classList.add('ready');});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(!a)return;
    var href=a.getAttribute('href')||'';
    if(e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
    if(href.indexOf('.html')===-1||href.indexOf('http')===0||href.indexOf('#')===0)return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(function(){location.href=href;},reducedSS?0:300);
  });
  addEventListener('pageshow',function(e){if(e.persisted)document.body.classList.remove('leaving');});

  // ---------- reading progress hairline ----------
  var prog=document.createElement('div');
  prog.className='progress';prog.innerHTML='<i></i>';
  document.body.appendChild(prog);
  var progBar=prog.querySelector('i');
  addEventListener('scroll',function(){
    var d=document.documentElement;
    progBar.style.transform='scaleX('+(d.scrollTop/(d.scrollHeight-d.clientHeight||1))+')';
  },{passive:true});

  // ---------- cursor ring with View label ----------
  if(!reducedSS&&matchMedia('(pointer:fine)').matches){
    var cur=document.createElement('div');
    cur.className='cursor';cur.innerHTML='<span></span>';
    document.body.appendChild(cur);
    var clab=cur.querySelector('span');
    var cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
    addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;cur.classList.add('on');});
    (function loop(){
      cx+=(tx-cx)*0.18;cy+=(ty-cy)*0.18;
      cur.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,input').forEach(function(el){
      el.addEventListener('mouseenter',function(){cur.classList.add('grow');});
      el.addEventListener('mouseleave',function(){cur.classList.remove('grow');});
    });
    document.querySelectorAll('.card,.next-cs a').forEach(function(el){
      el.addEventListener('mouseenter',function(){clab.textContent='View';cur.classList.add('label');});
      el.addEventListener('mouseleave',function(){cur.classList.remove('label');});
    });
  }

  // ---------- magnetic CTAs ----------
  if(!reducedSS&&matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.cta,.gate-btn').forEach(function(cta){
      cta.addEventListener('mousemove',function(e){
        var r=cta.getBoundingClientRect();
        var x=(e.clientX-r.left-r.width/2)*0.25;
        var y=(e.clientY-r.top-r.height/2)*0.35;
        cta.style.transform='translate('+x+'px,'+y+'px)';
      });
      cta.addEventListener('mouseleave',function(){cta.style.transform='';});
    });
  }

  // ---------- gentle parallax on imagery ----------
  if(!reducedSS){
    var pframes=[].slice.call(document.querySelectorAll('.frame img'));
    if(pframes.length){
      var para=function(){
        var vh=innerHeight;
        pframes.forEach(function(img){
          var r=img.getBoundingClientRect();
          if(r.bottom<0||r.top>vh)return;
          var p=(r.top+r.height/2-vh/2)/vh;
          img.style.setProperty('--par',(p*-14)+'px');
        });
        requestAnimationFrame(para);
      };
      requestAnimationFrame(para);
    }
  }
})();
