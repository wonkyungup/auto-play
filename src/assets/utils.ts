import { waitForTheElement } from 'wait-for-the-element';
import Defs from './constatns';

export default class Utils {
  static sleep = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  static async waitForElement(element: string) {
    const ele = await waitForTheElement(element, {
      timeout: Defs.TIMEOUT_AWAIT_ELEMENT,
    });

    if (ele) {
      return ele;
    }
  }
}
