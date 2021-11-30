const fetchTabsData = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`,
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`,
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
          },
        ]),
      1000
    );
  });
};

$tabs = document.querySelector('.tabs');

const getTaps = async () => {
  try {
    const tabs = await fetchTabsData();
    document.querySelector('.spinner').style.display = 'none';
    $tabs.style.setProperty('--tabs-length', tabs.length);

    const tabTitle = tabs.reduce(
      (acc, cur, index) => acc + `<div class="tab" data-index=${index}>${cur.title}</div>`,
      ''
    );
    const tabContent = tabs.reduce(
      (acc, cur, index) => acc + `<div class="tab-content ${index === 0 ? 'active' : ''}">${cur.content}</div>`,
      ''
    );
    const nav = `<nav>${tabTitle}<span class="glider"></span></nav>${tabContent}`;

    $tabs.innerHTML = nav;
  } catch (error) {
    console.log(error);
  }
};

$tabs.addEventListener('click', ({ target }) => {
  if (!target.matches('nav > div')) return;
  const TAB_WIDTH = window.getComputedStyle($tabs).getPropertyValue('--tab-width');

  const $glider = document.querySelector('.glider');
  const $tabContents = [...$tabs.children].filter(tab => tab.classList.contains('tab-content'));

  const targetIdx = +target.dataset.index;
  const targetContent = $tabContents[targetIdx];
  // glider 추가
  $glider.style.setProperty('transform', `translate3D(${TAB_WIDTH * targetIdx}px, 0px, 0px)`);

  targetContent.classList.add('active');
  const $restContents = $tabContents.filter((_, i) => i !== targetIdx);
  $restContents.forEach($content => $content.classList.remove('active'));
});

window.addEventListener('DOMContentLoaded', getTaps);
