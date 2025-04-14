// pages/api/candidates.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Define the structure of the starsyn_profile JSON object
type StarsynProfile = {
  candidateId: string;
  userName: string;
  primaryType?: {
    name?: string;
    color?: string;
  };
  secondaryInfluences?: { name: string }[];
  skillCategories?: {
    score?: number;
    skills?: { name: string }[];
  }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rawProfiles = await prisma.userStarsynProfile.findMany();
    console.log('📊 rawProfiles from DB:', rawProfiles);

    const candidates = rawProfiles.map(row => {
      const profile = row.starsyn_profile as StarsynProfile;

      return {
        id: profile.candidateId,
        name: profile.userName,
        primaryView: profile.primaryType?.name ?? 'Unknown',
        primaryColor: profile.primaryType?.color ?? '#cccccc',
        secondaryInfluences: profile.secondaryInfluences?.map(s => s.name) ?? [],
        skills: profile.skillCategories?.flatMap(sc =>
          Array.isArray(sc.skills) ? sc.skills.map(sk => sk.name) : []
        ) ?? [],
        matchScore: profile.skillCategories?.reduce((acc, sc) => acc + (sc.score || 0), 0) ?? 0,
        intent: 'medium', // Placeholder
        lastActivity: '3d ago', // Placeholder
        futureGoals: [], // Placeholder
        isRevealed: false
      };
    });

    res.status(200).json({ candidates });
  } catch (error) {
    console.error('[API ERROR] /api/candidates', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}