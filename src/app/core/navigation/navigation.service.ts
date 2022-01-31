import {Injectable} from '@angular/core';
import {NavItem} from './nav-item';

@Injectable()
export class NavService {
  private registeredComponents: Map<string, any> = new Map<string, any>();
  private registeredNavigations: Map<string, NavItem[]> = new Map<string, any>();

  constructor() {
  }

//#region Component Registeration
  addComponent(name: string, component: any): void {
    this.registeredComponents.set(name, component);
  }

  removeComponent(name: string): void {
    this.registeredComponents.delete(name);
  }

  getComponent<T>(name: string): T {
    return this.registeredComponents.get(name);
  }

//#endregion

//#region Navigation Registeration
  storeNavigation(key: string, navigation: NavItem[]): void {
    this.registeredNavigations.set(key, navigation);
  }

  getNavigation(key: string): NavItem[] {
    return this.registeredNavigations.get(key) ?? [];
  }

  deleteNavigation(key: string): void {
    if (!this.registeredNavigations.has(key)) {
      console.warn(`Navigation with the key '${key}' does not exist in the store.`);
    }
    this.registeredNavigations.delete(key);
  }

  getFlatNavigation(navigation: NavItem[], flatNavigation: NavItem[] = []): NavItem[] {
    for (const item of navigation) {
      if (item.type === 'item') {
        flatNavigation.push(item);
        continue;
      } else if (item.children) {
        this.getFlatNavigation(item.children, flatNavigation);
      }
    }
    return flatNavigation;
  }

//#endregion

  getItem(id: string, navigation: NavItem[]): NavItem | null {
    for (const item of navigation) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const childItem = this.getItem(id, item.children);
        if (childItem) {
          return childItem;
        }
      }
    }
    return null;
  }

  getItemParent(id: string, navigation: NavItem[], parent: NavItem[] | NavItem): NavItem[] | NavItem | null {
    for (const item of navigation) {
      if (item.id === id) {
        return parent;
      }
      if (item.children) {
        const childItem = this.getItemParent(id, item.children, item);
        if (childItem) {
          return childItem;
        }
      }
    }
    return null;
  }
}
