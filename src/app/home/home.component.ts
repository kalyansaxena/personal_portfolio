import { Component, OnInit } from '@angular/core';
import * as M from '../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  textElement: any;
  words: any;
  wait: number;
  isDeleting = false;
  txt = '';
  wordIndex = 0;

  constructor() {}

  ngOnInit(): void {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, {
      edge: 'right',
    });

    this.typeInit();
    this.type();
  }

  public typeInit() {
    this.textElement = document.querySelector('.txt-type');
    this.words = JSON.parse(this.textElement.getAttribute('data-words'));
    this.wait = parseInt(this.textElement.getAttribute('data-wait'), 10);
  }

  public type() {
    const current = this.wordIndex % this.words.length;
    const fullText = this.words[current];
    // check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullText.substr(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullText.substr(0, this.txt.length + 1);
    }

    this.textElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullText) {
      this.isDeleting = true;
      typeSpeed = this.wait;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
