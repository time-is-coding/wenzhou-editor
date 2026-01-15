import "slate";

declare module "slate" {
  interface CustomText {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    text: string;
  }
}
