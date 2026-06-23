const lenis=new Lenis({duration:0.9,lerp:0.12,wheelMultiplier:1.15,easing:t=>1-Math.pow(1-t,3)});
function raf(t){lenis.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);
const burger=document.querySelector('.burger'),mob=document.querySelector('.mobmenu');
if(burger)burger.addEventListener('click',()=>mob.classList.toggle('open'));
if(mob)mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mob.classList.remove('open')));
const dot=document.querySelector('.cursor'),ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px';}});
function rl(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px';}requestAnimationFrame(rl);}rl();
document.querySelectorAll('a,button,.vcard,.cell,.hcard,.mitem').forEach(el=>{el.addEventListener('mouseenter',()=>ring&&ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring&&ring.classList.remove('hover'));});
document.querySelectorAll('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform=`translate(${x*.25}px,${y*.35}px)`;});b.addEventListener('mouseleave',()=>b.style.transform='');});
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.reveal').forEach((el,i)=>{gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',delay:(i%3)*0.07,scrollTrigger:{trigger:el,start:'top 88%'}});});
gsap.utils.toArray('.over .pic').forEach(p=>{ScrollTrigger.create({trigger:p,start:'top 80%',once:true,onEnter:()=>p.classList.add('in')});});
gsap.utils.toArray('.cmar .row').forEach((row,i)=>{const dir=i%2?1:-1;gsap.fromTo(row,{xPercent:dir*-8},{xPercent:dir*8,ease:'none',scrollTrigger:{trigger:row,scrub:1}});});
const wt=document.querySelector('.hud .w-top'),wb=document.querySelector('.hud .w-bot');
let HERO={p:0};
(function(){const cv=document.getElementById('scene');if(!cv||!window.THREE)return;
const renderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();const cam=new THREE.PerspectiveCamera(42,1,.1,100);
scene.add(new THREE.AmbientLight(0xffffff,.6));
const key=new THREE.DirectionalLight(0xfff1d8,2.8);key.position.set(5,8,6);scene.add(key);
const warm=new THREE.PointLight(0xcf8b3e,45,30);warm.position.set(-4,2,4);scene.add(warm);
const rim=new THREE.DirectionalLight(0xa8431d,1.8);rim.position.set(-6,-3,-2);scene.add(rim);
const cup=new THREE.Group();cup.position.y=-.3;scene.add(cup);
const ceramic=new THREE.MeshStandardMaterial({color:0xf3ead9,roughness:.32,metalness:.06});
cup.add(new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.02,1.8,72,1,true),ceramic));
const bottom=new THREE.Mesh(new THREE.CircleGeometry(1.02,48),ceramic);bottom.rotation.x=-Math.PI/2;bottom.position.y=-.9;cup.add(bottom);
const rimT=new THREE.Mesh(new THREE.TorusGeometry(1.3,.06,20,72),ceramic);rimT.rotation.x=Math.PI/2;rimT.position.y=.9;cup.add(rimT);
const coffeeMat=new THREE.MeshStandardMaterial({color:0x3a1d0e,roughness:.18,metalness:.35});
const coffee=new THREE.Mesh(new THREE.CircleGeometry(1.22,48),coffeeMat);coffee.rotation.x=-Math.PI/2;cup.add(coffee);
const handle=new THREE.Mesh(new THREE.TorusGeometry(.58,.14,20,48,Math.PI*1.3),ceramic);handle.position.set(1.42,0,0);handle.rotation.z=-Math.PI*0.15;cup.add(handle);
const saucer=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.1,.12,72),ceramic);saucer.position.y=-1.05;cup.add(saucer);
function glow(c,s,x,y,z){const cn=document.createElement('canvas');cn.width=cn.height=128;const g=cn.getContext('2d');const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);const tx=new THREE.CanvasTexture(cn);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));sp.scale.set(s,s,1);sp.position.set(x,y,z);scene.add(sp);}
glow('rgba(207,139,62,.9)',7,-1.5,1,-2);glow('rgba(168,67,29,.7)',6,2,-1,-3);
const bm=new THREE.MeshStandardMaterial({color:0x2a1408,roughness:.55,metalness:.15});
const NB=18,beans=[];
for(let i=0;i<NB;i++){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.18,0),bm);b.scale.set(1,.7,1.15);
const ang=(i/NB)*Math.PI*2+Math.random();const rad=4+Math.random()*2.5;
b.userData={sx:Math.cos(ang)*rad,sy:3+Math.random()*4,sz:Math.sin(ang)*rad-1,t0:i/NB*0.7,spin:0.04+Math.random()*0.05,rx:Math.random()*6,ry:Math.random()*6};
beans.push(b);scene.add(b);}
const sN=140,sg=new THREE.BufferGeometry(),spos=new Float32Array(sN*3),sb=[];
for(let i=0;i<sN;i++){const x=(Math.random()-.5)*.9;spos[i*3]=x;spos[i*3+1]=.95+Math.random()*3;spos[i*3+2]=(Math.random()-.5)*.9;sb.push({x,ph:Math.random()*6.28});}
sg.setAttribute('position',new THREE.BufferAttribute(spos,3));
const steam=new THREE.Points(sg,new THREE.PointsMaterial({color:0xe8d6bf,size:.08,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(steam);
let tmx=0,tmy=0;window.addEventListener('mousemove',e=>{tmx=(e.clientX/innerWidth-.5);tmy=(e.clientY/innerHeight-.5);});
const stage=document.querySelector('.scrollstage');
if(stage)ScrollTrigger.create({trigger:stage,start:'top top',end:'bottom bottom',scrub:1,onUpdate:s=>{HERO.p=s.progress;const bar=document.querySelector('.progress i');if(bar)bar.style.width=(s.progress*100)+'%';
const step=document.querySelector('.hud .step');if(step)step.textContent=s.progress<.33?'Свежие зёрна':s.progress<.7?'Падают в чашку':'Кофе готов ☕';
if(wt)gsap.set(wt,{x:-s.progress*60,opacity:1-s.progress*0.7});if(wb)gsap.set(wb,{x:s.progress*60,opacity:1-s.progress*0.7});}});
function ease(t){return t<0?0:t>1?1:t*t*(3-2*t);}
function size(){const w=cv.clientWidth,h=cv.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
function loop(t){requestAnimationFrame(loop);const p=HERO.p;
const ang=-0.5+p*1.4;const dist=9.8-p*1.8;
cam.position.set(Math.sin(ang)*dist+tmx*0.6,0.8+p*0.6-tmy*0.4,Math.cos(ang)*dist);cam.lookAt(0,0.1,0);
cup.rotation.y=t*0.0002;
let landed=0;
beans.forEach((b)=>{const local=ease((p-b.userData.t0)/0.3);
if(local<=0){b.visible=p>0.02;b.position.set(b.userData.sx,b.userData.sy,b.userData.sz);}
else if(local<1){b.visible=true;b.position.x=b.userData.sx*(1-local);b.position.z=b.userData.sz*(1-local);b.position.y=b.userData.sy+(0.85-b.userData.sy)*local-Math.sin(local*Math.PI)*1.2;b.rotation.x=b.userData.rx+local*8;b.rotation.y=b.userData.ry+local*6;}
else{b.visible=false;landed++;}});
const fill=landed/NB;coffee.position.y=0.2+fill*0.62;coffeeMat.color.setHSL(0.06,0.6,0.06+fill*0.06);
steam.material.opacity=Math.max(0,(p-0.6)/0.4)*0.45;
const arr=steam.geometry.attributes.position.array;for(let i=0;i<sN;i++){arr[i*3+1]+=0.012;arr[i*3]=sb[i].x+Math.sin(t*0.001+sb[i].ph)*.25;if(arr[i*3+1]>4.4)arr[i*3+1]=.95;}steam.geometry.attributes.position.needsUpdate=true;
renderer.render(scene,cam);}
size();window.addEventListener('resize',size);loop(0);})();
gsap.utils.toArray('.num[data-to]').forEach(el=>{const to=+el.dataset.to,suf=el.dataset.suf||'';ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>{gsap.fromTo(el,{innerText:0},{innerText:to,duration:1.8,ease:'power2.out',snap:{innerText:1},onUpdate(){el.innerText=Math.ceil(+el.innerText)+suf;}});}});});
const tr=document.querySelector('.hstrip .track');if(tr)tr.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){tr.scrollLeft+=e.deltaY;}},{passive:true});
(function(){const f=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.vmenu a,.mobmenu a').forEach(a=>{if(a.getAttribute('href')===f)a.classList.add('active');});})();
const form=document.getElementById('bookForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const b=form.querySelector('button');b.textContent='Заявка отправлена ✓';setTimeout(()=>{b.textContent='Забронировать столик';form.reset();},2600);});