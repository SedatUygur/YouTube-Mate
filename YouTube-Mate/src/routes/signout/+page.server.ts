import { signOut } from '../../auth.ts';
import type { Actions } from './$types';
export const actions: Actions = { default: signOut };
