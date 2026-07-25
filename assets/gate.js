// Case study access gate — works in any context (pure-JS SHA-256, no WebCrypto needed)
(function(){
  var HASH='460cedcdf2a84ca48e44b4466c4eddbd549663b253b5ae5d7e2f46b6727f740b';
  var KEY='cs-unlocked';

  // compact SHA-256 (UTF-8 input, hex output)
  function sha256(str){
    var utf8=unescape(encodeURIComponent(str));
    var K=[],H=[],primes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311];
    for(var i=0;i<64;i++){K[i]=frac(Math.pow(primes[i],1/3));}
    for(i=0;i<8;i++){H[i]=frac(Math.pow(primes[i],1/2));}
    function frac(x){return ((x-Math.floor(x))*4294967296)|0;}
    function rotr(x,n){return (x>>>n)|(x<<(32-n));}
    var l=utf8.length,words=[],bitLen=l*8;
    for(i=0;i<l;i++){words[i>>2]=(words[i>>2]||0)|(utf8.charCodeAt(i)<<((3-(i%4))*8));}
    words[l>>2]=(words[l>>2]||0)|(0x80<<((3-(l%4))*8));
    var n=(((l+8)>>6)+1)*16;
    words[n-1]=bitLen;
    for(i=0;i<n;i+=16){
      var w=[];
      for(var j=0;j<16;j++){w[j]=words[i+j]|0;}
      var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
      for(var t=0;t<64;t++){
        if(t>=16){
          var s0=rotr(w[t-15],7)^rotr(w[t-15],18)^(w[t-15]>>>3);
          var s1=rotr(w[t-2],17)^rotr(w[t-2],19)^(w[t-2]>>>10);
          w[t]=(w[t-16]+s0+w[t-7]+s1)|0;
        }
        var S1=rotr(e,6)^rotr(e,11)^rotr(e,25);
        var ch=(e&f)^(~e&g);
        var t1=(h+S1+ch+K[t]+w[t])|0;
        var S0=rotr(a,2)^rotr(a,13)^rotr(a,22);
        var maj=(a&b)^(a&c)^(b&c);
        var t2=(S0+maj)|0;
        h=g;g=f;f=e;e=(d+t1)|0;d=c;c=b;b=a;a=(t1+t2)|0;
      }
      H[0]=(H[0]+a)|0;H[1]=(H[1]+b)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;
      H[4]=(H[4]+e)|0;H[5]=(H[5]+f)|0;H[6]=(H[6]+g)|0;H[7]=(H[7]+h)|0;
    }
    var out='';
    for(i=0;i<8;i++){out+=('00000000'+((H[i]>>>0).toString(16))).slice(-8);}
    return out;
  }

  function unlocked(){
    try{return sessionStorage.getItem(KEY)==='1';}catch(e){return false;}
  }
  if(unlocked()){
    document.documentElement.classList.remove('locked');
    return;
  }

  document.addEventListener('DOMContentLoaded',function(){
    var gate=document.createElement('div');
    gate.className='gate';
    gate.innerHTML=
      '<div class="gate-box">'+
        '<p class="gate-eyebrow">Protected case study</p>'+
        '<h1 class="gate-title">This story is under wraps.</h1>'+
        '<p class="gate-sub">Enter the access password to continue.</p>'+
        '<form class="gate-form">'+
          '<input class="gate-input" type="password" placeholder="Password" autocomplete="off" aria-label="Case study password">'+
          '<button class="gate-btn" type="submit">Unlock</button>'+
        '</form>'+
        '<p class="gate-err" role="alert" aria-live="polite"></p>'+
        '<a class="gate-back" href="../index.html">← Back to home</a>'+
      '</div>';
    document.body.appendChild(gate);

    var form=gate.querySelector('.gate-form');
    var input=gate.querySelector('.gate-input');
    var err=gate.querySelector('.gate-err');
    setTimeout(function(){try{input.focus();}catch(e){}},50);

    form.addEventListener('submit',function(e){
      e.preventDefault();
      var val=input.value;
      if(!val)return;
      if(sha256(val)===HASH){
        try{sessionStorage.setItem(KEY,'1');}catch(_){}
        document.documentElement.classList.remove('locked');
        gate.classList.add('gate-open');
        setTimeout(function(){if(gate.parentNode)gate.parentNode.removeChild(gate);},700);
      }else{
        err.textContent='That password isn\u2019t right. Try again.';
        gate.classList.remove('gate-shake');
        void gate.offsetWidth;
        gate.classList.add('gate-shake');
        input.select();
      }
    });
  });
})();
