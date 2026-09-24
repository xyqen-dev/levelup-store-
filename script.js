(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== DATA =====
     To use your own banner images: set "img" to a path like "images/city-skyline-1.jpg"
     (upload the image alongside index.html in your repo). Leave "img" empty to keep
     the themed placeholder + icon. */
  var games = [
    { name:"City Skyline I", price:"3999৳", stock:20, motif:"skyline", img:"", accent:"#4FD1C5" },
    { name:"City Skyline II", price:"4999৳", stock:20, motif:"skyline", img:"", accent:"#5E9FFF" },
    { name:"Red Dead Redemption 2", stock:6, motif:"western", img:"", accent:"#FF4D4D",
      variants:[ {label:"Redeem Code", price:"3999৳"}, {label:"Steam Account", price:"3499৳"} ] },
    { name:"GTA 5", stock:0, motif:"gtaV", img:"", accent:"#FF3D7F" },
    { name:"GTA 6", price:"15990৳", stock:12, motif:"gtaVI", img:"", accent:"#B15CFF" },
    { name:"Minecraft Redeem Code", price:"2700৳", stock:null, motif:"block", img:"", note:"Official Minecraft account", accent:"#5CF29A" },
    { name:"Minecraft Capes", stock:"Unlimited", motif:"cape", img:"", link:"capes", accent:"#FFD166" },
    { name:"Cyberpunk 2077", stock:6, motif:"cyber", img:"", accent:"#FCEE0A",
      variants:[ {label:"Epic Account", price:"5999৳"}, {label:"Steam Account", price:"2999৳"} ] },
    { name:"Far Cry Series", stock:15, motif:"jungle", img:"", link:"farcry", accent:"#FF8C42" },
    { name:"Microsoft Flight Simulator 40th Anniversary", price:"2999৳", stock:3, motif:"plane", img:"", short:"Flight Sim 40th", accent:"#5E9FFF" }
  ];

  var subs = [
    { name:"Discord Server Boost — 1 Month", stock:0, motif:"boost", img:"", accent:"#FF73C0",
      variants:[ {label:"2x Boost", price:"150৳"}, {label:"14x Boost", price:"600৳"} ] },
    { name:"Discord Nitro — 1 Month", stock:0, motif:"nitro", img:"", accent:"#9B6DFF",
      variants:[ {label:"Premium", price:"700৳"}, {label:"Basic", price:"370৳"} ] },
    { name:"Netflix Premium — 1 Month", stock:0, motif:"play", img:"", accent:"#E50914",
      variants:[ {label:"Personal", price:"315৳"}, {label:"Shared", price:"239৳"}, {label:"Shared Private Profile", price:"399৳"} ] },
    { name:"YouTube Premium — 1 Month", price:"250৳", stock:null, motif:"play", img:"", accent:"#FF3B3B" }
  ];

  var capes = [
    { name:"Home Cape", price:"100৳", stock:"Unlimited" },
    { name:"Copper Cape", price:"150৳", stock:"Unlimited" },
    { name:"Optifine Cape", price:"150৳", stock:"Unlimited" },
    { name:"Menace Cape", price:"250৳", stock:"Unlimited" },
    { name:"Purple Heart Cape", price:"550৳", stock:"Unlimited" }
  ];

  var farcry = [
    { name:"Far Cry I", price:"1149৳" },
    { name:"Far Cry III", price:"1749৳" },
    { name:"Far Cry IV", price:"2149৳" },
    { name:"Far Cry V", price:"3999৳" },
    { name:"Far Cry VI", price:"3999৳" },
    { name:"Far Cry Primal", price:"4149৳" }
  ];

  var detailPages = {
    capes:  { title:"Minecraft Capes", sub:"All capes are unlimited stock and delivered instantly.", items:capes },
    farcry: { title:"Far Cry Series", sub:"Pick any title from the series.", items:farcry }
  };

  var MOTIFS = {
    skyline: '<rect x="8" y="55" width="12" height="45"/><rect x="24" y="30" width="12" height="70"/><rect x="40" y="42" width="12" height="58"/><rect x="56" y="15" width="12" height="85"/><rect x="72" y="48" width="10" height="52"/>',
    western: '<polygon points="50,10 61,38 91,38 66,56 76,86 50,68 24,86 34,56 9,38 39,38"/>',
    gta: '<line x1="0" y1="20" x2="100" y2="20"/><line x1="0" y1="45" x2="100" y2="45"/><line x1="0" y1="70" x2="100" y2="70"/><line x1="20" y1="0" x2="20" y2="100"/><line x1="55" y1="0" x2="55" y2="100"/><line x1="85" y1="0" x2="85" y2="100"/>',
    gtaV: '<polyline points="18,12 50,88 82,12" stroke-linejoin="round" stroke-linecap="round"/>',
    gtaVI: '<polyline points="6,12 32,88 58,12" stroke-linejoin="round" stroke-linecap="round"/><line x1="76" y1="12" x2="76" y2="88" stroke-linecap="round"/>',
    block: '<polygon points="50,8 88,28 88,72 50,92 12,72 12,28"/><polyline points="12,28 50,48 88,28"/><line x1="50" y1="48" x2="50" y2="92"/>',
    cape: '<path d="M30,10 C20,40 20,70 35,95 L50,85 L65,95 C80,70 80,40 70,10 C60,20 40,20 30,10 Z"/>',
    cyber: '<rect x="15" y="15" width="24" height="24"/><rect x="61" y="61" width="24" height="24"/><line x1="39" y1="27" x2="61" y2="27"/><line x1="61" y1="27" x2="61" y2="61"/><line x1="27" y1="39" x2="27" y2="73"/><line x1="27" y1="73" x2="61" y2="73"/>',
    jungle: '<polyline points="5,90 30,40 45,65 60,25 95,90"/><circle cx="75" cy="20" r="10"/>',
    plane: '<path d="M50,5 L58,40 L92,55 L92,63 L58,55 L54,85 L68,95 L68,100 L50,94 L32,100 L32,95 L46,85 L42,55 L8,63 L8,55 L42,40 Z"/>',
    boost: '<polygon points="50,6 88,28 88,72 50,94 12,72 12,28"/><polygon points="50,26 70,38 70,62 50,74 30,62 30,38"/>',
    nitro: '<circle cx="50" cy="50" r="38"/><polygon points="45,25 30,55 46,55 40,80 68,45 50,45"/>',
    play: '<circle cx="50" cy="50" r="40"/><polygon points="42,32 72,50 42,68"/>'
  };
  function motifSVG(key, cls, accent){
    if(!key || !MOTIFS[key]) return '';
    var strokeStyle = accent ? ' style="stroke:' + accent + '"' : '';
    return '<svg class="' + cls + '"' + strokeStyle + ' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' + MOTIFS[key] + '</svg>';
  }

  function bannerStyle(item){
    if(item.img) return ' style="background-image:url(\'' + item.img + '\')"';
    var a = item.accent || '#5CF29A';
    return ' style="background-image:radial-gradient(circle at 75% 15%, ' + a + '4D, transparent 62%), linear-gradient(160deg, #171c27, #0a0c11); --accent:' + a + ';"';
  }

  function stockBadge(item){
    if(item.stock === 0) return '<span class="pcard-stock out mono">OUT OF STOCK</span>';
    if(item.stock === null || item.stock === undefined) return '';
    return '<span class="pcard-stock mono">' + (item.stock === "Unlimited" ? "UNLIMITED" : item.stock + " IN STOCK") + '</span>';
  }

  function cardHTML(item){
    var a = item.accent || '#5CF29A';
    var banner = '<div class="pcard-banner"' + bannerStyle(item) + '>' + motifSVG(item.motif, 'pcard-motif', a) + stockBadge(item) + '</div>';
    var body = '<div class="pcard-body" style="--accent:' + a + '"><h3>' + item.name + '</h3>';
    if(item.note){ body += '<div class="pcard-note">' + item.note + '</div>'; }

    if(item.link){
      body += '<div class="pcard-open mono">View options →</div>';
      body += '</div>';
      return '<div class="pcard is-link" data-link="' + item.link + '" tabindex="0" role="button">' + banner + body + '</div>';
    }

    if(item.variants){
      body += '<div class="pcard-variants">';
      item.variants.forEach(function(v){
        body += '<div class="pcard-variant-row"><span>' + v.label + '</span><span class="v-price mono">' + v.price + '</span></div>';
      });
      body += '</div></div>';
      return '<div class="pcard">' + banner + body + '</div>';
    }

    if(item.stock === 0){
      body += '<div class="pcard-price out mono">Currently unavailable</div></div>';
    } else {
      body += '<div class="pcard-price">' + item.price + '</div></div>';
    }
    return '<div class="pcard">' + banner + body + '</div>';
  }

  function render(track, items){
    track.innerHTML = items.map(cardHTML).join('');
  }

  var gamesTrack = document.getElementById('games-track');
  var subsTrack = document.getElementById('subs-track');
  render(gamesTrack, games);
  render(subsTrack, subs);

  // ribbon (hero) — reuse a rotating sample of games + subs
  var ribbonItems = [games[0], games[4], games[5], subs[3], games[7], games[9]];
  var ribbonTrack = document.getElementById('ribbon-track');
  var ribbonHTML = ribbonItems.map(function(item, i){
    var a = item.accent || '#5CF29A';
    var price = item.price || (item.variants ? item.variants[0].price : '—');
    var style = 'background-image:radial-gradient(circle at 75% 15%, ' + a + '55, transparent 65%), linear-gradient(160deg, #171c27, #0a0c11);';
    return '<div class="rcard" style="' + style + '">' + motifSVG(item.motif, 'rcard-motif', a) + '<span class="tag mono">' + (item.short || item.name).toUpperCase().slice(0,16) + '</span><span class="price mono" style="color:' + a + '">' + price + '</span></div>';
  }).join('');
  ribbonTrack.innerHTML = ribbonHTML + ribbonHTML; // duplicate for seamless loop

  // card link clicks -> detail overlay
  var overlay = document.getElementById('detail-overlay');
  var detailTitle = document.getElementById('detail-title');
  var detailSub = document.getElementById('detail-sub');
  var detailGrid = document.getElementById('detail-grid');

  function openDetail(key){
    var page = detailPages[key];
    if(!page) return;
    detailTitle.textContent = page.title;
    detailSub.textContent = page.sub;
    detailGrid.innerHTML = page.items.map(function(it, i){
      return '<div class="dcard" style="animation-delay:' + (i * 0.05) + 's"><h4>' + it.name + '</h4><div class="price mono">' + it.price + '</div><div class="stock mono">' + it.stock + '</div></div>';
    }).join('');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDetail(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('click', function(e){
    var card = e.target.closest('[data-link]');
    if(card){ openDetail(card.getAttribute('data-link')); }
  });
  document.getElementById('detail-back').addEventListener('click', closeDetail);

  // tabs
  var tabBtns = document.querySelectorAll('.tab-btn');
  var indicator = document.getElementById('tab-indicator');
  function moveIndicator(btn){
    indicator.style.width = btn.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
  }
  function setTab(name){
    tabBtns.forEach(function(b){
      var active = b.getAttribute('data-tab') === name;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active);
      if(active) moveIndicator(b);
    });
    document.querySelectorAll('.tab-panel').forEach(function(p){
      p.classList.toggle('active', p.getAttribute('data-panel') === name);
    });
  }
  tabBtns.forEach(function(b){
    b.addEventListener('click', function(){ setTab(b.getAttribute('data-tab')); });
  });
  window.addEventListener('load', function(){ moveIndicator(document.querySelector('.tab-btn.active')); });
  window.addEventListener('resize', function(){ moveIndicator(document.querySelector('.tab-btn.active')); });

  // carousel arrows
  document.querySelectorAll('.arrow-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var track = document.getElementById(btn.getAttribute('data-scroll'));
      var dir = parseInt(btn.getAttribute('data-dir'), 10);
      track.scrollBy({ left: dir * 240, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  // tilt on product cards
  if(!reduceMotion){
    document.addEventListener('mousemove', function(e){
      var card = e.target.closest('.pcard');
      if(!card) return;
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'rotateY(' + (x * 8) + 'deg) rotateX(' + (y * -8) + 'deg) translateY(-3px)';
    });
    document.addEventListener('mouseout', function(e){
      var card = e.target.closest('.pcard');
      if(card) card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
    });
  }

  // scroll reveal
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if(reduceMotion){
    revealEls.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.18 });
    revealEls.forEach(function(el){ io.observe(el); });
  }

  // count-up stats
  var counters = document.querySelectorAll('[data-count-to]');
  var countIO = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseFloat(el.getAttribute('data-count-to'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      if(reduceMotion){
        el.textContent = target.toLocaleString(undefined, {minimumFractionDigits:decimals, maximumFractionDigits:decimals});
        countIO.unobserve(el); return;
      }
      var start = performance.now(), dur = 1400;
      function tick(now){
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toLocaleString(undefined, {minimumFractionDigits:decimals, maximumFractionDigits:decimals});
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(function(el){ countIO.observe(el); });

  // leave-site confirmation for Discord CTA
  var leaveModal = document.getElementById('leave-modal');
  var leaveLink = document.getElementById('leave-modal-link');
  var pendingHref = null;

  document.getElementById('discord-cta').addEventListener('click', function(e){
    e.preventDefault();
    pendingHref = this.getAttribute('href');
    leaveLink.textContent = pendingHref;
    leaveModal.classList.add('open');
  });
  document.getElementById('leave-cancel').addEventListener('click', function(){
    leaveModal.classList.remove('open');
    pendingHref = null;
  });
  document.getElementById('leave-confirm').addEventListener('click', function(){
    if(pendingHref){ window.open(pendingHref, '_blank', 'noopener'); }
    leaveModal.classList.remove('open');
  });
  leaveModal.addEventListener('click', function(e){
    if(e.target === leaveModal){ leaveModal.classList.remove('open'); pendingHref = null; }
  });
})();
