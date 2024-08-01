import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';

// 운동 기록 등록
export const useRegisterExercise = () => useMutation(mutationOptions.register);

// 운동 북마크 목록 조회
export const useGetExerciseBookmarks = () => useQuery(queryOptions.getExercisesBookmarks());
