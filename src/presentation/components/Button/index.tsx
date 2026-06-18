import { ButtonHTMLAttributes, cloneElement, MouseEventHandler, useMemo, useState } from 'react';
import cx from 'classnames';
import * as classes from './Button.css';
import { Box, Space, TextButton } from '@/presentation/foundations';
import { spaceUnit } from '@/utils';
import { IconProps } from '../Icons';
import * as motion from 'motion/react-client';

export type ButtonProps = {
  'data-test-id'?: string;
  /**
   * The id of the button.
   * @type string
   * @required
   */
  id: string;
  /**
   * The content of the button.
   * @type string | React.JSX.Element;
   * @required
   */
  children: string | React.JSX.Element;
  /**
   * The type of the button.
   * @default 'button'
   * @type "submit" | "reset" | "button" | undefined
   * @required
   */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /**
   * The size of the button.
   * @default 'm'
   * @type "m" | "l"
   * @required
   */
  size: 'm' | 'l';
  /**
   * The disabled state of the button.
   * @default false
   * @type boolean
   */
  disabled?: boolean;
  /**
   * optional before icon.
   * @type (props: IconProps) => React.JSX.Element;
   */
  beforeIcon?: (props: IconProps) => React.JSX.Element;
  /**
   * optional after icon.
   * @type (props: IconProps) => React.JSX.Element;
   */
  afterIcon?: (props: IconProps) => React.JSX.Element;
  /**
   * The action of the button.
   * @type MouseEventHandler<HTMLButtonElement>
   * @default () => {}
   */
  action?: MouseEventHandler<HTMLButtonElement>;
  /**
   * A label for screen readers
   * @type string
   */
  'aria-label'?: string;
  /**
   * Button full width.
   * @type boolean
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The button name
   * @type string
   */
  name?: string;
  /**
   * CSS className
   * @type string
   */
  className?: string;
  /**
   * The button tab index value if -1 is not focusable and 0 is focusable
   * @type number
   */
  tabIndex?: number;
};

export function Button(props: ButtonProps) {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const convertIconSize = (size: ButtonProps['size']) => {
    switch (size) {
      case 'm':
        return 's';
      case 'l':
        return 'm';
      default:
        return 's';
    }
  };

  const iconColor = useMemo(() => (isMouseOver ? '#000000' : '#FDFAF7'), [isMouseOver]);

  return (
    <motion.button
      data-test-id={props['data-test-id']}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
      id={props.id}
      aria-label={props['aria-label']}
      type={props.type ?? 'button'}
      className={cx(
        'group font-bold rounded-small',
        classes.base,
        {
          [classes.size[props.size]]: typeof props.children === 'string',
          [classes.iconSize[props.size]]: typeof props.children !== 'string',
        },
        props.className
      )}
      style={{
        cursor: props.disabled ? 'not-allowed' : 'pointer',
      }}
      disabled={props.disabled}
      onClick={props.action}
      name={props.name}
      tabIndex={props.tabIndex}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
    >
      {!!props.beforeIcon && (
        <>
          {props.beforeIcon({
            id: 'before-icon-' + props.id,
            size: convertIconSize(props.size),
            fill: iconColor,
          })}
          <Space size={spaceUnit} />
        </>
      )}
      {typeof props.children === 'string' ? (
        <TextButton size={convertIconSize(props.size)} className="text-white group-disabled:text-white">
          {props.children}
        </TextButton>
      ) : (
        cloneElement(props.children, {
          id: 'button-icon-' + props.id,
          className: cx(props.children.props.className, 'text-white group-disabled:text-white'),
          fill: iconColor,
        })
      )}
      {!!props.afterIcon && (
        <>
          <Space size={spaceUnit} />
          {props.afterIcon({
            id: 'after-icon-' + props.id,
            size: convertIconSize(props.size),
            fill: iconColor,
          })}
        </>
      )}
    </motion.button>
  );
}
