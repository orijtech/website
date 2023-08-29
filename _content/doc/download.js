class DownloadsController {
  constructor() {
    // Parts of tabbed section.
    this.tablist = document.querySelector('.js-tabSection');
    this.tabs = this.tablist.querySelectorAll('[role="tab"]');
    this.panels = document.querySelectorAll('[role="tabpanel"]');
    this.downloadNotice = document.querySelector('.js-doc-main');

    // OS for which to display download and install steps.
    this.osName = 'Unknown OS';
    this.osNameFromQuery = '';
    this.version = 'go1.17';

    // URL to JSON containing list of installer downloads.
    const fileListUrl = '/dl/?mode=json';
    this.activeTabIndex = 0;

    const dlQuery = new URL(document.URL).searchParams.get('dc') || '';
    if (dlQuery !== '') {
      const [queryOS] = dlQuery.split('-');
      if (queryOS === 'darwin') this.osNameFromQuery = 'mac';
      if (queryOS === 'windows') this.osNameFromQuery = 'windows';
      if (queryOS === 'linux') this.osNameFromQuery = 'linux';
    }

    // Get the install file list, then get names and sizes
    // for each OS supported on the install page.
    fetch(fileListUrl)
      .then((response) => response.json())
      .then((data) => {
        const files = data[0]['files'];
        for (var i = 0; i < files.length; i++) {
          let file = files[i].filename;
          if (file.match('.linux-amd64.tar.gz$')) {
            this.linuxFileName = file;
          }
        }
        this.detectOS();
        const osTab = document.getElementById(this.osName);
        if (osTab !== null) {
          osTab.click();
        }
        this.setVersion(data[0].version);
      })
      .catch(console.error);
      this.setEventListeners();

      this.initDownload();
  }

  async initDownload() {
    // https://go.dev/dl/go1.21.0.darwin-arm64.pkg
    const notiEl = document.querySelector('.js-download-notify');
    notiEl.style.display = 'none';
    const dlQuery = new URL(document.URL).searchParams.get('dc') || '';
    const detailsEl = document.querySelector('.js-goDetails');
    const link = document.querySelector('.js-downloadLink');
    const version = this.version;
    if (dlQuery && dlQuery.includes('-')) {
      const [os, arch] = dlQuery.split('-');
      let extension = '';
      if (os === 'windows') extension = 'msi'
      else if (os === 'linux') extension = 'tar.gz'
      else if (os === 'darwin') extension = 'pkg';
      const resource = `https://go.dev/dl/${version}.${os}-${arch}.${extension}`;
      link.href = resource;

      const titleCase = (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
      detailsEl.textContent = `${version} For ${titleCase(os)} ${arch.toUpperCase()}`;
      notiEl.style.display = 'block';

      setTimeout(() => {
        window.open(resource, '_self');
      }, 2000); // 1.5 seconds to be sure that docs page completes loading
    }
  }

  setEventListeners() {
    this.tabs.forEach((tabEl) => {
      tabEl.addEventListener('click', e => this.handleTabClick((e)));
    });
  }

  // Set the download button UI version.
  setVersion(latest) {
    const version = this.parseVersionNumber(latest);
    this.version = version;
    document.querySelector('.js-downloadDescription').textContent = `Download (${version})`;
  }

  // Updates install tab with dynamic data.
  setInstallTabData(osName) {
    const fnId = `#${osName}-filename`;
    const el = document.querySelector(fnId);
    if (!el) {
      return;
    }
    switch(osName) {
      case 'linux':
        // Update filename for linux installation step
        if (this.linuxFileName) {
          el.textContent = this.linuxFileName;
        }
        break;
    }
  }

  // Detect the users OS for installation default.
  detectOS() {
    if (this.osNameFromQuery !== '') {
      this.osName = this.osNameFromQuery;
      return;
    }
    if (navigator.userAgent.indexOf('Linux') !== -1) {
      this.osName = 'linux';
    } else if (navigator.userAgent.indexOf('Mac') !== -1) {
      this.osName = 'mac';
    } else if (navigator.userAgent.indexOf('X11') !== -1) {
      this.osName = 'unix';
    } else if (navigator.userAgent.indexOf('Win') !== -1) {
      this.osName = 'windows';
    }
  }

  // Activates the tab at the given index.
  activateTab(index) {
    this.tabs[this.activeTabIndex].setAttribute('aria-selected', 'false');
    this.tabs[this.activeTabIndex].setAttribute('tabindex', '-1');
    this.panels[this.activeTabIndex].setAttribute('hidden', '');
    this.tabs[index].setAttribute('aria-selected', 'true');
    this.tabs[index].setAttribute('tabindex', '0');
    this.panels[index].removeAttribute('hidden');
    this.tabs[index].focus();
    this.activeTabIndex = index;
  }

  // Handles clicks on tabs.
  handleTabClick(e) {
    const el = (e.target);
    this.activateTab(Array.prototype.indexOf.call(this.tabs, el));
    this.setInstallTabData(el.id);
  }

  // get version number.
  parseVersionNumber(string) {
    const rx = /(\d+\.)(\d+)(\.\d+)?/g;
    const matches = rx.exec(string);
    if (matches?.[0]) {
      return matches[0];
    } else {
      return '';
    }
  }

}

// Instantiate controller for page event handling.
new DownloadsController();
