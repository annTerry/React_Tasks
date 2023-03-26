export interface Card {
  bookName: string;
  author: string;
  popularity: number;
  year: string;
  translation?: string;
  cover: string;
  pages: number;
  illustration?: string;
  quantity: number;
  state?: string;
}

export interface CardProperty {
  viewName: string;
  value?: string | number;
}

export interface Popularity {
  value: number;
}

export interface Simple {
  value: string;
}

export interface Order {
  name: string;
  quantity: number;
  presents: string[];
  send: string;
  country: string;
  address: string;
  invoice: string;
  date: string;
}

export type StateOrder = {
  orders: Order[];
};

export interface OrderData {
  saveOrder: (data: Order) => void;
}

export type OneFieldObject = {
  ref?: React.RefObject<HTMLInputElement> | React.RefObject<HTMLSelectElement>;
  refs?: { [key: string]: React.RefObject<HTMLInputElement> };
  check: () => boolean;
};

export type OrderFormsType = {
  errors: { [key: string]: string };
};

export class FieldObject {
  name: OneFieldObject = {
    check() {
      return !!this.ref && !!this.ref.current?.value;
    },
  };
  date: OneFieldObject = {
    check() {
      return !!this.ref && !!this.ref.current?.value;
    },
  };
  quantity: OneFieldObject = {
    check() {
      const data = this.ref?.current?.value;
      return !!(data && +data > 0 && +data < 10);
    },
  };
  presents: OneFieldObject = {
    check() {
      const collectionRefs = this.refs;
      if (collectionRefs) {
        const checkedRefs = Object.values(collectionRefs).filter(
          (refData) => refData.current?.checked
        );
        return checkedRefs.length > 0;
      }
      return false;
    },
  };
  send: OneFieldObject = {
    check() {
      const collectionRefs = this.refs;
      if (collectionRefs) {
        const checkedRefs = Object.values(collectionRefs).filter(
          (refData) => refData.current?.checked
        );
        return checkedRefs.length > 0;
      }
      return false;
    },
  };
  country: OneFieldObject = {
    check() {
      return !!this.ref && !!this.ref.current?.value;
    },
  };
  address: OneFieldObject = {
    check() {
      return !!this.ref && !!this.ref.current?.value;
    },
  };
  invoice: OneFieldObject = {
    check() {
      return !!this.ref && !!this.ref.current?.value;
    },
  };
}
