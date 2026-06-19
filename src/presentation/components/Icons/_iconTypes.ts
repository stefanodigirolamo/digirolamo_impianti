import IconSet from './IconSet';

export type IconProps = {
  'data-test-id'?: string;
  /**
   * Define the id of the Icon.
   * @type string
   * @required
   */
  id?: string;
  /**
   * Define the size of the Icon.
   * @type "s" | "m" | "l" | "xl" | "full"
   * @required
   */
  size: 's' | 'm' | 'l' | 'xl' | 'xxl' | 'full';
  /**
   * Define the custom className.
   * @type string
   * @optional
   */
  className?: string;
  /**
   * Define the custom style of the Icon.
   * @type React.CSSProperties
   * @optional
   */
  style?: React.CSSProperties;
  /**
   * Define the fill of the Icon.
   * @type string
   * @optional
   */
  fill?: string;
  /**
   * Define the custom width of the Icon.
   * @type number | string
   * @optional
   */
  width?: number | string;
  /**
   * Define the custom height of the Icon.
   * @type number | string
   * @optional
   */
  height?: number | string;
  /**
   * Define the aria value for checked state.
   * @type boolean | "false" | "mixed" | "true"
   * @optional
   */
  'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
  /**
   * Define the aria value for disabled state.
   * @type boolean | "false" | "mixed" | "true"
   * @optional
   */
  'aria-hidden'?: boolean | 'false' | 'mixed' | 'true';
  /**
   * Define the aria value for hidden state.
   * @type boolean | "false" | "mixed" | "true"
   * @optional
   */
  'aria-disabled'?: 'true' | 'false';
  /**
   * Define the onClick event.
   * @type () => any
   * @optional
   */
  onClick?: () => any;
};

export type IconSetType = {
  [keys in keyof typeof IconSet]: (props: IconProps) => React.JSX.Element;
};
