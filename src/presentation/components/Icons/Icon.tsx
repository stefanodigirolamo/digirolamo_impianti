import { IconProps } from "./_iconTypes";
import { iconSize } from "./_iconUtils";

type Props = IconProps & {
  /**
   * Define the content of the Icon.
   * @type React.JSX.Element
   * @required
   */
  children: React.JSX.Element;
};

export function Icon(props: Props) {
  return (
    <svg
      id={props.id}
      data-test-id={props["data-test-id"]}
      fill={props.fill}
      viewBox="0 0 32 32"
      className={props.className}
      style={{ display: "block", ...props.style }}
      width={props.width || iconSize(props.size).width}
      height={props.height || iconSize(props.size).height}
      aria-checked={props["aria-checked"]}
      aria-disabled={props["aria-disabled"]}
      onClick={props.onClick}
    >
      {props.children}
    </svg>
  );
}
