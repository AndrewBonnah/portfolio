// sidebar-toggle.js – burger button + sidebar toggle logic (non‑module version)
// --------------------------------------------------------
// • Makes the burger/settings button animate between “≡” and “×” states
// • Collapses / expands the sidebar by toggling a CSS class
// • Self‑initialises; ALSO exposes `window.initSidebarToggle()` if you want to call it manually.
// --------------------------------------------------------
;(function(){
  /**
   * @param {Object}   options
   * @param {string}   [options.sidebarId="chat-sidebar"]   – id of <aside>
   * @param {string}   [options.toggleId ="sidebar-toggle"] – id of <button>
   * @param {string}   [options.collapsedClass="collapsed"] – class that hides the sidebar
   * @param {string}   [options.openClass ="open"]           – class that animates the burger icon
   */


function randomColor() {
    var rRand = Math.floor(Math.random() * 256); // 0‒255
    console.log(rRand)
    var gRand = Math.floor(Math.random() * 256); // 0‒255
    console.log(gRand)
    var bRand = Math.floor(Math.random() * 256); // 0‒255
    console.log(bRand)
    //rRand = 250
    //gRand = 226
    //bRand = 95
    // optional: return an object or a formatted string
      // randomly choose which channel to zero‑out (0 = r, 1 = g, 2 = b)
    const pick = Math.floor(Math.random() * 5);

    if (pick === 0) {
      rRand = 0;
      gRand = 255;
    }
    else if (pick === 1) {
      gRand = 0;
      rRand = 255;
      }
    else if (pick === 2) {
      bRand = 0;
      rRand = 255;
      }
    else if (pick === 3) {
      rRand = 0;
      bRand = 255;
      }
    else if (pick === 4) {
      gRand = 0;
      bRand = 255;
      }
    else {
        bRand = 255;
        gRand = 0;

      }
    return { r: rRand, g: gRand, b: bRand };
}



    function randomPureInkColor() {
      const colors = [
        { r: 0xff, g: 0x00, b: 0x00, name: "Red" },
        { r: 0xff, g: 0x00, b: 0xff, name: "Magenta" },
        { r: 0x00, g: 0x00, b: 0xff, name: "Blue" },
        { r: 0x00, g: 0xff, b: 0xff, name: "Cyan" },
        { r: 0x00, g: 0xff, b: 0x00, name: "Green" },
        { r: 0xff, g: 0xff, b: 0x00, name: "Yellow" }
      ];

      const { r, g, b, name } = colors[Math.floor(Math.random() * colors.length)];

      // format each component as 0x?? with leading zeros if needed
      const fmt = v => `0x${v.toString(16).padStart(2, "0")}`;
      return {
        str: `r: ${fmt(r)}, g: ${fmt(g)}, b: ${fmt(b)}`,
        r: fmt(r),
        g: fmt(g),
        b: fmt(b)
      };
    }





    
    function RGB2HSV(rgb) {
    	hsv = new Object();
    	max=max3(rgb.r,rgb.g,rgb.b);
    	dif=max-min3(rgb.r,rgb.g,rgb.b);
    	hsv.saturation=(max==0.0)?0:(100*dif/max);
    	if (hsv.saturation==0) hsv.hue=0;
     	else if (rgb.r==max) hsv.hue=60.0*(rgb.g-rgb.b)/dif;
    	else if (rgb.g==max) hsv.hue=120.0+60.0*(rgb.b-rgb.r)/dif;
    	else if (rgb.b==max) hsv.hue=240.0+60.0*(rgb.r-rgb.g)/dif;
    	if (hsv.hue<0.0) hsv.hue+=360.0;
    	hsv.value=Math.round(max*100/255);
    	hsv.hue=Math.round(hsv.hue);
    	hsv.saturation=Math.round(hsv.saturation);
    	return hsv;
    }
    
    // RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
    // which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
    function HSV2RGB(hsv) {
    	var rgb=new Object();
    	if (hsv.saturation==0) {
    		rgb.r=rgb.g=rgb.b=Math.round(hsv.value*2.55);
    	} else {
    		hsv.hue/=60;
    		hsv.saturation/=100;
    		hsv.value/=100;
    		i=Math.floor(hsv.hue);
    		f=hsv.hue-i;
    		p=hsv.value*(1-hsv.saturation);
    		q=hsv.value*(1-hsv.saturation*f);
    		t=hsv.value*(1-hsv.saturation*(1-f));
    		switch(i) {
    		case 0: rgb.r=hsv.value; rgb.g=t; rgb.b=p; break;
    		case 1: rgb.r=q; rgb.g=hsv.value; rgb.b=p; break;
    		case 2: rgb.r=p; rgb.g=hsv.value; rgb.b=t; break;
    		case 3: rgb.r=p; rgb.g=q; rgb.b=hsv.value; break;
    		case 4: rgb.r=t; rgb.g=p; rgb.b=hsv.value; break;
    		default: rgb.r=hsv.value; rgb.g=p; rgb.b=q;
    		}
    		rgb.r=Math.round(rgb.r*255);
    		rgb.g=Math.round(rgb.g*255);
    		rgb.b=Math.round(rgb.b*255);
    	}
    	return rgb;
    }

    //Adding HueShift via Jacob (see comments)
    function HueShift(h,s) { 
        h+=s; while (h>=360.0) h-=360.0; while (h<0.0) h+=360.0; return h; 
    }
    
    //min max via Hairgami_Master (see comments)
    function min3(a,b,c) { 
        return (a<b)?((a<c)?a:c):((b<c)?b:c); 
    } 
    function max3(a,b,c) { 
        return (a>b)?((a>c)?a:c):((b>c)?b:c); 
    }





  function initSidebarToggle({
    sidebarId       = 'chat-sidebar',
    toggleId        = 'sidebar-toggle',
    collapsedClass  = 'collapsed',
    openClass       = 'open'
  } = {}) {


    





    









    // first randint
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


    function randomiseLogoDurations() {
    const root = document.documentElement;      // :root in CSS


    // i need to figure out the math that pins thesee to the corners so they move different
    // like a primitive joint
      var rand1 = randInt(500,800)
      var rand2 = randInt(100,300)
      
      var rand3 = rand1 + randInt(1, 500)

  
      var rand4 = (rand1 / 4) +(rand3 / 2)

      root.style.setProperty('--t-line-a',    `${rand1}ms`);
      root.style.setProperty('--t-line-b',    `${rand2}ms`);
      root.style.setProperty('--t-circle-a',  `${rand3}ms`);
      root.style.setProperty('--t-circle-b',  `${rand4}ms`);
    }


    const sidebar   = document.getElementById(sidebarId);
    const toggleBtn = document.getElementById(toggleId);
    const wrapper = document.getElementById('sidebar-toggle-wrapper');



    if (!sidebar || !toggleBtn) {
      console.warn('[sidebar-toggle] Sidebar or toggle button not found');
      return;
    }




    toggleBtn.addEventListener('click', () => {
      const isNowCollapsed = sidebar.classList.toggle(collapsedClass);
      randomiseLogoDurations();                 // new times each click

      const randcolor = randomColor()


      // Complement
      temprgb = randcolor // Cyan
      temphsv=RGB2HSV(temprgb);
      temphsv.hue=HueShift(temphsv.hue,180.0);
      temprgb=HSV2RGB(temphsv);

      const root = document.documentElement;
      // need to convert randcolor and temprgb in forum of a js dict, {r: 169, g: 113, b: 205}
      // into the form rgb(169, 113, 205)

      const objToRgb = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;
      root.style.setProperty('--t-color-a',  objToRgb(randcolor));
      root.style.setProperty('--t-color-b',  objToRgb(temprgb));

      wrapper.classList.toggle('collapsed');
      toggleBtn.classList.toggle(openClass, !isNowCollapsed);
    });
  }





    const randcolor = randomColor()


      // Complement
    temprgb = randcolor // Cyan
    temphsv=RGB2HSV(temprgb);
    temphsv.hue=HueShift(temphsv.hue,180.0);
    temprgb=HSV2RGB(temphsv);

    const root = document.documentElement;
      // need to convert randcolor and temprgb in forum of a js dict, {r: 169, g: 113, b: 205}
      // into the form rgb(169, 113, 205)

    const objToRgb = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;
    root.style.setProperty('--t-color-a',  objToRgb(randcolor));
    root.style.setProperty('--t-color-b',  objToRgb(temprgb));


  // expose for manual use if needed
  window.initSidebarToggle = initSidebarToggle;

  // auto‑initialise once DOM is ready
  if (document.readyState !== 'loading') {
    initSidebarToggle();
  } 
  
  
  else {
    document.addEventListener('DOMContentLoaded', () => initSidebarToggle());
  }
})();




/* ───────── Scroll-spy for left tracker ───────── */
document.addEventListener('DOMContentLoaded', () => {
  const sections      = document.querySelectorAll('main section');
  const trackerLinks  = document.querySelectorAll('.tracker-link');

  // --- Set up animations ---

  // 1. Add rotating border and breath effects to all images
document.querySelectorAll('img').forEach((img) => {
  const container = img.parentElement;
    if (!container) return;
  
    // --- Rotating border setup ---
  const borderElement = document.createElement('div');
  borderElement.className = 'rotating-border';
  borderElement.style.cssText = `
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 50%; border: 3px dashed #0064c8;
      z-index: -1; pointer-events: none;
  `;
    if (getComputedStyle(container).position === 'static') {
  container.style.position = 'relative';
    }
  container.appendChild(borderElement);
  
  let rotationAngle = 0;
  let animationId = null;
  
  function rotateBorder() {
    rotationAngle += 0.5;
    borderElement.style.transform = `rotate(${rotationAngle}deg)`;
    animationId = requestAnimationFrame(rotateBorder);
  }
  
    // Store start/stop functions on the element to be called by other event listeners
    img.startRotation = () => {
      if (!animationId) rotateBorder();
    };
    img.stopRotation = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
      borderElement.style.transition = 'transform 0.5s ease-out';
      borderElement.style.transform = 'rotate(0deg)';
      setTimeout(() => {
        borderElement.style.transition = '';
        rotationAngle = 0;
      }, 500);
    }
    };

    // --- Breath effect setup ---
    img.breathIn = () => {
      img.classList.remove('breath-out');
      img.classList.add('breath-in');
    };
    img.breathOut = () => {
      img.classList.remove('breath-in');
      img.classList.add('breath-out');
    };

    // Default hover behavior: breath and rotate
    img.addEventListener('mouseenter', () => {
        img.breathIn();
        img.startRotation();
    });
    img.addEventListener('mouseleave', () => {
        img.breathOut();
        img.stopRotation();
    });
  });


  // 2. Link project captions (li) to their images
  ['wcapphoto1', 'wcapphoto2', 'wcapphoto3'].forEach(name => {
    const li = document.querySelector(`.lirotate-${name}`);
    const img = document.querySelector(`.rotate-${name}`);

    if (li && img) {
      // When hovering over the caption, trigger the image's effects
      li.addEventListener('mouseenter', () => {
        if (img.breathIn) img.breathIn();
        if (img.startRotation) img.startRotation();
      });
      li.addEventListener('mouseleave', () => {
        if (img.breathOut) img.breathOut();
        if (img.stopRotation) img.stopRotation();
      });
    }
  });


  // 3. Link intro section body and photo for shared hover effect
  const introPhoto = document.getElementById('intro-photo');
  const introSectionBody = document.querySelector('#intro .section-body');

  if (introPhoto && introSectionBody) {
    // When hovering the section body, animate the photo
    introSectionBody.addEventListener('mouseenter', () => {
        if (introPhoto.breathIn) introPhoto.breathIn();
        if (introPhoto.startRotation) introPhoto.startRotation();
    });
    introSectionBody.addEventListener('mouseleave', () => {
        if (introPhoto.breathOut) introPhoto.breathOut();
        if (introPhoto.stopRotation) introPhoto.stopRotation();
  });

    // When hovering the photo, it animates itself. No extra link needed.
  }


  // --- Scroll-spy for left tracker ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.id;
        trackerLinks.forEach(l =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + id)
        );
      }
    });
  }, { threshold: 0.51 });

  sections.forEach(sec => observer.observe(sec));

  // --- Typing effect for intro heading ---
  const heading = document.getElementById('intro-heading');
  if (heading) {
    const funnyTexts = [
        "Newman...",
        "I turn coffee into code.",
        "Not a robot, probably.",
        "Here for the snacks."
    ];
    const funnyText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
    const textBefore = "Hi, I'm ";
    const linkText = "Andrew Bonnah";
    const linkHref = "https://www.linkedin.com/in/andrew-bonnah/";
    const linkClass = "custom-link";

    const normalWeightSpan = `<span style="font-weight: normal;">`;
    const closingSpan = `</span>`;

    // --- Set min-height to one line of text to prevent layout shift ---
    heading.innerHTML = `&nbsp;`; // Add a non-breaking space to ensure height is calculated
    const computedStyle = window.getComputedStyle(heading);
    const lineHeight = computedStyle.lineHeight;
    heading.style.minHeight = lineHeight;
    heading.innerHTML = ''; // Clear for animation

    const finalHtml = `${normalWeightSpan}${textBefore}${closingSpan}<a href="${linkHref}" class="${linkClass}"><strong>${linkText}</strong></a>`;

    function type(text, i, callback) {
      if (i < text.length) {
        const typedText = text.substring(0, i + 1);
        heading.innerHTML = `${normalWeightSpan}${typedText}${closingSpan}`;
        setTimeout(() => type(text, i + 1, callback), Math.random() * 150 + 50);
      } else if (callback) {
        setTimeout(callback, 1000); // Pause before next action
      }
    }

    function erase(text, i, callback) {
      if (i >= 0) {
        const shortenedText = text.substring(0, i);
        heading.innerHTML = `${normalWeightSpan}${shortenedText}${closingSpan}`;
        setTimeout(() => erase(text, i - 1, callback), Math.random() * 100 + 50);
      } else if (callback) {
        heading.innerHTML = ''; // Clear before next step
        callback();
      }
    }

    function typeOriginalIntro() {
        let i = 0;
        const totalLength = textBefore.length + linkText.length;

        function typeIntro() {
            if (i < textBefore.length) {
                const typedTextBefore = textBefore.substring(0, i + 1);
                heading.innerHTML = `${normalWeightSpan}${typedTextBefore}${closingSpan}`;
            } else if (i < totalLength) {
                const linkIndex = i - textBefore.length;
                const typedLinkText = linkText.substring(0, linkIndex + 1);
                heading.innerHTML = `${normalWeightSpan}${textBefore}${closingSpan}<a href="${linkHref}" class="${linkClass}"><strong>${typedLinkText}</strong></a>`;
            }

            i++;

            if (i <= totalLength) {
                setTimeout(typeIntro, Math.random() * 150 + 50);
            } else {
                heading.innerHTML = finalHtml; // Use the final pre-calculated HTML
            }
        }
        typeIntro();
    }

    // Start the animation sequence
    type(funnyText, 0, () => {
      erase(funnyText, funnyText.length, () => {
        setTimeout(typeOriginalIntro, 500); // Brief pause before typing the real intro
      });
    });
  }
});