# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Allow Facilities to add custom Agent IDs

- Acceptance Criteria: A Facility user can add a custom ID for an Agent they work with. The custom ID should be unique per Facility. The custom ID should be saved to the database and associated with the Agent record. When generating reports, the custom ID should be displayed instead of the internal database ID.

- Time/Effort Estimate: Development: 2-3 days Testing: 1 day

-Implementation Details: Add a new column "custom_id" to the Agents table to store the custom ID. Add a form for Facilities to add/edit custom IDs for Agents. When generating reports, replace the internal database ID with the custom ID if it exists.

### Ticket 2: Display custom Agent IDs in Shift metadata

- Acceptance Criteria: When a Facility user views the Shift details, the custom ID of the assigned Agent should be displayed instead of the internal database ID. If a custom ID hasn't been set, display the internal database ID as a fallback.

- Time/Effort Estimate: Development: 1 day Testing: 0.5 day

- Implementation Details: Modify the query in getShiftsByFacility to include the custom ID of the assigned Agent. Update the Shift metadata display to show the custom ID instead of the internal database ID.

### Ticket 3: Update existing reports with custom Agent IDs

- Acceptance Criteria: When a Facility user views an existing report generated before the custom ID feature was added, the custom IDs of the Agents should be displayed instead of the internal database IDs.

- Time/Effort Estimate: Development: 1 day Testing: 0.5 day

- Implementation Details: Modify the generateReport function to check if custom IDs are available for Agents before displaying them in the report. If a custom ID is not available, use the internal database ID as a fallback.

### Ticket 4: Update API to accept custom Agent IDs

- Acceptance Criteria: The API endpoints should accept the custom IDs of Agents instead of the internal database IDs. The API should return the custom IDs of Agents in response data.

- Time/Effort Estimate: Development: 1 day Testing: 0.5 day

- Implementation Details: Modify the API endpoints to accept custom IDs instead of internal database IDs. Modify the response data to include the custom IDs of Agents.

### Ticket 5: Update UI to show custom Agent IDs

- Acceptance Criteria: When viewing lists of Agents, the custom ID should be displayed instead of the internal database ID. When assigning Agents to Shifts, the custom ID should be displayed instead of the internal database ID.

- Time/Effort Estimate: Development: 1 day Testing: 0.5 day

- Implementation Details: Modify the Agent list UI to display the custom ID instead of the internal database ID. Modify the Shift assignment UI to display the custom ID instead of the internal database ID.
