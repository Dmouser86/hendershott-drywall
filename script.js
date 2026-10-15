var PHOTO_PROJECTS = [
  {
    tag: "Coffered Ceiling & Fireplace",
    title: "Vaulted Coffered Ceiling & Fireplace Surround",
    img: "1926.jpg",
    desc: "Custom residential great room featuring vaulted ceiling planes, recessed box beam coffers, and a floor-to-ceiling fireplace chase finished with laser-straight metal corner bead and multi-coat joint compound.",
    specs: "Scope: 5/8\" ceiling board, paper-faced metal corner bead, 3-coat taping & feathering • Location: Southeast Missouri",
    service: "Custom Ceilings, Archways & Fireplaces"
  },
  {
    tag: "Two-Story Great Room",
    title: "Two-Story Window Wall & High Ceiling Finish",
    img: "1929.jpg",
    desc: "High-scaffold sheetrock hanging and precision seam finishing around multi-tier wood casement windows. Engineered to eliminate seam ridging or shadowing under intense natural daylight.",
    specs: "Scope: High-bay scaffold hanging, window return mudding, Level 4/5 finish prep • Location: Cape Girardeau / Scott City Area",
    service: "New Drywall Hanging & Installation"
  },
  {
    tag: "Custom Archway & Texture",
    title: "Custom Arched Opening & Patterned Texture",
    img: "1855.jpg",
    desc: "Hand-contoured flexible bullnose archway framing and drywall returns paired with uniform subtle knockdown wall and ceiling texturing across an open-concept main floor.",
    specs: "Scope: Custom arch bead installation, bullnose returns & knockdown texture match • Location: Southeast Missouri",
    service: "Custom Ceilings, Archways & Fireplaces"
  },
  {
    tag: "Level 5 Smooth Skim Coat",
    title: "Whole-Room Remodel & Level 5 Smooth Finish",
    img: "level5-finish.jpg",
    desc: "Complete interior remodel featuring tight window masking, full drop-cloth floor protection, and a dead-flat Level 5 skim coat across walls and ceilings prior to priming.",
    specs: "Scope: Full skim coating, low-dust vacuum sanding, primer-ready inspection • Location: Scott City, MO",
    service: "Taping, Mudding & Level 5 Finish"
  },
  {
    tag: "Ceiling Patch & Knockdown",
    title: "Water-Damaged Ceiling Cutout & Knockdown Match",
    img: "ceiling-patch.jpg",
    desc: "Precision cutout of water-damaged ceiling drywall, replacement with new 5/8\" sheetrock secured to ceiling joists, fiberglass/paper seam taping, and seamless knockdown texture matching.",
    specs: "Scope: Ceiling tear-out, 5/8\" board patch, knockdown texture blend • Location: Southeast Missouri",
    service: "Ceiling Drywall & Texture Matching"
  },
  {
    tag: "New Construction Sheetrock",
    title: "Residential Addition Hanging & Can Light Cutouts",
    img: "new-hanging.jpg",
    desc: "Full sheetrock hanging for a new residential room addition with staggered butt joints, glue-and-screw fastening, clean rotary cutouts for recessed lighting, and initial tape and bed coats.",
    specs: "Scope: New construction hanging, recessed light routing, initial tape & bed coat • Location: Southeast Missouri",
    service: "New Drywall Hanging & Installation"
  }
];

var FINISH_LEVELS = {
  3: {
    title: "Level 3 — Heavy or Medium Texture Base",
    desc: "Includes tape embedded in joint compound plus one additional bed coat over all joints, interior angles, and fastener heads. Ideal for ceilings or walls receiving knockdown or orange peel spray texture.",
    bestFor: "Recommended For: Knockdown ceilings, orange peel walls, and textured remodel matching."
  },
  4: {
    title: "Level 4 — Standard Smooth Paint-Ready Finish",
    desc: "Our most popular residential wall finish. Includes embedded tape plus two separate fill and feathering coats over flat joints and three coats over fastener heads and corner beads, sanded smooth for flat or eggshell paint.",
    bestFor: "Recommended For: Standard residential bedrooms, hallways, living rooms, and new construction."
  },
  5: {
    title: "Level 5 — Full Skim-Coat Architectural Perfection",
    desc: "The highest standard in the drywall industry. After completing all Level 4 taping coats, a thin, uniform skim coat of joint compound is troweled across the entire wall or ceiling surface to eliminate any porosity or sheen differences.",
    bestFor: "Recommended For: Two-story window walls, vaulted ceilings, gloss/semi-gloss paint, and harsh natural lighting."
  }
};

var currentModalProjectIndex = 0;
var savedRequests = [];

function switchPage(pageId) {
  var pages = ["home", "services", "about", "gallery", "contact"];
  for (var i = 0; i < pages.length; i++) {
    var p = document.getElementById("page-" + pages[i]);
    var n = document.getElementById("nav-" + pages[i]);
    if (p) {
      if (pages[i] === pageId) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    }
    if (n) {
      if (pages[i] === pageId) {
        n.classList.add("active");
      } else {
        n.classList.remove("active");
      }
    }
  }
  var navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.remove("open");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileMenu() {
  var navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.toggle("open");
  }
}

function openEmergencyRequest() {
  var urgencySelect = document.getElementById("contactUrgency");
  var serviceSelect = document.getElementById("contactService");
  if (urgencySelect) {
    urgencySelect.value = "emergency";
  }
  if (serviceSelect) {
    serviceSelect.value = "Emergency Water-Damaged Drywall";
  }
  syncEmergencyBanner();
  switchPage("contact");
}

function clearEmergencyMode() {
  var urgencySelect = document.getElementById("contactUrgency");
  if (urgencySelect) {
    urgencySelect.value = "standard";
  }
  syncEmergencyBanner();
}

function syncEmergencyBanner() {
  var urgencySelect = document.getElementById("contactUrgency");
  var banner = document.getElementById("emergencyBanner");
  if (urgencySelect && banner) {
    if (urgencySelect.value === "emergency") {
      banner.classList.add("active");
    } else {
      banner.classList.remove("active");
    }
  }
}

function selectServiceAndNavigate(serviceName, urgencyLevel) {
  var serviceSelect = document.getElementById("contactService");
  var urgencySelect = document.getElementById("contactUrgency");
  if (serviceSelect) {
    serviceSelect.value = serviceName;
  }
  if (urgencySelect && urgencyLevel) {
    urgencySelect.value = urgencyLevel;
  }
  syncEmergencyBanner();
  switchPage("contact");
}

function handleQuickFormSubmit(event) {
  event.preventDefault();
  var qUrgency = document.getElementById("quickUrgency");
  var qService = document.getElementById("quickService");
  var cUrgency = document.getElementById("contactUrgency");
  var cService = document.getElementById("contactService");
  if (qUrgency && cUrgency) {
    cUrgency.value = qUrgency.value;
  }
  if (qService && cService) {
    cService.value = qService.value;
  }
  syncEmergencyBanner();
  switchPage("contact");
}

function updateDrywallCalculator() {
  var lenEl = document.getElementById("calcLength");
  var widEl = document.getElementById("calcWidth");
  var hgtEl = document.getElementById("calcHeight");
  var ceilEl = document.getElementById("calcIncludeCeiling");

  var length = Math.max(2, parseFloat(lenEl ? lenEl.value : 16) || 16);
  var width = Math.max(2, parseFloat(widEl ? widEl.value : 14) || 14);
  var height = parseFloat(hgtEl ? hgtEl.value : 8) || 8;
  var mode = ceilEl ? ceilEl.value : "yes";

  var wallSqFt = 2 * (length + width) * height;
  var ceilingSqFt = length * width;
  var totalSqFt = wallSqFt + ceilingSqFt;
  if (mode === "walls") {
    totalSqFt = wallSqFt;
  } else if (mode === "ceiling") {
    totalSqFt = ceilingSqFt;
  }

  var sheets = Math.ceil((totalSqFt * 1.1) / 32);
  var buckets = Math.max(1, Math.ceil(totalSqFt / 180));
  var tapeFt = Math.ceil(totalSqFt * 0.39);

  var sqFtOut = document.getElementById("calcSqFtOut");
  var sheetsOut = document.getElementById("calcSheetsOut");
  var mudOut = document.getElementById("calcMudOut");
  var tapeOut = document.getElementById("calcTapeOut");

  if (sqFtOut) sqFtOut.textContent = Math.round(totalSqFt) + " sq ft";
  if (sheetsOut) sheetsOut.textContent = sheets + " sheets";
  if (mudOut) mudOut.textContent = buckets + (buckets === 1 ? " bucket" : " buckets");
  if (tapeOut) tapeOut.textContent = tapeFt + " ft";
}

function attachCalcToEstimate() {
  var lenEl = document.getElementById("calcLength");
  var widEl = document.getElementById("calcWidth");
  var hgtEl = document.getElementById("calcHeight");
  var lvlEl = document.getElementById("calcFinishLevel");
  var sqFtOut = document.getElementById("calcSqFtOut");
  var sheetsOut = document.getElementById("calcSheetsOut");
  var notesEl = document.getElementById("contactNotes");

  var summary = "Room Dimensions: " + (lenEl ? lenEl.value : "16") + "' x " + (widEl ? widEl.value : "14") + "' (" + (hgtEl ? hgtEl.value : "8") + "' ceiling) | Approx Area: " + (sqFtOut ? sqFtOut.textContent : "704 sq ft") + " (~" + (sheetsOut ? sheetsOut.textContent : "25 sheets") + ") | Target Finish: " + (lvlEl ? lvlEl.value : "Level 4 Smooth");
  if (notesEl) {
    notesEl.value = summary;
  }
  selectServiceAndNavigate("New Drywall Hanging & Installation", "standard");
}

function showFinishLevel(levelNum) {
  var levels = [3, 4, 5];
  for (var i = 0; i < levels.length; i++) {
    var btn = document.getElementById("lvlBtn" + levels[i]);
    if (btn) {
      if (levels[i] === levelNum) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  }
  var data = FINISH_LEVELS[levelNum];
  if (data) {
    var t = document.getElementById("finishLevelTitle");
    var d = document.getElementById("finishLevelDesc");
    var b = document.getElementById("finishLevelBestFor");
    if (t) t.textContent = data.title;
    if (d) d.textContent = data.desc;
    if (b) b.textContent = data.bestFor;
  }
}

function toggleFaq(index) {
  var item = document.getElementById("faq-" + index);
  if (item) {
    item.classList.toggle("open");
  }
}

function filterGallery(category) {
  var filters = ["all", "ceilings", "hanging", "finishing", "repair"];
  for (var i = 0; i < filters.length; i++) {
    var btn = document.getElementById("filter-" + filters[i]);
    if (btn) {
      if (filters[i] === category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  }
  var grid = document.getElementById("galleryGrid");
  if (!grid) return;
  var cards = grid.querySelectorAll(".gallery-card");
  for (var j = 0; j < cards.length; j++) {
    var cardCat = cards[j].getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      cards[j].style.display = "flex";
    } else {
      cards[j].style.display = "none";
    }
  }
}

function openPhotoModal(index) {
  currentModalProjectIndex = index;
  var item = PHOTO_PROJECTS[index];
  if (!item) return;
  var modal = document.getElementById("photoModal");
  var tagEl = document.getElementById("modalTag");
  var titleEl = document.getElementById("modalTitle");
  var imgEl = document.getElementById("modalImg");
  var descEl = document.getElementById("modalDesc");
  var specsEl = document.getElementById("modalSpecs");

  if (tagEl) tagEl.textContent = item.tag;
  if (titleEl) titleEl.textContent = item.title;
  if (imgEl) {
    imgEl.src = item.img;
    imgEl.alt = item.title;
  }
  if (descEl) descEl.textContent = item.desc;
  if (specsEl) specsEl.textContent = item.specs;
  if (modal) modal.classList.add("open");
}

function closePhotoModal() {
  var modal = document.getElementById("photoModal");
  if (modal) modal.classList.remove("open");
}

function closePhotoModalOnBackdrop(event) {
  if (event.target && event.target.id === "photoModal") {
    closePhotoModal();
  }
}

function requestSimilarProject() {
  var item = PHOTO_PROJECTS[currentModalProjectIndex];
  closePhotoModal();
  if (item) {
    var notesEl = document.getElementById("contactNotes");
    if (notesEl) {
      notesEl.value = "Interested in a project similar to: " + item.title + " (" + item.tag + ").";
    }
    selectServiceAndNavigate(item.service, "standard");
  }
}

function handleFullContactSubmit(event) {
  event.preventDefault();
  var name = (document.getElementById("custName") || {}).value || "";
  var phone = (document.getElementById("custPhone") || {}).value || "";
  var email = (document.getElementById("custEmail") || {}).value || "";
  var city = (document.getElementById("custCity") || {}).value || "";
  var urgency = (document.getElementById("contactUrgency") || {}).value || "standard";
  var service = (document.getElementById("contactService") || {}).value || "";
  var notes = (document.getElementById("contactNotes") || {}).value || "";
  var method = (document.getElementById("contactMethod") || {}).value || "Phone Call";

  var entry = {
    name: name,
    phone: phone,
    email: email,
    city: city,
    urgency: urgency,
    service: service,
    notes: notes,
    method: method,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  savedRequests.unshift(entry);
  renderSavedRequests();

  var urgencyLabel = urgency === "emergency" ? "🚨 24/7 EMERGENCY" : (urgency === "urgent" ? "Time-Sensitive" : "Standard Estimate");
  var summaryMsg = "Thank you, " + name + "! Your " + urgencyLabel + " request for " + service + " in " + city + " has been prepared for Kevin Hendershott.";
  var summaryEl = document.getElementById("confirmSummaryText");
  if (summaryEl) summaryEl.textContent = summaryMsg;

  var bodyText = encodeURIComponent(
    "Hendershott Drywall Request\n" +
    "Name: " + name + "\n" +
    "Phone: " + phone + "\n" +
    "City: " + city + "\n" +
    "Urgency: " + urgencyLabel + "\n" +
    "Service: " + service + "\n" +
    "Details: " + notes
  );
  var smsLink = document.getElementById("confirmSmsLink");
  var mailLink = document.getElementById("confirmMailLink");
  if (smsLink) smsLink.href = "sms:6187027892?body=" + bodyText;
  if (mailLink) mailLink.href = "mailto:kevin@hendershottdrywall.com?subject=" + encodeURIComponent(urgencyLabel + " - " + service + " (" + city + ")") + "&body=" + bodyText;

  var confirmModal = document.getElementById("confirmModal");
  if (confirmModal) confirmModal.classList.add("open");
}

function renderSavedRequests() {
  var listEl = document.getElementById("submissionsList");
  if (!listEl) return;
  if (savedRequests.length === 0) {
    listEl.textContent = "No test requests submitted in this session yet.";
    return;
  }
  var html = "";
  for (var i = 0; i < savedRequests.length; i++) {
    var r = savedRequests[i];
    var badgeColor = r.urgency === "emergency" ? "#ef4444" : "#f4efe6";
    html += '<div style="padding: 0.75rem; background: #12161b; border: 1px solid var(--brand-border); border-radius: 8px; margin-bottom: 0.55rem;">' +
      '<div style="font-weight: 700; color: ' + badgeColor + ';">' + r.service + ' (' + r.city + ')</div>' +
      '<div style="font-size: 0.8rem; color: #d1d5db;">Client: ' + r.name + ' • ' + r.phone + ' • ' + r.timestamp + '</div>' +
      '</div>';
  }
  listEl.innerHTML = html;
}

function closeConfirmModal() {
  var confirmModal = document.getElementById("confirmModal");
  if (confirmModal) confirmModal.classList.remove("open");
}

function closeConfirmModalOnBackdrop(event) {
  if (event.target && event.target.id === "confirmModal") {
    closeConfirmModal();
  }
}

updateDrywallCalculator();

window.addEventListener('DOMContentLoaded', function() {
  var params = new URLSearchParams(window.location.search);
  var urg = params.get('urgency');
  var srv = params.get('service');
  var cUrgency = document.getElementById('contactUrgency');
  var cService = document.getElementById('contactService');
  if (urg && cUrgency) {
    cUrgency.value = urg;
    syncEmergencyBanner();
  }
  if (srv && cService) {
    cService.value = srv;
  }
});
