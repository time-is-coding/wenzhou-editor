import "slate";

// 获取 CustomText 的所有键的联合类型
export type CustomTextKeys = keyof CustomText;
declare module "slate" {
  interface CustomText {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    text: string;
  }
}
