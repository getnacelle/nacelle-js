interface ShopifyErrorLocation {
  line: number;
  column: number;
}

interface ShopifyErrorExtensionProblems {
  path: (string | number)[];
  explanation: string;
  message?: string;
}

export interface ShopifyError {
  message: string;
  locations: ShopifyErrorLocation[];
  extensions: {
    value: string | unknown;
    problems: ShopifyErrorExtensionProblems[];
  };
}
