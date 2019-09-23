import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import {
  TreeItemFolderState,
  TreeItem,
  LoadChildrenEventArgs
} from '@simpl/marengo-ng';
import { CurrencyService } from './currency.service';

@Component({
  templateUrl: './object-view.component.html',
  styleUrls: ['./object-view.component.scss']
})
export class ObjectViewComponent {
  breadcrumbItems = [
    { title: 'Root', link: '/' },
    { title: 'Object View', link: ['/', 'objectView'] },
    { title: 'Extra Item', link: '.' }
  ];

  secondaryNavItems = [
    { title: 'item 1', link: '/main/objectView/item1' },
    { title: 'item 2', link: '/main/objectView/item2' },
    { title: 'item 3', link: '/main/objectView/item3' }
  ];

  statusItems = [
    { title: 'WIDGETS.DEVICE_STATUS', status: 'success', value: 'Operational' },
    { title: 'WIDGETS.EVENTS', status: 'danger', value: 3 },
    { title: 'WIDGETS.ANSWER', status: 'info', value: 42 }
  ];

  treeViewItems: TreeItem[] = [
    new TreeItem('item 1', TreeItemFolderState.Collapsed, undefined, []),
    new TreeItem('item 2', TreeItemFolderState.Collapsed, undefined, []),
    new TreeItem('item 3', TreeItemFolderState.Collapsed, undefined, [])
  ];

  currencies: Observable<any[]>;

  constructor(private currencyService: CurrencyService) {
    this.currencies = currencyService.getCurrencies();
  }

  treeItemClicked(event: TreeItem) {
    console.log('Clicked on tree item ' + event.label);
  }

  loadChildren(event: LoadChildrenEventArgs) {
    event.callback(event.treeItem, [
      new TreeItem('item 1', TreeItemFolderState.Collapsed, event.treeItem, []),
      new TreeItem('item 2', TreeItemFolderState.Collapsed, event.treeItem, []),
      new TreeItem('item 3', TreeItemFolderState.Collapsed, event.treeItem, [])
    ]);
  }
}
