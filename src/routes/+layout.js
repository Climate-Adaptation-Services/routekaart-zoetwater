import { browser } from '$app/environment';
import { inject } from '@vercel/analytics';

if (browser) inject();
