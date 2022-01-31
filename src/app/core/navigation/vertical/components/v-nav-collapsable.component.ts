import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {BooleanInput} from '@angular/cdk/coercion';
import {filter, Subject, takeUntil} from 'rxjs';
import {NavService} from '../../navigation.service';
import {NavItem} from '../../nav-item';
import {VNavComponent} from '../v-nav.component';

@Component({  // tslint:disable-next-line:component-selector
  selector: 'vnav-collapsable',
  templateUrl: './v-nav-collapsable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VNavCollapsableComponent implements OnInit, OnDestroy {
  @Input() autoCollapse: boolean;
  @Input() item: NavItem;
  @Input() name: string;
  isCollapsed = true;
  isExpanded = false;
  private vNavComponent: VNavComponent;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router, private navService: NavService) {
  }

  @HostBinding('class') get classList(): any {
    return {'vnav-item-collapsed': this.isCollapsed, 'vnav-item-expanded': this.isExpanded};
  }

  ngOnInit(): void {
    this.vNavComponent = this.navService.getComponent(this.name);
    if (this._hasActiveChild(this.item, this.router.url)) {
      this.expand();
    } else {
      if (this.autoCollapse) {
        this.collapse();
      }
    }
    this.vNavComponent.onItemCollapsed.pipe(takeUntil(this.unsubscribeAll)).subscribe((collapsedItem) => {
      if (collapsedItem === null) {
        return;
      }
      if (this._isChildrenOf(collapsedItem, this.item)) {
        this.collapse();
      }
    });
    if (this.autoCollapse) {
      this.vNavComponent.onItemExpanded.pipe(takeUntil(this.unsubscribeAll)).subscribe((expandedItem) => {
        if (expandedItem === null) {
          return;
        }
        if (this._isChildrenOf(this.item, expandedItem)) {
          return;
        }
        if (this._hasActiveChild(this.item, this.router.url)) {
          return;
        }
        if (this.item === expandedItem) {
          return;
        }
        this.collapse();
      });
    }
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntil(this.unsubscribeAll)).subscribe((event: NavigationEnd) => {
      if (this._hasActiveChild(this.item, event.urlAfterRedirects)) {
        this.expand();
      } else {
        if (this.autoCollapse) {
          this.collapse();
        }
      }
    });
    this.vNavComponent.onRefreshed.pipe(takeUntil(this.unsubscribeAll)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  collapse(): void {
    if (this.item.disabled) {
      return;
    }
    if (this.isCollapsed) {
      return;
    }
    this.isCollapsed = true;
    this.isExpanded = !this.isCollapsed;
    this.changeDetectorRef.markForCheck();
    this.vNavComponent.onItemCollapsed.next(this.item);
  }

  expand(): void {
    if (this.item.disabled) {
      return;
    }
    if (!this.isCollapsed) {
      return;
    }
    this.isCollapsed = false;
    this.isExpanded = !this.isCollapsed;
    this.changeDetectorRef.markForCheck();
    this.vNavComponent.onItemExpanded.next(this.item);
  }

  toggleCollapsable(): void {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _hasActiveChild(item: NavItem, currentUrl: string): boolean {
    const children = item.children;
    if (!children) {
      return false;
    }
    for (const child of children) {
      if (child.children) {
        if (this._hasActiveChild(child, currentUrl)) {
          return true;
        }
      }
      if (child.link && this.router.isActive(child.link, child.exactMatch || false)) {
        return true;
      }
    }
    return false;
  }

  private _isChildrenOf(parent: NavItem, item: NavItem): boolean {
    const children = parent.children;
    if (!children) {
      return false;
    }
    if (children.indexOf(item) > -1) {
      return true;
    }
    for (const child of children) {
      if (child.children) {
        if (this._isChildrenOf(child, item)) {
          return true;
        }
      }
    }
    return false;
  }
}
