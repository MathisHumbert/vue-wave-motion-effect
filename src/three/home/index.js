import * as THREE from 'three';

import Media from './Media';
import waveXVertex from '../../shaders/wave-x-vertex.glsl';
import waveXFragment from '../../shaders/wave-x-fragment.glsl';
import revealVertex from '../../shaders/reveal-vertex.glsl';
import revealFragment from '../../shaders/reveal-fragment.glsl';
import waveYVertex from '../../shaders/wave-y-vertex.glsl';
import waveYFragment from '../../shaders/wave-y-fragment.glsl';

export default class Home {
  constructor({ scene, geometry, screen, viewport, textures, scroll }) {
    this.scene = scene;
    this.geometry = geometry;
    this.screen = screen;
    this.viewport = viewport;
    this.textures = textures;
    this.scroll = scroll;

    this.group = new THREE.Group();
  }

  createGallery() {
    this.mediaElements = document.querySelectorAll('.item__fig');

    this.medias = [...this.mediaElements].map((element, index) => {
      let vertex, fragment;

      if (index > 5) {
        vertex = waveYVertex;
        fragment = waveYFragment;
      } else if (index > 2) {
        vertex = revealVertex;
        fragment = revealFragment;
      } else {
        vertex = waveXVertex;
        fragment = waveXFragment;
      }

      return new Media({
        element,
        scene: this.group,
        geometry: this.geometry,
        screen: this.screen,
        viewport: this.viewport,
        fragment: fragment,
        vertex: vertex,
        textures: this.textures,
        scroll: this.scroll,
      });
    });
  }

  /**
   * Animations.
   */
  show() {
    this.createGallery();

    this.scene.add(this.group);

    this.medias.forEach((media) => {
      if (media && media.show) {
        media.show();
      }
    });
  }

  hide() {
    this.medias.forEach((media) => {
      if (media && media.hide) {
        media.hide();
      }
    });

    this.scene.remove(this.group);
  }

  /**
   * Events.
   */
  onResize({ screen, viewport }) {
    if (this.medias) {
      this.medias.forEach((media) => {
        if (media && media.onResize) {
          media.onResize({ screen, viewport });
        }
      });
    }
  }

  /**
   * Loop.
   */
  update({ scroll, time }) {
    if (this.medias) {
      this.medias.forEach((media) => {
        if (media && media.update) {
          media.update({ scroll, time });
        }
      });
    }
  }
}
