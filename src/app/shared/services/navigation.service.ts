import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string,       // Possible values: link/dropDown/icon/separator/extLink
  name?: string,      // Used as display text for item and title for separator type
  state?: string,     // Router state
  icon?: string,      // Material icon name
  tooltip?: string,   // Tooltip text 
  disabled?: boolean, // If true, item will not be appeared in sidenav.
  sub?: IChildItem[], // Dropdown items
  badges?: IBadge[]
}
interface IChildItem {
  type?: string,
  name: string,       // Display text
  state?: string,     // Router state
  icon?: string,
  sub?: IChildItem[]
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

@Injectable()
export class NavigationService {
  constructor() { }

  iconMenu: IMenuItem[] = [
    // {
    //   name: 'DASHBOARD',
    //   type: 'link',
    //   tooltip: 'Dashboard',
    //   icon: 'dashboard',
    //   state: 'dashboard',
    // //  badges: [{ color: 'accent', value: '100+' }],
    // },
    {
      name: 'サービス',
      type: 'link',
      tooltip: 'Service',
      icon: 'category',
      state: 'service',
   //   badges: [{ color: 'accent', value: '100+' }],
    },
    // {
    //   name: 'ARTISTS',
    //   type: 'link',
    //   tooltip: 'Artists',
    //   icon: 'music_note',
    //   state: 'artists',
    //   badges: [{ color: 'accent', value: '100+' }],
    // },
    {
      name: 'プロジェクト',
      type: 'link',
      tooltip: 'projects',
      icon: 'keyboard_voice',
      state: 'projects',
   //   badges: [{ color: 'accent', value: '100+' }],
    },
    {
      name: 'イベント',
      type: 'link',
      tooltip: 'events',
      icon: 'date_range',
      state: 'events',
   //   badges: [{ color: 'accent', value: '100+' }],
    },
     {
      name: '会社情報',
      type: 'link',
      tooltip: 'company',
      icon: 'library_books',
      state: 'company'
     }
    // {
    //   name: 'DOC',
    //   type: 'extLink',
    //   tooltip: 'Documentation',
    //   icon: 'library_books',
    //   state: 'http://egret-doc.mhrafi.com/'
    // }
  ]

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    this.menuItems.next(this.iconMenu);
  }
}