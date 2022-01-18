import { Component } from '@angular/core';
import { GroceryItemWithState } from '../../grocery-item/grocery-item.component';

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss'],
})
export class GroceriesComponent {
  items: GroceryItemWithState[] = [
    {
      id: '1',
      name: 'Milch',
      amount: 1,
      targetAmount: 1,
      unit: 'Liter',
      category: 'Getränke',
      imageUrl:
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWlsa3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      state: 'incomplete',
    },
    {
      id: '2',
      name: 'Kaffee',
      amount: 1,
      targetAmount: 1,
      unit: 'Liter',
      category: 'Getränke',
      imageUrl:
        'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      state: 'incomplete',
    },
    {
      id: '3',
      name: 'Eier',
      amount: 1,
      targetAmount: 1,
      unit: 'Stück',
      category: 'Lebensmittel',
      imageUrl:
        'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      state: 'incomplete',
    },
    {
      id: '4',
      name: 'Käse',
      amount: 1,
      targetAmount: 1,
      unit: 'Stück',
      category: 'Lebensmittel',
      imageUrl:
        'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      state: 'incomplete',
    },
  ];

  toggleItemState(item: GroceryItemWithState) {
    const index = this.items.findIndex((i) => i.id === item.id);
    const newState = item.state === 'complete' ? 'incomplete' : 'complete';
    this.items[index] = {
      ...item,
      state: newState,
    };
  }

  onItemDeleted(item: GroceryItemWithState) {
    item.state = 'deleted';
  }

  // async onItemDrag(event: Event) {
  //   // item.state = 'incomplete';
  //   const target = event.target as unknown as IonItemSliding;
  //   const ratio = await target.getSlidingRatio();
  //   const isLeft = ratio < 0;
  //   const abs = Math.abs(ratio);
  //   if (abs > 1.4) {
  //     target.close();
  //     console.log('Triggering');
  //   }
  // }
}
