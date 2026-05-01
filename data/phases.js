/**
 * Phase Content Data
 * 
 * To add a new phase:
 * 1. Add a new entry with the next number key
 * 2. Include title, icon, label, and sections array
 * 3. Each section needs: heading, text, and optionally list[] and infoBox
 * 4. Add matching quiz questions in quizzes.js
 */
export const PHASES = Object.freeze({
  1: {
    title: "Registration & Eligibility",
    icon: "📋",
    label: "Phase 1",
    sections: [
      {
        heading: "Who Can Vote? ✅",
        text: "In most democracies, citizens who meet certain requirements can vote. Common eligibility criteria include:",
        list: [
          "<span class='key-term'>Age</span> — Most countries require voters to be at least 18 years old",
          "<span class='key-term'>Citizenship</span> — You must typically be a citizen of the country",
          "<span class='key-term'>Residency</span> — You usually need to live in the area where you're voting",
          "<span class='key-term'>Registration</span> — Many places require you to register before Election Day"
        ]
      },
      {
        heading: "How to Register 📝",
        text: "Registration processes vary, but here are common methods:",
        list: [
          "Online registration through your government's official website",
          "In-person registration at a local government office",
          "Mail-in registration using official forms",
          "Same-day registration (available in some places)"
        ]
      },
      {
        heading: "Key Deadlines 📅",
        text: "Most jurisdictions set registration deadlines before Election Day. Missing the deadline may prevent you from voting in that election.",
        infoBox: "💡 <strong>Pro Tip:</strong> Check your registration status well in advance! Many official election websites let you verify your registration online."
      }
    ]
  },

  2: {
    title: "Candidates & Platforms",
    icon: "👥",
    label: "Phase 2",
    sections: [
      {
        heading: "How Candidates Get on the Ballot 🏛️",
        text: "Candidates typically follow one of these paths:",
        list: [
          "<span class='key-term'>Party Nomination</span> — Winning a primary election or party convention",
          "<span class='key-term'>Independent Filing</span> — Collecting required petition signatures",
          "<span class='key-term'>Write-in Candidacy</span> — Voters write the candidate's name on the ballot"
        ]
      },
      {
        heading: "Understanding Party Platforms 📰",
        text: "A <span class='key-term'>party platform</span> is a set of principles and policy positions that a political party officially supports. Platforms cover topics like the economy, healthcare, education, and more.",
        infoBox: "⚖️ <strong>Stay Neutral:</strong> Compare platforms side-by-side using non-partisan voter guides from organizations like your local election commission."
      },
      {
        heading: "Researching Candidates Safely 🔍",
        text: "Here are reliable ways to research candidates:",
        list: [
          "Official candidate websites and social media",
          "Non-partisan voter guides and fact-checking organizations",
          "Candidate debates and town halls",
          "Local newspaper endorsement pages (read multiple sources!)"
        ]
      }
    ]
  },

  3: {
    title: "Voting Mechanics",
    icon: "🗳️",
    label: "Phase 3",
    sections: [
      {
        heading: "How Do You Vote? 🗳️",
        text: "Modern elections offer several voting methods:",
        list: [
          "<span class='key-term'>In-Person Voting</span> — Visit your assigned polling place on Election Day",
          "<span class='key-term'>Early Voting</span> — Vote in person before Election Day at designated locations",
          "<span class='key-term'>Absentee/Mail-in Voting</span> — Request and submit a ballot by mail",
          "<span class='key-term'>Electronic Voting</span> — Some jurisdictions offer secure online options"
        ]
      },
      {
        heading: "Where Do You Vote? 📍",
        text: "Your voting location depends on your registered address. Look up your polling place through your local election authority's website.",
        infoBox: "🏢 <strong>Polling Place Tips:</strong> Bring valid ID (requirements vary), know your district number, and arrive prepared with your choices."
      },
      {
        heading: "Ballot Security 🔐",
        text: "Elections employ multiple security measures:",
        list: [
          "Paper ballot backups for audit trails",
          "Bipartisan poll watchers and observers",
          "Chain-of-custody tracking for all ballots",
          "Post-election audits to verify results"
        ]
      }
    ]
  },

  4: {
    title: "Counting & Results",
    icon: "📊",
    label: "Phase 4",
    sections: [
      {
        heading: "How Votes Are Counted 🔢",
        text: "The counting process varies but generally includes:",
        list: [
          "<span class='key-term'>Precinct Counting</span> — Votes tallied at each polling location",
          "<span class='key-term'>Central Counting</span> — Mail-in and absentee ballots processed centrally",
          "<span class='key-term'>Canvassing</span> — Official review and certification of results"
        ]
      },
      {
        heading: "After the Vote 📜",
        text: "Once counting is complete, several important steps follow:",
        list: [
          "Results are <span class='key-term'>certified</span> by election officials",
          "Losing candidates may <span class='key-term'>concede</span> (this is tradition, not a legal requirement)",
          "Recounts may be triggered if margins are extremely close",
          "Legal challenges can be filed within specific timeframes"
        ]
      },
      {
        heading: "The Transition 🏛️",
        text: "After certification, the transition of power begins. This includes briefings, appointments, and preparation for the new term.",
        infoBox: "🎯 <strong>Key Fact:</strong> The peaceful transfer of power is a cornerstone of democratic governance. The entire process — from voting to inauguration — follows strict legal timelines."
      }
    ]
  }
});

/**
 * Returns the total number of phases.
 * Used by the renderer and progress tracker to auto-scale.
 */
export function getPhaseCount() {
  return Object.keys(PHASES).length;
}
