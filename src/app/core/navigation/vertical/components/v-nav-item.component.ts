import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavService } from '../../navigation.service';
import { NavItem } from '../../nav-item';
import { VNavComponent } from '../v-nav.component';


@Component({
  // tslint:disable-next-line:component-selector
    selector: 'vnav-item',
    templateUrl: './v-nav-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VNavItemComponent implements OnInit, OnDestroy {
    @Input() item: NavItem;
    @Input() name: string;

    isActiveMatchOptions: IsActiveMatchOptions;
    private vNavComponent: VNavComponent;
    private unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private navService: NavService,

    ) {




        this.isActiveMatchOptions = {
            paths: 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored',
            queryParams: 'subset'
        }
    }




    ngOnInit(): void {



        this.isActiveMatchOptions =
            this.item.isActiveMatchOptions ?? this.item.exactMatch
                ? {
                    paths: 'exact',
                    fragment: 'ignored',
                    matrixParams: 'ignored',
                    queryParams: 'exact'
                }
                : {
                    paths: 'subset',
                    fragment: 'ignored',
                    matrixParams: 'ignored',
                    queryParams: 'subset'
                };


        this.vNavComponent = this.navService.getComponent(this.name);


        this.changeDetectorRef.markForCheck();


        this.vNavComponent.onRefreshed.pipe(
            takeUntil(this.unsubscribeAll)
        ).subscribe(() => {


            this.changeDetectorRef.markForCheck();
        });
    }


    ngOnDestroy(): void {

        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
    }
}
