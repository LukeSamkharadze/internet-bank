import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ItemEntity } from './models/item.entity';
import { ItemService } from './services/item.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ItemListOptionsService } from './services/item-list-options.service';
import { ItemListOption } from './models/item-list-option.entity';
import { ListStyleEnum } from './models/list-style.enum';
import { generateGuid } from '@shared/shared';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  itemsSubject = new Subject<ItemEntity[]>();

  itemListOptions: ItemListOption[] = this.itemListOptionsService.getItemListOptions();
  items$: Observable<ItemEntity[]> = this.itemsSubject.asObservable();
  optionActiveIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.itemListOptionsService.getDefaultIndex()
  );
  listStyle$: BehaviorSubject<ListStyleEnum> = new BehaviorSubject<
    ListStyleEnum
  >(this.itemListOptionsService.getDefaultClassName());
  uniqueGuide = generateGuid();

  group: FormGroup = new FormGroup({ id: new FormControl('') });

  // @ts-ignore
  get idFormControl(): FormControl {
    return this.group.get('id') as FormControl;
  }

  constructor(
    private itemService: ItemService,
    private itemListOptionsService: ItemListOptionsService
  ) {}

  ngOnInit(): void {
    this.idFormControl.valueChanges
      .pipe(
        debounceTime(700),
        tap((value) => console.log('pre distinct', value)),
        distinctUntilChanged(),
        tap((value) => console.log('post distinct', value)),
        switchMap((value) => {
          return this.itemService.getItems(value);
        }),
        tap((value) => this.itemsSubject.next(value))
      )
      .subscribe();
  }

  activeIndexChange(index: number) {
    this.listStyle$.next(this.itemListOptions[index].className);
  }
}
