import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Copyright 2022 <b><a href="https://www.elementalbookcovers.com" target="_blank">Elemental Book Covers</a></b>
    </span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/ElementalBookCovers/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.instagram.com/elementalbookcovers/" target="_blank" class="ion ion-social-instagram"></a>
    </div>
  `,
})
export class FooterComponent {
}
