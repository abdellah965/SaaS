const OpenAI = require('openai');
const User = require('../models/User'); // Import the Database Blueprint

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateText = async (req, res) => {
  try {
    const { prompt } = req.body; // This is the raw topic from the user (e.g., "Athlete Mindset Routine")
    const userId = req.user.id;   // Obtained via the authMiddleware bouncer

    if (!prompt) {
      return res.status(400).json({ message: "A topic or prompt is required." });
    }

    // 1. Enforce business subscription parameters
    const user = await User.findById(userId);
    const FREE_LIMIT = 3;

    if (!user.isPro && user.apiUsageCount >= FREE_LIMIT) {
      return res.status(403).json({ 
        message: "You have reached your free agency tier limit. Please upgrade to PRO to unlock unlimited script generation." 
      });
    }

    // 2. THE PREMIUM PIVOT: Construct the specialized agency blueprint
    const agencyPrompt = `Act as a professional YouTube and TikTok content strategist. 
    The user wants a video script about: "${prompt}". 
    Please write a highly engaging, fast-paced 60-second video script. 
    Include visual cues for a gritty, high-contrast editing style (e.g., DaVinci Resolve grading notes, dynamic zooms). 
    Format it with clear timestamps, Hook, Body, and Call to Action.`;

    // 3. Simulated Premium AI Pipeline (Mock Engine for Testing)
    setTimeout(async () => {
      
      // Update usage count metrics in MongoDB
      user.apiUsageCount += 1;
      await user.save();

      // Return a structured response that mimics a high-tier production prompt result
      const simulatedScript = `🎬 [AI AGENCY VIDEO BLUEPRINT]
Topic: "${prompt}"
Target Platforms: TikTok, Instagram Reels, YouTube Shorts
Visual Aesthetic: High-Contrast, Gritty, Fast-Paced

[00:00 - 00:05] HOOK (Visual: Sharp cut, gritty high-contrast grading, tight zoom on subject)
"99% of people quit when it gets dark. But that's exactly where the real work begins..."

[00:05 - 00:45] THE CORE BODY (Visual: Rhythmic B-roll cuts matching a heavy bassline beat)
"When you're building a business, an agency, or an empire, momentum is your only currency. If you rely on feeling motivated, you've already lost to the competitor who relies on pure, cold discipline..."

[00:45 - 00:60] CALL TO ACTION (Visual: Text overlay pops onto screen with a glitch effect)
"Stop scrolling. Drop your focus topic in the comments below, and let's build the engine. Follow for daily blueprints."

--------------------------------------------------
⚙️ [AGENCY METRICS]: This is generation #${user.apiUsageCount} out of ${user.isPro ? 'Unlimited (PRO Active)' : FREE_LIMIT + ' (Free Tier)'}
📝 [PROMPT WRAPPER SENT TO ENGINE]: 
${agencyPrompt}`;

      res.json({ result: simulatedScript });
    }, 1500);

    /* --- REAL OPENAI PRODUCTION ENGINE (DISABLED UNTIL LAUNCH) ---
    // When we switch this on, make sure to add user tracking inside the async resolution:
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [{ role: "user", content: agencyPrompt }],
    // });
    // user.apiUsageCount += 1;
    // await user.save();
    // res.json({ result: completion.choices[0].message.content });
    ------------------------------------------------- */

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ message: "Failed to connect to the generation framework." });
  }
};