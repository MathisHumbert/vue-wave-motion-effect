import * as THREE from 'three';
import gsap from 'gsap';

import fragment from '../../shaders/slideshow-fragment.glsl';
import vertex from '../../shaders/slideshow-vertex.glsl';

export default class Media {
  constructor({ element, scene, geometry, screen, viewport, textures }) {
    this.element = element;
    this.scene = scene;
    this.geometry = geometry;
    this.screen = screen;
    this.viewport = viewport;
    this.textures = textures;

    this.navItemElemtents = document.querySelectorAll('.slideshow__nav__item');
    this.imgElements = this.element.querySelectorAll('img');

    this.isVisible = false;
    this.isAnimating = false;
    this.currentIndex = 0;

    this.createMaterial();
    this.createMesh();
    this.createTexture();

    this.onResize({ viewport, screen });

    [...this.navItemElemtents].forEach((item, index) =>
      item.addEventListener('click', () => this.onSwitchTextures(index))
    );
  }

  /**
   * Create.
   */
  createTexture() {
    this.material.uniforms.uImageSize.value = new THREE.Vector2(
      this.imgElements[0].naturalWidth,
      this.imgElements[0].naturalHeight
    );

    this.material.uniforms.uDispTexture.value =
      this.textures['img/disp-02.png'];
    this.material.uniforms.uCurrentTexture.value =
      this.textures[this.imgElements[0].getAttribute('src')];
  }

  createMaterial() {
    this.material = new THREE.RawShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      transparent: true,
      uniforms: {
        uCurrentTexture: { value: null },
        uNextTexture: { value: null },
        uDispTexture: { value: null },
        uMeshSize: { value: new THREE.Vector2(0, 0) },
        uImageSize: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uAlpha: { value: 1 },
      },
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  createBounds() {
    const rect = this.element.getBoundingClientRect();

    this.bounds = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };

    this.updateScale();
    this.updateX();
    this.updateY(this.scroll);

    this.material.uniforms.uMeshSize.value = new THREE.Vector2(
      this.mesh.scale.x,
      this.mesh.scale.y
    );
  }

  /**
   * Update.
   */
  updateScale() {
    this.mesh.scale.x =
      (this.viewport.width * this.bounds.width) / this.screen.width;
    this.mesh.scale.y =
      (this.viewport.height * this.bounds.height) / this.screen.height;
  }

  updateX(x = 0) {
    this.mesh.position.x =
      -this.viewport.width / 2 +
      this.mesh.scale.x / 2 +
      ((this.bounds.left - x) / this.screen.width) * this.viewport.width;
  }

  updateY(y = 0) {
    this.mesh.position.y =
      this.viewport.height / 2 -
      this.mesh.scale.y / 2 -
      ((this.bounds.top - y) / this.screen.height) * this.viewport.height;
  }

  /**
   * Animations.
   */
  show() {
    this.isVisible = true;
  }

  hide() {
    this.scene.remove(this.mesh);
    this.isVisible = false;
  }

  /**
   * Events.
   */
  onResize({ screen, viewport }) {
    this.screen = screen;
    this.viewport = viewport;

    this.createBounds();
  }

  onSwitchTextures(index) {
    if (this.isAnimating) return;

    this.isAnimating = true;

    this.navItemElemtents[this.currentIndex].classList.remove('current');
    this.navItemElemtents[index].classList.add('current');

    this.currentIndex = index;

    this.material.uniforms.uNextTexture.value =
      this.textures[this.imgElements[index].getAttribute('src')];

    const tl = gsap.timeline({
      onComplete: () => {
        this.isAnimating = false;
        this.material.uniforms.uCurrentTexture.value =
          this.textures[this.imgElements[index].getAttribute('src')];
      },
    });

    tl.fromTo(
      this.material.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 2, ease: 'expo.inOut' }
    );
  }

  /**
   * Loop.
   */
  update({ time }) {
    if (!this.isVisible) return;

    this.material.uniforms.uTime.value = time;
  }
}
