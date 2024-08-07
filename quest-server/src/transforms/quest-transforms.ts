import { AocTransform, AocTransformArgs } from '@atlantis-of-code/aoc-server';
import { Customer } from '../entities/customers/customer';

export class QuestTransforms {

  @AocTransform
  listTelephoneNumbers(args: AocTransformArgs<Customer>) {
    const phone1 = args.value.phone1;
    const phone2 = args.value.phone2;
    if (phone1 && phone2) {
      return `${phone1} - ${phone2}`;
    } else if (phone2) {
      return phone2;
    } else {
      return phone1 || ''; // In case both strings are empty
    }
  }

}
