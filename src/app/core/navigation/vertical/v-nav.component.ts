import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ScrollStrategy, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, ReplaySubject, Subject, Subscription, takeUntil} from 'rxjs';
import {NavService} from '../navigation.service';
import {NavItem} from '../nav-item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vnav',
  templateUrl: './v-nav.component.html',
  styleUrls: ['./v-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'vNav'
})
export class VNavComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() autoCollapse = true;
  @Input() inner = false;
  @Input() name = `nav${new Date().getTime()}`;
  @Input() navigation: NavItem[];
  @Input() opened = true;
  @Input() transparentOverlay = false;
  @Output() readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  activeAsideItemId: string | null = null;
  onItemCollapsed: ReplaySubject<NavItem> = new ReplaySubject<NavItem>(1);
  onItemExpanded: ReplaySubject<NavItem> = new ReplaySubject<NavItem>(1);
  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  @ViewChild('navigationContent') private navContentEl: ElementRef;
  private hovered = false;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private elementRef: ElementRef,
              private renderer2: Renderer2,
              private router: Router,
              private navService: NavService) {
    console.log(this.navigation);
  }

  @HostBinding('style') get styleList(): any {
    return {visibility: this.opened ? 'visible' : 'hidden'};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('navigation' in changes) {
      this.changeDetectorRef.markForCheck();
    }
    if ('opened' in changes) {
      this.opened = coerceBooleanProperty(changes.opened.currentValue);
      this._toggleOpened(this.opened);
    }
  }

  ngOnInit(): void {
    if (this.name === '') {
      this.name = `nav${new Date().getTime()}`;
    }
    this.navService.addComponent(this.name, this);

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.navContentEl) {
        return;
      }
    });
  }

  ngOnDestroy(): void {
    this.close();
    this.navService.removeComponent(this.name);
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  refresh(): void {
    this.changeDetectorRef.markForCheck();
    this.onRefreshed.next(true);
  }

  open(): void {
    if (this.opened) {
      return;
    }
    this._toggleOpened(true);
  }

  close(): void {
    if (!this.opened) {
      return;
    }
    this._toggleOpened(false);
  }

  toggle(): void {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  @HostListener('mouseenter')
  private _onMouseenter(): void {
    this.hovered = true;
  }

  @HostListener('mouseleave')
  private _onMouseleave(): void {
    this.hovered = false;
  }

  private _toggleOpened(open: boolean): void {
    this.opened = open;
    this.openedChanged.next(open);
  }
}
