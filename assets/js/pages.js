/* =============================================================================
   CONTENT PAGES: home, walk-in desk, courses, questions, fee quiz.
   The page picks its renderer from <body data-page>.
   ============================================================================= */
(function () {
  'use strict';

  const R = window.RT, Shell = window.Shell, { t, pick, esc, money } = Shell;
  const POSTER = 'Future-Ready%20Skills%20Training%20Poster.png';
  const POSTER_DEMO = 'demo-classes-poster.jpg';
  const POSTER_ENQUIRY = 'student-enquiry-qr.png';
  const main = () => document.getElementById('rtMain');
  const courseOf = id => R.COURSES.find(c => c.id === id);

  const hero = (icon, kicker, title, lead) => `
    <header class="rt-hero is-short">
      <span class="rt-kicker"><span class="msr">${icon}</span>${esc(kicker)}</span>
      <h1>${esc(title)}</h1>
      <p>${esc(lead)}</p>
    </header>`;

  const practiseLink = id => `<a class="rt-link" href="practice.html?id=${id}"><span class="msr">mic</span>${esc(t('practise'))}</a>`;

  // Hearing a script needs a voice for the language; the practice page handles that case
  function home() {
    const steps = [
      ['walk-in-desk.html', 'storefront', 'p1'],
      ['courses.html', 'school', 'p2'],
      ['questions.html', 'forum', 'p3'],
      ['practice.html', 'mic', 'p4'],
      ['enquiry.html', 'contact_support', 'p5']
    ];
    main().innerHTML = `
      <header class="rt-hero">
        <span class="rt-kicker"><span class="msr">support_agent</span>${esc(t('homeKicker'))}</span>
        <h1>${esc(t('homeTitle'))}</h1>
        <p>${esc(t('homeLead'))}</p>
      </header>
      <section class="rt-section">
        <h2><span class="msr">route</span>${esc(t('pathTitle'))}</h2>
        <p class="rt-lead">${esc(t('pathLead'))}</p>
        <ol class="rt-path">
          ${steps.map(([href, icon, key], i) => `<li><a href="${href}"><span class="rt-num">${i + 1}</span><span class="rt-path-text"><b>${esc(t(key))}</b><small>${esc(t(key + 'd'))}</small></span><span class="msr">${icon}</span></a></li>`).join('')}
        </ol>
      </section>
      <section class="rt-section">
        <div style="display: flex; flex-direction: column; gap: 2.5rem; max-width: 680px; margin: 0 auto; width: 100%;">
          <div>
            <h2><span class="msr">sell</span>${esc(t('sheetTitle'))}</h2>
            <a class="rt-poster" href="${POSTER}" target="_blank" rel="noopener">
              <img src="${POSTER}" alt="${esc(t('sheetTitle'))}" loading="lazy" style="max-width: 100%; max-height: 75vh; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto; border-radius: 8px;">
            </a>
            <p class="rt-note">${esc(t('sheetLead'))}</p>
          </div>
          <div>
            <h2><span class="msr">event</span>Live Demo Classes</h2>
            <a class="rt-poster" href="${POSTER_DEMO}" target="_blank" rel="noopener">
              <img src="${POSTER_DEMO}" alt="Free Live Demo Classes" loading="lazy" style="max-width: 100%; max-height: 75vh; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto; border-radius: 8px;">
            </a>
          </div>
          <div>
            <h2><span class="msr">qr_code_scanner</span>Student Enquiry</h2>
            <a class="rt-poster" href="${POSTER_ENQUIRY}" target="_blank" rel="noopener">
              <img src="${POSTER_ENQUIRY}" alt="Student Enquiry QR" loading="lazy" style="max-width: 100%; max-height: 75vh; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto; border-radius: 8px;">
            </a>
          </div>
        </div>
      </section>`;
  }

  function desk() {
    main().innerHTML = `
      ${hero('storefront', t('navDesk'), t('deskTitle'), t('deskLead'))}
      <ol class="rt-desk">
        ${R.DESK.map((d, i) => `<li class="rt-card">
          <div class="rt-card-head"><span class="rt-num">${i + 1}</span><h2>${esc(pick(d.title))}</h2>${practiseLink(d.id)}</div>
          <p class="rt-do"><span class="msr">${d.icon}</span><span><b>${esc(t('doThis'))}:</b> ${esc(pick(d.do))}</span></p>
          <blockquote>${esc(pick(d))}</blockquote>
        </li>`).join('')}
      </ol>
      <section class="rt-section" id="finder">
        <h2><span class="msr">manage_search</span>${esc(t('finderTitle'))}</h2>
        <p class="rt-lead">${esc(t('finderLead'))}</p>
        <div class="rt-finder">
          ${R.FINDER.map(f => `<div class="rt-finder-row">
            <p>${esc(pick(f.who))}</p>
            <div class="rt-tags">${f.courses.length ? f.courses.map(id => `<a href="courses.html#${id}">${esc(courseOf(id).name)}</a>`).join('') : `<strong>${esc(pick(f.note))}</strong>`}</div>
          </div>`).join('')}
        </div>
      </section>
      <section class="rt-section">
        <h2><span class="msr">contact_phone</span>${esc(t('contactTitle'))}</h2>
        <ul class="rt-contact">
          <li><span class="msr">language</span>${esc(R.CONTACT.site)}</li>
          ${R.CONTACT.phones.map(p => `<li><span class="msr">call</span>${esc(p)}</li>`).join('')}
          <li><span class="msr">mail</span>${esc(R.CONTACT.email)}</li>
          <li><span class="msr">event</span>${esc(t('demoDays'))}: ${esc(pick(R.CONTACT.demoDays))}</li>
        </ul>
      </section>`;
  }

  function courses() {
    const groups = R.CATEGORIES.map(cat => {
      const list = R.COURSES.filter(c => c.cat === cat.id);
      return `<section class="rt-section">
        <h2><span class="msr">${cat.icon}</span>${esc(pick(cat))}</h2>
        <div class="rt-courses">
          ${list.map(c => `<details class="rt-course" id="${c.id}">
            <summary><span class="rt-c-name">${esc(c.name)}</span><span class="rt-c-dur">${esc(t('months'))}</span><span class="rt-c-fee">${esc(money(c.fee))}</span><span class="msr rt-chev">expand_more</span></summary>
            <div class="rt-c-body">
              <h3>${esc(t('say'))}</h3>
              <blockquote>${esc(pick(c))}</blockquote>
              <h3>${esc(t('tools'))}</h3>
              <div class="rt-tags is-plain">${c.tools.map(x => `<span>${esc(x)}</span>`).join('')}</div>
              <h3>${esc(t('needs'))}</h3>
              <p>${esc(pick(R.PREREQ[c.prereq]))}</p>
              ${practiseLink(c.id)}
            </div>
          </details>`).join('')}
        </div>
      </section>`;
    }).join('');
    main().innerHTML = `
      ${hero('school', t('navCourses'), t('coursesTitle'), t('coursesLead'))}
      ${groups}
      <section class="rt-section">
        <h2><span class="msr">menu_book</span>${esc(t('basicsTitle'))}</h2>
        <p class="rt-lead">${esc(t('basicsLead'))}</p>
        <dl class="rt-basics">${R.BASICS.map(b => `<div><dt>${esc(b.term)}</dt><dd>${esc(pick(b))}</dd></div>`).join('')}</dl>
      </section>`;
    // Links such as courses.html#aws-de open that course
    const open = location.hash && document.getElementById(location.hash.slice(1));
    if (open) { open.open = true; open.scrollIntoView({ block: 'center' }); }
  }

  function questions() {
    main().innerHTML = `
      ${hero('forum', t('navQuestions'), t('questionsTitle'), t('questionsLead'))}
      <section class="rt-section is-warn">
        <h2><span class="msr">gpp_maybe</span>${esc(t('neverTitle'))}</h2>
        <p class="rt-lead">${esc(t('neverLead'))}</p>
        <ul class="rt-never">${R.NEVER.map(n => `<li><span class="msr">block</span>${esc(pick(n))}</li>`).join('')}</ul>
      </section>
      <div class="rt-qlist">
        ${R.QUESTIONS.map(q => `<article class="rt-card">
          <div class="rt-card-head"><span class="rt-num is-icon"><span class="msr">${q.icon}</span></span><h2>${esc(pick(q.q))}</h2>${practiseLink(q.id)}</div>
          <blockquote>${esc(pick(q))}</blockquote>
        </article>`).join('')}
      </div>`;
  }

  // ---------------------------------------------------------------------------
  function quizPage() {
    if (!quiz || !quiz.started) {
      main().innerHTML = `
        ${hero('quiz', t('navQuiz'), t('quizTitle'), t('quizLead'))}
        <section class="rt-section rt-center"><button type="button" class="rt-btn is-primary" id="quizGo"><span class="msr">play_arrow</span>${esc(t('quizStart'))}</button></section>`;
      document.getElementById('quizGo').addEventListener('click', () => { quiz = buildQuiz(); quizPage(); });
      return;
    }
    if (quiz.finished) {
      const missedSome = quiz.score < quiz.items.length;
      main().innerHTML = `
        ${hero('quiz', t('navQuiz'), t('quizDone'), `${t('quizScore')}: ${quiz.score} / ${quiz.items.length}`)}
        <section class="rt-section rt-center">
          <button type="button" class="rt-btn is-primary" id="quizAgain"><span class="msr">replay</span>${esc(t('quizRetry'))}</button>
          ${missedSome ? `<a class="rt-btn" href="courses.html"><span class="msr">school</span>${esc(t('reviewSheet'))}</a>` : ''}
        </section>`;
      document.getElementById('quizAgain').addEventListener('click', () => { quiz = buildQuiz(); quizPage(); });
      return;
    }
    const item = quiz.items[quiz.at];
    const chosen = quiz.chosen;
    const answered = chosen !== null;
    main().innerHTML = `
      ${hero('quiz', t('navQuiz'), t('quizTitle'), `${t('question')} ${quiz.at + 1} ${t('of')} ${quiz.items.length}`)}
      <section class="rt-section">
        <h2 class="rt-q">${esc(item.q())}</h2>
        <div class="rt-options">
          ${item.options.map(o => {
            const cls = !answered ? '' : o === item.answer ? ' is-right' : o === chosen ? ' is-wrong' : '';
            return `<button type="button" class="rt-option${cls}" data-o="${esc(o)}" ${answered ? 'disabled' : ''}>${esc(item.label(o))}</button>`;
          }).join('')}
        </div>
        ${answered ? `<p class="rt-feedback ${chosen === item.answer ? 'is-right' : 'is-wrong'}" role="status">${chosen === item.answer ? esc(t('right')) : `${esc(t('wrong'))}: ${esc(item.label(item.answer))}`}</p>
          <button type="button" class="rt-btn is-primary" id="quizNext"><span class="msr">arrow_forward</span>${esc(t('nextQ'))}</button>` : ''}
      </section>`;
    main().querySelectorAll('.rt-option').forEach(b => b.addEventListener('click', () => {
      const raw = b.dataset.o;
      quiz.chosen = item.options.find(o => String(o) === raw);
      if (quiz.chosen === item.answer) quiz.score++;
      quizPage();
    }));
    const next = document.getElementById('quizNext');
    if (next) next.addEventListener('click', () => {
      quiz.at++;
      quiz.chosen = null;
      if (quiz.at >= quiz.items.length) { quiz.finished = true; Shell.setQuiz(quiz.score); }
      quizPage();
    });
  }

  const pages = { home, desk, courses, questions };
  Shell.init(pages[document.body.dataset.page]);
})();