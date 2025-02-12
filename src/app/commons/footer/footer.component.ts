import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { wording } from 'src/app/utils/wording';
import { Subject, takeUntil } from 'rxjs';
import { screenSizes } from 'src/app/utils/data-utils';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { Screen } from 'src/app/core/models/Screen';

/**
 * Shared Footer.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  // private properties used only in the component.
  private _destroyed = new Subject<void>();
  private _size:string = 'Unknown';
  private _isPortrait:boolean = true;
  private _screenSizes = screenSizes;

  // public properties binded to the html template.
  public environment = environment;
  public wording = wording;
  public screen!:Screen;
  
  /**
   * Dependency injection.
   * @param _responsive Responsive service to observe screen size changes.
   */
  constructor(private _responsive: ResponsiveService) {}

  /**
   * Intialization of the component with subscription to the responsive service.
   */  
  ngOnInit(): void {
    this._responsive.observeScreenSize()
    .pipe(takeUntil(this._destroyed))
    .subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this._size = this._screenSizes.get(query) ?? 'Unknown';
          this.screen = new Screen(this._size, this._isPortrait);
        }
      }
    });
    this._responsive.observeOrientation()
    .pipe(takeUntil(this._destroyed))
    .subscribe(result => { 
      this._isPortrait = result.matches;
      this.screen = new Screen(this._size, this._isPortrait);
    });
  }

  /**
   * Component destroyed with notifier unsubscription.
   */
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /**
   * getters for style classes.
   */
  get footer() {
    return { 'footer': true, 'small-footer': this.screen?.isSmall, 'medium-footer': this.screen?.isMedium, 'large-footer': this.screen?.isLarge }
  }
}
