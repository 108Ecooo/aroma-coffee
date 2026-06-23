const lenis=new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
function raf(t){lenis.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);
const nav=document.querySelector('.nav');lenis.on('scroll',({scroll})=>nav.classList.toggle('scrolled',scroll>20));
const burger=document.querySelector('.burger'),menu=document.querySelector('.menu');
if(burger)burger.addEventListener('click',()=>menu.classList.toggle('open'));
const dot=document.querySelector('.cursor'),ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px';}});
function ringLoop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px';}requestAnimationFrame(ringLoop);}ringLoop();
document.querySelectorAll('a,button,.mcard,.cell').forEach(el=>{el.addEventListener('mouseenter',()=>ring&&ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring&&ring.classList.remove('hover'));});
document.querySelectorAll('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform=`translate(${x*.3}px,${y*.4}px)`;});b.addEventListener('mouseleave',()=>b.style.transform='');});
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.reveal').forEach((el,i)=>{gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',delay:(i%3)*0.08,scrollTrigger:{trigger:el,start:'top 88%'}});});
if(document.querySelector('.hero h1')){gsap.from('.hero .eyebrow',{opacity:0,y:20,duration:.8});gsap.from('.hero h1',{opacity:0,y:50,duration:1.1,delay:.1,ease:'power3.out'});gsap.from('.hero p',{opacity:0,y:30,duration:1,delay:.35});gsap.from('.hero .cta',{opacity:0,y:30,duration:1,delay:.5});}
gsap.utils.toArray('.num[data-to]').forEach(el=>{const to=+el.dataset.to,suf=el.dataset.suf||'';ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>{gsap.fromTo(el,{innerText:0},{innerText:to,duration:1.8,ease:'power2.out',snap:{innerText:1},onUpdate(){el.innerText=Math.ceil(+el.innerText)+suf;}});}});});
(function(){const cv=document.getElementById('scene');if(!cv||!window.THREE)return;
const renderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));
const scene=new THREE.Scene();const cam=new THREE.PerspectiveCamera(55,1,.1,100);cam.position.set(0,0,7);
scene.add(new THREE.AmbientLight(0xffffff,.5));const key=new THREE.DirectionalLight(0xe6b870,2.2);key.position.set(4,5,6);scene.add(key);
const rim=new THREE.DirectionalLight(0xc8893f,1.4);rim.position.set(-6,-2,3);scene.add(rim);
const grp=new THREE.Group();scene.add(grp);
const torus=new THREE.Mesh(new THREE.TorusKnotGeometry(1.5,.42,160,28,2,3),new THREE.MeshStandardMaterial({color:0x6b3f24,roughness:.35,metalness:.5}));grp.add(torus);
const beans=[];const bm=new THREE.MeshStandardMaterial({color:0x3a2317,roughness:.6,metalness:.2});
for(let i=0;i<14;i++){const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.18+Math.random()*.12,0),bm);const a=Math.random()*Math.PI*2,r=3+Math.random()*2.5;b.position.set(Math.cos(a)*r,(Math.random()-.5)*5,Math.sin(a)*r-1);b.userData={a,r,sp:.2+Math.random()*.4};beans.push(b);scene.add(b);}
const sN=140,sg=new THREE.BufferGeometry(),sp=new Float32Array(sN*3);
for(let i=0;i<sN;i++){sp[i*3]=(Math.random()-.5)*2;sp[i*3+1]=Math.random()*6-1;sp[i*3+2]=(Math.random()-.5)*2;}
sg.setAttribute('position',new THREE.BufferAttribute(sp,3));const steam=new THREE.Points(sg,new THREE.PointsMaterial({color:0xe6b870,size:.05,transparent:true,opacity:.35}));scene.add(steam);
let tmx=0,tmy=0;window.addEventListener('mousemove',e=>{tmx=(e.clientX/innerWidth-.5);tmy=(e.clientY/innerHeight-.5);});
let scrollY=0;lenis.on('scroll',({scroll})=>scrollY=scroll);
function size(){const w=cv.clientWidth,h=cv.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
function loop(t){requestAnimationFrame(loop);grp.rotation.y=t*0.0004+scrollY*0.002;grp.rotation.x=Math.sin(t*0.0003)*.3+scrollY*0.001;
grp.position.x+=((tmx*1.2)-grp.position.x)*.05;grp.position.y+=((-tmy*1)-grp.position.y)*.05;
beans.forEach(b=>{b.userData.a+=0.002*b.userData.sp;b.position.x=Math.cos(b.userData.a)*b.userData.r;b.position.z=Math.sin(b.userData.a)*b.userData.r-1;b.rotation.x+=0.01;b.rotation.y+=0.012;});
const pos=steam.geometry.attributes.position.array;for(let i=0;i<sN;i++){pos[i*3+1]+=0.01;if(pos[i*3+1]>5)pos[i*3+1]=-1;}steam.geometry.attributes.position.needsUpdate=true;steam.rotation.y=t*0.0002;
cam.position.x+=((tmx*.6)-cam.position.x)*.04;cam.lookAt(0,0,0);renderer.render(scene,cam);}
size();window.addEventListener('resize',size);loop(0);})();
(function(){const f=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.menu a').forEach(a=>{if(a.getAttribute('href')===f)a.classList.add('active');});})();
const form=document.getElementById('bookForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const b=form.querySelector('button');b.textContent='Заявка отправлена ✓';setTimeout(()=>{b.textContent='Забронировать столик';form.reset();},2600);});