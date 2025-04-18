'use client'

import { Card } from "@/components/ui"
import { CardProps, CardVariant } from "@/types/ui"

interface Props {
  data: CardProps[]
}

export default ({ data }: Props) => {
  return (
    <section>
      <div className="card">

        {/* Title */}
        <h2 className="text-20-bold text-dark-gray mb-6">Movimentações</h2>

        {/* Cards */}
        <div className="flex items-center justify-between mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {data.map(({ label, value, variant }) => (
              <Card
                key={label}
                label={label}
                value={value}
                variant={variant as CardVariant}
              />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  )
}
