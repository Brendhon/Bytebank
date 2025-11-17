import { Meta, StoryObj } from '@storybook/nextjs'
import Select from './Select'

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Tipo de transferência',
    placeholder: 'Selecione um tipo',
    options: [
      { label: 'PIX', value: 'pix' },
      { label: 'TED', value: 'ted' },
      { label: 'DOC', value: 'doc' },
    ],
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: 'Esse campo é obrigatório',
  },
}

export const WithCustomOptions: Story = {
  args: {
    options: [
      { value: 'entrada', label: 'Entrada' },
      { value: 'saida', label: 'Saída' },
    ],
  },
}

// Disable the default export
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}