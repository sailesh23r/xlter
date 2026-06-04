import { NavbarProps } from 'sanity'

export function StudioHeader(props: NavbarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: '#0B1220',
        color: '#fff',
        padding: '24px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Content Management
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af', marginTop: '6px' }}>
            Manage blogs, categories, authors and media.
          </p>
        </div>
        <nav style={{ 
          display: 'flex', 
          gap: '24px', 
          fontSize: '11px', 
          fontWeight: 800, 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em' 
        }}>
          <a href="/studio/structure/post" style={{ color: '#3B82F6', textDecoration: 'none', transition: 'color 0.2s' }}>Posts</a>
          <a href="/studio/structure/category" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Categories</a>
          <a href="/studio/structure/author" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Authors</a>
        </nav>
      </header>
      {/* Render the default Sanity Navbar below our custom header */}
      {props.renderDefault(props)}
    </div>
  )
}
