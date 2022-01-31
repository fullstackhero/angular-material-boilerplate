import {IsActiveMatchOptions} from '@angular/router';

export interface NavItem {
  id?: string;
  title?: string;
  subtitle?: string;
  type:
    | 'item'
    | 'collapsable'
    | 'divider'
    | 'group'
    | 'spacer';
  hidden?: (item: NavItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  externalLink?: boolean;
  target?: string;
  exactMatch?: boolean;
  isActiveMatchOptions?: IsActiveMatchOptions;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  children?: NavItem[];
}


