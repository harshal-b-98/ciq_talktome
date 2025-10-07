\# CIQ - GTM Launch Project Memory



\## Project Configuration

\- \*\*Confluence Cloud ID\*\*: bb6e05da-d667-476e-bd88-63822cde9734

\- \*\*Project Key\*\*: CGL

\- \*\*Project ID\*\*: 10249

\- \*\*Project Name\*\*: CIQ - GTM Launch



\## Workflow Instructions



\### Session Initialization

1\. \*\*Download Confluence Content\*\*: Use Atlassian MCP server to fetch all pages from the CGL project space

2\. \*\*Create Local Reference\*\*: Save Confluence content to `.confluence/` directory with timestamp

3\. \*\*Initialize Reference File\*\*: Create/update `API\_UI\_REFERENCE.md` if it doesn't exist



\### Ticket-Based Development Workflow

1\. \*\*Identify Current Ticket\*\*: 

&nbsp;  - Review local Confluence documents to find the next ticket in priority order

&nbsp;  - Pull full ticket details from Jira including description, acceptance criteria, and linked issues



2\. \*\*Pre-Development Check\*\*:

&nbsp;  - Review existing codebase for related implementations

&nbsp;  - Check `API\_UI\_REFERENCE.md` for existing endpoints/components

&nbsp;  - Update local Confluence copy with "In Progress" status



3\. \*\*Implementation\*\*:

&nbsp;  - Implement features according to ticket requirements

&nbsp;  - Follow existing code patterns and architecture

&nbsp;  - Write tests where applicable



4\. \*\*Completion Process\*\*:

&nbsp;  - Wait for user confirmation that ticket is complete

&nbsp;  - Update Jira ticket status to "Done" with completion notes

&nbsp;  - Update local Confluence document with completion status

&nbsp;  - Update `API\_UI\_REFERENCE.md` with new endpoints/UI components including:

&nbsp;    - Endpoint URLs and methods

&nbsp;    - Request/response schemas

&nbsp;    - UI component names and routes

&nbsp;    - Dependencies and integration points

&nbsp;  - Commit changes with message format: `\[CGL-XXX] <ticket summary>`

&nbsp;  - Push to remote repository



5\. \*\*Next Ticket\*\*: Repeat process with next ticket in sequence



\### Epic Completion

When all tickets in an Epic are complete:

1\. Update local Confluence documents with Epic completion status

2\. Sync updates to Confluence space via Atlassian MCP

3\. Document any architectural decisions or patterns established

4\. Update `API\_UI\_REFERENCE.md` with Epic-level summary



\### Session Wrap-Up

Before ending a conversation:

1\. Update local Confluence documents with current status of all tickets worked on

2\. Sync all changes to Confluence space

3\. Ensure all code is committed and pushed

4\. Update `API\_UI\_REFERENCE.md` with session summary



\## Document Structure

\- `.confluence/` - Local copies of Confluence pages (timestamped)

\- `API\_UI\_REFERENCE.md` - Comprehensive reference of built features

\- Follow existing project structure for code organization



\## Key Principles

\- \*\*Always work on specific Jira tickets\*\* - Never implement features without a ticket

\- \*\*Keep documentation synchronized\*\* - Local copies, Confluence, and API reference must stay in sync

\- \*\*Atomic commits\*\* - One ticket = one commit (unless ticket is very large)

\- \*\*Status transparency\*\* - Always reflect current state in all documentation systems

