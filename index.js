class TargetElement {

   constructor(topPosition, bottomPosition){
       this._topPosition = topPosition;
       this._bottomPostion = bottomPosition; 
       this._onScreen = false;
   }

   get topPosition() {
       return this._topPosition;
   }

   get bottomPosition() {
       return this._bottomPostion;
   }

   get isOnScreen() {
       return (this.bottomPosition >= 0 && this.topPosition < window.innerHeight) || false;
   }

   set updatePosition (element) {
       this._topPosition = element.getBoundingClientRect().top;
       this._bottomPostion = element.getBoundingClientRect().bottom;
   }
}

class AnimateIt {
   constructor (animationName, startPosition) {
       this._animationName = animationName;
       this._startPosition = startPosition;
       this._repetition = true;
   }

   get animationName() {
       return this._animationName;
   }

   get startPosition() {
       return this._startPosition;
   }

   get repetition() {
       return this._repetition;
   }

   set setAnimationName (name) {
       this._animationName = (typeof name === 'string') ? name : 'none';
   }

   set repetition(word) {
       this._repetition = !((word === 'single') || false);
   }

   set animationPosition(y) {
      this._startPosition = this.evaluatePosition(y);
  }

  evaluatePosition(y) {
      switch(y) {
          case (isNaN(y) || y > 100): 
              return window.innerHeight * 0.97;
          case y <= 0:
              return window.innerHeight * 0.03;
          default:
              return window.innerHeight / 100 * y;
      }
  }

   animateIt(element) {
       element.style.visibility = 'visible';
       element.style.WebkitAnimationName = this.animationName;
       element.style.animationName = this.animationName;
   }

   hideIt(element) {
       element.style.visibility = 'hidden';
       element.style.WebkitAnimationName = 'none';
       element.style.animationName = 'none';
   }
}

class Helper {
   static hideElement(target, anim, element) {
       if(!target.isOnScreen && anim.repetition) {
           anim.hideIt(element);
       }
   }

   static isElementInsideOfScreen(target, element, anim) {
       return target.isOnScreen &&
       target.topPosition <= anim.startPosition &&
       element.style.visibility === 'hidden';
   }
}

const InitAi = () => {

   const allDataAi = document.querySelectorAll('[data-ai]');

   Array.from(allDataAi, (element) => {

       const target = new TargetElement();
       const anim = new AnimateIt();
       const inputString = element.dataset.ai;
       const keyWords = inputString.split(" ");

       anim.setAnimationName = window.getComputedStyle(element).getPropertyValue('animation-name');
       anim.animationPosition = parseInt(keyWords[0]);
       anim.repetition = keyWords[1];
       //target.display = keyWords[2];    soon
       target.updatePosition = element;
       target.isOnScreen ? anim.animateIt(element) : anim.hideIt(element);

       let lastCall = 0;

       window.addEventListener('scroll', () => {
           const now = (new Date()).getTime();

           if (now - lastCall > 100) {
               lastCall = now;
               target.updatePosition = element;
               Helper.isElementInsideOfScreen(target, element, anim) ? anim.animateIt(element) : Helper.hideElement(target, anim, element);
           }
       });
   });
}

InitAi();