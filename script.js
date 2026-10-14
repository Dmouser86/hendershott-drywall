/* Hendershott Drywall & Repair LLC - Form, Gallery & Navigation Script (script.js) */

function toggleMobileMenu() {
  const nav = document.getElementById('navLinks');
  if (nav) nav.classList.toggle('open');
}

function setUrgency(level) {
  const cardStandard = document.getElementById('urgCardStandard');
  const cardUrgent = document.getElementById('urgCardUrgent');
  const cardEmergency = document.getElementById('urgCardEmergency');
  const alertBox = document.getElementById('emergencyAlertBox');
  if (!cardStandard || !cardUrgent || !cardEmergency) return;

  cardStandard.className = 'urgency-card';
  cardUrgent.className = 'urgency-card';
  cardEmergency.className = 'urgency-card';
  if (alertBox) alertBox.classList.remove('visible');

  if (level === 'standard') {
    cardStandard.classList.add('selected-normal');
    cardStandard.querySelector('input').checked = true;
  } else if (level === 'urgent') {
    cardUrgent.classList.add('selected-normal');
    cardUrgent.querySelector('input').checked = true;
  } else if (level === 'emergency') {
    cardEmergency.classList.add('selected-emergency');
    cardEmergency.querySelector('input').checked = true;
    if (alertBox) alertBox.classList.add('visible');
  }
}

function filterGallery(cat, btnEl) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  document.querySelectorAll('.gallery-card').forEach(card => {
    if (cat === 'all' || card.getAttribute('data-category') === cat) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const urgencyEl = document.querySelector('input[name="urgency"]:checked');
  const urgency = urgencyEl ? urgencyEl.value : 'Standard Estimate';
  const isEmergency = urgency.includes('EMERGENCY');
  const statusEl = document.getElementById('emergencyStatus');
  const emergencyNote = (isEmergency && statusEl) ? ('\nEmergency Status: ' + statusEl.value) : '';

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim() || 'Not provided';
  const pref = document.getElementById('custContactPref').value;
  const address = document.getElementById('custAddress').value.trim();
  const city = document.getElementById('custCity').value.trim();
  const propType = document.getElementById('propType').value;
  const scope = document.getElementById('projectScope').value;
  const details = document.getElementById('projectDetails').value.trim();

  const checkedWork = Array.from(document.querySelectorAll('input[name="workType"]:checked')).map(cb => cb.value);
  const workList = checkedWork.length ? checkedWork.join(', ') : 'General Drywall Inquiry';

  const photoInput = document.getElementById('damagePhotos');
  const photoFiles = photoInput ? photoInput.files : [];
  const photoNote = photoFiles.length
    ? (photoFiles.length + ' photo(s) selected (' + Array.from(photoFiles).map(f => f.name).join(', ') + ')')
    : 'None attached';

  const subjectPrefix = isEmergency ? '🚨 [EMERGENCY DRYWALL REQUEST]' : '[Drywall Estimate Request]';
  const subject = `${subjectPrefix} ${name} -${city}`;

  const summary = [
    `=== HENDERSHOTT DRYWALL & REPAIR LLC — SERVICE REQUEST ===`,
    `Urgency: ${urgency}${emergencyNote}`,
    ``,
    `CUSTOMER INFO:`,
    `- Name: ${name}`,
    `- Phone: ${phone}`,
    `- Email: ${email}`,
    `- Preferred Contact: ${pref}`,
    `- Job Location: ${address},${city}`,
    `- Property Type: ${propType}`,
    ``,
    `DRYWALL WORK NEEDED:`,
    `- Services Requested: ${workList}`,
    `- Project Scope: ${scope}`,
    `- Description: ${details}`,
    `- Photos: ${photoNote}`
  ].join('\n');

  const statusBanner = document.getElementById('backendStatusMsg');

  // Works on both GitHub Pages (via FormSubmit AJAX) and Namecheap Hosting
  try {
    const response = await fetch('https://formsubmit.co/ajax/kevin@hendershottdrywall.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        name: name,
        phone: phone,
        email: email,
        preferred_contact: pref,
        job_location: `${address}, ${city}`,
        property_type: propType,
        urgency: urgency,
        services_needed: workList,
        project_scope: scope,
        description: details
      })
    });
    if (response.ok && statusBanner) {
      statusBanner.textContent = '✓ Sent directly to kevin@hendershottdrywall.com!';
    }
  } catch (err) {
    if (statusBanner) {
      statusBanner.textContent = '✓ Request Ready! Click below to send via Email or Text:';
    }
  }

  const previewEl = document.getElementById('summaryPreview');
  if (previewEl) previewEl.textContent = summary;

  const mailtoBtn = document.getElementById('mailtoDispatchBtn');
  if (mailtoBtn) {
    mailtoBtn.href = `mailto:kevin@hendershottdrywall.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
  }

  const smsBtn = document.getElementById('smsDispatchBtn');
  if (smsBtn) {
    smsBtn.href = `sms:6187027892?body=${encodeURIComponent(subject + '\n' + summary)}`;
  }

  const modal = document.getElementById('submissionConfirmation');
  if (modal) {
    modal.classList.add('visible');
    modal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const urg = params.get('urgency');
  if (urg) setUrgency(urg);
  const srv = params.get('service');
  if (srv) {
    document.querySelectorAll('input[name="workType"]').forEach(cb => {
      cb.checked = (cb.value === srv);
    });
  }
});
