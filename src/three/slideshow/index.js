import * as THREE from 'three';

import Media from './Media';

export default class Slideshow {
  constructor({ scene, geometry, screen, viewport, textures }) {
    this.scene = scene;
    this.geometry = geometry;
    this.screen = screen;
    this.viewport = viewport;
    this.textures = textures;

    this.group = new THREE.Group();
  }

  createMedia() {
    this.media = new Media({
      element: document.querySelector('.slideshow__gallery'),
      scene: this.group,
      geometry: this.geometry,
      screen: this.screen,
      viewport: this.viewport,
      textures: this.textures,
    });
  }

  /**
   * Animations.
   */
  show() {
    this.createMedia();

    this.scene.add(this.group);

    this.media.show();
  }

  hide() {
    this.media.hide();

    this.scene.remove(this.group);
  }

  /**
   * Events.
   */
  onResize({ screen, viewport }) {
    if (this.media && this.media.onResize) {
      this.media.onResize({ screen, viewport });
    }
  }

  /**
   * Loop.
   */
  update({ time }) {
    if (this.media && this.media.update) {
      this.media.update({ time });
    }
  }
}
