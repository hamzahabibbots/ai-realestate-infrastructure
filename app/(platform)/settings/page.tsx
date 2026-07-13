'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const TEAM = [
  { name: 'Ahmed Al Maktoum', role: 'Owner', email: 'ahmed@estateos.ae', status: 'Active' },
  { name: 'Omar Hassan', role: 'Senior Agent', email: 'omar@estateos.ae', status: 'Active' },
  { name: 'Sara Khan', role: 'Agent', email: 'sara@estateos.ae', status: 'Active' },
  { name: 'Priya Nair', role: 'Marketing', email: 'priya@estateos.ae', status: 'Active' },
]

const INTEGRATIONS = [
  { name: 'WhatsApp Business API', desc: 'Messaging', connected: true },
  { name: 'Meta Ads', desc: 'Advertising', connected: true },
  { name: 'Google Ads', desc: 'Advertising', connected: true },
  { name: 'Gmail', desc: 'Email', connected: true },
  { name: 'Twilio', desc: 'Voice & SMS', connected: true },
  { name: 'Stripe', desc: 'Payments', connected: false },
  { name: 'Razorpay', desc: 'Payments', connected: false },
  { name: '99acres', desc: 'Property Portal', connected: true },
  { name: 'Housing.com', desc: 'Property Portal', connected: false },
  { name: 'MagicBricks', desc: 'Property Portal', connected: true },
  { name: 'Zapier', desc: 'Automation', connected: true },
  { name: 'n8n', desc: 'Automation', connected: false },
]

const AUDIT_LOG = [
  { time: 'Jul 12, 11:45', user: 'Omar Hassan', action: 'Approved discount request', entity: 'Deal D-1043' },
  { time: 'Jul 12, 10:30', user: 'Aria (AI)', action: 'Escalated VIP lead', entity: 'Elena Petrova' },
  { time: 'Jul 12, 09:15', user: 'Sara Khan', action: 'Exported leads report', entity: 'Analytics' },
  { time: 'Jul 11, 16:20', user: 'Marcus (AI)', action: 'Generated booking form', entity: 'Priya Sharma' },
  { time: 'Jul 11, 14:00', user: 'Ahmed Al Maktoum', action: 'Updated team permissions', entity: 'Settings' },
  { time: 'Jul 11, 11:30', user: 'Sofia (AI)', action: 'Sent payment reminders', entity: '12 customers' },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Team & Roles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TEAM.map((m) => (
                    <TableRow key={m.email}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-[10px]">{m.role}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{m.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="text-xs">{m.status}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTEGRATIONS.map((ig) => (
              <Card key={ig.name}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{ig.name}</p>
                    <p className="text-xs text-muted-foreground">{ig.desc}</p>
                  </div>
                  <Button variant={ig.connected ? 'outline' : 'default'} size="sm" className={`text-xs h-7 ${ig.connected ? 'border-emerald-500/40 text-emerald-400' : ''}`}>
                    {ig.connected ? 'Connected' : 'Connect'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Audit Log</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Entity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {AUDIT_LOG.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{log.time}</TableCell>
                      <TableCell className="font-medium text-sm">{log.user}</TableCell>
                      <TableCell className="text-sm">{log.action}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.entity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Role Permissions</p>
              <div className="space-y-2">
                {[['Owner', 'Full system access, billing, team management, AI worker configuration'], ['Senior Agent', 'All CRM, pipeline, leads, deals. Can approve discounts and escalations'], ['Agent', 'Read/write leads, deals, conversations. Cannot export or approve discounts'], ['Marketing', 'Campaign management, analytics, knowledge base. Read-only CRM access']].map(([role, desc]) => (
                  <div key={role} className="flex gap-3 py-1.5">
                    <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">{role}</Badge>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
