import { Card, Text, Flex, Heading, Grid, Button, Box, Badge } from '@sanity/ui'
import { AddIcon, ArrowLeftIcon, DatabaseIcon, ImageIcon } from '@sanity/icons'
import { useClient } from 'sanity'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ContentDashboard() {
  const router = useRouter()
  const client = useClient({ apiVersion: '2024-01-01' })
  const { projectId, dataset } = client.config()

  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, categories: 0 })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [total, published, drafts, categories, activity, posts] = await Promise.all([
          client.fetch('count(*[_type == "post" && !(_id in path("drafts.**"))])'),
          client.fetch('count(*[_type == "post" && status == "PUBLISHED" && !(_id in path("drafts.**"))])'),
          client.fetch('count(*[_type == "post" && status == "DRAFT" && !(_id in path("drafts.**"))])'),
          client.fetch('count(*[_type == "category" && !(_id in path("drafts.**"))])'),
          client.fetch('*[_type == "post" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0...5] { _id, title, _updatedAt, status, "authorName": author->name }'),
          client.fetch('*[_type == "post" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...5] { _id, title, _createdAt, status, "authorName": author->name }')
        ])
        
        setStats({ total, published, drafts, categories })
        setRecentActivity(activity)
        setRecentPosts(posts)
      } catch (error) {
        console.error("Error fetching dashboard data from Sanity:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [client])

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date)
  }

  return (
    <Box padding={5} style={{ background: '#030712', minHeight: '100%', color: '#fff', fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
      <Flex direction="column" gap={5} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header & Back Button */}
        <Flex justify="space-between" align="center">
          <Box>
            <Button 
              icon={ArrowLeftIcon} 
              text="Back to Dashboard" 
              mode="ghost" 
              onClick={() => router.push('/xeltr-admin')}
              style={{ color: '#9ca3af', background: 'transparent', padding: '0', marginBottom: '16px' }} 
            />
            <Heading as="h1" size={4} style={{ color: '#fff', fontWeight: 800 }}>Content Dashboard</Heading>
            <Text size={2} muted style={{ marginTop: '8px', color: '#9ca3af' }}>
              Real-time overview of your platform's content operations.
            </Text>
          </Box>
          <Card padding={3} radius={3} style={{ background: '#0B1220', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Flex align="center" gap={3}>
              <DatabaseIcon style={{ color: '#10B981', fontSize: '24px' }} />
              <Box>
                <Text size={1} style={{ color: '#10B981', fontWeight: 700, marginBottom: '2px' }}>Connected to Sanity</Text>
                <Text size={1} style={{ color: '#9ca3af' }}>Project: {projectId} | Dataset: {dataset}</Text>
              </Box>
            </Flex>
          </Card>
        </Flex>

        {/* Statistics Grid */}
        <Grid columns={[1, 2, 4]} gap={4}>
          {[
            { label: 'Total Posts', value: loading ? '-' : stats.total, color: '#3B82F6' },
            { label: 'Published', value: loading ? '-' : stats.published, color: '#10B981' },
            { label: 'Drafts', value: loading ? '-' : stats.drafts, color: '#F59E0B' },
            { label: 'Categories', value: loading ? '-' : stats.categories, color: '#8B5CF6' },
          ].map((stat) => (
            <Card key={stat.label} padding={4} radius={3} style={{ background: '#0B1220', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Text size={1} style={{ color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </Text>
              <Heading as="h2" size={5} style={{ color: stat.color, marginTop: '12px', fontWeight: 800 }}>
                {stat.value}
              </Heading>
            </Card>
          ))}
        </Grid>

        <Grid columns={[1, 1, 3]} gap={5} style={{ marginTop: '24px' }}>
          
          {/* Main Content Columns */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Flex direction="column" gap={5}>
              
              {/* Recent Activity */}
              <Box>
                <Heading as="h3" size={2} style={{ color: '#fff', marginBottom: '16px' }}>Recent Activity</Heading>
                <Card padding={4} radius={3} style={{ background: '#0B1220', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Flex direction="column" gap={4}>
                    {loading ? <Text size={2} style={{ color: '#9ca3af' }}>Loading activity...</Text> : recentActivity.length === 0 ? <Text size={2} style={{ color: '#9ca3af' }}>No recent activity.</Text> : recentActivity.map((item, i) => (
                      <Box key={item._id}>
                        <Flex align="center" justify="space-between">
                          <Box>
                            <Text size={2} style={{ color: '#fff', fontWeight: 600 }}>{item.title || 'Untitled'}</Text>
                            <Text size={1} style={{ color: '#9ca3af', marginTop: '6px' }}>
                              Updated {formatDate(item._updatedAt)} by {item.authorName || 'Unknown'}
                            </Text>
                          </Box>
                          <Badge mode="outline" tone={item.status === 'PUBLISHED' ? 'success' : 'caution'}>
                            {item.status || 'Draft'}
                          </Badge>
                        </Flex>
                        {i < recentActivity.length - 1 && <Box style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginTop: '16px' }} />}
                      </Box>
                    ))}
                  </Flex>
                </Card>
              </Box>

              {/* Recent Posts */}
              <Box>
                <Heading as="h3" size={2} style={{ color: '#fff', marginBottom: '16px' }}>Recent Posts</Heading>
                <Card padding={4} radius={3} style={{ background: '#0B1220', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Flex direction="column" gap={4}>
                    {loading ? <Text size={2} style={{ color: '#9ca3af' }}>Loading posts...</Text> : recentPosts.length === 0 ? <Text size={2} style={{ color: '#9ca3af' }}>No recent posts.</Text> : recentPosts.map((post, i) => (
                      <Box key={post._id}>
                        <Flex align="center" justify="space-between">
                          <Box>
                            <Text size={2} style={{ color: '#fff', fontWeight: 600 }}>{post.title || 'Untitled'}</Text>
                            <Text size={1} style={{ color: '#9ca3af', marginTop: '6px' }}>
                              Created {formatDate(post._createdAt)}
                            </Text>
                          </Box>
                          <Button 
                            as="a" 
                            href={`/studio/intent/edit/id=${post._id};type=post/`} 
                            text="Edit" 
                            mode="ghost" 
                            size={2} 
                            style={{ color: '#3B82F6', background: 'rgba(59,130,246,0.1)' }} 
                          />
                        </Flex>
                        {i < recentPosts.length - 1 && <Box style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginTop: '16px' }} />}
                      </Box>
                    ))}
                  </Flex>
                </Card>
              </Box>

            </Flex>
          </Box>

          {/* Sidebar */}
          <Box>
            <Heading as="h3" size={2} style={{ color: '#fff', marginBottom: '16px' }}>Quick Actions</Heading>
            <Card padding={4} radius={3} style={{ background: '#0B1220', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Flex direction="column" gap={3}>
                <a href="/studio/intent/create/template=post;type=post/" style={{ textDecoration: 'none' }}>
                  <Button icon={AddIcon} text="New Post" mode="ghost" width="fill" style={{ color: '#fff', background: 'rgba(255,255,255,0.05)', justifyContent: 'flex-start' }} />
                </a>
                <a href="/studio/intent/create/template=category;type=category/" style={{ textDecoration: 'none' }}>
                  <Button icon={AddIcon} text="New Category" mode="ghost" width="fill" style={{ color: '#fff', background: 'rgba(255,255,255,0.05)', justifyContent: 'flex-start' }} />
                </a>
                <a href="/studio/intent/create/template=author;type=author/" style={{ textDecoration: 'none' }}>
                  <Button icon={AddIcon} text="New Author" mode="ghost" width="fill" style={{ color: '#fff', background: 'rgba(255,255,255,0.05)', justifyContent: 'flex-start' }} />
                </a>
                <a href="/studio/structure/media" style={{ textDecoration: 'none' }}>
                  <Button icon={ImageIcon} text="Media Library" mode="ghost" width="fill" style={{ color: '#fff', background: 'rgba(59,130,246,0.1)', justifyContent: 'flex-start' }} />
                </a>
              </Flex>
            </Card>
          </Box>

        </Grid>
      </Flex>
    </Box>
  )
}
