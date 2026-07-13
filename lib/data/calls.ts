import type { CallRecord } from '@/lib/types'

export const calls: CallRecord[] = [
  {
    id: 'CL-1', contactName: 'Fatima Al Rashid', direction: 'inbound', duration: '6:12', time: 'Today, 08:02',
    sentiment: 'positive',
    summary: 'Fatima called about upgrading to a 4BR villa. Captured: budget AED 3.5-5M cash, needs private pool, proximity to GEMS. Proposed Hillside Grove viewing Sunday 16:00.',
    transcript: 'AI: Thank you for calling Estate OS, this is Aria. How may I help you today?\nFatima: Hi, I am looking for a villa, 4 bedrooms, we need a private pool...\nAI: Wonderful! I have a beautiful option at Hillside Grove in Dubai Hills — a 4BR villa with private pool, golf course views, and just 5 minutes from GEMS Wellington Academy.\nFatima: That sounds perfect. What is the price?\nAI: The Hillside Grove 4BR villa is AED 4.6 million. It is ready to move in, with a smart home system included.\nFatima: Can we see it this weekend?\nAI: Of course! I have Sunday at 4 PM available with Omar Hassan, our senior agent. Shall I confirm?',
    handledBy: 'ai',
  },
  {
    id: 'CL-2', contactName: 'Rohan Mehta', direction: 'outbound', duration: '3:45', time: 'Today, 10:30',
    sentiment: 'positive',
    summary: 'Follow-up call to confirm Saturday visit. Rohan confirmed 11 AM with wife. Reminded to bring Emirates ID for registration.',
    transcript: 'AI: Hi Rohan, this is Aria from Estate OS. I am calling to confirm your visit to Marina Bay Tower this Saturday at 11 AM.\nRohan: Yes, confirmed. My wife will join as well.\nAI: Wonderful! Omar Hassan will meet you at the sales gallery. Please bring your Emirates ID for the registration. I will send you the location and parking details via WhatsApp.\nRohan: Perfect, thank you.',
    handledBy: 'ai',
  },
  {
    id: 'CL-3', contactName: 'Elena Petrova', direction: 'inbound', duration: '12:34', time: 'Yesterday, 15:20',
    sentiment: 'neutral',
    summary: 'Elena inquired about price flexibility on Azure Sky penthouse. Detected high-value negotiation signals. Escalated to Omar Hassan for personal handling.',
    transcript: 'AI: Good afternoon, Elena. This is Marcus from Estate OS.\nElena: I want to discuss the final price for the Azure Sky penthouse. What is your best offer for a quick close?\nAI: I understand, Elena. For a cash close within 30 days, I can present a formal offer to the seller. Given the exclusivity of this unit, let me connect you with Omar Hassan, our team lead, who will personally handle this negotiation.\nOmar: Elena, pleasure to meet you. I have reviewed the details and spoken with the seller...',
    handledBy: 'human',
  },
  {
    id: 'CL-4', contactName: 'Khalid Rahman', direction: 'inbound', duration: '4:18', time: 'Yesterday, 11:15',
    sentiment: 'neutral',
    summary: 'Khalid asked about payment plans for JVC studios. Explained 1% monthly post-handover plan. Interest level moderate, no visit booked yet.',
    transcript: 'AI: Thank you for calling. This is Aria from Estate OS. How can I assist you?\nKhalid: I saw your Instagram about JVC studios. Can you explain the payment plan?\nAI: Of course! Studios at The Nook in JVC start from AED 640,000. The payment plan is very attractive — you pay during construction, and after handover, just 1% monthly. That means very manageable instalments.\nKhalid: Interesting. Let me think about it.',
    handledBy: 'ai',
  },
  {
    id: 'CL-5', contactName: 'James Carter', direction: 'outbound', duration: '8:52', time: 'Jul 10, 14:00',
    sentiment: 'negative',
    summary: 'James expressed concern about competing offer from another developer at 5% below asking. Discussed Palm Vista value proposition and yield advantages. Escalated to Sara for counter-offer preparation.',
    transcript: 'Omar: Hi James, Omar here from Estate OS. I wanted to discuss your thoughts on the Palm Vista unit.\nJames: Frankly, I have received a better offer from the developer across the canal. They are offering 5% below your asking.\nOmar: I understand. Let me share some context — Palm Vista has a projected yield of 7.1%, which is significantly above the area average of 5.9%. The service charges are also 18% lower.\nJames: Those are fair points, but price is important to me.\nOmar: Absolutely. Let me discuss internally and come back with our best terms.',
    handledBy: 'human',
  },
]
