import { event as gaEvent } from "nextjs-google-analytics";

export type ActionEcommerce =
  | "add_payment_info"
  | "add_to_cart"
  | "add_to_wishlist"
  | "begin_checkout"
  | "checkout_progress"
  | "purchase"
  | "refund"
  | "remove_from_cart"
  | "set_checkout_option";

export type ActionEngagement =
  | "generate_lead"
  | "login"
  | "search"
  | "select_content"
  | "share"
  | "sign_up"
  | "view_item"
  | "view_item_list"
  | "view_promotion"
  | "view_search_results"
  | "contact";

export type Action = ActionEcommerce | ActionEngagement;

type EventOptions = Record<string, object | string | boolean | number> & {
  category: "ecommerce" | "engagement";
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  userId?: string;
};

type EOptionEcommerce = {
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  userId?: string;
};

type EOptionEngagement = {
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  userId?: string;
};

export const event = (action: Action, options: EventOptions) =>
  gaEvent(action, options);

export const eEcommerce = (
  action: ActionEcommerce,
  options: EOptionEcommerce
) => event(action, { ...options, category: "ecommerce" });

export const eEngagement = (
  action: ActionEngagement,
  options: EOptionEngagement
) => event(action, { ...options, category: "engagement" });

export const eEngagementEvents = {
  eGenerateLead: (options: EOptionEngagement) =>
    eEngagement("generate_lead", options),
  eLogin: (options: EOptionEngagement) => eEngagement("login", options),
  eSearch: (options: EOptionEngagement) => eEngagement("search", options),
  eSelectContent: (options: EOptionEngagement) =>
    eEngagement("select_content", options),
  eShare: (options: EOptionEngagement) => eEngagement("share", options),
  eSignUp: (options: EOptionEngagement) => eEngagement("sign_up", options),
  eViewItem: (options: EOptionEngagement) => eEngagement("view_item", options),
  eViewItemlist: (options: EOptionEngagement) =>
    eEngagement("view_item_list", options),
  eViewPromotion: (options: EOptionEngagement) =>
    eEngagement("view_promotion", options),
  eViewSearchResults: (options: EOptionEngagement) =>
    eEngagement("view_search_results", options),
  eContact: (options: EOptionEngagement) => eEngagement("contact", options),
};

export const eEcommerceEvents = {
  eAddPaymentInfo: (options: EOptionEcommerce) =>
    eEcommerce("add_payment_info", options),
  eAddToCart: (options: EOptionEcommerce) => eEcommerce("add_to_cart", options),
  eAddToWishlist: (options: EOptionEcommerce) =>
    eEcommerce("add_to_wishlist", options),
  eBeginCheckout: (options: EOptionEcommerce) =>
    eEcommerce("begin_checkout", options),
  eCheckoutProgress: (options: EOptionEcommerce) =>
    eEcommerce("checkout_progress", options),
  ePurchase: (options: EOptionEcommerce) => eEcommerce("purchase", options),
  eRefund: (options: EOptionEcommerce) => eEcommerce("refund", options),
  eRemoveFromCart: (options: EOptionEcommerce) =>
    eEcommerce("remove_from_cart", options),
  eSetCheckoutOption: (options: EOptionEcommerce) =>
    eEcommerce("set_checkout_option", options),
};

export const eEvents = {
  ...eEngagementEvents,
  ...eEcommerceEvents,
};

export default eEvents;
