const Classes = /\.(?:[-\w\u{0080}-\u{FFFF}]|\\.)+/u;
const Ids = /#(?:[-\w\u{0080}-\u{FFFF}]|\\.)+/u;
const Attributes = /\[\s*((?:(?:\*|[-\w]*)\|)?(?:[-\w\u{0080}-\u{FFFF}]+))/gu;
const selectorObservationSettings: any = {};

export default class Utils {
  static sleep = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  static getObservationSettingsForSelector(selector: string) {
    let settings = selectorObservationSettings[selector];

    if (settings) {
      return settings;
    }

    settings = selectorObservationSettings[selector] = {
      attributes: true,
      subtree: true,
      childList: true,
    };

    let attributeFilter = [];
    const attributes = selector.matchAll(Attributes);

    for (const [, attribute] of attributes) {
      if (attribute.startsWith('*') || attribute.startsWith('|')) {
        return settings;
      }

      attributeFilter.push(attribute.replace('|', ':'));
    }

    if (Classes.test(selector)) {
      attributeFilter.push('class');
    }

    if (Ids.test(selector)) {
      attributeFilter.push('id');
    }

    if (attributeFilter.length === 0) {
      settings.attributes = false;
    } else {
      settings.attributeFilter = attributeFilter;
    }

    return settings;
  }

  static async waitForElement(selector: string) {
    return new Promise((resolve) => {
      const timeout = 5000;
      const scope = document;
      const element = scope.querySelector(selector);

      if (element !== null) {
        resolve(element);
        return;
      }

      let timer: any = null;

      const observer = new MutationObserver(() => {
        const node = scope.querySelector(selector);

        if (node !== null) {
          clearTimeout(timer);
          observer.disconnect();
          resolve(node);
        }
      });

      observer.observe(
        scope,
        Utils.getObservationSettingsForSelector(selector),
      );

      timer = setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeout);
    });
  }
}
