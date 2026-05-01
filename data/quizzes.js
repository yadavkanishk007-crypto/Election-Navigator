/**
 * Quiz Questions Data
 * 
 * To add questions for a new phase:
 * 1. Add a new key matching the phase number
 * 2. Each question needs: q, options[], correct (0-indexed), explanation
 * 3. Minimum 2 questions recommended per phase
 */
export const QUIZZES = {
  1: [
    {
      q: "What is the most common minimum voting age worldwide?",
      options: ["16 years old", "18 years old", "21 years old", "25 years old"],
      correct: 1,
      explanation: "Most democracies set the minimum voting age at 18, though a few countries allow voting at 16."
    },
    {
      q: "Which of the following is NOT a common voter registration method?",
      options: ["Online registration", "Mail-in registration", "Social media registration", "In-person registration"],
      correct: 2,
      explanation: "Social media is not an official registration channel. Always use government-authorized methods to register."
    },
    {
      q: "Why is it important to check your registration status before Election Day?",
      options: ["It's legally required every year", "To make sure you're eligible and registered correctly", "Registration expires every month", "You get a discount for early checking"],
      correct: 1,
      explanation: "Verifying your registration ensures there are no errors and that you're still active on the voter rolls."
    }
  ],

  2: [
    {
      q: "What is a 'party platform'?",
      options: ["A stage where politicians speak", "A set of principles and policies a party supports", "A type of ballot", "A voting machine brand"],
      correct: 1,
      explanation: "A party platform outlines the official positions and policy goals of a political party."
    },
    {
      q: "What is a reliable way to research candidates?",
      options: ["Only read social media posts", "Use non-partisan voter guides", "Only listen to one news source", "Ask strangers on the internet"],
      correct: 1,
      explanation: "Non-partisan voter guides provide balanced information about all candidates without endorsing any."
    },
    {
      q: "How can an independent candidate get on the ballot?",
      options: ["By paying a large fee", "By collecting required petition signatures", "By being famous", "It's impossible without a party"],
      correct: 1,
      explanation: "Independent candidates typically need to collect a certain number of petition signatures from registered voters."
    }
  ],

  3: [
    {
      q: "What is 'early voting'?",
      options: ["Voting before you're 18", "Casting your vote before the official Election Day", "Voting in the primary election", "Registering early"],
      correct: 1,
      explanation: "Early voting allows registered voters to cast ballots at designated locations before the official Election Day."
    },
    {
      q: "What is an 'absentee ballot'?",
      options: ["A ballot for absent-minded voters", "A ballot you submit by mail when you can't vote in person", "A blank ballot", "A cancelled ballot"],
      correct: 1,
      explanation: "Absentee ballots allow voters who cannot physically visit a polling place to participate by mail."
    },
    {
      q: "Which of these is a ballot security measure?",
      options: ["Posting results on social media early", "Paper ballot backups for audits", "Allowing unlimited access to ballots", "Removing poll watchers"],
      correct: 1,
      explanation: "Paper trails enable post-election audits, a critical security measure for election integrity."
    }
  ],

  4: [
    {
      q: "What does it mean to 'certify' election results?",
      options: ["To predict the winner", "To officially confirm and validate the vote count", "To recount every ballot", "To announce results on TV"],
      correct: 1,
      explanation: "Certification is the official process where election authorities confirm that results are accurate and final."
    },
    {
      q: "When can a recount be triggered?",
      options: ["Whenever a candidate requests one", "When the margin of victory is extremely close", "Only in presidential elections", "Recounts never happen"],
      correct: 1,
      explanation: "Most jurisdictions have automatic recount thresholds when the margin between candidates is very small."
    },
    {
      q: "What is the 'transition of power'?",
      options: ["When voting machines are moved", "The process of transferring authority to newly elected officials", "When poll workers change shifts", "The counting process"],
      correct: 1,
      explanation: "The transition of power is the period between election certification and inauguration when authority is transferred."
    }
  ]
};
