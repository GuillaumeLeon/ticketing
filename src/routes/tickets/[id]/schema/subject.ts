import { z } from 'zod';

export const updateSubject = z.object({
	subject: z.string().min(2).max(50)
});

export type UpdateSubject = typeof updateSubject;
