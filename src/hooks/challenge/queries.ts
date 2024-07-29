import api from '@/service/service';
import { Database, Tables } from '@/types/supabase';
import { getVerification } from '@/utils/dataFetching';
import { SupabaseClient } from '@supabase/supabase-js';

export const challengesQueryKeys = {
  all: ['challenge'] as const,
};

export const queryOptions = {
  getChallengeDetail: (id: number) => ({
    queryKey: challengesQueryKeys.all,
    queryFn: async () => {
      const data = await api.challenge.getChallengeDetail(id);

      if (!data) {
        throw new Error('data not found');
      }
      return data;
    },
  }),
  getVerification: (client: SupabaseClient<Database>, cid: string, vid: string) => ({
    queryKey: ['verifications', { cid, vid }],
    queryFn: () => getVerification(client, cid, vid),
  }),
};

export const mutationOptions = {
  register: {
    mutationFn: (challengeData: Omit<Tables<'challenges'>, 'id'>) => api.challenge.register(challengeData),
  },
  verify: {
    mutationFn: (verifyData: Omit<Tables<'challengeVerify'>, 'id' | 'date'>) => api.challenge.verify(verifyData),
  },
  updateVerification: {
    mutationFn: (data: { updateData: Omit<Tables<'challengeVerify'>, 'id' | 'date'>; cid: string; vid: string }) =>
      api.challenge.updateVerification(data),
  },
};
