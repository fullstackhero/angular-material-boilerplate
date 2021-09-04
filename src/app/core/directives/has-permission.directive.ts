import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit{
  @Input() appHasPermission: string[];

  constructor(private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>, 
    private authService: AuthService) {}

    ngOnInit(): void {
      const isAuthorized = this.authService.isAuthorized('Permission', this.appHasPermission);
      if (!isAuthorized) {
        this.viewContainerRef.clear();
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
}
