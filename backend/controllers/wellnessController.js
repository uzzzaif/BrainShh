const affirmations = [
  "You are worthy of love and kindness, especially from yourself.",
  "Every breath you take is a step toward calm.",
  "You have overcome difficult days before, and you can do it again.",
  "Your feelings are valid and matter deeply.",
  "Progress, not perfection, is what matters.",
  "You are stronger than you know.",
  "It is okay to rest. You are not lazy for taking care of yourself.",
  "Small steps lead to big changes.",
  "You deserve compassion today and every day.",
  "Your presence makes the world better.",
  "Feelings pass like clouds — they do not define you.",
  "You are allowed to grow at your own pace.",
  "There is beauty in your vulnerability.",
  "You don't have to have it all figured out right now.",
  "Trust your journey — every experience shapes you.",
  "You are enough, exactly as you are.",
  "It takes courage to ask for help.",
  "Tomorrow is a new chance to begin again.",
  "Your worth is not measured by productivity.",
  "Kindness to yourself is the foundation of healing.",
  "You have survived every difficult day so far.",
  "Peace starts with a single breath.",
  "You matter more than you realize.",
  "Let go of what you cannot control.",
  "Your story is still being written, and it has beautiful chapters ahead.",
  "Even the smallest act of self-care counts.",
  "You are not a burden — you are a light.",
  "Healing is not linear, and that is okay.",
  "You deserve to feel safe and at peace.",
  "Celebrate the tiny victories — they add up.",
  "The best is yet to come.",
  "Choose to be gentle with yourself today.",
  "You are capable of incredible things.",
  "Your mental health is worth every effort.",
  "Joy can be found in the simplest moments.",
  "You are not alone in this.",
  "Take it one moment at a time.",
  "The world is better with you in it.",
  "You are allowed to feel both strong and vulnerable.",
  "Every day is a fresh start.",
  "Believe in your ability to rebuild.",
  "Rest is a sign of wisdom, not weakness.",
  "You are doing your best, and that is enough.",
  "The sun rises again, and so can you.",
  "Hope is not lost — it just waits quietly.",
  "You are more than your thoughts.",
  "It is brave to face another day.",
  "Your growth inspires others without you even knowing.",
  "Find one beautiful thing today, and let it remind you of life's gifts.",
  "You have the power to create calm within yourself.",
  "Nothing is permanent — not the pain, not the joy.",
];

const wellnessTips = [
  "Take 5 minutes to focus on your breathing. Inhale for 4 counts, hold for 4, exhale for 4.",
  "Step outside and feel the sun on your face for a few minutes today.",
  "Drink a glass of water and notice how your body feels afterwards.",
  "Write down three things you are grateful for, no matter how small.",
  "Stretch your arms overhead and take three deep breaths.",
  "Put your phone away for 30 minutes and be present with your surroundings.",
  "Smile at yourself in the mirror — it sounds simple, but it helps.",
  "Take a short walk, even just around your room or hallway.",
  "Listen to a song that makes you feel calm or happy.",
  "Name five things you can see, four you can hear, three you can touch right now.",
  "Give yourself permission to not be perfect today.",
  "Eat something nourishing and pay attention to how it makes you feel.",
  "Write a short thank-you note to someone, or to yourself.",
  "Close your eyes and listen to the sounds around you for one full minute.",
  "Do one thing today that brings you joy, no matter how small.",
];

const wellnessGoals = [
  "Drink at least 8 glasses of water today.",
  "Take a 10-minute walk outside.",
  "Write in your journal for 5 minutes.",
  "Practice 4-4-4 breathing for 2 minutes.",
  "Call or message a friend you haven't spoken to recently.",
  "Do one kind thing for a stranger today.",
  "Spend 15 minutes doing something you enjoy without distractions.",
  "Write down 3 things you are grateful for.",
  "Stretch your body for 5 minutes when you wake up.",
  "Make your bed and start the day with a small accomplishment.",
  "Turn off all screens 30 minutes before bed.",
  "Try a new healthy recipe for a meal today.",
  "Practice saying one positive affirmation out loud.",
  "Take 3 deep breaths before each meal.",
  "Write a short thank-you message to someone you appreciate.",
  "Spend 5 minutes in silence, just listening.",
  "Do a random act of kindness today.",
  "Step outside and take 10 deep breaths of fresh air.",
  "Listen to a song that makes you feel calm.",
  "Write down one thing you learned today.",
  "Compliment yourself in the mirror.",
  "Take a break from social media for one hour.",
  "Do some light stretching before going to bed.",
  "Write about one good thing that happened this week.",
  "Make time for a hobby you enjoy today.",
  "Practice mindfulness for 3 minutes during a routine task.",
  "Share a smile with a stranger today.",
  "Take a moment to stretch after sitting for a long time.",
  "End your day by naming one thing you did well today.",
  "Try a new relaxation technique like progressive muscle relaxation.",
  "Set a gentle boundary with someone today.",
];

const getRandomAffirmation = () => {
  const index = Math.floor(Math.random() * affirmations.length);
  return affirmations[index];
};

const getRandomTip = () => {
  const index = Math.floor(Math.random() * wellnessTips.length);
  return wellnessTips[index];
};

const getDailyGoal = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % wellnessGoals.length;
  return wellnessGoals[index];
};

module.exports = { getRandomAffirmation, getRandomTip, getDailyGoal };
