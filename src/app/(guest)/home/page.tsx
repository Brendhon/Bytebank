import { BenefitsSection } from '@/components/layout'
import { ReactElement } from 'react'

/**
 * Guest home page component.
 * 
 * Renders the benefits section for unauthenticated users,
 * displaying information about the bank's advantages and features.
 * 
 * This is a Server Component that renders on the server side,
 * providing optimal performance and SEO benefits.
 * 
 * @returns {ReactElement} Guest home page content
 */
export default function GuestHomePage(): ReactElement {
  return <BenefitsSection />
}