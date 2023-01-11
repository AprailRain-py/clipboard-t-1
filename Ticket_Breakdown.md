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

<!--
Agent can have multiple shifts
Facilities can have multiple shifts
A agent can belong to multiple shits

Table - Facilities, Agents, Shifts
 -->

- Ticket -1 `Database changes` #Backend

  - Requirement: We need to support the custom meta data for each agent in for the facilities. These additional metadata is can be used by Facilities to generate the reports.
    - For Example - An agent with `id` 1 in DB is not very user friendly or understable to facilitie. We can provide a custom `id` i.e. `id-name-department-facility` combination which is more convinient for them to generate reports
  - Acceptance criteria: Given a custom id facility can generate a pdf report for individual agent
  - Database changes: In order to support this requirement we need to add a new table and create a relationship with existing `agent` table
    - Table defination:
      - Name: `agent-metadata`
      - Column/Schema:
        - customId: String
          - Format: `agentId-name-department-facility` as optional thought facility can follow this convention but can override this with their own
        - agentId: Foreign Key to `agent` table column `id`
        - assignedBy: Id `User who created the custom id as logged in user in the applicatio `
        - createdOn: DateTime
        - updatedOn: DateTime
    - Relationship:
      - Create new relationship with table `agent-metadata` and existing `agent` table
        - Relationship: One to One `One agent can have one custom id`
    - Migration: Write a DB migration to generate `agent-metadata` table
  - Effort Estimates:
    - Schema design: 2hours
    - Writing migration: 1hour

- Ticket -2 `Backend Changes` #Backend

  - Requirement: Create a new function to support the generation of report basis `customId` of agent. It should get the total of number of hours of all the shift agent worked on for a quarter. Provided `customName` should be mapped to `agentId` before quering the DB table
    - Function name: `generateReportByAgentName`
    - Output: Should create a `pdf` format and save it on given location
    - Argument: Accepts `agentName` as string
  - Acceptance criteria: The function shoulde accept an `agentName` and generates report in pdf format and format of pdf should adhere to given design
  - Effot Estimates:
    - Writing Fn: 5 hours
    - Writing design template: 4 hours

- Ticket -3 `New report design` #Design

  - Requirement: The new report should have the following details and should adhere to existing companies guidelines and follow the existing design conventions.
    - Details
      - AgentName (Custom name of Agent)
      - AgentId (DB Id)
      - Date of Joining
      - TotalHours on each Quarter
      - Department
      - Facility name
      - Date of Report
  - Acceptance Criteria: Should have above details and adhere to existing design principle and company guideline

- Ticket -4: `To assign custom name` #Backend #Frontend #Design
  - Requirement: Create a functionality which allows the facilities to assign custom name to existing agents.
    - Frontend: Develop a new interface/page which will allow facility to assign custom name to existing user. The page should have the below functinalities
      - List of existing Agent details
      - Search functionality to search agents
      - Ability to select individual agent
      - A pop-up to add custom name for selected user
    - Backend: Develop the APIs to support below functionality for adding custom name for an agent
      - API GET `/agent/all` to get all the list of agents including the customAgentName
      - API GET `/agent/:agentId` to get the details of individual agent
      - API POST `/agent/custom-name` to add the custom name for an agent
        - Request body:
          - agentId: Integer (Existing agent Id)
          - customName: String (Custom name provided by Facility)
    - Design: Design a page to have below details
      - List of existing Agent details (Tabular format)
        - Agent id
        - Agent name
        - Custom Agent name (can have blanks values if the name is not assigned)
        - Facility assigned to
      - Search box to enter either agentName or agentId
      - `Add custom name` button at end of the row which should open a pop
      - A pop-up to box to have below details
        - Textbox to enter new custom name
        - AgentId should be visible on the pop up
  - Acceptance criteria:
    - Backend APIs - It should pass all the test cases
    - Frontend- It should pass the UAT
    - Design- Should have all the listed details and adhere to design principle and company guidelines
  - Effort estimates:
    - Bacend APIs- 12 hours
    - Frontend - 10 hours
    - Design - 8 hours
- Ticket -5: `Generate Report basis custom name` #Backend #Frontend #Design
  - Requirement: Create a functionality which allows facilities to generate custom reports for agent
    - Frontend: Develop a new interface/page which will allow facilities to select a custom agent and generate a report. The page should have the below functionality
      - List of all existing agent with their custom name
      - Searh functionality to search agent basis custom agent name
      - Button to generate report for an agent
      - Pop up for success and failure
    - Backend: Develop the APIs to support the below functionality
      - API to get list of agents refer to Ticket -4 Backend section
      - API to get individual agent details, refer to Ticket -4 Backend section
      - API to generate custom report, refer to Ticket -2
    - Design: Design a page to have below details
      - Page to show the list of agents, refer to Ticket -4 Design section
      - Search box, refer to Ticket -4 Design section
      - `Generate report` at the end of each agent in list of agent details to generate details
  - Acceptance criteria:
    - Backend APIs - It should pass all the test cases
    - Frontend- It should pass the UAT
    - Design- Should have all the listed details and adhere to design principle and company guidelines
  - Effort estimates:
    - Bacend APIs- Refer to Ticket -4 and Ticket 2
    - Frontend - 6 hours
    - Design - 4 hours
