import cx from 'classnames';
import { AriaRole, ComponentProps } from 'react';
import { Typography } from '../Typography';
import * as classes from './TextLink.css';
import { Filter } from '../../utils';

export interface TextLinkProps {
  'data-test-id'?: string;
  /**
   * The text content of the Body.
   * @type string
   * @required
   */
  children: string;
  /**
   * The color of the Body.
   * @type ComponentProps<typeof Typography>['color'];
   */
  color?: ComponentProps<typeof Typography>['color'];
  /**
   * The custom className.
   * @type string
   */
  className?: string;
  /**
   * The font size of the TextLink.
   * @type  "s" | "m"
   * @required
   */
  size: 's' | 'm';
  /**
   * The component type.
   * @type 'span' | 'p' | 'label'
   * @default "span"
   */
  component?: keyof Pick<React.JSX.IntrinsicElements, 'span' | 'p' | 'a'>;
  /**
   * The TextLink role
   * @type 'link' | 'none'
   * @default "none"
   */
  role?: Filter<AriaRole, 'link' | 'none'>;
  /**
   * The title of the TextLink.
   * @type string
   * @optional
   */
  title?: string;
}

export function TextLink(props: TextLinkProps) {
  return (
    <Typography
      role={props.role ?? 'link'}
      className={cx(classes.base, classes.size[props.size], props.className)}
      data-test-id={props['data-test-id']}
      component={props.component ?? 'span'}
      color={props.color}
      title={props.title}
    >
      {props.children}
    </Typography>
  );
}
