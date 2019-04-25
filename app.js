class TargetElement{constructor(topPosition,bottomPosition){this._topPosition=topPosition;this._bottomPostion=bottomPosition;this._onScreen=!1}
get topPosition(){return this._topPosition}
get bottomPosition(){return this._bottomPostion}
get isOnScreen(){if(this.bottomPosition>=0&&this.topPosition<window.innerHeight){return!0}else{return!1}}
set updatePosition(element){this._topPosition=element.getBoundingClientRect().top;this._bottomPostion=element.getBoundingClientRect().bottom}}
class AnimateIt{constructor(animationName,startPosition){this._animationName=animationName;this._startPosition=startPosition;this._repetition=!0}
get animationName(){return this._animationName}
get startPosition(){return this._startPosition}
get repetition(){return this._repetition}
set setAnimationName(name){if(typeof name==='string'){this._animationName=name}else{this._animationName='none'}}
set repetition(word){if(word==='single'){this._repetition=!1}else{this._repetition=!0}}
set animationPosition(y){if(isNaN(y)||y>100||y<=0){this._startPosition=window.innerHeight*0.95}else{this._startPosition=window.innerHeight/100*y}}
animateIt(element){element.style.visibility='visible';element.style.WebkitAnimationName=this.animationName;element.style.animationName=this.animationName}
hideIt(element){element.style.visibility='hidden';element.style.WebkitAnimationName='none';element.style.animationName='none'}}
const InitAi=()=>{const allDataAi=document.querySelectorAll('[data-ai]');Array.from(allDataAi).forEach((element)=>{const target=new TargetElement();const anim=new AnimateIt();const inputString=element.dataset.ai;const keyWords=inputString.split(" ");anim.setAnimationName=window.getComputedStyle(element).getPropertyValue('animation-name');anim.animationPosition=parseInt(keyWords[0]);anim.repetition=keyWords[1];target.updatePosition=element;if(target.isOnScreen){anim.animateIt(element)}else{anim.hideIt(element)}
let lastCall=0;window.addEventListener('scroll',()=>{const now=(new Date()).getTime();if(now-lastCall<100){return}else{lastCall=now;target.updatePosition=element;if(target.isOnScreen&&target.topPosition<=anim.startPosition&&element.style.visibility==='hidden'){anim.animateIt(element)}else if(!target.isOnScreen&&anim.repetition){anim.hideIt(element)}}})})}
InitAi()