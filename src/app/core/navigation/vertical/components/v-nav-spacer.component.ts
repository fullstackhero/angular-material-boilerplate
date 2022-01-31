import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {NavService} from '../../navigation.service';
import {NavItem} from '../../nav-item';
import {VNavComponent} from '../v-nav.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vnav-spacer',
  template: `
    <div class="vnav-item-spacer" [ngClass]="item.classes?.wrapper"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VNavSpacerComponent implements OnInit, OnDestroy {
  @Input() item: NavItem;
  @Input() name: string;

  private vNavComponent: VNavComponent;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private navService: NavService
  ) {
  }
  ngOnInit(): void {
    this.vNavComponent = this.navService.getComponent(this.name);
    this.vNavComponent.onRefreshed.pipe(takeUntil(this.unsubscribeAll)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
