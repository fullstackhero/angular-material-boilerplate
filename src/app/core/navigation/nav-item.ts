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
  target?:
    | '_blank'
    | '_self'
    | '_parent'
    | '_top'
    | string;
  exactMatch?: boolean;
  isActiveMatchOptions?: IsActiveMatchOptions;
  function?: (item: NavItem) => void;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: NavItem[];
  meta?: any;
}


