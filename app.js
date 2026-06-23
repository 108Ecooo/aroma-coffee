const lenis=new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
function raf(t){lenis.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);
const nav=document.querySelector('.nav');lenis.on('scroll',({scroll})=>nav.classList.toggle('scrolled',scroll>20));
const burger=document.querySelector('.burger'),menu=document.querySelector('.menu');
if(burger)burger.addEventListener('click',()=>menu.classList.toggle('open'));
const dot=document.querySelector('.cursor'),ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px';}});
function rl(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px';}requestAnimationFrame(rl);}rl();
document.querySelectorAll('a,button,.vcard,.cell,.mitem').forEach(el=>{el.addEventListener('mouseenter',()=>ring&&ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring&&ring.classList.remove('hover'));});
document.querySelectorAll('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform=`translate(${x*.25}px,${y*.35}px)`;});b.addEventListener('mouseleave',()=>b.style.transform='');});
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.reveal').forEach((el,i)=>{gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',delay:(i%3)*0.08,scrollTrigger:{trigger:el,start:'top 88%'}});});
if(document.querySelector('.hero h1')){gsap.from('.hero .tagline',{opacity:0,y:20,duration:.8});gsap.from('.hero h1',{opacity:0,y:50,duration:1.1,delay:.1,ease:'power3.out'});gsap.from('.hero p',{opacity:0,y:30,duration:1,delay:.35});gsap.from('.hero .cta',{opacity:0,y:30,duration:1,delay:.5});}
gsap.utils.toArray('.num[data-to]').forEach(el=>{const to=+el.dataset.to,suf=el.dataset.suf||'';ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>{gsap.fromTo(el,{innerText:0},{innerText:to,duration:1.8,ease:'power2.out',snap:{innerText:1},onUpdate(){el.innerText=Math.ceil(+el.innerText)+suf;}});}});});
// parallax media
gsap.utils.toArray('.frow .media .em').forEach(el=>{gsap.to(el,{yPercent:-14,ease:'none',scrollTrigger:{trigger:el,scrub:1}});});
// ===== STRONGER 3D: detailed coffee cup (cylinder body + handle torus) + liquid + bloom-ish glow sprites + steam =====
(function(){const cv=document.getElementById('scene');if(!cv||!window.THREE)return;
const renderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();const cam=new THREE.PerspectiveCamera(45,1,.1,100);cam.position.set(0,.6,9);
scene.add(new THREE.AmbientLight(0xffffff,.55));
const key=new THREE.DirectionalLight(0xfff1d8,2.6);key.position.set(5,7,6);scene.add(key);
const warm=new THREE.PointLight(0xd98c3f,40,30);warm.position.set(-4,2,4);scene.add(warm);
const rim=new THREE.DirectionalLight(0xb5471f,1.6);rim.position.set(-6,-3,-2);scene.add(rim);
const cup=new THREE.Group();cup.position.y=-.3;scene.add(cup);
const ceramic=new THREE.MeshStandardMaterial({color:0xf3ead9,roughness:.35,metalness:.05});
// body (slightly tapered cylinder)
const body=new THREE.Mesh(new THREE.CylinderGeometry(1.25,1.0,1.7,64,1,true),ceramic);cup.add(body);
// bottom
const bottom=new THREE.Mesh(new THREE.CircleGeometry(1.0,48),ceramic);bottom.rotation.x=-Math.PI/2;bottom.position.y=-.85;cup.add(bottom);
// rim torus
const rimT=new THREE.Mesh(new THREE.TorusGeometry(1.25,.06,20,64),ceramic);rimT.rotation.x=Math.PI/2;rimT.position.y=.85;cup.add(rimT);
// coffee liquid
const coffee=new THREE.Mesh(new THREE.CircleGeometry(1.18,48),new THREE.MeshStandardMaterial({color:0x3a1d0e,roughness:.2,metalness:.3}));coffee.rotation.x=-Math.PI/2;coffee.position.y=.78;cup.add(coffee);
// handle
const handle=new THREE.Mesh(new THREE.TorusGeometry(.55,.13,20,48,Math.PI*1.3),ceramic);handle.position.set(1.35,0,0);handle.rotation.z=-Math.PI*0.15;cup.add(handle);
// saucer
const saucer=new THREE.Mesh(new THREE.CylinderGeometry(2.1,2.0,.12,64),ceramic);saucer.position.y=-1.0;cup.add(saucer);
// glow sprites (fake bloom) around
function glow(c,s,x,y,z){const cnv=document.createElement('canvas');cnv.width=cnv.height=128;const g=cnv.getContext('2d');const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);const tx=new THREE.CanvasTexture(cnv);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));sp.scale.set(s,s,1);sp.position.set(x,y,z);scene.add(sp);return sp;}
glow('rgba(217,140,63,.9)',6,-1,1,-2);glow('rgba(181,71,31,.7)',5,2,-1,-3);
// floating beans
const beans=[];const bm=new THREE.MeshStandardMaterial({color:0x2a1408,roughness:.55,metalness:.15});
for(let i=0;i<12;i++){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.16+Math.random()*.1,0),bm);const a=Math.random()*Math.PI*2,r=3.4+Math.random()*2;b.position.set(Math.cos(a)*r,(Math.random()-.5)*5,Math.sin(a)*r-1);b.userData={a,r,sp:.15+Math.random()*.35};beans.push(b);scene.add(b);}
// steam ribbon
const sN=120,sg=new THREE.BufferGeometry(),spos=new Float32Array(sN*3),sb=[];
for(let i=0;i<sN;i++){const x=(Math.random()-.5)*.9;spos[i*3]=x;spos[i*3+1]=.9+Math.random()*3;spos[i*3+2]=(Math.random()-.5)*.9;sb.push({x,ph:Math.random()*6.28});}
sg.setAttribute('position',new THREE.BufferAttribute(spos,3));
const steam=new THREE.Points(sg,new THREE.PointsMaterial({color:0xe8d6bf,size:.07,transparent:true,opacity:.4,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(steam);
let tmx=0,tmy=0;window.addEventListener('mousemove',e=>{tmx=(e.clientX/innerWidth-.5);tmy=(e.clientY/innerHeight-.5);});
let scrollY=0;lenis.on('scroll',({scroll})=>scrollY=scroll);
function size(){const w=cv.clientWidth,h=cv.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
function loop(t){requestAnimationFrame(loop);
cup.rotation.y=t*0.0004+scrollY*0.0016;cup.rotation.z=Math.sin(t*0.0004)*.05;
cup.position.x+=((tmx*.7)-cup.position.x)*.05;cup.position.y+=((-.3-tmy*.5)-cup.position.y)*.05;
beans.forEach(b=>{b.userData.a+=0.002*b.userData.sp;b.position.x=Math.cos(b.userData.a)*b.userData.r;b.position.z=Math.sin(b.userData.a)*b.userData.r-1;b.rotation.x+=0.01;b.rotation.y+=0.013;});
const p=steam.geometry.attributes.position.array;for(let i=0;i<sN;i++){p[i*3+1]+=0.012;p[i*3]=sb[i].x+Math.sin(t*0.001+sb[i].ph)*.25;if(p[i*3+1]>4.2)p[i*3+1]=.9;}steam.geometry.attributes.position.needsUpdate=true;
cam.position.x+=((tmx*.5)-cam.position.x)*.04;cam.lookAt(0,0,0);renderer.render(scene,cam);}
size();window.addEventListener('resize',size);loop(0);})();
(function(){const f=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.menu a').forEach(a=>{if(a.getAttribute('href')===f)a.classList.add('active');});})();
const form=document.getElementById('bookForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const b=form.querySelector('button');b.textContent='Заявка отправлена ✓';setTimeout(()=>{b.textContent='Забронировать столик';form.reset();},2600);});