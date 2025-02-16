import { LandingPage } from '@/payload-types'

export function renderLandingPageSection(section: NonNullable<LandingPage['sections']>[number]) {
  switch (section.blockType) {
    case 'heroSection':
      return (
        <div>
          <h1>{section.heading}</h1>
          <p>{section.subheading}</p>
        </div>
      )
    case 'featuresSection':
      return (
        <div>
          <h2>{section.blockName}</h2>
          <ul>
            {section?.features?.map((feature) => <li key={feature.title}>{feature.title}</li>)}
          </ul>
        </div>
      )
    case 'projectGallerySection':
      return (
        <div>
          <h2>{section.blockName}</h2>
          <ul>
            {section?.projects?.map((project) => <li key={project.title}>{project.title}</li>)}
          </ul>
        </div>
      )
    case 'blogSection':
      return (
        <div>
          <h2>{section.heading}</h2>
          <ul>{section?.posts?.map((post) => <li key={post.title}>{post.title}</li>)}</ul>
        </div>
      )
    case 'contactSection':
      return (
        <div>
          <h2>{section.heading}</h2>
          <p>{section.subheading}</p>
          <p>{section.email}</p>
          <p>{section.phone}</p>
          <ul>
            {section?.socialLinks?.map((socialLink) => (
              <li key={socialLink.platform}>{socialLink.platform}</li>
            ))}
          </ul>
        </div>
      )
    default:
      return null
  }
}
