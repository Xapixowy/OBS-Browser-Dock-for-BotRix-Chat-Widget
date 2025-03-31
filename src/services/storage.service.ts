export enum StorageKeys {
  chatLink = 'chatLink',
  backgroundColor = 'backgroundColor',
}

export class StorageService {
  static #instance: StorageService;

  private constructor() {}

  static get instance(): StorageService {
    if (!this.#instance) {
      this.#instance = new StorageService();
    }
    return this.#instance;
  }

  get chatLink(): string | null {
    return this.getItem(StorageKeys.chatLink);
  }

  set chatLink(value: string | undefined | null) {
    if (value === undefined || value === null) {
      this.removeItem(StorageKeys.chatLink);
      return;
    }
    this.setItem(StorageKeys.chatLink, value);
  }

  get backgroundColor(): string | null {
    return this.getItem(StorageKeys.backgroundColor);
  }

  set backgroundColor(value: string | undefined | null) {
    if (value === undefined || value === null) {
      this.removeItem(StorageKeys.backgroundColor);
      return;
    }
    this.setItem(StorageKeys.backgroundColor, value);
  }

  private getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  private setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
