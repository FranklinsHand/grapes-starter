const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  storageManager: {
    id: 'gjs-',             // Prefix identifier that will be used on parameters
    type: 'local',          // Type of the storage
    fromElement: true,   //used for tempalate manager
    autosave: 0,         // Store data automatically
    autoload: 1,         // Autoload stored data on init
  },
  plugins: ['gjs-preset-webpage',
    'grapesjs-style-bg',
    'grapesjs-style-gradient',
    'grapesjs-typed',
    'grapesjs-tui-image-editor',
    'grapesjs-lory-slider',
    'grapesjs-custom-code',
    'grapesjs-plugin-export',
    'grapesjs-touch',
    'gjs-blocks-flexbox',
    'gjs-navbar',
    'grapesjs-plugin-forms',
    ],
  pluginsOpts: {
    'grapesjs-indexeddb': {
      dbName: 'gjs',
      objectStoreName: 'templates',
    },
    'grapesjs-style-bg': { /* options */ },
    'grapesjs-tui-image-editor': {
      config: {
        includeUI: {
          initMenu: 'filter',
        },
      },
      icons: {
        'menu.normalIcon.path': '../icon-d.svg',
        'menu.activeIcon.path': '../icon-b.svg',
        'menu.disabledIcon.path': '../icon-a.svg',
        'menu.hoverIcon.path': '../icon-c.svg',
        'submenu.normalIcon.path': '../icon-d.svg',
        'submenu.activeIcon.path': '../icon-c.svg',
      },
    },
    'grapesjs-plugin-export': {
      addExportBtn: true,
      btnlabel: "Zippity doodahh",
      filenamePfx: "gps_temp",
    },
    'grapesjs-lory-slider': {
      sliderBlock: {
        category: 'Extra'
      }
    },
    'grapesjs-tabs': {
          tabsBlock: {
            category: 'Extra'
          }
        },
    'grapesjs-typed': {
      block: {
        category: 'Extra',
        content: {
          type: 'typed',
          'type-speed': 40,
          strings: [
            'Text row one',
            'Text row two',
            'Text row three',
          ],
        }
      }
    },
  },
  pageManager: {
    pages: [{
      id: 'page-1',
      name: 'Page 1',
      component: '<div id="comp1">Page 1</div>',
      styles: `#comp1 { color: red }` },
    {
      id: 'page-2',
      name: 'Page 2',
      component: '<div id="comp2">Page 2</div>',
      styles: `#comp2 { color: green }` },
    {
      id: 'page-3',
      name: 'Page 3',
      component: '<div id="comp3">Page 3</div>',
      styles: `#comp3 { color: blue }` }] }
});


//although this is part of the new API, new pages are not saving. Currently useless

const pagesApp = new Vue({
  el: '.pages-wrp',
  data: { pages: [] },
  computed: {
    pm() {
      return editor.Pages;
    } },

  mounted() {
    const { pm } = this;
    this.setPages(pm.getAll());
    editor.on('page', () => {
      this.pages = [...pm.getAll()];
    });
  },
  methods: {
    setPages(pages) {
      this.pages = [...pages];
    },
    isSelected(page) {
      return this.pm.getSelected().id == page.id;
    },
    selectPage(pageId) {
      return this.pm.select(pageId);
    },
    removePage(pageId) {
      return this.pm.remove(pageId);
    },
    addPage() {
      const { pm } = this;
      const len = pm.getAll().length;
      pm.add({
        name: `Page ${len + 1}`,
        component: '<div>New page</div>' });

    } } });


//https://github.com/Ju99ernaut/grapesjs-template-manager
const pn = editor.Panels;

//https://github.com/artf/grapesjs/issues/122#issuecomment-313989326
//https://github.com/artf/grapesjs/issues/122#issuecomment-314737681
// add save button
pn.addButton('options', [{
  id: 'save-db',
  className: 'fa fa-floppy-o',
  command: 'save-db',
  attributes: {title: 'Save DB'}
}]);

// add save command
editor.Commands.add('save-db', {
    run: function(editor, sender) {
      //sender && sender.set('active', 0); // turn off the button
      editor.store();
    }
  });


//Make Grapick plugin work
//https://github.com/artf/grapick
//Could add a custom color picker down the road if needed
const gp = new Grapick({el: '#gp'});

// Handlers are color stops
gp.addHandler(0, 'red');
gp.addHandler(100, 'blue');

// Do stuff on change of the gradient
gp.on('change', complete => {
  document.body.style.background = gp.getSafeValue();
})
