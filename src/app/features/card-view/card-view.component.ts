import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardViewComponent implements OnInit {
  path$: Observable<string>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.path$ = this.route.url.pipe(map((v) => v[0].path));
  }
}
