/**
 * Timeline Data
 * 
 * To add a new region:
 * 1. Add a new key to REGION_TIMELINES (lowercase region name)
 * 2. Each entry needs: title, date, desc
 * 3. The app will automatically detect and display it
 */

export const DEFAULT_TIMELINE = [
  { title: "📋 Registration Period Opens", date: "Months before Election Day", desc: "Voter registration opens. Check eligibility requirements and register early to ensure your spot." },
  { title: "👥 Candidate Filing Deadline", date: "Several months before", desc: "Candidates must officially file to appear on the ballot. Independent candidates submit petition signatures." },
  { title: "🎤 Campaign & Debate Season", date: "Weeks to months before", desc: "Candidates campaign, participate in debates, and share their platforms with voters." },
  { title: "📋 Registration Deadline", date: "2-4 weeks before Election Day", desc: "Last day to register in most jurisdictions. Some areas offer same-day registration." },
  { title: "📮 Early / Absentee Voting Begins", date: "1-2 weeks before", desc: "Early voting locations open. Absentee ballots should be requested and returned by deadlines." },
  { title: "🗳️ Election Day", date: "The Big Day!", desc: "Polls open for in-person voting. Bring required ID and know your polling location." },
  { title: "🔢 Vote Counting & Canvassing", date: "Days to weeks after", desc: "All ballots are counted, including mail-in votes. Results are tallied and reviewed." },
  { title: "📜 Results Certification", date: "Weeks after Election Day", desc: "Election officials certify the final results after completing canvassing and any recounts." },
  { title: "🏛️ Inauguration / Swearing In", date: "Set date after certification", desc: "The winning candidate officially takes office, and the transition of power is complete." }
];

export const REGION_TIMELINES = {
  "united states": [
    { title: "📋 Voter Registration", date: "Varies by state (up to 30 days before)", desc: "Register to vote through your state's Secretary of State website or at your local DMV." },
    { title: "🗳️ Primary Elections", date: "February – June (Election Year)", desc: "Parties hold primaries/caucuses to select their nominees for the general election." },
    { title: "🎤 National Conventions", date: "July – August", desc: "Each major party holds a convention to officially nominate their presidential candidate." },
    { title: "📺 Presidential Debates", date: "September – October", desc: "Candidates face off in nationally televised debates organized by the debate commission." },
    { title: "📮 Early Voting Begins", date: "Varies by state, typically October", desc: "Many states offer early voting at designated polling locations." },
    { title: "🗳️ General Election Day", date: "First Tuesday after November 1", desc: "Nationwide voting day. Polls open early morning and close in the evening." },
    { title: "🔢 Electoral College Vote", date: "Mid-December", desc: "Electors cast their votes based on their state's popular vote results." },
    { title: "📜 Congressional Certification", date: "January 6", desc: "Congress meets to certify the Electoral College results." },
    { title: "🏛️ Inauguration Day", date: "January 20", desc: "The President-elect is sworn into office at the U.S. Capitol." }
  ],

  "india": [
    { title: "📋 Voter Registration", date: "Ongoing (updated before elections)", desc: "Register through the Election Commission of India portal or at your local BLO office." },
    { title: "📢 Election Announcement", date: "Weeks before voting", desc: "The Election Commission announces dates; Model Code of Conduct takes effect." },
    { title: "📋 Nomination Filing", date: "Set deadline per phase", desc: "Candidates file nomination papers, which are then scrutinized by returning officers." },
    { title: "🗳️ Multi-Phase Voting", date: "Spread over several weeks", desc: "India conducts elections in multiple phases across different states and regions." },
    { title: "🔢 Counting Day", date: "After final phase", desc: "All electronic voting machine (EVM) results are tallied simultaneously across the country." },
    { title: "🏛️ Government Formation", date: "Days after results", desc: "The party/coalition with majority is invited to form the government." }
  ],

  "united kingdom": [
    { title: "📋 Electoral Registration", date: "Ongoing", desc: "Register at GOV.UK. The electoral register is updated annually with a canvass." },
    { title: "📢 Parliament Dissolved", date: "25 working days before election", desc: "Parliament is dissolved and the election campaign officially begins." },
    { title: "📋 Nomination Deadline", date: "19 working days before", desc: "Candidates must submit nomination papers to stand for election." },
    { title: "📮 Postal Vote Applications", date: "11 working days before", desc: "Deadline to apply for a postal vote if you cannot attend in person." },
    { title: "🗳️ Polling Day", date: "Usually a Thursday", desc: "Polls open 7am–10pm across all constituencies in the UK." },
    { title: "🔢 Overnight Count", date: "Election Night", desc: "Results declared constituency by constituency throughout the night." },
    { title: "🏛️ Government Formation", date: "Day after election", desc: "The leader of the majority party is invited by the Monarch to form a government." }
  ]
};

/**
 * Get timeline for a given region, or the default.
 * @param {string|null} region - lowercase region name
 * @returns {{ items: Array, label: string }}
 */
export function getTimeline(region) {
  if (region && REGION_TIMELINES[region]) {
    const label = region.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    return { items: REGION_TIMELINES[region], label: `Tailored election timeline for: ${label}` };
  }
  if (region) {
    return { items: DEFAULT_TIMELINE, label: `Showing general timeline. (Specific data for "${region}" is not available — this is a generalized overview.)` };
  }
  return { items: DEFAULT_TIMELINE, label: "A generalized overview of the election cycle." };
}
