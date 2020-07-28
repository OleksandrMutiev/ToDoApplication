import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { slider } from '../../shared/route.animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [slider],
})
export class LayoutComponent implements AfterViewChecked {
  constructor(
    private spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef,
  ) {}

  public getAnimation(outlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      // tslint:disable-next-line
      outlet.activatedRouteData['animation']
    );
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
