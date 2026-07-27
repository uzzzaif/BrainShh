const crisisPatterns = [
  /i want to die/i,
  /i want to kill myself/i,
  /i can't continue/i,
  /i want to hurt myself/i,
  /i want to end it/i,
  /i don't want to live anymore/i,
  /i'm going to end my life/i,
  /i'll end it all/i,
  /i can't go on/i,
  /i want to disappear/i,
  /i wish i was dead/i,
  /i wish i could disappear/i,
  /i don't want to be alive/i,
  /i want to stop existing/i,
  /suicide/i,
  /i'm going to hurt myself/i,
  /i want to self-harm/i,
  /i need to end it/i,
];

const detectCrisis = (message) => {
  return crisisPatterns.some((pattern) => pattern.test(message));
};

const crisisResponse = `I'm really glad you reached out. What you're feeling matters, and you deserve support.

Please reach out to someone you trust right now — a friend, family member, or anyone who can be there for you.

If you're in immediate danger, please contact emergency services or a crisis helpline in India:
- **Emergency Services (India)**: Call **112** for immediate assistance
- **Local mental health helplines**: Contact your state/city health authority or local hospitals for dedicated support
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

You are not alone, and there are people who want to help. 💙`;

module.exports = { detectCrisis, crisisResponse };
