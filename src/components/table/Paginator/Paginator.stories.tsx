import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Paginator from "./Paginator";

const meta: Meta<typeof Paginator> = {
  component: Paginator,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Paginator>;

export const Default: Story = {
  render: function DefaultStory() {
    const [currentPage, setCurrentPage] = useState(2);

    return (
      <div className="p-4">
        <Paginator
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const WithEllipsis: Story = {
  render: function WithEllipsisStory() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="p-4">
        <Paginator
          currentPage={currentPage}
          totalPages={20}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};