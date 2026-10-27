/* Text-only adaptation of the original pages.dev components. No design replacement. */
(function(){
 const descriptions=[
  'Plan meals using protein, fiber and food processing. Compare your glucose responses to foods and meal timing, and understand gut health.',
  'Understand sleep architecture and circadian rhythm. Test light, temperature, wake time and evening meals using your sleep log.',
  'Plan strength, cardio, stability and balance. Understand VO₂ max and compare glucose responses to post-meal movement.',
  'Evaluate supplement evidence and wearable data. Distinguish clinical trials from anecdotes and review decisions with your clinician.',
  'Understand the relationship between stress and glucose. Practise breathing and body-reset tools, then record your responses.',
  'Combine health data and daily habits into your written Blueprint. Include social connection, a tracking schedule and a 90-day plan.'
 ];
 function text(selector,value){const e=document.querySelector(selector);if(e&&e.textContent!==value)e.textContent=value}
 function html(selector,value){const e=document.querySelector(selector);if(e&&e.innerHTML!==value)e.innerHTML=value}
 function apply(){
  html('#hero h1','The Longevity <span class="pdp-cine-blue">Blueprint</span>');
  html('#hero .pdp-cine-sub','Master the six pillars of longevity through <strong>18 live classes</strong>, practical exercises and your own health data.');
  const heroCTA=document.querySelector('#hero .pdp-cine-cta');if(heroCTA){heroCTA.href='#learn-com';heroCTA.innerHTML='Explore the six pillars';}
  document.querySelectorAll('#learn-com .topic-v2-desc').forEach((p,i)=>{if(descriptions[i])p.textContent=descriptions[i]});
  html('#included h2','What the course <em>includes</em>');
  html('#cgm h2','Abbott Lingo sensor <em>and app</em>');
  html('#vip h2',"Julie's VIP <em>Longevity Masterclass</em>");
  html('#offer h2','Tuition and <em>coupon codes</em>');
  text('#offer .lp-lead','18 live classes, learning-platform access, Julie’s VIP masterclass and one Abbott Lingo sensor with U.S. shipping.');
  text('#offer .lp-big b','149');text('#offer .lp-saverow s','$179 / mo');
  text('#offer .lp-pill','Save $30 per payment');
  html('#offer .lp-total','Five payments, <b>$745 total</b>. Select your code and request enrollment assistance. No payment is taken on this page.');
  text('#offer .lp-julie-t b','Masterclass attendee code');
  html('#offer .lp-trust','<b>Full refund within 14 days of registration.</b> Questions? Call +1-888-230-5110.');
  html('#syllabus h2','The 18-class <em>syllabus</em>');
  html('#teachers h2','Course <em>faculty</em>');
  html('#mechanism h2','Course <em>timeline</em>');
  html('#whatitis h2','How the live <em>course works</em>');
  html('#faq h2','Frequently asked <em>questions</em>');
  const strip=document.getElementById('mockStrip');if(strip)strip.innerHTML='<span class="t lg">Use your masterclass coupon code: <b>JULIE249</b> or <b>MASTERCLASS-VIP</b></span><span class="t sm">Your masterclass coupon codes</span><a class="code" href="#offer" data-coupon="JULIE249">JULIE249</a><a class="code" href="#offer" data-coupon="MASTERCLASS-VIP">MASTERCLASS-VIP</a>';
  const bar=document.getElementById('mockBar');if(bar){const price=bar.querySelector('.l b');if(price)price.textContent='Masterclass attendees';const a=bar.querySelector('a');if(a){a.href='#ask';a.textContent='Request a callback'}}
  document.querySelectorAll('a[href*="checkout.html"]').forEach(a=>{a.href='#offer';a.removeAttribute('data-plan')});
  document.querySelectorAll('header a[href="#offer"]').forEach(a=>a.textContent='Course offer');
 }
 apply();document.addEventListener('DOMContentLoaded',apply);window.addEventListener('load',apply);setTimeout(apply,1000);setTimeout(apply,2500);
 document.addEventListener('click',function(e){
  const a=e.target.closest('a[href="#offer"],a[href="#ask"],a[href="#learn-com"]');
  if(a){e.preventDefault();e.stopImmediatePropagation();document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'});}
 },true);
})();
