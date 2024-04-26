import React from "react";
import { Dropdown, Space} from "antd";
import { VscKebabVertical } from "react-icons/vsc";


export default function KebabIcon() {

    const items = [
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: "0",
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ];
  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <VscKebabVertical size={30} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
