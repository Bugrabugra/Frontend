import { Avatar as AntdAvatar, AvatarProps } from "antd";
import { getNameInitials } from "@/utilities";

type CustomAvatarProps = AvatarProps & {
  name?: string;
};

const CustomAvatar = ({ name, style, ...rest }: CustomAvatarProps) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: "#87d068",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style
      }}
      {...rest}
    >
      {getNameInitials(name || "")}
    </AntdAvatar>
  );
};

export default CustomAvatar;
