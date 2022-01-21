import { Component, Input } from '@angular/core';

type GroceryItemState = 'incomplete' | 'complete' | 'deleted';

interface GroceryItem {
  id: string;
  name: string;
  amount: number;
  targetAmount: number;
  unit: string;
  category: string;
  imageUrl: string;
}

export type GroceryItemWithState = GroceryItem & { state: GroceryItemState };

@Component({
  selector: 'app-grocery-item',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.scss'],
})
export class GroceryItemComponent {
  private _item?: GroceryItemWithState;

  @Input()
  set item(item: GroceryItemWithState | undefined) {
    this._item = item;
    this.isStriked = this.item?.state === 'complete';
  }

  get item(): GroceryItemWithState | undefined {
    return this._item;
  }

  private _isStriked = false;

  get isStriked(): boolean {
    return this._isStriked;
  }

  set isStriked(value: boolean) {
    this._isStriked = value;
  }
}
