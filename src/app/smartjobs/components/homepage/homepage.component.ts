import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      // Highlight bottom nav links
      let clickEvent = false;
      $('#myCarousel').on('click', '.nav li', () => {
        clickEvent = true;
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
      }).on('slid.bs.carousel', (e ) => {
        if (!clickEvent) {
          const itemIndex = $(e.relatedTarget).index();
          const targetNavItem = $('.nav li[data-slide-to=\'' + itemIndex + '\']');
          $('.nav li').not(targetNavItem).removeClass('active');
          targetNavItem.addClass('active');
        }
        clickEvent = false;
      });
    });
  }

}
