export type Message =
    | {
          name: 'subscribe';
          data: {
              listId: string;
              email: string;
          };
      }
    | {
          name: 'unsubscribe';
          data: {
              listId: string;
              email: string;
          };
      };
