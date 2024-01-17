import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';

import Home from './home';
import Slideshow from './slideshow';

export default class Canvas {
  constructor({ template, element, textures }) {
    this.canvasElement = element;
    this.textures = textures;

    this.page = null;
    this.lenis = new Lenis();
    this.clock = new THREE.Clock();

    this.createScene();
    this.createCamera();
    this.createRender();
    this.createGeometry();

    this.onResize();
    this.update();

    this.createHome();
    this.createSlideshow();

    this.onPageChange(template);
  }

  /**
   * THREE.
   */
  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 5;
  }

  createRender() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: this.canvasElement,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 16, 16);
  }

  /**
   * Home.
   */
  createHome() {
    this.home = new Home({
      scene: this.scene,
      geometry: this.geometry,
      screen: this.screen,
      viewport: this.viewport,
      textures: this.textures,
      scroll: this.lenis.scroll,
    });
  }

  /**
   * Slideshow.
   */
  createSlideshow() {
    this.slideshow = new Slideshow({
      scene: this.scene,
      geometry: this.geometry,
      screen: this.screen,
      viewport: this.viewport,
      textures: this.textures,
    });
  }

  /**
   * Events.
   */
  onPageChange(template) {
    if (this.page === '/' && template !== '/') {
      this.home.hide();
    }

    if (this.page === '/slideshow' && template !== '/slideshow') {
      this.slideshow.hide();
    }

    if (this.page !== '/' && template === '/') {
      this.home.show();
    }

    if (this.page !== '/slideshow' && template === '/slideshow') {
      this.slideshow.show();
    }

    this.page = template;
  }

  onResize() {
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera.aspect = this.screen.width / this.screen.height;
    this.camera.updateProjectionMatrix();

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { width, height };

    if (this.home && this.home.onResize) {
      this.home.onResize({ screen: this.screen, viewport: this.viewport });
    }

    if (this.slideshow && this.slideshow.onResize) {
      this.slideshow.onResize({ screen: this.screen, viewport: this.viewport });
    }
  }

  /**
   * Loop.
   */
  update(time) {
    this.lenis.raf(time);

    const elapsedTime = this.clock.getElapsedTime();

    if (this.home && this.home.update) {
      this.home.update({ scroll: this.lenis.scroll, time: elapsedTime });
    }

    if (this.slideshow && this.slideshow.update) {
      this.slideshow.update({ time: elapsedTime });
    }

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.update.bind(this));
  }
}
