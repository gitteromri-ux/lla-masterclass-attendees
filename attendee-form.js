
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('video[aria-hidden="true"]').forEach(function(v){v.removeAttribute('autoplay');v.pause()})}
  /* Lead-generation flow: selected code accompanies the callback request.
     Do not send attendees into the existing checkout until a valid future CRM cohort is confirmed. */
  var CODES={'JULIE249':1,'MASTERCLASS-VIP':1};
  var inp=document.getElementById('codeInput'),btn=document.getElementById('codeApply'),msg=document.getElementById('codeMsg');
  function say(t,e){msg.textContent=t;msg.className='codemsg'+(e?' err':'')}
  function go(){var code=(inp.value||'').trim().toUpperCase().replace(/\s+/g,'');
    if(!code){say('Type the code from the chat, or the one in your VIP email.',1);inp.focus();document.getElementById('offer').scrollIntoView({behavior:'smooth',block:'center'});return}
    if(!CODES[code]){say('That code is not valid. Use the code Courtney shared in the Zoom chat, or the one in your VIP email.',1);inp.classList.remove('ok');document.getElementById('offer').scrollIntoView({behavior:'smooth',block:'center'});return}
    if(Date.now()>Date.parse('2026-10-28T23:59:59-04:00')){say('The attendee offer window has ended. Please ask our team about the current course offer.',1);return}
    inp.classList.add('ok');say('Code '+code+' selected for your callback request.');
    try{sessionStorage.setItem('lla_promo_code',code)}catch(e){}
    var question=document.querySelector('#askForm [name="question"]');
    if(question&&!question.value.trim())question.value='I would like to enroll in the Longevity Blueprint with code '+code+'. Please call me about available start dates and the next steps.';
    document.getElementById('ask').scrollIntoView({behavior:'smooth',block:'start'});
    document.querySelector('#askForm [name="firstName"]').focus({preventScroll:true});
    var status=document.getElementById('askMsg');status.className='formmsg';status.textContent='Code '+code+' selected. Add your details below and our enrollment team will help you register.';
  }
  btn.addEventListener('click',go);inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();go()}});
  var more=document.querySelectorAll('.js-apply');for(var k=0;k<more.length;k++)more[k].addEventListener('click',go);
  document.querySelectorAll('[data-coupon]').forEach(function(el){el.addEventListener('click',function(){var code=el.getAttribute('data-coupon');inp.value=code;inp.classList.add('ok');say('Code '+code+' selected. Apply it when you are ready.');if(el.tagName==='BUTTON')inp.focus()})});
  try{var q=new URLSearchParams(location.search).get('code');if(q&&CODES[q.trim().toUpperCase()]){inp.value=q.trim().toUpperCase();inp.classList.add('ok');say('Code '+inp.value+' selected. Press Apply code to include it in your callback request.')}}catch(e){}

  /* Question form: proven website lead path (CRM AddNewLead through the proxy). ?env=staging for tests. */
  var f=document.getElementById('askForm');
  if(f){var env=(new URLSearchParams(location.search).get('env')||'production').toLowerCase();if(env!=='staging')env='production';
    var W='https://eteacher-leads-proxy.gitter-omri.workers.dev';
    f.addEventListener('submit',function(e){e.preventDefault();var fd=new FormData(f),out=document.getElementById('askMsg'),b=document.getElementById('askBtn');
      function s(t,er){out.textContent=t;out.className='formmsg'+(er?' err':'')}
      if(fd.get('website')){s('Sent.');return}
      var fn=(fd.get('firstName')||'').trim(),ln=(fd.get('lastName')||'').trim(),em=(fd.get('email')||'').trim(),ph=(fd.get('phone')||'').trim(),qq=(fd.get('question')||'').trim();
      if(!fn||!ln||!em||!ph||!qq)return s('Please fill in every field so we can call you back.',1);
      if(!fd.get('contactConsent'))return s('Please confirm that our enrollment team may contact you.',1);
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return s('Please check your email address.',1);
      var d=ph.replace(/\D/g,''),e164=d.length===10?'+1'+d:(d.length===11&&d[0]==='1'?'+'+d:null);
      if(!e164)return s('Please enter a US mobile number, or message us on WhatsApp with your question.',1);
      var payload={ProductID:26,FirstName:fn,LastName:ln,Email:em,MobilePhone:e164,CountryIsoCode:'US',CountryIsoCodeByIp:'US',LandingPage:location.href.split('#')[0],UserAgent:navigator.userAgent,ReferringSite:document.referrer||'',QueryString:((location.search||'').replace(/^\?/,'')+(location.search?'&':'')+'cid=116641&src=masterclass-attendees'),AdminNotes:('MASTERCLASS ATTENDEE QUESTION (Julie Gibson Clark masterclass). Please call back and answer: '+qq).slice(0,4000)};
      var selectedCode=(inp.value||'').trim().toUpperCase().replace(/\s+/g,'');
      payload.AdminNotes+= '\nCallback preference: '+fd.get('callbackTime')+'; time zone: '+fd.get('timeZone')+'. Contact consent: yes. Coupon: '+(CODES[selectedCode]?selectedCode:'not selected')+'.';
      b.disabled=true;b.textContent='Sending';s('');
      fetch(W+'/leads/'+env,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).then(async function(r){
        var raw=await r.text(),data;try{data=JSON.parse(raw)}catch(e){data=null}
        if(!r.ok||(data&&(data.success===false||data.Success===false||data.error||data.Error||data.IsSuccess===false||data.Result===false)))throw new Error('Lead not confirmed');
        s('Thank you. Your question and callback request have been sent to our enrollment team.');f.reset();b.textContent='Request Sent';
      }).catch(function(){b.disabled=false;b.textContent='Send question and request callback';s('We could not confirm your request. Your details are still here. Please try again, or contact our team on WhatsApp.',1)})})}

  /* Reveal: observer for motion, hard fallback so nothing can stay hidden */
  var els=document.querySelectorAll('.rv');setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},900);
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
})();
