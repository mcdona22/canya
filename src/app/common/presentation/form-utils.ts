import { FormControl } from '@angular/forms';

export function onInput(_: Event, control: FormControl, maxLength: number) {
  // console.log(`event`, this.clubName.value);
  const content = control.value!;
  if (content.length > maxLength) {
    control.setValue(content.substring(0, maxLength));
  }
}
