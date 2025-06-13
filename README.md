# Uplevl

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/uplevl/uplevl?utm_source=oss&utm_medium=github&utm_campaign=uplevl%2Fuplevl&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

Uplevl is an AI-powered marketing automation platform built for small businesses. It helps service providers save time, increase bookings, and grow faster by automating content creation, lead capture, and customer engagement across social media and websites.

## What is Uplevl?

Uplevl is a social media marketing engine built for small businesses. It starts with a mobile uploader where business owners can submit photos and short descriptions. Uplevl’s AI then generates high-quality social media content, schedules it into drip campaigns, and automatically responds to comments and DMs to drive engagement.

These social posts lead interested users to the business’s website, where the AI Website Assistant takes over — answering questions, capturing leads, and handling bookings.

Together, Uplevl handles the full marketing journey, from content upload to customer conversion.

## How It Works

1. **📱 Content Upload**  
   Business owners upload images and descriptions via Uplevl’s uploader. Files are securely handled via UploadThing.

2. **🤖 AI Post Generation**  
   Uplevl converts uploads into branded, engaging social media posts and schedules them across platforms using a drip campaign model.

3. **💬 Comment & DM Engagement**  
   The platform monitors comments and direct messages (DMs) on platforms like Instagram, automatically replying to increase engagement and drive interest.

4. **🌐 Website Handoff**  
   Engaged users are directed to the business’s website, where an embedded AI assistant interacts with them, handles bookings, and promotes offers.

5. **📊 Tracking & Analytics**  
   Uplevl tracks all touchpoints and outcomes, giving business owners clear insights into engagement and performance.

## Core Features

- Automatically turns photos into branded social media posts
- Schedules posts as drip campaigns for consistent visibility
- Engages with comments and DMs to capture interest
- Directs leads to the website for seamless handoff and booking
- Converts website visitors into clients with AI-powered assistance
- Promotes loyalty perks and upsells during interactions
- Tracks every step from first impression to conversion

## Who It's For

Uplevl is ideal for service-based small business owners — such as med spas, barbershops, dentists, repair shops, or fitness studios — who want to grow online without managing social media or marketing tools manually.

## Tech Stack

- **Backend**: Bun + Hono
- **Frontend Dashboard**: Vite + React
- **Authentication**: Clerk
- **Database**: Neon with Drizzle ORM
- **AI Integration**: OpenAI (LLM-based)
- **File Uploads**: UploadThing
- **Scheduling & Automation**: Upstash QStash
- **Analytics**: PostHog + internal tracking

## License

Uplevl is licensed under the [Business Source License 1.1](./LICENSE).  
You may use the code for non-commercial purposes or internal business use.  
Starting June 13, 2028, the license will convert to Apache 2.0.
