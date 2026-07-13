import type { Workflow } from '@/lib/types'

export const workflows: Workflow[] = [
  {
    id: 'WF-1', name: 'Speed-to-Lead Responder', trigger: 'Lead Created', status: 'active', runs30d: 1340, successRate: 99.2,
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Lead Created', detail: 'Any channel' },
      { id: 'n2', type: 'ai-decision', label: 'Detect Language', detail: 'Auto-detect from message' },
      { id: 'n3', type: 'action', label: 'AI Response', detail: 'Aria responds in <5s' },
      { id: 'n4', type: 'action', label: 'Update CRM', detail: 'Create lead record' },
      { id: 'n5', type: 'condition', label: 'VIP Check', detail: 'Budget > AED 5M?' },
      { id: 'n6', type: 'escalation', label: 'Escalate to Human', detail: 'Assign senior agent' },
    ],
  },
  {
    id: 'WF-2', name: 'Post-Visit Follow-Up', trigger: 'Viewing Completed', status: 'active', runs30d: 218, successRate: 94.5,
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Visit Completed', detail: 'Agent marks complete' },
      { id: 'n2', type: 'action', label: 'Generate Summary', detail: 'AI summarizes visit notes' },
      { id: 'n3', type: 'delay', label: 'Wait 2 Hours', detail: 'Allow processing time' },
      { id: 'n4', type: 'action', label: 'Request Feedback', detail: 'Send feedback form' },
      { id: 'n5', type: 'ai-decision', label: 'Analyze Sentiment', detail: 'Positive / Neutral / Negative' },
      { id: 'n6', type: 'condition', label: 'Positive?', detail: 'Score >= 7/10' },
      { id: 'n7', type: 'action', label: 'Advance Deal', detail: 'Move to negotiation stage' },
    ],
  },
  {
    id: 'WF-3', name: 'Payment Reminder Ladder', trigger: 'Payment Due', status: 'active', runs30d: 96, successRate: 97.8,
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Payment Due in 7d', detail: 'Scheduled check' },
      { id: 'n2', type: 'action', label: 'Friendly Reminder', detail: 'WhatsApp message' },
      { id: 'n3', type: 'delay', label: 'Wait 3 Days', detail: 'If not paid' },
      { id: 'n4', type: 'action', label: 'Urgent Reminder', detail: 'SMS + Email' },
      { id: 'n5', type: 'delay', label: 'Wait 3 Days', detail: 'Final check' },
      { id: 'n6', type: 'escalation', label: 'Escalate to Finance', detail: 'Alert finance team' },
    ],
  },
  {
    id: 'WF-4', name: 'Dormant Lead Reactivation', trigger: 'Customer Inactive', status: 'active', runs30d: 47, successRate: 31.2,
    nodes: [
      { id: 'n1', type: 'trigger', label: '30 Days Inactive', detail: 'No response for 30d' },
      { id: 'n2', type: 'ai-decision', label: 'Select Content', detail: 'Personalized based on history' },
      { id: 'n3', type: 'action', label: 'Send Update', detail: 'Market update or price drop' },
      { id: 'n4', type: 'delay', label: 'Wait 14 Days', detail: 'Monitor engagement' },
      { id: 'n5', type: 'condition', label: 'Engaged?', detail: 'Opened or replied?' },
      { id: 'n6', type: 'action', label: 'Re-qualify', detail: 'Move back to active pipeline' },
    ],
  },
  {
    id: 'WF-5', name: 'Missing Document Chaser', trigger: 'Document Uploaded', status: 'active', runs30d: 84, successRate: 88.1,
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Deal Stage: Booking', detail: 'Docs checklist incomplete' },
      { id: 'n2', type: 'action', label: 'List Missing Docs', detail: 'Compare checklist' },
      { id: 'n3', type: 'action', label: 'Request Documents', detail: 'Personalized message' },
      { id: 'n4', type: 'delay', label: 'Wait 48 Hours', detail: 'Follow-up window' },
      { id: 'n5', type: 'condition', label: 'All Received?', detail: 'Check completion' },
      { id: 'n6', type: 'escalation', label: 'Alert Agent', detail: 'Notify assigned agent' },
    ],
  },
  {
    id: 'WF-6', name: 'VIP Escalation Protocol', trigger: 'Lead Created', status: 'active', runs30d: 12, successRate: 100,
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Lead Created', detail: 'Budget > AED 5M' },
      { id: 'n2', type: 'action', label: 'Priority Response', detail: 'Aria responds immediately' },
      { id: 'n3', type: 'action', label: 'Flag VIP', detail: 'Set VIP tag in CRM' },
      { id: 'n4', type: 'escalation', label: 'Alert Senior Agent', detail: 'SMS + call to team lead' },
      { id: 'n5', type: 'action', label: 'Brief Agent', detail: 'Generate full context summary' },
    ],
  },
]
