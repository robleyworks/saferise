  (function(){
    var dd=document.querySelector('.ndrop'), dt=document.getElementById('ptrig');
    if(!dd||!dt) return;
    var hoverOpened=false;
    function setOpen(v){
      dd.classList.toggle('open', v);
      dt.setAttribute('aria-expanded', v ? 'true' : 'false');
    }
    function close(){ hoverOpened=false; setOpen(false); }
    dd.addEventListener('mouseenter',function(){ hoverOpened=true; setOpen(true); });
    dd.addEventListener('mouseleave', close);
    dd.addEventListener('focusin', function(){ setOpen(true); });
    dd.addEventListener('focusout', function(e){ if(!dd.contains(e.relatedTarget)) close(); });
    dt.addEventListener('click', function(e){
      e.stopPropagation();
      if (hoverOpened) { hoverOpened=false; return; }
      setOpen(!dd.classList.contains('open'));
    });
    document.addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ close(); dt.focus(); } });
  })();