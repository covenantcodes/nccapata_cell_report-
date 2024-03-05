interface EventBus {
    on<T>(event: string, callback: (data: T) => void): void;
    dispatch<T>(event: string, data: T): void;
    remove<T>(event: string, callback: (data: T) => void): void;
  }
  
  const eventBus: EventBus = {
    on<T>(event: string, callback: (data: T) => void) {
      document.addEventListener(event, (e: Event) => {
        if (e instanceof CustomEvent) {
          callback(e.detail as T);
        }
      });
    },
    dispatch<T>(event: string, data: T) {
      document.dispatchEvent(new CustomEvent<T>(event, { detail: data }));
    },
    remove<T>(event: string, callback: (data: T) => void) {
      document.removeEventListener(event, callback as EventListener);
    },
  };
  
  export default eventBus;
  