/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "php-unserialize" {
  // Define the types for the module exports here
  export function unserialize(input: string): any;
  export function serialize(input: any): string;
}
