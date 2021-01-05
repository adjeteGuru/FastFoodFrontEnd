import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  //add @HostBinding to allow the property to bind 'class.open' to wherever it is applied
@HostBinding('class.open') isOpen = false;

//to listing to a click
@HostListener('document:click',['$event']) toggleOpen(event: Event){
this.isOpen = this.elmRef.nativeElement.contains(event.target) ? !this.isOpen : false;
};

  constructor(private elmRef: ElementRef) { }

}
