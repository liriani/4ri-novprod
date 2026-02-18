class AboutPictureComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = {
      imageSrc: options.imageSrc || 'assets/lirisaikoski.jpg',
      imageAlt: options.imageAlt || 'Liri Saikoski',
      className: options.className || 'about-picture-component',
      ...options
    };
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    const pictureHTML = `
      <div class="${this.options.className}">
        <div class="about-picture-wrapper">
          <img 
            src="${this.options.imageSrc}" 
            alt="${this.options.imageAlt}"
            class="about-picture-img"
            loading="eager"
          />
        </div>
      </div>
    `;

    container.innerHTML = pictureHTML;
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const aboutPicture = new AboutPictureComponent('about-picture-placeholder', {
    imageSrc: 'assets/lirisaikoski.jpg',
    imageAlt: 'Liri Saikoski - Product Designer'
  });
  aboutPicture.render();
});

