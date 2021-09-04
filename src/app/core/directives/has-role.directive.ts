import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[];

  constructor(private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>, 
    private authService: AuthService) {}

    ngOnInit(): void {
      const isAuthorized = this.authService.isAuthorized('Role', this.appHasRole);
      if (!isAuthorized) {
        this.viewContainerRef.clear();
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
}
