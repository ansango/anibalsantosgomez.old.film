import { useTheme } from "../layout";
import {
  primaryHoverBorderColors,
  primaryHoverTextColors,
  primaryTextColors,
} from "../styles";

export const Tag = ({ tag }) => {
  const { color } = useTheme();
  return (
    <a
      className={`cursor-pointer mr-1.5 py-1.5 text-sm md:mt-0 focus:outline-none focus:shadow-outline leading-none border-b-2 border-transparent ${primaryTextColors[color]} opacity-70 hover:opacity-100 ${primaryHoverTextColors[color]} ${primaryHoverBorderColors[color]}`}
    >
      #{tag}
    </a>
  );
};
