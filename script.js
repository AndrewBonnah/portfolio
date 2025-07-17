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


  function initSidebarToggle({
    sidebarId       = 'chat-sidebar',
    toggleId        = 'sidebar-toggle',
    collapsedClass  = 'collapsed',
    openClass       = 'open'
  } = {}) {



    const sidebar   = document.getElementById(sidebarId);
    const toggleBtn = document.getElementById(toggleId);




    if (!sidebar || !toggleBtn) {
      console.warn('[sidebar-toggle] Sidebar or toggle button not found');
      return;
    }




    toggleBtn.addEventListener('click', () => {
      const isNowCollapsed = sidebar.classList.toggle(collapsedClass);
      toggleBtn.classList.toggle(openClass, !isNowCollapsed);
    });
  }





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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.id;
        trackerLinks.forEach(l =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + id)
        );
      }
    });
  }, { threshold: 0.9 });   // 25 % visible = “active”

  sections.forEach(sec => observer.observe(sec));
});
