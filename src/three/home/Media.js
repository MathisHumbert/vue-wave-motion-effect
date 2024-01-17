import * as THREE from 'three';
import gsap from 'gsap';

export default class Media {
  constructor({
    element,
    scene,
    geometry,
    screen,
    viewport,
    fragment,
    vertex,
    textures,
    scroll,
  }) {
    this.element = element;
    this.scene = scene;
    this.geometry = geometry;
    this.screen = screen;
    this.viewport = viewport;
    this.fragment = fragment;
    this.vertex = vertex;
    this.textures = textures;
    this.scroll = scroll;

    this.isVisible = false;

    this.createTexture();
    this.createMaterial();
    this.createMesh();

    this.onResize({ viewport, screen });

    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  /**
   * Create.
   */
  createTexture() {
    const imageElement = this.element.querySelector('img');
    this.texture = this.textures[imageElement.getAttribute('src')];
  }

  createMaterial() {
    this.material = new THREE.RawShaderMaterial({
      fragmentShader: this.fragment,
      vertexShader: this.vertex,
      transparent: true,
      uniforms: {
        uTexture: { value: this.texture },
        uTime: { value: 0 },
        uHover: { value: 0 },
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
      top: rect.top + this.scroll,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };

    this.updateScale();
    this.updateX();
    this.updateY(this.scroll);
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

  onMouseEnter() {
    gsap.to(this.material.uniforms.uHover, { value: 1, ease: 'sine.out' });
  }

  onMouseLeave() {
    gsap.to(this.material.uniforms.uHover, { value: 0, ease: 'sine.out' });
  }

  /**
   * Loop.
   */
  update({ scroll, time }) {
    if (!this.isVisible) return;

    this.material.uniforms.uTime.value = time;

    this.updateY(scroll);

    this.scroll = scroll;
  }
}
